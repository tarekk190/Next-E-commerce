"use client";

import { DURATION, EASING } from "@/animations/core/config";
import { gsap, useGsap } from "@/animations/hooks/useGsap";
import { Category } from "@/types/category";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface MobileCategoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

import { useLocale } from "next-intl";

export default function MobileCategoriesDrawer({
  isOpen,
  onClose,
  categories,
}: MobileCategoriesDrawerProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mainListRef = useRef<HTMLDivElement>(null);
  const subListRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    if (isOpen) {
      // Entrance
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: DURATION.NORMAL,
        pointerEvents: "auto",
      });
      gsap.to(drawerRef.current, {
        x: 0,
        duration: DURATION.NORMAL,
        ease: EASING.DEFAULT,
      });
    } else {
      // Exit
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: DURATION.NORMAL,
        pointerEvents: "none",
      });
      gsap.to(drawerRef.current, {
        x: isRtl ? "100%" : "-100%",
        duration: DURATION.NORMAL,
        ease: EASING.SHARP,
        onComplete: () => setActiveCategory(null),
      });
    }
  }, [isOpen, isRtl]);

  // Drill Down Animation
  useGsap(() => {
    if (!mainListRef.current || !subListRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: DURATION.NORMAL, ease: EASING.SMOOTH },
    });

    if (activeCategory) {
      tl.to(mainListRef.current, { x: isRtl ? "30%" : "-30%", opacity: 0 }).to(
        subListRef.current,
        { x: "0%", opacity: 1 },
        "<",
      );
    } else {
      tl.to(subListRef.current, { x: isRtl ? "-100%" : "100%", opacity: 0 }).to(
        mainListRef.current,
        { x: "0%", opacity: 1 },
        "<",
      );
    }
  }, [activeCategory, isRtl]);

  useGsap(() => {
    if (subListRef.current) {
      gsap.set(subListRef.current, { x: isRtl ? "-100%" : "100%", opacity: 0 });
    }
  }, [isRtl]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden  ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      ref={containerRef}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 opacity-0"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute inset-y-0 start-0 w-[80%] max-w-sm bg-white shadow-xl flex flex-col transform ltr:-translate-x-full rtl:translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {activeCategory ? (
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-black"
            >
              <ChevronLeft className="w-5 h-5 me-1 rtl:rotate-180" />
              Main Menu
            </button>
          ) : (
            <span className="font-bold text-lg">Categories</span>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/*  Sliding Views */}
        <div className="flex-1 overflow-hidden relative">
          {/* Main Categories List */}
          <div
            ref={mainListRef}
            className="absolute inset-0 overflow-y-auto bg-white"
          >
            <ul className="divide-y divide-gray-100">
              {categories.map((category) => (
                <li key={category._id}>
                  <button
                    onClick={() => {
                      if (
                        category.subcategories &&
                        category.subcategories.length > 0
                      ) {
                        setActiveCategory(category);
                      } else {
                        onClose();
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 active:bg-gray-100 text-start transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {category.image && (
                        <img
                          src={category.image}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover bg-gray-100"
                        />
                      )}
                      <span className="font-medium text-gray-800">
                        {category.name}
                      </span>
                    </div>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories List */}
          <div
            ref={subListRef}
            className="absolute inset-0 overflow-y-auto bg-white opacity-0"
          >
            {activeCategory && (
              <div className="flex flex-col">
                <div className="p-4 bg-gray-50 border-b">
                  <h3 className="font-bold text-lg text-gray-900">
                    {activeCategory.name}
                  </h3>
                  <Link
                    href={`/products?category=${activeCategory._id}`}
                    onClick={onClose}
                    className="text-sm text-amber-600 font-medium mt-1 inline-block"
                  >
                    View All {activeCategory.name}
                  </Link>
                </div>
                <ul className="divide-y divide-gray-100">
                  {activeCategory.subcategories?.map((sub) => (
                    <li key={sub._id}>
                      <Link
                        href={`/products?subcategory=${sub._id}`}
                        onClick={onClose}
                        className="block p-4 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
