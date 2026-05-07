"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";

// Images
const mainImage =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop";

const overlappingImage =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop";

// Updated FAQ Data (IT Agency Focused)
const faqData = [
  {
    question: "What IT services do you provide?",
    answer:
      "We offer complete IT solutions including website development, mobile app development, UI/UX design, SEO, digital marketing, and cloud integration tailored to your business needs.",
  },
  {
    question: "How long does it take to build a website or app?",
    answer:
      "Project timelines depend on complexity. A standard business website takes 2–4 weeks, while advanced web apps or mobile apps may take 4–12 weeks.",
  },
  {
    question: "Do you provide ongoing support & maintenance?",
    answer:
      "Yes, we provide continuous support, updates, security monitoring, and performance optimization to ensure your platform runs smoothly.",
  },
  {
    question: "Can you redesign or improve my existing website?",
    answer:
      "Absolutely. We can redesign your current website with modern UI/UX, improve speed, SEO ranking, and add advanced features.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes, we specialize in helping startups and small businesses grow with cost-effective and scalable digital solutions.",
  },
];

// Accordion Component
const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border border-white/10 rounded-2xl p-5 bg-[#111] hover:border-[#00BFFF] transition">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={onClick}
      >
        <span className="text-white font-medium text-lg">
          {item.question}
        </span>

        <div className="bg-[#00BFFF] text-black rounded-full p-2">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-40 mt-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#00BFFF]/10 blur-[150px] rounded-full"></div>
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-[#00BFFF]/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT IMAGE SECTION */}
        <div className="relative h-[500px] flex items-center justify-center">
          <div className="relative w-full max-w-md h-full">
            <img
              src={mainImage}
              alt="Team discussion"
              className="w-full h-full object-cover rounded-3xl"
            />

            {/* Contact Badge */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-3 rounded-full flex items-center gap-3">
              <div className="bg-[#00BFFF] text-black rounded-full p-2">
                <FaPhoneAlt />
              </div>
              <span className="text-sm font-medium">+91 98765 43210</span>
            </div>
          </div>

          {/* Floating Image */}
          <img
            src={overlappingImage}
            alt="Developer"
            className="absolute -top-12 right-0 w-2/3 max-w-xs rounded-3xl border-8 border-black shadow-xl"
          />
        </div>

        {/* RIGHT FAQ SECTION */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase mb-4 text-gray-400">
              <span className="text-[#00BFFF]">*</span> FAQ
            </p>

            <h2 className="text-4xl sm:text-5xl font-light leading-tight">
              Frequently Asked <br />
              <span className="text-[#00BFFF] font-bold">Questions</span>
            </h2>

            <p className="text-gray-400 mt-4 max-w-md">
              Get answers to common questions about our IT services,
              development process, pricing, and support.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-4 mt-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}