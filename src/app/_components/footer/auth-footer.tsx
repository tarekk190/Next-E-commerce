import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AuthFooter() {
  const t = useTranslations("Auth");
  return (
    <footer className="w-full border-t border-gray-200 mt-5 py-5 bg-white/0 mb-5">
      <div className="flex flex-col items-center gap-2 max-w-[350px] mx-auto">
        <div className="flex gap-4 text-[11px] text-blue-600">
          <Link
            href="/conditions-of-use"
            className="hover:text-[#c45500] hover:underline"
          >
            {t("conditions")}
          </Link>
          <Link
            href="/privacy-notice"
            className="hover:text-[#c45500] hover:underline"
          >
            {t("privacy")}
          </Link>
          <Link href="#" className="hover:text-[#c45500] hover:underline">
            {t("help")}
          </Link>
        </div>
        <p className="text-[11px] text-gray-500 mt-2">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
