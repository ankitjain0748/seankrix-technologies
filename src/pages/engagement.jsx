import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react

/* ================= EDIT YOUR DETAILS HERE ================= */
const E = {
  groom: "Sumit",
  bride: "Tanya",
  initials: "S & T",
  blessing: "॥ श्री गणेशाय नमः ॥",
  odiaWelcome: "ଆପଣଙ୍କୁ ସାଦର ଆମନ୍ତ୍ରଣ", // "A warm invitation to you" (Odia). Leave "" to hide
  occasion: "Engagement Ceremony of", // line used on the invitation board
  groomFather: "Mr. Surendra Kumar Samantaray",
  groomMother: "Mrs. Mitasri Samantray",
  brideFather: "Mr. Akshaya Kumar",
  brideMother: "Mrs. Sunita Kumari",
  neonTop: "Better", // glowing sign behind the couple
  neonBottom: "Together",
  dateLabel: "24 January 2027",
  shortDate: "24 · 01 · 2027",
  dateISO: "2027-01-24T17:00:00", // live countdown target
  day: "Sunday",
  time: "5:00 pm onwards",
  city: "Bhubaneswar",
  state: "Odisha",
  venue: "Add venue name & address here, Bhubaneswar, Odisha",
  mapUrl: "https://maps.google.com/?q=Bhubaneswar+Odisha",
  rsvpPhone: "919999999999", // WhatsApp number with country code, no + or spaces
  rsvpBy: "15 January",
  events: [
    { icon: "🪔", name: "Ganesh Puja & Aarti", when: "5:00 pm", where: "Main stage" },
    { icon: "💍", name: "Ring ceremony", when: "6:00 pm", where: "Floral mandap" },
    { icon: "📸", name: "Blessings & family photos", when: "6:45 pm", where: "Stage lawn" },
    { icon: "🍽️", name: "Dinner & music", when: "7:30 pm", where: "Banquet hall" },
  ],
  dress: "Pastel pinks, ivory & gold",
  music: "", // e.g. "/engagement-song.mp3" in /public. Empty = built-in soft flute & tanpura music
  groomPhoto: "/assets/sumit.jpg", // portraits in /public/assets
  bridePhoto: "/assets/tanya.jpg",
  storyTag: "Every forever begins with a beautiful “yes”",
  story: "Two hearts, two families, one beautiful beginning. We would be honoured to have your blessings as Sumit and Tanya exchange rings and begin their journey together.",
  gallery: [
    { src: "/assets/e1.jpg", caption: "Sumit & Tanya" },
    { src: "/assets/e2.jpg", caption: "Our favourite moments" },
    { src: "/assets/e3.jpg", caption: "The proposal" },
    { src: "/assets/e4.jpg", caption: "Together, always" },
  ],
};

/* ---------- tiny helpers for the hand-drawn film scenes (they return SVG strings) ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rngFor = (seed) => { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; };
const f1 = (n) => Number(n).toFixed(1);

const ROSE_COLORS = ["#f4a9a8", "#f8c3bd", "#ec8f9b", "#fbd9d0", "#f6b3a6", "#e97f8c"];
function rose(cx, cy, r, rand) {
  const c = ROSE_COLORS[Math.floor(rand() * ROSE_COLORS.length)];
  let s = `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${Math.floor(rand() * 360)})"><circle r="${f1(r)}" fill="${c}" stroke="#c9667a" stroke-opacity=".35" stroke-width="1"/>`;
  s += `<circle r="${f1(r * 0.8)}" fill="#fff" opacity=".16"/>`;
  [[0.68, 10], [0.5, 100], [0.32, 190]].forEach(([k, a]) => {
    s += `<path transform="rotate(${a})" d="M${f1(-r * k)} 0A${f1(r * k)} ${f1(r * k)} 0 1 1 ${f1(r * k * 0.2)} ${f1(-r * k * 0.97)}" fill="none" stroke="#b34f66" stroke-opacity=".5" stroke-width="${f1(Math.max(1, r * 0.1))}" stroke-linecap="round"/>`;
  });
  return s + `<circle r="${f1(r * 0.1)}" fill="#c25a70" opacity=".8"/></g>`;
}
function leafS(x, y, ang, L) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${Math.floor(ang)})"><path d="M0 0C${f1(L * 0.3)} ${f1(-L * 0.32)} ${f1(L * 0.8)} ${f1(-L * 0.26)} ${f1(L)} 0C${f1(L * 0.8)} ${f1(L * 0.26)} ${f1(L * 0.3)} ${f1(L * 0.32)} 0 0Z" fill="#5f8c60" stroke="#3f6a45" stroke-opacity=".5"/><path d="M2 0H${f1(L * 0.9)}" stroke="#cfe3c8" stroke-opacity=".5"/></g>`;
}
function gypsS(x, y, rand, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const px = x + (rand() - 0.5) * 30, py = y + (rand() - 0.5) * 30;
    s += `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(2.2 + rand() * 2.2)}" fill="#fffaf0"/><circle cx="${f1(px)}" cy="${f1(py)}" r=".9" fill="#e5c98b"/>`;
  }
  return s;
}
// a garland of leaves, baby's breath and roses along any curve fn(t) -> [x, y]
function garlandAlong(fn, n, rMin, rMax, seed, spread = 8) {
  const rand = rngFor(seed);
  let leaves = "", gyps = "", roses = "";
  for (let i = 0; i < n; i++) {
    const [x, y] = fn(i / (n - 1));
    const jx = (rand() - 0.5) * spread, jy = (rand() - 0.5) * spread;
    leaves += leafS(x + jx, y + jy, rand() * 360, 22 + rand() * 14);
    if (i % 2 === 0) gyps += gypsS(x + jx, y + jy, rand, 3);
    roses += rose(x + jx, y + jy, rMin + rand() * (rMax - rMin), rand);
  }
  return leaves + gyps + roses;
}
function fairyLights(fn, n, cls = "tw") {
  let s = "";
  for (let i = 0; i < n; i++) {
    const [x, y] = fn(i / (n - 1));
    s += `<g class="${cls}" style="animation-delay:${((i * 0.37) % 2.4).toFixed(2)}s"><circle cx="${f1(x)}" cy="${f1(y)}" r="9" fill="#ffe7a8" opacity=".25"/><circle cx="${f1(x)}" cy="${f1(y)}" r="3" fill="#fff6d2"/></g>`;
  }
  return s;
}
function lantern(x, y, s, flame = true) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
 <circle cx="0" cy="-55" r="52" fill="url(#gl)" opacity=".8"/>
 <path d="M-24 0H24L30 -12H-30Z" fill="#d9a84f" stroke="#9a6a1f" stroke-width="1.5"/>
 <rect x="-22" y="-104" width="44" height="92" fill="#fff4d6" fill-opacity=".22" stroke="#d9a84f" stroke-width="3"/>
 <path d="M-22 -58H22M0 -104V-12" stroke="#d9a84f" stroke-width="1.5" opacity=".7"/>
 <path d="M-26 -104L0 -128L26 -104Z" fill="#d9a84f" stroke="#9a6a1f" stroke-width="1.5"/>
 <circle cx="0" cy="-133" r="5" fill="none" stroke="#d9a84f" stroke-width="3"/>
 <rect x="-8" y="-62" width="16" height="50" rx="3" fill="#fff8ea"/>
 ${flame ? `<ellipse class="fl" cx="0" cy="-72" rx="5.5" ry="10" fill="#ffc94d"/><ellipse class="fl" cx="0" cy="-70" rx="2.6" ry="6" fill="#fff6c9"/>` : ""}
</g>`;
}
function candle(x, y, h, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="${-h - 6}" r="22" fill="url(#gl)" opacity=".8"/><rect x="-7" y="${-h}" width="14" height="${h}" rx="3" fill="#fff7e6" stroke="#ecd9b8" stroke-width="1"/><ellipse class="fl" cx="0" cy="${-h - 8}" rx="4.5" ry="8.5" fill="#ffc94d"/><ellipse class="fl" cx="0" cy="${-h - 6}" rx="2" ry="5" fill="#fff6c9"/></g>`;
}
function bouquet(x, y, s, seed) {
  const rand = rngFor(seed);
  let out = `<g transform="translate(${x} ${y}) scale(${s})">`;
  for (let i = 0; i < 7; i++) out += leafS((rand() - 0.5) * 40, -20 - rand() * 30, 200 + rand() * 140, 30);
  for (let i = 0; i < 5; i++) out += gypsS((rand() - 0.5) * 70, -50 - rand() * 40, rand, 3);
  [[-22, -40, 18], [18, -46, 20], [0, -66, 17], [-34, -66, 14], [32, -72, 14]].forEach(([px, py, r]) => { out += rose(px, py, r, rand); });
  return out + `</g>`;
}
const GLOW_DEFS = `<radialGradient id="gl"><stop offset="0" stop-color="#ffe7a3" stop-opacity=".95"/><stop offset="1" stop-color="#ffe7a3" stop-opacity="0"/></radialGradient>`;

/* ---------- the shared garden mandap backdrop ---------- */
function mandapBG(curtains) {
  const rand = rngFor(5);
  let strands = "";
  for (let i = 0; i < 41; i++) strands += `<line x1="${100 + i * 5}" y1="234" x2="${100 + i * 5}" y2="494" stroke="#fff" stroke-opacity="${(0.18 + rand() * 0.25).toFixed(2)}" stroke-width="${(1 + rand()).toFixed(1)}"/>`;
  let trees = "";
  [[20, 330, 58], [64, 380, 48], [370, 340, 56], [338, 390, 44], [10, 250, 40], [392, 260, 44]].forEach(([x, y, r], i) => { trees += `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? "#3c6a45" : "#2f5a3b"}"/>`; });
  const lightsArc = (t) => [40 + 320 * t, 214 + 16 * Math.sin(Math.PI * t) - 6];
  return `<defs>
 ${GLOW_DEFS}
 <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f4c8f"/><stop offset=".5" stop-color="#5d93d0"/><stop offset="1" stop-color="#cfdcec"/></linearGradient>
 <linearGradient id="pn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#efc785"/></linearGradient>
 <linearGradient id="mb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a8683"/><stop offset="1" stop-color="#58544f"/></linearGradient>
 <linearGradient id="fl2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e6dc"/><stop offset="1" stop-color="#dcc1b6"/></linearGradient>
</defs>
<rect width="400" height="720" fill="url(#sk)"/>
<path d="M-20 70C70 -20 190 -10 270 70L430 20V-30H-20Z" fill="#f6f8fb" opacity=".92"/>
<path d="M-20 70C70 -20 190 -10 270 70M40 30C100 -4 180 10 240 60M110 0C150 20 200 40 230 62" stroke="#c4cfdd" stroke-width="2" fill="none"/>
${trees}
<rect x="0" y="470" width="400" height="250" fill="url(#fl2)"/>
<rect x="46" y="470" width="308" height="22" fill="#6f6b68"/><rect x="46" y="470" width="308" height="5" fill="#a9a5a0"/>
<rect x="62" y="205" width="276" height="272" fill="url(#mb)" stroke="#47433f" stroke-width="3"/>
<rect x="98" y="232" width="204" height="248" fill="url(#pn)"/>
${strands}
<circle cx="200" cy="360" r="120" fill="url(#gl)" opacity=".55"/>
<g transform="translate(200 318)" fill="#3a2a1e"><path d="M-22 6C-24 -10 -10 -14 0 -2C10 -14 24 -10 22 6C16 -2 8 2 0 14C-8 2 -16 -2 -22 6Z"/><circle cx="0" cy="-10" r="4"/><path d="M-30 14Q0 30 30 14Q0 22 -30 14Z"/></g>
${curtains ? `<path d="M0 90C28 150 30 260 10 470H0Z" fill="#fbe9dc" opacity=".92"/><path d="M0 90C40 160 44 300 20 470H46C66 300 56 160 20 90Z" fill="#f4d9c8" opacity=".85"/><path d="M400 90C372 150 370 260 390 470H400Z" fill="#fbe9dc" opacity=".92"/><path d="M400 90C360 160 356 300 380 470H354C334 300 344 160 380 90Z" fill="#f4d9c8" opacity=".85"/>${fairyLights((t) => [14 + 22 * Math.sin(t * 9), 100 + 360 * t], 18)}${fairyLights((t) => [386 - 22 * Math.sin(t * 9), 100 + 360 * t], 18)}` : ""}
${garlandAlong((t) => [46 + 308 * t, 206 + 16 * Math.sin(Math.PI * t)], 24, 11, 17, 21)}
${garlandAlong((t) => [58 - 8 * t, 218 + 170 * t], 9, 10, 15, 22)}
${garlandAlong((t) => [342 + 8 * t, 218 + 170 * t], 9, 10, 15, 23)}
${fairyLights(lightsArc, 22)}`;
}

