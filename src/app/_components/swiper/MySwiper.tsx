"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useTranslations } from "next-intl";

const slider = [
  {
    id: 1,
    key: "laptop",
    image: "/images/slider/laptop.jpg",
  },
  {
    id: 2,
    key: "tea",
    image: "/images/slider/lipton.jpg",
  },
  {
    id: 3,
    key: "diapers",
    image: "/images/slider/pampers.jpg",
  },
  {
    id: 4,
    key: "iphone",
    image: "/images/slider/iphone17.jpg",
  },
];

export default function MySwiper() {
  const t = useTranslations("Home.Slider");
  return (
    <section className="h-[150px] md:h-[200px] lg:h-[300px] xl:h-[450px]  object-cover object-center overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slider.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              src={item.image}
              alt={t(item.key)}
              width={2000}
              height={2000}
              className="object-cover object-top h-full w-full"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
