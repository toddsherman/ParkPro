"use client";


import { AlertTriangle, Info, XCircle, X } from "lucide-react";
import { useApp } from "@/lib/context";
import { ParkAlert } from "@/lib/types";

interface AlertsBannerProps {
  onClose: () => void;
}

const categoryConfig: Record<
  ParkAlert["category"],
  { bg: string; border: string; icon: React.ReactNode; textColor: string }
> = {
  danger: {
    bg: "bg-red-950/80",
    border: "border-red-700/60",
    icon: <XCircle className="w-4 h-4 text-red-400 shrink-0" />,
    textColor: "text-red-200",
  },
  caution: {
    bg: "bg-yellow-950/80",
    border: "border-yellow-700/60",
    icon: <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />,
    textColor: "text-yellow-200",
  },
  information: {
    bg: "bg-blue-950/80",
    border: "border-blue-700/60",
    icon: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
    textColor: "text-blue-200",
  },
};

export default function AlertsBanner({ onClose }: AlertsBannerProps) {
  const { state } = useApp();

  if (state.alerts.length === 0) return null;

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 max-h-64 overflow-y-auto">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        {/* Header row with close button */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-300">
            Park Alerts ({state.alerts.length})
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            aria-label="Close alerts"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alert items */}
        <div className="space-y-2">
          {state.alerts.map((alert) => {
            const config = categoryConfig[alert.category];
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-2.5 px-3 py-2 rounded-lg border ${config.bg} ${config.border}`}
              >
                <div className="mt-0.5">{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${config.textColor} leading-snug`}
                  >
                    {alert.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                    {alert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