/* ---------- Scene 1: Ganesha on the golden pedestal ---------- */
function ganesha() {
  const skin = "#f4c1a4", skin2 = "#f0ab8e", pink = "#f19aa6";
  return `<g transform="translate(200 632) scale(.84)">
 <circle cx="0" cy="-250" r="190" fill="url(#gl)" opacity=".75"/>
 <path d="M-112 0Q-124 -52 -70 -74H70Q124 -52 112 0Z" fill="${pink}" stroke="#d98a3f" stroke-width="3"/>
 <path d="M-108 -14Q0 18 108 -14" stroke="#e6b25a" stroke-width="6" fill="none"/>
 <ellipse cx="-58" cy="-12" rx="34" ry="17" fill="${skin}" stroke="${skin2}" stroke-width="2"/><ellipse cx="58" cy="-12" rx="34" ry="17" fill="${skin}" stroke="${skin2}" stroke-width="2"/>
 <ellipse cx="0" cy="-152" rx="84" ry="96" fill="${skin}"/>
 <ellipse cx="0" cy="-136" rx="58" ry="62" fill="#f8d2ba"/><circle cx="0" cy="-122" r="4" fill="${skin2}"/>
 <path d="M-98 -84Q0 -44 98 -84L102 -62Q0 -18 -102 -62Z" fill="#f08797" stroke="#e6b25a" stroke-width="3"/>
 <path d="M-66 -236C-84 -150 -42 -96 0 -92C42 -96 84 -150 66 -236" fill="none" stroke="#fffaf0" stroke-width="13" stroke-dasharray="0 11" stroke-linecap="round"/>
 <path d="M-66 -236C-84 -150 -42 -96 0 -92C42 -96 84 -150 66 -236" fill="none" stroke="#f6a8b4" stroke-width="9" stroke-dasharray="0 44" stroke-linecap="round" stroke-dashoffset="-6"/>
 <path d="M-52 -240Q0 -196 52 -240" fill="none" stroke="#e6b25a" stroke-width="4"/><circle cx="0" cy="-206" r="8" fill="#e6b25a" stroke="#a86f1f"/><circle cx="0" cy="-206" r="3.5" fill="#d9445a"/>
 <path d="M-66 -226L-114 -290" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="-116" cy="-296" r="17" fill="${skin}"/><path d="M-130 -312L-102 -312L-110 -270Z" fill="#e6b25a" stroke="#a86f1f"/>
 <path d="M-74 -198L-122 -164" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="-128" cy="-156" r="19" fill="${skin}"/><circle cx="-128" cy="-156" r="7" fill="#e86a73" opacity=".7"/><path d="M-142 -172l8-14M-130 -176l2-16M-118 -172l-4-14" stroke="${skin}" stroke-width="6" stroke-linecap="round"/>
 <path d="M66 -226L114 -290" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="116" cy="-296" r="17" fill="${skin}"/><circle cx="124" cy="-312" r="11" fill="#f3c04e" stroke="#a86f1f" stroke-width="2"/><path d="M124 -323l0-9M116 -321l-4-8M132 -321l4-8" stroke="#e86a73" stroke-width="3" stroke-linecap="round"/>
 <path d="M74 -198L120 -150" stroke="${skin}" stroke-width="26" stroke-linecap="round"/><circle cx="124" cy="-142" r="17" fill="${skin}"/><circle cx="130" cy="-156" r="15" fill="#f2a43e" stroke="#c4731a" stroke-width="2"/><circle cx="126" cy="-160" r="4" fill="#fff" opacity=".5"/>
 <g transform="translate(0 -300)">
  <ellipse cx="-68" cy="14" rx="40" ry="50" fill="${skin2}"/><ellipse cx="-66" cy="16" rx="25" ry="35" fill="#f19aa0"/>
  <ellipse cx="68" cy="14" rx="40" ry="50" fill="${skin2}"/><ellipse cx="66" cy="16" rx="25" ry="35" fill="#f19aa0"/>
  <circle cx="0" cy="16" r="60" fill="${skin}"/>
  <circle cx="-36" cy="34" r="12" fill="#f28d92" opacity=".5"/><circle cx="36" cy="34" r="12" fill="#f28d92" opacity=".5"/>
  <path d="M-66 -4C-72 -78 72 -78 66 -4C44 -22 -44 -22 -66 -4Z" fill="#f9dcc8" stroke="#e8b99a" stroke-width="2"/>
  <ellipse cx="0" cy="-44" rx="48" ry="30" fill="#fbe5d4" stroke="#e8b99a" stroke-width="2"/>
  <path d="M-44 -36Q0 -62 44 -36M-36 -52Q0 -76 36 -52M-58 -16Q0 -34 58 -16" stroke="#e5b595" stroke-width="3" fill="none"/>
  <path d="M-66 -6Q0 12 66 -6" stroke="#e6b25a" stroke-width="7" fill="none"/>
  <path d="M0 -26C-9 -16 -9 -8 0 0C9 -8 9 -16 0 -26Z" fill="#e6b25a" stroke="#a86f1f"/><circle cx="0" cy="-12" r="3.6" fill="#d9445a"/>
  <path d="M10 -64Q32 -96 54 -76Q36 -80 24 -58Z" fill="#e6b25a" stroke="#a86f1f"/>
  <ellipse cx="-21" cy="14" rx="8.5" ry="11" fill="#2a1a14"/><ellipse cx="21" cy="14" rx="8.5" ry="11" fill="#2a1a14"/>
  <circle cx="-18" cy="9" r="3.2" fill="#fff"/><circle cx="24" cy="9" r="3.2" fill="#fff"/>
  <path d="M-32 -3Q-21 -10 -10 -3M10 -3Q21 -10 32 -3" stroke="#a46b4f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M0 6V20" stroke="#d9445a" stroke-width="3.5" stroke-linecap="round" opacity="0"/>
  <path d="M0 26C-4 62 6 98 34 100C56 101 60 78 44 72" stroke="${skin2}" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M0 28C-3 62 7 94 33 96C50 97 54 80 44 74" stroke="#f8cdb4" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M-20 52Q-38 72 -24 86Q-22 70 -12 58Z" fill="#fff" stroke="#e8d6c4"/>
 </g>
</g>`;
}
function pedestal() {
  return `<ellipse cx="200" cy="676" rx="168" ry="34" fill="#9a6a1f"/>
<ellipse cx="200" cy="668" rx="168" ry="34" fill="#e6b95f" stroke="#b9822a" stroke-width="3"/>
<ellipse cx="200" cy="660" rx="140" ry="27" fill="#f3d58a" stroke="#c18f34" stroke-width="2"/>
<ellipse cx="200" cy="654" rx="118" ry="22" fill="#f8e3a8" stroke="#d3a444" stroke-width="2"/>
<g fill="#fff8e1" opacity=".9">${Array.from({ length: 22 }, (_, i) => `<circle cx="${f1(200 + 156 * Math.cos((i / 22) * Math.PI * 2))}" cy="${f1(668 + 30 * Math.sin((i / 22) * Math.PI * 2))}" r="2.4"/>`).join("")}</g>`;
}
function ganeshaScene(E, animated) {
  const petalsBack = "";
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${mandapBG(false)}
${lantern(56, 640, 0.95)}${lantern(344, 640, 0.95)}
${candle(112, 696, 30, 0.9)}${candle(290, 700, 24, 0.9)}${candle(24, 700, 22, 0.9)}${candle(380, 696, 26, 0.9)}
${pedestal()}
${ganesha()}
${bouquet(34, 612, 1.05, 31)}${bouquet(368, 618, 1.05, 32)}
<text x="200" y="104" text-anchor="middle" class="${animated ? "ti" : ""}" style="${animated ? "animation-delay:.5s" : ""}" font-family="Tiro Devanagari Hindi,serif" font-size="27" fill="#fff4d2" stroke="#8a5a19" stroke-width=".6" paint-order="stroke">${esc(E.blessing)}</text>
</svg>`;
}

/* ---------- Scene 2: the invitation board on an easel ---------- */
function boardScene(E) {
  const d = "M80 214H320Q330 234 342 242V572Q330 580 320 600H80Q70 580 58 572V242Q70 234 80 214Z";
  const T = (y, size, fill, txt, delay, font = "Playfair Display,Georgia,serif", extra = "") => `<text x="200" y="${y}" text-anchor="middle" class="ti" style="animation-delay:${delay}s" font-family="${font}" font-size="${size}" fill="${fill}" ${extra}>${esc(txt)}</text>`;
  const orn = (y, delay) => `<g class="ti" style="animation-delay:${delay}s"><path d="M120 ${y}H184M216 ${y}H280" stroke="#c9973f" stroke-width="1.4"/><path transform="translate(200 ${y}) scale(.55)" d="M0 12C-22 -4 -14 -22 0 -10C14 -22 22 -4 0 12Z" fill="#e0677c"/><circle cx="190" cy="${y}" r="2" fill="#c9973f"/><circle cx="210" cy="${y}" r="2" fill="#c9973f"/></g>`;
  const wiggle = (y, delay) => `<g class="ti" style="animation-delay:${delay}s" fill="none" stroke="#c9973f" stroke-width="1.3"><path d="M138 ${y}C146 ${y - 6} 152 ${y + 6} 160 ${y}M240 ${y}C248 ${y - 6} 254 ${y + 6} 262 ${y}"/></g>`;
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${mandapBG(true)}
<rect width="400" height="720" fill="#1a2a4a" opacity=".22"/>
<path d="M108 600L66 706M292 600L334 706M200 600V690" stroke="#8a5a2b" stroke-width="12" stroke-linecap="round"/>
<path d="M108 600L66 706M292 600L334 706" stroke="#c28a45" stroke-width="4" stroke-linecap="round"/>
<rect x="70" y="590" width="260" height="20" rx="4" fill="#9a6a33" stroke="#6a421a" stroke-width="2"/>
<g filter="url(#sh)"><path d="${d}" fill="#fff6e6" stroke="#d6a84f" stroke-width="6" stroke-linejoin="round"/></g>
<path d="${d}" fill="url(#bd)"/>
<path d="${d}" transform="translate(200 407) scale(.94) translate(-200 -407)" fill="none" stroke="#e5be6e" stroke-width="2"/>
<path d="${d}" transform="translate(200 407) scale(.91) translate(-200 -407)" fill="none" stroke="#e5be6e" stroke-width="1" stroke-dasharray="2 4"/>
<defs><filter id="sh" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#2a1a10" flood-opacity=".45"/></filter><radialGradient id="bd" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#fbe6d4"/></radialGradient></defs>
${garlandAlong((t) => [200 + 62 * (t - 0.5) * 2, 212 - 4 * Math.sin(Math.PI * t) + 4], 9, 13, 21, 41, 6)}
${garlandAlong((t) => [84 + 14 * t, 222 + 26 * t], 4, 10, 14, 42, 4)}${garlandAlong((t) => [316 - 14 * t, 222 + 26 * t], 4, 10, 14, 43, 4)}
${T(268, 13.5, "#6b3a2e", "We cordially invite you for the", 5.8, undefined, 'font-style="italic"')}
${T(296, 24, "#7a2f3d", E.occasion, 6.4, undefined, 'font-weight="500"')}
${orn(312, 6.9)}
${T(374, 70, "#c23f55", E.groom, 7.5, "Great Vibes,cursive")}
${T(398, 12.4, "#5c3326", `S/o ${E.groomFather} &`, 8.5)}
${T(413, 12.4, "#5c3326", E.groomMother, 8.7)}
${wiggle(448, 9.3)}${T(453, 20, "#7a2f3d", "with", 9.4, undefined, 'font-style="italic"')}
${T(520, 70, "#c23f55", E.bride, 10.2, "Great Vibes,cursive")}
${T(545, 12.4, "#5c3326", `D/o ${E.brideFather} &`, 11.2)}
${T(560, 12.4, "#5c3326", E.brideMother, 11.4)}
${orn(580, 11.9)}
${lantern(36, 700, 0.95)}${lantern(364, 700, 0.95)}${candle(96, 712, 26, 0.9)}${candle(306, 712, 22, 0.9)}
</svg>`;
}

