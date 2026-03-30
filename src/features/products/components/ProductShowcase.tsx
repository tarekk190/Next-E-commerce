"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "@/app/_hooks/useWindowSize";
import MobileCard from "./MobileCard";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { useProductFilter } from "../hooks/useProductFilter";
import SectionTitle from "@/components/common/SectionTitle";

interface ProductShowcaseProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
  enableGrid?: boolean;
}

import { useTranslations } from "next-intl";

export default function ProductShowcase({
  products = [],
  title,
  showFilters = true,
  enableGrid = false,
}: ProductShowcaseProps) {
  const t = useTranslations("ProductShowcase");
  const tCommon = useTranslations("Common");
  const displayTitle = title || t("title");

  const { activeCategory, setCategory } = useProductFilter("All");
  const [isAnimating, setIsAnimating] = useState(false);
  const { isMobile } = useWindowSize();

  const categories = useMemo(() => {
    if (!products) return [{ _id: "all", name: "All", image: "" }];

    const uniqueCategories = new Map();
    products.forEach((p) => {
      if (
        p.category?._id &&
        p.category?.name &&
        !uniqueCategories.has(p.category.name)
      ) {
        uniqueCategories.set(p.category.name, {
          _id: p.category._id,
          name: p.category.name,
          image: p.category.image || p.imageCover,
        });
      }
    });

    return [
      { _id: "all", name: "All", image: "/placeholder-category.png" },
      ...Array.from(uniqueCategories.values()),
    ];
  }, [products]);

  // 2. Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category?.name === activeCategory);
  }, [products, activeCategory]);

  // 3. Handle Category Click with Animation
  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === activeCategory) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCategory(categoryName);
      setIsAnimating(false);
    }, 300);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl py-4 bg-white">
      <div className="flex flex-col items-center justify-center">
        <SectionTitle title={displayTitle} />
        {/* Filter  */}
        {showFilters && (
          <div
            className={`${
              isMobile
                ? "flex flex-nowrap overflow-x-auto w-full gap-4 px-4 py-4 -mx-4 no-scrollbar scroll-smooth items-start snap-x"
                : "flex flex-wrap justify-center items-center gap-3 mb-10"
            }`}
          >
            {categories.map((category, index) => (
              <div
                key={category._id || index}
                className={
                  isMobile
                    ? "flex flex-col items-center gap-2 snap-center min-w-[70px]"
                    : ""
                }
              >
                {/* Mobile */}
                {isMobile ? (
                  <button
                    onClick={() => handleCategoryChange(category.name)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div
                      className={`relative w-16 h-16 rounded-full p-1 transition-all duration-300 ${
                        activeCategory === category.name
                          ? "bg-black scale-110 shadow-md"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                        {category.name === "All" ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white font-bold text-xs">
                            {t("all")}
                          </div>
                        ) : (
                          <Image
                            src={category.image || "/placeholder.png"}
                            alt={category.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium text-center leading-tight max-w-[80px] ${
                        activeCategory === category.name
                          ? "text-black font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      {category.name === "All" ? t("all") : category.name}
                    </span>
                  </button>
                ) : (
                  /* Desktop*/
                  <button
                    onClick={() => handleCategoryChange(category.name)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out border cursor-pointer ${
                      activeCategory === category.name
                        ? "bg-black text-white border-black shadow-lg shadow-black/20 transform scale-105"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    {category.name === "All" ? t("all") : category.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Products Display */}
      <div
        className={`transition-opacity duration-300 ease-in-out  ${
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {filteredProducts.length > 0 ? (
          <>
            {isMobile || enableGrid ? (
              // Mobile View OR Grid Enabled
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.id || Math.random()}
                    className="h-full"
                  >
                    {isMobile ? (
                      <MobileCard product={product} />
                    ) : (
                      <ProductCard product={product} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Desktop View with Swiper (when enableGrid is false)
              <Swiper
                key={activeCategory}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide
                    key={product._id || product.id || Math.random()}
                    className="h-auto! bg-transparent!"
                  >
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-bold text-gray-400">
              {t("noProducts")}
            </h3>
            <button
              onClick={() => handleCategoryChange("All")}
              className="mt-4 text-blue-600 hover:underline cursor-pointer font-medium"
            >
              {tCommon("viewAll")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
