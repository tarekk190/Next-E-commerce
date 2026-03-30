"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";

export default function MobileBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on homepage
  if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-[140px] left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors lg:hidden border border-gray-100"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 text-gray-700" />
    </button>
  );
}
