"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

// 25 deterministic snowflakes (hydration-safe for Next.js)
const SNOWFLAKES = [
  { id: 1, left: "3%", size: 12, duration: 9, delay: 0, opacity: 0.75 },
  { id: 2, left: "7%", size: 16, duration: 12, delay: 1.5, opacity: 0.6 },
  { id: 3, left: "11%", size: 10, duration: 8, delay: 3, opacity: 0.85 },
  { id: 4, left: "15%", size: 18, duration: 14, delay: 0.8, opacity: 0.55 },
  { id: 5, left: "19%", size: 13, duration: 10, delay: 2.2, opacity: 0.8 },
  { id: 6, left: "23%", size: 15, duration: 11, delay: 4.1, opacity: 0.65 },
  { id: 7, left: "27%", size: 11, duration: 9.5, delay: 1.1, opacity: 0.7 },
  { id: 8, left: "31%", size: 17, duration: 13, delay: 2.9, opacity: 0.6 },
  { id: 9, left: "35%", size: 12, duration: 8.5, delay: 0.4, opacity: 0.85 },
  { id: 10, left: "39%", size: 14, duration: 12.5, delay: 3.7, opacity: 0.7 },
  { id: 11, left: "43%", size: 19, duration: 15, delay: 1.8, opacity: 0.5 },
  { id: 12, left: "47%", size: 11, duration: 9, delay: 4.5, opacity: 0.8 },
  { id: 13, left: "51%", size: 15, duration: 11.5, delay: 0.6, opacity: 0.7 },
  { id: 14, left: "55%", size: 13, duration: 10.5, delay: 2.6, opacity: 0.75 },
  { id: 15, left: "59%", size: 16, duration: 13.5, delay: 1.3, opacity: 0.6 },
  { id: 16, left: "63%", size: 10, duration: 8.8, delay: 3.4, opacity: 0.85 },
  { id: 17, left: "67%", size: 17, duration: 14.2, delay: 0.2, opacity: 0.55 },
  { id: 18, left: "71%", size: 12, duration: 9.8, delay: 2.1, opacity: 0.75 },
  { id: 19, left: "75%", size: 14, duration: 11.2, delay: 4.0, opacity: 0.7 },
  { id: 20, left: "79%", size: 18, duration: 13.8, delay: 1.4, opacity: 0.6 },
  { id: 21, left: "83%", size: 11, duration: 9.2, delay: 3.1, opacity: 0.8 },
  { id: 22, left: "87%", size: 15, duration: 12.1, delay: 0.9, opacity: 0.65 },
  { id: 23, left: "91%", size: 13, duration: 10.2, delay: 2.7, opacity: 0.75 },
  { id: 24, left: "94%", size: 16, duration: 12.8, delay: 1.6, opacity: 0.6 },
  { id: 25, left: "97%", size: 12, duration: 9.4, delay: 3.9, opacity: 0.85 },
];

function Layout({ children }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Agar aap chahte hain ki har page change par popup dubara khule,
    // toh neeche wali sessionStorage check wali lines hata dein.
    const alreadyClosed = sessionStorage.getItem("seankrix_newyear_offer_closed");
    if (!alreadyClosed) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("seankrix_newyear_offer_closed", "true");
  };

  const whatsappOfferLink =
    "https://wa.me/918824744976?text=Hello%20Seankrix%20Technologies!%20Mujhe%20Christmas%20%26%20New%20Year%20Gift%2025%25%20Discount%20Offer%20par%20website%20banwani%20hai.";

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Snowfall & Flying Santa Animation Keyframes */}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(18px) rotate(180deg);
          }
          100% {
            transform: translateY(110vh) translateX(-12px) rotate(360deg);
          }
        }
        .animate-snowfall {
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes santaFly {
          0% {
            transform: translateX(-340px) translateY(6px);
          }
          25% {
            transform: translateX(25vw) translateY(-6px);
          }
          50% {
            transform: translateX(55vw) translateY(5px);
          }
          75% {
            transform: translateX(82vw) translateY(-5px);
          }
          100% {
            transform: translateX(calc(100vw + 340px)) translateY(4px);
          }
        }
        .animate-santa-fly {
          animation: santaFly 16s linear infinite;
        }
      `}</style>

      {/* Flying Santa Sleigh at Top (All Pages) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-2 z-50 h-16 overflow-hidden"
      >
        <div className="animate-santa-fly flex w-max items-center gap-2 select-none">
          {/* Festive Trail Badge */}
          <span className="rounded-full border border-red-400/40 bg-gradient-to-r from-red-600/90 via-amber-500/90 to-emerald-600/90 px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] backdrop-blur-sm">
            ✨ Ho Ho Ho! 25% OFF 🎁
          </span>

          {/* Santa + Sleigh + Reindeers flipped to face Right */}
          <span
            className="inline-block text-2xl sm:text-3xl drop-shadow-[0_4px_10px_rgba(255,255,255,0.35)]"
            style={{ transform: "scaleX(-1)" }}
          >
            🦌🦌🛷🎅
          </span>
        </div>
      </div>

      {/* 25 Snowflakes Overlay (All Pages) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      >
        {SNOWFLAKES.map((flake) => (
          <span
            key={flake.id}
            className="animate-snowfall absolute -top-8 select-none text-cyan-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            style={{
              left: flake.left,
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen pt-[90px]">{children}</main>

      {/* Christmas & New Year 25% Discount Gift Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 text-center shadow-[0_0_50px_rgba(6,182,212,0.25)] sm:p-8">
            {/* Festive Top Glow Strip */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500" />

            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              aria-label="Close Offer Popup"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-sm text-slate-300 hover:border-white hover:text-white transition"
            >
              ✕
            </button>

            {/* Festive Badge */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              🎄 25 Dec &amp; New Year Special Gift 🎁
            </div>

            {/* Discount Highlight */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              FLAT{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">
                25% OFF
              </span>
            </h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              New Year Website Gift Offer
            </p>

            {/* Offer Message */}
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Agar aapko{" "}
              <span className="font-semibold text-white">
                kisi bhi tarah ki website banwani hai
              </span>{" "}
              (Business Website, eCommerce, Portfolio, CRM/ERP ya Custom Web App), toh is{" "}
              <span className="font-semibold text-amber-300">
                Christmas &amp; New Year
              </span>{" "}
              par paayein{" "}
              <span className="font-bold text-emerald-400">25% Flat Discount!</span>
            </p>

            {/* Quick Services Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] text-slate-300">
              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1">
                Business Website
              </span>
              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1">
                eCommerce Store
              </span>
              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1">
                MERN Web App
              </span>
              <span className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1">
                CRM / ERP
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappOfferLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClosePopup}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg hover:brightness-110 transition"
              >
                <FaWhatsapp className="text-lg" />
                Claim 25% Discount Now
              </a>

              <button
                onClick={handleClosePopup}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition"
              >
                No thanks, continue exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Re-open Gift Button (Bottom Left) */}
      {!showPopup && (
        <button
          onClick={() => setShowPopup(true)}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-amber-400/40 bg-slate-900/95 px-4 py-2.5 text-xs font-bold text-amber-300 shadow-2xl backdrop-blur hover:scale-105 hover:border-amber-300 transition-all duration-300"
        >
          <span>🎁</span>
          <span>25% OFF New Year Gift</span>
        </button>
      )}

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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;