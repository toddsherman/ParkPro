import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/lib/context";
import BackBar from "@/components/BackBar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "ParkPro — Yosemite Trip Planner",
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
          /* Served through the todd.sh proxy, where the default per-project
             hashed script path 404s — the generic path works on both origins. */
          scriptSrc="/_vercel/insights/script.js"
          endpoint="/_vercel/insights"
        />
      </body>
    </html>
  );
}
