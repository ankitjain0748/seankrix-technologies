  "use client";

  import React from "react";
  import { FiArrowUpRight } from "react-icons/fi";
  import {
    FaCode,
    FaMobileAlt,
    FaSearch,
    FaPaintBrush,
    FaCloud,
    FaShoppingCart,
  } from "react-icons/fa";
  import Link from "next/link";
  import Layout from "@/Components/Layout";
  import Head from "next/head";

  // SERVICES DATA
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      slug: "web-development",
      desc: "Custom websites built with modern technologies like React, Next.js for high performance and scalability.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile App Development",
      slug: "mobile-app-development",
      desc: "Android & iOS apps with smooth UI/UX and powerful backend systems.",
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      slug: "ui-ux-design",
      desc: "Creative and user-focused design to improve engagement and user experience.",
    },
    {
      icon: <FaSearch />,
      title: "SEO Optimization",
      slug: "seo-optimization",
      desc: "Boost your Google ranking and increase organic traffic with proven SEO strategies.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Solutions",
      slug: "cloud-solutions",
      desc: "Secure, scalable cloud infrastructure using AWS, Google Cloud & Azure.",
    },
    {
      icon: <FaShoppingCart />,
      title: "E-Commerce Development",
      slug: "ecommerce-development",
      desc: "Build powerful online stores with Shopify, WooCommerce & custom solutions.",
    },
  ];

  export default function ServicesPage() {
    return (

      <Layout>
        <Head>
          {/* 1. Technical & Rendering Basics (हमेशा सबसे ऊपर) */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#00BFFF" />
          <meta name="format-detection" content="telephone=no" />

          {/* 2. Primary SEO Tags */}
          <title>IT Services | Web Development, Mobile Apps & SEO Services | Seankrix Technologies</title>
          <meta
            name="description"
            content="Explore professional IT services by Seankrix Technologies including Web Development, Mobile App Development, UI/UX Design, SEO Optimization, Cloud Solutions, and Custom Software Development."
          />
          <meta
            name="keywords"
            content="IT Services, Web Development Services, Mobile App Development, Android App Development, iOS App Development, UI UX Design Services, SEO Services India, SEO Optimization, Cloud Solutions, AWS Services, Google Cloud Services, E-Commerce Development, Shopify Development, WooCommerce Development, Custom Software Development, React JS Development, Next JS Development, MERN Stack Development, Software Development Company India, Seankrix Technologies"
          />
          <meta name="author" content="Seankrix Technologies" />

          {/* Canonical Link */}
          <link rel="canonical" href="https://www.seankrixtechnologies.com/services" />

          {/* Crawling & Geo-Targeting */}
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="content-language" content="en-IN" />
          <meta name="geo.region" content="IN-RJ" />
          <meta name="geo.country" content="India" />

          {/* 3. Open Graph / Facebook SEO */}
          <meta property="og:locale" content="en_IN" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Seankrix Technologies" />
          <meta property="og:title" content="IT Services | Web & Mobile App Development | Seankrix Technologies" />
          <meta property="og:description" content="Professional Web Development, Mobile App Development, SEO, Cloud Solutions, UI/UX Design, and E-Commerce Development Services." />
          <meta property="og:url" content="https://www.seankrixtechnologies.com/services" />
          <meta property="og:image" content="https://www.seankrixtechnologies.com/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* 4. Twitter (X) SEO */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="IT Services | Seankrix Technologies" />
          <meta name="twitter:description" content="Discover our Web Development, Mobile App Development, SEO, Cloud Solutions, and E-Commerce Services." />
          <meta name="twitter:image" content="https://www.seankrixtechnologies.com/og-image.jpg" />

          {/* 5. Powerful Service List Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "IT and Software Development Services",
                "provider": {
                  "@type": "ProfessionalService",
                  "name": "Seankrix Technologies",
                  "url": "https://www.seankrixtechnologies.com",
                  "logo": "https://www.seankrixtechnologies.com/logo.png"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "India"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "IT Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Web Development",
                        "description": "Full-stack web development using React JS, Next.js, and MERN stack."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "Android, iOS, and Flutter cross-platform mobile applications."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "SEO & Digital Marketing",
                        "description": "Search engine optimization and digital marketing services to grow online visibility."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "UI/UX Design",
                        "description": "User interface and user experience design for web and mobile products."
                      }
                    }
                  ]
                }
              })
            }}
          />
        </Head>

        <section className="bg-black text-white py-20 px-4 sm:px-8">

          {/* HERO */}
          <div className="max-w-6xl mx-auto text-center mb-4 mt-4 px-4">

            {/* Badge */}
            <span className="inline-flex items-center px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold uppercase tracking-[3px]">
              🚀 Our Services
            </span>

            {/* SEO Optimized H1 */}
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Professional{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                IT Solutions
              </span>
              <br />
              For Your Business Growth
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-4xl mx-auto text-lg md:text-xl leading-8 text-gray-300">
              <strong className="text-white">Seankrix Technologies</strong> provides
              industry-leading
              <span className="text-cyan-400 font-semibold">
                {" "}Website Development
              </span>,
              Mobile App Development,
              Custom Software Development,
              ERP,
              CRM,
              E-commerce Development,
              SEO,
              Digital Marketing,
              UI/UX Design and Cloud Solutions to help startups, SMEs and enterprises
              build secure, scalable and high-performance digital products.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <a
                href="/contact"
                className="px-8 py-4 rounded-full bg-cyan-500 text-black font-semibold hover:bg-white transition duration-300"
              >
                Get Free Consultation
              </a>

              <a
                href="/portfolio"
                className="px-8 py-4 rounded-full border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition duration-300"
              >
                View Our Work
              </a>

            </div>

          </div>

          {/* SERVICES GRID */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-[#00BFFF] transition-all duration-300 hover:-translate-y-2"
              >
                {/* ICON */}
                <div className="text-[#00BFFF] text-4xl mb-6 group-hover:scale-110 transition">
                  {service.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                {/* DESC */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* BUTTON */}
                <Link href={`/services/${service.slug}`} className="flex items-center gap-3 text-[#00BFFF] font-medium cursor-pointer">
                  Learn More
                  <FiArrowUpRight className="group-hover:rotate-45 transition" />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA SECTION */}
          <div className="max-w-6xl mx-auto mt-24 bg-[#121212] border border-white/10 rounded-3xl p-10 text-center">

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Need a Custom Solution?
            </h2>

            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Let’s build something amazing together. Contact us today and
              get a free consultation for your project.
            </p>

            <Link href="/contact" className="bg-[#00BFFF] text-black px-8 py-4 rounded-full font-semibold hover:bg-white transition">
              Get Free Consultation
            </Link>
          </div>

        </section>
      </Layout>


    );
  }