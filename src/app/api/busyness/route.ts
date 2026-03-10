// Optional env var: BESTTIME_API_KEY
// BestTime API - https://besttime.app/ (for live popular times data)
// Always returns data -- uses scoring utility as fallback when key is missing or call fails.

import { NextResponse } from "next/server";
import type { DailyCrowdData, CrowdLevel } from "@/lib/types";
import { generateWeekCrowdData } from "@/lib/utils/scoring";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Map BestTime intensity (0-100) to our CrowdLevel type.
 */
function intensityToCrowdLevel(intensity: number): CrowdLevel {
  if (intensity < 35) return "low";
  if (intensity < 65) return "moderate";
  return "high";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zoneId = searchParams.get("zoneId");
  const startDate = searchParams.get("startDate");

  if (!zoneId || !startDate) {
    return NextResponse.json(
      { error: "Missing required query params: zoneId, startDate" },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return NextResponse.json(
      { error: "Invalid startDate: must match YYYY-MM-DD format" },
      { status: 400 }
    );
  }

  const apiKey = process.env.BESTTIME_API_KEY;

  // If no API key, use the scoring-based estimates immediately
  if (!apiKey) {
    const start = new Date(startDate + "T12:00:00Z");
    const crowdData = generateWeekCrowdData(start, zoneId);
    return NextResponse.json(
      { daily: crowdData, source: "scoring" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }

  try {
    // BestTime forecast endpoint for venue foot traffic
    const url = `https://besttime.app/api/v1/forecasts?api_key_private=${apiKey}&venue_id=${zoneId}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`BestTime API returned ${res.status}`);
    }

    const data = await res.json();

    // Parse BestTime response into daily crowd data
    const start = new Date(startDate + "T12:00:00Z");
    const crowdData: DailyCrowdData[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();
      const dateStr = date.toISOString().split("T")[0];

      // BestTime provides day_raw arrays indexed by day (0=Mon in their API)
      // Map our JS day (0=Sun) to BestTime day index
      const bestTimeDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const dayData = data?.analysis?.[bestTimeDayIndex];

      if (dayData && typeof dayData.day_mean === "number") {
        const intensity = dayData.day_mean;
        const level = intensityToCrowdLevel(intensity);
        crowdData.push({
          date: dateStr,
          dayOfWeek: DAY_NAMES[dayOfWeek],
          parkingLevel: intensityToCrowdLevel(Math.min(100, intensity * 1.1)),
          trailLevel: intensityToCrowdLevel(intensity * 0.9),
          overallLevel: level,
        });
      } else {
        // No data for this day -- fallback to scoring for this specific day
        const score = generateWeekCrowdData(date, zoneId)[0];
        crowdData.push(score);
      }
    }

    return NextResponse.json(
      { daily: crowdData, source: "besttime" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  } catch (error) {
    console.error("BestTime API error, using scoring fallback:", error);
    const start = new Date(startDate + "T12:00:00Z");
    const crowdData = generateWeekCrowdData(start, zoneId);
    return NextResponse.json(
      { daily: crowdData, source: "scoring" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }
}
