import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react

/* ================= EDIT YOUR DETAILS HERE ================= */
const E = {
  groom: "Jayant Yadav",
  bride: "Tanu Rao",
  initials: "T & J",
  blessing: "॥ श्री गणेशाय नमः ॥",
  padharo: "पधारो सा", // Rajasthani welcome. Leave "" to hide
  weddingDate: "Tuesday, 9th March 2027", // shown on the wedding scene
  weddingCity: "SULTAN HOUSE GARDEN · JAIPUR",
  dateISO: "2027-03-09T22:00:00+05:30", // pheras (10 PM IST): used for live countdown
  siteUrl: "https://www.seankrixtechnologies.com", // apna live domain yahan rakhen
  pagePath: "/rajasthanwedding", // aapki file src/pages/rajasthanwedding.jsx ke hisaab se
  ogImage: "/rajasthan/3.jpeg", // WhatsApp / Social share par yahi photo dikhegi (/public/rajasthan/3.jpeg)
  ganeshPhoto: "/rajasthan/ganesh.jpg", // Exact file path check karen: /public/rajasthan/ganesh.jpg
  groomPhoto: "/rajasthan/groom.jpeg", // /public/rajasthan/groom.jpeg
  bridePhoto: "/rajasthan/bride.jpeg", // /public/rajasthan/bride.jpeg
  brideFamily: ["Daughter of", "Mrs. Sunita Yadav", "& Mr. Sunil Yadav", "Jaipur, Rajasthan"],
  groomFamily: ["Son of", "Mrs. Savita Yadav", "& Mr. Jitender Yadav", "Rewari, Haryana"],
  // one entry per function. Each gets its own film scene AND its own card on the page
  funcs: [
    {
      key: "haldi",
      name: "Haldi",
      icon: "🌼",
      date: "Monday, 8th March 2027",
      time: "9:00 am onwards",
      venue: "D54, Vinayak Residency",
      venue2: "Manglam City, Kalwar Road, Jaipur",
      program: ["Haldi rasam", "Dhol & folk songs", "Aashirwad"],
      mapUrl: "https://maps.app.goo.gl/VbRo7qq8sKQBcqKMA?g_st=ic",
    },
    {
      key: "mehendi",
      name: "Mehandi",
      icon: "🌿",
      date: "Monday, 8th March 2027",
      time: "10:00 am onwards",
      venue: "D54, Vinayak Residency",
      venue2: "Manglam City, Kalwar Road, Jaipur",
      program: ["Mehandi ceremony", "Folk music & dance", "Refreshments"],
      mapUrl: "https://maps.app.goo.gl/VbRo7qq8sKQBcqKMA?g_st=ic",
    },
    {
      key: "sangeet",
      name: "Ladies Sangeet",
      icon: "🎶",
      date: "Monday, 8th March 2027",
      time: "12:00 pm onwards",
      venue: "D54, Vinayak Residency",
      venue2: "Manglam City, Kalwar Road, Jaipur",
      program: ["Ladies sangeet", "Ghoomar & folk songs", "Lunch"],
      mapUrl: "https://maps.app.goo.gl/VbRo7qq8sKQBcqKMA?g_st=ic",
    },
    {
      key: "chaak",
      name: "Chaak",
      icon: "🏺",
      date: "Monday, 8th March 2027",
      time: "4:00 pm onwards",
      venue: "D54, Vinayak Residency",
      venue2: "Manglam City, Kalwar Road, Jaipur",
      program: ["Chaak pujan", "Traditional rituals", "Evening high tea"],
      mapUrl: "https://maps.app.goo.gl/VbRo7qq8sKQBcqKMA?g_st=ic",
    },
    {
      key: "bhaat",
      name: "Bhaat",
      icon: "🎁",
      date: "Tuesday, 9th March 2027",
      time: "2:00 pm onwards",
      venue: "Sultan House Garden",
      venue2: "Jaipur, Rajasthan",
      program: ["Bhaat / Mayra ceremony", "Family welcome", "Lunch & celebrations"],
      mapUrl: "https://maps.app.goo.gl/TyPQDFpPJHWYFHEt7?g_st=ic",
    },
    {
      key: "phere",
      name: "Wedding & Pheras",
      icon: "🔥",
      date: "Tuesday, 9th March 2027",
      time: "Baarat 7:00 pm · Dinner 8:00 pm · Pheras 10:00 pm",
      venue: "Sultan House Garden",
      venue2: "Jaipur, Rajasthan",
      program: ["Baarat Arrival (7 PM)", "Jaimala", "Dinner (8 PM)", "Pheras (10 PM)"],
      mapUrl: "https://maps.app.goo.gl/TyPQDFpPJHWYFHEt7?g_st=ic",
      pin: true,
    },
  ],
  rsvpPhone: "919887044200", // WhatsApp number with country code, no + or spaces
  rsvpBy: "7 March, 2027",
  dress: "",
  music: "/din-shagna-da.mp3", // Put din-shagna-da.mp3 in /public folder (falls back to built-in music if missing)
  storyTag: "Do dil, do parivar, ek naya safar",
  story:
    "With the blessings of our elders and the joy of our families, we invite you to celebrate the wedding of Tanu Rao and Jayant Yadav in the true Rajasthani way, with music, colour, mehmaan-nawazi and lots of love. Padharo sa!",
  gallery: [
    { src: "/rajasthan/1.jpeg", caption: "Where it all began" },
    { src: "/rajasthan/2.jpeg", caption: "Our favourite memories" },
    { src: "/rajasthan/3.jpeg", caption: "The proposal" },
    { src: "/rajasthan/4.jpeg", caption: "And now, forever" },
    { src: "/rajasthan/5.jpeg", caption: "Moments of joy" },
    { src: "/rajasthan/6.jpeg", caption: "Together always" },
    { src: "/rajasthan/7.jpeg", caption: "Countdown to forever" },
  ],
};
const F = Object.fromEntries(E.funcs.map((f) => [f.key, f]));

