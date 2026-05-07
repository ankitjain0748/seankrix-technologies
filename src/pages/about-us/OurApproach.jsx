"use client";

import React from "react";
import { FaRegDotCircle } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { LuFocus } from "react-icons/lu";

// Images
const missionImg =
  "https://demo.awaikenthemes.com/artistics/wp-content/uploads/2024/11/our-mission-img.jpg";
const visionImg =
  "https://demo.awaikenthemes.com/artistics/wp-content/uploads/2024/11/our-vision-img.jpg";
const valueImg =
  "https://demo.awaikenthemes.com/artistics/wp-content/uploads/2024/11/our-value-img.jpg";

// Glow
const Glow = ({ size, customStyles }) => (
  <div
    className="absolute -z-10"
    style={{
      width: size,
      height: size,
      background: "rgba(191, 247, 71, 0.08)",
      filter: "blur(120px)",
      borderRadius: "50%",
      ...customStyles,
    }}
  />
);

export default function OurApproach() {
  const cardData = [
    {
      icon: <LuFocus />,
      title: "Our Mission",
      image: missionImg,
      desc: "Our mission is to deliver high-performance web, mobile, and digital solutions that help businesses grow faster, scale efficiently, and stay ahead in the competitive digital world.",
    },
    {
      icon: <FaRegDotCircle />,
      title: "Our Vision",
      image: visionImg,
      desc: "We aim to become a leading IT solutions provider by creating innovative, user-focused digital experiences that transform ideas into powerful digital products.",
    },
    {
      icon: <IoDiamondOutline />,
      title: "Our Values",
      image: valueImg,
      desc: "We believe in innovation, transparency, quality, and long-term partnerships. Our focus is on delivering real results with honesty and excellence in every project.",
    },
  ];

  return (
    <section className="relative w-full bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0">
        <Glow size={600} customStyles={{ top: "250px", right: "10%" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">

        <div>
          <p className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-widest uppercase mb-4">
            <span className="text-[#00BFFF] text-2xl">*</span> OUR APPROACH
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Building{" "}
            <span className="text-[#00BFFF] font-bold">
              scalable & impactful
            </span>{" "}
            digital solutions
          </h1>
        </div>

        <div>
          <p className="text-gray-400 leading-relaxed text-lg max-w-lg">
            We combine strategy, design, and technology to craft digital
            experiences that not only look great but also deliver measurable
            business results. From startups to enterprises, we help brands grow
            in the digital era.
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cardData.map((card, index) => (
            <div
              key={index}
              className="relative bg-[#111] p-6 rounded-3xl border border-white/10 
                         group hover:-translate-y-2 transition duration-300"
            >

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Shine */}
                <div className="absolute -left-full top-0 w-1/2 h-full 
                                bg-gradient-to-r from-transparent via-white/20 to-transparent
                                group-hover:left-full transition duration-700 -skew-x-12"></div>

                {/* Icon */}
                <span className="absolute bottom-4 left-4 text-3xl text-[#00BFFF]">
                  {card.icon}
                </span>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {card.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Let’s turn your ideas into powerful digital products 
        </h2>
        <p className="text-gray-400 mt-3">
          Partner with us to build scalable, modern, and result-driven solutions.
        </p>
      </div>

    </section>
  );
}