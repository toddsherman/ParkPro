import Link from "next/link";
import { Mountain, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 max-w-sm mx-4 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
          <Mountain className="w-8 h-8 text-emerald-600" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
            404
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-2">
            This trail doesn&apos;t seem to exist. Looks like you wandered off
            the map.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ParkPro
        </Link>
      </div>
    </div>
  );
}
