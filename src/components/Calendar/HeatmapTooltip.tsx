"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { format, parseISO, getMonth } from "date-fns";
import { scoreToCrowdLevel, getHolidayLabel } from "@/lib/utils/scoring";
import { CROWD_COLORS, CROWD_LABELS, MONTHLY_CLIMATE } from "@/lib/constants";
import { Thermometer } from "lucide-react";

const EDGE = 8; // minimum gap between the tooltip and the viewport edge

interface HeatmapTooltipProps {
  date: string;
  score: number;
  position: { x: number; y: number };
}

export default function HeatmapTooltip({
  date,
  score,
  position,
}: HeatmapTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [clamped, setClamped] = useState<{ left: number; top: number } | null>(
    null
  );

  // The naive spot (right of and slightly above the pointer) runs off screen
  // for taps near the right or bottom edges — on phones that is most of the
  // Sat/Sun columns. Measure the rendered size and clamp before paint,
  // flipping above the pointer when the bottom would overflow.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    let left = position.x + 12;
    if (left + width > window.innerWidth - EDGE) {
      left = position.x - width - 12; // flip to the left of the pointer
    }
    left = Math.max(EDGE, Math.min(left, window.innerWidth - width - EDGE));

    let top = position.y - 8;
    if (top + height > window.innerHeight - EDGE) {
      top = position.y - height - 12; // flip above the pointer
    }
    top = Math.max(EDGE, Math.min(top, window.innerHeight - height - EDGE));

    setClamped({ left, top });
  }, [position.x, position.y]);

  const parsed = parseISO(date);
  const crowdLevel = scoreToCrowdLevel(score);
  const formattedDate = format(parsed, "EEEE, MMMM d, yyyy");
  const dotColor = CROWD_COLORS[crowdLevel] ?? CROWD_COLORS.unknown;
  const label = CROWD_LABELS[crowdLevel] ?? CROWD_LABELS.unknown;
  const holidayLabel = getHolidayLabel(parsed);

  // Monthly climate for this date
  const month = getMonth(parsed) + 1; // 1-indexed
  const climate = MONTHLY_CLIMATE[month];

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-50 rounded-lg bg-white px-3 py-2 shadow-lg dark:bg-slate-800"
      style={{
        left: clamped?.left ?? position.x + 12,
        top: clamped?.top ?? position.y - 8,
        // measured-but-unclamped first frame never paints: useLayoutEffect
        // runs before paint, so hide until the clamp has been computed
        visibility: clamped ? "visible" : "hidden",
      }}
    >
      <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
        {formattedDate}
      </p>
      {holidayLabel && (
        <span className="mt-1 inline-block rounded-full bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 text-[10px] font-medium text-sky-700 dark:text-sky-300">
          {holidayLabel}
        </span>
      )}
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        Score: {score.toFixed(1)} / 10
      </p>
      <div className="mt-1 flex items-center gap-1.5">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <span className="text-xs text-slate-600 dark:text-slate-300">
          {label}
        </span>
      </div>
      {climate && (
        <div className="mt-1.5 flex items-center gap-1.5 border-t border-slate-200 dark:border-slate-700 pt-1.5">
          <Thermometer className="w-3 h-3 text-slate-400 dark:text-slate-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Typical: {climate.highF}°/{climate.lowF}°F
          </span>
        </div>
      )}
    </div>
  );
}
