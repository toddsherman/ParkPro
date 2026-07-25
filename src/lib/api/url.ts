/**
 * Next applies `basePath` to `next/link` and `next/image`, but not to raw
 * `fetch()`. This app is served under todd.sh/visitYosemite, so a bare
 * `fetch("/api/alerts")` resolves against the host root and hits todd.sh
 * instead of these route handlers.
 *
 * That failure is quiet — every caller catches and falls back to estimated
 * data — so the app would look fine while showing invented numbers. Route all
 * internal API calls through here.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function apiUrl(path: string): string {
  return `${BASE_PATH}${path}`;
}
