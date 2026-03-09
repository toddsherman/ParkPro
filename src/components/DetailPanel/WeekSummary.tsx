"use client";

import React, { useMemo } from "react";
import { CloudRain, Sun, Calendar } from "lucide-react";
import { ZoneWeekData, CrowdLevel } from "@/lib/types";
import { CROWD_COLORS, CROWD_LABELS } from "@/lib/constants";

interface WeekSummaryProps {
  zoneData: ZoneWeekData;
}

function getBusynessBg(level: CrowdLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-500/20 border-emerald-500/40";
    case "moderate":
      return "bg-yellow-500/20 border-yellow-500/40";
    case "high":
      return "bg-red-500/20 border-red-500/40";
    default:
      return "bg-gray-500/20 border-gray-500/40";
  }
}

function getBusynessTextColor(level: CrowdLevel): string {
  switch (level) {
    case "low":
      return "text-emerald-400";
    case "moderate":
      return "text-yellow-400";
    case "high":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

const crowdOrder: Record<CrowdLevel, number> = {
  low: 0,
  moderate: 1,
  high: 2,
  unknown: 3,
};

export default function WeekSummary({ zoneData }: WeekSummaryProps) {
  const summary = useMemo(() => {
    const { dailyWeather, dailyCrowds, overallBusyness } = zoneData;

    // Best day to visit: lowest overall crowd level, preferring earlier in the week
    let bestDay: string | null = null;
    if (dailyCrowds.length > 0) {
      const sorted = [...dailyCrowds].sort((a, b) => {
        const diff = crowdOrder[a.overallLevel] - crowdOrder[b.overallLevel];
        if (diff !== 0) return diff;
        return a.date.localeCompare(b.date);
      });
      bestDay = sorted[0].dayOfWeek;
    }

    // Average temperature range
    let avgHigh = 0;
    let avgLow = 0;
    if (dailyWeather.length > 0) {
      avgHigh =
        dailyWeather.reduce((sum, d) => sum + d.tempHighF, 0) /
        dailyWeather.length;
      avgLow =
        dailyWeather.reduce((sum, d) => sum + d.tempLowF, 0) /
        dailyWeather.length;
    }

    // Rainy days count
    const rainyDays = dailyWeather.filter((d) => d.precipChance >= 40).length;

    return { overallBusyness, bestDay, avgHigh, avgLow, rainyDays };
  }, [zoneData]);

  return (
    <div
      className={`rounded-xl border p-4 ${getBusynessBg(
        summary.overallBusyness
      )}`}
    >
      {/* Overall busyness */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: CROWD_COLORS[summary.overallBusyness] }}
        />
        <span
          className={`text-sm font-bold ${getBusynessTextColor(
            summary.overallBusyness
          )}`}
        >
          {CROWD_LABELS[summary.overallBusyness]}
        </span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider ml-auto">
          This Week
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Best day */}
        {summary.bestDay && (
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
              Best Day
            </span>
            <span className="text-sm font-semibold text-white flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-500" />
              {summary.bestDay.slice(0, 3)}
            </span>
          </div>
        )}

        {/* Avg temp */}
        {zoneData.dailyWeather.length > 0 && (
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
              Avg Temp
            </span>
            <span className="text-sm font-semibold text-white flex items-center gap-1">
              <Sun className="w-3 h-3 text-yellow-500" />
              {Math.round(summary.avgHigh)}&#176;/
              {Math.round(summary.avgLow)}&#176;
            </span>
          </div>
        )}

        {/* Rainy days */}
        {zoneData.dailyWeather.length > 0 && (
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
              Rain Days
            </span>
            <span className="text-sm font-semibold text-white flex items-center gap-1">
              <CloudRain className="w-3 h-3 text-blue-400" />
              {summary.rainyDays}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
