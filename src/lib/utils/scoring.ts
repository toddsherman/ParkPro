import {
  CrowdLevel,
  DailyCrowdData,
} from "../types";
import {
  MONTHLY_BUSYNESS,
  DAY_OF_WEEK_MULTIPLIER,
  ZONE_POPULARITY,
} from "../constants";

/**
 * Calculate a busyness score (0-10) for a specific date and zone
 * using historical patterns, day-of-week effects, and zone popularity.
 */
export function calculateBusynessScore(
  date: Date,
  zoneId: string
): number {
  const month = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  const monthBase = MONTHLY_BUSYNESS[month] ?? 5;
  const dayMultiplier = DAY_OF_WEEK_MULTIPLIER[dayOfWeek] ?? 1;
  const zoneMultiplier = ZONE_POPULARITY[zoneId] ?? 1;

  // Add some deterministic variance based on the day of month
  const dayOfMonth = date.getDate();
  const variance = ((dayOfMonth * 7 + month * 3) % 10) / 20 - 0.25; // -0.25 to +0.25

  const raw = monthBase * dayMultiplier * zoneMultiplier + variance;
  return Math.max(0, Math.min(10, raw));
}

/**
 * Convert a numeric busyness score to a crowd level
 */
export function scoreToCrowdLevel(score: number): CrowdLevel {
  if (score < 3.5) return "low";
  if (score < 6.5) return "moderate";
  return "high";
}

/**
 * Generate daily crowd data for a zone across a week
 */
export function generateWeekCrowdData(
  startDate: Date,
  zoneId: string
): DailyCrowdData[] {
  const days: DailyCrowdData[] = [];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const score = calculateBusynessScore(date, zoneId);
    const level = scoreToCrowdLevel(score);

    // Parking is generally slightly busier than trails
    const parkingScore = Math.min(10, score * 1.1);
    // Trail level is slightly lower
    const trailScore = score * 0.9;

    days.push({
      date: date.toISOString().split("T")[0],
      dayOfWeek: dayNames[date.getDay()],
      parkingLevel: scoreToCrowdLevel(parkingScore),
      trailLevel: scoreToCrowdLevel(trailScore),
      overallLevel: level,
    });
  }

  return days;
}

/**
 * Compute overall busyness for a zone across an entire week
 */
export function computeOverallWeekBusyness(
  dailyCrowds: DailyCrowdData[]
): CrowdLevel {
  const levelValues: Record<CrowdLevel, number> = {
    low: 1,
    moderate: 2,
    high: 3,
    unknown: 0,
  };

  const known = dailyCrowds.filter((d) => d.overallLevel !== "unknown");
  if (known.length === 0) return "unknown";

  const avg =
    known.reduce((sum, d) => sum + levelValues[d.overallLevel], 0) /
    known.length;

  if (avg < 1.5) return "low";
  if (avg < 2.5) return "moderate";
  return "high";
}
