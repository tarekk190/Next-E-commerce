"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import "@/app/css/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden text-slate-900">
          {/* Background Effects */}
          <div className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-200/40 blur-[120px] rounded-full pointing-events-none mix-blend-multiply opacity-70" />
          <div className="absolute bottom-0 end-0 w-[500px] h-[500px] bg-orange-100/60 blur-[100px] rounded-full pointing-events-none mix-blend-multiply opacity-70" />
          <div className="absolute top-0 start-0 w-[400px] h-[400px] bg-rose-100/60 blur-[100px] rounded-full pointing-events-none mix-blend-multiply opacity-70" />

          <div className="relative z-10 max-w-md w-full">
            <div className="flex justify-center mb-10 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-white/60 blur-2xl rounded-full" />
                <div className="animate-bounce duration-2000 relative z-10">
                  <AlertCircle
                    size={80}
                    className="text-red-600 drop-shadow-xl"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-[160px] font-black text-slate-900/5 select-none tracking-tighter mix-blend-overlay">
                  500
                </h1>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Something went wrong!
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xs mx-auto font-medium">
                We encountered an unexpected error. Please try again later.
              </p>
              {process.env.NODE_ENV === "development" && (
                <div className="bg-red-50 text-red-600 p-2 rounded text-sm font-mono break-all">
                  {error.message}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => reset()}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <RefreshCcw
                  size={18}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                Try Again
              </button>
            </div>
          </div>

          {/* Footer  */}
          <div className="absolute bottom-10 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] select-none opacity-60">
            E-COMMERCE
          </div>
        </div>
      </body>
    </html>
  );
}
