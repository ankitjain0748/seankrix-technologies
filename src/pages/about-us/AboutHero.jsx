import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function AboutHero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (

      <div className="max-w-6xl mx-auto text-center mb-4 mt-4 px-4">



        {/* Cyan Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

        {/* Content */}
        <div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          data-aos="fade-up"
        >
          {/* Badge */}
          <span className="inline-flex items-center px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold uppercase tracking-[3px]">
            🚀 About Seankrix Technologies
          </span>

          {/* SEO H1 */}
          <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Seankrix Technologies
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-8 text-gray-300">
            We are a leading
            <strong className="text-white">
              {" "}Website Development
            </strong>,
            <strong className="text-white">
              {" "}Mobile App Development
            </strong>,
            <strong className="text-white">
              {" "}Custom Software Development
            </strong>,
            <strong className="text-white">
              {" "}ERP
            </strong>,
            <strong className="text-white">
              {" "}CRM
            </strong>,
            <strong className="text-white">
              {" "}SEO
            </strong>{" "}
            and
            <strong className="text-white">
              {" "}Digital Marketing
            </strong>{" "}
            company helping startups, businesses and enterprises build scalable,
            secure and high-performance digital solutions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="px-8 py-4 rounded-full bg-cyan-500 text-black font-semibold hover:bg-white transition duration-300"
            >
              Explore Services
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition duration-300"
            >
              Contact Us
            </Link>
          </div>

       
        </div>

    </div>

  );
}