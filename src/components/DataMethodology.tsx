"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info, X, BarChart3, MapPin, Calendar, Sun } from "lucide-react";

export default function DataMethodology() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Data sources and methodology"
        title="Data sources & methodology"
      >
        <Info className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Methodology</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Data Sources & Methodology
              </h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-5 py-4 space-y-5 text-sm text-slate-600 dark:text-slate-300">
            {/* Monthly Visitor Counts */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Monthly Visitor Counts
                </h3>
              </div>
              <p className="leading-relaxed">
                Monthly busyness baselines are derived from{" "}
                <strong>NPS recreation visitor statistics</strong> for Yosemite
                (park code YOSE), averaging data from 2015&ndash;2019 and
                2022&ndash;2024. Years 2020&ndash;2021 are excluded due to
                COVID-19 closures and reservation systems. The 2023 March
                anomaly (park closure, only 25k visitors) is also excluded.
              </p>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                Source: NPS Stats REST API &mdash;{" "}
                <a
                  href="https://irma.nps.gov/Stats/Reports/Park/YOSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  irma.nps.gov/Stats
                </a>{" "}
                &middot;{" "}
                <a
                  href="https://www.nps.gov/yose/planyourvisit/visitation.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  nps.gov/yose visitation
                </a>
              </p>
            </section>

            {/* Zone Popularity */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Zone Popularity
                </h3>
              </div>
              <p className="leading-relaxed">
                Zone-specific crowd multipliers are calibrated from three NPS
                data sources:
              </p>
              <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Entrance traffic counts</strong> (2024) &mdash;
                  vehicle counts at 7 park entrances. Valley entrances receive
                  ~65% of total traffic; Hetch Hetchy only 1.8%.
                </li>
                <li>
                  <strong>NPS Visitor Studies</strong> &mdash; Summer 2009: 70%
                  of visitor groups visited Yosemite Valley. Winter 2008: Valley
                  59%, Glacier Point 55%, Wawona 43%.
                </li>
                <li>
                  <strong>NPS Traffic page</strong> &mdash; South Entrance
                  delays of 1&ndash;2 hours vs. ~30 minutes at other entrances.
                </li>
              </ul>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                Source:{" "}
                <a
                  href="https://irma.nps.gov/Stats/SSRSReports/Park%20Specific%20Reports/Traffic%20Counts?Park=YOSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  IRMA Traffic Counts
                </a>{" "}
                &middot; NPS Visitor Use Studies (2008, 2009)
              </p>
            </section>

            {/* Scoring Formula */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Scoring Formula
                </h3>
              </div>
              <p className="leading-relaxed">
                Each day&rsquo;s crowd score (0&ndash;10) combines four factors:
              </p>
              <div className="mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300">
                score = monthBase &times; dayOfWeek &times; zonePopularity &times; holiday + variance
              </div>
              <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Month baseline</strong> (0&ndash;10) &mdash; from NPS
                  visitor counts, normalized so July (peak) = 10.0
                </li>
                <li>
                  <strong>Day-of-week</strong> (0.6&ndash;1.4) &mdash; Saturday
                  is busiest (1.4&times;), Monday/Tuesday quietest (0.6&times;)
                </li>
                <li>
                  <strong>Zone popularity</strong> (0.4&ndash;1.5) &mdash;
                  Yosemite Valley is 1.5&times;, Hetch Hetchy is 0.4&times;
                </li>
                <li>
                  <strong>Holiday boost</strong> (1.0&ndash;1.4) &mdash;
                  Memorial Day, July 4th, Labor Day peak at 1.4&times;
                </li>
                <li>
                  <strong>Variance</strong> (&minus;0.25 to +0.25) &mdash;
                  deterministic noise for visual texture
                </li>
              </ul>
            </section>

            {/* Weather Data */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Weather Data
                </h3>
              </div>
              <p className="leading-relaxed">
                Monthly temperature ranges shown on the calendar use historic
                averages for Yosemite Valley elevation. When a date range is
                selected within the 7-day forecast window, live weather data is
                fetched from the OpenWeatherMap API. For dates beyond the
                forecast window, seasonal averages are used.
              </p>
            </section>

            {/* Assumptions & Limitations */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Assumptions & Limitations
                </h3>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                <li>
                  Scores are <strong>predictions based on historic patterns</strong>,
                  not real-time data. Actual conditions may vary due to
                  road closures, weather events, or policy changes.
                </li>
                <li>
                  Day-of-week multipliers are qualitative estimates based on NPS
                  guidance that parking fills by 8am on summer weekends.
                </li>
                <li>
                  COVID-era data (2020&ndash;2021) is excluded since reservation
                  systems artificially capped visitation.
                </li>
                <li>
                  Zone popularity is static and does not account for seasonal
                  road closures (e.g., Tioga Pass closed Nov&ndash;May).
                </li>
                <li>
                  Federal holiday detection covers 8 major holidays and spring
                  break but does not include state holidays or special events.
                </li>
              </ul>
            </section>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              All data sourced from the National Park Service (NPS). This tool is
              not affiliated with or endorsed by the NPS.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
