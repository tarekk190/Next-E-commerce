"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Package,
  ShieldCheck,
  CreditCard,
  MapPin,
  Headset,
  Star,
} from "lucide-react";

export default function AccountPage() {
  const t = useTranslations("AccountPage");

  const cards = [
    {
      title: t("orders.title"),
      description: t("orders.description"),
      icon: <Package className="w-10 h-10 text-amber-600" />,
      href: "/allorders",
    },
    {
      title: t("security.title"),
      description: t("security.description"),
      icon: <ShieldCheck className="w-10 h-10 text-amber-600" />,
      href: "/account/security",
    },
    {
      title: t("prime.title"),
      description: t("prime.description"),
      icon: <Star className="w-10 h-10 text-amber-600" />,
      href: "/prime",
    },
    {
      title: t("addresses.title"),
      description: t("addresses.description"),
      icon: <MapPin className="w-10 h-10 text-amber-600" />,
      href: "/addresses",
    },
    {
      title: t("payments.title"),
      description: t("payments.description"),
      icon: <CreditCard className="w-10 h-10 text-amber-600" />,
      href: "/payments",
    },
    {
      title: t("contact.title"),
      description: t("contact.description"),
      icon: <Headset className="w-10 h-10 text-amber-600" />,
      href: "/contact",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-normal mb-6">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="group flex gap-4 p-5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="shrink-0 pt-1">{card.icon}</div>
            <div>
              <h2 className="text-lg font-normal mb-1">{card.title}</h2>
              <p className="text-sm text-gray-500 leading-snug group-hover:text-amber-700">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
