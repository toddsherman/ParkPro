# ParkPro - Yosemite Crowd Calendar

A trip-planning tool that predicts crowd levels at Yosemite National Park throughout the year, helping visitors find the best times to visit.

## What It Does

ParkPro displays an interactive calendar heatmap showing predicted daily crowd levels for Yosemite. Users can select a date range to see zone-by-zone breakdowns, weather forecasts, campsite availability, and park alerts.

### Key Features

- **Calendar heatmap** with color-coded daily crowd predictions (green = quiet, red = busy)
- **10 park zones** with real GPS coordinates (Yosemite Valley, Glacier Point, Tuolumne Meadows, etc.)
- **Date range selection** with detailed trip analysis including zone rankings and daily breakdown
- **Monthly weather** averages displayed on the calendar (high/low temps)
- **Live weather** from OpenWeatherMap for dates within the 7-day forecast window
- **Park alerts** from the NPS API (closures, warnings, hazards)
- **Campsite availability** via Recreation.gov API
- **Data transparency** with a methodology modal explaining all data sources

## Data Sources & Methodology

All crowd predictions are grounded in real NPS data:

- **Monthly baselines** derived from NPS recreation visitor statistics (2015-2024), averaging ~4.8M annual visitors. July is the peak month (~602k visitors), January the quietest (~126k).
- **Zone popularity** calibrated from NPS entrance traffic counts (2024, 2.1M vehicles across 7 entrances) and NPS Visitor Use Studies (2008, 2009). Yosemite Valley receives ~70% of all visitor groups.
- **Day-of-week effects** based on NPS qualitative data showing parking fills by 8am on summer weekends.
- **Federal holiday boosts** for 8 major holidays (Memorial Day, July 4th, Labor Day, etc.) which cause 1-2 hour entrance delays.

Each day's score (0-10) is computed as:

```
score = monthBase x dayOfWeek x zonePopularity x holidayMultiplier + variance
```

Sources:
- [NPS IRMA Stats](https://irma.nps.gov/Stats/Reports/Park/YOSE)
- [NPS Yosemite Visitation](https://www.nps.gov/yose/planyourvisit/visitation.htm)
- [NPS Traffic Counts](https://irma.nps.gov/Stats/SSRSReports/Park%20Specific%20Reports/Traffic%20Counts?Park=YOSE)
- [NPS Visitor Use Studies](https://www.nps.gov/yose/learn/nature/upload/Visitor-Use-Summer-2009-Study.pdf)

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **date-fns** for date manipulation
- **lucide-react** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables (Optional)

The app works fully without any API keys (falls back to realistic generated data). To enable live data, create a `.env.local` file:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=     # Map rendering
OPENWEATHERMAP_API_KEY=       # Weather forecasts
NPS_API_KEY=                  # Park alerts
RECREATION_GOV_API_KEY=       # Campsite availability
```

## Project Structure

```
src/
  app/
    page.tsx              # Main calendar heatmap page
    api/                  # Server-side API routes (weather, alerts, availability)
  components/
    Calendar/             # CalendarHeatmap, HeatmapLegend, HeatmapTooltip, YearSelector
    Header/               # Header, AlertsBanner
    RangePanel/           # Trip detail panel (summary, daily table, zone rankings)
    DataMethodology.tsx   # Data sources & methodology modal
  lib/
    constants.ts          # Park zones, NPS data, busyness scores, climate data
    context.tsx           # React Context (AppProvider)
    types.ts              # TypeScript types
    utils/
      scoring.ts          # Busyness calculation engine
      yearScores.ts       # Full-year score computation
    api/                  # Client-side API functions
  __tests__/              # Jest test suite (70 tests)
```

## Testing

```bash
npm test
```

## Deploy

The easiest way to deploy is with [Vercel](https://vercel.com):

```bash
npx vercel
```

No custom domain is required - Vercel provides a free `*.vercel.app` subdomain automatically.
