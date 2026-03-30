"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({
  images = [],
  title,
}: ProductGalleryProps) {
  const safeImages = images || [];
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const t = useTranslations("ProductDetails");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Slider */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            } as any
          }
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-full w-full"
        >
          {safeImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex items-center justify-center bg-white">
                <Image
                  src={img}
                  alt={`${title} - ${t("imageAlt")} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbs Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full h-24"
      >
        {safeImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-black transition-colors bg-white">
              <Image
                src={img}
                alt={`${title} - ${t("thumbnailAlt")} ${index + 1}`}
                fill
                sizes="20vw"
                className="object-contain p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
