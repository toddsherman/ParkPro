import type { ParkZone, ZoneWeekData } from "../types";
import { computeOverallWeekBusyness } from "../utils/scoring";
import { fetchWeekWeather } from "./weather";
import { fetchZoneBusyness } from "./busyness";

/**
 * Fetch weather and crowd data for all provided zones in parallel.
 * Returns a complete data object keyed by zone ID.
 *
 * Each zone gets its own weather forecast (based on its coordinates)
 * and crowd data (based on its zone ID). All fetches run concurrently
 * for maximum performance.
 */
export async function fetchAllZoneData(
  zones: ParkZone[],
  startDate: string
): Promise<Record<string, ZoneWeekData>> {
  // Build an array of promises, one per zone, each fetching weather + crowds in parallel
  const zonePromises = zones.map(async (zone) => {
    const [dailyWeather, dailyCrowds] = await Promise.all([
      fetchWeekWeather(zone.latitude, zone.longitude, startDate),
      fetchZoneBusyness(zone.id, startDate),
    ]);

    const overallBusyness = computeOverallWeekBusyness(dailyCrowds);

    const zoneWeekData: ZoneWeekData = {
      zone,
      dailyWeather,
      dailyCrowds,
      campsiteAvailability: [], // Populated separately via fetchCampsiteAvailability when needed
      overallBusyness,
    };

    return { id: zone.id, data: zoneWeekData };
  });

  // Execute all zone fetches in parallel
  const results = await Promise.all(zonePromises);

  // Assemble into a Record keyed by zone ID
  const record: Record<string, ZoneWeekData> = {};
  for (const result of results) {
    record[result.id] = result.data;
  }

  return record;
}

// Re-export individual API functions for convenience
export { fetchWeekWeather } from "./weather";
export { fetchParkAlerts } from "./nps";
export { fetchCampsiteAvailability } from "./recreation";
export { fetchZoneBusyness } from "./busyness";
