import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/lib/context";
import BackBar from "@/components/BackBar";
import "./globals.css";

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
      </body>
    </html>
  );
}
