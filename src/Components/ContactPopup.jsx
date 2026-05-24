"use client";

import React, { useRef, useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiX } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import Link from "next/link";

const contactInfo = [
  {
    icon: <FiPhone />,
    title: "Phone Number",
    detail: "+91 88247 44976",
    to: "tel:8824744976",
  },
  {
    icon: <FiMail />,
    title: "Email Address",
    detail: "info@seankrixtechnologies.com",
    to: "mailto:info@seankrixtechnologies.com",
  },
  {
    icon: <FiMapPin />,
    title: "Address",
    detail: "Rajasthan, India",
    to: "#",
  },
];

const FormInput = ({
  type = "text",
  placeholder,
  name,
  onChange,
  value,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required
    className="w-full bg-black/30 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/50"
  />
);

export default function ContactPopup() {
  const form = useRef();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name required";
    }

    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name required";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Enter valid 10-digit phone";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter valid email";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // Send Email
  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

  return (
    <>
      <div
        onClick={() => setIsPopupOpen(true)}
        className="mt-16 flex items-center mb-10"
        data-aos="fade-up"
      >
        <button className="bg-[#00BFFF] text-black py-4 px-8 rounded-full font-semibold hover:bg-white transition">
          Get Free Consultation
        </button>


        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-4 cursor-pointer hover:bg-[#00BFFF] transition group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black transform transition group-hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center mt-[120px] bg-black/70 p-4">

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[500px] bg-[#0B0B0B] border border-white/10 rounded-3xl overflow-hidden"
          >

            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00BFFF]/20 blur-[120px] rounded-full"></div>

            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-5 right-5 text-white cursor-pointer  text-2xl z-10"
            >
              <FiX />
            </button>

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-10">

              {/* Heading */}
              <div className="text-center mb-4  ">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Get Free <span className="text-[#00BFFF]">Consultation</span>
                </h2>

                <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
                  Tell us about your project and we’ll help you build a modern,
                  powerful, and high-converting digital solution.
                </p>
              </div>

              {/* Form */}
              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                  <FormInput
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName}
                  </p>
                )}

                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName}
                  </p>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>

                    <FormInput
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>

                    <FormInput
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email}
                      </p>
                    )}
                  </div>

                </div>




                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/50"
                />

                <button
                  type="submit"
                  className="w-full bg-[#00BFFF] text-black py-4 rounded-xl font-bold hover:bg-white transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
          <div className="bg-white text-black p-6 rounded-xl text-center">
            <h3 className="text-green-600 font-bold text-lg">
              ✅ Message Sent Successfully!
            </h3>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsPopupOpen(false);
              }}
              className="mt-4 bg-[#00BFFF] px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}