/* ---------- tiny helpers for the hand-drawn film scenes (they return SVG strings) ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rngFor = (seed) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
};
const f1 = (n) => Number(n).toFixed(1);
let CLIP_N = 0;

const MARI = ["#f7a81b", "#ffb92e", "#f08a1c", "#ffc94a", "#e8761c"];
function marigold(cx, cy, r, rand) {
  const c = MARI[Math.floor(rand() * MARI.length)];
  let s = `<g transform="translate(${f1(cx)} ${f1(cy)})"><circle r="${f1(r)}" fill="${c}" stroke="#b9560f" stroke-opacity=".45" stroke-width="1"/>`;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    s += `<circle cx="${f1(Math.cos(a) * r * 0.55)}" cy="${f1(Math.sin(a) * r * 0.55)}" r="${f1(r * 0.34)}" fill="#fff" opacity=".14"/>`;
  }
  return s + `<circle r="${f1(r * 0.42)}" fill="#e8761c" opacity=".55"/><circle r="${f1(r * 0.2)}" fill="#b9560f" opacity=".7"/></g>`;
}
function mLeaf(x, y, ang, L) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${Math.floor(ang)})"><path d="M0 0C${f1(L * 0.3)} ${f1(-L * 0.3)} ${f1(L * 0.8)} ${f1(-L * 0.22)} ${f1(L)} 0C${f1(L * 0.8)} ${f1(L * 0.22)} ${f1(L * 0.3)} ${f1(L * 0.3)} 0 0Z" fill="#4f8a4c" stroke="#2f5f33" stroke-opacity=".5"/></g>`;
}
function mGarland(fn, n, rMin, rMax, seed, leaves = true) {
  const rand = rngFor(seed);
  let lv = "", fl = "";
  for (let i = 0; i < n; i++) {
    const [x, y] = fn(i / (n - 1));
    const jx = (rand() - 0.5) * 4, jy = (rand() - 0.5) * 4;
    if (leaves && i % 2 === 0) lv += mLeaf(x + jx, y + jy, rand() * 360, 14 + rand() * 8);
    fl += marigold(x + jx, y + jy, rMin + rand() * (rMax - rMin), rand);
  }
  return lv + fl;
}
function lights(fn, n, cols = ["#fff1c2"], cls = "tw") {
  let s = "";
  for (let i = 0; i < n; i++) {
    const [x, y] = fn(i / (n - 1)), c = cols[i % cols.length];
    s += `<g class="${cls}" style="animation-delay:${((i * 0.37) % 2.4).toFixed(2)}s"><circle cx="${f1(x)}" cy="${f1(y)}" r="8" fill="${c}" opacity=".3"/><circle cx="${f1(x)}" cy="${f1(y)}" r="2.8" fill="${c}"/></g>`;
  }
  return s;
}
const GL = `<radialGradient id="gl"><stop offset="0" stop-color="#ffe7a3" stop-opacity=".95"/><stop offset="1" stop-color="#ffe7a3" stop-opacity="0"/></radialGradient>`;

function cuspArch(x, y, w, h, n = 7, ry) {
  const cx = x + w / 2, rx = w / 2, ryy = ry ?? h * 0.62, cy = y + ryy;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = Math.PI - (i / n) * Math.PI;
    pts.push([cx + rx * Math.cos(a), cy - ryy * Math.sin(a)]);
  }
  const r = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]) * 0.62;
  let d = `M${f1(x)} ${f1(y + h)}V${f1(cy)}`;
  for (let i = 1; i <= n; i++) d += `A${f1(r)} ${f1(r)} 0 0 1 ${f1(pts[i][0])} ${f1(pts[i][1])}`;
  return d + `V${f1(y + h)}Z`;
}
function dome(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0V-26H30V0Z" fill="#c98a2e" stroke="#7a4a12" stroke-width="2"/><path d="M-22 -26V-6M-8 -26V-6M8 -26V-6M22 -26V-6" stroke="#7a4a12" stroke-width="3"/><path d="M-34 -26Q0 -92 34 -26Z" fill="#e3b04f" stroke="#7a4a12" stroke-width="2"/><path d="M0 -78V-96" stroke="#7a4a12" stroke-width="3"/><circle cx="0" cy="-98" r="5" fill="#f4d37a" stroke="#7a4a12"/></g>`;
}
function diya(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-16" r="30" fill="url(#gl)" opacity=".85"/><path d="M-17 0Q0 15 17 0L13 -9H-13Z" fill="#c9852a" stroke="#7a4a12" stroke-width="1.5"/><path d="M-14 -9H14" stroke="#efc06a" stroke-width="2"/><ellipse class="fl" cx="0" cy="-19" rx="5" ry="10" fill="#ffb92e"/><ellipse class="fl" cx="0" cy="-17" rx="2.4" ry="6" fill="#fff6c9"/></g>`;
}
function elephant(x, y, s, flip, tone = "#a1abb6") {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
 <ellipse cx="0" cy="2" rx="80" ry="8" fill="#000" opacity=".25"/>
 <path d="M-46 -4V-38H-24V-4ZM-16 -4V-38H6V-4ZM22 -4V-40H44V-4Z" fill="#8c96a2" stroke="#6f7984"/><path d="M-4 -4V-38" stroke="#6f7984"/>
 <ellipse cx="0" cy="-70" rx="62" ry="42" fill="${tone}" stroke="#7b8590" stroke-width="2"/>
 <path d="M-64 -66Q-80 -50 -70 -28" stroke="${tone}" stroke-width="7" fill="none" stroke-linecap="round"/>
 <path d="M-52 -104Q0 -128 50 -104L56 -44Q34 -26 22 -44L-8 -34L-34 -44Q-50 -30 -60 -44Z" fill="#c2303a" stroke="#e6b45a" stroke-width="3" stroke-linejoin="round"/>
 <path d="M-58 -52Q-34 -40 -8 -50Q22 -40 54 -52" fill="none" stroke="#e6b45a" stroke-width="3"/>
 ${[-36, -12, 12, 36].map((cx) => `<circle cx="${cx}" cy="-84" r="5" fill="#f2cf72"/><circle cx="${cx}" cy="-84" r="2" fill="#c2303a"/>`).join("")}
 <rect x="-26" y="-124" width="52" height="22" rx="4" fill="#e3b04f" stroke="#7a4a12" stroke-width="2"/><path d="M-30 -124Q0 -150 30 -124Z" fill="#c2303a" stroke="#e6b45a" stroke-width="2"/><circle cx="0" cy="-150" r="3.5" fill="#f4d37a"/>
 <circle cx="68" cy="-82" r="30" fill="${tone}" stroke="#7b8590" stroke-width="2"/>
 <ellipse cx="50" cy="-80" rx="16" ry="26" fill="#8f99a5" stroke="#6f7984"/><ellipse cx="50" cy="-78" rx="9" ry="18" fill="#e9a3a8" opacity=".7"/>
 <path d="M54 -110Q70 -122 90 -108L86 -92Q70 -100 56 -94Z" fill="#c2303a" stroke="#e6b45a" stroke-width="2"/><circle cx="72" cy="-106" r="4" fill="#f2cf72"/>
 <circle cx="78" cy="-86" r="3.2" fill="#1c1c1c"/><circle cx="79" cy="-87" r="1" fill="#fff"/>
 <path d="M88 -70Q108 -50 100 -22Q96 -10 106 -8" stroke="${tone}" stroke-width="17" fill="none" stroke-linecap="round"/><path d="M88 -70Q106 -50 98 -24" stroke="#c0c8d0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>
 <path d="M86 -66Q112 -58 118 -36" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
</g>`;
}
function peacock(x, y, s, flip) {
  let fan = "";
  for (let i = 0; i < 11; i++) {
    const a = -90 + (i - 5) * 15, L = 64;
    fan += `<g transform="rotate(${a})"><path d="M0 0L0 ${-L}" stroke="#2c6b4a" stroke-width="2"/><ellipse cx="0" cy="${-L}" rx="9" ry="13" fill="#1f8a8a" stroke="#0e5a5a" stroke-width="1.5"/><ellipse cx="0" cy="${-L}" rx="5" ry="8" fill="#3fb48a"/><ellipse cx="0" cy="${-L - 2}" rx="2.6" ry="4.4" fill="#2f4fa8"/></g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g transform="translate(-14 -42)">${fan}</g>
 <path d="M-26 0Q-30 -40 -8 -50Q16 -58 22 -80" stroke="#1f6fa0" stroke-width="16" fill="none" stroke-linecap="round"/>
 <ellipse cx="-12" cy="-26" rx="22" ry="26" fill="#1f6fa0" stroke="#124a70" stroke-width="2"/><ellipse cx="-12" cy="-22" rx="12" ry="16" fill="#3fb48a" opacity=".6"/>
 <circle cx="24" cy="-86" r="10" fill="#1f6fa0" stroke="#124a70" stroke-width="2"/><path d="M30 -88L40 -84L30 -82Z" fill="#f2b84a"/><circle cx="26" cy="-88" r="1.8" fill="#111"/>
 <path d="M18 -96L16 -110M22 -97L24 -112M26 -96L32 -108" stroke="#2f4fa8" stroke-width="2"/><circle cx="16" cy="-111" r="2.6" fill="#3fb48a"/><circle cx="24" cy="-113" r="2.6" fill="#3fb48a"/><circle cx="32" cy="-109" r="2.6" fill="#3fb48a"/>
 <path d="M-14 -4V8M-6 -4V8" stroke="#a86a2a" stroke-width="3"/></g>`;
}
function dhol(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="52" fill="#a8541f" stroke="#5c2a0c" stroke-width="3"/><ellipse cx="0" cy="0" rx="40" ry="46" fill="#d98a3f"/><path d="M-30 -42L-14 42M-14 -48L2 48M2 -50L18 46M18 -48L32 40" stroke="#7a2f1a" stroke-width="3"/><circle cx="0" cy="0" r="34" fill="#f6e7c0" stroke="#5c2a0c" stroke-width="3"/><circle cx="0" cy="0" r="14" fill="#c2303a" opacity=".7"/></g>`;
}
function ganesha(dhoti = "#f19aa6") {
  const skin = "#f4c1a4", skin2 = "#f0ab8e";
  return `<g>
 <circle cx="0" cy="-250" r="190" fill="url(#gl)" opacity=".75"/>
 <path d="M-112 0Q-124 -52 -70 -74H70Q124 -52 112 0Z" fill="${dhoti}" stroke="#d98a3f" stroke-width="3"/>
 <path d="M-108 -14Q0 18 108 -14" stroke="#e6b25a" stroke-width="6" fill="none"/>
 <ellipse cx="-58" cy="-12" rx="34" ry="17" fill="${skin}" stroke="${skin2}" stroke-width="2"/><ellipse cx="58" cy="-12" rx="34" ry="17" fill="${skin}" stroke="${skin2}" stroke-width="2"/>
 <ellipse cx="0" cy="-152" rx="84" ry="96" fill="${skin}"/><ellipse cx="0" cy="-136" rx="58" ry="62" fill="#f8d2ba"/><circle cx="0" cy="-122" r="4" fill="${skin2}"/>
 <path d="M-98 -84Q0 -44 98 -84L102 -62Q0 -18 -102 -62Z" fill="${dhoti}" stroke="#e6b25a" stroke-width="3"/>
 <path d="M-66 -236C-84 -150 -42 -96 0 -92C42 -96 84 -150 66 -236" fill="none" stroke="#ffb92e" stroke-width="13" stroke-dasharray="0 11" stroke-linecap="round"/>
 <path d="M-66 -236C-84 -150 -42 -96 0 -92C42 -96 84 -150 66 -236" fill="none" stroke="#fffaf0" stroke-width="8" stroke-dasharray="0 44" stroke-linecap="round" stroke-dashoffset="-6"/>
 <path d="M-52 -240Q0 -196 52 -240" fill="none" stroke="#e6b25a" stroke-width="4"/><circle cx="0" cy="-206" r="8" fill="#e6b25a" stroke="#a86f1f"/><circle cx="0" cy="-206" r="3.5" fill="#d9445a"/>
 <path d="M-66 -226L-114 -290" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="-116" cy="-296" r="17" fill="${skin}"/><path d="M-130 -312L-102 -312L-110 -270Z" fill="#e6b25a" stroke="#a86f1f"/>
 <path d="M-74 -198L-122 -164" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="-128" cy="-156" r="19" fill="${skin}"/><circle cx="-128" cy="-156" r="7" fill="#e86a73" opacity=".7"/>
 <path d="M66 -226L114 -290" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="116" cy="-296" r="17" fill="${skin}"/><circle cx="124" cy="-312" r="11" fill="#f3c04e" stroke="#a86f1f" stroke-width="2"/>
 <path d="M74 -198L120 -150" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="124" cy="-142" r="17" fill="${skin}"/><circle cx="130" cy="-156" r="15" fill="#f2a43e" stroke="#c4731a" stroke-width="2"/>
 <g transform="translate(0 -300)">
  <ellipse cx="-68" cy="14" rx="40" ry="50" fill="${skin2}"/><ellipse cx="-66" cy="16" rx="25" ry="35" fill="#f19aa0"/><ellipse cx="68" cy="14" rx="40" ry="50" fill="${skin2}"/><ellipse cx="66" cy="16" rx="25" ry="35" fill="#f19aa0"/>
  <circle cx="0" cy="16" r="60" fill="${skin}"/><circle cx="-36" cy="34" r="12" fill="#f28d92" opacity=".5"/><circle cx="36" cy="34" r="12" fill="#f28d92" opacity=".5"/>
  <path d="M-66 -4C-72 -78 72 -78 66 -4C44 -22 -44 -22 -66 -4Z" fill="#f4b840" stroke="#c98a1f" stroke-width="2"/><ellipse cx="0" cy="-44" rx="48" ry="30" fill="#f7c85a" stroke="#c98a1f" stroke-width="2"/>
  <path d="M-44 -36Q0 -62 44 -36M-36 -52Q0 -76 36 -52M-58 -16Q0 -34 58 -16" stroke="#c98a1f" stroke-width="3" fill="none"/>
  <path d="M-66 -6Q0 12 66 -6" stroke="#c2303a" stroke-width="7" fill="none"/>
  <path d="M0 -26C-9 -16 -9 -8 0 0C9 -8 9 -16 0 -26Z" fill="#e6b25a" stroke="#a86f1f"/><circle cx="0" cy="-12" r="3.6" fill="#d9445a"/>
  <path d="M10 -64Q32 -96 54 -76Q36 -80 24 -58Z" fill="#c2303a" stroke="#a86f1f"/>
  <ellipse cx="-21" cy="14" rx="8.5" ry="11" fill="#2a1a14"/><ellipse cx="21" cy="14" rx="8.5" ry="11" fill="#2a1a14"/><circle cx="-18" cy="9" r="3.2" fill="#fff"/><circle cx="24" cy="9" r="3.2" fill="#fff"/>
  <path d="M-32 -3Q-21 -10 -10 -3M10 -3Q21 -10 32 -3" stroke="#a46b4f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M0 26C-4 62 6 98 34 100C56 101 60 78 44 72" stroke="${skin2}" stroke-width="28" fill="none" stroke-linecap="round"/><path d="M0 28C-3 62 7 94 33 96C50 97 54 80 44 74" stroke="#f8cdb4" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M-20 52Q-38 72 -24 86Q-22 70 -12 58Z" fill="#fff" stroke="#e8d6c4"/>
 </g></g>`;
}
function pedestal(cx, cy, sx = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${sx})"><ellipse cx="0" cy="22" rx="168" ry="34" fill="#9a6a1f"/><ellipse cx="0" cy="14" rx="168" ry="34" fill="#e6b95f" stroke="#b9822a" stroke-width="3"/><ellipse cx="0" cy="6" rx="140" ry="27" fill="#f3d58a" stroke="#c18f34" stroke-width="2"/><ellipse cx="0" cy="0" rx="118" ry="22" fill="#f8e3a8" stroke="#d3a444" stroke-width="2"/></g>`;
}

/* ---------- Ganesh ji real photo inside a glowing golden arch (falls back to illustrated Ganesha if image missing) ---------- */
function ganeshVisual(E, cx, cy, w, h, svgScale, svgY) {
  const x = cx - w / 2;
  const y = cy - h;
  const id = "gp" + CLIP_N++;
  const d = cuspArch(x, y, w, h, 7, h * 0.34);
  return `
    <g transform="translate(${cx} ${svgY}) scale(${svgScale})">${ganesha("#f08797")}</g>
    ${
      E.ganeshPhoto
        ? `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
           <g>
             <circle cx="${cx}" cy="${f1(y + h * 0.48)}" r="${f1(w * 0.72)}" fill="url(#gl)" opacity=".85"/>
             <path d="${d}" fill="#fff3cf"/>
             <image href="${esc(E.ganeshPhoto)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})" onerror="this.parentNode.style.display='none'"/>
             <path d="${d}" fill="none" stroke="#f3d37a" stroke-width="5" stroke-linejoin="round"/>
             <path d="${d}" fill="none" stroke="#7a4a12" stroke-width="1.4" opacity=".65"/>
           </g>`
        : ""
    }
  `;
}

/* ---------- photo arch frame ---------- */
function photoFrame(x, y, w, h, src, initial, delay, pal) {
  const id = "pf" + CLIP_N++;
  const d = cuspArch(x, y, w, h, 7, h * 0.34);
  return `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
<g class="pop" style="animation-delay:${delay}s">
 <path d="${d}" transform="translate(0 5)" fill="#000" opacity=".28"/>
 <path d="${d}" fill="${pal.a}"/>
 <text x="${f1(x + w / 2)}" y="${f1(y + h * 0.66)}" text-anchor="middle" font-family="Great Vibes,cursive" font-size="${f1(h * 0.5)}" fill="${pal.b}" opacity=".75">${esc(initial)}</text>
 ${src ? `<image href="${esc(src)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})" onerror="this.style.display='none'"/>` : ""}
 <path d="${d}" fill="none" stroke="#e0b455" stroke-width="5" stroke-linejoin="round"/>
 <path d="${d}" fill="none" stroke="#7a4a12" stroke-width="1.4" opacity=".5"/>
</g>`;
}
const T = (x, y, size, fill, txt, delay, font = "Playfair Display,Georgia,serif", extra = "") =>
  `<text x="${x}" y="${y}" text-anchor="middle" class="ti" style="animation-delay:${delay}s" font-family="${font}" font-size="${size}" fill="${fill}" ${extra}>${esc(txt)}</text>`;
