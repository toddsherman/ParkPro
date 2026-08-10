/**
 * Convert a busyness score (0-10) to a hex colour on a
 * paper → stone → ochre → signal red → ink gradient.
 *
 * Stops:
 *  0 → #f4f1ea  (paper)
 *  3 → #c9c2b6  (light stone)
 *  5 → #b58a43  (muted ochre)
 *  7 → #b64832  (signal red)
 * 10 → #1d1c19  (ink)
 */
export function scoreToColor(score: number): string {
  const s = Math.max(0, Math.min(10, score));

  // Define colour stops as [score, r, g, b]
  const stops: [number, number, number, number][] = [
    [0, 0xf4, 0xf1, 0xea],
    [3, 0xc9, 0xc2, 0xb6],
    [5, 0xb5, 0x8a, 0x43],
    [7, 0xb6, 0x48, 0x32],
    [10, 0x1d, 0x1c, 0x19],
  ];

  // Find the two stops surrounding our score
  let low = stops[0];
  let high = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (s >= stops[i][0] && s <= stops[i + 1][0]) {
      low = stops[i];
      high = stops[i + 1];
      break;
    }
  }

  const range = high[0] - low[0];
  const t = range === 0 ? 0 : (s - low[0]) / range;

  const r = Math.round(low[1] + t * (high[1] - low[1]));
  const g = Math.round(low[2] + t * (high[2] - low[2]));
  const b = Math.round(low[3] + t * (high[3] - low[3]));

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function hex(n: number): string {
  return n.toString(16).padStart(2, "0");
}

/** Background colour for cells with no data */
export const EMPTY_COLOR = "#e9e4d9";
