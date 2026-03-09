"use client";

import React, { useCallback } from "react";
import { Marker } from "react-map-gl/mapbox";
import { ParkZone, CrowdLevel } from "@/lib/types";
import { CROWD_COLORS } from "@/lib/constants";

interface MapPinProps {
  zone: ParkZone;
  crowdLevel: CrowdLevel;
  isActive: boolean;
  onClick: (zoneId: string) => void;
}

export default function MapPin({
  zone,
  crowdLevel,
  isActive,
  onClick,
}: MapPinProps) {
  const color = CROWD_COLORS[crowdLevel] || CROWD_COLORS.unknown;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick(zone.id);
    },
    [onClick, zone.id]
  );

  const pinSize = isActive ? 20 : 14;
  const borderWidth = isActive ? 3 : 2;
  const outerSize = pinSize + borderWidth * 2;

  return (
    <Marker
      longitude={zone.longitude}
      latitude={zone.latitude}
      anchor="bottom"
    >
      <div
        className="flex flex-col items-center cursor-pointer group"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`${zone.name} - ${crowdLevel} crowd level`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(zone.id);
          }
        }}
      >
        {/* Touch target wrapper - ensures min 32px tap area */}
        <div
          className="flex items-center justify-center"
          style={{ minWidth: 32, minHeight: 32 }}
        >
          {/* Active ring */}
          {isActive && (
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: outerSize + 8,
                height: outerSize + 8,
                backgroundColor: color,
                opacity: 0.3,
              }}
            />
          )}

          {/* Pin circle */}
          <div
            className="rounded-full relative transition-all duration-200 ease-in-out group-hover:scale-110"
            style={{
              width: outerSize,
              height: outerSize,
              backgroundColor: color,
              border: `${borderWidth}px solid white`,
              boxShadow: isActive
                ? `0 0 0 2px ${color}, 0 2px 8px rgba(0,0,0,0.3)`
                : "0 1px 4px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Zone name label */}
        <span
          className={[
            "mt-0.5 text-center whitespace-nowrap px-1.5 py-0.5 rounded",
            "text-[10px] leading-tight font-medium",
            "bg-white/90 text-gray-800 shadow-sm",
            "transition-all duration-200 ease-in-out",
            "pointer-events-none select-none",
            isActive ? "opacity-100 font-semibold" : "opacity-80 group-hover:opacity-100",
          ].join(" ")}
        >
          {zone.name}
        </span>
      </div>
    </Marker>
  );
}
