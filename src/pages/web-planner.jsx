import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react
import cardimage from "../asstes/invitation_envelope_open.svg";

/* ================= EDIT YOUR DETAILS HERE ================= */
const W = {
  groom: "Aarav",
  bride: "Meera",
  initials: "A | M",
  blessing: "॥ ॐ श्री महावीराय नमः ॥", // change or leave "" to hide
  dateLabel: "14 February 2027",
  dateShort: "14 · 02 · 2027",
  dateISO: "2027-02-14T18:00:00", // used for the live countdown
  day: "Sunday",
  city: "Jaipur",
  venue: "Rambagh Palace, Jaipur, Rajasthan",
  mapUrl: "https://maps.google.com/?q=Rambagh+Palace+Jaipur",
  groomFamily: ["Son of", "Mr. Rajesh Sharma", "& Mrs. Sunita Sharma", "Sharma family, Jaipur"],
  brideFamily: ["Daughter of", "Mr. Anil Verma", "& Mrs. Kavita Verma", "Verma family, Jaipur"],
  events: [
    { icon: "🌼", name: "Haldi", when: "12 Feb · 11:00 am", where: "Family Haveli, Jaipur" },
    { icon: "🪔", name: "Mehndi & Sangeet", when: "12 Feb · 7:00 pm", where: "The Garden Pavilion" },
    { icon: "🔥", name: "Baraat & Pheras", when: "14 Feb · 6:00 pm", where: "The Lawns, Rambagh Palace" },
    { icon: "✨", name: "Reception", when: "14 Feb · 9:00 pm", where: "The Grand Ballroom" },
  ],
  // Next.js handles SVG imports as either string or { src: "..." }
  openImage: typeof cardimage === "string" ? cardimage : cardimage?.src || "/assets/invitation_envelope_open.svg",
  cardImage: "", // optional custom image behind scratch panel (leave "" to use the built-in Jaipur scenic arch)
  music: "", // e.g. "/wedding-song.mp3" (mp3 in /public). Empty (or a missing file) = built-in shehnai + dholak music
  groomPhoto: "/assets/groom.jpg", // portraits in /public/assets
  bridePhoto: "/assets/bride.jpg",
  storyTag: "Some chapters are written by destiny",
  story: "After seven years, two cities and one very opinionated dog named Moti, we are getting married, and we cannot imagine the day without you.",
  gallery: [
    // add or remove photos freely (put files in /public/assets)
    { src: "/assets/its.png", caption: "Where it all began" },
    { src: "/assets/photo2.jpg", caption: "Our favourite memories" },
    { src: "/assets/photo3.jpg", caption: "The proposal" },
    { src: "/assets/photo4.jpg", caption: "And now, forever" },
  ],
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Jost:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Tiro+Devanagari+Hindi&display=swap');
.wi{--cream:#fbf1e6;--ink:#4a2f2a;--gold:#b48a4a;--pink:#e08f80;--maroon:#7a1f2b;--mari:#f2a900;--muted:#8a6e63;
 font:300 1.05rem/1.7 Jost,system-ui,sans-serif;color:var(--ink);background:var(--cream);min-height:100vh;overflow-x:hidden}
.wi *{box-sizing:border-box}.wi h1,.wi h2,.wi h3,.wi .sf{font-family:"Playfair Display",Georgia,serif;font-weight:400;margin:0}
.wi .script{font-family:"Great Vibes","Playfair Display",cursive}.wi .hi{font-family:"Tiro Devanagari Hindi",serif}
.wi .sf-i{font-style:italic}.wi .muted{color:var(--muted)}
.wi .full{position:fixed;inset:0;z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:#f6e6dc}
.wi .fade{animation:wi-in 1s both}@keyframes wi-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.wi .stage{position:relative;height:100%;width:100%;max-width:520px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.wi .stage>img,.wi .stage>.invite-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.wi .envimg{cursor:pointer}
.wi .envimg.go img{animation:wi-zoom 1.8s .15s ease-in forwards}
@keyframes wi-zoom{0%{transform:scale(1);opacity:1}60%{opacity:1}100%{transform:scale(1.5);opacity:0}}
.wi .panel{position:relative;z-index:2;width:82%;padding:20px 14px;background:#fdf6eee8;backdrop-filter:blur(6px);border:1px solid var(--gold);border-radius:110px 110px 20px 20px;box-shadow:0 14px 44px #5a2c2033,inset 0 0 0 5px #fdf6eecc,inset 0 0 0 6px #b48a4a66}
.wi .crest{width:54px;height:54px;margin:0 auto 8px;border-radius:50%;border:1.5px solid var(--gold);background:#fffaf4;display:flex;align-items:center;justify-content:center;font:italic 500 1.05rem "Playfair Display",Georgia,serif;color:#9a7433;box-shadow:0 0 0 3px #fdf6ee,0 0 0 4px #b48a4a55}
.wi .names{font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(1.9rem,7.8vw,2.7rem);line-height:1.2;color:#7a1f2b}
.wi .couple{font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(2rem,8.5vw,3.1rem);line-height:1.25;color:#9a7433;margin:6px 0}
.wi .tag{letter-spacing:.22em;font-size:.66rem;font-weight:500;color:var(--muted);margin:6px 0 10px}
.wi .scr{position:relative;width:min(275px,100%);height:104px;margin:10px auto;border-radius:10px;overflow:hidden;background:#fffaf4;border:1px solid var(--gold);display:flex;flex-direction:column;align-items:center;justify-content:center}
.wi .scr canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab;transition:opacity 1s}.wi .scr canvas.off{opacity:0;pointer-events:none}
.wi .gates{z-index:45;pointer-events:none;background:transparent}
.wi .door{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(135deg,#e9a89b,#c8675c);border:6px double var(--gold);display:flex;align-items:center;justify-content:center;font:4.5rem "Great Vibes",serif;color:#fff3e0;backface-visibility:hidden}
.wi .door.l{left:0;transform-origin:left center;border-radius:0 140px 0 0}.wi .door.r{right:0;transform-origin:right center;border-radius:140px 0 0 0}
.wi .open .l{animation:wi-dl 1.6s .3s cubic-bezier(.5,-0.3,.2,1.3) forwards}.wi .open .r{animation:wi-dr 1.6s .3s cubic-bezier(.5,-0.3,.2,1.3) forwards}
@keyframes wi-dl{to{transform:perspective(900px) rotateY(-105deg)}}@keyframes wi-dr{to{transform:perspective(900px) rotateY(105deg)}}
.wi main{background-color:var(--cream);background-image:radial-gradient(circle at 20px 20px,#e08f8030 2px,transparent 3px);background-size:40px 40px}
.wi .hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:56px 12px 240px;background:linear-gradient(#fbe0cc,#fdeee0 70%,transparent);overflow:hidden}
.wi .toran{position:absolute;top:0;left:0;width:100%;height:56px}
.wi .palace{position:absolute;bottom:0;margin-top:2rem;left:50%;transform:translateX(-50%);width:min(100%,640px)}
.wi .fam{display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:620px;width:100%;position:relative}
.wi .fam div{background:#fff7efdd;border:1px solid #b48a4a77;border-radius:80px 80px 14px 14px;padding:20px 12px}
.wi .fam h3{font-size:1.7rem;font-style:italic;color:var(--maroon)}
.wi section{max-width:720px;margin:0 auto;padding:20px 12px;text-align:center}
.wi h2{font-size:clamp(1.85rem,6vw,2.4rem);font-style:italic;margin-bottom:.8rem;color:var(--maroon);line-height:1.2}
.wi .orn{color:var(--gold);letter-spacing:.6em;margin:.2rem 0 .8rem}
.wi .arch{background:#fff7ef;border:2px double var(--gold);border-radius:100px 100px 14px 14px;padding:20px 12px;margin:12px 0;box-shadow:0 6px 20px #b4614a22}
.wi .arch h3{font-size:1.55rem;font-style:italic;color:var(--maroon)}
.wi .events-list{position:relative;display:flex;flex-direction:column;gap:16px;margin-top:8px}
.wi .events-list::before{content:"";position:absolute;top:24px;bottom:24px;left:50%;width:1px;border-left:1.5px dashed #b48a4a66;transform:translateX(-50%);pointer-events:none}
.wi .ev-card{position:relative;width:min(88%,470px);margin:0;opacity:0;transition:opacity .75s ease,transform .8s cubic-bezier(.22,1,.36,1)}
.wi .ev-card.left{align-self:flex-start;transform:translateX(-52px)}
.wi .ev-card.right{align-self:flex-end;transform:translateX(52px)}
.wi .ev-card.in{opacity:1;transform:translateX(0)}
.wi .ev-art{display:flex;justify-content:center;margin:0 auto 8px}
.wi .ev-art svg{width:96px;height:70px;display:block;overflow:visible}
.wi .photo{width:min(92%,380px);aspect-ratio:3/4;object-fit:cover;border-radius:190px 190px 16px 16px;border:6px double var(--gold);margin:1rem auto;display:block;background:#f3e3da}
.wi .btn{display:inline-block;margin-top:.8rem;padding:.6rem 1.6rem;border:1px solid var(--maroon);border-radius:999px;color:var(--maroon);text-decoration:none}
.wi .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:60;width:42px;height:42px;border-radius:50%;border:1px solid var(--gold);background:#fffaf4;cursor:pointer;font-size:1.1rem}
.wi .conf{position:fixed;inset:0;width:100%;height:100%;z-index:70;pointer-events:none}
.wi footer{padding:20px 12px;text-align:center;color:var(--muted)}
.wi .qr{display:inline-block;margin:1rem 0 .2rem;padding:12px;background:#fff;border:2px double var(--gold);border-radius:14px;line-height:0}
.wi .qr-cap{margin:.2rem 0 0;font-size:.95rem}
.wi .cd{display:flex;justify-content:center;gap:1rem;margin:.6rem 0}
.wi .cd div{min-width:60px}.wi .cd b{display:block;font:400 2.4rem "Playfair Display",Georgia,serif;color:var(--maroon);line-height:1.1}.wi .cd span{font-size:.75rem;color:var(--muted)}
.wi .cd.sm{gap:.5rem}.wi .cd.sm div{min-width:48px}.wi .cd.sm b{font-size:1.6rem;color:#9a7433}.wi .cd.sm span{font-size:.65rem}
.wi .fam2{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;max-width:640px;width:100%;margin:0 auto;position:relative}
.wi .person{background:#fff7efdd;border:1px solid #b48a4a55;border-radius:110px 110px 16px 16px;padding:20px 12px}
.wi .person h3{font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:500;font-size:1.9rem;color:var(--maroon);line-height:1.2;margin:.5rem 0 .3rem}
.wi .person p{margin:.12rem 0;font-size:.95rem;line-height:1.45}.wi .person .role{font-style:italic;color:var(--muted)}
.wi .pp,.wi .ph{width:104px;height:130px;border-radius:60px 60px 8px 8px;border:3px double var(--gold);margin:0 auto;display:block;object-fit:cover}
.wi .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#f6cfc4,#e9a89b);color:#fff;font-size:2.4rem}
.wi .mono{align-self:center;width:56px;height:56px;border-radius:50%;border:1px solid var(--gold);display:flex;align-items:center;justify-content:center;color:var(--gold);background:var(--cream);font:italic 1.05rem "Playfair Display",Georgia,serif}
@media (max-width:600px){
 .wi .hero{padding:52px 12px 220px}
 .wi .fam2{grid-template-columns:1fr;max-width:330px;gap:10px}
 .wi .mono{justify-self:center;margin:-4px 0}
}
.wi .car{position:relative;max-width:360px;margin:1.2rem auto}
.wi .frame{position:relative;aspect-ratio:4/5;border:10px solid #fffdf8;box-shadow:0 12px 30px #7a4a3a33;border-radius:6px;overflow:hidden;background:#f3e3da}
.wi .slide{position:absolute;inset:0;opacity:0;transition:opacity .9s}.wi .slide.on{opacity:1}
.wi .slide>img{width:100%;height:100%;object-fit:cover;display:block}
.wi .slide>.ph{width:100%;height:100%;border:0;border-radius:0;display:flex;font-size:1.8rem;padding:1rem;text-align:center}
.wi .cap{margin:.8rem 0 .2rem;font-size:1.3rem}
.wi .arr{position:absolute;top:44%;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:#fffdf8d9;color:var(--maroon);font-size:1.5rem;cursor:pointer;line-height:1}
.wi .arr.l{left:6px}.wi .arr.r{right:6px}
.wi .dots{display:flex;justify-content:center;gap:.4rem;margin-top:.4rem}.wi .dots button{width:8px;height:8px;border-radius:50%;border:0;background:#d9c4b4;padding:0;cursor:pointer}.wi .dots button.on{background:var(--maroon)}
.wi button:focus-visible,.wi a:focus-visible,.wi .envimg:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.wi *{animation-duration:.01s!important;animation-delay:0s!important;transition-duration:.01s!important}.wi .ev-card{opacity:1!important;transform:none!important}}
`;

/* ---------- Jaipur Royal Scenic Backdrop for the Scratch-Card Invite Screen ---------- */
function JaipurInviteScene() {
  return (
    <svg className="invite-bg" viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="j-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9dcc9" />
          <stop offset="50%" stopColor="#fdeee0" />
          <stop offset="100%" stopColor="#f5c6b3" />
        </linearGradient>
        <linearGradient id="j-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8a39d" />
          <stop offset="45%" stopColor="#b87e7f" />
          <stop offset="100%" stopColor="#8c545b" />
        </linearGradient>
      </defs>
      <rect width="400" height="720" fill="url(#j-sky)" />
      <circle cx="200" cy="180" r="110" fill="#fff4e4" opacity="0.55" />
      <path d="M0 520Q90 465 185 505Q290 450 400 500V590H0Z" fill="#eab7a7" opacity="0.65" />
      <g fill="#e39d8f" stroke="#b4614a" strokeWidth="1">
        <rect x="0" y="450" width="96" height="145" />
        <path d="M12 450Q34 420 56 450Z" fill="#c8675c" />
        <path d="M56 450Q76 426 96 450Z" fill="#c8675c" />
        <path d="M34 428V415" stroke="#b48a4a" strokeWidth="1.5" />
        <circle cx="34" cy="414" r="3" fill="#f2a900" />
        {[18, 42, 68].map((x) => (
          <path key={x} d={`M${x} 540V480a8 10 0 0 1 16 0V540Z`} fill="#fdeee0" />
        ))}
        <rect x="298" y="440" width="102" height="155" />
        <path d="M306 440Q348 400 390 440Z" fill="#c8675c" />
        <path d="M348 408V394" stroke="#b48a4a" strokeWidth="1.5" />
        <circle cx="348" cy="393" r="3" fill="#f2a900" />
        {[314, 340, 366].map((x) => (
          <path key={x} d={`M${x} 540V474a8 10 0 0 1 16 0V540Z`} fill="#fdeee0" />
        ))}
      </g>
      <rect x="0" y="585" width="400" height="135" fill="url(#j-water)" />
      <g stroke="#ffe6c7" strokeWidth="1.4" opacity="0.55">
        <line x1="35" y1="615" x2="115" y2="615" />
        <line x1="265" y1="628" x2="360" y2="628" />
        <line x1="120" y1="652" x2="270" y2="652" />
        <line x1="65" y1="680" x2="165" y2="680" />
        <line x1="230" y1="695" x2="335" y2="695" />
      </g>
      <g transform="translate(152,612)">
        <path d="M8 24Q48 36 88 24L80 14H16Z" fill="#7a1f2b" stroke="#f2c97d" strokeWidth="1.2" />
        <path d="M34 14V4H62V14" fill="none" stroke="#f2c97d" strokeWidth="1.2" />
        <path d="M30 4Q48 -6 66 4Z" fill="#e8761c" />
      </g>
      {[[68, 652], [332, 666]].map(([lx, ly], idx) => (
        <g key={idx} transform={`translate(${lx},${ly})`}>
          <ellipse cx="0" cy="6" rx="16" ry="4" fill="#4a7c59" opacity="0.85" />
          <path d="M-10 4Q-4 -10 0 4Q4 -10 10 4Z" fill="#f4b6c0" stroke="#c8675c" strokeWidth="0.8" />
          <path d="M-5 4Q0 -13 5 4Z" fill="#fce4ec" />
        </g>
      ))}
      <path d="M0 0H400V720H376V150Q376 62 200 44Q24 62 24 150V720H0Z" fill="#f9e6d8" opacity="0.55" />
      <path d="M22 720V145Q22 58 200 38Q378 58 378 145V720" fill="none" stroke="#b48a4a" strokeWidth="2.5" />
      <path d="M30 720V150Q30 68 200 48Q370 68 370 150V720" fill="none" stroke="#7a1f2b" strokeWidth="1" strokeDasharray="4 4" />
      {[75, 130, 270, 325].map((bx, i) => (
        <g key={bx}>
          <line x1={bx} y1="20" x2={bx} y2={i === 1 || i === 2 ? 78 : 102} stroke="#b48a4a" strokeWidth="1.4" />
          <circle cx={bx} cy={i === 1 || i === 2 ? 54 : 68} r="2.5" fill="#fff3e0" />
          <path d={`M${bx - 6} ${i === 1 || i === 2 ? 84 : 108}Q${bx} ${i === 1 || i === 2 ? 72 : 96} ${bx + 6} ${i === 1 || i === 2 ? 84 : 108}Z`} fill="#d9a441" stroke="#8a5a19" strokeWidth="1" />
        </g>
      ))}
      <g>
        {[[34, 48], [62, 32], [112, 22], [160, 14], [240, 14], [288, 22], [338, 32], [366, 48], [18, 120], [382, 120], [16, 195], [384, 195]].map(([x, y], idx) => (
          <ellipse key={idx} cx={x} cy={y} rx="14" ry="7" transform={`rotate(${idx % 2 ? 32 : -32} ${x} ${y})`} fill="#4a7c59" />
        ))}
        {[
          [20, 24, 18, "#f2a900"], [54, 18, 15, "#e8761c"], [90, 22, 16, "#f4b6c0"], [130, 14, 15, "#f2a900"],
          [170, 16, 14, "#e08f80"], [200, 14, 17, "#f2a900"], [230, 16, 14, "#e08f80"], [270, 14, 15, "#f2a900"],
          [310, 22, 16, "#f4b6c0"], [346, 18, 15, "#e8761c"], [380, 24, 18, "#f2a900"],
          [16, 70, 14, "#e8761c"], [18, 108, 13, "#f2a900"], [14, 150, 14, "#f4b6c0"], [16, 186, 11, "#f2a900"],
          [384, 70, 14, "#e8761c"], [382, 108, 13, "#f2a900"], [386, 150, 14, "#f4b6c0"], [384, 186, 11, "#f2a900"],
        ].map(([cx, cy, r, fill], idx) => (
          <g key={idx}>
            <circle cx={cx} cy={cy} r={r} fill={fill} stroke="#b4614a" strokeWidth="0.8" />
            <circle cx={cx} cy={cy} r={r * 0.4} fill="#7a1f2b" opacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Jaipur art: marigold toran + Hawa Mahal ---------- */
function Toran() {
  const k = [];
  for (let i = 0; i <= 40; i++) {
    const x = i * 10;
    k.push(<circle key={i} cx={x} cy={8 + 16 * Math.sin(((x % 100) / 100) * Math.PI)} r="6" fill={i % 2 ? "#f2a900" : "#e8761c"} />);
  }
  for (let i = 0; i <= 4; i++) {
    k.push(
      <g key={"p" + i}>
        <path d={`M${i * 100} 8V34`} stroke="#b48a4a" />
        <circle cx={i * 100} cy="38" r="5" fill="#b48a4a" />
      </g>
    );
  }
  return <svg className="toran" viewBox="0 0 400 50" preserveAspectRatio="none" aria-hidden="true">{k}</svg>;
}

const TIERS = [[40, 205, 320, 55, 8], [80, 160, 240, 45, 6], [115, 118, 170, 42, 4], [148, 78, 104, 40, 3], [175, 40, 50, 38, 2]];
function Palace() {
  return (
    <svg className="palace" viewBox="0 0 400 265" aria-hidden="true">
      <rect x="0" y="258" width="400" height="7" fill="#c8675c" />
      {TIERS.map(([x, y, w, h, n], t) => (
        <g key={t}>
          <rect x={x} y={y} width={w} height={h} fill={t % 2 ? "#e9a090" : "#e08f80"} stroke="#b4614a" strokeWidth="1" />
          <path d={`M${x - 4} ${y}a${(w + 8) / 2} 12 0 0 1 ${w + 8} 0Z`} fill="#c8675c" />
          {Array.from({ length: n }).map((_, i) => {
            const wx = x + (w / n) * (i + 0.5) - 6;
            return <path key={i} d={`M${wx} ${y + h - 4}V${y + 18}a6 7 0 0 1 12 0V${y + h - 4}Z`} fill="#fdeee0" stroke="#b4614a" />;
          })}
        </g>
      ))}
      <path d="M200 40V24" stroke="#b48a4a" strokeWidth="2" />
      <circle cx="200" cy="22" r="4" fill="#b48a4a" />
    </svg>
  );
}

/* ---------- Indian cultural SVG illustrations for each celebration ---------- */
function EventArt({ name, index }) {
  const n = name.toLowerCase();
  if (n.includes("haldi") || index === 0) {
    return (
      <svg viewBox="0 0 120 84" aria-hidden="true">
        <path d="M22 68Q60 76 98 68" stroke="#b48a4a" strokeWidth="1.5" fill="none" />
        <path d="M26 52C14 44 14 34 28 38C24 44 25 48 26 52Z" fill="#4a7c59" />
        <path d="M94 52C106 44 106 34 92 38C96 44 95 48 94 52Z" fill="#4a7c59" />
        <g fill="#f2a900" stroke="#e8761c" strokeWidth="1">
          <circle cx="27" cy="57" r="9" />
          <circle cx="93" cy="57" r="9" />
        </g>
        <circle cx="27" cy="57" r="3.5" fill="#7a1f2b" />
        <circle cx="93" cy="57" r="3.5" fill="#7a1f2b" />
        <path d="M40 44Q60 22 80 44Z" fill="#f2a900" />
        <path d="M45 44Q60 28 75 44Z" fill="#ffca28" />
        <circle cx="60" cy="24" r="3" fill="#7a1f2b" />
        <path d="M35 44H85C83 62 72 68 60 68C48 68 37 62 35 44Z" fill="#d9a441" stroke="#8a5a19" strokeWidth="1.4" />
        <ellipse cx="60" cy="44" rx="25" ry="4" fill="#ecd29c" stroke="#8a5a19" strokeWidth="1.2" />
        <path d="M48 68H72L75 72H45Z" fill="#b48a4a" />
      </svg>
    );
  }
  if (n.includes("mehndi") || n.includes("sangeet") || index === 1) {
    return (
      <svg viewBox="0 0 120 84" aria-hidden="true">
        <path d="M60 10C46 18 42 32 50 42C55 48 65 48 70 42C78 32 74 18 60 10Z" fill="#e9f0e6" stroke="#3f6a47" strokeWidth="1.5" />
        <path d="M60 17C52 23 50 32 55 37C58 40 62 40 65 37C70 32 68 23 60 17Z" fill="none" stroke="#b48a4a" strokeWidth="1.2" />
        <circle cx="60" cy="28" r="3" fill="#7a1f2b" />
        <circle cx="42" cy="24" r="2" fill="#3f6a47" />
        <circle cx="78" cy="24" r="2" fill="#3f6a47" />
        <g transform="rotate(-8 60 58)">
          <ellipse cx="60" cy="58" rx="28" ry="15" fill="#9e342b" stroke="#5e1914" strokeWidth="1.4" />
          <path d="M37 47L49 69L59 44L69 69L82 47" fill="none" stroke="#f2c97d" strokeWidth="1.6" />
          <ellipse cx="33" cy="58" rx="5" ry="13.5" fill="#fdf1dc" stroke="#8a5a19" strokeWidth="1.4" />
          <ellipse cx="87" cy="58" rx="5" ry="13.5" fill="#fdf1dc" stroke="#8a5a19" strokeWidth="1.4" />
          <ellipse cx="87" cy="58" rx="2.5" ry="6" fill="#4a2f2a" />
        </g>
        <path d="M23 36V22L31 20V32" fill="none" stroke="#7a1f2b" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="21" cy="36" r="2.5" fill="#7a1f2b" />
        <circle cx="29" cy="32" r="2.5" fill="#7a1f2b" />
        <path d="M92 34V22L99 24V34" fill="none" stroke="#b48a4a" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="90" cy="34" r="2.3" fill="#b48a4a" />
      </svg>
    );
  }
  if (n.includes("baraat") || n.includes("phera") || index === 2) {
    return (
      <svg viewBox="0 0 120 84" aria-hidden="true">
        <path d="M22 72V34Q22 14 60 12Q98 14 98 34V72" fill="none" stroke="#b48a4a" strokeWidth="1.8" />
        <path d="M26 26Q43 34 60 24Q77 34 94 26" fill="none" stroke="#e8761c" strokeWidth="2.2" strokeDasharray="3 3" />
        {[24, 96].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 6} 56Q${cx} 48 ${cx + 6} 56`} fill="#4a7c59" />
            <circle cx={cx} cy="55" r="3.5" fill="#8b5a2b" />
            <ellipse cx={cx} cy="64" rx="7" ry="6" fill="#d9822b" stroke="#7a1f2b" strokeWidth="1.2" />
            <rect x={cx - 4} y="57" width="8" height="2.5" rx="1" fill="#b48a4a" />
          </g>
        ))}
        <path d="M60 22C51 34 48 44 60 50C72 44 69 34 60 22Z" fill="#e8761c" />
        <path d="M60 29C55 37 54 44 60 49C66 44 65 37 60 29Z" fill="#f2a900" />
        <path d="M60 36C57 41 57 46 60 49C63 46 63 41 60 36Z" fill="#fff3b0" />
        <path d="M40 50H80L74 60H46Z" fill="#b4614a" stroke="#7a1f2b" strokeWidth="1.3" />
        <path d="M44 60H76L71 68H49Z" fill="#c8675c" stroke="#7a1f2b" strokeWidth="1.3" />
        <path d="M46 68H74V72H46Z" fill="#b48a4a" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 84" aria-hidden="true">
      <path d="M24 72V42C24 22 44 16 60 10C76 16 96 22 96 42V72" fill="#fdf2e7" stroke="#b48a4a" strokeWidth="1.8" />
      <path d="M32 70V43C32 28 48 23 60 18C72 23 88 28 88 43V70" fill="none" stroke="#7a1f2b" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M34 36Q60 44 86 36" fill="none" stroke="#b48a4a" strokeWidth="1.2" />
      <circle cx="60" cy="40" r="2.2" fill="#7a1f2b" />
      <path d="M60 39C57 45 57 50 60 52C63 50 63 45 60 39Z" fill="#f2a900" />
      <path d="M44 56C49 49 56 50 60 56C64 50 71 49 76 56C72 64 48 64 44 56Z" fill="#d4577a" stroke="#7a1f2b" strokeWidth="1.2" />
      <path d="M38 62H82C77 69 43 69 38 62Z" fill="#d9a441" stroke="#8a5a19" strokeWidth="1.2" />
      <path d="M20 22L22 26L26 28L22 30L20 34L18 30L14 28L18 26Z" fill="#f2a900" />
      <path d="M100 22L102 26L106 28L102 30L100 34L98 30L94 28L98 26Z" fill="#f2a900" />
      <circle cx="60" cy="6" r="2.4" fill="#b48a4a" />
    </svg>
  );
}

function EventCard({ event, index }) {
  const ref = useRef(null);
  // Start false on both SSR and client to prevent Next.js hydration mismatch
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -20px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const side = index % 2 === 0 ? "left" : "right";
  return (
    <div ref={ref} className={`arch ev-card ${side}${show ? " in" : ""}`}>
      <div className="ev-art">
        <EventArt name={event.name} index={index} />
      </div>
      <h3>{event.name}</h3>
      <p className="muted" style={{ margin: 0 }}>
        {event.when}
        <br />
        {event.where}
      </p>
    </div>
  );
}

/* ---------- Live countdown (SSR-safe for Next.js) ---------- */
function useCountdown(iso) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now === null) {
    return {
      over: false,
      parts: [["days", 0], ["hours", 0], ["minutes", 0], ["seconds", 0]],
    };
  }

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

function Countdown({ small }) {
  const { over, parts } = useCountdown(W.dateISO);
  if (over) return <p className="couple" style={{ fontSize: "2rem", margin: 0 }}>Today is the day!</p>;
  return (
    <div className={"cd" + (small ? " sm" : "")} role="timer" aria-label="Time until the wedding">
      {parts.map(([l, v]) => (
        <div key={l}>
          <b>{String(v).padStart(2, "0")}</b>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Photos: image with a pretty placeholder if the file is missing ---------- */
function Photo({ src, label, className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className={"ph " + (className || "")}><span className="sf sf-i">{label}</span></div>;
  return <img className={className} src={src} alt={label} onError={() => setBad(true)} />;
}

function Person({ name, photo, lines }) {
  return (
    <div className="person">
      <Photo className="pp" src={photo} label={name[0]} />
      <h3>{name}</h3>
      {lines.map((t, k) => <p key={t} className={k === 0 ? "role" : ""}>{t}</p>)}
    </div>
  );
}

function Carousel() {
  const g = W.gallery;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const x0 = useRef(null);

  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((n) => (n + 1) % g.length), 4500);
    return () => clearInterval(t);
  }, [hold, g.length]);

  const go = (d) => {
    setHold(true);
    setI((n) => (n + d + g.length) % g.length);
  };

  return (
    <div
      className="car"
      onPointerDown={(e) => { x0.current = e.clientX; }}
      onPointerUp={(e) => {
        if (x0.current != null && Math.abs(e.clientX - x0.current) > 40) {
          go(e.clientX < x0.current ? 1 : -1);
        }
        x0.current = null;
      }}
    >
      <div className="frame">
        {g.map((p, k) => (
          <div key={k} className={"slide" + (k === i ? " on" : "")}>
            <Photo src={p.src} label={p.caption} />
          </div>
        ))}
        <button type="button" className="arr l" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <button type="button" className="arr r" onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>
      <p className="sf sf-i cap">{g[i].caption}</p>
      <div className="dots">
        {g.map((_, k) => (
          <button
            type="button"
            key={k}
            className={k === i ? "on" : ""}
            onClick={() => { setHold(true); setI(k); }}
            aria-label={`Photo ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Scratch card ---------- */
function Scratch({ onDone, onStart }) {
  const ref = useRef(null);
  const st = useRef({ down: false, n: 0, done: false });
  const [off, setOff] = useState(false);

  useEffect(() => {
    const x = ref.current.getContext("2d");
    const g = x.createLinearGradient(0, 0, 580, 220);
    g.addColorStop(0, "#b98c43");
    g.addColorStop(0.5, "#ecd29c");
    g.addColorStop(1, "#b98c43");
    x.fillStyle = g;
    x.fillRect(0, 0, 580, 220);
    x.fillStyle = "#fff";
    x.textAlign = "center";
    x.font = "500 26px Jost,sans-serif";
    x.fillText("✦ SCRATCH TO REVEAL ✦", 290, 100);
    x.font = "italic 30px 'Playfair Display',serif";
    x.fillText("our special day", 290, 142);
  }, []);

  const scratch = (e) => {
    const s = st.current;
    if (!s.down || s.done) return;
    const c = ref.current;
    const r = c.getBoundingClientRect();
    const x = c.getContext("2d");
    x.globalCompositeOperation = "destination-out";
    x.beginPath();
    x.arc(((e.clientX - r.left) * 580) / r.width, ((e.clientY - r.top) * 220) / r.height, 30, 0, 7);
    x.fill();
    if (++s.n % 8 === 0) {
      const d = x.getImageData(0, 0, 580, 220).data;
      let t = 0;
      for (let i = 3; i < d.length; i += 160) if (d[i] === 0) t++;
      if (t / (d.length / 160) > 0.45) {
        s.done = true;
        setOff(true);
        onDone();
      }
    }
  };

  return (
    <div className="scr">
      <div className="sf" style={{ fontSize: "1.9rem", color: "#9a7433" }}>{W.dateShort}</div>
      <div className="muted" style={{ fontSize: ".85rem" }}>{W.day}</div>
      <canvas
        ref={ref}
        width="580"
        height="220"
        className={off ? "off" : ""}
        aria-label="Scratch card"
        onPointerDown={(e) => {
          onStart && onStart();
          st.current.down = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratch(e);
        }}
        onPointerMove={scratch}
        onPointerUp={() => (st.current.down = false)}
      />
    </div>
  );
}

/* ---------- Confetti: falls from the top to the bottom ---------- */
function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#f4b6c0", "#f2a900", "#ffffff", "#b98c43", "#e8761c", "#d4577a", "#9db7a0"];
    const ps = [];
    const t0 = performance.now();
    let id;
    let n = 0;

    const spawn = () => ({
      x: Math.random() * w,
      y: -20 * dpr,
      vx: (Math.random() - 0.5) * 2 * dpr,
      vy: (2 + Math.random() * 4) * dpr,
      r: Math.random() * 6,
      vr: Math.random() * 0.2 - 0.1,
      s: (6 + Math.random() * 8) * dpr,
      c: col[n++ % col.length],
      o: n % 3,
      ph: Math.random() * 6,
      sw: (0.5 + Math.random()) * dpr,
    });

    const tick = (t) => {
      x.clearRect(0, 0, w, h);
      if (t - t0 < 3500) for (let i = 0; i < 6; i++) ps.push(spawn());
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.ph += 0.06;
        p.vy = Math.min(p.vy + 0.02 * dpr, 7 * dpr);
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
        if (p.o === 0) x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        else {
          x.beginPath();
          x.arc(0, 0, p.s / 3, 0, 7);
          x.fill();
        }
        x.restore();
      }
      if (t - t0 < 3500 || ps.length) id = requestAnimationFrame(tick);
      else x.clearRect(0, 0, w, h);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [fire]);

  return <canvas ref={ref} className="conf" aria-hidden="true" />;
}

/* ---------- Built-in wedding music: shehnai + tanpura + dholak (Raag Yaman) ---------- */
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
    l.frequency.value = 480;
    g.gain.value = 0.04;
    o.connect(l);
    l.connect(g);
    g.connect(out);
    o.start();
  });

  const nb = ctx.createBuffer(1, 4410, 44100);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  const sc = [261.63, 293.66, 329.63, 369.99, 392, 440, 493.88, 523.25];
  const mel = [[4, 2], [5, 1], [6, 1], [7, 2], [6, 2], [5, 2], [4, 2], [2, 2], [3, 1], [2, 1], [1, 2], [0, 4], [1, 2], [2, 2], [4, 4], [3, 2]];

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
    g.gain.linearRampToValueAtTime(0.16, at + 0.06);
    g.gain.linearRampToValueAtTime(0.11, at + d * 0.75);
    g.gain.linearRampToValueAtTime(0, at + d);
    o.connect(bp);
    bp.connect(g);
    g.connect(out);
    o.start(at);
    v.start(at);
    o.stop(at + d + 0.1);
    v.stop(at + d + 0.1);
  };

  const bass = (at, hi) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(hi ? 190 : 140, at);
    o.frequency.exponentialRampToValueAtTime(60, at + 0.16);
    g.gain.setValueAtTime(0.34, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.3);
    o.connect(g);
    g.connect(out);
    o.start(at);
    o.stop(at + 0.35);
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

  const pat = ["B", "t", "b", "t", "B", "t", "t", "b"];
  const dur = 0.27;
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

  return {
    pause() { clearTimeout(timer); ctx.suspend(); },
    resume() { ctx.resume(); t = Math.max(t, ctx.currentTime + 0.2); run(); },
    get on() { return ctx.state === "running"; },
  };
}

export default function WeddingPage() {
  const [stage, setStage] = useState("envelope"); // envelope → invite → gates → main
  const [scratched, setScratched] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [go, setGo] = useState(false);
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
      if (!synth.current) {
        synth.current = makeSynth();
        setPlaying(true);
      }
    } catch {
      // Audio blocked by browser autoplay policy until user gesture
    }
  }, []);

  const play = useCallback(() => {
    if (W.music && audio.current) {
      audio.current.volume = 0.7;
      audio.current.play().then(() => setPlaying(true)).catch(startSynth);
    } else {
      startSynth();
    }
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

  const openEnv = useCallback((withSound = true) => {
    if (withSound) play();
    setTimeout(() => setStage("invite"), 1950);
  }, [play]);

  const revealed = () => {
    setScratched(true);
    setConfetti(true);
    setTimeout(() => setStage("gates"), 2800);
    setTimeout(() => setStage("main"), 4800);
  };

  const tap = () => {
    if (go) return;
    setGo(true);
    openEnv(true);
  };

  // Auto-open envelope after 5 seconds if the user hasn't clicked yet
  useEffect(() => {
    if (stage !== "envelope" || go) return;
    const t = setTimeout(() => {
      setGo(true);
      openEnv(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [stage, go, openEnv]);

  const ensureMusic = () => { if (!playing) play(); };
  const img = W.cardImage && imgOk && <img src={W.cardImage} alt="" onError={() => setImgOk(false)} />;


  const SITE_URL = "https://www.seankrixtechnologies.com";
const PAGE_URL = `${SITE_URL}/web-planner`;
const OG_IMAGE = `${SITE_URL}/og-image.webp`; // आप चाहें तो /public में 1200x630 की custom image डालकर उसका path दे सकते हैं

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Interactive Digital Wedding Invitation & Web Planner | ${W.groom} & ${W.bride}`,
  description: `Create & explore interactive digital wedding invitations with scratch card reveal, live countdown, event timeline, music & Google Maps QR code by Seankrix Technologies, Jaipur.`,
  url: PAGE_URL,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: "Seankrix Technologies",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
  },
};
  return (
    <>
    <Head>
  {/* Basic & Viewport */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#7a1f2b" />

  {/* Primary SEO Meta Tags */}
  <title>{`Digital Wedding Invitation & Web Planner — ${W.groom} & ${W.bride} | Seankrix Technologies`}</title>
  <meta
    name="description"
    content={`Explore interactive digital wedding invitation & web planner by Seankrix Technologies. Features scratch-to-reveal card, live countdown, Jaipur royal theme, music & QR map for ${W.groom} & ${W.bride} (${W.dateLabel}).`}
  />
  <meta
    name="keywords"
    content="digital wedding invitation India, interactive wedding card, wedding web planner, Jaipur wedding invitation website, scratch card wedding invite, online shadi card, Seankrix Technologies, custom wedding website Jaipur"
  />
  <meta name="author" content="Seankrix Technologies" />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  />

  {/* Canonical URL (Duplicate URL issue से बचने के लिए) */}
  <link rel="canonical" href={PAGE_URL} />

  {/* Open Graph / WhatsApp / Facebook / Instagram Promotion */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:site_name" content="Seankrix Technologies" />
  <meta property="og:locale" content="en_IN" />
  <meta
    property="og:title"
    content={`Royal Digital Wedding Invitation & Web Planner | Seankrix Technologies`}
  />
  <meta
    property="og:description"
    content={`Interactive animated wedding invite with envelope reveal, scratch card, shehnai music, event timeline & Google Maps QR. Built by Seankrix Technologies, Jaipur.`}
  />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="Interactive Digital Wedding Invitation & Web Planner by Seankrix Technologies"
  />

  {/* Twitter / X Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={PAGE_URL} />
  <meta
    name="twitter:title"
    content={`Digital Wedding Invitation & Web Planner | Seankrix Technologies`}
  />
  <meta
    name="twitter:description"
    content={`Interactive royal wedding website with scratch card reveal, countdown, music & venue QR code by Seankrix Technologies.`}
  />
  <meta name="twitter:image" content={OG_IMAGE} />

  {/* Google Structured Data (JSON-LD) */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
  />
</Head>

      <div className="wi">
        <style>{css}</style>
        {W.music && <audio ref={audio} src={W.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "envelope" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}

        {stage === "envelope" && (
          <div
            className={"full envimg" + (go ? " go" : "")}
            role="button"
            tabIndex={0}
            aria-label="You are invited. Tap to open."
            onClick={tap}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tap())}
          >
            <div className="stage">
              <img src={W.openImage} alt="Wedding invitation envelope" />
            </div>
          </div>
        )}

        {stage === "invite" && (
          <div className="full" onPointerDown={ensureMusic}>
            <div className="stage">
              <JaipurInviteScene />
              {img}
              <div className="panel fade">
                <div className="crest">{W.initials}</div>
                <h1 className="names">
                  {W.groom} <span style={{ fontSize: "0.75em", color: "#b48a4a" }}>&amp;</span> {W.bride}
                </h1>
                <p className="tag">WE ARE GETTING MARRIED</p>
                <Scratch onDone={revealed} onStart={ensureMusic} />
                {scratched ? (
                  <div className="fade">
                    <Countdown small />
                    <p className="sf sf-i muted" style={{ margin: 0 }}>until our forever begins</p>
                  </div>
                ) : (
                  <p className="muted" style={{ fontSize: ".88rem", margin: 0 }}>Scratch the card with your finger</p>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "gates" && (
          <div className="full gates open">
            <div className="door l">{W.initials.split(" | ")[0]}</div>
            <div className="door r">{W.initials.split(" | ")[1]}</div>
          </div>
        )}

        {(stage === "gates" || stage === "main") && (
          <main>
            <div className="hero">
              <Toran />
              <div style={{ position: "relative", maxWidth: 640, width: "100%" }}>
                {W.blessing && <p className="hi" style={{ fontSize: "1.4rem", color: "var(--maroon)", margin: "0 0 4px" }}>{W.blessing}</p>}
                <p className="script" style={{ fontSize: "1.9rem", color: "#b48a4a", margin: 0 }}>Two families, one promise</p>
                <h2 style={{ margin: "4px 0 14px" }}>Introducing the families</h2>
                <div className="fam2">
                  <Person name={W.groom} photo={W.groomPhoto} lines={W.groomFamily} />
                  <div className="mono" aria-hidden="true">{W.initials}</div>
                  <Person name={W.bride} photo={W.bridePhoto} lines={W.brideFamily} />
                </div>
                <p className="sf sf-i" style={{ fontSize: "1.15rem", marginTop: "16px", marginBottom: "2px" }}>
                  request the honour of your presence at the wedding of
                </p>
                <p className="couple">{W.groom} &amp; {W.bride}</p>
                <p style={{ margin: "0 0 24px" }}>
                  {W.day}, {W.dateLabel} · {W.city}
                </p>
              </div>
              <Palace />
            </div>

            <section>
              <h2>Until our forever begins</h2>
              <Countdown />
              <p className="muted">{W.dateLabel} · {W.city}</p>
            </section>

            <section>
              <h2>The celebrations</h2>
              <div className="orn">❖ ✦ ❖</div>
              <div className="events-list">
                {W.events.map((e, idx) => (
                  <EventCard key={e.name} event={e} index={idx} />
                ))}
              </div>
            </section>

            <section>
              <h2>Venue</h2>
              <div className="orn">❖ ✦ ❖</div>
              <div className="arch">
                <p style={{ margin: 0 }}>{W.venue}</p>
                <div className="qr">
                  <QRCodeSVG value={W.mapUrl} size={150} level="M" bgColor="#ffffff" fgColor="#4a2f2a" title="Scan for the venue location" />
                </div>
                <p className="sf sf-i muted qr-cap">Scan for directions</p>
                <a className="btn" href={W.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
              </div>
            </section>

            <section>
              <h2>Our story</h2>
              <p className="sf sf-i muted" style={{ fontSize: "1.2rem", margin: 0 }}>{W.storyTag}</p>
              <Carousel />
              <p>{W.story}</p>
            </section>

            <section>
              <p className="couple">{W.groom} &amp; {W.bride}</p>
              <p className="muted">{W.dateLabel} · {W.city}</p>
            </section>

            <footer>
              <div className="orn">❖ ✦ ❖</div>Jaipur, the Pink City
            </footer>
          </main>
        )}
      </div>
    </>
  );
}