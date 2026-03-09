// Required env var: OPENWEATHERMAP_API_KEY
// OpenWeatherMap One Call API 3.0 - https://openweathermap.org/api/one-call-3
// Falls back to generated seasonal weather data if key is missing or call fails.

import { NextResponse } from "next/server";
import type { DailyForecast } from "@/lib/types";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Seasonal weather patterns for Yosemite (approximate monthly averages)
const SEASONAL_WEATHER: Record<
  number,
  { highBase: number; lowBase: number; conditions: string[]; precipBase: number }
> = {
  1: { highBase: 48, lowBase: 26, conditions: ["Snow", "Cloudy", "Partly Cloudy", "Rain"], precipBase: 45 },
  2: { highBase: 52, lowBase: 28, conditions: ["Rain", "Cloudy", "Partly Cloudy", "Snow"], precipBase: 40 },
  3: { highBase: 56, lowBase: 30, conditions: ["Partly Cloudy", "Rain", "Sunny", "Cloudy"], precipBase: 35 },
  4: { highBase: 63, lowBase: 35, conditions: ["Sunny", "Partly Cloudy", "Rain", "Cloudy"], precipBase: 25 },
  5: { highBase: 72, lowBase: 42, conditions: ["Sunny", "Partly Cloudy", "Clear", "Sunny"], precipBase: 15 },
  6: { highBase: 82, lowBase: 50, conditions: ["Sunny", "Clear", "Sunny", "Partly Cloudy"], precipBase: 5 },
  7: { highBase: 90, lowBase: 56, conditions: ["Sunny", "Clear", "Sunny", "Clear"], precipBase: 3 },
  8: { highBase: 88, lowBase: 55, conditions: ["Sunny", "Clear", "Sunny", "Partly Cloudy"], precipBase: 3 },
  9: { highBase: 82, lowBase: 48, conditions: ["Sunny", "Clear", "Partly Cloudy", "Sunny"], precipBase: 5 },
  10: { highBase: 70, lowBase: 38, conditions: ["Partly Cloudy", "Sunny", "Cloudy", "Rain"], precipBase: 20 },
  11: { highBase: 56, lowBase: 30, conditions: ["Cloudy", "Rain", "Partly Cloudy", "Snow"], precipBase: 35 },
  12: { highBase: 48, lowBase: 26, conditions: ["Snow", "Cloudy", "Rain", "Partly Cloudy"], precipBase: 45 },
};

const CONDITION_ICONS: Record<string, string> = {
  Sunny: "01d",
  Clear: "01d",
  "Partly Cloudy": "02d",
  Cloudy: "04d",
  Rain: "10d",
  Snow: "13d",
  Thunderstorm: "11d",
};

/**
 * Generate realistic fallback weather data based on Yosemite seasonal patterns.
 */
function generateFallbackWeather(startDate: string): DailyForecast[] {
  const forecasts: DailyForecast[] = [];
  const start = new Date(startDate + "T12:00:00Z");

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const month = date.getMonth() + 1;
    const seasonal = SEASONAL_WEATHER[month] ?? SEASONAL_WEATHER[6];

    // Deterministic pseudo-random variance based on date
    const dayOfMonth = date.getDate();
    const seed = (dayOfMonth * 13 + month * 7 + i * 3) % 20;
    const tempVariance = seed - 10; // -10 to +9

    const conditionIndex = (dayOfMonth + i) % seasonal.conditions.length;
    const condition = seasonal.conditions[conditionIndex];

    const highTemp = Math.round(seasonal.highBase + tempVariance * 0.5);
    const lowTemp = Math.round(seasonal.lowBase + tempVariance * 0.3);
    const precipChance = Math.max(
      0,
      Math.min(100, Math.round(seasonal.precipBase + tempVariance * 2))
    );

    forecasts.push({
      date: date.toISOString().split("T")[0],
      dayOfWeek: DAY_NAMES[date.getDay()],
      tempHighF: highTemp,
      tempLowF: lowTemp,
      condition,
      precipChance,
      icon: CONDITION_ICONS[condition] ?? "03d",
    });
  }

  return forecasts;
}

/**
 * Convert OpenWeatherMap icon code to a display condition string.
 */
function owmIconToCondition(main: string): string {
  const map: Record<string, string> = {
    Clear: "Sunny",
    Clouds: "Cloudy",
    Rain: "Rain",
    Drizzle: "Rain",
    Thunderstorm: "Thunderstorm",
    Snow: "Snow",
    Mist: "Cloudy",
    Fog: "Cloudy",
    Haze: "Partly Cloudy",
  };
  return map[main] ?? "Partly Cloudy";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const startDate = searchParams.get("startDate");

  if (!lat || !lng || !startDate) {
    return NextResponse.json(
      { error: "Missing required query params: lat, lng, startDate" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    // No API key configured -- return generated fallback data
    const fallback = generateFallbackWeather(startDate);
    return NextResponse.json(
      { daily: fallback, source: "fallback" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }

  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`OpenWeatherMap API returned ${res.status}`);
    }

    const data = await res.json();

    const forecasts: DailyForecast[] = (data.daily ?? [])
      .slice(0, 7)
      .map((day: { dt: number; temp: { max: number; min: number }; weather: Array<{ main: string; icon: string }>; pop: number }) => {
        const d = new Date(day.dt * 1000);
        const condition = owmIconToCondition(day.weather[0]?.main ?? "Clear");
        return {
          date: d.toISOString().split("T")[0],
          dayOfWeek: DAY_NAMES[d.getDay()],
          tempHighF: Math.round(day.temp.max),
          tempLowF: Math.round(day.temp.min),
          condition,
          precipChance: Math.round((day.pop ?? 0) * 100),
          icon: day.weather[0]?.icon ?? "03d",
        };
      });

    return NextResponse.json(
      { daily: forecasts, source: "openweathermap" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  } catch (error) {
    console.error("Weather API error, using fallback:", error);
    const fallback = generateFallbackWeather(startDate);
    return NextResponse.json(
      { daily: fallback, source: "fallback" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  }
}
