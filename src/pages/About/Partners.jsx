"use client";
import React from "react";
import {
  FaGoogle,
  FaMicrosoft,
  FaShopify,
  FaApple,
  FaAmazonPay,
} from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";

// Realistic IT / Tech Partner Data
const partners = [
  { icon: <FaGoogle />, name: "Google Cloud" },
  { icon: <FaMicrosoft />, name: "Microsoft Azure" },
  { icon: <FaAmazonPay />, name: "AWS" },
  { icon: <FaMeta />, name: "Meta Ads" },
  { icon: <FaShopify />, name: "Shopify" },
  { icon: <FaApple />, name: "iOS Ecosystem" },
];

export default function Partners() {
  return (
    <section className="bg-black w-full flex items-center justify-center py-16 sm:py-20 px-4">
      
      <div className="max-w-6xl w-full bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute w-72 h-72 bg-[#00BFFF]/10 blur-[120px] rounded-full top-0 right-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-white text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold tracking-widest uppercase mb-4 text-gray-400">
              <span className="text-[#00BFFF] text-xl">*</span> TRUSTED PARTNERS
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              Trusted by <span className="text-[#00BFFF] font-bold">Top Tech Platforms</span>
            </h2>

            <p className="text-gray-400 mt-4 max-w-md">
              We collaborate with industry-leading platforms and technologies
              to deliver scalable, secure, and high-performance digital solutions
              for businesses worldwide.
            </p>
          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group bg-black rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-24
                           border border-white/10 hover:border-[#00BFFF]
                           hover:bg-[#00BFFF]/5 transition-all duration-300"
              >
                <span className="text-[#00BFFF] text-2xl group-hover:scale-110 transition">
                  {partner.icon}
                </span>

                <span className="text-white font-medium text-xs sm:text-sm text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}