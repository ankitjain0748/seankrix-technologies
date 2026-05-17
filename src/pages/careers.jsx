"use client";

import Layout from "@/Components/Layout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaSearch,
  FaBullhorn,
} from "react-icons/fa";

const jobs = [
  {
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote / Jaipur",
    icon: <FaLaptopCode />,
    description:
      "Build modern and responsive websites using React, Next.js, and Tailwind CSS.",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },

  {
    title: "UI/UX Designer",
    type: "Full Time",
    location: "Remote",
    icon: <FaPaintBrush />,
    description:
      "Design modern user interfaces and smooth user experiences for websites and apps.",
    skills: ["Figma", "UI Design", "Wireframing"],
  },

  {
    title: "SEO Specialist",
    type: "Part Time",
    location: "Remote",
    icon: <FaSearch />,
    description:
      "Optimize websites and improve search rankings with modern SEO strategies.",
    skills: ["SEO", "Analytics", "Keyword Research"],
  },

  {
    title: "Digital Marketing Expert",
    type: "Full Time",
    location: "Remote",
    icon: <FaBullhorn />,
    description:
      "Manage social media campaigns, paid ads, and digital growth strategies.",
    skills: ["Marketing", "Meta Ads", "Content Strategy"],
  },
];

export default function CareersPage() {
  return (
    <Layout>

      <Head>

        <title>
          Careers | Join Seankrix Technologies
        </title>

        <meta
          name="description"
          content="Join Seankrix Technologies and build your career in web development, UI/UX design, SEO, digital marketing, and software development."
        />

        <meta
          name="keywords"
          content="Careers, IT Jobs, React Developer Jobs, SEO Jobs, UI UX Designer, Software Developer, Digital Marketing Jobs"
        />

        <meta
          name="author"
          content="Seankrix Technologies"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        {/* Open Graph */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://seankrixtechnologies.com/careers"
        />

        <meta
          property="og:title"
          content="Careers | Seankrix Technologies"
        />

        <meta
          property="og:description"
          content="Explore exciting career opportunities in development, design, SEO, and marketing."
        />

        <meta
          property="og:image"
          content="https://seankrixtechnologies.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Careers | Seankrix Technologies"
        />

        <meta
          name="twitter:description"
          content="Join our growing IT company and build your future with us."
        />

        <meta
          name="twitter:image"
          content="https://seankrixtechnologies.com/og-image.jpg"
        />

        <link
          rel="canonical"
          href="https://seankrixtechnologies.com/careers"
        />

        <link
          rel="icon"
          href="/favicon.ico"
        />

      </Head>

      <section className="relative bg-black text-white py-24 px-4 overflow-hidden">

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00BFFF]/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-20">

            <p className="text-[#00BFFF] uppercase tracking-[4px] mb-4">
              Careers
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Join Our <span className="text-[#00BFFF]">Creative Team</span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-8">
              Build your future with Seankrix Technologies and work on
              modern digital products, websites, apps, and marketing solutions.
            </p>
          </div>

          {/* Jobs */}
          <div className="grid md:grid-cols-2 gap-8">

            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-[30px] p-8 hover:border-[#00BFFF]/40 transition-all duration-300"
              >

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#00BFFF]/10 text-[#00BFFF] flex items-center justify-center text-3xl mb-6">
                  {job.icon}
                </div>

                {/* Job Title */}
                <h2 className="text-3xl font-bold mb-3">
                  {job.title}
                </h2>

                {/* Info */}
                <div className="flex gap-4 flex-wrap mb-5">

                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
                    {job.type}
                  </span>

                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
                    {job.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-8 mb-6">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-3 mb-8">

                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#00BFFF]/10 border border-[#00BFFF]/20 text-[#00BFFF] px-4 py-2 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#00BFFF] hover:bg-white text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 text-center">

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Don’t See The Right Role?
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
              We’re always looking for talented developers, designers,
              marketers, and creative thinkers.
            </p>

            <Link
              href="/contact"
              className="inline-flex mt-8 bg-[#00BFFF] hover:bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Send Your Resume
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}