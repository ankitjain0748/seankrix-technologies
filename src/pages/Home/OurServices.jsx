

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowUpRight } from "react-icons/fi";
import Glow from "../../Components/Glow";
import { IoDiamondOutline } from "react-icons/io5";
import { HiOutlinePresentationChartLine, HiOutlineLightBulb } from "react-icons/hi";
import Link from "next/link";

export default function OurServices() {


  const services = [
  {
    icon: <IoDiamondOutline />,
    title: "Website Development",
    desc: "We create fast, responsive, and SEO-friendly websites that deliver seamless user experience and help your business grow online."
  },
  {
    icon: <HiOutlinePresentationChartLine />,
    title: "Mobile App Development",
    desc: "Build powerful Android and iOS apps with modern technology, smooth performance, and user-friendly design."
  },
  {
    icon: <HiOutlineLightBulb />,
    title: "UI/UX Design",
    desc: "We design clean, modern, and user-focused interfaces that improve engagement and increase conversions."
  },
  {
    icon: <IoDiamondOutline />,
    title: "Digital Marketing",
    desc: "Boost your business with SEO, social media marketing, and paid ads that generate traffic, leads, and sales."
  },
  {
    icon: <HiOutlinePresentationChartLine />,
    title: "Social Media Management",
    desc: "Grow your brand on Instagram, Facebook, and other platforms with creative content and consistent strategy."
  },
  {
    icon: <HiOutlineLightBulb />,
    title: "E-Commerce Solutions",
    desc: "We build scalable online stores with secure payment systems and optimized user journeys to increase sales."
  }
];
  const cardBgImageUrl = "https://demo.awaikenthemes.com/artistics/wp-content/uploads/2024/11/service-bg.svg";

  return (
    <section className="relative w-full bg-black text-white py-24 px-4 sm:px-8 font">
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <Glow
          position="left"
          size={600}
          customStyles={{ top: "50%", left: "5%", transform: "translate(-50%, -50%)" }}
        />
        <div className="flex flex-col">
          <p className="flex items-center gap-2 text-xl font-bold tracking-widest uppercase mb-4 font" >
            <span className="text-[#00BFFF] text-2xl">*</span> Explore Our Services
          </p>
          <h1 className="text-3xl sm:text-6xl lg:text-5xl font-light leading-tight font" >
          Powerful <span className="text-[#00BFFF] font-bold">IT Solutions</span> for Your Business Growth
          </h1>
        </div>
        <div className="flex flex-col items-start" >
          <p className="text-gray-300 leading-relaxed mt-4">
We provide complete IT services including web development, mobile apps, digital marketing, and social media management to help your business grow faster and smarter in the digital world.          </p>
          <Link href="/services" className="mt-10 flex items-center font">
            <button className="relative bg-gray-800 text-white font-semibold py-4 px-8 rounded-full overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              <span className="relative">View Details</span>
            </button>
            <div className="w-14 h-14 bg-[#00BFFF] rounded-full flex items-center justify-center ml-4 cursor-pointer group hover:scale-110 transition-transform duration-300">
              <FiArrowUpRight className="h-6 w-6 text-black group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>

      <div className="relative  max-w-[1230px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, i) => (
            <div 
              key={i} 
              className="relative flex flex-col justify-between p-8 rounded-3xl h-[350px]
                         bg-neutral-900/50 border border-white/10 backdrop-blur-sm
                         group hover:-translate-y-2 transition-transform duration-300"

                           style={{ 
                backgroundImage:`url('${cardBgImageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
             
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl text-[#00BFFF]"  data-aos="fade-up" data-aos-anchor-placement="center-bottom">{service.icon}</span>
                <div className="text-3xl text-[#00BFFF] group-hover:rotate-45 transition-transform duration-300">
                  <FiArrowUpRight />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-3 font"  data-aos="fade-up" data-aos-anchor-placement="center-bottom">{service.title}</h2>
                <p className="text-gray-400 leading-relaxed font"  data-aos="fade-up" data-aos-anchor-placement="center-bottom">{service.desc}</p>
              </div>
            </div>
          ))}

        </div>
        <span className=" md-flex block  justify-center text-center items-center p-5 font">
         Let’s grow your business together. 
<span className="text-[#00BFFF] cursor-pointer">Get Free Consultation</span></span>
      </div>
    </section>
  );
}