/* ---------- Scene 3: the couple under the rose arch ---------- */
function coupleScene(E) {
  const rand = rngFor(77);
  // bride's sequins
  let seq = "";
  for (let i = 0; i < 140; i++) {
    const y = 472 + rand() * 186, half = 32 + (y - 472) * 0.51;
    const x = 168 + (rand() - 0.5) * 2 * half * 0.92;
    seq += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(1.2 + rand() * 1.4)}" fill="#fff6e8" opacity="${(0.55 + rand() * 0.4).toFixed(2)}"/>`;
  }
  let lat = "";
  for (let k = -6; k <= 6; k++) lat += `<path d="M${168 + k * 14} 472L${168 + k * 30} 660M${168 + k * 14} 472L${168 + k * 5} 660" stroke="#fff" stroke-opacity=".16" stroke-width="1"/>`;
  const archFn = (t) => {
    if (t < 0.2) { const u = t / 0.2; return [30, 660 - 280 * u]; }
    if (t > 0.8) { const u = (t - 0.8) / 0.2; return [370, 380 + 280 * u]; }
    const a = Math.PI - ((t - 0.2) / 0.6) * Math.PI;
    return [200 + 170 * Math.cos(a), 380 - 255 * Math.sin(a)];
  };
  const inner = (t) => { const [x, y] = archFn(t); return [x + (x < 200 ? 22 : -22), y + (y < 380 ? 24 : 0)]; };
  return `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>${GLOW_DEFS}
 <linearGradient id="nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17321f"/><stop offset=".55" stop-color="#274a30"/><stop offset="1" stop-color="#20382c"/></linearGradient>
 <radialGradient id="cw" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".95"/><stop offset=".6" stop-color="#f5c778" stop-opacity=".35"/><stop offset="1" stop-color="#f5c778" stop-opacity="0"/></radialGradient>
 <linearGradient id="lh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ee9da2"/><stop offset="1" stop-color="#f6bcb2"/></linearGradient>
 <linearGradient id="fl3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9d6cb"/><stop offset="1" stop-color="#bda396"/></linearGradient>
 <filter id="ng" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="400" height="720" fill="url(#nb)"/>
${Array.from({ length: 36 }, (_, i) => `<circle class="tw" style="animation-delay:${((i * 0.43) % 3).toFixed(2)}s" cx="${(i * 97) % 400}" cy="${(i * 53) % 330}" r="${2 + (i % 4)}" fill="#ffe9b0" opacity=".5"/>`).join("")}
<rect y="650" width="400" height="70" fill="url(#fl3)"/>
<ellipse cx="200" cy="420" rx="168" ry="250" fill="url(#cw)"/>
<g transform="rotate(-9 200 300)" filter="url(#ng)"><text x="196" y="268" text-anchor="middle" font-family="Great Vibes,cursive" font-size="42" fill="#ffd98b" class="ti" style="animation-delay:13.8s">${esc(E.neonTop)}</text><text x="206" y="310" text-anchor="middle" font-family="Great Vibes,cursive" font-size="42" fill="#ffd98b" class="ti" style="animation-delay:14.3s">${esc(E.neonBottom)}</text></g>
${garlandAlong(archFn, 64, 13, 22, 91, 14)}
${garlandAlong(inner, 40, 9, 14, 92, 8)}
${fairyLights((t) => { const [x, y] = inner(t); return [x, y]; }, 34)}
<g class="bob" transform="translate(0 0)">
 <!-- groom -->
 <path d="M228 590H262V664H226Z M262 590H298V664H264Z" fill="#f7efe4" stroke="#e1d4c2"/><ellipse cx="240" cy="672" rx="22" ry="8" fill="#fff" stroke="#d9d2c6"/><ellipse cx="284" cy="672" rx="22" ry="8" fill="#fff" stroke="#d9d2c6"/>
 <path d="M226 428Q262 416 298 428L306 506L314 596H210L220 506Z" fill="#f1b6b0" stroke="#d98f8e" stroke-width="1.5"/>
 <path d="M262 428V596" stroke="#d98f8e" stroke-width="2"/>${[450, 480, 510, 540, 570].map((y) => `<circle cx="262" cy="${y}" r="3" fill="#e6b25a"/>`).join("")}
 <path d="M232 452l14-3 2 10-14 3Z" fill="#fff"/>
 <path d="M244 410H280L283 428H241Z" fill="#f6c8c2" stroke="#d98f8e"/>
 <rect x="255" y="398" width="14" height="16" fill="#cf9970"/>
 <circle cx="262" cy="378" r="26" fill="#d39a70"/>
 <path d="M238 384Q262 428 286 384Q288 414 262 424Q236 414 238 384Z" fill="#1f1315"/>
 ${[[246, 352, 13], [262, 346, 14], [278, 352, 13], [238, 366, 10], [286, 366, 10], [254, 356, 12], [270, 356, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#1f1315"/>`).join("")}
 <path d="M247 380q5 4 10 0M268 380q5 4 10 0" stroke="#2a1812" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M256 396q6 3 12 0" stroke="#e8a08a" stroke-width="2" fill="none" stroke-linecap="round"/>
 <path d="M296 436Q312 480 306 524" stroke="#f1b6b0" stroke-width="20" fill="none" stroke-linecap="round"/><circle cx="306" cy="530" r="9" fill="#cf9970"/>
 <path d="M232 438Q214 470 204 496" stroke="#f1b6b0" stroke-width="20" fill="none" stroke-linecap="round"/><circle cx="200" cy="500" r="9" fill="#cf9970"/>
 <circle cx="197" cy="490" r="5.5" fill="none" stroke="#ffd35e" stroke-width="2.6"/><path class="tw" d="M197 474l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#fff6c9"/>
 <!-- bride -->
 <path d="M150 366C118 380 104 480 94 606L134 616C142 520 164 440 178 404Z" fill="#f7dbe0" opacity=".78"/>
 <path d="M140 420L98 520" stroke="#2b1b1c" stroke-width="22" stroke-linecap="round" opacity="0"/>
 <ellipse cx="166" cy="392" rx="34" ry="40" fill="#2b1b1c"/>
 <path d="M140 404C128 440 138 480 124 526" stroke="#2b1b1c" stroke-width="22" fill="none" stroke-linecap="round"/>
 <path d="M200 404C206 440 200 470 208 500" stroke="#2b1b1c" stroke-width="12" fill="none" stroke-linecap="round" opacity="0"/>
 <path d="M168 664L74 664L136 472H200Z" fill="url(#lh)" stroke="#e08a92" stroke-width="1.5"/>
 <path d="M70 660L262 660L200 472H136Z" fill="url(#lh)" stroke="#e08a92" stroke-width="1.5"/>
 ${lat}${seq}
 <path d="M72 654Q168 668 260 654" stroke="#e6b25a" stroke-width="5" fill="none"/>
 <path d="M138 432Q168 420 198 432L202 474H134Z" fill="#f0a3a8" stroke="#da8a92"/>
 <path d="M140 440q28 10 58 0" stroke="#fff" stroke-opacity=".5" fill="none"/>
 <rect x="160" y="410" width="16" height="16" fill="#d9a27c"/>
 <circle cx="168" cy="392" r="25" fill="#dba57f"/>
 <path d="M146 384Q168 360 190 384Q168 372 146 384Z" fill="#2b1b1c"/>
 <path d="M157 392q5 4 10 0M170 392q5 4 10 0" stroke="#3a2018" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M160 404q8 6 16 0" stroke="#c9605f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
 <circle cx="153" cy="400" r="5" fill="#f1908c" opacity=".5"/><circle cx="183" cy="400" r="5" fill="#f1908c" opacity=".5"/>
 <circle cx="168" cy="377" r="2.4" fill="#c8323c"/><circle cx="145" cy="402" r="3.6" fill="#e6b25a"/><circle cx="191" cy="402" r="3.6" fill="#e6b25a"/>
 <path d="M146 440Q134 490 166 512" stroke="#dba57f" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="170" cy="514" r="8" fill="#dba57f"/>
 <path d="M140 482h12M138 488h14" stroke="#e6b25a" stroke-width="3" stroke-linecap="round"/>
