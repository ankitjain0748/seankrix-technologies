    "use client";

    import Layout from "@/Components/Layout";
    import Head from "next/head";
    import Image from "next/image";
    import Link from "next/link";
    import React from "react";

    const metadata = {
    title:
        "Portfolio | Seankrix Technologies - Web Development & IT Solutions",

    description:
        "Explore the latest projects by Seankrix Technologies including web development, app development, UI/UX design, SEO, and digital solutions.",

    keywords: [
        "Portfolio",
        "Web Development Projects",
        "Next.js Projects",
        "IT Company Portfolio",
        "UI UX Design",
        "SEO Projects",
        "Digital Solutions",
    ],

    openGraph: {
        title:
        "Portfolio | Seankrix Technologies",
        description:
        "View our latest web development, SEO, and app development projects.",
        url: "https://seankrixtechnologies.com/portfolio",
        siteName: "Seankrix Technologies",
        type: "website",
    },
    };

    const portfolioProjects = [
    {
        title: "Modern Business Website",
        category: "Web Development",
        image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        description:
        "A modern responsive business website built with Next.js and Tailwind CSS for high performance and SEO optimization.",
        technologies: ["Next.js", "React", "Tailwind CSS"],
    },

    {
        title: "E-Commerce Store",
        category: "E-Commerce Development",
        image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        description:
        "A powerful e-commerce platform with secure payment integration, product management, and responsive design.",
        technologies: ["React", "Node.js", "MongoDB"],
    },

    {
        title: "Mobile App UI Design",
        category: "UI/UX Design",
        image:
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop",
        description:
        "Clean and modern mobile application UI/UX design focused on user engagement and smooth experience.",
        technologies: ["Figma", "UI/UX", "Mobile Design"],
    },

    {
        title: "SEO & Digital Marketing",
        category: "SEO Optimization",
        image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200&auto=format&fit=crop",
        description:
        "Complete SEO optimization and digital marketing strategy to increase online visibility and conversions.",
        technologies: ["SEO", "Marketing", "Analytics"],
    },

    {
        title: "Dashboard Web Application",
        category: "Custom Software",
        image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        description:
        "Advanced admin dashboard with analytics, charts, authentication, and real-time data management.",
        technologies: ["React", "Firebase", "Chart.js"],
    },

    {
        title: "Corporate Branding Website",
        category: "Corporate Website",
        image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
        description:
        "Professional corporate website with premium UI design, animations, and business-focused layouts.",
        technologies: ["Next.js", "GSAP", "Tailwind"],
    },
    ];

    export default function PortfolioPage() {
    return (
    <Layout>
    <Head>
  {/* Primary Meta Tags */}
  <title>
    Portfolio | Seankrix Technologies - Web Development & IT Solutions
  </title>

  <meta
    name="description"
    content="Explore the latest projects by Seankrix Technologies including web development, app development, UI/UX design, SEO, and digital solutions."
  />

  <meta
    name="keywords"
    content="Portfolio, Web Development Projects, Next.js Projects, IT Company Portfolio, UI UX Design, SEO Projects, Digital Solutions"
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

  {/* Open Graph / Facebook */}
  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content="https://seankrixtechnologies.com/portfolio"
  />

  <meta
    property="og:title"
    content="Portfolio | Seankrix Technologies"
  />

  <meta
    property="og:description"
    content="View our latest web development, SEO, and app development projects."
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
    content="Portfolio | Seankrix Technologies"
  />

  <meta
    name="twitter:description"
    content="View our latest web development, SEO, and app development projects."
  />

  <meta
    name="twitter:image"
    content="https://seankrixtechnologies.com/og-image.jpg"
  />

  {/* Canonical URL */}
  <link
    rel="canonical"
    href="https://seankrixtechnologies.com/portfolio"
  />

  {/* Favicon */}
  <link
    rel="icon"
    href="/favicon.ico"
  />
</Head>
            <section className="relative bg-black text-white py-24 px-4 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00BFFF]/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-16">

            <p className="text-[#00BFFF] uppercase tracking-[4px] font-medium mb-4">
                Our Portfolio
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Our Latest <span className="text-[#00BFFF]">Projects</span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-8">
                Explore our latest web development, app development,
                UI/UX, SEO, and digital transformation projects built
                for startups, businesses, and enterprises worldwide.
            </p>
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {portfolioProjects.map((project, index) => (
                <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#00BFFF]/50 transition-all duration-500"
                >

                {/* Image */}
                <div className="relative overflow-hidden">

                    <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-[260px] object-cover group-hover:scale-110 transition-all duration-700"
                    />

                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="absolute top-5 left-5 bg-[#00BFFF] text-black text-sm font-semibold px-4 py-2 rounded-full">
                    {project.category}
                    </div>
                </div>

                {/* Content */}
                <div className="p-7">

                    <h2 className="text-2xl font-bold mb-4 group-hover:text-[#00BFFF] transition">
                    {project.title}
                    </h2>

                    <p className="text-gray-400 leading-7 mb-6">
                    {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 mb-6">

                    {project.technologies.map((tech, i) => (
                        <span
                        key={i}
                        className="bg-white/10 border border-white/10 text-sm px-4 py-2 rounded-full"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>

                    {/* Button */}
                    <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 text-[#00BFFF] font-semibold hover:gap-5 transition-all duration-300"
                    >
                    View Project

                    <span className="text-xl">→</span>
                    </Link>
                </div>
                </div>
            ))}
            </div>

            {/* CTA */}
            <div className="mt-24 bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 text-center">

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Build Your Next
                <span className="text-[#00BFFF]"> Digital Project?</span>
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
                We create modern, scalable, and high-performance digital
                solutions that help businesses grow faster online.
            </p>

            <Link
                href="/contact"
                className="inline-flex mt-8 bg-[#00BFFF] hover:bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
                Start Your Project
            </Link>
            </div>
        </div>
        </section>
    </Layout>
    );
    }