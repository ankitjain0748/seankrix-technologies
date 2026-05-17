import React from 'react';
import Glow from "../../Components/Glow";
import FloatingImage from "../../Components/FloatingImage";

// In cheezon ko public folder mein rakhein ya sahi path dein
const MAIN_IMAGE_URL = 'https://demo.awaikenthemes.com/artistics/wp-content/uploads/2024/11/why-choose-image.jpg';
const AGENCY_IMAGE_URL = 'https://demo.awaikenthemes.com/artistics/wp-content/themes/artistics/assets/images/why-choose-bg-shape.png';

// Feature cards ka data, taaki code saaf rahe
const featuresData = [
  {
    title: "Experienced IT Professionals",
    description:
      "Our team consists of skilled developers, designers, and marketers with real-world experience in delivering high-quality digital solutions."
  },
  {
    title: "Custom & Scalable Solutions",
    description:
      "We build tailored websites, apps, and systems that are scalable, secure, and designed to grow with your business."
  },
  {
    title: "End-to-End Services",
    description:
      "From idea to launch and marketing, we provide complete IT solutions including development, design, SEO, and ongoing support."
  }
];

// Reusable Feature Card component with the ORIGINAL GREEN hover effect
const FeatureCard = ({ title, description }) => (
  <div
    className="relative p-8 rounded-2xl border border-gray-800 bg-[#111111] overflow-hidden group"
    data-aos="fade-up"
  >
    {/* ✅✅✅ YEH PEHLE WALA GREEN HOVER EFFECT HAI ✅✅✅ */}
    {/* Yeh div pehle screen ke bahar rehta hai aur hover par right mein slide hota hai */}
    <div
      className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#00BFFF]/10 to-transparent
                 -translate-x-full group-hover:translate-x-0 
                 transition-transform duration-500 ease-in-out"
    ></div>

    {/* Card ka content gradient ke upar rahega (z-10 se) */}
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function Whychosse() {
  return (
    <section className="relative w-full bg-black text-white py-24 px-6 sm:px-8 overflow-hidden font">
      <div className="max-w-7xl mx-auto">

        {/* --- Background Elements --- */}
        <div className="absolute inset-0 z-0">
          <Glow position="right" size={600} customStyles={{ top: "200px" }} />
          <FloatingImage imageUrl={AGENCY_IMAGE_URL} position="left" opacity="opacity-30" />
        </div>

        {/* --- Top Header Section --- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16 lg:mb-24">
          <div data-aos="fade-right">
            <p className="flex items-center gap-2 text-xl font-bold tracking-[0.2em] uppercase mb-4">
              <span className="text-[#00BFFF] text-2xl">*</span>WHY CHOOSE US
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
              Reliable <span className="text-[#00BFFF]">IT solutions</span> for your business success
              <span className="text-[#00BFFF]">.</span>
            </h1>
          </div>
          <div data-aos="fade-left">
            <p className="text-gray-400 leading-relaxed lg:pl-8">
              We focus on delivering smart, result-driven IT solutions that help businesses grow faster.
              Our approach combines modern technology, creative thinking, and proven strategies to ensure long-term success.
            </p>
          </div>
        </div>

        {/* --- Bottom Content Section --- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Feature Cards */}
          <div className="flex flex-col gap-8">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden group" data-aos="zoom-in">
            <img
              src={MAIN_IMAGE_URL}
              alt="Team collaborating in a cafe"
              className="w-full h-auto object-cover"
            />
            <div
              className="absolute inset-0 
                         bg-gradient-to-r from-transparent via-white/10 to-transparent
                         transform -translate-x-full group-hover:translate-x-full -skew-x-14
                         transition-transform duration-700 ease-in-out"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}