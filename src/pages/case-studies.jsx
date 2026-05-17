"use client";

import Layout from "@/Components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const caseStudies = [
    {
        title: "E-Commerce Website Growth",
        category: "E-Commerce Development",
        image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",

        challenge:
            "The client had an outdated online store with low conversion rates, slow performance, and poor mobile responsiveness.",

        solution:
            "We redesigned the entire platform using Next.js, optimized product pages, improved checkout flow, and implemented SEO best practices.",

        result:
            "The website achieved a 65% increase in sales, 40% faster loading speed, and significantly improved user engagement.",

        technologies: ["Next.js", "React", "Stripe", "MongoDB"],
    },

    {
        title: "Corporate Business Website",
        category: "Business Website",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",

        challenge:
            "The client needed a modern digital presence to attract enterprise clients and improve brand credibility.",

        solution:
            "We created a premium corporate website with modern UI/UX, smooth animations, SEO optimization, and responsive layouts.",

        result:
            "The company saw improved client inquiries, better search rankings, and a stronger online brand identity.",

        technologies: ["Next.js", "Tailwind CSS", "GSAP"],
    },

    {
        title: "SEO & Digital Marketing Success",
        category: "SEO Optimization",
        image:
            "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200&auto=format&fit=crop",

        challenge:
            "The business struggled with low Google rankings and minimal organic website traffic.",

        solution:
            "We implemented technical SEO, keyword optimization, content strategy, and backlink building campaigns.",

        result:
            "Organic traffic increased by 120% within 6 months and multiple keywords ranked on Google's first page.",

        technologies: ["SEO", "Google Analytics", "Search Console"],
    },
];

export default function CaseStudiesPage() {
    return (
        <Layout>
            <Head>
  <title>
    Case Studies | Seankrix Technologies
  </title>

  <meta
    name="description"
    content="Explore real business success stories, SEO growth, web development projects, and digital transformation case studies by Seankrix Technologies."
  />

  <meta
    name="keywords"
    content="Case Studies, Web Development Results, SEO Success, IT Solutions, Business Growth, Digital Transformation"
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
    content="https://seankrixtechnologies.com/case-studies"
  />

  <meta
    property="og:title"
    content="Case Studies | Seankrix Technologies"
  />

  <meta
    property="og:description"
    content="Discover how our digital solutions helped businesses grow faster online."
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
    content="Case Studies | Seankrix Technologies"
  />

  <meta
    name="twitter:description"
    content="Explore successful business case studies and project results."
  />

  <meta
    name="twitter:image"
    content="https://seankrixtechnologies.com/og-image.jpg"
  />

  <link
    rel="canonical"
    href="https://seankrixtechnologies.com/case-studies"
  />

  <link
    rel="icon"
    href="/favicon.ico"
  />
</Head>
            <section className="relative bg-black text-white py-24 px-4 overflow-hidden">

                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00BFFF]/10 blur-[150px] rounded-full"></div>

                <div className="relative z-10 max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-20">

                        <p className="text-[#00BFFF] uppercase tracking-[4px] font-medium mb-4">
                            Case Studies
                        </p>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Real Results For
                            <span className="text-[#00BFFF]"> Real Businesses</span>
                        </h1>

                        <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-8">
                            Explore how Seankrix Technologies helps startups and businesses
                            achieve digital growth through modern web development,
                            SEO, UI/UX, and scalable digital solutions.
                        </p>
                    </div>

                    {/* Case Studies */}
                    <div className="space-y-16">

                        {caseStudies.map((study, index) => (
                            <div
                                key={index}
                                className="grid lg:grid-cols-2 gap-10 items-center bg-white/5 border border-white/10 rounded-[40px] overflow-hidden"
                            >

                                {/* Image */}
                                <div className="relative h-full min-h-[400px] overflow-hidden">

                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover hover:scale-110 transition-all duration-700"
                                    />

                                    <div className="absolute inset-0 bg-black/20"></div>

                                    <div className="absolute top-6 left-6 bg-[#00BFFF] text-black px-5 py-2 rounded-full text-sm font-semibold">
                                        {study.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-12">

                                    <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                                        {study.title}
                                    </h2>

                                    {/* Challenge */}
                                    <div className="mb-7">
                                        <h3 className="text-[#00BFFF] text-xl font-semibold mb-3">
                                            Challenge
                                        </h3>

                                        <p className="text-gray-400 leading-8">
                                            {study.challenge}
                                        </p>
                                    </div>

                                    {/* Solution */}
                                    <div className="mb-7">
                                        <h3 className="text-[#00BFFF] text-xl font-semibold mb-3">
                                            Solution
                                        </h3>

                                        <p className="text-gray-400 leading-8">
                                            {study.solution}
                                        </p>
                                    </div>

                                    {/* Result */}
                                    <div className="mb-8">
                                        <h3 className="text-[#00BFFF] text-xl font-semibold mb-3">
                                            Result
                                        </h3>

                                        <p className="text-gray-400 leading-8">
                                            {study.result}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-3 mb-8">

                                        {study.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Button */}
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-3 bg-[#00BFFF] hover:bg-white text-black px-7 py-4 rounded-full font-semibold transition-all duration-300"
                                    >
                                        Start Similar Project
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-24 text-center bg-white/5 border border-white/10 rounded-[40px] p-12 md:p-16">

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Let’s Build Your
                            <span className="text-[#00BFFF]"> Success Story</span>
                        </h2>

                        <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
                            From startups to enterprise businesses, we create high-performance
                            digital solutions designed to drive growth and results.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-flex mt-8 bg-[#00BFFF] hover:bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300"
                        >
                            Get Free Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}