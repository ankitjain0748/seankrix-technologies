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
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import WhatsAppButton from "@/Components/WhatsAppButton";
import Link from "next/link";
import Layout from "@/Components/Layout";

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

            <section className="bg-black text-white py-20 px-4 sm:px-8">

                {/* HERO */}
                <div className="max-w-7xl mx-auto text-center mb-20 mt-20">
                    <p className="uppercase text-sm tracking-widest text-gray-400 mb-4">
                        * OUR SERVICES
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
                        We Provide <span className="text-[#00BFFF] font-bold">Best IT Solutions</span>
                    </h1>

                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                        We help businesses grow with modern web development, mobile apps,
                        SEO, and digital solutions tailored to your needs.
                    </p>
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