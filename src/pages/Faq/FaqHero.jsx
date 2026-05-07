import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function FaqHero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div
      className="relative w-full z-20 overflow-hidden"
      style={{
        // ✅ Naye design waali background image
        backgroundImage: "url('https://demo.awaikenthemes.com/artistics/wp-content/uploads/2024/11/page-header-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay (Isse text saaf dikhta hai) */}
      <div className="absolute top-0 left-0 w-full h-full "></div>

      {/* Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 py-32 md:py-40"
        data-aos="fade-up"
      >
        
        {/* ✅ Bada Heading: "Contact us" */}
        <h1 className="font-light text-6xl sm:text-7xl md:text-8xl leading-snug">
          Frequently  <span className="font-bold text-[#00BFFF]">Asked </span>Questions
        </h1>
        
        {/* ✅ Breadcrumb: "Home * Contact us" */}
        <div className="flex items-center gap-3 mt-4 text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-[#00BFFF] text-xl">*</span>
          <span className="text-white">Faq</span>
        </div>
      </div>
    </div>
  );
}