const ornLine = (y, delay, col = "#c9973f") =>
  `<g class="ti" style="animation-delay:${delay}s"><path d="M110 ${y}H178M222 ${y}H290" stroke="${col}" stroke-width="1.4"/><path transform="translate(200 ${y}) scale(.5)" d="M0 12C-22 -4 -14 -22 0 -10C14 -22 22 -4 0 12Z" fill="#d4437a"/><circle cx="188" cy="${y}" r="2" fill="${col}"/><circle cx="212" cy="${y}" r="2" fill="${col}"/></g>`;

/* ---------- Scene 1: the golden haveli gate ---------- */
function gateScene(E, animated) {
  const archD = cuspArch(98, 196, 204, 384, 9, 110);
  const panels = (x0) => {
    let s = "";
    [[214, 70], [296, 70], [378, 70], [460, 100]].forEach(([y, h]) => {
      s += `<rect x="${x0 + 7}" y="${y}" width="86" height="${h}" fill="none" stroke="#8a5a19" stroke-width="2.2"/><rect x="${x0 + 13}" y="${y + 6}" width="74" height="${h - 12}" fill="#000" opacity=".06" stroke="#a8751f" stroke-width="1"/>`;
      for (let k = 0; k < 3; k++)
        s += `<path transform="translate(${x0 + 28 + k * 22} ${y + h / 2}) scale(.8)" d="M0 -16L9 0L0 16L-9 0Z" fill="none" stroke="#8a5a19" stroke-width="1.8"/>`;
    });
    return s;
  };
  const door = (x0, cls) =>
    `<g class="${cls}"><rect x="${x0}" y="196" width="102" height="390" fill="url(#gdoor)" stroke="#6a3f0e" stroke-width="2"/>${panels(x0)}<circle cx="${cls === "dL" ? x0 + 92 : x0 + 10}" cy="420" r="6" fill="#f3d37a" stroke="#6a3f0e" stroke-width="2"/></g>`;
  const arcs = Array.from({ length: 8 }, (_, i) => `<path d="${cuspArch(34 + i * 44, 118, 32, 62, 3, 16)}" fill="#7a4a12" opacity=".75" stroke="#f3d37a" stroke-width="1.5"/>`).join("");
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>${GL}
 <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2a645"/><stop offset=".5" stop-color="#f3c76d"/><stop offset="1" stop-color="#c98a2e"/></linearGradient>
 <linearGradient id="gdoor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1c566"/><stop offset=".5" stop-color="#d9a047"/><stop offset="1" stop-color="#b87a26"/></linearGradient>
 <radialGradient id="gin" cx=".5" cy=".62" r=".7"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#ffd978"/><stop offset="1" stop-color="#d98a2a"/></radialGradient>
 <linearGradient id="gcar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a5221a"/><stop offset="1" stop-color="#d93a24"/></linearGradient>
 <pattern id="carv" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M13 1L25 13L13 25L1 13Z" fill="none" stroke="#8a5a19" stroke-opacity=".38" stroke-width="1.2"/><circle cx="13" cy="13" r="2.2" fill="#8a5a19" opacity=".38"/></pattern>
 <clipPath id="gclip"><path d="${archD}"/></clipPath>
</defs>
<rect width="400" height="720" fill="url(#gw)"/><rect width="400" height="720" fill="url(#carv)"/>
${dome(60, 106, 0.8)}${dome(340, 106, 0.8)}${dome(200, 112, 1.15)}
<rect x="0" y="116" width="400" height="70" fill="#a8691b" opacity=".55"/>${arcs}
<rect x="0" y="182" width="400" height="10" fill="#7a4a12"/>
<path d="${archD}" transform="translate(200 388) scale(1.13 1.06) translate(-200 -388)" fill="#e9b758" stroke="#7a4a12" stroke-width="3"/>
<path d="${archD}" transform="translate(200 388) scale(1.06 1.03) translate(-200 -388)" fill="#b87a26" stroke="#f3d37a" stroke-width="2"/>
<g clip-path="url(#gclip)">
 <rect x="90" y="190" width="220" height="400" fill="url(#gin)"/>
 <g class="${animated ? "lt" : ""}" style="${animated ? "" : "opacity:.35"}">
  <g transform="translate(200 700)" opacity=".5">${Array.from({ length: 14 }, (_, i) => `<path transform="rotate(${-80 + i * 12})" d="M-8 0L0 -420L8 0Z" fill="#fffbe6"/>`).join("")}</g>
  ${pedestal(200, 536, 0.5)}
  ${ganeshVisual(E, 200, 534, 130, 180, 0.33, 548)}
  ${diya(128, 566, 0.7)}${diya(272, 566, 0.7)}${diya(160, 574, 0.55)}${diya(240, 574, 0.55)}
 </g>
 ${door(98, "dL")}${door(200, "dR")}
</g>
<path d="${archD}" fill="none" stroke="#5a3408" stroke-width="3"/>
${[48, 352].map((x) => `<rect x="${x - 16}" y="196" width="32" height="400" fill="#c98a2e" stroke="#7a4a12"/>`).join("")}
${mGarland((t) => [34 + 8 * Math.sin(t * 14), 206 + 380 * t], 26, 9, 12, 11)}
${mGarland((t) => [62 - 6 * Math.sin(t * 14), 206 + 380 * t], 26, 9, 12, 12)}
${mGarland((t) => [338 + 6 * Math.sin(t * 14), 206 + 380 * t], 26, 9, 12, 13)}
${mGarland((t) => [366 - 8 * Math.sin(t * 14), 206 + 380 * t], 26, 9, 12, 14)}
${mGarland((t) => [20 + 180 * t, 200 + 46 * Math.sin(Math.PI * t)], 12, 8, 11, 15)}${mGarland((t) => [200 + 180 * t, 200 + 46 * Math.sin(Math.PI * t)], 12, 8, 11, 16)}
${mGarland((t) => [20 + 180 * t, 224 + 38 * Math.sin(Math.PI * t)], 12, 8, 11, 17)}${mGarland((t) => [200 + 180 * t, 224 + 38 * Math.sin(Math.PI * t)], 12, 8, 11, 18)}
<path d="M150 582H250L430 720H-30Z" fill="url(#gcar)"/><path d="M150 582L-30 720M250 582L430 720" stroke="#f3d37a" stroke-width="4"/>
${[[36, 626], [364, 626]].map(([x, y], i) => `<rect x="${x - 22}" y="${y}" width="44" height="40" fill="#c98a2e" stroke="#7a4a12" stroke-width="2"/><path d="M${x - 30} ${y}H${x + 30}" stroke="#7a4a12" stroke-width="4"/>${(() => { const r = rngFor(40 + i); let s = ""; for (let k = 0; k < 22; k++) s += `<circle cx="${f1(x + (r() - 0.5) * 56)}" cy="${f1(y - 6 - r() * 32)}" r="${f1(7 + r() * 4)}" fill="${["#c2202a", "#d93a2a", "#a5181f"][k % 3]}" stroke="#7a1218" stroke-opacity=".4"/>`; return s; })()}`).join("")}
${elephant(80, 706, 0.95, false)}${elephant(320, 706, 0.95, true)}
${[[40, 700], [360, 700]].map(([x, y]) => diya(x, y, 0.6)).join("")}
</svg>`;
}

/* ---------- Scene 2: Ganesh ji in a glowing niche surrounded by diyas ---------- */
function ganeshScene(E, t0) {
  const archOut = cuspArch(36, 52, 328, 640, 11, 150);
  const archIn = cuspArch(58, 74, 284, 618, 11, 138);
  const rays = Array.from({ length: 22 }, (_, i) => `<path transform="rotate(${i * (360 / 22)})" d="M-14 0L0 -330L14 0Z" fill="#fff6cf" opacity=".22"/>`).join("");
  let dias = "";
  [[70, 662, 1], [330, 662, 1], [110, 690, 0.9], [290, 690, 0.9], [40, 700, 0.8], [360, 700, 0.8], [150, 708, 0.7], [250, 708, 0.7]].forEach(([x, y, s]) => {
    dias += diya(x, y, s);
  });
  let ran = "";
  for (let r = 0; r < 3; r++)
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2 + r * 0.2;
      ran += `<ellipse cx="${f1(200 + (60 + r * 38) * Math.cos(a))}" cy="${f1(694 + (14 + r * 7) * Math.sin(a))}" rx="${6 + r * 2}" ry="${3 + r}" fill="${["#ffb92e", "#e8456b", "#fffaf0"][r]}" opacity=".85"/>`;
    }
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>${GL}<radialGradient id="nb2" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#fff3c4"/><stop offset=".4" stop-color="#f4b94a"/><stop offset="1" stop-color="#8a4a12"/></radialGradient>
<linearGradient id="nw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a3d12"/><stop offset="1" stop-color="#3d1b08"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#nw)"/>
<path d="${archOut}" fill="#c98a2e" stroke="#f3d37a" stroke-width="3"/><path d="${archIn}" fill="url(#nb2)" stroke="#7a4a12" stroke-width="3"/>
<g transform="translate(200 470)"><g class="spin">${rays}</g></g>
<path d="M200 74V150" stroke="#f3d37a" stroke-width="3"/><g transform="translate(200 188)"><g class="swing"><path d="M-22 22Q-26 -22 0 -30Q26 -22 22 22Z" fill="#e3b04f" stroke="#7a4a12" stroke-width="2.5"/><path d="M-26 22H26" stroke="#7a4a12" stroke-width="4"/><circle cx="0" cy="30" r="6" fill="#f4d37a" stroke="#7a4a12" stroke-width="2"/><path d="M-14 4Q0 12 14 4" stroke="#7a4a12" stroke-width="2" fill="none"/></g></g>
${mGarland((t) => { const a = Math.PI - t * Math.PI; return [200 + 148 * Math.cos(a), 218 - 120 * Math.sin(a)]; }, 22, 8, 11, 61)}
${mGarland((t) => [48 + 6 * Math.sin(t * 10), 218 + 460 * t], 26, 8, 11, 62)}${mGarland((t) => [352 - 6 * Math.sin(t * 10), 218 + 460 * t], 26, 8, 11, 63)}
${lights((t) => [60 + 280 * t, 84 + 38 * Math.sin(Math.PI * t)], 18, ["#fff1c2", "#ffd9a0"])}
${pedestal(200, 668, 0.9)}
${ganeshVisual(E, 200, 646, 236, 350, 0.64, 650)}
${ran}${dias}
${T(200, 56, 24, "#fff4d2", E.blessing, t0 + 0.6, "Tiro Devanagari Hindi,serif", 'stroke="#7a4a12" stroke-width=".6" paint-order="stroke"')}
</svg>`;
}

/* ---------- shared bottom "jharokha plaque" with the function details ---------- */
function plaque(E, f, t0, pal) {
  const d = cuspArch(34, 338, 332, 360, 13, 42);
  const prog = f.program || [];
  const l1 = prog.slice(0, 2).join("   •   "), l2 = prog.slice(2, 4).join("   •   ");
  const titleSize = f.name.length > 10 ? 44 : 58;
  const timeSize = f.time.length > 26 ? 11.5 : 14;
  return `<g class="pop" style="animation-delay:${t0 + 0.2}s"><path d="${d}" transform="translate(0 6)" fill="#000" opacity=".3"/><path d="${d}" fill="${pal.paper}" stroke="${pal.edge}" stroke-width="4" stroke-linejoin="round"/>
<path d="${d}" transform="translate(200 518) scale(.945 .94) translate(-200 -518)" fill="none" stroke="${pal.edge}" stroke-width="1.2" stroke-dasharray="3 4" opacity=".9"/></g>
${T(200, 414, titleSize, pal.title, f.name, t0 + 0.6, "Great Vibes,cursive")}
${T(200, 448, 17, pal.ink, f.date, t0 + 1.2, undefined, 'font-weight="600"')}
${T(200, 470, timeSize, pal.ink, f.time, t0 + 1.5)}
${ornLine(488, t0 + 1.8, pal.edge)}
${T(200, 512, 11, pal.soft, "AT", t0 + 2.2, "Jost,sans-serif", 'letter-spacing="3"')}
${T(200, 532, 17, pal.title, f.venue, t0 + 2.4, undefined, 'font-weight="600"')}
${T(200, 551, 13, pal.ink, f.venue2, t0 + 2.6)}
${l1 ? T(200, 584, 12.5, pal.soft, l1, t0 + 3.1, undefined, 'font-style="italic"') : ""}
${l2 ? T(200, 602, 12.5, pal.soft, l2, t0 + 3.3, undefined, 'font-style="italic"') : ""}
${T(200, 650, 26, pal.title, `${E.bride} & ${E.groom}`, t0 + 3.8, "Great Vibes,cursive")}
${f.pin ? `<g transform="translate(200 672)"><g class="ti" style="animation-delay:${t0 + 4.2}s"><path d="M0 8C-6 0 -7 -6 -7 -9A7 7 0 0 1 7 -9C7 -6 6 0 0 8Z" fill="#d4437a" stroke="#fff" stroke-width="1"/><circle cx="0" cy="-9" r="2.6" fill="#fff"/></g></g>` : ""}`;
}
function frames(E, t0, pal) {
  return `${photoFrame(60, 112, 124, 172, E.bridePhoto, E.bride[0], t0 + 0.3, pal)}${photoFrame(216, 112, 124, 172, E.groomPhoto, E.groom[0], t0 + 0.6, pal)}
<g class="ti" style="animation-delay:${t0 + 1}s"><circle cx="200" cy="212" r="17" fill="${pal.paper}" stroke="${pal.edge}" stroke-width="2"/><path transform="translate(200 214) scale(.5)" d="M0 12C-22 -4 -14 -22 0 -10C14 -22 22 -4 0 12Z" fill="#d4437a"/></g>
${T(122, 306, 17, pal.names, E.bride, t0 + 1.2, "Great Vibes,cursive", `stroke="#000b" stroke-width="1.6" paint-order="stroke"`)}${T(278, 306, 17, pal.names, E.groom, t0 + 1.4, "Great Vibes,cursive", `stroke="#000b" stroke-width="1.6" paint-order="stroke"`)}`;
}

/* ---------- Scene 3: wedding invitation (BLACK crisp text on golden arch background) ---------- */
function weddingScene(E, t0) {
  const rand = rngFor(9);
  const arch = cuspArch(70, 112, 260, 520, 11, 150);
  let wins = "";
  [[0, 130], [270, 130]].forEach(([x0, w]) => {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 4; c++) {
        const x = x0 + 12 + c * (w / 4), y = 60 + r * 52;
        wins += `<path d="${cuspArch(x, y, 22, 34, 3, 10)}" fill="${rand() > 0.15 ? "#ffd272" : "#8a5a2a"}" opacity="${(0.6 + rand() * 0.4).toFixed(2)}"/>`;
      }
  });
  const pal = { paper: "#fff7e8", edge: "#d6a84f", title: "#9a1f3d", ink: "#5a2a1c", soft: "#7a5a3a", names: "#ffe9b0", a: "#f8d9c4", b: "#c98a2e" };
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>${GL}<linearGradient id="wsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101a4a"/><stop offset=".6" stop-color="#3a3f86"/><stop offset="1" stop-color="#e9a95a"/></linearGradient>
<radialGradient id="win" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#fff3cf"/><stop offset=".55" stop-color="#ffbf55"/><stop offset="1" stop-color="#b8661c"/></radialGradient>
<linearGradient id="wcar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e1a1a"/><stop offset="1" stop-color="#d63a28"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#wsk)"/>
${Array.from({ length: 30 }, (_, i) => `<circle class="tw" style="animation-delay:${((i * 0.4) % 3).toFixed(1)}s" cx="${(i * 71) % 400}" cy="${(i * 37) % 200}" r="${1 + (i % 3) * 0.6}" fill="#fff"/>`).join("")}
<rect x="0" y="40" width="140" height="600" fill="#d89a3c"/><rect x="260" y="40" width="140" height="600" fill="#d89a3c"/>
<rect x="0" y="40" width="140" height="600" fill="#000" opacity=".18"/><rect x="260" y="40" width="140" height="600" fill="#000" opacity=".18"/>
${wins}${dome(40, 52, 0.7)}${dome(360, 52, 0.7)}
<path d="${arch}" fill="#f2b54f" stroke="#7a4a12" stroke-width="4"/><path d="${arch}" transform="translate(200 372) scale(.92 .94) translate(-200 -372)" fill="url(#win)" stroke="#fff3cf" stroke-width="2"/>
${mGarland((t) => { const a = Math.PI - t * Math.PI; return [200 + 134 * Math.cos(a), 262 - 132 * Math.sin(a)]; }, 30, 8, 12, 71)}
${mGarland((t) => [70 + 4 * Math.sin(t * 10), 262 + 366 * t], 22, 8, 11, 72)}${mGarland((t) => [330 - 4 * Math.sin(t * 10), 262 + 366 * t], 22, 8, 11, 73)}
${mGarland((t) => [64 + 140 * t, 104 + 12 * Math.sin(Math.PI * t) + 10], 10, 7, 10, 74)}${mGarland((t) => [196 + 140 * t, 104 + 12 * Math.sin(Math.PI * t) + 10], 10, 7, 10, 75)}
${lights((t) => [20 + 360 * t, 70 + 30 * Math.sin(Math.PI * t * 3)], 26, ["#fff1c2", "#ffd48a"])}
<path d="M150 640H250L440 720H-40Z" fill="url(#wcar)"/><path d="M150 640L-40 720M250 640L440 720" stroke="#f3d37a" stroke-width="4"/>
${elephant(66, 716, 0.82, false, "#e7e0d4")}${elephant(334, 716, 0.82, true, "#e7e0d4")}
${[[110, 676], [290, 676], [100, 700], [300, 700]].map(([x, y]) => diya(x, y, 0.6)).join("")}
${photoFrame(112, 258, 84, 118, E.bridePhoto, E.bride[0], t0 + 1.0, pal)}${photoFrame(204, 258, 84, 118, E.groomPhoto, E.groom[0], t0 + 1.4, pal)}
${T(200, 218, 12, "#111111", "WEDDING INVITATION", t0 + 0.4, "Jost,sans-serif", 'letter-spacing="4.5" font-weight="600" stroke="#fff7e0" stroke-width="1.8" paint-order="stroke"')}
${T(200, 240, 15, "#111111", E.blessing, t0 + 0.5, "Tiro Devanagari Hindi,serif", 'font-weight="600" stroke="#fff7e0" stroke-width="1.6" paint-order="stroke"')}
${T(200, 412, 34, "#111111", E.bride, t0 + 2.0, "Great Vibes,cursive", 'stroke="#fff7e0" stroke-width="2.2" paint-order="stroke"')}
${T(200, 440, 20, "#111111", "weds", t0 + 2.4, "Playfair Display,serif", 'font-style="italic" font-weight="600" stroke="#fff7e0" stroke-width="1.8" paint-order="stroke"')}
${T(200, 478, 34, "#111111", E.groom, t0 + 2.8, "Great Vibes,cursive", 'stroke="#fff7e0" stroke-width="2.2" paint-order="stroke"')}
${T(200, 514, 16, "#111111", E.weddingDate, t0 + 3.6, undefined, 'font-weight="700" letter-spacing="0.8" stroke="#fff7e0" stroke-width="2" paint-order="stroke"')}
${T(200, 535, 11.5, "#111111", E.weddingCity, t0 + 4.0, "Jost,sans-serif", 'font-weight="600" letter-spacing="2.2" stroke="#fff7e0" stroke-width="1.8" paint-order="stroke"')}
</svg>`;
}

/* ---------- the function scenes ---------- */
const PAL_HALDI = { paper: "#fffaf0", edge: "#d99a1a", title: "#b8610d", ink: "#5a3a12", soft: "#8a6a30", names: "#fffaf0", a: "#ffe08a", b: "#d99a1a" };
const PAL_MEHNDI = { paper: "#f8fbef", edge: "#7a9a4a", title: "#3f6a2a", ink: "#2f4a22", soft: "#5a7a40", names: "#fffdf0", a: "#d6e8b6", b: "#5f8a3a" };
const PAL_SANGEET = { paper: "#fbf3ff", edge: "#b98ce0", title: "#6a2fa0", ink: "#3a1f5a", soft: "#6a4a8a", names: "#fff3ff", a: "#d9c2f0", b: "#8a4fc0" };
const PAL_CHAAK = { paper: "#fff6ef", edge: "#c86428", title: "#8a3810", ink: "#4a2210", soft: "#7a4a30", names: "#fff6ef", a: "#f6c8a8", b: "#b8541c" };
const PAL_BHAAT = { paper: "#fff2f7", edge: "#d4437a", title: "#941c4c", ink: "#4a1a2e", soft: "#7a3a54", names: "#fff2f7", a: "#f7c6da", b: "#b83064" };
const PAL_PHERE = { paper: "#fff4e4", edge: "#d9a23a", title: "#a31830", ink: "#5a1f1a", soft: "#7a4a2a", names: "#fff3d6", a: "#f6d6b8", b: "#b8741c" };

function haldiArt() {
  const rand = rngFor(81);
  let wall = "";
  for (let r = 0; r < 10; r++) for (let c = 0; c < 15; c++) wall += marigold(10 + c * 27 + (r % 2) * 13, 40 + r * 29, 14, rand);
  let strands = "";
  [[26, 150], [90, 100], [310, 100], [374, 150]].forEach(([x, L], i) => {
    strands += mGarland((t) => [x + 3 * Math.sin(t * 9), 44 + L * t], 12, 8, 10, 82 + i);
  });
  const bowl = (x, y) =>
    `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="14" rx="34" ry="9" fill="#c98a2e" stroke="#7a4a12" stroke-width="2"/><path d="M-26 -4Q0 30 26 -4Z" fill="#e3b04f" stroke="#7a4a12" stroke-width="2"/><ellipse cx="0" cy="-4" rx="26" ry="7" fill="#f6c21a" stroke="#c98a2e" stroke-width="1.5"/>${[-12, 0, 12].map((dx) => `<circle cx="${dx}" cy="-9" r="6" fill="#ffb92e" stroke="#b9560f" stroke-opacity=".5"/>`).join("")}${mLeaf(-26, 6, 200, 16)}${mLeaf(26, 6, -20, 16)}</g>`;
  return `<defs><linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".55" stop-color="#f9c74f"/><stop offset="1" stop-color="#f2a20f"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#hb)"/>${wall}<rect width="400" height="720" fill="#fff" opacity=".07"/>${strands}
