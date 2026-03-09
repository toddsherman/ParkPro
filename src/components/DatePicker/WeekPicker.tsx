"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/context";
import { getSelectableWeeks } from "@/lib/utils/dates";
import { format, parseISO, isThisWeek, startOfWeek } from "date-fns";

export default function WeekPicker() {
  const { state, setWeek } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const weeks = useMemo(() => getSelectableWeeks(12), []);

  const currentWeekStart = useMemo(() => {
    const now = new Date();
    return format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");
  }, []);

  // Scroll selected week into view on mount or selection change
  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [state.selectedWeek]);

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        {/* Label */}
        <div className="flex items-center gap-1.5 mb-2">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Select Week
          </span>
        </div>

        {/* Week cards - horizontal scroll on mobile, wrapping grid on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-x-visible scrollbar-hide"
        >
          {weeks.map((week) => {
            const isSelected =
              state.selectedWeek?.startDate === week.startDate;
            const isCurrent = week.startDate === currentWeekStart;
            const startDate = parseISO(week.startDate);
            const endDate = parseISO(week.endDate);

            const monthLabel = format(startDate, "MMM");
            const startDay = format(startDate, "d");
            const endDay = format(endDate, "d");
            const endMonth = format(endDate, "MMM");
            const showEndMonth = monthLabel !== endMonth;

            return (
              <button
                key={week.startDate}
                ref={isSelected ? selectedRef : undefined}
                onClick={() => setWeek(week)}
                className={`
                  relative flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-xl
                  border transition-all duration-200 min-w-[120px]
                  ${
                    isSelected
                      ? "bg-emerald-600/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-gray-800/60 border-gray-700/50 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white"
                  }
                `}
              >
                {/* Current week indicator */}
                {isCurrent && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0 text-[9px] font-bold uppercase rounded-full bg-emerald-500 text-white tracking-wider">
                    Now
                  </span>
                )}

                {/* Month */}
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isSelected ? "text-emerald-400" : "text-gray-500"
                  }`}
                >
                  {monthLabel}
                </span>

                {/* Date range */}
                <span className="text-sm font-bold whitespace-nowrap">
                  {startDay}
                  <ChevronRight className="w-3 h-3 inline-block mx-0.5 opacity-40" />
                  {showEndMonth && (
                    <span className="text-[10px] font-normal opacity-60">
                      {endMonth}{" "}
                    </span>
                  )}
                  {endDay}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
