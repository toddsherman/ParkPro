// Required env var: NPS_API_KEY
// National Park Service API - https://developer.nps.gov/
// Falls back to a single informational stub alert if key is missing or call fails.

import { NextResponse } from "next/server";
import type { ParkAlert, NPSAlertResponse } from "@/lib/types";

const STUB_ALERTS: ParkAlert[] = [];

function mapNPSCategory(
  category: string
): "danger" | "caution" | "information" {
  const lower = category.toLowerCase();
  if (lower === "danger" || lower === "park closure") return "danger";
  if (lower === "caution" || lower === "warning") return "caution";
  return "information";
}

export async function GET() {
  const apiKey = process.env.NPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { alerts: STUB_ALERTS, source: "stub" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=900",
        },
      }
    );
  }

  try {
    const url = `https://developer.nps.gov/api/v1/alerts?parkCode=yose&api_key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });

    if (!res.ok) {
      throw new Error(`NPS API returned ${res.status}`);
    }

    const data: NPSAlertResponse = await res.json();

    const alerts: ParkAlert[] = (data.data ?? []).map((alert) => ({
      id: alert.id,
      title: alert.title,
      description: alert.description,
      category: mapNPSCategory(alert.category),
      url: alert.url || undefined,
    }));

    return NextResponse.json(
      { alerts, source: "nps" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=900",
        },
      }
    );
  } catch (error) {
    console.error("NPS Alerts API error, using stub:", error);
    return NextResponse.json(
      { alerts: STUB_ALERTS, source: "stub" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=900",
        },
      }
    );
  }
}
