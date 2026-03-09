"use client";

import React, { useCallback } from "react";
import Map, { MapMouseEvent, Source, Layer, Marker } from "react-map-gl/mapbox";
import type {
  FillLayerSpecification,
  LineLayerSpecification,
} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useApp } from "@/lib/context";
import { YOSEMITE_CENTER, DEFAULT_ZOOM } from "@/lib/constants";
import { CrowdLevel } from "@/lib/types";
import {
  yosemiteBoundary,
  yosemiteInvertedBoundary,
} from "@/lib/data/yosemite-boundary";
import { parkTrails, parkEntrances } from "@/lib/data/park-features";
import MapPin from "./MapPin";
import MapFallback from "./MapFallback";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// --- Layer styles ---

// Mask outside the park
const maskLayerStyle: FillLayerSpecification = {
  id: "park-mask",
  type: "fill",
  source: "park-mask-source",
  paint: {
    "fill-color": "#e2e0dc",
    "fill-opacity": 0.55,
  },
};

// Park boundary outline
const boundaryLineStyle: LineLayerSpecification = {
  id: "park-boundary-line",
  type: "line",
  source: "park-boundary-source",
  paint: {
    "line-color": "#2d6a4f",
    "line-width": 2.5,
    "line-opacity": 0.8,
    "line-dasharray": [4, 2],
  },
};

// Trails (dotted line)
const trailLayerStyle: LineLayerSpecification = {
  id: "park-trails",
  type: "line",
  source: "park-trails-source",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": "#b45309",
    "line-width": 2,
    "line-opacity": 0.7,
    "line-dasharray": [2, 2],
  },
};

export default function YosemiteMap() {
  const { state, setActiveZone } = useApp();
  const { zones, zoneData, activeZoneId } = state;

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (activeZoneId !== null) {
        setActiveZone(null);
      }
    },
    [activeZoneId, setActiveZone]
  );

  const handlePinClick = useCallback(
    (zoneId: string) => {
      setActiveZone(zoneId);
    },
    [setActiveZone]
  );

  function getCrowdLevel(zoneId: string): CrowdLevel {
    return zoneData[zoneId]?.overallBusyness ?? "unknown";
  }

  if (!MAPBOX_TOKEN) {
    return (
      <div className="relative w-full h-full min-h-[300px]">
        <MapFallback />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
          <p className="text-xs text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-md shadow-sm whitespace-nowrap">
            Set NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <Map
        initialViewState={{
          latitude: YOSEMITE_CENTER.latitude,
          longitude: YOSEMITE_CENTER.longitude,
          zoom: DEFAULT_ZOOM,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={handleMapClick}
        reuseMaps
      >
        {/* Grayscale mask outside park boundary */}
        <Source id="park-mask-source" type="geojson" data={yosemiteInvertedBoundary}>
          <Layer {...maskLayerStyle} />
        </Source>

        {/* Park boundary dashed outline */}
        <Source id="park-boundary-source" type="geojson" data={yosemiteBoundary}>
          <Layer {...boundaryLineStyle} />
        </Source>

        {/* Trails */}
        <Source id="park-trails-source" type="geojson" data={parkTrails}>
          <Layer {...trailLayerStyle} />
        </Source>

        {/* Entrance gate markers */}
        {parkEntrances.map((entrance) => (
          <Marker
            key={entrance.id}
            longitude={entrance.longitude}
            latitude={entrance.latitude}
            anchor="center"
          >
            <div className="flex flex-col items-center group cursor-default">
              {/* Gate icon */}
              <div
                className="flex items-center justify-center rounded-md border-2 border-amber-800 bg-amber-50 shadow-md"
                style={{ width: 26, height: 22 }}
                title={`${entrance.name} (${entrance.highway})`}
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple gate icon */}
                  <rect x="1" y="2" width="2" height="10" rx="0.5" fill="#92400e" />
                  <rect x="13" y="2" width="2" height="10" rx="0.5" fill="#92400e" />
                  <rect x="0" y="0" width="4" height="2" rx="0.5" fill="#92400e" />
                  <rect x="12" y="0" width="4" height="2" rx="0.5" fill="#92400e" />
                  <path d="M3 4 H13 M3 7 H13 M3 10 H13" stroke="#b45309" strokeWidth="0.8" />
                </svg>
              </div>
              {/* Label */}
              <span
                className={[
                  "mt-0.5 text-center whitespace-nowrap px-1.5 py-0.5 rounded",
                  "text-[9px] leading-tight font-semibold",
                  "bg-amber-50/95 text-amber-900 shadow-sm border border-amber-200/60",
                  "pointer-events-none select-none",
                ].join(" ")}
              >
                {entrance.name.replace(" Entrance", "")}
                {entrance.seasonalClosure && (
                  <span className="ml-0.5 text-amber-500 text-[8px]">⛄</span>
                )}
              </span>
            </div>
          </Marker>
        ))}

        {/* Zone pins (on top of everything) */}
        {zones.map((zone) => (
          <MapPin
            key={zone.id}
            zone={zone}
            crowdLevel={getCrowdLevel(zone.id)}
            isActive={activeZoneId === zone.id}
            onClick={handlePinClick}
          />
        ))}
      </Map>

      {/* Map legend */}
      <div className="absolute bottom-8 left-3 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg p-3 text-[10px] space-y-1.5 pointer-events-none">
        <div className="font-semibold text-[11px] text-slate-700 dark:text-slate-200 mb-1">
          Map Legend
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 border-t-2 border-dashed border-[#b45309]" />
          <span className="text-slate-600 dark:text-slate-300">Trail</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 border-t-2 border-dashed border-[#2d6a4f]" />
          <span className="text-slate-600 dark:text-slate-300">Park Boundary</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22c55e] border border-white" />
          <span className="text-slate-600 dark:text-slate-300">Low Crowds</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#eab308] border border-white" />
          <span className="text-slate-600 dark:text-slate-300">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-white" />
          <span className="text-slate-600 dark:text-slate-300">High Crowds</span>
        </div>
      </div>
    </div>
  );
}
