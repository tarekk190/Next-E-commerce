"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(
        { pathname, query: Object.fromEntries(searchParams.entries()) },
        { locale: nextLocale },
      );
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium",
        isPending && "opacity-50 cursor-not-allowed",
        "rtl:flex-row-reverse",
      )}
      aria-label="Switch Language"
    >
      <Globe className="w-5 h-5" />
      <span>{locale === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
