"use client";

import React, { useMemo } from "react";
import {
  X,
  TreePine,
  MapPin,
  Mountain,
  Eye,
  Landmark,
  Footprints,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { ParkZone } from "@/lib/types";
import DailyTable from "./DailyTable";
import WeekSummary from "./WeekSummary";

const zoneTypeConfig: Record<
  ParkZone["type"],
  { icon: React.ReactNode; label: string }
> = {
  valley: {
    icon: <Mountain className="w-4 h-4" />,
    label: "Valley",
  },
  grove: {
    icon: <TreePine className="w-4 h-4" />,
    label: "Grove",
  },
  trailhead: {
    icon: <Footprints className="w-4 h-4" />,
    label: "Trailhead",
  },
  viewpoint: {
    icon: <Eye className="w-4 h-4" />,
    label: "Viewpoint",
  },
  "visitor-center": {
    icon: <Landmark className="w-4 h-4" />,
    label: "Visitor Center",
  },
};

export default function DetailPanel() {
  const { state, setActiveZone } = useApp();

  const zone = useMemo(() => {
    if (!state.activeZoneId) return null;
    return state.zones.find((z) => z.id === state.activeZoneId) ?? null;
  }, [state.activeZoneId, state.zones]);

  const zoneData = useMemo(() => {
    if (!state.activeZoneId) return null;
    return state.zoneData[state.activeZoneId] ?? null;
  }, [state.activeZoneId, state.zoneData]);

  const isOpen = zone !== null;
  const typeConfig = zone ? zoneTypeConfig[zone.type] : null;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setActiveZone(null)}
        />
      )}

      {/* Panel */}
      <div
        className={`
          fixed z-50 transition-transform duration-300 ease-in-out

          /* Mobile: bottom sheet */
          bottom-0 left-0 right-0 max-h-[70vh]
          md:bottom-auto md:left-auto

          /* Desktop: side panel */
          md:top-0 md:right-0 md:w-96 md:h-full md:max-h-full

          ${
            isOpen
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-y-0 md:translate-x-full"
          }
        `}
      >
        <div className="h-full bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 md:border-t-0 md:border-l md:border-gray-700/50 flex flex-col overflow-hidden rounded-t-2xl md:rounded-none">
          {/* Mobile drag handle */}
          <div className="flex justify-center pt-2 pb-1 md:hidden">
            <div className="w-10 h-1 rounded-full bg-gray-600" />
          </div>

          {/* Header */}
          <div className="flex items-start gap-3 px-5 pt-3 pb-3 md:pt-5 border-b border-gray-800">
            {/* Zone type icon */}
            {typeConfig && (
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 shrink-0 mt-0.5">
                {typeConfig.icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white leading-snug truncate">
                {zone?.name}
              </h2>
              {typeConfig && (
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {typeConfig.label}
                </span>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => setActiveZone(null)}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors shrink-0"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {/* Description */}
            {zone && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {zone.description}
              </p>
            )}

            {/* Week Summary */}
            {zoneData && <WeekSummary zoneData={zoneData} />}

            {/* Daily Table */}
            {zoneData && (
              <DailyTable
                dailyWeather={zoneData.dailyWeather}
                dailyCrowds={zoneData.dailyCrowds}
                campsiteAvailability={zoneData.campsiteAvailability}
              />
            )}

            {/* No data message */}
            {!zoneData && state.selectedWeek && (
              <div className="text-center py-8">
                <MapPin className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Loading data for this zone...
                </p>
              </div>
            )}

            {!state.selectedWeek && (
              <div className="text-center py-8">
                <MapPin className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Select a week to see detailed information.
                </p>
              </div>
            )}

            {/* Trails list */}
            {zone && zone.trails.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5 text-gray-500" />
                  Trails
                </h3>
                <ul className="space-y-1.5">
                  {zone.trails.map((trail) => (
                    <li
                      key={trail}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {trail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
