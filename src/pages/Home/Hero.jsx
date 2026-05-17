"use client";

import { useMemo, useEffect } from "react";
import { ReactTyped } from "react-typed";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Hero() {

  // ✅ Better IT-focused typing text
  const typedStrings = useMemo(
    () => [
      "Web Development",
      "Mobile App Solutions",
      "UI/UX Design",
      "Digital Marketing",
    ],
    []
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="relative min-h-screen z-20 w-full overflow-hidden">

      {/* Video Background */}
      <video
        src="https://demo.awaikenthemes.com/assets/videos/artistic-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover scale-150"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white pt-44 px-4">

        {/* Heading */}
        <h1 className="font-light leading-snug text-center 
          text-[32px] sm:text-[36px] md:text-6xl lg:text-7xl xl:text-[90px]">

          Transform Your Business With <br className="hidden md:block" />

          <span className="inline-block min-w-[250px] md:min-w-[400px] lg:min-w-[500px] text-[#00BFFF] font-bold">
            <ReactTyped
              strings={typedStrings}
              typeSpeed={80}
              backSpeed={40}
              backDelay={1200}
              loop
              showCursor={false}
            />
          </span>
        </h1>

        {/* Learn More Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mt-20 text-center md:text-left">

          {/* Rotating Circle */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 animate-spin-slow" viewBox="0 0 100 100">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text>
                <textPath
                  href="#circlePath"
                  className="text-xs tracking-[0.3em] uppercase"
                  fill="white"
                >
                  • DISCOVER MORE • DISCOVER MORE • DISCOVER MORE
                </textPath>
              </text>
            </svg>

            <div className="absolute">
              <div className="w-16 h-16 bg-[#00BFFF] rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.5 7l4 3-4 3V7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Paragraph */}
          <div className="max-w-xl text-gray-300 text-base sm:text-lg">
            <p data-aos="fade-up">
              We help businesses grow with modern technology solutions.
              From high-performance websites to scalable mobile apps and
              result-driven digital marketing, we turn your ideas into
              powerful digital experiences.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <Link href="/contact"
          className="mt-16 flex items-center mb-10 cursor-pointer"
          data-aos="fade-up"
        >
           <button className="bg-[#00BFFF] text-black cursor-pointer py-4 px-8 rounded-full font-semibold hover:bg-white transition">
            Get Free Consultation
          </button> 

          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-4 cursor-pointer hover:bg-[#00BFFF] transition group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black transform transition group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </Link>

      </div>
    </div>
  );
}