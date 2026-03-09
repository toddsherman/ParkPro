import type { ParkAlert } from "../types";

/**
 * Fetch current park alerts for Yosemite via our internal API route.
 * Falls back to an empty array on failure.
 */
export async function fetchParkAlerts(): Promise<ParkAlert[]> {
  try {
    const res = await fetch("/api/alerts");

    if (!res.ok) {
      throw new Error(`Alerts API returned ${res.status}`);
    }

    const data = await res.json();
    return data.alerts as ParkAlert[];
  } catch (error) {
    console.warn("Failed to fetch park alerts, returning empty:", error);
    return [];
  }
}
