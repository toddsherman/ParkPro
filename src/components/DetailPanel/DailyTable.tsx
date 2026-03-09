"use client";

import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Car,
  Footprints,
} from "lucide-react";
import {
  DailyForecast,
  DailyCrowdData,
  CampsiteAvailability,
  CrowdLevel,
} from "@/lib/types";
import { CROWD_COLORS, CROWD_LABELS } from "@/lib/constants";

interface DailyTableProps {
  dailyWeather: DailyForecast[];
  dailyCrowds: DailyCrowdData[];
  campsiteAvailability: CampsiteAvailability[];
}

function getWeatherIcon(condition: string) {
  const lower = condition.toLowerCase();
  if (lower.includes("snow")) return <Snowflake className="w-4 h-4 text-blue-300" />;
  if (lower.includes("rain") || lower.includes("shower"))
    return <CloudRain className="w-4 h-4 text-blue-400" />;
  if (lower.includes("cloud") || lower.includes("overcast"))
    return <Cloud className="w-4 h-4 text-gray-400" />;
  return <Sun className="w-4 h-4 text-yellow-400" />;
}

function CrowdDot({ level }: { level: CrowdLevel }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
      style={{ backgroundColor: CROWD_COLORS[level] }}
    />
  );
}

function CrowdCell({ level }: { level: CrowdLevel }) {
  const label =
    level === "low"
      ? "Low"
      : level === "moderate"
      ? "Med"
      : level === "high"
      ? "High"
      : "N/A";

  return (
    <div className="flex items-center gap-1.5">
      <CrowdDot level={level} />
      <span className="text-xs text-gray-300">{label}</span>
    </div>
  );
}

function getShortDay(dayOfWeek: string): string {
  return dayOfWeek.slice(0, 3);
}

export default function DailyTable({
  dailyWeather,
  dailyCrowds,
  campsiteAvailability,
}: DailyTableProps) {
  if (dailyWeather.length === 0 && dailyCrowds.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Data unavailable</p>
      </div>
    );
  }

  // Build merged rows by date
  const dates = dailyWeather.length > 0
    ? dailyWeather.map((w) => w.date)
    : dailyCrowds.map((c) => c.date);

  const weatherByDate = new Map(dailyWeather.map((w) => [w.date, w]));
  const crowdsByDate = new Map(dailyCrowds.map((c) => [c.date, c]));

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-300 mb-2">
        Daily Breakdown
      </h3>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-800">
              <th className="text-left py-2 pr-2 font-medium">Day</th>
              <th className="text-left py-2 pr-2 font-medium">Weather</th>
              <th className="text-left py-2 pr-2 font-medium">
                <span className="inline-flex items-center gap-1">
                  <Car className="w-3 h-3" /> Parking
                </span>
              </th>
              <th className="text-left py-2 font-medium">
                <span className="inline-flex items-center gap-1">
                  <Footprints className="w-3 h-3" /> Trails
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, idx) => {
              const weather = weatherByDate.get(date);
              const crowd = crowdsByDate.get(date);
              const dayLabel = weather
                ? getShortDay(weather.dayOfWeek)
                : crowd
                ? getShortDay(crowd.dayOfWeek)
                : "";

              return (
                <tr
                  key={date}
                  className={`border-b border-gray-800/50 ${
                    idx % 2 === 0 ? "bg-gray-800/20" : ""
                  }`}
                >
                  {/* Day */}
                  <td className="py-2 pr-2">
                    <span className="text-xs font-semibold text-gray-200">
                      {dayLabel}
                    </span>
                  </td>

                  {/* Weather */}
                  <td className="py-2 pr-2">
                    {weather ? (
                      <div className="flex items-center gap-1.5">
                        {getWeatherIcon(weather.condition)}
                        <span className="text-xs text-gray-400 hidden lg:inline">
                          {weather.condition}
                        </span>
                        <span className="text-xs text-gray-300 font-medium ml-auto">
                          {Math.round(weather.tempHighF)}&#176;
                          <span className="text-gray-500">
                            /{Math.round(weather.tempLowF)}&#176;
                          </span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-600">--</span>
                    )}
                  </td>

                  {/* Parking */}
                  <td className="py-2 pr-2">
                    {crowd ? (
                      <CrowdCell level={crowd.parkingLevel} />
                    ) : (
                      <span className="text-xs text-gray-600">--</span>
                    )}
                  </td>

                  {/* Trails */}
                  <td className="py-2">
                    {crowd ? (
                      <CrowdCell level={crowd.trailLevel} />
                    ) : (
                      <span className="text-xs text-gray-600">--</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="sm:hidden space-y-2">
        {dates.map((date, idx) => {
          const weather = weatherByDate.get(date);
          const crowd = crowdsByDate.get(date);
          const dayLabel = weather
            ? getShortDay(weather.dayOfWeek)
            : crowd
            ? getShortDay(crowd.dayOfWeek)
            : "";

          return (
            <div
              key={date}
              className={`p-3 rounded-lg ${
                idx % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/20"
              }`}
            >
              {/* Day + Weather row */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-gray-200">
                  {dayLabel}
                </span>
                {weather && (
                  <div className="flex items-center gap-1.5">
                    {getWeatherIcon(weather.condition)}
                    <span className="text-xs text-gray-300 font-medium">
                      {Math.round(weather.tempHighF)}&#176;/
                      {Math.round(weather.tempLowF)}&#176;
                    </span>
                  </div>
                )}
              </div>

              {/* Crowd info row */}
              {crowd && (
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-gray-500" />
                    <CrowdCell level={crowd.parkingLevel} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Footprints className="w-3 h-3 text-gray-500" />
                    <CrowdCell level={crowd.trailLevel} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
