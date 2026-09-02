import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/lib/context";
import BackBar from "@/components/BackBar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Yosemite Crowd Calendar",
  description:
    "Plan your perfect Yosemite visit with real-time crowd, weather, and trail data",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BackBar />
        <AppProvider>{children}</AppProvider>
        <Analytics
          /* This app is served through a rewrite at www.todd.sh, so analytics
             requests hit the todd.sh origin — where the SDK's default
             per-project HASHED endpoints (baked in at build time) 404. Every
             endpoint is pinned to the generic /_vercel/insights paths, which
             both origins serve. Consequence: views through the proxy are
             attributed to the todd-sh project's Analytics dashboard (the
             intended single dashboard for the whole site), not this
             project's. Do not remove these props — pageviews from the proxy
             silently stop counting. */
          scriptSrc="/_vercel/insights/script.js"
          endpoint="/_vercel/insights"
          viewEndpoint="/_vercel/insights/view"
          eventEndpoint="/_vercel/insights/event"
          sessionEndpoint="/_vercel/insights/session"
        />
      </body>
    </html>
  );
}
