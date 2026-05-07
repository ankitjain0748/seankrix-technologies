"use client";

import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import Glow from "../../Components/Glow";
import Link from "next/link";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const featuresData = [
  {
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Custom Web Development",
    description:
      "High-performance, scalable websites built with modern technologies like React, Next.js & Node.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    title: "Mobile App Development",
    description:
      "Android & iOS apps with smooth UI, fast performance, and real business impact.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    title: "SEO & Digital Marketing",
    description:
      "Grow your traffic, leads, and sales with data-driven SEO and marketing strategies.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    title: "Cloud & DevOps Solutions",
    description:
      "Deploy faster, scale smarter with cloud infrastructure and automation pipelines.",
  },
];

const companyLogos = [
  { name: "Google", imageUrl: "https://cdn.worldvectorlogo.com/logos/google-1.svg" },
  { name: "Meta", imageUrl: "https://cdn.worldvectorlogo.com/logos/facebook-5.svg" },
  { name: "Microsoft", imageUrl: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { name: "Shopify", imageUrl: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
  { name: "Upwork", imageUrl: "https://cdn.worldvectorlogo.com/logos/upwork.svg" },
];

// ✅ Card
const FeatureCard = ({ imageUrl, title, description }) => (
  <div className="bg-[#1C1C1C] rounded-3xl p-6 flex flex-col group h-full">
    <div className="relative rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition duration-700"></div>
    </div>

    <div className="mt-5 flex-1">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>

    <div className="mt-4 flex items-center text-[#00BFFF]">
      <FiArrowUpRight />
    </div>
  </div>
);

export default function FeaturesSection() {
  return (
    <section className="relative w-full bg-black text-white py-24 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* Glow */}
        <div className="absolute inset-0 z-0">
          <Glow position="right" size={600} customStyles={{ top: "300px", opacity: 0.3 }} />
        </div>

        {/* Header */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          
          <div>
            <p className="flex items-center gap-2 text-lg font-bold uppercase mb-4">
              <span className="text-[#00BFFF]">*</span> WHY CHOOSE US
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Smart <span className="text-[#00BFFF]">IT Solutions</span> for
              modern businesses
            </h1>
          </div>

          <div>
            <p className="text-gray-400">
              We deliver end-to-end IT services including web development,
              mobile apps, SEO, cloud, and automation to help your business grow faster.
            </p>

            <Link href="/contact" className="flex items-center gap-4 mt-6 group">
              <span className="bg-[#2A2A2A] px-6 py-3 rounded-full">
                Start Project
              </span>

              <div className="w-12 h-12 bg-[#00BFFF] rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <FiArrowUpRight className="text-black group-hover:rotate-45 transition" />
              </div>
            </Link>
          </div>
        </div>

        {/* 🔥 Swiper Slider */}
        <div className="relative z-10">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            autoplay={{ delay: 2500 }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {featuresData.map((feature, index) => (
              <SwiperSlide key={index}>
                <FeatureCard {...feature} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-20 bg-[#1A1A1A] rounded-3xl p-10">

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div>
              <h2 className="text-3xl font-bold mb-3">
                Complete IT & Digital Ecosystem
              </h2>
              <p className="text-gray-400">
                From idea to launch — we design, develop, and scale your business digitally.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <Link href="/contact" className="relative w-32 h-32 flex items-center justify-center group">

                <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    fill="none"
                    d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  />
                  <text>
                    <textPath
                      href="#circlePath"
                      startOffset="50%"
                      textAnchor="middle"
                      className="fill-[#00BFFF] text-xs uppercase"
                    >
                      Free Consultation • Free Consultation •
                    </textPath>
                  </text>
                </svg>

                <FaArrowLeft className="text-white text-xl group-hover:scale-110 transition" />
              </Link>
            </div>

          </div>

          {/* Logos */}
          <div className="mt-10 flex overflow-hidden">
            <div className="flex animate-marquee">
              {companyLogos.map((logo, i) => (
                <div key={i} className="mx-4">
                  <div className="w-36 h-20 bg-[#2A2A2A] rounded-xl flex items-center justify-center p-3">
                    <img src={logo.imageUrl} alt={logo.name} className="max-h-6" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex animate-marquee">
              {companyLogos.map((logo, i) => (
                <div key={i + 10} className="mx-4">
                  <div className="w-36 h-20 bg-[#2A2A2A] rounded-xl flex items-center justify-center p-3">
                    <img src={logo.imageUrl} alt={logo.name} className="max-h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}