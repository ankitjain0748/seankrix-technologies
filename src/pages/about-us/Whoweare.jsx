"use client";

import React from "react";
import CountUp from "react-countup";

import { FaStar, FaPlay } from "react-icons/fa";
import { FiArrowUpRight, FiThumbsUp } from "react-icons/fi";
import { HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";

// Images
const videoThumbnail =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop";

const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/67.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/31.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
];

export default function Whoweare() {

  const stats = [
    {
      icon: <HiOutlineUserAdd className="w-8 h-8" />,
      value: "500+",
      label: "Projects successfully delivered worldwide",
    },
    {
      icon: <BiSupport className="w-8 h-8" />,
      value: "24/7",
      label: "Dedicated client support & maintenance",
    },
    {
      icon: <HiOutlineUserGroup className="w-8 h-8" />,
      value: "150+",
      label: "Trusted clients & business partners",
    },
    {
      icon: <FiThumbsUp className="w-8 h-8" />,
      value: "98%",
      label: "Client satisfaction & retention rate",
    },
  ];

  return (
    <section className="relative w-full bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="flex flex-col gap-8">

          <div>
            <p className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4">
              <span className="text-[#00BFFF] text-xl">*</span> WHO WE ARE
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Your trusted partner in{" "}
              <span className="text-[#00BFFF] font-bold">
                IT & digital transformation
              </span>
            </h1>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg">
            We are a modern IT services company specializing in web development,
            mobile applications, UI/UX design, and digital marketing. Our goal is
            to help businesses grow faster by delivering scalable, high-performance
            digital solutions.
          </p>

          {/* Video + Reviews */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">

            {/* Video */}
            <div className="relative w-40 h-28 rounded-2xl overflow-hidden">
              <img
                src={videoThumbnail}
                alt="Team working"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-14 h-14 bg-[#00BFFF] rounded-full flex items-center justify-center text-black hover:scale-110 transition">
                  <FaPlay />
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-3">

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#00BFFF]" />
                ))}
              </div>

              <p className="text-gray-400 text-sm">
                50+ positive client reviews
              </p>

              <div className="flex -space-x-3">
                {avatars.map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    className="w-10 h-10 rounded-full border-2 border-black object-cover"
                    alt="client"
                  />
                ))}
              </div>

              <Link
                href="/contact"
                className="flex items-center gap-2 text-[#00BFFF] font-semibold mt-2 hover:underline"
              >
                Start Your Project <FiArrowUpRight />
              </Link>

            </div>
          </div>
        </div>

        {/* RIGHT (STATS) */}
        <div className="relative mt-10 lg:mt-0">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {stats.map((stat, index) => {
              const number = parseInt(stat.value);
              const suffix = stat.value.replace(number, "");

              return (
                <div
                  key={index}
                  className={`bg-[#111] p-8 rounded-3xl border border-white/10 
                  flex flex-col justify-between h-48 transition duration-300
                  hover:-translate-y-2 hover:border-[#00BFFF]/30

                  ${
                    index === 0 || index === 2
                      ? "lg:-translate-y-6"
                      : "lg:translate-y-6"
                  }`}
                >

                  <div className="text-right text-[#00BFFF]">
                    {stat.icon}
                  </div>

                  <div>
                    <h3 className="text-4xl lg:text-5xl font-bold text-[#00BFFF] mb-2">
                      <CountUp
                        end={number}
                        duration={2.5}
                        suffix={suffix}
                        enableScrollSpy
                      />
                    </h3>

                    <p className="text-gray-400 text-sm leading-snug">
                      {stat.label}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to grow your business with smart IT solutions? 
        </h2>
        <p className="text-gray-400 mt-3">
          Let’s build something powerful together.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#00BFFF] text-black rounded-full font-semibold hover:bg-white transition"
        >
          Get Free Consultation
          <FiArrowUpRight />
        </Link>
      </div>

    </section>
  );
}