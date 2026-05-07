"use client";

import Link from "next/link";
import React, { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: "General Information",
      questions: [
        {
          id: "general1",
          question: "What services do you provide?",
          answer:
            "We provide complete IT solutions including web development, mobile app development, UI/UX design, SEO, digital marketing, and cloud services.",
        },
        {
          id: "general2",
          question: "How can I start a project with you?",
          answer:
            "Simply contact us via our website or call. We’ll discuss your requirements and provide a roadmap, timeline, and pricing.",
        },
        {
          id: "general3",
          question: "Do you provide free consultation?",
          answer:
            "Yes, we offer a free consultation to understand your business needs and suggest the best solution.",
        },
        {
          id: "general4",
          question: "Which industries do you work with?",
          answer:
            "We work with startups, small businesses, e-commerce brands, education, healthcare, and enterprise clients.",
        },
      ],
    },
    {
      category: "Web & App Development",
      questions: [
        {
          id: "dev1",
          question: "Do you build custom websites?",
          answer:
            "Yes, we build fully customized, fast, and responsive websites using modern technologies like React, Next.js, and Node.js.",
        },
        {
          id: "dev2",
          question: "Do you develop mobile apps?",
          answer:
            "We create high-performance Android and iOS apps with modern UI and smooth user experience.",
        },
        {
          id: "dev3",
          question: "Can you redesign my existing website?",
          answer:
            "Absolutely! We can redesign your website to improve UI, speed, SEO, and conversions.",
        },
      ],
    },
    {
      category: "Digital Marketing & SEO",
      questions: [
        {
          id: "seo1",
          question: "Do you provide SEO services?",
          answer:
            "Yes, we offer complete SEO services including on-page SEO, technical SEO, keyword research, and backlink building.",
        },
        {
          id: "seo2",
          question: "How long does SEO take?",
          answer:
            "SEO is a long-term strategy. You can start seeing results within 3-6 months depending on competition.",
        },
        {
          id: "seo3",
          question: "Do you manage social media?",
          answer:
            "Yes, we handle social media strategy, content creation, posting, and growth marketing.",
        },
      ],
    },
    {
      category: "Pricing & Support",
      questions: [
        {
          id: "price1",
          question: "What is your pricing model?",
          answer:
            "Pricing depends on project requirements. We offer fixed pricing, hourly rates, and monthly packages.",
        },
        {
          id: "price2",
          question: "Do you provide support after project delivery?",
          answer:
            "Yes, we offer ongoing maintenance and support packages.",
        },
        {
          id: "price3",
          question: "What payment methods do you accept?",
          answer:
            "We accept bank transfer, UPI, credit/debit cards, and international payments.",
        },
      ],
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-black text-white px-4 md:px-10 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

        {/* LEFT SIDE */}
        <div className="flex-1 md:overflow-y-auto  md:max-h-[calc(100vh-100px)] pr-2">

          {faqs.map((section, i) => (
            <div key={i} id={section.category.replace(/\s/g, "-")} className="mb-16">

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-[#00BFFF]">
                  {section.category.split(" ")[0]}{" "}
                </span>
                {section.category.split(" ").slice(1).join(" ")}
              </h2>

              {section.questions.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-[#1A1A1A] rounded-xl p-5 mb-4 border border-white/10"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <p className="text-lg md:text-xl font-medium">
                      {faq.question}
                    </p>

                    <span className="text-[#00BFFF] text-2xl">
                      {openFAQ === faq.id ? "−" : "+"}
                    </span>
                  </div>

                  {openFAQ === faq.id && (
                    <p className="mt-3 text-gray-400 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="md:w-80 sticky top-10 h-fit">

          {/* CATEGORY LINKS */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 mb-6">
            <ul>
              {faqs.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#${section.category.replace(/\s/g, "-")}`}
                    className="flex justify-between items-center py-4 border-b border-white/10 text-gray-300 hover:text-[#00BFFF] transition"
                  >
                    {section.category}
                    →
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT BOX */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold text-[#00BFFF] mb-2">
              Still have questions?
            </h3>

            <p className="text-gray-400 mb-4">
              Our expert team is here to help you anytime.
            </p>

            <Link
              href="/contact"
              className="bg-[#00BFFF] text-black px-6 py-3 rounded-full font-semibold inline-block hover:scale-105 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;