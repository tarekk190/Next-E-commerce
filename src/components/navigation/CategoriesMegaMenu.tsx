"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/features/categories/hooks/useCategories";
import MegaMenuColumn from "./MegaMenuColumn";
import MobileCategoriesDrawer from "./MobileCategoriesDrawer";
import { useGsap, gsap } from "@/animations/hooks/useGsap";
import { DURATION, EASING } from "@/animations/core/config";

import { useLocale, useTranslations } from "next-intl";

export default function CategoriesMegaMenu() {
  const { categories, loading, error } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const isRtl = locale === "ar";

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0]._id);
    }
  }, [isOpen, categories, activeCategoryId]);

  const activeCategory = categories.find((c) => c._id === activeCategoryId);

  useGsap(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        height: 500,
        autoAlpha: 1,
        duration: DURATION.NORMAL,
        ease: EASING.DEFAULT,
        overwrite: "auto",
      });

      gsap.from(menuRef.current.querySelectorAll("li"), {
        opacity: 0,
        x: isRtl ? 10 : -10,
        stagger: 0.02,
        delay: 0.1,
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        autoAlpha: 0,
        duration: DURATION.FAST,
        ease: EASING.SHARP,
        overwrite: "auto",
      });
    }
  }, [isOpen, isRtl]);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCategoryId(null);
    }, 200);
  };

  return (
    <>
      <div
        className="h-full flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <button
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-black",
            isOpen ? "text-black bg-gray-50/50" : "text-gray-600",
          )}
        >
          {t("categories")}
        </button>

        {/* Mega Menu Dropdown */}
        <div
          ref={menuRef}
          className="absolute start-0 top-full w-full bg-white shadow-xl z-50 border-t border-gray-100 overflow-hidden invisible opacity-0"
          style={{ height: 0 }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading categories...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-400">
              Failed to load categories
            </div>
          ) : (
            <div className="container mx-auto flex h-full">
              {/* Main Categories */}
              <div className="w-1/4 h-full overflow-y-auto border-e border-gray-100 bg-gray-50/50 py-4">
                <ul className="space-y-1 px-4">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <button
                        className={cn(
                          "w-full text-start flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                          activeCategoryId === category._id
                            ? "bg-white shadow-sm text-amber-600 ring-1 ring-amber-100"
                            : "text-gray-700 hover:bg-gray-100 hover:text-black",
                        )}
                        onMouseEnter={() => setActiveCategoryId(category._id)}
                      >
                        <div className="flex items-center gap-3">
                          <span>{category.name}</span>
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform",
                            activeCategoryId === category._id
                              ? "text-amber-600"
                              : "text-gray-300",
                          )}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Content */}
              <div className="w-3/4 h-full overflow-y-auto p-8 bg-white">
                {activeCategory ? (
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {activeCategory.name}
                        </h3>
                        <Link
                          href={`/products?category=${activeCategory._id}`}
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-amber-600 hover:underline"
                        >
                          View All
                        </Link>
                      </div>

                      {activeCategory.subcategories &&
                      activeCategory.subcategories.length > 0 ? (
                        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                          <MegaMenuColumn
                            items={activeCategory.subcategories}
                            onItemClick={() => setIsOpen(false)}
                          />
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">
                          No subcategories found.
                        </div>
                      )}
                    </div>

                    <div className="w-1/3 shrink-0">
                      <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-100">
                        {activeCategory.image ? (
                          <img
                            src={activeCategory.image}
                            alt={activeCategory.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Select a category
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileCategoriesDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        categories={categories}
      />
    </>
  );
}
