"use client";

import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Glow from "../../Components/Glow";
import { FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import Link from "next/link";

const socialLinks = [
  {
    icon: <FaLinkedinIn />,
    title: "Connect on LinkedIn",
    handle: "IT Services Company",
    link: "https://www.linkedin.com/in/seankrix-technologies-73b269407/"
  },
  {
    icon: <FaInstagram />,
    title: "Explore on Instagram",
    handle: "@seankrix_technologies_",
    link: "https://www.instagram.com/seankrix_technologies_/"
  }
];

export default function JoinAgency() {
  return (
    <section className="relative w-full bg-black text-white py-24 px-4 sm:px-8">

      {/* Glow */}
      <div className="absolute inset-0 z-0">
        <Glow position="left" size={600} customStyles={{ top: "300px" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

        <div>
          <p className="flex items-center gap-2 text-lg font-bold uppercase mb-4 tracking-widest">
            <span className="text-[#00BFFF] text-2xl">*</span> Join Our Network
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
            Join our{" "}
            <span className="text-[#00BFFF] font-bold">
              digital community
            </span>{" "}
            & grow with us
          </h1>
        </div>

        <div>
          <p className="text-gray-400 leading-relaxed max-w-md">
            Stay connected with our team to get the latest updates on web
            development, mobile apps, digital marketing, and innovative IT
            solutions. Let’s build something amazing together.
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  gap-8">

        {socialLinks.map((link) => (
          <Link
            key={link.title}
            href={link.link || "/"}
            className="relative block p-8 rounded-3xl border border-white/10
                       group hover:border-white/30 transition-all duration-300"
          >

            {/* Icon Circle */}
            <div className="absolute top-0 left-8 -translate-y-1/2 
                            w-20 h-20 bg-[#00BFFF] rounded-full 
                            flex items-center justify-center text-black text-4xl
                            group-hover:bg-white group-hover:scale-110 
                            transition-all duration-300"
            >
              {link.icon}
            </div>

            {/* Content */}
            <div className="flex items-end justify-between mt-12">

              <div>
                <h3 className="text-xl font-bold text-white">
                  {link.title}
                </h3>
                <p className="text-gray-500 mt-1 text-sm">
                  {link.handle}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center
                           group-hover:bg-[#00BFFF] group-hover:border-[#00BFFF]
                           transition-all duration-300"
              >
                <FiArrowUpRight
                  className="h-5 w-5 text-white group-hover:text-black group-hover:rotate-45 transition"
                />
              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Let’s build your next big idea together 
        </h2>
        <p className="text-gray-400 mt-3">
          Connect with us today and start your digital journey.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-[#00BFFF] text-black rounded-full font-semibold hover:bg-white transition"
        >
          Get in Touch
          <FiArrowUpRight />
        </Link>
      </div>

    </section>
  );
}