</g>
${candle(40, 700, 34, 1)}${candle(70, 706, 22, 1)}${candle(362, 702, 30, 1)}${candle(332, 708, 20, 1)}
${lantern(26, 672, 0.8)}${lantern(374, 672, 0.8)}
<text x="200" y="82" text-anchor="middle" font-family="Great Vibes,cursive" font-size="44" fill="#ffe3a3" stroke="#8a5a19" stroke-width=".5" paint-order="stroke" class="ti" style="animation-delay:14.6s">${esc(E.groom)} &amp; ${esc(E.bride)}</text>
<text x="200" y="104" text-anchor="middle" font-family="Jost,sans-serif" font-size="11.5" letter-spacing="3.5" fill="#fff3d6" class="ti" style="animation-delay:15.2s">ENGAGEMENT · ${esc(E.shortDate)}</text>
</svg>`;
}

/* a rose-garland arch used on the main page header */
function heroArch(E) {
  const fn = (t) => { const a = Math.PI - t * Math.PI; return [200 + 188 * Math.cos(a), 205 - 168 * Math.sin(a)]; };
  return `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${GLOW_DEFS}</defs>
${garlandAlong(fn, 34, 12, 20, 55, 10)}
${fairyLights((t) => { const [x, y] = fn(t); return [x, y + 22]; }, 26)}</svg>`;
}


// the scenes are static drawings, so build them once
const SCENE = {
  start: ganeshaScene(E, false),
  a: ganeshaScene(E, true),
  b: boardScene(E),
  c: coupleScene(E),
  arch: heroArch(E),
};
const FILM_SECONDS = 20;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Jost:wght@300;400;500&family=Noto+Sans+Oriya:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Tiro+Devanagari+Hindi&display=swap');
.eg{--cream:#fff6ea;--blush:#f7d5d0;--rose:#d9687c;--gold:#c9973f;--maroon:#7a2f3d;--ink:#4d2e2a;--muted:#8d6f67;--sage:#6c8f6a;--night:#0e1a30;
 font:300 1.05rem/1.7 Jost,system-ui,sans-serif;color:var(--ink);background:var(--cream);min-height:100vh;overflow-x:hidden}
.eg *{box-sizing:border-box}
.eg h1,.eg h2,.eg h3{margin:0;font-family:"Playfair Display",Georgia,serif;font-weight:400}
.eg .script{font-family:"Great Vibes",cursive}.eg .hi{font-family:"Tiro Devanagari Hindi",serif}.eg .od{font-family:"Noto Sans Oriya",sans-serif}
.eg .sf{font-family:"Playfair Display",Georgia,serif}.eg .it{font-style:italic}.eg .muted{color:var(--muted)}

/* ---------- film ---------- */
.eg .full{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;background:#0b1424;overflow:hidden}
.eg .reel{position:relative;height:100%;width:100%;max-width:min(520px,calc(100vh * .5556));overflow:hidden;background:#0e1a30}
@media (min-width:700px){.eg .reel{border-radius:22px;height:calc(100% - 28px);box-shadow:0 20px 80px #000a}}
.eg .sc{position:absolute;inset:0}
.eg .sc svg{width:100%;height:100%;display:block;transform-origin:50% 55%}
.eg .ti{opacity:0;animation:eg-in .9s ease-out both}
@keyframes eg-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
.eg .tw{animation:eg-tw 2.4s ease-in-out infinite}
@keyframes eg-tw{0%,100%{opacity:.25}50%{opacity:1}}
.eg .fl{transform-box:fill-box;transform-origin:50% 100%;animation:eg-fl .55s ease-in-out infinite alternate}
@keyframes eg-fl{from{transform:scale(1,1) rotate(-3deg)}to{transform:scale(.86,1.14) rotate(3deg)}}
.eg .bob{animation:eg-bob 4.2s ease-in-out infinite}
@keyframes eg-bob{50%{transform:translateY(-4px)}}
.eg .scA{animation:eg-a ${FILM_SECONDS}s linear forwards}
.eg .scB{opacity:0;animation:eg-b ${FILM_SECONDS}s linear forwards}
.eg .scC{opacity:0;animation:eg-c ${FILM_SECONDS}s linear forwards}
@keyframes eg-a{0%,27.5%{opacity:1}32.5%,100%{opacity:0}}
@keyframes eg-b{0%,25%{opacity:0}31%,65%{opacity:1}71%,100%{opacity:0}}
@keyframes eg-c{0%,65%{opacity:0}71%,100%{opacity:1}}
.eg .scA svg{animation:eg-kb 6s ease-out both}
.eg .scB svg{animation:eg-kb 9.5s 5s ease-out both}
.eg .scC svg{animation:eg-kb 7.5s 13s ease-out both}
@keyframes eg-kb{from{transform:scale(1)}to{transform:scale(1.07)}}
.eg .bar{position:absolute;left:14px;right:14px;bottom:14px;height:3px;border-radius:3px;background:#ffffff40;z-index:6}
.eg .bar i{display:block;height:100%;width:0;border-radius:3px;background:#f0cc7a;animation:eg-bar ${FILM_SECONDS}s linear forwards}
@keyframes eg-bar{to{width:100%}}
.eg .skip{position:absolute;left:12px;top:calc(env(safe-area-inset-top,0px) + 12px);z-index:7;padding:6px 16px;border-radius:999px;border:1px solid #f0cc7a;background:#0e1a30aa;color:#f7e1a7;font:500 .85rem Jost,sans-serif;cursor:pointer}
.eg .play{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:8px;border:0;background:none;cursor:pointer;color:#fff7e0;text-shadow:0 2px 8px #0009;font:400 1rem Jost,sans-serif;letter-spacing:.06em}
.eg .play b{width:74px;height:74px;border-radius:50%;background:#ffffff38;backdrop-filter:blur(6px);border:2px solid #fff;display:flex;align-items:center;justify-content:center;animation:eg-pulse 1.8s ease-in-out infinite}
.eg .play b::after{content:"";margin-left:6px;border-left:24px solid #fff;border-top:15px solid transparent;border-bottom:15px solid transparent}
@keyframes eg-pulse{50%{transform:scale(1.1);box-shadow:0 0 0 14px #ffffff22}}
.eg .fadeout{animation:eg-fo 1.4s ease-in forwards}
@keyframes eg-fo{to{opacity:0}}

/* ---------- falling petals ---------- */
.eg .petals{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}
.eg .petals.fix{position:fixed;z-index:3}
.eg .petal{position:absolute;top:-40px;animation:eg-fall linear infinite}
.eg .petal svg{display:block;animation:eg-sway 3.2s ease-in-out infinite alternate}
@keyframes eg-fall{to{transform:translateY(112vh)}}
@keyframes eg-sway{from{transform:translateX(-18px) rotate(-30deg)}to{transform:translateX(22px) rotate(35deg)}}

/* ---------- main ---------- */
.eg main{position:relative;background-color:var(--cream);background-image:radial-gradient(circle at 18px 18px,#e7a2a438 2px,transparent 3px),radial-gradient(circle at 48px 48px,#c9973f2e 2px,transparent 3px);background-size:60px 60px}
.eg .hero{position:relative;z-index:2;text-align:center;padding:0 14px 40px;background:linear-gradient(#fbdfd9,#fff0e2 55%,transparent);overflow:hidden}
.eg .arch{width:min(560px,100%);margin:0 auto;display:block}
.eg .arch svg{width:100%;display:block}
.eg .names{font-family:"Great Vibes",cursive;font-size:clamp(3.4rem,17vw,6rem);line-height:1.05;color:var(--rose);margin:4px 0}
.eg .names span{color:var(--gold);font-size:.7em;padding:0 .12em}
.eg .occ{font:italic 500 clamp(1.5rem,6.5vw,2.1rem)/1.2 "Playfair Display",serif;color:var(--maroon)}
.eg .rings{width:92px;margin:6px auto;display:block;animation:eg-bob 4s ease-in-out infinite}
.eg section{position:relative;z-index:2;max-width:720px;margin:0 auto;padding:26px 14px;text-align:center}
.eg h2{font-style:italic;font-size:clamp(1.85rem,6.4vw,2.5rem);color:var(--maroon);margin-bottom:.5rem;line-height:1.2}
.eg .orn{color:var(--gold);letter-spacing:.6em;margin:.1rem 0 1rem}
.eg .board{position:relative;background:#fffaf1;border:2px solid #d6a84f;border-radius:14px;padding:22px 16px;box-shadow:0 10px 30px #b4614a24}
.eg .board::after{content:"";position:absolute;inset:6px;border:1px dashed #d6a84f99;border-radius:9px;pointer-events:none}
.eg .cd{display:flex;justify-content:center;gap:.9rem;flex-wrap:wrap}
.eg .cd div{min-width:68px}.eg .cd b{display:block;font:400 2.4rem "Playfair Display",serif;color:var(--maroon);line-height:1.1}.eg .cd span{font-size:.74rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
.eg .fam{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;max-width:640px;margin:0 auto}
.eg .person{background:#fff8ef;border:1px solid #d6a84f88;border-radius:110px 110px 16px 16px;padding:22px 12px;box-shadow:0 8px 22px #b4614a1e}
.eg .person h3{font:italic 500 2rem "Playfair Display",serif;color:var(--maroon);margin:.5rem 0 .3rem}
.eg .person p{margin:.1rem 0;font-size:.95rem;line-height:1.45}.eg .person .role{font-style:italic;color:var(--muted)}
.eg .pp,.eg .ph{width:104px;height:130px;border-radius:60px 60px 8px 8px;border:3px double var(--gold);margin:0 auto;display:block;object-fit:cover}
.eg .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#f9d3cc,#eea3a8);color:#fff;font:italic 2.6rem "Playfair Display",serif}
.eg .mono{align-self:center;width:54px;height:54px;border-radius:50%;border:1px solid var(--gold);display:flex;align-items:center;justify-content:center;color:var(--gold);background:var(--cream);font:italic 1rem "Playfair Display",serif}
@media (max-width:600px){.eg .fam{grid-template-columns:1fr;max-width:330px}.eg .mono{justify-self:center;margin:-4px 0}}
.eg .plan{display:flex;flex-direction:column;gap:14px;position:relative}
.eg .plan::before{content:"";position:absolute;top:20px;bottom:20px;left:50%;border-left:1.5px dashed #c9973f77;transform:translateX(-50%)}
.eg .ev{position:relative;width:min(90%,460px);display:flex;gap:14px;align-items:center;text-align:left;opacity:0;transition:opacity .8s,transform .9s cubic-bezier(.22,1,.36,1)}
.eg .ev.left{align-self:flex-start;transform:translateX(-46px)}.eg .ev.right{align-self:flex-end;transform:translateX(46px)}.eg .ev.in{opacity:1;transform:none}
.eg .ev .ico{flex:none;width:54px;height:54px;border-radius:50%;background:#fff;border:1px solid var(--gold);display:flex;align-items:center;justify-content:center;font-size:1.6rem}
.eg .ev h3{font-size:1.25rem;font-style:italic;color:var(--maroon)}.eg .ev p{margin:0;font-size:.92rem;color:var(--muted)}
.eg .qr{display:inline-block;margin:12px 0 4px;padding:12px;background:#fff;border:2px double var(--gold);border-radius:14px;line-height:0}
.eg .btn{display:inline-block;margin-top:.8rem;padding:.6rem 1.7rem;border:1px solid var(--maroon);border-radius:999px;color:var(--maroon);text-decoration:none;background:transparent;font:400 1rem Jost,sans-serif;cursor:pointer;transition:background .2s,color .2s}
.eg .btn:hover{background:var(--maroon);color:#fff}
.eg .btn.wa{background:#25d366;border-color:#25d366;color:#fff}
.eg .car{position:relative;max-width:350px;margin:1rem auto}
.eg .frame{position:relative;aspect-ratio:4/5;border:10px solid #fffdf8;box-shadow:0 12px 30px #7a4a3a33;border-radius:6px;overflow:hidden;background:#f3e3da}
.eg .slide{position:absolute;inset:0;opacity:0;transition:opacity .9s}.eg .slide.on{opacity:1}
.eg .slide>img{width:100%;height:100%;object-fit:cover;display:block}.eg .slide>.ph{width:100%;height:100%;border:0;border-radius:0;font-size:1.7rem;padding:1rem;text-align:center}
.eg .cap{margin:.8rem 0 .2rem;font-size:1.7rem;color:var(--rose)}
.eg .arr{position:absolute;top:44%;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:#fffdf8d9;color:var(--maroon);font-size:1.5rem;cursor:pointer;line-height:1}
.eg .arr.l{left:6px}.eg .arr.r{right:6px}
.eg .dots{display:flex;justify-content:center;gap:.4rem;margin-top:.4rem}.eg .dots button{width:8px;height:8px;border-radius:50%;border:0;background:#dec8b8;padding:0;cursor:pointer}.eg .dots button.on{background:var(--rose)}
.eg .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:60;width:42px;height:42px;border-radius:50%;border:1px solid var(--gold);background:#fffaf4;color:var(--maroon);cursor:pointer;font-size:1.1rem}
.eg .conf{position:fixed;inset:0;width:100%;height:100%;z-index:70;pointer-events:none}
.eg footer{position:relative;z-index:2;padding:26px 14px 44px;text-align:center;color:var(--muted)}
.eg button:focus-visible,.eg a:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.eg *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.eg .ev{opacity:1!important;transform:none!important}.eg .ti{opacity:1!important}}
`;

