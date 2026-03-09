"use client";

import React, { useEffect, useRef } from "react";
import { useApp } from "@/lib/context";
import Header from "@/components/Header/Header";
import WeekPicker from "@/components/DatePicker/WeekPicker";
import YosemiteMap from "@/components/Map/YosemiteMap";
import DetailPanel from "@/components/DetailPanel/DetailPanel";
import { fetchAllZoneData } from "@/lib/api";
import { fetchParkAlerts } from "@/lib/api/nps";
import { PARK_ZONES } from "@/lib/constants";
import { Mountain, TreePine, Loader2 } from "lucide-react";

export default function Home() {
  const {
    state,
    setAllZoneData,
    setLoading,
    setError,
    setAlerts,
  } = useApp();

  const { selectedWeek, isLoading, error } = state;
  const fetchedWeekRef = useRef<string | null>(null);

  // Fetch alerts on mount
  useEffect(() => {
    let cancelled = false;

    async function loadAlerts() {
      try {
        const alerts = await fetchParkAlerts();
        if (!cancelled) {
          setAlerts(alerts);
        }
      } catch (err) {
        console.error("Failed to fetch park alerts:", err);
      }
    }

    loadAlerts();

    return () => {
      cancelled = true;
    };
  }, [setAlerts]);

  // Fetch zone data when selectedWeek changes
  useEffect(() => {
    if (!selectedWeek) return;

    const weekKey = selectedWeek.startDate;
    if (fetchedWeekRef.current === weekKey) return;

    let cancelled = false;

    async function loadZoneData() {
      setLoading(true);
      setError(null);

      try {
        const allData = await fetchAllZoneData(PARK_ZONES, selectedWeek!.startDate);
        if (!cancelled) {
          setAllZoneData(allData);
          fetchedWeekRef.current = weekKey;
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to load park data";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadZoneData();

    return () => {
      cancelled = true;
    };
  }, [selectedWeek, setAllZoneData, setLoading, setError]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Week picker - positioned below fixed header */}
      <div className="pt-14">
        <WeekPicker />
      </div>

      {/* Main content area */}
      <main className="flex-1 relative overflow-hidden">
        {/* Map layer */}
        <YosemiteMap />

        {/* Detail panel */}
        <DetailPanel />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm fade-in">
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-xl">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Loading park data...
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fetching weather, crowds, and campsite availability
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && !isLoading && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 max-w-md w-full mx-4 fade-in">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 shadow-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-800/50">
                <span className="text-red-600 dark:text-red-400 text-sm font-bold">
                  !
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Something went wrong
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 truncate">
                  {error}
                </p>
              </div>
              <button
                onClick={() => setError(null)}
                className="flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                aria-label="Dismiss error"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Welcome overlay when no week is selected */}
        {!selectedWeek && !isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-5 p-10 rounded-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl max-w-sm mx-4 text-center pointer-events-auto fade-in">
              <div className="flex items-center gap-2">
                <Mountain className="w-8 h-8 text-emerald-600" />
                <TreePine className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  Welcome to ParkPro
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Select a week above to see crowd predictions, weather
                  forecasts, and campsite availability across Yosemite.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>Pick a week to get started</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
