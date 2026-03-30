import Link from "next/link";
import { ShoppingBag, Search, Home } from "lucide-react";
import "@/app/css/globals.css";


export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden text-slate-900">
          <div className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/40 blur-[120px] rounded-full pointing-events-none mix-blend-multiply opacity-70" />
          <div className="absolute bottom-0 end-0 w-[500px] h-[500px] bg-blue-100/60 blur-[100px] rounded-full pointing-events-none mix-blend-multiply opacity-70" />
          <div className="absolute top-0 start-0 w-[400px] h-[400px] bg-purple-100/60 blur-[100px] rounded-full pointing-events-none mix-blend-multiply opacity-70" />

          <div className="relative z-10 max-w-md w-full">
            <div className="flex justify-center mb-10 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-white/60 blur-2xl rounded-full" />
                <div className="animate-bounce duration-2000 relative z-10">
                  <ShoppingBag
                    size={80}
                    className="text-indigo-600 drop-shadow-xl"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-[160px] font-black text-slate-900/5 select-none tracking-tighter mix-blend-overlay">
                  404
                </h1>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Page Not Found
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xs mx-auto font-medium">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Home
                  size={18}
                  className="group-hover:-translate-y-0.5 transition-transform"
                />
                Back to Home
              </Link>

              <Link
                href="/products"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 px-8 py-4 rounded-xl font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98]"
              >
                <Search
                  size={18}
                  className="group-hover:scale-110 transition-transform text-slate-500"
                />
                Browse Products
              </Link>
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