/* ---------- falling rose petals ---------- */
function Petals({ count = 14, fixed }) {
  const items = Array.from({ length: count }, (_, i) => ({
    l: (i * 41 + 7) % 96, d: 9 + ((i * 7) % 8), dl: -((i * 2.3) % 12), s: 14 + ((i * 5) % 14), c: i % 3,
  }));
  const fills = ["#f8b9c0", "#f4a1ae", "#ffd9d2"];
  return (
    <div className={"petals" + (fixed ? " fix" : "")} aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s` }}>
          <svg viewBox="0 0 30 40" width={p.s} style={{ animationDelay: `${p.dl}s` }}>
            <path d="M15 2C28 10 30 26 15 38C0 26 2 10 15 2Z" fill={fills[p.c]} />
            <path d="M15 6C15 16 15 26 15 34" stroke="#fff" strokeOpacity=".45" fill="none" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ---------- reveal on scroll ---------- */
function useInView() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.2, rootMargin: "0px 0px -20px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, show];
}

function EventCard({ event, index }) {
  const [ref, show] = useInView();
  return (
    <div ref={ref} className={`board ev ${index % 2 ? "right" : "left"}${show ? " in" : ""}`}>
      <div className="ico">{event.icon}</div>
      <div><h3>{event.name}</h3><p>{event.when} · {event.where}</p></div>
    </div>
  );
}

/* ---------- countdown ---------- */
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
    parts: [["days", Math.floor(s / 86400)], ["hours", Math.floor((s % 86400) / 3600)], ["minutes", Math.floor((s % 3600) / 60)], ["seconds", s % 60]],
  };
}
function Countdown() {
  const { over, parts } = useCountdown(E.dateISO);
  if (over) return <p className="script" style={{ fontSize: "2.2rem", margin: 0, color: "var(--rose)" }}>Today is the day!</p>;
  return (
    <div className="cd" role="timer" aria-label="Time until the engagement ceremony">
      {parts.map(([l, v]) => (<div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>))}
    </div>
  );
}

/* ---------- photos ---------- */
function Photo({ src, label, className, letter }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className={"ph " + (className || "")}><span>{letter || label}</span></div>;
  return <img className={className} src={src} alt={label} onError={() => setBad(true)} />;
}

function Person({ name, photo, role, lines }) {
  return (
    <div className="person">
      <Photo className="pp" src={photo} label={name} letter={name[0]} />
      <h3>{name}</h3>
      <p className="role">{role}</p>
      {lines.map((t) => <p key={t}>{t}</p>)}
    </div>
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
  const go = (d) => { setHold(true); setI((n) => (n + d + g.length) % g.length); };
  return (
    <div
      className="car"
      onPointerDown={(e) => { x0.current = e.clientX; }}
      onPointerUp={(e) => {
        if (x0.current != null && Math.abs(e.clientX - x0.current) > 40) go(e.clientX < x0.current ? 1 : -1);
        x0.current = null;
      }}
    >
      <div className="frame">
        {g.map((p, k) => (<div key={k} className={"slide" + (k === i ? " on" : "")}><Photo src={p.src} label={p.caption} /></div>))}
        <button type="button" className="arr l" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <button type="button" className="arr r" onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>
      <p className="script cap">{g[i].caption}</p>
      <div className="dots">
        {g.map((_, k) => (<button type="button" key={k} className={k === i ? "on" : ""} onClick={() => { setHold(true); setI(k); }} aria-label={`Photo ${k + 1}`} />))}
      </div>
    </div>
  );
}

/* ---------- petal confetti ---------- */
function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#f8b9c0", "#f4a1ae", "#ffd9d2", "#e8c06a", "#ffffff", "#c9973f"];
    const ps = [];
    const t0 = performance.now();
    let id, n = 0;
    const spawn = () => ({
      x: Math.random() * w, y: -20 * dpr,
      vx: (Math.random() - 0.5) * 1.6 * dpr, vy: (1.6 + Math.random() * 3.4) * dpr,
      r: Math.random() * 6, vr: Math.random() * 0.16 - 0.08,
      s: (7 + Math.random() * 9) * dpr, c: col[n++ % col.length],
      ph: Math.random() * 6, sw: (0.5 + Math.random()) * dpr,
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
        if (p.y > h + 30) { ps.splice(i, 1); continue; }
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

/* ---------- built-in music: soft bansuri-style flute over a tanpura drone (Raag Yaman) ---------- */
function makeSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const out = ctx.createGain();
  out.gain.value = 0.55;
  const echo = ctx.createDelay(0.6);
  const fb = ctx.createGain();
  const wet = ctx.createGain();
  echo.delayTime.value = 0.34; fb.gain.value = 0.38; wet.gain.value = 0.32;
  out.connect(ctx.destination);
  out.connect(echo); echo.connect(fb); fb.connect(echo); echo.connect(wet); wet.connect(ctx.destination);

  [65.41, 98, 130.81, 130.81].forEach((f, i) => {
    const o = ctx.createOscillator(); const l = ctx.createBiquadFilter(); const g = ctx.createGain();
    o.type = "sawtooth"; o.frequency.value = f * (i === 3 ? 1.003 : 1);
    l.type = "lowpass"; l.frequency.value = 420;
    g.gain.value = 0.035;
    o.connect(l); l.connect(g); g.connect(out); o.start();
  });

  const nb = ctx.createBuffer(1, 4410, 44100);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  const sc = [261.63, 293.66, 329.63, 369.99, 392, 440, 493.88, 523.25, 587.33, 659.25];
  const mel = [[4, 3], [5, 1], [6, 2], [7, 2], [6, 1], [5, 1], [4, 2], [2, 2], [3, 1], [2, 1], [1, 2], [0, 4], [2, 2], [4, 2], [6, 2], [8, 2], [7, 2], [6, 2], [5, 1], [4, 1], [2, 3], [0, 4]];

  const flute = (f, at, d) => {
    const o = ctx.createOscillator(); const v = ctx.createOscillator(); const vg = ctx.createGain();
    const g = ctx.createGain(); const bp = ctx.createBiquadFilter();
    o.type = "sine"; o.frequency.setValueAtTime(f * 0.985, at); o.frequency.exponentialRampToValueAtTime(f, at + 0.08);
    v.frequency.value = 5.2; vg.gain.value = f * 0.007; v.connect(vg); vg.connect(o.frequency);
    bp.type = "bandpass"; bp.frequency.value = f * 2; bp.Q.value = 0.7;
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(0.2, at + 0.1);
    g.gain.linearRampToValueAtTime(0.15, at + d * 0.7); g.gain.linearRampToValueAtTime(0, at + d);
    o.connect(g); g.connect(out);
    const s = ctx.createBufferSource(); const ng = ctx.createGain();
    s.buffer = nb; s.loop = true; ng.gain.setValueAtTime(0.035, at); ng.gain.linearRampToValueAtTime(0, at + d);
    s.connect(bp); bp.connect(ng); ng.connect(out);
    o.start(at); v.start(at); s.start(at);
    o.stop(at + d + 0.1); v.stop(at + d + 0.1); s.stop(at + d + 0.1);
  };
  const tabla = (at, hi) => {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.frequency.setValueAtTime(hi ? 180 : 130, at); o.frequency.exponentialRampToValueAtTime(70, at + 0.18);
    g.gain.setValueAtTime(0.18, at); g.gain.exponentialRampToValueAtTime(0.001, at + 0.3);
    o.connect(g); g.connect(out); o.start(at); o.stop(at + 0.35);
  };
  const ting = (at) => {
    const s = ctx.createBufferSource(); const f = ctx.createBiquadFilter(); const g = ctx.createGain();
    s.buffer = nb; f.type = "bandpass"; f.frequency.value = 3400;
    g.gain.setValueAtTime(0.06, at); g.gain.exponentialRampToValueAtTime(0.001, at + 0.05);
    s.connect(f); f.connect(g); g.connect(out); s.start(at);
  };

  const pat = ["B", "t", "t", "b", "t", "t", "B", "t"];
  const dur = 0.4;
  let s = 0, j = 0, next = 0, t = ctx.currentTime + 0.3, timer;
  const run = () => {
    while (t < ctx.currentTime + 1.6) {
      const h = pat[s % 8];
      if (h === "B") tabla(t, 0); else if (h === "b") tabla(t, 1);
      ting(t);
      if (s >= next) {
        const [n, d] = mel[j++ % mel.length];
        flute(sc[n], t, d * dur * 0.97);
        next = s + d;
      }
      t += dur; s++;
    }
    timer = setTimeout(run, 400);
  };
  run();

  const bell = (f, at, d, v) => {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(v, at); g.gain.exponentialRampToValueAtTime(0.0005, at + d);
    o.connect(g); g.connect(ctx.destination); o.start(at); o.stop(at + d + 0.05);
  };

  return {
    pause() { clearTimeout(timer); ctx.suspend(); },
    resume() { ctx.resume(); t = Math.max(t, ctx.currentTime + 0.2); run(); },
    chime() { const n = ctx.currentTime; bell(1568, n, 1.6, 0.14); bell(2093, n + 0.12, 1.4, 0.1); bell(2637, n + 0.26, 1.2, 0.07); },
    get on() { return ctx.state === "running"; },
  };
}

/* ---------- two interlocked rings ---------- */
function Rings() {
  return (
    <svg className="rings" viewBox="0 0 100 60" aria-hidden="true">
      <circle cx="38" cy="34" r="19" fill="none" stroke="#c9973f" strokeWidth="5" />
      <circle cx="62" cy="34" r="19" fill="none" stroke="#e6c06a" strokeWidth="5" />
      <path d="M50 17.5A19 19 0 0 1 50 50.5" fill="none" stroke="#c9973f" strokeWidth="5" />
      <path d="M19 30A19 19 0 0 1 38 15" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      <path transform="translate(38 10) scale(.6)" d="M0 -10L3 -3L10 0L3 3L0 10L-3 3L-10 0L-3 -3Z" fill="#fff3c4" />
      <path transform="translate(62 10) scale(.4)" d="M0 -10L3 -3L10 0L3 3L0 10L-3 3L-10 0L-3 -3Z" fill="#fff3c4" />
    </svg>
  );
}

export default function EngagementPage() {
  const [stage, setStage] = useState("start"); // start → film → main
  const [confetti, setConfetti] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const audio = useRef(null);
  const synth = useRef(null);

  useEffect(() => {
    document.body.style.overflow = stage === "main" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [stage]);
  useEffect(() => () => synth.current && synth.current.pause(), []);

  const startSynth = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (!synth.current) { synth.current = makeSynth(); setPlaying(true); }
    } catch { /* blocked until a user gesture */ }
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

  const begin = () => { play(); setStage("film"); };
  const toMain = () => { setLeaving(false); setStage("main"); };

  // the "film" timeline: chimes at each scene change, then petals and the main page
  useEffect(() => {
    if (stage !== "film") return;
    const ids = [
      setTimeout(() => synth.current && synth.current.chime(), 5000),
      setTimeout(() => synth.current && synth.current.chime(), 13000),
      setTimeout(() => setConfetti((c) => c + 1), (FILM_SECONDS - 1) * 1000),
      setTimeout(() => setLeaving(true), (FILM_SECONDS - 0.8) * 1000),
      setTimeout(toMain, (FILM_SECONDS + 0.8) * 1000),
    ];
    return () => ids.forEach(clearTimeout);
  }, [stage]);

  const ensureMusic = () => { if (!playing) play(); };

  const SITE_URL = "https://www.seankrixtechnologies.com";
  const PAGE_URL = `${SITE_URL}/engagement-invitation`;
  const OG_IMAGE = `${SITE_URL}/og-engagement.webp`; // 1200x630 image in /public
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Engagement Ceremony Invitation | ${E.groom} & ${E.bride}`,
    description: "Interactive 3D-style animated engagement ceremony invitation with cinematic intro, live countdown, event schedule, music and Google Maps QR by Seankrix Technologies, Jaipur.",
    url: PAGE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Seankrix Technologies",
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  };

  const rsvpHref = `https://wa.me/${E.rsvpPhone}?text=${encodeURIComponent(`Namaste! We will be there to bless ${E.groom} & ${E.bride} at their engagement ceremony on ${E.dateLabel} 💍`)}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0e1a30" />
        <title>{`Engagement Ceremony Invitation — ${E.groom} & ${E.bride} | Seankrix Technologies`}</title>
        <meta name="description" content={`You are cordially invited to the engagement ceremony of ${E.groom} & ${E.bride} on ${E.dateLabel} in ${E.city}, ${E.state}. Animated invitation with countdown, schedule and venue map by Seankrix Technologies, Jaipur.`} />
        <meta name="keywords" content="engagement invitation video, animated engagement invitation India, digital engagement card, ring ceremony invitation, Odisha engagement invitation, Seankrix Technologies" />
        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content={`${E.groom} & ${E.bride} — Engagement Ceremony`} />
        <meta property="og:description" content="Every forever begins with a beautiful yes. Open the animated invitation to the engagement ceremony." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Animated engagement ceremony invitation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={`${E.groom} & ${E.bride} — Engagement Invitation`} />
        <meta name="twitter:description" content="Animated engagement ceremony invitation with countdown, schedule and venue QR." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="eg">
        <style>{css}</style>
        {E.music && <audio ref={audio} src={E.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "start" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}

        {/* 0. poster: Ganesha ji with a play button, like the video's first frame */}
        {stage === "start" && (
          <div className="full">
            <div className="reel">
              <div className="sc" dangerouslySetInnerHTML={{ __html: SCENE.start }} />
              <Petals count={10} />
              <button type="button" className="play" onClick={begin} aria-label="Play the engagement invitation">
                <b />
                <span>Tap to open the invitation</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. the film: Ganesha → invitation board → couple under the rose arch */}
        {stage === "film" && (
          <div className={"full" + (leaving ? " fadeout" : "")}>
            <div className="reel">
              <div className="sc scC" dangerouslySetInnerHTML={{ __html: SCENE.c }} />
              <div className="sc scB" dangerouslySetInnerHTML={{ __html: SCENE.b }} />
              <div className="sc scA" dangerouslySetInnerHTML={{ __html: SCENE.a }} />
              <Petals count={16} />
              <div className="bar"><i /></div>
              <button type="button" className="skip" onClick={toMain}>Skip ›</button>
            </div>
          </div>
        )}

        {/* 2. the full invitation page */}
        {stage === "main" && (
          <main onPointerDown={ensureMusic}>
            <Petals count={9} fixed />

            <div className="hero">
              <div className="arch" dangerouslySetInnerHTML={{ __html: SCENE.arch }} />
              <p className="hi" style={{ fontSize: "1.45rem", color: "var(--maroon)", margin: "-6px 0 0" }}>{E.blessing}</p>
              {E.odiaWelcome && <p className="od" style={{ fontSize: "1.05rem", color: "var(--gold)", margin: "2px 0 8px", fontWeight: 600 }}>{E.odiaWelcome}</p>}
              <p className="sf it muted" style={{ margin: 0, fontSize: "1.1rem" }}>We cordially invite you for the</p>
              <h1 className="occ">Engagement Ceremony</h1>
              <p className="names">{E.groom} <span>&amp;</span> {E.bride}</p>
              <Rings />
              <p style={{ margin: "6px 0 0", fontWeight: 400, fontSize: "1.15rem" }}>{E.day}, {E.dateLabel}</p>
              <p className="muted" style={{ margin: 0 }}>{E.time} · {E.city}, {E.state}</p>
            </div>

            <section>
              <h2>Counting down to our “yes”</h2>
              <div className="orn">❖ ✦ ❖</div>
              <Countdown />
            </section>

            <section>
              <h2>Two families, one beginning</h2>
              <div className="orn">❖ ✦ ❖</div>
              <div className="fam">
                <Person name={E.groom} photo={E.groomPhoto} role="Son of" lines={[E.groomFather, `& ${E.groomMother}`]} />
                <div className="mono" aria-hidden="true">{E.initials}</div>
                <Person name={E.bride} photo={E.bridePhoto} role="Daughter of" lines={[E.brideFather, `& ${E.brideMother}`]} />
              </div>
            </section>

            <section>
              <h2>The celebration</h2>
              <div className="orn">❖ ✦ ❖</div>
              <div className="plan">
                {E.events.map((e, i) => <EventCard key={e.name} event={e} index={i} />)}
              </div>
              <p className="muted" style={{ marginTop: 18 }}>Dress code: <span className="sf it" style={{ color: "var(--maroon)" }}>{E.dress}</span></p>
            </section>

            <section>
              <h2>Venue</h2>
              <div className="orn">❖ ✦ ❖</div>
              <div className="board">
                <p style={{ margin: 0 }}>{E.venue}</p>
                <div className="qr">
                  <QRCodeSVG value={E.mapUrl} size={150} level="M" bgColor="#ffffff" fgColor="#4d2e2a" title="Scan for the venue location" />
                </div>
                <p className="sf it muted" style={{ margin: 0 }}>Scan for directions</p>
                <a className="btn" href={E.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
              </div>
            </section>

            <section>
              <h2>Our story</h2>
              <p className="sf it muted" style={{ fontSize: "1.2rem", margin: 0 }}>{E.storyTag}</p>
              <Carousel />
              <p style={{ maxWidth: 500, margin: "10px auto 0" }}>{E.story}</p>
            </section>

            <section>
              <h2>Will you bless us?</h2>
              <div className="orn">❖ ✦ ❖</div>
              <div className="board">
                <p style={{ margin: "0 0 4px" }}>Kindly confirm by <b>{E.rsvpBy}</b>.</p>
                <a className="btn wa" href={rsvpHref} target="_blank" rel="noreferrer">Reply on WhatsApp</a>
              </div>
            </section>

            <footer>
              <p className="script" style={{ fontSize: "2.3rem", color: "var(--rose)", margin: 0 }}>{E.groom} &amp; {E.bride}</p>
              <p style={{ margin: "4px 0 0" }}>{E.dateLabel} · {E.city}, {E.state}</p>
            </footer>
          </main>
        )}
      </div>
    </>
  );
}