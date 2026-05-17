"use client";

import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div className="bg-black text-white overflow-hidden">

            {/* <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">

                <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

                <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full"></div>

            </div> */}

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="min-h-screen pt-[90px]">
                {children}
            </main>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/918824744976"
                target="_blank"
                rel="noopener noreferrer"
                className="
          fixed 
          bottom-6 
          right-6 
          z-50
          w-16 
          h-16 
          rounded-full 
          bg-green-500 
          flex 
          items-center 
          justify-center 
          text-white 
          text-3xl
          shadow-2xl
          hover:scale-110
          transition-all
          duration-300
        "
            >
                <FaWhatsapp />
            </a>

            {/* Scroll To Top */}
            {/* <button
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="
          fixed
          bottom-28
          right-6
          z-50
          w-14
          h-14
          rounded-full
          bg-cyan-500
          text-black
          text-2xl
          font-bold
          shadow-xl
          hover:bg-cyan-400
          hover:scale-110
          transition-all
          duration-300
        "
            >
                ↑
            </button> */}

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Layout;