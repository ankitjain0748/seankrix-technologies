"use client";

import Layout from "@/Components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const blogs = [
  {
    slug: "future-of-web-development",
    title: "The Future of Modern Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    date: "May 2026",
    description:
      "Explore the latest trends in React, Next.js, AI integration, and modern frontend development.",
  },

  {
    slug: "seo-strategies-2026",
    title: "Top SEO Strategies To Rank Higher in 2026",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200&auto=format&fit=crop",
    category: "SEO",
    date: "May 2026",
    description:
      "Learn advanced SEO techniques to improve rankings, traffic, and online visibility.",
  },

  {
    slug: "importance-of-ui-ux",
    title: "Why UI/UX Design Matters For Business",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
    category: "UI/UX Design",
    date: "May 2026",
    description:
      "Discover how great UI/UX design improves conversions and customer engagement.",
  },
];

export default function BlogPage() {
  return (
    <Layout>
      <Head>
        <title>
          Blog | Seankrix Technologies
        </title>

        <meta
          name="description"
          content="Read the latest articles about web development, SEO, UI/UX design, React, Next.js, digital marketing, and technology trends."
        />

        <meta
          name="keywords"
          content="Tech Blog, React Blog, Next.js Articles, SEO Tips, Web Development, UI UX Design, Digital Marketing"
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
          content="https://seankrixtechnologies.com/blog"
        />

        <meta
          property="og:title"
          content="Blog | Seankrix Technologies"
        />

        <meta
          property="og:description"
          content="Explore insights and tutorials about development, SEO, and digital growth."
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
          content="Blog | Seankrix Technologies"
        />

        <meta
          name="twitter:description"
          content="Latest articles on development, SEO, UI/UX, and technology."
        />

        <meta
          name="twitter:image"
          content="https://seankrixtechnologies.com/og-image.jpg"
        />

        <link
          rel="canonical"
          href="https://seankrixtechnologies.com/blog"
        />

        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <section className="bg-black text-white py-24 px-4">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-20">

            <p className="text-[#00BFFF] uppercase tracking-[4px] mb-4">
              Our Blog
            </p>

            <h1 className="text-4xl md:text-6xl font-bold">
              Latest <span className="text-[#00BFFF]">Articles</span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-3xl mx-auto leading-8">
              Explore insights, tutorials, and expert knowledge about
              web development, SEO, UI/UX, digital marketing, and technology.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:border-[#00BFFF]/40 transition-all duration-300"
              >

                <div className="relative overflow-hidden">

                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="w-full h-[260px] object-cover hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute top-5 left-5 bg-[#00BFFF] text-black px-4 py-2 rounded-full text-sm font-semibold">
                    {blog.category}
                  </div>
                </div>

                <div className="p-7">

                  <p className="text-gray-400 text-sm mb-3">
                    {blog.date}
                  </p>

                  <h2 className="text-2xl font-bold mb-4 leading-snug hover:text-[#00BFFF] transition">
                    {blog.title}
                  </h2>

                  <p className="text-gray-400 leading-8 mb-6">
                    {blog.description}
                  </p>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-3 text-[#00BFFF] font-semibold hover:gap-5 transition-all duration-300"
                  >
                    Read More →

                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}