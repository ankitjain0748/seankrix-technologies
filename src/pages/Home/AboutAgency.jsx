

import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { VscSymbolMisc } from "react-icons/vsc";
import { IoCubeOutline } from "react-icons/io5";
import { RiStackFill } from "react-icons/ri";
import { HiOutlineCircleStack } from "react-icons/hi2";

import FeatureItem from '../../items/FeatureItem';
import Glow from '../../Components/Glow';
import FloatingImage from '../../Components/FloatingImage';

const AGENCY_IMAGE_URL = 'https://demo.awaikenthemes.com/artistics/wp-content/themes/artistics/assets/images/about-agency-bg.png';

const features = [
  {
    icon: <VscSymbolMisc />,
    title: "Client-Centric Approach",
    description:
      "We prioritize your business goals and tailor every solution to deliver measurable results. Our focus is on building long-term partnerships through trust, transparency, and performance.",
  },
  {
    icon: <IoCubeOutline />,
    title: "Custom Web & App Development",
    description:
      "We build high-performance websites and scalable mobile applications using modern technologies to ensure speed, security, and seamless user experience.",
  },
  {
    icon: <RiStackFill />,
    title: "Creative UI/UX Design",
    description:
      "Our design team crafts intuitive and engaging user interfaces that not only look stunning but also enhance usability and drive conversions.",
  },
  {
    icon: <HiOutlineCircleStack />,
    title: "Digital Growth & Marketing",
    description:
      "From SEO to paid advertising, we help businesses grow online by increasing visibility, generating leads, and maximizing ROI with data-driven strategies.",
  },
];

export default function AboutAgency() {

  return (
    <section className="relative bg-black text-white py-24 px-4 sm:px-8 md:px-16 ">

      <div className="absolute inset-0 overflow-hidden z-10">
      <Glow position="right" size={600}  customStyles={{top: '400px' }} />
        <FloatingImage imageUrl={AGENCY_IMAGE_URL} position="left" opacity="opacity-30" />
        </div>
        
     
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        
       
        <div className="lg:sticky top-20 flex flex-col">
          <p className="flex items-center gap-2 text-xl font-bold tracking-widest uppercase text-white mb-6">
            <span className="text-[#00BFFF] text-2xl">*</span> ABOUT OUR COMPANY
          </p>
      <h2 className="text-5xl lg:text-6xl font-light leading-tight">
  Crafting <span className="text-[#00BFFF] font-bold">unique digital</span> experiences that elevate your brand
</h2> 
          
          <div className="mt-12 flex items-center">
            <button className="bg-gray-800/50 text-white py-4 px-8 rounded-full hover:bg-gray-700/50 transition-colors duration-300">
              Contact Us
            </button>
            <div className="w-12 h-12 bg-[#00BFFF] rounded-full flex items-center justify-center ml-4 cursor-pointer">
              <FiArrowUpRight className="h-6 w-6 text-black" />
            </div>
          </div>
          
      
          <div className="absolute top-64  -z-10">
           
          </div>
        </div>

      
        <div className="mt-16 lg:mt-0">
          <div className="space-y-24">
            {features.map((feature, index) => (
              <FeatureItem 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}