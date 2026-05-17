"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { LuPhoneCall } from "react-icons/lu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu Links
// const navLinks = [
//   { name: "Home", path: "/" },

//   { name: "About", path: "/about-us" },

//   { name: "Services", path: "/services" },

//   { name: "Portfolio", path: "/portfolio" },

//   { name: "Case Studies", path: "/case-studies" },

//   { name: "Pricing", path: "/pricing" },

//   { name: "FAQ", path: "/faq" },

//   { name: "Blog", path: "/blog" },

//   { name: "Careers", path: "/careers" },

//   { name: "Contact", path: "/contact" },
// ];
const navLinks = [ { name: "Home", path: "/" }, { name: "About", path: "/about-us" }, { name: "Services", path: "/services" }, { name: "FAQ", path: "/faq" }, { name: "Contact", path: "/contact" }, ];
  return (
    <>
      {/* Navbar */}
      <nav
         className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1230px] mx-auto container px-4 sm:px-8 lg:px-10 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/seankrix_technologieslogo.png"
              alt="Logo"
              width={120}
              height={50}
              className="object-cover"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative !text-white text-[15px] font-medium transition duration-300 hover:text-[#00BFFF] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#00BFFF] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-5">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <Link
                href="https://www.instagram.com/seankrix_technologies_/"
                className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-[#00BFFF] transition duration-300"
              >
                <FaInstagram />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=61589234190650"
                className="w-9 h-9 rounded-full border border-white   flex items-center justify-center hover:bg-[#00BFFF] transition duration-300"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://www.linkedin.com/in/seankrix-technologies-73b269407/"
                className="w-9 h-9 rounded-full border border-white  flex items-center justify-center hover:bg-[#00BFFF] transition duration-300"
              >
                <FaLinkedinIn />
              </Link>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="bg-[#00BFFF] hover:bg-[#0099cc] text-white px-5 py-2 rounded-full font-medium transition duration-300"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
         className={`fixed top-0 right-0 h-screen w-[300px] bg-[#0f172a] z-[60] transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Image
            src="/seankrix_technologieslogo.png"
            alt="Logo"
            width={110}
            height={40}
          />

          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col p-6 gap-5">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="text-white text-[16px] border-b border-white/10 pb-3 hover:text-[#00BFFF] transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="px-6 mt-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="text-[#00BFFF] text-xl mt-1">
              <LuPhoneCall />
            </div>

            <div>
              <p className="text-white font-semibold">Phone</p>
              <p className="text-gray-400 text-sm">
                +91 8824744976
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-[#00BFFF] text-xl mt-1">
              <FaEnvelope />
            </div>

            <div>
              <p className="text-white font-semibold">Email</p>
              <p className="text-gray-400 text-sm break-all">
                ankitkumarjain0748@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-[#00BFFF] text-xl mt-1">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-white font-semibold">Location</p>
              <p className="text-gray-400 text-sm">
                Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 px-6 mt-10">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center !text-white hover:bg-[#00BFFF] transition duration-300"
          >
            <FaInstagram />
          </Link>

          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center !text-white hover:bg-[#00BFFF] transition duration-300"
          >
            <FaFacebookF />
          </Link>

          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center !text-white hover:bg-[#00BFFF] transition duration-300"
          >
            <FaLinkedinIn />
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-50"
        />
      )}
    </>
  );
}