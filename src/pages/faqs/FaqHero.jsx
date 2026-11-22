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
  className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-44"
  data-aos="fade-up"
>
  {/* Badge */}
  <div className="mb-6">
    <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium tracking-wide text-cyan-400">
      💬 Frequently Asked Questions
    </span>
  </div>

  {/* SEO H1 */}
  <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
    Frequently{" "}
    <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
      Asked Questions
    </span>
  </h1>

  {/* SEO Description */}
  <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
    Find answers to the most common questions about
    <strong className="text-white">
      {" "}Website Development
    </strong>,
    <strong className="text-white">
      {" "}Mobile App Development
    </strong>,
    <strong className="text-white">
      {" "}SEO
    </strong>,
    <strong className="text-white">
      {" "}Digital Marketing
    </strong>,
    <strong className="text-white">
      {" "}ERP
    </strong>,
    <strong className="text-white">
      {" "}CRM
    </strong>{" "}
    and Custom Software Development services offered by
    <span className="text-cyan-400 font-semibold">
      {" "}Seankrix Technologies.
    </span>
  </p>

  {/* CTA */}
  <div className="mt-10 flex flex-wrap justify-center gap-4">
    <Link
      href="/contact"
      className="rounded-full bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-white"
    >
      Contact Our Team
    </Link>

    <Link
      href="/services"
      className="rounded-full border border-cyan-500 px-8 py-4 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
    >
      Explore Services
    </Link>
  </div>

  {/* Breadcrumb */}
  <nav
    aria-label="Breadcrumb"
    className="mt-12 flex items-center gap-3 text-sm text-gray-300"
  >
    <Link href="/" className="transition hover:text-white">
      Home
    </Link>

    <span className="text-cyan-400">/</span>

    <span className="font-medium text-white">
      Frequently Asked Questions
    </span>
  </nav>
</div>
  );
}