import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowUpRight } from "react-icons/fi";
import Glow from "../../Components/Glow";
import FloatingImage from "../../Components/FloatingImage";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { FaHeadphones } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

// --- DATA ARRAYS ---
const featuresData = [
    { icon: <LuReceiptIndianRupee />, title: "Low Cost", points: ["Competitive fee", "Flexible rates"] },
    { icon: <IoHome />, title: "Permission Less", points: ["Open for integration", "Run your own nodes"] },
    { icon: <FaHeadphones />, title: "Secure Data", points: ["Open source sheet", "360 Security"] },
    { icon: <IoShieldCheckmark />, title: "24 X 7 Support", points: ["Toll free number", "Ticket systems"] }
];

const testimonialsData = [
  // ✅ Yahan maine ek lamba review daala hai, test karne ke liye
  { id: 1, logo:"...", text: "The team transformed our brand's online presence with creativity and precision. The results exceeded our expectations! Their digital marketing strategies helped us reach a broader audience and significantly boosted our sales. The process was seamless. Their team is not only talented but also incredibly responsive. I would highly recommend them to anyone looking for top-tier digital services.", authorImage: "https://images.unsplash.com/photo-1599566150163-2DCAAD36?q=80&w=1887&auhref=format&fit=crop", authorName: "Sarah Mitchell", authorTitle: "Marketing Director", stars: 5 },
  { id: 2, logo: "...", text: "Working with this agency was a game-changer. Their innovative approach and dedication to our project were remarkable. We saw a significant increase in user engagement within the first month.", authorImage: "https://images.unsplash.com/photo-1507003211169-0A1DD7228F2D?q=80&w=1887&auhref=format&fit=crop", authorName: "Johnathan Lee", authorTitle: "Product Manager", stars: 5 },
  { id: 3, logo: "...", text: "From start to finish, the process was seamless...", authorImage: "https://images.unsplash.com/photo-1438761681033-6461FFAD8D80?q=80&w=2070&auhref=format&fit=crop", authorName: "Emily Carter", authorTitle: "CEO, Innovate Co.", stars: 5 },
];

const AGENCY_IMAGE_URL = "https://demo.awaikenthemes.com/artistics/wp-content/themes/artistics/assets/images/testimonial-bg-shape.png";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="relative w-full bg-black text-white py-24 px-4 sm:px-8 font overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Glow position="left" size={600} customStyles={{ top: "700px" }} />
        <FloatingImage imageUrl={AGENCY_IMAGE_URL} position="right" opacity="opacity-30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* --- HEADING SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-24">
          <div data-aos="fade-right">
            <p className="flex items-center gap-2 text-xl font-bold tracking-widest uppercase mb-4">
              <span className="text-[#00BFFF] text-2xl">*</span>TESTIMONIALS
            </p>
            <h1 className="text-4xl sm:text-5xl font-light leading-tight">
              Read what they have to say about{" "}
              <span className="text-[#00BFFF] font-bold">working with us</span>
            </h1>
          </div>
          <div className="flex flex-col items-start lg:items-start" data-aos="fade-left">
            <p className="text-gray-300 leading-relaxed max-w-md text-left lg:text-left">
              Join our creative community to collaborate, innovate, and thrive together. We welcome passionate individuals eager to make.
            </p>
            <div className="mt-10 flex items-center">
              <button className="relative bg-gray-800 text-white font-semibold py-4 px-8 rounded-full overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="relative">All Testimonials</span>
              </button>
              <div className="w-14 h-14 bg-[#00BFFF] rounded-full flex items-center justify-center ml-4 cursor-pointer group hover:scale-110 transition-transform duration-300">
                <FiArrowUpRight className="h-6 w-6 text-black group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* --- RESPONSIVE TESTIMONIALS SLIDER SECTION --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center mb-24">
          {/* Left Rating Card */}
          <div className="w-full lg:w-2/5 flex-shrink-0 bg-[#0d0d0d] rounded-3xl p-8 sm:p-10 text-center border border-gray-800" data-aos="fade-right">
            <p className="text-8xl font-bold">4.9</p>
            <div className="flex justify-center items-center gap-1 text-2xl text-[#00BFFF] my-4">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="text-gray-400 text-sm">( 40+ Reviews )</p>
            <p className="text-xl font-medium mt-8">Customer experiences that speak for themselves</p>
            <div className="flex items-center justify-center mt-6">
              {["1599566150163-29194dcaad36", "1438761681033-6461ffad8d80", "1507003211169-0a1dd7228f2d", "1535713875002-d1d0cf377fde"].map((id, i) => (
                <img key={i} src={`https://images.unsplash.com/photo-${id}?q=80&w=100&h=100&fit=crop`} alt={`user ${i}`} className={`w-12 h-12 rounded-full object-cover border-2 border-black ${i > 0 ? "-ml-4" : ""}`} />
              ))}
            </div>
          </div>

          {/* Right Testimonial Slider */}
          {/* ✅✅✅ YEH SABSE BADA CHANGE HAI ✅✅✅ */}
          <div 
            className="relative w-full lg:w-3/5 h-[500px] sm:h-[450px] overflow-hidden" 
            data-aos="fade-left"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentTestimonial.id}
                initial={{ x: 600, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -600, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-full h-full flex flex-col gap-6 p-8"
              >
                <div className="flex items-center gap-3">
                  <img src={currentTestimonial.logo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-bold text-lg">Logoipsum</span>
                </div>
                <div className="flex items-center gap-1 text-xl text-[#00BFFF]">
                  {[...Array(currentTestimonial.stars)].map((_, i) => <FaStar key={i} />)}
                </div>
                
                {/* Review Text Container with Scroll */}
                <div className="flex-grow overflow-y-auto pr-4"> {/* pr-4 scrollbar ke liye jagah banata hai */}
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-left">
                    "{currentTestimonial.text}"
                  </p>
                </div>
                
                {/* Author Info and Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-auto pt-4"> {/* pt-4 se text aur buttons ke beech gap rahega */}
                  <div className="flex items-center gap-4">
                    <img src={currentTestimonial.authorImage} alt={currentTestimonial.authorName} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-lg">{currentTestimonial.authorName}</p>
                      <p className="text-gray-400">{currentTestimonial.authorTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handlePrev} className="bg-[#1C1C1C] p-4 rounded-md hover:bg-gray-800 transition-colors text-2xl"><FaArrowLeft /></button>
                    <button onClick={handleNext} className="bg-[#1C1C1C] p-4 rounded-md hover:bg-gray-800 transition-colors text-2xl"><FaArrowRight /></button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- FEATURES GRID SECTION --- */}
        <div className="w-full max-w-7xl mx-auto" data-aos="fade-up">
          <div className="bg-[#1C1C1C] bg-opacity-65 rounded-2xl border border-white/10 p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-gray-800 sm:divide-y-0 sm:divide-x sm:divide-gray-800">
              {featuresData.map((feature, index) => (
                <div key={index} className="flex flex-col items-start text-start p-6">
                  <div className="text-lime-400 mb-6 text-5xl h-12">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-5">{feature.title}</h3>
                  <ul className="text-base text-gray-300 space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-lime-400 mr-2 mt-1 leading-none">*</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}