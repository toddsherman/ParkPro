"use client";

import { useState } from "react";
import { Mountain, Bell } from "lucide-react";
import { useApp } from "@/lib/context";
import AlertsBanner from "./AlertsBanner";

export default function Header() {
  const { state } = useApp();
  const [showAlerts, setShowAlerts] = useState(false);

  const alertCount = state.alerts.length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/90">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-lg tracking-tight">
                ParkPro
              </span>
              <span className="text-gray-400 text-[10px] -mt-0.5 hidden sm:block">
                Yosemite Trip Planner
              </span>
            </div>
          </div>

          {/* Alerts Toggle */}
          {alertCount > 0 && (
            <button
              onClick={() => setShowAlerts((prev) => !prev)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
              aria-label={`${alertCount} park alerts`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {alertCount}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Alerts Banner (rendered below fixed header) */}
      {showAlerts && alertCount > 0 && (
        <AlertsBanner onClose={() => setShowAlerts(false)} />
      )}
    </>
  );
}
