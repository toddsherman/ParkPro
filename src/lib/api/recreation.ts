import type { CampsiteAvailability } from "../types";

/**
 * Fetch campsite availability for a given facility and start date
 * via our internal API route.
 * Falls back to empty data on failure.
 */
export async function fetchCampsiteAvailability(
  facilityId: string,
  startDate: string
): Promise<CampsiteAvailability[]> {
  try {
    const params = new URLSearchParams({ facilityId, startDate });
    const res = await fetch(`/api/availability?${params}`);

    if (!res.ok) {
      throw new Error(`Availability API returned ${res.status}`);
    }

    const data = await res.json();
    return data.availability as CampsiteAvailability[];
  } catch (error) {
    console.warn(
      "Failed to fetch campsite availability, returning empty:",
      error
    );
    return [];
  }
}
