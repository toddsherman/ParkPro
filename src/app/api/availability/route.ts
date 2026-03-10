// Required env var: RECREATION_GOV_API_KEY
// Recreation.gov Availability API - https://ridb.recreation.gov/
// Falls back to generated availability data if key is missing or call fails.

import { NextResponse } from "next/server";
import type {
  CampsiteAvailability,
  RecreationAvailabilityResponse,
} from "@/lib/types";

/**
 * Generate realistic fallback campsite availability data.
 * Availability varies by season and day of week.
 */
function generateFallbackAvailability(
  startDate: string
): CampsiteAvailability[] {
  const result: CampsiteAvailability[] = [];
  const start = new Date(startDate + "T12:00:00Z");

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const month = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    // Base availability depends on season (summer = more booked)
    const seasonalDemand: Record<number, number> = {
      1: 0.15, 2: 0.15, 3: 0.25, 4: 0.45,
      5: 0.65, 6: 0.85, 7: 0.95, 8: 0.90,
      9: 0.70, 10: 0.45, 11: 0.20, 12: 0.15,
    };

    // Weekend boost
    const weekendBoost = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6
      ? 0.1
      : 0;

    const totalSites = 50;
    const demand = Math.min(1, (seasonalDemand[month] ?? 0.5) + weekendBoost);

    // Deterministic variance
    const dayOfMonth = date.getDate();
    const variance = ((dayOfMonth * 7 + i * 11) % 10) / 100 - 0.05;

    const percentBooked = Math.max(0, Math.min(100, Math.round((demand + variance) * 100)));
    const availableSites = Math.round(totalSites * (1 - percentBooked / 100));

    result.push({
      date: date.toISOString().split("T")[0],
      totalSites,
      availableSites,
      percentBooked,
    });
  }

  return result;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const facilityId = searchParams.get("facilityId");
  const startDate = searchParams.get("startDate");

  if (!facilityId || !startDate) {
    return NextResponse.json(
      { error: "Missing required query params: facilityId, startDate" },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return NextResponse.json(
      { error: "Invalid startDate: must match YYYY-MM-DD format" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RECREATION_GOV_API_KEY;

  if (!apiKey) {
    const fallback = generateFallbackAvailability(startDate);
    return NextResponse.json(
      { availability: fallback, source: "fallback" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }

  try {
    // Recreation.gov campsite availability endpoint
    const startMonth = startDate.substring(0, 7); // YYYY-MM
    const url = `https://www.recreation.gov/api/camps/availability/campground/${facilityId}/month?start_date=${startMonth}-01T00:00:00.000Z`;
    const res = await fetch(url, {
      headers: {
        apikey: apiKey,
        "User-Agent": "ParkPro/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Recreation.gov API returned ${res.status}`);
    }

    const data: RecreationAvailabilityResponse = await res.json();

    // Parse the campsites response into daily availability
    const start = new Date(startDate + "T12:00:00Z");
    const availability: CampsiteAvailability[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const dateKey = `${dateStr}T00:00:00Z`;

      let totalSites = 0;
      let availableCount = 0;

      for (const campsite of Object.values(data.campsites ?? {})) {
        totalSites++;
        const status = campsite.availabilities?.[dateKey];
        if (status === "Available") {
          availableCount++;
        }
      }

      // Default if no campsite data
      if (totalSites === 0) {
        totalSites = 50;
        availableCount = 25;
      }

      const percentBooked = Math.round(
        ((totalSites - availableCount) / totalSites) * 100
      );

      availability.push({
        date: dateStr,
        totalSites,
        availableSites: availableCount,
        percentBooked,
      });
    }

    return NextResponse.json(
      { availability, source: "recreation.gov" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  } catch (error) {
    console.error("Recreation.gov API error, using fallback:", error);
    const fallback = generateFallbackAvailability(startDate);
    return NextResponse.json(
      { availability: fallback, source: "fallback" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }
}