<path d="M0 0H400V34Q380 52 360 34Q340 52 320 34Q300 52 280 34Q260 52 240 34Q220 52 200 34Q180 52 160 34Q140 52 120 34Q100 52 80 34Q60 52 40 34Q20 52 0 34Z" fill="#d6401f" stroke="#7a1f0f" stroke-width="2"/>${Array.from({ length: 16 }, (_, i) => `<circle cx="${12 + i * 25}" cy="16" r="4" fill="#ffe9a0"/>`).join("")}
${bowl(38, 326)}${bowl(362, 326)}`;
}
function mehndiArt() {
  const rand = rngFor(92);
  let vines = "";
  for (let i = 0; i < 40; i++) vines += mLeaf(rand() * 400, rand() * 340, rand() * 360, 22 + rand() * 22);
  let paisley = "";
  for (let i = 0; i < 9; i++)
    paisley += `<g transform="translate(${28 + i * 43} 22) rotate(${i % 2 ? 15 : -15})"><path d="M0 0C14 -6 18 14 6 22C-8 28 -14 10 0 0Z" fill="#7a3f1a" opacity=".9"/><circle cx="3" cy="8" r="3.5" fill="#f3e0b0"/></g>`;
  return `<defs><linearGradient id="mb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7e8b2"/><stop offset=".6" stop-color="#9fbe72"/><stop offset="1" stop-color="#6f9a48"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#mb2)"/>${vines}
