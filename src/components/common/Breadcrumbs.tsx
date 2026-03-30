import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations("Navbar");
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link href="/" className="hover:text-black transition-colors">
        {t("home")}
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-xs block">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
