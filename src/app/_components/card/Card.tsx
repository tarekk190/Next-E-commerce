"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperContext } from "../../context/SwiperContext";
import StarRating from "./StarRating";
import { useWindowSize } from "../../_hooks/useWindowSize";
import MobileCard from "./MobileCard";

export default function Card() {
  const { products, loading } = useSwiperContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false);
  const { isMobile } = useWindowSize();

  // 1. Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = products
      .map((p) => p.category?.name)
      .filter((name): name is string => !!name);
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  // 2. Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category?.name === activeCategory);
  }, [products, activeCategory]);

  // 3. Handle Category Click with Animation
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsAnimating(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-2">
      <h2 className="text-4xl tracking-wider font-semibold text-black my-4">
        Explore Our Products
      </h2>
      {/* Filter Bar */}
      <div
        className={`${
          isMobile
            ? "flex flex-nowrap overflow-x-scroll w-full gap-3 px-4 py-3 -mx-2 no-scrollbar scroll-smooth items-center"
            : "flex flex-wrap justify-center md:justify-start items-center gap-4 my-5"
        }`}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            className={`whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer shrink-0 ${
              isMobile ? "px-2 py-1" : "px-6 py-2.5"
            } ${
              activeCategory === category
                ? "bg-black text-white border-black shadow-lg scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Display */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {filteredProducts.length > 0 ? (
          <>
            {isMobile ? (
              // Mobile View
              <div className="grid grid-cols-2 gap-3 pb-8">
                {filteredProducts.map((product) => (
                  <MobileCard
                    key={product._id || product.id || Math.random()}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              // Desktop View
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
                    className="h-[400px]! bg-white!"
                  >
                    <div className="group cursor-pointer flex flex-col overflow-hidden">
                      {/* Image & Button Container */}
                      <div className="relative rounded-2xl overflow-hidden shadow-sm">
                        <div className="relative aspect-square w-full overflow-hidden">
                          <Image
                            width={2000}
                            height={2000}
                            loading="lazy"
                            src={product.imageCover}
                            alt={product.title || "product"}
                            className="object-contain object-center w-full h-full transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>

                        {/* Add To Cart Button */}
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                          <button className="w-full bg-black text-white py-3 font-medium hover:bg-zinc-800 transition-colors cursor-pointer rounded-b-2xl">
                            Add To Cart
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-1 px-1">
                        <h3
                          className="text-lg font-bold text-black line-clamp-1 text-start"
                          title={product.title}
                        >
                          {product.title?.split(" ").slice(0, 3).join(" ") ||
                            "Product Title"}
                        </h3>

                        <div className="flex items-center justify-between gap-3 text-md">
                          <span className="text-red-500 font-bold">
                            {product.price ? `${product.price} EGP` : "$0"}
                          </span>
                          <div className="flex items-center gap-1">
                            <StarRating
                              rating={product.ratingsAverage ?? 4.5}
                              count={product.ratingsQuantity}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-bold text-gray-400">
              No products found in this category.
            </h3>
            <button
              onClick={() => handleCategoryChange("All")}
              className="mt-4 text-blue-600 hover:underline cursor-pointer font-medium"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
