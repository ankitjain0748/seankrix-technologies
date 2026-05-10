"use client";

import React, { useRef, useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
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
    detail: "ankitkumarjain0748@gmail.com",
    to: "mailto:ankitkumarjain0748@gmail.com",
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

export default function ContactForm() {
  const form = useRef();

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
    <section className="relative bg-black text-white py-24 px-6 sm:px-8 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vh] bg-lime-900/20 blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* Left */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Get in <span className="text-[#00BFFF]">touch</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Have a project idea or need help? Let's talk and build something amazing together.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {contactInfo.slice(0, 2).map((item) => (
              <Link
                key={item.title}
                href={item.to}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center"
              >
                <div className="text-3xl text-[#00BFFF] mb-3">
                  {item.icon}
                </div>

                <h3 className="font-bold">{item.title}</h3>

                <p className="text-gray-400">{item.detail}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex gap-4 items-center">
              <div className="text-2xl text-[#00BFFF]">
                {contactInfo[2].icon}
              </div>

              <div>
                <h3 className="font-bold">
                  {contactInfo[2].title}
                </h3>

                <p className="text-gray-400">
                  {contactInfo[2].detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <form ref={form} onSubmit={sendEmail} className="space-y-5">

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

            <FormInput
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone}
              </p>
            )}

            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email}
              </p>
            )}

            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-5 py-4 text-white"
            />

            <button
              type="submit"
              className="w-full bg-[#00BFFF] text-black py-3 rounded-lg font-bold hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl text-center">
            <h3 className="text-green-600 font-bold text-lg">
              ✅ Message Sent Successfully!
            </h3>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 bg-[#00BFFF] px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}