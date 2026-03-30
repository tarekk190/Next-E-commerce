"use client";

import { DURATION, EASING } from "@/animations/core/config";
import { gsap, useGsap } from "@/animations/hooks/useGsap";
import { X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCategories: () => void;
}

import { useLocale, useTranslations } from "next-intl";

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenCategories,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const isRtl = locale === "ar";

  useGsap(() => {
    if (!overlayRef.current || !menuRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: DURATION.NORMAL,
      });
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.4,
        ease: EASING.DEFAULT,
      });
      if (linksRef.current) {
        gsap.fromTo(
          Array.from(linksRef.current.children),
          { x: isRtl ? 20 : -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: DURATION.NORMAL,
            stagger: 0.1,
            delay: 0.2,
          },
        );
      }
    } else {
      // Overlay fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: DURATION.NORMAL,
        delay: 0.1,
      });
      // Menu slide out
      gsap.to(menuRef.current, {
        x: isRtl ? "100%" : "-100%",
        duration: DURATION.NORMAL,
        ease: EASING.SHARP,
      });
    }
  }, [isOpen, isRtl]);

  const links = [
    { title: t("brands"), href: "/brands" },
    { title: t("products"), href: "/products" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 opacity-0 pointer-events-none backdrop-blur-sm "
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className="fixed top-0 start-0 z-50 h-full w-[80%] max-w-[300px] bg-white shadow-xl transform ltr:-translate-x-full rtl:translate-x-full"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <span className="text-xl font-bold">{t("menu")}</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-6 flex flex-col items-start" ref={linksRef}>
          <Link
            href="/"
            className="w-full block py-3 text-lg font-medium text-gray-700 hover:text-black border-b border-gray-100"
            onClick={onClose}
          >
            {t("home")}
          </Link>
          <button
            className="w-full text-start block py-3 text-lg font-medium text-gray-700 hover:text-black border-b border-gray-100 cursor-pointer"
            onClick={onOpenCategories}
          >
            {t("categories")}
          </button>
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="w-full block py-3 text-lg font-medium text-gray-700 hover:text-black border-b border-gray-100"
              onClick={onClose}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
