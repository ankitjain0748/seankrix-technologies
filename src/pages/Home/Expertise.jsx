"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// ✅ Counter Component
const StatCounter = ({ percentage, children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref}>
      <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00BFFF]">
        +
        {inView ? (
          <CountUp start={0} end={percentage} duration={2.5} />
        ) : (
          "0"
        )}
        %
      </p>
      <p className="text-sm text-gray-400 mt-3 max-w-[220px] leading-relaxed">
        {children}
      </p>
    </div>
  );
};

export default function Expertise() {
  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* Gradient Border */}
        <div className="relative">

          <div
            className="absolute -inset-1 sm:-inset-3 rounded-2xl z-0 blur-[2px]"
            style={{
              background:
                "linear-gradient(180deg, #00BFFF 0%, rgba(0,0,0,0.9) 80%)",
            }}
          />

          {/* Content Box */}
          <div className="relative z-10 bg-[#0D0D0D] p-6 sm:p-10 md:p-14 rounded-2xl border border-white/10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* LEFT */}
              <div className="flex flex-col gap-10">

                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                  data-aos="fade-up"
                >
                  Expertise that drives{" "}
                  <span className="text-[#00BFFF]">
                    digital growth & success
                  </span>
                </h2>

                <p className="text-gray-400 leading-relaxed max-w-lg">
                  We combine modern technologies, creative design, and data-driven
                  strategies to build scalable digital solutions that help your
                  business grow faster in today’s competitive market.
                </p>

                {/* Counters */}
                <div className="flex flex-wrap gap-10">

                  <StatCounter percentage={95}>
                    Client satisfaction rate across web, app & digital projects.
                  </StatCounter>

                  <StatCounter percentage={80}>
                    Increase in traffic & conversions through SEO & marketing.
                  </StatCounter>

                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-8 lg:pl-12 lg:border-l lg:border-gray-800">

                <div data-aos="fade-up">
                  <h3 className="text-lg sm:text-xl font-bold">
                    <span className="text-[#00BFFF]">*</span> Web & App Development
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
                    We build fast, secure, and scalable websites and mobile apps
                    using modern technologies like React, Next.js, and Node.js.
                    Our focus is performance, UI/UX, and business growth.
                  </p>
                </div>

                <div data-aos="fade-up">
                  <h3 className="text-lg sm:text-xl font-bold">
                    <span className="text-[#00BFFF]">*</span> Digital Marketing & SEO
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
                    Grow your online presence with powerful SEO strategies,
                    social media marketing, and paid campaigns that bring real
                    results and qualified leads.
                  </p>
                </div>

                <div data-aos="fade-up">
                  <h3 className="text-lg sm:text-xl font-bold">
                    <span className="text-[#00BFFF]">*</span> UI/UX & Branding
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
                    We design modern, user-friendly interfaces and strong brand
                    identities that improve user engagement and build trust.
                  </p>
                </div>

                <div data-aos="fade-up">
                  <h3 className="text-lg sm:text-xl font-bold">
                    <span className="text-[#00BFFF]">*</span> Cloud & E-commerce Solutions
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
                    From cloud deployment to complete e-commerce platforms, we
                    provide scalable solutions that support your business growth.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}