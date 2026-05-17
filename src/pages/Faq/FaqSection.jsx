"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState(0);
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
      ],
    },

    {
      category: "Web & App Development",
      questions: [
        {
          id: "dev1",
          question: "Do you build custom websites?",
          answer:
            "Yes, we build fully customized, fast, and responsive websites using React, Next.js, and Node.js.",
        },
        {
          id: "dev2",
          question: "Do you develop mobile apps?",
          answer:
            "We create high-performance Android and iOS apps with modern UI and smooth UX.",
        },
      ],
    },

    {
      category: "SEO & Marketing",
      questions: [
        {
          id: "seo1",
          question: "Do you provide SEO services?",
          answer:
            "Yes, we offer technical SEO, on-page SEO, keyword research, and ranking optimization.",
        },
        {
          id: "seo2",
          question: "Do you manage social media?",
          answer:
            "Yes, we handle complete social media growth and content marketing.",
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
            "Pricing depends on project requirements and features.",
        },
        {
          id: "price2",
          question: "Do you provide support after delivery?",
          answer:
            "Yes, we provide maintenance and support services.",
        },
      ],
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="relative bg-black text-white py-24 px-4 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00BFFF]/10 blur-[150px] rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto">


        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {faqs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
                setOpenFAQ(null);
              }}
              className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium
                ${
                  activeTab === index
                    ? "bg-[#00BFFF] text-black border-[#00BFFF]"
                    : "border-white/10 bg-white/5 hover:bg-[#00BFFF] hover:text-black"
                }`}
            >
              {tab.category}
            </button>
          ))}
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqs[activeTab].questions.map((faq) => (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden
                ${
                  openFAQ === faq.id
                    ? "border-[#00BFFF] bg-[#00BFFF]/10"
                    : "border-white/10 bg-white/5"
                }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg md:text-xl font-semibold">
                  {faq.question}
                </h3>

                <div className="text-2xl text-[#00BFFF]">
                  {openFAQ === faq.id ? (
                    <FiMinus />
                  ) : (
                    <FiPlus />
                  )}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openFAQ === faq.id
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-gray-300 leading-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white/5 border border-white/10 rounded-3xl p-10">

          <h3 className="text-3xl font-bold">
            Still Have Questions?
          </h3>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Our expert team is always ready to help you with your business,
            website, app, SEO, and digital growth needs.
          </p>

          <Link
            href="/contact"
            className="inline-flex mt-8 bg-[#00BFFF] text-black px-8 py-4 rounded-full font-semibold hover:bg-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;