<path d="${cuspArch(26, 56, 348, 300, 11, 110)}" fill="#e8f2cc" fill-opacity=".72" stroke="#7a9a4a" stroke-width="4"/><path d="${cuspArch(38, 68, 324, 288, 11, 104)}" fill="none" stroke="#c9973f" stroke-width="2" stroke-dasharray="4 4"/>
${paisley}
${mGarland((t) => [30 + 5 * Math.sin(t * 9), 10 + 340 * t], 18, 8, 10, 93)}${mGarland((t) => [370 - 5 * Math.sin(t * 9), 10 + 340 * t], 18, 8, 10, 94)}
${peacock(46, 352, 0.62, false)}${peacock(354, 352, 0.62, true)}
${[[200, 330]].map(([x, y]) => `<g transform="translate(${x} ${y}) rotate(-20)"><path d="M0 0L-9 -30Q0 -44 9 -30Z" fill="#f4e6c4" stroke="#7a4a12" stroke-width="2"/><path d="M-7 -26L7 -26" stroke="#7a4a12"/><path d="M0 0L0 12" stroke="#7a3f1a" stroke-width="4" stroke-linecap="round"/></g>`).join("")}`;
}
function sangeetArt() {
  const rand = rngFor(77);
  let fount = "";
  [46, 354].forEach((x) => {
    for (let i = 0; i < 18; i++) {
      const a = (i - 9) * 4.2, L = 70 + rand() * 90;
      fount += `<path class="tw" style="animation-delay:${(rand() * 2).toFixed(2)}s" d="M${x} 340L${f1(x + Math.sin((a * Math.PI) / 180) * L * 1.1)} ${f1(340 - Math.cos((a * Math.PI) / 180) * L * 1.7)}" stroke="${["#fff6c9", "#ffd272", "#ffffff"][i % 3]}" stroke-width="${f1(1.4 + rand() * 1.8)}" stroke-linecap="round"/>`;
    }
  });
  const lant = (x, y, c) =>
    `<g transform="translate(${x} ${y})"><path d="M0 -${y}V0" stroke="#c9a8e8" stroke-width="1.4"/><circle cx="0" cy="12" r="24" fill="${c}" opacity=".35"/><path d="M-10 0H10L14 26H-14Z" fill="${c}" stroke="#fff" stroke-opacity=".6"/><circle cx="0" cy="30" r="3" fill="#fff"/></g>`;
  return `<defs><linearGradient id="sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#150d38"/><stop offset=".55" stop-color="#3b1f6b"/><stop offset="1" stop-color="#7a3fa0"/></linearGradient><radialGradient id="moon" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#e5dcf7"/><stop offset="1" stop-color="#b9a6e6"/></radialGradient></defs>
<rect width="400" height="720" fill="url(#sb)"/>${Array.from({ length: 50 }, (_, i) => `<circle class="tw" style="animation-delay:${((i * 0.31) % 3).toFixed(2)}s" cx="${(i * 83) % 400}" cy="${(i * 41) % 330}" r="${1 + (i % 4) * 0.5}" fill="#fff"/>`).join("")}
<circle cx="200" cy="205" r="170" fill="#c9a8ff" opacity=".18"/><circle cx="200" cy="205" r="140" fill="url(#moon)"/><circle cx="160" cy="160" r="22" fill="#d6c9f2" opacity=".6"/><circle cx="240" cy="250" r="30" fill="#d6c9f2" opacity=".5"/><circle cx="168" cy="270" r="14" fill="#d6c9f2" opacity=".5"/>
${fount}
${lights((t) => [10 + 380 * t, 18 + 34 * Math.sin(Math.PI * t * 2)], 24, ["#ff7fb0", "#7fe0ff", "#ffd272", "#b98cff"])}
${lant(30, 90, "#ff5d9f")}${lant(370, 110, "#46d0c8")}${lant(80, 60, "#ffb23e")}${lant(320, 70, "#b98cff")}
${dhol(40, 322, 0.5)}${dhol(360, 322, 0.5)}`;
}
function chaakArt() {
  const kalash = (x, y) =>
    `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="4" rx="22" ry="6" fill="#7a3810" opacity=".3"/><path d="M-18 0Q-26 -28 -10 -40H10Q26 -28 18 0Z" fill="#d97236" stroke="#7a3810" stroke-width="2"/><path d="M-12 -40Q0 -50 12 -40" fill="#f3d37a"/><circle cx="0" cy="-48" r="9" fill="#8a5a2a" stroke="#4a2a0a" stroke-width="1.5"/>${mLeaf(-4, -54, 230, 18)}${mLeaf(4, -54, 310, 18)}</g>`;
  return `<defs><linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8cba6"/><stop offset=".55" stop-color="#e38b4f"/><stop offset="1" stop-color="#b8541c"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#cb)"/>
<path d="${cuspArch(24, 52, 352, 304, 11, 110)}" fill="#fff0e0" fill-opacity=".45" stroke="#8a3810" stroke-width="3"/>
${mGarland((t) => [24 + 176 * t, 46 + 26 * Math.sin(Math.PI * t)], 12, 8, 11, 41)}
${mGarland((t) => [200 + 176 * t, 46 + 26 * Math.sin(Math.PI * t)], 12, 8, 11, 42)}
${mGarland((t) => [32 + 5 * Math.sin(t * 10), 68 + 270 * t], 16, 7, 10, 43)}
${mGarland((t) => [368 - 5 * Math.sin(t * 10), 68 + 270 * t], 16, 7, 10, 44)}
${kalash(44, 336)}${kalash(356, 336)}
${diya(84, 344, 0.7)}${diya(316, 344, 0.7)}`;
}
function bhaatArt() {
  return `<defs><linearGradient id="bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d1438"/><stop offset=".55" stop-color="#a8285c"/><stop offset="1" stop-color="#d4437a"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#bb)"/>
<circle cx="200" cy="200" r="180" fill="url(#gl)" opacity=".45"/>
<path d="${cuspArch(24, 50, 352, 306, 11, 110)}" fill="#ffe8f1" fill-opacity=".2" stroke="#f3d37a" stroke-width="3"/>
${lights((t) => [16 + 368 * t, 22 + 28 * Math.sin(Math.PI * t * 2)], 22, ["#fff1c2", "#ffb9d6", "#ffd272"])}
${mGarland((t) => [30 + 6 * Math.sin(t * 9), 54 + 290 * t], 18, 7, 10, 51)}
${mGarland((t) => [370 - 6 * Math.sin(t * 9), 54 + 290 * t], 18, 7, 10, 52)}
${peacock(44, 350, 0.6, false)}${peacock(356, 350, 0.6, true)}`;
}
function phereArt() {
  const rand = rngFor(55);
  let strands = "";
  for (let i = 0; i < 44; i++) {
    const x = 14 + i * 8.6, L = 90 + rand() * 170;
    strands += `<path d="M${f1(x)} 0V${f1(L)}" stroke="#fff3d6" stroke-opacity=".55" stroke-width="1"/><circle class="tw" style="animation-delay:${(rand() * 3).toFixed(2)}s" cx="${f1(x)}" cy="${f1(L)}" r="${f1(2 + rand() * 2.6)}" fill="#fff6d2"/>`;
  }
  const pillar = (x) =>
    `<rect x="${x - 17}" y="70" width="34" height="270" fill="#d9a23a" stroke="#7a4a12" stroke-width="2"/><rect x="${x - 24}" y="64" width="48" height="16" fill="#e8b852" stroke="#7a4a12" stroke-width="2"/><rect x="${x - 24}" y="332" width="48" height="14" fill="#e8b852" stroke="#7a4a12" stroke-width="2"/>${mGarland((t) => [x + 6 * Math.sin(t * 10), 84 + 250 * t], 14, 8, 10, 56 + x)}`;
  return `<defs><linearGradient id="pb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a0f1a"/><stop offset=".6" stop-color="#8a1f2a"/><stop offset="1" stop-color="#c9482a"/></linearGradient></defs>
<rect width="400" height="720" fill="url(#pb)"/><circle cx="200" cy="200" r="180" fill="url(#gl)" opacity=".5"/>${strands}
<path d="M0 36H400V80Q380 98 360 80Q340 98 320 80Q300 98 280 80Q260 98 240 80Q220 98 200 80Q180 98 160 80Q140 98 120 80Q100 98 80 80Q60 98 40 80Q20 98 0 80Z" fill="#c2303a" stroke="#e6b45a" stroke-width="3"/>
${pillar(26)}${pillar(374)}
<text x="200" y="78" text-anchor="middle" font-family="Tiro Devanagari Hindi,serif" font-size="30" fill="#ffe9a0">ॐ</text>`;
}
function funcScene(E, f, t0, art, pal) {
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${GL}</defs>
${art()}
${frames(E, t0, pal)}
${plaque(E, f, t0, pal)}
</svg>`;
}

function heroTop() {
  return `<svg viewBox="0 0 400 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${GL}</defs>
${dome(200, 112, 1.3)}${dome(90, 118, 0.85)}${dome(310, 118, 0.85)}
<path d="M30 126H370" stroke="#c98a2e" stroke-width="6"/>
${mGarland((t) => [10 + 190 * t, 130 + 44 * Math.sin(Math.PI * t)], 14, 9, 12, 33)}${mGarland((t) => [200 + 190 * t, 130 + 44 * Math.sin(Math.PI * t)], 14, 9, 12, 34)}
${lights((t) => [10 + 380 * t, 128 + 10 * Math.sin(Math.PI * t * 6)], 24, ["#fff1c2", "#ffd48a"])}</svg>`;
}

/* ---------- the film timeline ---------- */
const TL = [
  { k: "gate", s: 0 },
  { k: "ganesh", s: 5.6 },
  { k: "wedding", s: 11.2 },
  { k: "haldi", s: 18.4 },
  { k: "mehendi", s: 25.0 },
  { k: "sangeet", s: 31.6 },
  { k: "chaak", s: 38.2 },
  { k: "bhaat", s: 44.8 },
  { k: "phere", s: 51.4 },
];
const FILM_SECONDS = 59;
const TS = Object.fromEntries(TL.map((x) => [x.k, x.s]));
const SCENE = {
  start: gateScene(E, false),
  gate: gateScene(E, true),
  ganesh: ganeshScene(E, TS.ganesh),
  wedding: weddingScene(E, TS.wedding),
  haldi: funcScene(E, F.haldi, TS.haldi, haldiArt, PAL_HALDI),
  mehendi: funcScene(E, F.mehendi, TS.mehendi, mehndiArt, PAL_MEHNDI),
  sangeet: funcScene(E, F.sangeet, TS.sangeet, sangeetArt, PAL_SANGEET),
  chaak: funcScene(E, F.chaak, TS.chaak, chaakArt, PAL_CHAAK),
  bhaat: funcScene(E, F.bhaat, TS.bhaat, bhaatArt, PAL_BHAAT),
  phere: funcScene(E, F.phere, TS.phere, phereArt, PAL_PHERE),
  top: heroTop(),
};
const pct = (t) => `${((t / FILM_SECONDS) * 100).toFixed(3)}%`;
const sceneCss = TL.map((sc, i) => {
  const nx = TL[i + 1];
  const frames =
    i === 0
      ? `0%,${pct(nx.s + 0.3)}{opacity:1}${pct(nx.s + 0.4)},100%{opacity:0}`
      : nx
        ? `0%,${pct(sc.s - 1)}{opacity:0}${pct(sc.s)},${pct(nx.s + 0.3)}{opacity:1}${pct(nx.s + 0.4)},100%{opacity:0}`
        : `0%,${pct(sc.s - 1)}{opacity:0}${pct(sc.s)},100%{opacity:1}`;
  const len = (nx ? nx.s : FILM_SECONDS) - sc.s + 1.6;
  return `.rw .sc${i}{${i ? "opacity:0;" : ""}animation:rw-s${i} ${FILM_SECONDS}s linear forwards}@keyframes rw-s${i}{${frames}}
.rw .sc${i} svg{animation:${i ? `rw-kb ${len.toFixed(1)}s ${Math.max(0, sc.s - 1)}s ease-out both` : "rw-z1 6.6s ease-in forwards"}}`;
}).join("\n");

const css = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Jost:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Tiro+Devanagari+Hindi&display=swap');
.rw{--cream:#fff4e0;--sand:#f7e3c0;--maroon:#7a1f2b;--saffron:#e8761c;--mari:#f2a900;--gold:#c8973f;--rani:#d4437a;--ink:#4a2a1f;--muted:#8a6a55;
 font:300 1.05rem/1.7 Jost,system-ui,sans-serif;color:var(--ink);background:var(--cream);min-height:100vh;overflow-x:hidden}
.rw.locked{height:100vh;overflow:hidden}
.rw *{box-sizing:border-box}
.rw h1,.rw h2,.rw h3{margin:0;font-family:"Playfair Display",Georgia,serif;font-weight:400}
.rw .script{font-family:"Great Vibes",cursive}.rw .hi{font-family:"Tiro Devanagari Hindi",serif}.rw .sf{font-family:"Playfair Display",Georgia,serif}.rw .it{font-style:italic}.rw .muted{color:var(--muted)}

/* ---------- film ---------- */
.rw .full{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;background:#1a0d08;overflow:hidden}
.rw .reel{position:relative;height:100%;width:100%;max-width:min(520px,calc(100vh * .5556));overflow:hidden;background:#3a1b0c}
@media (min-width:700px){.rw .reel{border-radius:22px;height:calc(100% - 28px);box-shadow:0 20px 80px #000a}}
.rw .sc{position:absolute;inset:0}
.rw .sc svg{width:100%;height:100%;display:block;transform-origin:50% 55%}
.rw .ti{opacity:0;animation:rw-in .9s ease-out both}
@keyframes rw-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
.rw .pop{opacity:0;animation:rw-pop .9s cubic-bezier(.3,1.3,.5,1) both;transform-box:fill-box;transform-origin:50% 60%}
@keyframes rw-pop{from{opacity:0;transform:scale(.92) translateY(10px)}to{opacity:1;transform:none}}
.rw .tw{animation:rw-tw 2.4s ease-in-out infinite}
@keyframes rw-tw{0%,100%{opacity:.25}50%{opacity:1}}
.rw .fl{transform-box:fill-box;transform-origin:50% 100%;animation:rw-fl .55s ease-in-out infinite alternate}
@keyframes rw-fl{from{transform:scale(1,1) rotate(-3deg)}to{transform:scale(.86,1.14) rotate(3deg)}}
.rw .spin{animation:rw-spin 50s linear infinite;transform-origin:0 0}
@keyframes rw-spin{to{transform:rotate(360deg)}}
.rw .swing{animation:rw-sw 3.6s ease-in-out infinite alternate;transform-origin:0 -30px}
@keyframes rw-sw{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
${sceneCss}
@keyframes rw-kb{from{transform:scale(1)}to{transform:scale(1.07)}}
@keyframes rw-z1{0%{transform:scale(1)}35%{transform:scale(1.03)}100%{transform:scale(1.5)}}
.rw .dL,.rw .dR{transform-box:view-box;animation-duration:2.6s;animation-delay:2s;animation-timing-function:cubic-bezier(.6,0,.3,1);animation-fill-mode:forwards}
.rw .dL{transform-origin:98px 0;animation-name:rw-dl}.rw .dR{transform-origin:302px 0;animation-name:rw-dr}
@keyframes rw-dl{to{transform:scaleX(.06)}}@keyframes rw-dr{to{transform:scaleX(.06)}}
.rw .lt{animation:rw-lt 2.6s 2s ease-in forwards;opacity:.3}
@keyframes rw-lt{to{opacity:1}}
.rw .bar{position:absolute;left:14px;right:14px;bottom:14px;height:3px;border-radius:3px;background:#ffffff40;z-index:6}
.rw .bar i{display:block;height:100%;width:0;border-radius:3px;background:#f2c060;animation:rw-bar ${FILM_SECONDS}s linear forwards}
@keyframes rw-bar{to{width:100%}}
.rw .skip{position:absolute;left:12px;top:calc(env(safe-area-inset-top,0px) + 12px);z-index:7;padding:6px 16px;border-radius:999px;border:1px solid #f2c060;background:#2a1008aa;color:#ffe3a0;font:500 .85rem Jost,sans-serif;cursor:pointer}
.rw .play{position:absolute;left:50%;bottom:7%;transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:8px;border:0;background:none;cursor:pointer;color:#fff7e0;text-shadow:0 2px 8px #000b;font:400 1rem Jost,sans-serif;letter-spacing:.06em}
.rw .play b{width:76px;height:76px;border-radius:50%;background:#ffffff38;backdrop-filter:blur(6px);border:2px solid #fff;display:flex;align-items:center;justify-content:center;animation:rw-pulse 1.8s ease-in-out infinite}
.rw .play b::after{content:"";margin-left:6px;border-left:24px solid #fff;border-top:15px solid transparent;border-bottom:15px solid transparent}
@keyframes rw-pulse{50%{transform:scale(1.1);box-shadow:0 0 0 14px #ffffff22}}
.rw .fadeout{animation:rw-fo 1.4s ease-in forwards}
@keyframes rw-fo{to{opacity:0}}

/* ---------- falling marigold petals ---------- */
.rw .petals{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}
.rw .petals.fix{position:fixed;z-index:3}
.rw .petal{position:absolute;top:-40px;animation:rw-fall linear infinite}
.rw .petal svg{display:block;animation:rw-sway 3.2s ease-in-out infinite alternate}
@keyframes rw-fall{to{transform:translateY(112vh)}}
@keyframes rw-sway{from{transform:translateX(-18px) rotate(-30deg)}to{transform:translateX(22px) rotate(35deg)}}

/* ---------- main page ---------- */
.rw main{position:relative;background-color:var(--cream);background-image:radial-gradient(circle at 16px 16px,#e8761c26 2px,transparent 3px),linear-gradient(45deg,#c8973f10 25%,transparent 25%,transparent 75%,#c8973f10 75%);background-size:40px 40px,40px 40px}
.rw .hero{position:relative;z-index:2;text-align:center;padding:0 14px 36px;background:linear-gradient(#f9d89a,#fde9c6 55%,transparent);overflow:hidden}
.rw .top{width:min(560px,100%);margin:0 auto;display:block}.rw .top svg{width:100%;display:block}
.rw .ganesh-hero{width:96px;height:114px;border-radius:56px 56px 14px 14px;border:3px double var(--gold);box-shadow:0 6px 18px #7a1f2b2b;object-fit:cover;margin:4px auto 8px;display:block;background:#fff3cf}
.rw .ganesh-om{width:54px;height:54px;border-radius:50%;border:2px solid var(--gold);margin:4px auto 6px;display:flex;align-items:center;justify-content:center;color:var(--maroon);background:#fff3cf;font:1.7rem "Tiro Devanagari Hindi",serif}
.rw .names{font-family:"Great Vibes",cursive;font-size:clamp(2.8rem,12vw,4.8rem);line-height:1.1;color:var(--maroon);margin:4px 0}
.rw .names span{color:var(--gold);font-size:.62em;padding:0 .12em}
.rw .duo{display:flex;justify-content:center;gap:14px;margin:6px 0 4px}
.rw .arch{width:min(40%,150px);aspect-ratio:3/4;border-radius:999px 999px 10px 10px;border:4px double var(--gold);box-shadow:0 8px 22px #7a1f2b33;object-fit:cover;display:block;background:#f3d9b6}
.rw .arch.ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#f6c76a,#e8761c);color:#fff;font:3.2rem "Great Vibes",cursive}
.rw section{position:relative;z-index:2;max-width:720px;margin:0 auto;padding:26px 14px;text-align:center}
.rw h2{font-style:italic;font-size:clamp(1.85rem,6.4vw,2.5rem);color:var(--maroon);margin-bottom:.4rem;line-height:1.2}
.rw .orn{color:var(--gold);letter-spacing:.6em;margin:.1rem 0 1rem}
.rw .cd{display:flex;justify-content:center;gap:.9rem;flex-wrap:wrap}
.rw .cd div{min-width:68px;padding:8px 6px;border:1px solid var(--gold);border-radius:12px;background:#fff9ee}
.rw .cd b{display:block;font:400 2.3rem "Playfair Display",serif;color:var(--maroon);line-height:1.1}.rw .cd span{font-size:.72rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
.rw .fam{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;max-width:640px;margin:0 auto}
.rw .person{background:#fff9ee;border:1px solid #c8973f88;border-radius:110px 110px 16px 16px;padding:22px 12px;box-shadow:0 8px 22px #7a1f2b18}
.rw .person h3{font:italic 500 1.85rem "Playfair Display",serif;color:var(--maroon);margin:.5rem 0 .3rem}
.rw .person p{margin:.1rem 0;font-size:.95rem;line-height:1.45}.rw .person .role{font-style:italic;color:var(--muted)}
.rw .pp,.rw .ph{width:104px;height:130px;border-radius:60px 60px 8px 8px;border:3px double var(--gold);margin:0 auto;display:block;object-fit:cover}
.rw .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#f6c76a,#e8761c);color:#fff;font:italic 2.6rem "Playfair Display",serif}
.rw .mono{align-self:center;width:54px;height:54px;border-radius:50%;border:1px solid var(--gold);display:flex;align-items:center;justify-content:center;color:var(--gold);background:var(--cream);font:italic 1rem "Playfair Display",serif}
@media (max-width:600px){.rw .fam{grid-template-columns:1fr;max-width:330px}.rw .mono{justify-self:center;margin:-4px 0}}

.rw .fn{position:relative;margin:22px 0;border-radius:120px 120px 18px 18px;overflow:hidden;background:#fffaf0;border:2px solid var(--acc);box-shadow:0 12px 30px #4a2a1f22;text-align:center;opacity:0;transform:translateY(26px);transition:opacity .8s,transform .9s cubic-bezier(.22,1,.36,1)}
.rw .fn.in{opacity:1;transform:none}
.rw .fn .head{padding:26px 16px 14px;background:linear-gradient(var(--acc2),var(--acc3))}
.rw .fn .ico{font-size:1.6rem}
.rw .fn h3{font-family:"Great Vibes",cursive;font-size:clamp(2.5rem,9vw,3.2rem);line-height:1.1;color:var(--accd)}
.rw .fn .duo{margin:6px 0 0}
.rw .fn .arch{width:84px;border-width:3px;box-shadow:0 6px 16px #0003}
.rw .fn .body{padding:14px 16px 20px}
.rw .fn .when{font:600 1.15rem "Playfair Display",serif;color:var(--accd)}
.rw .fn .venue{font:600 1.2rem "Playfair Display",serif;color:var(--ink);margin-top:8px}
.rw .fn .chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:12px 0 4px}
.rw .fn .chip{padding:3px 12px;border-radius:999px;background:var(--acc2);color:var(--accd);font-size:.85rem;font-weight:500;border:1px solid var(--acc)}
.rw .qr{display:inline-block;margin:12px 0 4px;padding:12px;background:#fff;border:2px double var(--gold);border-radius:14px;line-height:0}
.rw .btn{display:inline-block;margin-top:.7rem;padding:.55rem 1.6rem;border:1px solid var(--maroon);border-radius:999px;color:var(--maroon);text-decoration:none;background:transparent;font:400 1rem Jost,sans-serif;cursor:pointer;transition:background .2s,color .2s}
.rw .btn:hover{background:var(--maroon);color:#fff}
.rw .btn.wa{background:#25d366;border-color:#25d366;color:#fff}
.rw .board{background:#fff9ee;border:2px solid var(--gold);border-radius:16px;padding:22px 16px;box-shadow:0 10px 28px #7a1f2b1c}
.rw .car{position:relative;max-width:350px;margin:1rem auto}
.rw .frame{position:relative;aspect-ratio:4/5;border:10px solid #fffdf8;box-shadow:0 12px 30px #7a4a3a33;border-radius:6px;overflow:hidden;background:#f3e3da}
.rw .slide{position:absolute;inset:0;opacity:0;transition:opacity .9s}.rw .slide.on{opacity:1}
.rw .slide>img{width:100%;height:100%;object-fit:cover;display:block}.rw .slide>.ph{width:100%;height:100%;border:0;border-radius:0;font-size:1.7rem;padding:1rem;text-align:center}
.rw .cap{margin:.8rem 0 .2rem;font-size:1.7rem;color:var(--rani)}
.rw .arr{position:absolute;top:44%;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:#fffdf8d9;color:var(--maroon);font-size:1.5rem;cursor:pointer;line-height:1}
.rw .arr.l{left:6px}.rw .arr.r{right:6px}
.rw .dots{display:flex;justify-content:center;gap:.4rem;margin-top:.4rem}.rw .dots button{width:8px;height:8px;border-radius:50%;border:0;background:#dec8b8;padding:0;cursor:pointer}.rw .dots button.on{background:var(--rani)}
.rw .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:60;width:42px;height:42px;border-radius:50%;border:1px solid var(--gold);background:#fffaf4;color:var(--maroon);cursor:pointer;font-size:1.1rem}
.rw .conf{position:fixed;inset:0;width:100%;height:100%;z-index:70;pointer-events:none}
.rw footer{position:relative;z-index:2;padding:26px 14px 44px;text-align:center;color:var(--muted)}
.rw button:focus-visible,.rw a:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.rw *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.rw .fn{opacity:1!important;transform:none!important}.rw .ti,.rw .pop{opacity:1!important}}
`;

const ACC = {
  haldi: { "--acc": "#d99a1a", "--acc2": "#fff0b8", "--acc3": "#ffd86b", "--accd": "#a85a08" },
  mehendi: { "--acc": "#7a9a4a", "--acc2": "#e4f0c8", "--acc3": "#b8d48a", "--accd": "#3f6a2a" },
  sangeet: { "--acc": "#a97ad8", "--acc2": "#efe2fb", "--acc3": "#cdb0ee", "--accd": "#5f2a9a" },
  chaak: { "--acc": "#c86428", "--acc2": "#fde8d7", "--acc3": "#f5c19a", "--accd": "#8a3810" },
  bhaat: { "--acc": "#d4437a", "--acc2": "#fde4ee", "--acc3": "#f5b8d0", "--accd": "#941c4c" },
  phere: { "--acc": "#c2303a", "--acc2": "#ffe3d0", "--acc3": "#f6b896", "--accd": "#9a1830" },
};

function Petals({ count = 14, fixed }) {
  const items = Array.from({ length: count }, (_, i) => ({
    l: (i * 41 + 7) % 96,
    d: 9 + ((i * 7) % 8),
    dl: -((i * 2.3) % 12),
    s: 14 + ((i * 5) % 14),
    c: i % 3,
  }));
  const fills = ["#ffb92e", "#f08a1c", "#ffd36a"];
  return (
    <div className={"petals" + (fixed ? " fix" : "")} aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s` }}>
          <svg viewBox="0 0 30 40" width={p.s} style={{ animationDelay: `${p.dl}s` }}>
            <path d="M15 2C28 10 30 26 15 38C0 26 2 10 15 2Z" fill={fills[p.c]} />
            <path d="M15 6C15 16 15 26 15 34" stroke="#fff" strokeOpacity=".4" fill="none" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function useInView() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, show];
}

function useCountdown(iso) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return { over: false, parts: [["days", 0], ["hours", 0], ["minutes", 0], ["seconds", 0]] };
  const s = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 1000));
  return {
    over: s === 0,
    parts: [
      ["days", Math.floor(s / 86400)],
      ["hours", Math.floor((s % 86400) / 3600)],
      ["minutes", Math.floor((s % 3600) / 60)],
      ["seconds", s % 60],
    ],
  };
}
function Countdown() {
  const { over, parts } = useCountdown(E.dateISO);
  if (over) return <p className="script" style={{ fontSize: "2.2rem", margin: 0, color: "var(--rani)" }}>Aaj shubh din hai!</p>;
  return (
    <div className="cd" role="timer" aria-label="Time until the pheras">
      {parts.map(([l, v]) => (
        <div key={l}>
          <b>{String(v).padStart(2, "0")}</b>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- photos ---------- */
function Photo({ src, label, className, letter }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className={"ph " + (className || "")}><span>{letter || label}</span></div>;
  return <img className={className} src={src} alt={label} onError={() => setBad(true)} />;
}
function GaneshHero() {
  const [bad, setBad] = useState(false);
  if (!E.ganeshPhoto || bad) {
    return (
      <div className="ganesh-om" aria-hidden="true">
        ॐ
      </div>
    );
  }
  return <img className="ganesh-hero" src={E.ganeshPhoto} alt="Shri Ganesh Ji" onError={() => setBad(true)} />;
}
function Duo() {
  return (
    <div className="duo">
      <Photo className="arch" src={E.bridePhoto} label={`${E.bride} - Bride`} letter={E.bride[0]} />
      <Photo className="arch" src={E.groomPhoto} label={`${E.groom} - Groom`} letter={E.groom[0]} />
    </div>
  );
}
function Person({ name, photo, role, lines }) {
  return (
    <div className="person">
      <Photo className="pp" src={photo} label={name} letter={name[0]} />
      <h3>{name}</h3>
      <p className="role">{role}</p>
      {lines.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </div>
  );
}

function FuncCard({ f }) {
  const [ref, show] = useInView();
  return (
    <article ref={ref} className={"fn" + (show ? " in" : "")} style={ACC[f.key]}>
      <div className="head">
        <div className="ico">{f.icon}</div>
        <h3>{f.name}</h3>
        <Duo />
      </div>
      <div className="body">
        <div className="when">{f.date}</div>
        <div className="muted">{f.time}</div>
        <div className="venue">{f.venue}</div>
        <div className="muted" style={{ fontSize: ".95rem" }}>
          {f.venue2}
        </div>
        <div className="chips">
          {f.program.map((p) => (
            <span key={p} className="chip">
              {p}
            </span>
          ))}
        </div>
        <a className="btn" href={f.mapUrl} target="_blank" rel="noopener noreferrer">
          📍 Open location in Maps
        </a>
      </div>
    </article>
  );
}

function Carousel() {
  const g = E.gallery;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const x0 = useRef(null);
  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((n) => (n + 1) % g.length), 4600);
    return () => clearInterval(t);
  }, [hold, g.length]);
  const go = (d) => {
    setHold(true);
    setI((n) => (n + d + g.length) % g.length);
  };
  return (
    <div
      className="car"
      onPointerDown={(e) => {
        x0.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (x0.current != null && Math.abs(e.clientX - x0.current) > 40) go(e.clientX < x0.current ? 1 : -1);
        x0.current = null;
      }}
    >
      <div className="frame">
        {g.map((p, k) => (
          <div key={k} className={"slide" + (k === i ? " on" : "")}>
            <Photo src={p.src} label={`${E.bride} and ${E.groom} - ${p.caption}`} />
          </div>
        ))}
        <button type="button" className="arr l" onClick={() => go(-1)} aria-label="Previous photo">
          ‹
        </button>
        <button type="button" className="arr r" onClick={() => go(1)} aria-label="Next photo">
          ›
        </button>
      </div>
      <p className="script cap">{g[i].caption}</p>
      <div className="dots">
        {g.map((_, k) => (
          <button
            type="button"
            key={k}
            className={k === i ? "on" : ""}
            onClick={() => {
              setHold(true);
              setI(k);
            }}
            aria-label={`Photo ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#ffb92e", "#f08a1c", "#ffd36a", "#d4437a", "#c2303a", "#ffffff"];
    const ps = [];
    const t0 = performance.now();
    let id, n = 0;
    const spawn = () => ({
      x: Math.random() * w,
      y: -20 * dpr,
      vx: (Math.random() - 0.5) * 1.6 * dpr,
      vy: (1.6 + Math.random() * 3.4) * dpr,
      r: Math.random() * 6,
      vr: Math.random() * 0.16 - 0.08,
      s: (7 + Math.random() * 9) * dpr,
      c: col[n++ % col.length],
      ph: Math.random() * 6,
      sw: (0.5 + Math.random()) * dpr,
    });
    const tick = (t) => {
      x.clearRect(0, 0, w, h);
      if (t - t0 < 2600) for (let i = 0; i < 5; i++) ps.push(spawn());
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.ph += 0.05;
        p.vy = Math.min(p.vy + 0.015 * dpr, 5.5 * dpr);
        p.x += p.vx + Math.sin(p.ph) * p.sw;
        p.y += p.vy;
        p.r += p.vr;
        if (p.y > h + 30) {
          ps.splice(i, 1);
          continue;
        }
        x.save();
        x.translate(p.x, p.y);
        x.rotate(p.r);
        x.fillStyle = p.c;
        x.beginPath();
        x.ellipse(0, 0, p.s / 2.4, p.s / 1.4, 0, 0, 7);
        x.fill();
        x.restore();
      }
      if (t - t0 < 2600 || ps.length) id = requestAnimationFrame(tick);
      else x.clearRect(0, 0, w, h);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [fire]);
  return <canvas ref={ref} className="conf" aria-hidden="true" />;
}

function makeSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const out = ctx.createGain();
  out.gain.value = 0.6;
  out.connect(ctx.destination);

  [65.41, 98, 130.81, 130.81].forEach((f, i) => {
    const o = ctx.createOscillator();
    const l = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.value = f * (i === 3 ? 1.003 : 1);
    l.type = "lowpass";
    l.frequency.value = 460;
    g.gain.value = 0.04;
    o.connect(l);
    l.connect(g);
    g.connect(out);
    o.start();
  });

  const nb = ctx.createBuffer(1, 4410, 44100);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  const sc = [261.63, 277.18, 311.13, 349.23, 392, 415.3, 466.16, 523.25, 554.37];
  const mel = [[4, 2], [3, 1], [2, 1], [3, 2], [1, 1], [0, 1], [1, 2], [0, 2], [2, 2], [3, 1], [4, 1], [5, 2], [4, 2], [3, 2], [2, 1], [1, 1], [0, 4], [4, 2], [5, 1], [6, 1], [7, 2], [6, 2], [5, 2], [4, 2], [3, 2], [4, 4]];

  const shehnai = (f, at, d) => {
    const o = ctx.createOscillator();
    const v = ctx.createOscillator();
    const vg = ctx.createGain();
    const bp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(f * 0.97, at);
    o.frequency.exponentialRampToValueAtTime(f, at + 0.08);
    v.frequency.value = 5.8;
    vg.gain.value = f * 0.006;
    v.connect(vg);
    vg.connect(o.frequency);
    bp.type = "bandpass";
    bp.frequency.value = 1500;
    bp.Q.value = 1.4;
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(0.15, at + 0.06);
    g.gain.linearRampToValueAtTime(0.1, at + d * 0.75);
    g.gain.linearRampToValueAtTime(0, at + d);
    o.connect(bp);
    bp.connect(g);
    g.connect(out);
    o.start(at);
    v.start(at);
    o.stop(at + d + 0.1);
    v.stop(at + d + 0.1);
  };
  const bass = (at, hi, vol = 0.34) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(hi ? 190 : 140, at);
    o.frequency.exponentialRampToValueAtTime(55, at + 0.18);
    g.gain.setValueAtTime(vol, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.34);
    o.connect(g);
    g.connect(out);
    o.start(at);
    o.stop(at + 0.4);
  };
  const tick = (at) => {
    const s = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    s.buffer = nb;
    f.type = "bandpass";
    f.frequency.value = 3200;
    g.gain.setValueAtTime(0.16, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.06);
    s.connect(f);
    f.connect(g);
    g.connect(out);
    s.start(at);
  };

  const pat = ["B", "t", "t", "b", "B", "t", "b", "t"];
  const dur = 0.24;
  let s = 0, j = 0, next = 0, t = ctx.currentTime + 0.3, timer;
  const run = () => {
    while (t < ctx.currentTime + 1.5) {
      const h = pat[s % 8];
      if (h === "B") bass(t, 0);
      else if (h === "b") bass(t, 1);
      tick(t);
      if (s >= next) {
        const [n, d] = mel[j++ % mel.length];
        shehnai(sc[n], t, d * dur * 0.96);
        next = s + d;
      }
      t += dur;
      s++;
    }
    timer = setTimeout(run, 400);
  };
  run();

  const bell = (f, at, d, v) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(v, at);
    g.gain.exponentialRampToValueAtTime(0.0005, at + d);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(at);
    o.stop(at + d + 0.05);
  };
  return {
    pause() {
      clearTimeout(timer);
      ctx.suspend();
    },
    resume() {
      ctx.resume();
      t = Math.max(t, ctx.currentTime + 0.2);
      run();
    },
    chime() {
      const n = ctx.currentTime;
      bell(1568, n, 1.6, 0.13);
      bell(2093, n + 0.12, 1.4, 0.09);
      bell(2637, n + 0.26, 1.2, 0.06);
    },
    gate() {
      const n = ctx.currentTime;
      bass(n, 0, 0.7);
      bass(n + 0.25, 1, 0.5);
      bass(n + 0.5, 0, 0.7);
      bell(784, n + 0.6, 2.4, 0.12);
    },
    get on() {
      return ctx.state === "running";
    },
  };
}

