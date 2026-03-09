"use client";

import React from "react";
import { useApp } from "@/lib/context";
import { CROWD_COLORS } from "@/lib/constants";
import { CrowdLevel } from "@/lib/types";

export default function MapFallback() {
  const { state, setActiveZone } = useApp();
  const { zones, zoneData, activeZoneId } = state;

  // Normalize coordinates to a 0-1 range for grid positioning
  // based on the actual lat/lng spread of the zones
  const lats = zones.map((z) => z.latitude);
  const lngs = zones.map((z) => z.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  function getPosition(lat: number, lng: number) {
    // Invert latitude so north is at top
    const y = 1 - (lat - minLat) / latRange;
    const x = (lng - minLng) / lngRange;
    // Add padding (10% on each side)
    return {
      left: `${10 + x * 80}%`,
      top: `${10 + y * 80}%`,
    };
  }

  function getCrowdLevel(zoneId: string): CrowdLevel {
    return zoneData[zoneId]?.overallBusyness ?? "unknown";
  }

  return (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-lg select-none">
      {/* Topographic-style background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(145deg, #2d5016 0%, #4a7c28 20%, #6b8f3c 40%, #8faa5a 55%, #a8b77a 65%, #c4b88a 75%, #9e8b6e 85%, #7a6b52 100%)
          `,
        }}
      />

      {/* Topographic contour lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <ellipse cx="200" cy="150" rx="180" ry="120" fill="none" stroke="white" strokeWidth="1" />
        <ellipse cx="200" cy="150" rx="150" ry="100" fill="none" stroke="white" strokeWidth="1" />
        <ellipse cx="200" cy="150" rx="120" ry="80" fill="none" stroke="white" strokeWidth="1" />
        <ellipse cx="200" cy="150" rx="90" ry="60" fill="none" stroke="white" strokeWidth="1" />
        <ellipse cx="200" cy="150" rx="60" ry="40" fill="none" stroke="white" strokeWidth="1" />
        <ellipse cx="130" cy="100" rx="70" ry="50" fill="none" stroke="white" strokeWidth="0.8" />
        <ellipse cx="130" cy="100" rx="45" ry="30" fill="none" stroke="white" strokeWidth="0.8" />
        <ellipse cx="290" cy="200" rx="60" ry="45" fill="none" stroke="white" strokeWidth="0.8" />
        <ellipse cx="290" cy="200" rx="35" ry="25" fill="none" stroke="white" strokeWidth="0.8" />
      </svg>

      {/* Zone dots */}
      {zones.map((zone) => {
        const pos = getPosition(zone.latitude, zone.longitude);
        const level = getCrowdLevel(zone.id);
        const color = CROWD_COLORS[level] || CROWD_COLORS.unknown;
        const isActive = activeZoneId === zone.id;

        return (
          <button
            key={zone.id}
            className={[
              "absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2",
              "cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
              "transition-transform duration-200 ease-in-out",
              isActive ? "scale-125 z-20" : "z-10 hover:scale-110",
            ].join(" ")}
            style={{ left: pos.left, top: pos.top }}
            onClick={() => setActiveZone(zone.id)}
            aria-label={`${zone.name} - ${level} crowd level`}
          >
            {/* Ping animation for active dot */}
            {isActive && (
              <span
                className="absolute rounded-full animate-ping"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: color,
                  opacity: 0.3,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-200 ease-in-out"
              style={{
                width: isActive ? 18 : 14,
                height: isActive ? 18 : 14,
                backgroundColor: color,
                border: isActive ? "3px solid white" : "2px solid white",
                boxShadow: isActive
                  ? `0 0 0 2px ${color}, 0 2px 8px rgba(0,0,0,0.4)`
                  : "0 1px 4px rgba(0,0,0,0.4)",
              }}
            />

            {/* Label */}
            <span
              className={[
                "mt-1 text-[9px] leading-tight font-medium text-center whitespace-nowrap",
                "px-1 py-0.5 rounded bg-black/50 text-white",
                "transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
              ].join(" ")}
            >
              {zone.name}
            </span>
          </button>
        );
      })}

      {/* Info message */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
        <p className="text-[11px] text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full whitespace-nowrap">
          Interactive map requires Mapbox token
        </p>
      </div>
    </div>
  );
}
