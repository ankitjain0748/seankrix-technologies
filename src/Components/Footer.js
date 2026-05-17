"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Glow from "./Glow";

// ✅ Logo Component (Image + Text combo)
const ArtisticLogo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/seankrix_technologieslogo.png" // 👈 apna logo path
      alt="logo"
      width={40}
      height={40}
    />
    <span className="text-2xl font-bold text-white">
      <span className="text-[#00BFFF]">IT</span>Services
    </span>
  </div>
);

// ✅ Data
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const servicesLinks = [
  { name: "Web Development", href: "/services/web-development" },
  { name: "App Development", href: "/services/app-development" },
  { name: "UI/UX Design", href: "/services/ui-ux" },
  { name: "Digital Marketing", href: "/services/marketing" },
];

const socialIcons = [
  { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61589234190650" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/seankrix_technologies_/" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/seankrix-technologies-73b269407/" },
];

export default function Footer() {
  return (
    <footer className="relative bg-black text-white">

      {/* Glow */}
      <div className="absolute inset-0 z-0">
        <Glow position="left" size={500} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/">
              <ArtisticLogo />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              We provide modern IT solutions including web development,
              mobile apps, and digital marketing to grow your business.
            </p>

            {/* Contact */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <BsTelephone className="text-[#00BFFF]" />
                <span>+91 8824744976</span>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineEnvelope className="text-[#00BFFF]" />
                <span>ankitkumarjain0748@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#00BFFF]" />
                <span>Jaipur, Rajasthan</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 pt-2">
              {socialIcons.map((item, i) => (
                <Link
                  key={i}
                  href={item.href ?? "/"}
                  className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-full hover:bg-[#00BFFF] hover:text-black transition"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href ?? "/"}
                    className="hover:text-[#00BFFF] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href ?? "/"}
                    className="hover:text-[#00BFFF] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
          © 2026 IT Services Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}