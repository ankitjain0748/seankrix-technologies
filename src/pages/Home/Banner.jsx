"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

export default function Banner() {
  const items = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Digital Marketing",
    "SEO Optimization",
    "Cloud Solutions",
    "E-Commerce",
    "Brand Strategy",
  ];

  return (
    <div className="bg-[#00BFFF] py-4">

      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={30}
        loop={true}
        freeMode={true}
        speed={4000} // 👈 smooth scrolling speed
        autoplay={{
          delay: 0, // 👈 continuous scroll
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {[...items, ...items].map((item, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <span className="text-black text-lg md:text-2xl font-semibold whitespace-nowrap">
              ✶ {item}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}