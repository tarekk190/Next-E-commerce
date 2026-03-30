"use client";

import { DURATION, EASING } from "@/animations/core/config";
import { gsap, useGsap } from "@/animations/hooks/useGsap";
import { Signout } from "@/app/api/auth/signout";
import { Link } from "@/i18n/routing";
import {
  Box,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  Settings,
  User,
  UserCog,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

interface MobileAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function MobileAccountDrawer({
  isOpen,
  onClose,
  userName,
}: MobileAccountDrawerProps) {
  const t = useTranslations("Navbar");
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    if (isOpen) {
      gsap.to(backdropRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: DURATION.NORMAL,
      });
      gsap.to(drawerRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power3.out",
      });
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 },
        );
      }
    } else {
      gsap.to(backdropRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: DURATION.FAST,
      });
      gsap.to(drawerRef.current, {
        y: "100%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const sections = [
    {
      title: t("yourOrders") || "Your Orders",
      items: [
        {
          label: t("yourOrders") || "Track & Manage Orders",
          href: "/allorders",
          icon: Package,
        },
        {
          label: t("buyItAgain") || "Buy Again",
          href: "/allorders?filter=buy-again",
          icon: RotateCcw,
        },
        {
          label: t("returns") || "Your Returns",
          href: "/returns",
          icon: Box,
        },
      ],
    },
    {
      title: t("yourAccount") || "Your Account",
      items: [
        {
          label: t("manageProfiles") || "Profile",
          href: "/profile",
          icon: User,
        },
        {
          label: t("yourLists") || "Your Lists",
          href: "/wishlist",
          icon: Heart,
          highlight: true,
        },
        {
          label: t("yourAddresses") || "Your Addresses",
          href: "/addresses",
          icon: MapPin,
        },
        {
          label: "Login & Security",
          href: "/account/security",
          icon: UserCog,
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-60 lg:hidden pointer-events-none">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 opacity-0 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute bottom-0 inset-x-0 bg-gray-50 rounded-t-2xl shadow-2xl transform translate-y-full max-h-[90vh] flex flex-col pointer-events-auto"
      >
        {/*  Header */}
        <div className="bg-white rounded-t-2xl px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              {t("greeting")}
            </span>
            <span className="text-xl font-bold text-gray-900">
              {userName || "Guest"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100/80 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div ref={contentRef} className="overflow-y-auto p-5 space-y-6 pb-10">
          {/* Orders Section  */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-lg px-1">
              {sections[0].title}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/allorders"
                onClick={onClose}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-cyan-200 active:scale-95 transition-all"
              >
                <Package className="w-6 h-6 text-cyan-600" />
                <span className="text-sm font-medium text-center">
                  {t("yourOrders") || "Orders"}
                </span>
              </Link>
              <Link
                href="/allorders?filter=buy-again"
                onClick={onClose}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-cyan-200 active:scale-95 transition-all"
              >
                <RotateCcw className="w-6 h-6 text-cyan-600" />
                <span className="text-sm font-medium text-center">
                  {t("buyItAgain") || "Buy Again"}
                </span>
              </Link>
            </div>
          </div>

          {/* Account Section  */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <h3 className="font-bold text-gray-900 text-base p-4 border-b border-gray-50 bg-gray-50/50">
              {sections[1].title}
            </h3>
            <div className="divide-y divide-gray-50">
              {sections[1].items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${item.highlight ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"}`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700 flex-1">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Settings & Sign Out */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <h3 className="font-bold text-gray-900 text-base p-4 border-b border-gray-50 bg-gray-50/50">
              Settings
            </h3>
            <div className="divide-y divide-gray-50">
              <button
                onClick={() => {
                  Signout();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-red-50 hover:text-red-600 transition-colors text-start group"
              >
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-red-600">
                  {t("signout")}
                </span>
              </button>
              <div className="p-4 text-center">
                <p className="text-xs text-gray-400">Version 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
