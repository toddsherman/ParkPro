import type { NextConfig } from "next";

/**
 * Served under todd.sh/visitYosemite, which proxies this deployment via a
 * rewrite. basePath makes Next emit its asset and API URLs under that prefix —
 * without it the browser would request /_next/* against todd.sh's root and hit
 * that app's 404s instead of this build's chunks.
 */
const basePath = "/visitYosemite";

const nextConfig: NextConfig = {
  basePath,
  // Must match todd.sh, which proxies this app. It redirects /visitYosemite to
  // /visitYosemite/; without this, Next would redirect straight back and loop.
  trailingSlash: true,
  // basePath is not applied to raw fetch(), so the client API helpers need the
  // value too — exported here to keep one source of truth. See src/lib/api/url.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