export default function RajasthaniWeddingPage() {
  const [stage, setStage] = useState("start"); // start → film → main
  const [confetti, setConfetti] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const audio = useRef(null);
  const synth = useRef(null);

  useEffect(() => {
    document.body.style.overflow = stage === "main" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);
  useEffect(() => () => synth.current && synth.current.pause(), []);

  const startSynth = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (!synth.current) {
        synth.current = makeSynth();
        setPlaying(true);
      }
    } catch {
      /* blocked until a user gesture */
    }
  }, []);

  const play = useCallback(() => {
    if (E.music && audio.current) {
      audio.current.volume = 0.7;
      audio.current.play().then(() => setPlaying(true)).catch(startSynth);
    } else startSynth();
  }, [startSynth]);

  const toggle = () => {
    if (synth.current) {
      synth.current.on ? synth.current.pause() : synth.current.resume();
      setPlaying(synth.current.on);
    } else if (audio.current) {
      const a = audio.current;
      a.paused ? a.play() : a.pause();
      setPlaying(!a.paused);
    }
  };

  const begin = () => {
    play();
    setStage("film");
  };
  const toMain = () => {
    setLeaving(false);
    setStage("main");
  };

  useEffect(() => {
    if (stage !== "film") return;
    const ids = [
      setTimeout(() => synth.current && synth.current.gate(), 2000),
      ...TL.slice(1).map((sc) => setTimeout(() => synth.current && synth.current.chime(), sc.s * 1000)),
      setTimeout(() => setConfetti((c) => c + 1), (FILM_SECONDS - 1) * 1000),
      setTimeout(() => setLeaving(true), (FILM_SECONDS - 0.8) * 1000),
      setTimeout(toMain, (FILM_SECONDS + 0.8) * 1000),
    ];
    return () => ids.forEach(clearTimeout);
  }, [stage]);

  const ensureMusic = () => {
    if (!playing) play();
  };

  /* ================= SEO & SOCIAL SHARE (OG / TWITTER / SCHEMA) ================= */
  const SITE_URL = E.siteUrl.replace(/\/$/, "");
  const PAGE_URL = `${SITE_URL}${E.pagePath}`;
  const OG_IMAGE = `${SITE_URL}${E.ogImage}`; // https://.../rajasthan/3.jpeg
  const SEO_TITLE = `${E.bride} & ${E.groom} — Rajasthani Wedding Invitation | 9 March 2027, Jaipur`;
  const SEO_DESC = `Padharo sa! Join us to celebrate the wedding of ${E.bride} & ${E.groom} on 8–9 March 2027 in Jaipur (Haldi, Mehandi, Ladies Sangeet, Chaak, Bhaat & Pheras at Sultan House Garden).`;
  const OG_TITLE = `${E.bride} weds ${E.groom} — Wedding Invitation 🙏`;
  const OG_DESC = `Padharo sa! 8–9 March 2027 · Sultan House Garden, Jaipur. Tap to open the invitation, function timings & venue maps.`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: SEO_TITLE,
        description: SEO_DESC,
        inLanguage: "en-IN",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE,
          width: 1200,
          height: 630,
        },
        publisher: {
          "@type": "Organization",
          name: "Seankrix Technologies",
          url: SITE_URL,
        },
      },
      {
        "@type": "SocialEvent",
        name: `Wedding of ${E.bride} & ${E.groom}`,
        description: SEO_DESC,
        startDate: "2027-03-08T09:00:00+05:30",
        endDate: "2027-03-10T02:00:00+05:30",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: [OG_IMAGE, `${SITE_URL}${E.bridePhoto}`, `${SITE_URL}${E.groomPhoto}`],
        location: {
          "@type": "Place",
          name: "Sultan House Garden",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
        },
        organizer: {
          "@type": "Organization",
          name: `${E.bride} & ${E.groom} Family`,
          url: PAGE_URL,
        },
      },
    ],
  };

  const rsvpHref = `https://wa.me/${E.rsvpPhone}?text=${encodeURIComponent(`Ram Ram sa! We will be there to bless ${E.bride} & ${E.groom} 🙏`)}`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7a1f2b" />

        {/* Primary SEO Meta Tags */}
        <title>{SEO_TITLE}</title>
        <meta name="title" content={SEO_TITLE} />
        <meta name="description" content={SEO_DESC} />
        <meta
          name="keywords"
          content="Tanu Rao Jayant Yadav wedding, Rajasthani wedding invitation, digital shadi card Jaipur, Haldi Mehandi Sangeet Chaak Bhaat Pheras, Sultan House Garden Jaipur wedding"
        />
        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="image_src" href={OG_IMAGE} />

        {/* Open Graph / WhatsApp / Facebook / Instagram / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content={`${E.bride} & ${E.groom} Wedding`} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${E.bride} and ${E.groom} — Rajasthani Wedding Invitation`} />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={OG_TITLE} />
        <meta name="twitter:description" content={OG_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={`${E.bride} and ${E.groom} — Rajasthani Wedding Invitation`} />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className={"rw" + (stage !== "main" ? " locked" : "")}>
        <style>{css}</style>
        {E.music && <audio ref={audio} src={E.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "start" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}

        {/* 0. poster: the golden haveli gate with a play button */}
        {stage === "start" && (
          <div className="full">
            <div className="reel">
              <div className="sc" dangerouslySetInnerHTML={{ __html: SCENE.start }} />
              <Petals count={10} />
              <button type="button" className="play" onClick={begin} aria-label="Play the wedding invitation">
                <b />
                <span>Tap to open the invitation</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. the film */}
        {stage === "film" && (
          <div className={"full" + (leaving ? " fadeout" : "")}>
            <div className="reel">
              {TL.map((sc, i) => (
                <div key={sc.k} className={`sc sc${i}`} dangerouslySetInnerHTML={{ __html: SCENE[sc.k] }} />
              ))}
              <Petals count={16} />
              <div className="bar">
                <i />
              </div>
              <button type="button" className="skip" onClick={toMain}>
                Skip ›
              </button>
            </div>
          </div>
        )}

        {/* 2. main invitation page */}
        <main onPointerDown={ensureMusic} aria-hidden={stage !== "main"}>
          <Petals count={9} fixed />

          <header className="hero">
            <div className="top" dangerouslySetInnerHTML={{ __html: SCENE.top }} />
            <GaneshHero />
            <p className="hi" style={{ fontSize: "1.45rem", color: "var(--maroon)", margin: "-2px 0 0" }}>
              {E.blessing}
            </p>
            {E.padharo && (
              <p className="hi" style={{ fontSize: "1.9rem", color: "var(--saffron)", margin: "0 0 4px" }}>
                {E.padharo}
              </p>
            )}
            <p className="sf it muted" style={{ margin: 0, fontSize: "1.1rem" }}>
              with the blessings of our elders, we invite you to the wedding of
            </p>
            <Duo />
            <h1 className="names">
              {E.bride} <span>weds</span> {E.groom}
            </h1>
            <p style={{ margin: "4px 0 0", fontWeight: 400, fontSize: "1.15rem" }}>{E.weddingDate}</p>
            <p className="muted" style={{ margin: 0, letterSpacing: ".15em" }}>
              {E.weddingCity}
            </p>
          </header>

          <section>
            <h2>Counting down to the pheras</h2>
            <div className="orn">❖ ✦ ❖</div>
            <Countdown />
          </section>

          <section>
            <h2>Parivar</h2>
            <div className="orn">❖ ✦ ❖</div>
            <div className="fam">
              <Person name={E.bride} photo={E.bridePhoto} role={E.brideFamily[0]} lines={E.brideFamily.slice(1)} />
              <div className="mono" aria-hidden="true">
                {E.initials}
              </div>
              <Person name={E.groom} photo={E.groomPhoto} role={E.groomFamily[0]} lines={E.groomFamily.slice(1)} />
            </div>
          </section>

          <section>
            <h2>The celebrations</h2>
            <div className="orn">❖ ✦ ❖</div>
            {E.funcs.map((f) => (
              <FuncCard key={f.key} f={f} />
            ))}
            {E.dress && (
              <p className="muted" style={{ marginTop: 8 }}>
                Dress code:{" "}
                <span className="sf it" style={{ color: "var(--maroon)" }}>
                  {E.dress}
                </span>
              </p>
            )}
          </section>

          <section>
            <h2>Phere location</h2>
            <div className="orn">❖ ✦ ❖</div>
            <div className="board">
              <p className="sf" style={{ margin: 0, fontSize: "1.3rem", color: "var(--maroon)" }}>
                {F.phere.venue}
              </p>
              <p className="muted" style={{ margin: 0 }}>
                {F.phere.venue2}
              </p>
              <div className="qr">
                <QRCodeSVG
                  value={F.phere.mapUrl}
                  size={150}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#4a2a1f"
                  title="Scan for the pheras venue"
                />
              </div>
              <p className="sf it muted" style={{ margin: 0 }}>
                Scan for directions
              </p>
              <a className="btn" href={F.phere.mapUrl} target="_blank" rel="noopener noreferrer">
                Open in Maps
              </a>
            </div>
          </section>

          <section>
            <h2>Our story</h2>
            <p className="sf it muted" style={{ fontSize: "1.2rem", margin: 0 }}>
              {E.storyTag}
            </p>
            <Carousel />
            <p style={{ maxWidth: 500, margin: "10px auto 0" }}>{E.story}</p>
          </section>

          <section>
            <h2>Padharo sa!</h2>
            <div className="orn">❖ ✦ ❖</div>
            <div className="board">
              <p style={{ margin: "0 0 4px" }}>
                Kindly confirm your presence by <b>{E.rsvpBy}</b>.
              </p>
              <a className="btn wa" href={rsvpHref} target="_blank" rel="noopener noreferrer">
                Reply on WhatsApp
              </a>
            </div>
          </section>

          <footer>
            <p className="script" style={{ fontSize: "2.4rem", color: "var(--maroon)", margin: 0 }}>
              {E.bride} &amp; {E.groom}
            </p>
            <p style={{ margin: "4px 0 0" }}>{E.weddingDate}</p>
            <p className="hi" style={{ margin: "6px 0 0", color: "var(--saffron)" }}>
              म्हारे घर पधारज्यो सा 🙏
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}