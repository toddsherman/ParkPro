import type { DailyForecast } from "../types";

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
 * Generate mock weather data as a client-side fallback.
 * Produces realistic seasonal data for Yosemite based on the month.
 */
function generateMockWeather(startDate: string): DailyForecast[] {
  const forecasts: DailyForecast[] = [];
  const start = new Date(startDate + "T12:00:00Z");

  const summerConditions = ["Sunny", "Clear", "Partly Cloudy"];
  const winterConditions = ["Snow", "Cloudy", "Partly Cloudy", "Rain"];
  const springFallConditions = ["Partly Cloudy", "Sunny", "Rain", "Cloudy"];

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();

    // Seasonal temperature ranges (Fahrenheit)
    let highBase: number, lowBase: number, precipBase: number;
    let conditions: string[];

    if (month >= 6 && month <= 8) {
      highBase = 85;
      lowBase = 52;
      precipBase = 5;
      conditions = summerConditions;
    } else if (month >= 11 || month <= 2) {
      highBase = 48;
      lowBase = 26;
      precipBase = 40;
      conditions = winterConditions;
    } else {
      highBase = 65;
      lowBase = 38;
      precipBase = 25;
      conditions = springFallConditions;
    }

    // Deterministic variance
    const seed = (dayOfMonth * 13 + month * 7 + i * 3) % 20;
    const tempVariance = seed - 10;

    const conditionIndex = (dayOfMonth + i) % conditions.length;
    const condition = conditions[conditionIndex];

    const iconMap: Record<string, string> = {
      Sunny: "01d",
      Clear: "01d",
      "Partly Cloudy": "02d",
      Cloudy: "04d",
      Rain: "10d",
      Snow: "13d",
    };

    forecasts.push({
      date: date.toISOString().split("T")[0],
      dayOfWeek: DAY_NAMES[date.getDay()],
      tempHighF: Math.round(highBase + tempVariance * 0.5),
      tempLowF: Math.round(lowBase + tempVariance * 0.3),
      condition,
      precipChance: Math.max(0, Math.min(100, Math.round(precipBase + tempVariance * 2))),
      icon: iconMap[condition] ?? "03d",
    });
  }

  return forecasts;
}

/**
 * Fetch 7-day weather forecast for a given location via our internal API route.
 * Falls back to generated mock data if the API call fails.
 */
export async function fetchWeekWeather(
  lat: number,
  lng: number,
  startDate: string
): Promise<DailyForecast[]> {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      startDate,
    });

    const res = await fetch(`/api/weather?${params}`);

    if (!res.ok) {
      throw new Error(`Weather API returned ${res.status}`);
    }

    const data = await res.json();
    return data.daily as DailyForecast[];
  } catch (error) {
    console.warn("Failed to fetch weather data, using mock fallback:", error);
    return generateMockWeather(startDate);
  }
}
