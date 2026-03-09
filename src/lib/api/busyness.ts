import type { DailyCrowdData } from "../types";
import { generateWeekCrowdData } from "../utils/scoring";

/**
 * Fetch daily crowd / busyness data for a specific zone via our internal API route.
 * Falls back to scoring-based estimates using the scoring utility if the API call fails.
 */
export async function fetchZoneBusyness(
  zoneId: string,
  startDate: string
): Promise<DailyCrowdData[]> {
  try {
    const params = new URLSearchParams({ zoneId, startDate });
    const res = await fetch(`/api/busyness?${params}`);

    if (!res.ok) {
      throw new Error(`Busyness API returned ${res.status}`);
    }

    const data = await res.json();
    return data.daily as DailyCrowdData[];
  } catch (error) {
    console.warn(
      "Failed to fetch busyness data, using scoring fallback:",
      error
    );
    const start = new Date(startDate + "T12:00:00Z");
    return generateWeekCrowdData(start, zoneId);
  }
}
