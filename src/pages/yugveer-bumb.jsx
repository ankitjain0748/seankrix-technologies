
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react
import y1 from "/y1.jpeg";
import y2 from "/y1.jpeg";

/* ================= EDIT YOUR DETAILS HERE ================= */
const B = {
  first: "Yugveer",
  last: "Bumb",
  age: 4,
  born: "28 November 2022",
  theme: "Dino Roar Party",
  dateLabel: "28 November 2026",
  dateParts: ["28", "NOV", "2026"], // printed on the 3 date eggs
  dateISO: "2026-11-28T17:00:00", // live countdown target
  day: "Saturday",
  time: "5:00 pm onwards",
  city: "Jaipur",
  venue: "Add venue name & address here, Jaipur, Rajasthan",
  mapUrl: "https://maps.google.com/?q=Jaipur",
  host: ["Mr. Aadish Jain & Mrs. Nehal Jain ", "(Yugveer's Mumma & Papa)"],
  rsvpPhone: "9314637921", // WhatsApp number with country code, no + or spaces
  rsvpBy: "24 November",
  perks: [
    { icon: "🦖", title: "Dress code", text: "Come as a dinosaur or a fossil explorer" },
    { icon: "🎁", title: "Gifts", text: "Your blessings & roars are the best gift" },
    { icon: "🍕", title: "Food", text: "Mini pizzas, fries & a roar-some dino cake" },
  ],
  events: [
    { icon: "🥚", name: "Dino entry & face painting", when: "5:00 pm", where: "Jungle gate" },
    { icon: "🦴", name: "Fossil dig & treasure hunt", when: "5:45 pm", where: "Sandpit zone" },
    { icon: "🎂", name: "Roar-some cake cutting", when: "7:00 pm", where: "Volcano stage" },
    { icon: "🕺", name: "Dino dinner & stomp dance", when: "7:30 pm", where: "Main hall" },
  ],
  music: "", // e.g. "/birthday-song.mp3" in /public. Empty = built-in "Happy Birthday" music box
  photo: y1, // /public/assets
  storyTag: "Four years of tiny stomps",
  story: "Our little dino explorer Yugveer was born on 28 November 2022, and he has been roaring, stomping and digging for fossils ever since. Come help us make his 4th birthday the biggest dino adventure yet.",
  gallery: [
    { src: y1, caption: "Baby Yugveer, tiny roar" },
    { src: y2, caption: "First day at the zoo" },
 { src: y1, caption: "Baby Yugveer, tiny roar" },
    { src: y2, caption: "First day at the zoo" },
     { src: y1, caption: "Baby Yugveer, tiny roar" },
    { src: y2, caption: "First day at the zoo" },
  ],
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Chewy&family=Nunito:wght@500;700;800&display=swap');
.dn{--ink:#1f3a2a;--leaf:#3fae5a;--lime:#b6e04a;--sun:#ffb703;--orange:#ff7a2f;--teal:#2ec4b6;--paper:#f6f0d8;--soft:#5f7a62;
 font:500 1.05rem/1.55 Nunito,system-ui,sans-serif;color:var(--ink);background:var(--paper);min-height:100vh;overflow-x:hidden}
.dn *{box-sizing:border-box}
.dn h1,.dn h2,.dn h3{margin:0;font-weight:800;line-height:1.15}
.dn .disp{font-family:Chewy,cursive;font-weight:400}
.dn .full{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center}
.dn .stage{position:relative;width:100%;height:100%;max-width:520px;display:flex;align-items:center;justify-content:center}
.dn .pop-in{animation:dn-pop .7s cubic-bezier(.3,1.6,.5,1) both}
@keyframes dn-pop{from{opacity:0;transform:scale(.6) rotate(-4deg)}to{opacity:1;transform:none}}
.dn .shake{animation:dn-shake .7s}
@keyframes dn-shake{10%,50%,90%{transform:translate(-5px,2px)}30%,70%{transform:translate(5px,-2px)}}

/* ---------- hatching egg intro ---------- */
.dn .env{cursor:pointer;background:#7bc67b}
.dn .env svg{width:100%;height:100%}
.dn .env.go svg{animation:dn-zoom .7s 1.9s ease-in forwards}
@keyframes dn-zoom{to{transform:scale(1.5);opacity:0}}
.dn .e-top,.dn .e-bot,.dn .e-baby{transform-box:fill-box;transform-origin:center}
.dn .e-idle{animation:dn-rock 1.8s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
@keyframes dn-rock{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
.dn .env.go .e-idle{animation:none}
.dn .env.go .e-top{animation:dn-top 1.4s .1s ease-in forwards}
.dn .env.go .e-bot{animation:dn-botw .6s .1s ease-in-out}
.dn .env.go .e-baby{animation:dn-baby 1s 1s cubic-bezier(.3,1.5,.5,1) forwards}
.dn .env.go .e-hint{opacity:0}
@keyframes dn-top{0%{transform:none}10%{transform:rotate(-4deg)}20%{transform:rotate(4deg)}30%{transform:rotate(-5deg)}40%{transform:rotate(5deg)}55%{transform:none}100%{transform:translate(50px,-340px) rotate(38deg);opacity:0}}
@keyframes dn-botw{25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
@keyframes dn-baby{to{transform:translateY(-62px)}}
.dn .e-pulse{animation:dn-pulse 1.3s ease-in-out infinite}
@keyframes dn-pulse{50%{opacity:.35}}

/* ---------- egg hatch screen ---------- */
.dn .invite{background:linear-gradient(180deg,#ffe9a8,#e4f5b8 55%,#bfe9e0)}
.dn .panel{position:relative;z-index:2;width:90%;padding:22px 14px 18px;background:#fffdf0;border:3px solid var(--ink);border-radius:30px 16px 30px 16px;box-shadow:6px 6px 0 var(--ink)}
.dn .names{font-family:Chewy,cursive;font-weight:400;font-size:clamp(2.4rem,11vw,3.3rem);color:var(--leaf);line-height:1.1;text-shadow:3px 3px 0 var(--ink)}
.dn .chip{display:inline-block;padding:2px 14px;border:2.5px solid var(--ink);border-radius:999px;background:var(--sun);font-weight:800;font-size:.85rem}
.dn .small{font-size:1.1rem;font-weight:700;margin:0}
.dn .slots{display:flex;justify-content:center;gap:8px;margin:12px 0 4px}
.dn .slot{min-width:64px;padding:6px 10px;border:2.5px dashed var(--ink);border-radius:14px;font-weight:800;font-size:1.5rem;background:#fff}
.dn .slot.on{border-style:solid;background:var(--leaf);color:#fff;animation:dn-pop .5s both;box-shadow:3px 3px 0 var(--ink)}
.dn .field{position:relative;height:190px;margin-top:10px}
.dn .egg{position:absolute;bottom:0;width:21%;padding:0;border:0;background:none;cursor:pointer;animation:dn-wob 2.4s ease-in-out infinite;transform-origin:50% 100%;-webkit-tap-highlight-color:transparent}
.dn .egg svg{width:100%;display:block;overflow:visible}
@keyframes dn-wob{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
.dn .burst{position:absolute;pointer-events:none;width:0;height:0}
.dn .burst i{position:absolute;left:-6px;top:-6px;width:12px;height:9px;border-radius:3px 6px 3px 6px;animation:dn-burst .7s ease-out forwards;transform:rotate(var(--a)) translateY(0)}
.dn .burst em{position:absolute;left:-22px;top:-30px;font-style:normal;font-size:2.6rem;animation:dn-up 1.2s ease-out forwards}
@keyframes dn-burst{to{transform:rotate(var(--a)) translateY(-70px);opacity:0}}
@keyframes dn-up{0%{transform:translateY(10px) scale(.4);opacity:0}25%{opacity:1;transform:translateY(-14px) scale(1.1)}100%{transform:translateY(-70px) scale(1);opacity:0}}
.dn .hint{font-size:.95rem;color:var(--soft);margin:6px 0 0}

/* ---------- jungle gates ---------- */
.dn .curt{z-index:45;pointer-events:none;background:transparent}
.dn .gate{position:absolute;top:0;bottom:0;width:50.5%;display:flex;align-items:center;justify-content:center;font:3.2rem Chewy,cursive;color:#fff;
 background:repeating-linear-gradient(100deg,#2f8f4a 0 26px,#3fae5a 26px 52px);border-bottom:14px solid var(--sun);text-shadow:3px 3px 0 var(--ink)}
.dn .gate.l{left:0;border-right:6px solid var(--ink)}.dn .gate.r{right:0;border-left:6px solid var(--ink)}
.dn .open .gate.l{animation:dn-gl 1.5s .35s cubic-bezier(.7,0,.3,1) forwards}
.dn .open .gate.r{animation:dn-gr 1.5s .35s cubic-bezier(.7,0,.3,1) forwards}
@keyframes dn-gl{to{transform:translateX(-102%)}}@keyframes dn-gr{to{transform:translateX(102%)}}

/* ---------- main ---------- */
.dn main{position:relative;background-color:var(--paper);background-image:radial-gradient(#b6e04a66 3px,transparent 4px),radial-gradient(#ffb70044 3px,transparent 4px);background-size:52px 52px;background-position:0 0,26px 26px}
.dn .fall{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.dn .fall svg{position:absolute;top:-60px;width:38px;animation:dn-fall linear infinite;opacity:.75}
@keyframes dn-fall{to{transform:translate(60px,115vh) rotate(260deg)}}
.dn .hero{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:78px 14px 40px}
.dn .bunting{position:absolute;top:0;left:0;width:100%;height:70px}
.dn .big-name{font-family:Chewy,cursive;font-weight:400;font-size:clamp(3.6rem,19vw,6.4rem);line-height:.95;color:var(--leaf);text-shadow:4px 4px 0 var(--ink);margin:4px 0 0}
.dn .big-name span{display:block;color:var(--orange);font-size:.72em}
.dn .agewrap{position:relative;width:112px;margin:8px auto 0}
.dn .agestar{width:112px;display:block;animation:dn-spin 16s linear infinite}
.dn .agewrap b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:400 3rem Chewy;color:#fff;text-shadow:3px 3px 0 var(--ink)}
@keyframes dn-spin{to{transform:rotate(360deg)}}
.dn .cakebtn{position:relative;display:block;margin:6px auto 0;padding:0;border:0;background:none;cursor:pointer;width:min(310px,80vw)}
.dn .cakebtn svg{width:100%;overflow:visible}
.dn .flame{transform-box:fill-box;transform-origin:50% 100%;animation:dn-fl .5s ease-in-out infinite alternate}
@keyframes dn-fl{from{transform:scale(1,1) rotate(-4deg)}to{transform:scale(.88,1.15) rotate(4deg)}}
.dn .smoke{opacity:0}.dn .blown .smoke{animation:dn-sm 2s ease-out forwards}
@keyframes dn-sm{0%{opacity:.8;transform:translateY(0)}100%{opacity:0;transform:translateY(-50px)}}
.dn .blown .flame{display:none}
.dn .wish{min-height:1.8em;margin:8px 0 0;color:var(--orange);font-size:1.4rem}
.dn section{position:relative;z-index:2;max-width:720px;margin:0 auto;padding:26px 14px;text-align:center}
.dn h2{font-family:Chewy,cursive;font-weight:400;font-size:clamp(2rem,8vw,2.8rem);color:var(--orange);margin-bottom:14px;text-shadow:2px 2px 0 var(--ink)}
.dn .rock{background:#fff;border:3px solid var(--ink);border-radius:26px 14px 28px 12px;box-shadow:5px 5px 0 var(--ink);padding:16px 14px}
.dn .cdn{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.dn .cdn div{min-width:70px;padding:8px 6px;border:3px solid var(--ink);border-radius:18px 10px 18px 10px;box-shadow:4px 4px 0 var(--ink)}
.dn .cdn div:nth-child(1){background:var(--leaf);color:#fff}.dn .cdn div:nth-child(2){background:var(--sun)}
.dn .cdn div:nth-child(3){background:var(--orange);color:#fff}.dn .cdn div:nth-child(4){background:var(--teal);color:#fff}
.dn .cdn b{display:block;font:400 2.3rem Chewy;line-height:1.1}.dn .cdn span{font-size:.75rem;font-weight:700}
.dn .cdn.sm{gap:6px}.dn .cdn.sm div{min-width:52px;padding:4px;box-shadow:3px 3px 0 var(--ink)}.dn .cdn.sm b{font-size:1.5rem}
.dn .plan{display:flex;flex-direction:column;gap:18px}
.dn .ev{position:relative;width:min(90%,450px);display:flex;gap:12px;align-items:center;text-align:left;opacity:0;transition:opacity .6s,transform .7s cubic-bezier(.3,1.5,.5,1)}
.dn .ev.left{align-self:flex-start;transform:translateX(-40px) rotate(-3deg)}
.dn .ev.right{align-self:flex-end;transform:translateX(40px) rotate(3deg)}
.dn .ev.in{opacity:1;transform:rotate(var(--r,0deg))}
.dn .ev .ico{flex:none;width:58px;height:58px;border-radius:50%;border:3px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:1.8rem}
.dn .ev h3{font-size:1.15rem}.dn .ev p{margin:0;font-size:.95rem;color:var(--soft)}
.dn .perks{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}
.dn .perks .rock:nth-child(1){transform:rotate(-2deg)}.dn .perks .rock:nth-child(2){transform:rotate(1.5deg)}.dn .perks .rock:nth-child(3){transform:rotate(-1deg)}
.dn .perks .ico{font-size:2.3rem}.dn .perks h3{font-size:1.1rem}.dn .perks p{margin:2px 0 0;font-size:.95rem}
.dn .qr{display:inline-block;margin:12px 0 4px;padding:10px;background:#fff;border:3px solid var(--ink);border-radius:16px;line-height:0}
.dn .btn{display:inline-block;margin-top:10px;padding:.65rem 1.6rem;border:3px solid var(--ink);border-radius:999px;background:var(--sun);color:var(--ink);font:800 1.05rem Nunito;text-decoration:none;box-shadow:4px 4px 0 var(--ink);transition:transform .15s,box-shadow .15s;cursor:pointer}
.dn .btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink)}
.dn .btn.wa{background:#25d366;color:#fff}
.dn .muted{color:var(--soft)}
.dn .photo{width:min(78%,240px);aspect-ratio:1;object-fit:cover;border-radius:50%;border:5px solid var(--ink);box-shadow:0 0 0 7px var(--lime);display:block;margin:6px auto 14px;background:#e4f5b8}
.dn .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#d6f0a0,#ffe9a8);color:var(--ink);font:2.4rem Chewy,cursive;text-align:center}
.dn .car{position:relative;max-width:340px;margin:1rem auto}
.dn .frame{position:relative;aspect-ratio:4/5;border:10px solid #fff;outline:3px solid var(--ink);box-shadow:6px 6px 0 var(--ink);border-radius:6px;overflow:hidden;background:#e4f5b8;transform:rotate(-2deg)}
.dn .slide{position:absolute;inset:0;opacity:0;transition:opacity .8s}.dn .slide.on{opacity:1}
.dn .slide>img{width:100%;height:100%;object-fit:cover;display:block}
.dn .slide>.ph{width:100%;height:100%;font-size:1.5rem;padding:1rem}
.dn .cap{margin:1rem 0 .2rem;font-size:1.5rem;color:var(--leaf)}
.dn .arr{position:absolute;top:44%;z-index:2;width:40px;height:40px;border-radius:50%;border:3px solid var(--ink);background:var(--sun);color:var(--ink);font-size:1.4rem;line-height:1;cursor:pointer}
.dn .arr.l{left:-12px}.dn .arr.r{right:-12px}
.dn .dots{display:flex;justify-content:center;gap:6px;margin-top:6px}.dn .dots button{width:10px;height:10px;border-radius:50%;border:2px solid var(--ink);background:#fff;padding:0;cursor:pointer}.dn .dots button.on{background:var(--orange)}
.dn .foot{display:block;margin:0 auto;width:150px;position:relative;z-index:2;opacity:.8}
.dn .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:60;width:44px;height:44px;border-radius:50%;border:3px solid var(--ink);background:var(--sun);cursor:pointer;font-size:1.1rem;box-shadow:3px 3px 0 var(--ink)}
.dn .conf{position:fixed;inset:0;width:100%;height:100%;z-index:70;pointer-events:none}
.dn footer{position:relative;z-index:2;padding:30px 14px 40px;text-align:center;color:var(--soft)}
.dn button:focus-visible,.dn a:focus-visible,.dn .env:focus-visible{outline:3px solid var(--orange);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.dn *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.dn .ev{opacity:1!important;transform:none!important}}
`;

/* ---------- shared bits ---------- */
const PALETTE = ["#3fae5a", "#ffb703", "#ff7a2f", "#2ec4b6", "#b6e04a"];
const INK = "#1f3a2a";
const EGG = "M40 4C16 4 6 44 6 62C6 84 22 96 40 96C58 96 74 84 74 62C74 44 64 4 40 4Z";

function starPoints(cx, cy, R, r, n) {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i - Math.PI / 2;
    const rad = i % 2 ? r : R;
    p.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(" ");
}

function EggShape({ color, label, small }) {
  return (
    <svg viewBox="0 0 80 100" aria-hidden="true">
      <path d={EGG} fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="22" cy="40" r="5" fill="#fff" opacity=".35" />
      <circle cx="58" cy="30" r="4" fill="#fff" opacity=".35" />
      <circle cx="60" cy="78" r="6" fill="#fff" opacity=".3" />
      <circle cx="20" cy="76" r="4" fill="#fff" opacity=".3" />
      <text x="40" y={small ? 62 : 64} textAnchor="middle" fontFamily="Chewy,cursive" fontSize={small ? 19 : 28} fill="#fff" stroke={INK} strokeWidth="1.2" paintOrder="stroke">{label}</text>
    </svg>
  );
}

function Bunting() {
  const flags = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * (400 / n);
    const y = 6 + 10 * Math.sin((i / (n - 1)) * Math.PI);
    flags.push(<polygon key={i} points={`${x - 12},${y} ${x + 12},${y} ${x},${y + 38}`} fill={PALETTE[i % 5]} stroke={INK} strokeWidth="2" strokeLinejoin="round" />);
  }
  return (
    <svg className="bunting" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 4Q200 30 400 4" stroke={INK} strokeWidth="2.5" fill="none" />
      {flags}
    </svg>
  );
}

function FallingLeaves() {
  const list = [[6, 13, 0, 0], [22, 17, -6, 4], [38, 12, -3, 0], [55, 19, -10, 4], [72, 14, -8, 0], [88, 16, -2, 4]];
  return (
    <div className="fall" aria-hidden="true">
      {list.map(([x, d, dl, c], i) => (
        <svg key={i} viewBox="0 0 40 40" style={{ left: `${x}%`, animationDuration: `${d + 6}s`, animationDelay: `${dl}s` }}>
          <path d="M4 36C4 14 16 4 36 4C36 24 26 36 4 36Z" fill={PALETTE[c]} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M6 34L28 12" stroke={INK} strokeWidth="2" opacity=".6" />
        </svg>
      ))}
    </div>
  );
}

function Footprints() {
  const foot = (x, y, r) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`} fill={INK}>
      <ellipse cx="0" cy="6" rx="8" ry="9" />
      <ellipse cx="-9" cy="-8" rx="3.2" ry="6" transform="rotate(-18 -9 -8)" />
      <ellipse cx="0" cy="-12" rx="3.2" ry="6.5" />
      <ellipse cx="9" cy="-8" rx="3.2" ry="6" transform="rotate(18 9 -8)" />
    </g>
  );
  return (
    <svg className="foot" viewBox="0 0 150 40" aria-hidden="true">
      {foot(20, 24, 70)}{foot(55, 14, 70)}{foot(90, 24, 70)}{foot(125, 14, 70)}
    </svg>
  );
}

/* ---------- Stage 1: the hatching egg ---------- */
function HatchEgg() {
  const topPath = "M90 430L120 410L150 440L180 410L210 440L240 410L270 440L300 410L310 430C310 340 270 280 200 280C130 280 90 340 90 430Z";
  const botPath = "M90 430L120 410L150 440L180 410L210 440L240 410L270 440L300 410L310 430C310 520 270 580 200 580C130 580 90 520 90 430Z";
  const spots = (dy) => (
    <g fill="#fff" opacity=".35">
      <circle cx="140" cy={330 + dy} r="14" /><circle cx="250" cy={350 + dy} r="10" /><circle cx="200" cy={310 + dy} r="8" />
      <circle cx="120" cy={400 + dy} r="8" /><circle cx="270" cy={405 + dy} r="12" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="d-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd27a" /><stop offset=".6" stopColor="#ffe9b0" /><stop offset="1" stopColor="#bfe9a0" /></linearGradient>
        <linearGradient id="d-egg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe9a8" /><stop offset="1" stopColor="#ffb703" /></linearGradient>
      </defs>
      <rect width="400" height="720" fill="url(#d-sky)" />
      <circle cx="320" cy="120" r="46" fill="#ff7a2f" opacity=".85" />
      {/* volcanoes */}
      <path d="M-20 520L90 330L120 350L150 330L260 520Z" fill="#7a5a3a" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M90 330L120 350L150 330L135 310L105 310Z" fill="#ff7a2f" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M240 520L330 380L420 520Z" fill="#8a6a46" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M120 300Q110 270 130 250" stroke="#999" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".5" className="e-pulse" />
      {/* ground */}
      <path d="M0 560Q100 520 200 550T400 540V720H0Z" fill="#3fae5a" stroke={INK} strokeWidth="4" />
      <path d="M0 620Q120 590 220 615T400 600V720H0Z" fill="#2f8f4a" />
      {/* ferns */}
      {[[40, 590], [350, 600]].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y})`} stroke={INK} strokeWidth="3" strokeLinejoin="round" fill="#b6e04a">
          <path d="M0 0C-10-40-40-60-60-60C-40-40-30-20 0 0Z" /><path d="M0 0C10-50 30-70 60-70C40-40 30-20 0 0Z" /><path d="M0 0C0-50 0-80 0-100C14-70 14-40 0 0Z" />
        </g>
      ))}
      <text x="200" y="100" textAnchor="middle" fontFamily="Chewy,cursive" fontSize="46" fill="#3fae5a" stroke={INK} strokeWidth="1.5" paintOrder="stroke">{B.first}’s</text>
      <text x="200" y="152" textAnchor="middle" fontFamily="Chewy,cursive" fontSize="46" fill="#ff7a2f" stroke={INK} strokeWidth="1.5" paintOrder="stroke">Dino Party!</text>

      {/* baby dino inside */}
      <g className="e-baby">
        <g transform="translate(200 470)">
          <path d="M-34 40L-24 -10L-12 14L0 -18L12 14L24 -10L34 40Z" fill="#2f8f4a" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="0" cy="0" rx="46" ry="42" fill="#3fae5a" stroke={INK} strokeWidth="4" />
          <circle cx="-17" cy="-8" r="11" fill="#fff" stroke={INK} strokeWidth="3" /><circle cx="17" cy="-8" r="11" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="-15" cy="-7" r="5" fill={INK} /><circle cx="19" cy="-7" r="5" fill={INK} />
          <circle cx="-8" cy="12" r="2.5" fill={INK} /><circle cx="8" cy="12" r="2.5" fill={INK} />
          <path d="M-18 22Q0 36 18 22" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="-30" cy="14" r="6" fill="#ff7a2f" opacity=".5" /><circle cx="30" cy="14" r="6" fill="#ff7a2f" opacity=".5" />
        </g>
      </g>
      {/* shells */}
      <g className="e-idle">
        <g className="e-bot">
          <path d={botPath} fill="url(#d-egg)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          {spots(80)}
        </g>
        <g className="e-top">
          <path d={topPath} fill="url(#d-egg)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          {spots(0)}
        </g>
      </g>
      <text className="e-hint e-pulse" x="200" y="660" textAnchor="middle" fontFamily="Chewy,cursive" fontSize="30" fill="#fff" stroke={INK} strokeWidth="1.5" paintOrder="stroke">TAP TO HATCH</text>
    </svg>
  );
}

/* ---------- event card ---------- */
function EventCard({ event, index }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const side = index % 2 === 0 ? "left" : "right";
  return (
    <div ref={ref} className={`rock ev ${side}${show ? " in" : ""}`} style={{ "--r": index % 2 ? "1.5deg" : "-1.5deg" }}>
      <div className="ico" style={{ background: PALETTE[index % 5] }}>{event.icon}</div>
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
  if (now === null) return { over: false, parts: [["days", 0], ["hours", 0], ["mins", 0], ["secs", 0]] };
  const s = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 1000));
  return {
    over: s === 0,
    parts: [["days", Math.floor(s / 86400)], ["hours", Math.floor((s % 86400) / 3600)], ["mins", Math.floor((s % 3600) / 60)], ["secs", s % 60]],
  };
}
function Countdown({ small }) {
  const { over, parts } = useCountdown(B.dateISO);
  if (over) return <p className="disp" style={{ fontSize: "2rem", margin: 0 }}>Roar! Party time! 🦖</p>;
  return (
    <div className={"cdn" + (small ? " sm" : "")} role="timer" aria-label="Time until the party">
      {parts.map(([l, v]) => (<div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>))}
    </div>
  );
}

/* ---------- photos ---------- */
function Photo({ src, label, className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className={"ph " + (className || "")}><span>{label}</span></div>;
  return <img className={className} src={src} alt={label} onError={() => setBad(true)} />;
}


function Carousel() {
  const g = B.gallery;

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const x0 = useRef(null);

  // Automatic carousel
  useEffect(() => {
    if (paused || g.length <= 1) return;

    const timer = setInterval(() => {
      setI((current) => (current + 1) % g.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [paused, g.length]);

  // Previous / Next
  const go = (direction) => {
    setI((current) => (current + direction + g.length) % g.length);
  };

  // Swipe support
  const handlePointerDown = (e) => {
    x0.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (x0.current === null) return;

    const diff = e.clientX - x0.current;

    if (Math.abs(diff) > 40) {
      go(diff < 0 ? 1 : -1);
    }

    x0.current = null;
  };

  return (
    <div
      className="car"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        x0.current = null;
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="frame">
        {g.map((p, k) => (
          <div
            key={k}
            className={`slide ${k === i ? "on" : ""}`}
            aria-hidden={k !== i}
          >
            <Photo
              src={p.src}
              label={p.caption}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="arr l"
        onClick={() => go(-1)}
        aria-label="Previous photo"
      >
        ‹
      </button>

      <button
        type="button"
        className="arr r"
        onClick={() => go(1)}
        aria-label="Next photo"
      >
        ›
      </button>

      <p className="disp cap" aria-live="polite">
        {g[i]?.caption}
      </p>

      <div className="dots">
        {g.map((_, k) => (
          <button
            type="button"
            key={k}
            className={k === i ? "on" : ""}
            onClick={() => setI(k)}
            aria-label={`Photo ${k + 1}`}
            aria-current={k === i ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}


/* ---------- Stage 2: hatch the eggs to reveal the date ---------- */
const EGGS = [
  { id: 0, c: "#3fae5a", label: B.dateParts[0], slot: 0, x: 2, d: 0, baby: "🦖" },
  { id: 1, c: "#ffb703", label: "🦴", slot: null, x: 21, d: 0.5, baby: "🦕" },
  { id: 2, c: "#ff7a2f", label: B.dateParts[1], slot: 1, x: 40, d: 0.25, baby: "🐊" },
  { id: 3, c: "#2ec4b6", label: "🌋", slot: null, x: 59, d: 0.8, baby: "🦎" },
  { id: 4, c: "#8a9a2a", label: B.dateParts[2], slot: 2, x: 77, d: 0.1, baby: "🦖" },
];

function EggHatch({ onDone, onStart, onPopSound }) {
  const [hatched, setHatched] = useState([]);
  const [bursts, setBursts] = useState([]);
  const done = useRef(false);

  const hatch = (b) => {
    if (hatched.includes(b.id)) return;
    onStart && onStart();
    onPopSound && onPopSound();
    const next = [...hatched, b.id];
    setHatched(next);
    setBursts((x) => [...x, b]);
    setTimeout(() => setBursts((x) => x.filter((q) => q.id !== b.id)), 1300);
    const dateIds = EGGS.filter((q) => q.slot !== null).map((q) => q.id);
    if (!done.current && dateIds.every((id) => next.includes(id))) { done.current = true; onDone(); }
  };
  const slotOn = (s) => hatched.includes(EGGS.find((b) => b.slot === s).id);

  return (
    <div>
      <div className="slots" aria-live="polite">
        {B.dateParts.map((p, s) => (<div key={s} className={"slot" + (slotOn(s) ? " on" : "")}>{slotOn(s) ? p : "?"}</div>))}
      </div>
      <div className="field">
        {EGGS.map((b) => !hatched.includes(b.id) && (
          <button
            key={b.id}
            type="button"
            className="egg"
            style={{ left: `${b.x}%`, animationDelay: `${b.d}s`, bottom: `${(b.id % 2) * 24}px` }}
            onClick={() => hatch(b)}
            aria-label={`Hatch egg ${b.label}`}
          >
            <EggShape color={b.c} label={b.label} small={b.label.length > 3} />
          </button>
        ))}
        {bursts.map((b) => (
          <div key={b.id} className="burst" style={{ left: `${b.x + 10.5}%`, bottom: `${(b.id % 2) * 24 + 60}px` }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (<i key={a} style={{ "--a": `${a}deg`, background: PALETTE[(i + b.id) % 5] }} />))}
            <em>{b.baby}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- confetti ---------- */
function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#3fae5a", "#ffb703", "#ff7a2f", "#b6e04a", "#2ec4b6", "#ffffff"];
    const ps = [];
    const t0 = performance.now();
    let id, n = 0;
    const spawn = () => ({
      x: Math.random() * w, y: -20 * dpr,
      vx: (Math.random() - 0.5) * 2 * dpr, vy: (2 + Math.random() * 4) * dpr,
      r: Math.random() * 6, vr: Math.random() * 0.2 - 0.1,
      s: (6 + Math.random() * 8) * dpr, c: col[n++ % col.length], o: n % 3,
      ph: Math.random() * 6, sw: (0.5 + Math.random()) * dpr,
    });
    const tick = (t) => {
      x.clearRect(0, 0, w, h);
      if (t - t0 < 2800) for (let i = 0; i < 6; i++) ps.push(spawn());
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.ph += 0.06;
        p.vy = Math.min(p.vy + 0.02 * dpr, 7 * dpr);
        p.x += p.vx + Math.sin(p.ph) * p.sw;
        p.y += p.vy;
        p.r += p.vr;
        if (p.y > h + 30) { ps.splice(i, 1); continue; }
        x.save();
        x.translate(p.x, p.y);
        x.rotate(p.r);
        x.fillStyle = p.c;
        if (p.o === 0) x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        else { x.beginPath(); x.arc(0, 0, p.s / 3, 0, 7); x.fill(); }
        x.restore();
      }
      if (t - t0 < 2800 || ps.length) id = requestAnimationFrame(tick);
      else x.clearRect(0, 0, w, h);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [fire]);
  return <canvas ref={ref} className="conf" aria-hidden="true" />;
}

/* ---------- built-in music: "Happy Birthday" music box + pop + dino ROAR ---------- */
function makeSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const out = ctx.createGain();
  out.gain.value = 0.55;
  out.connect(ctx.destination);

  const N = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, Bb4: 466.16, C5: 523.25 };
  const lines = [
    { root: 65.41, n: [["C4", 0.75], ["C4", 0.25], ["D4", 1], ["C4", 1], ["F4", 1], ["E4", 2]] },
    { root: 98.0, n: [["C4", 0.75], ["C4", 0.25], ["D4", 1], ["C4", 1], ["G4", 1], ["F4", 2]] },
    { root: 87.31, n: [["C4", 0.75], ["C4", 0.25], ["C5", 1], ["A4", 1], ["F4", 1], ["E4", 1]] },
    { root: 65.41, n: [["Bb4", 0.75], ["Bb4", 0.25], ["A4", 1], ["F4", 1], ["G4", 1], ["F4", 2]] },
  ];
  const beat = 0.46;

  const bell = (f, at, d) => {
    [[1, 0.22], [2, 0.08], [3.01, 0.03]].forEach(([m, v]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f * m;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(v, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0008, at + Math.max(d, 0.5) + 0.5);
      o.connect(g); g.connect(out);
      o.start(at); o.stop(at + d + 1.1);
    });
  };
  const oom = (f, at) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.22, at + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.38);
    o.connect(g); g.connect(out);
    o.start(at); o.stop(at + 0.45);
  };
  const nb = ctx.createBuffer(1, 2205, 44100);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  const pah = (at) => {
    const s = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    s.buffer = nb;
    f.type = "bandpass";
    f.frequency.value = 2600;
    g.gain.setValueAtTime(0.1, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.05);
    s.connect(f); f.connect(g); g.connect(out);
    s.start(at);
  };

  let li = 0, t = ctx.currentTime + 0.3, timer;
  const run = () => {
    while (t < ctx.currentTime + 1.6) {
      const L = lines[li++ % lines.length];
      let at = t;
      L.n.forEach(([nn, b]) => { bell(N[nn], at, b * beat); at += b * beat; });
      for (let b = 0; b < 6; b++) (b % 3 === 0 ? oom(L.root, t + b * beat) : pah(t + b * beat));
      t += 6 * beat;
      if (li % 4 === 0) t += beat * 2;
    }
    timer = setTimeout(run, 400);
  };
  run();

  return {
    pause() { clearTimeout(timer); ctx.suspend(); },
    resume() { ctx.resume(); t = Math.max(t, ctx.currentTime + 0.2); run(); },
    pop() {
      const s = ctx.createBufferSource();
      const g = ctx.createGain();
      s.buffer = nb;
      g.gain.setValueAtTime(0.5, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      s.connect(g); g.connect(ctx.destination);
      s.start();
    },
    roar() {
      if (ctx.state !== "running") return;
      const now = ctx.currentTime;
      const lp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(1100, now);
      lp.frequency.exponentialRampToValueAtTime(260, now + 1.3);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.55, now + 0.12);
      g.gain.linearRampToValueAtTime(0.4, now + 0.8);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      lp.connect(g); g.connect(ctx.destination);
      [[95, 0], [101, 0], [48, 0]].forEach(([f]) => {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(f * 1.5, now);
        o.frequency.exponentialRampToValueAtTime(f * 0.6, now + 1.3);
        const trem = ctx.createOscillator();
        const tg = ctx.createGain();
        trem.frequency.value = 34;
        tg.gain.value = 18;
        trem.connect(tg); tg.connect(o.frequency);
        o.connect(lp);
        o.start(now); trem.start(now);
        o.stop(now + 1.5); trem.stop(now + 1.5);
      });
      const s = ctx.createBufferSource();
      const ng = ctx.createGain();
      s.buffer = nb; s.loop = true;
      ng.gain.value = 0.25;
      s.connect(ng); ng.connect(lp);
      s.start(now); s.stop(now + 1.2);
    },
    get on() { return ctx.state === "running"; },
  };
}

/* ---------- the dino cake: tap to blow the candles and make it ROAR ---------- */
function Cake({ blown, onBlow }) {
  const candles = [-36, -12, 12, 36];
  return (
    <button type="button" className={"cakebtn" + (blown ? " blown" : "")} onClick={onBlow} aria-label={blown ? "Candles blown out" : "Tap to blow out the candles"}>
      <svg viewBox="0 0 300 230" aria-hidden="true">
        <ellipse cx="150" cy="214" rx="130" ry="12" fill={INK} opacity=".18" />
        <ellipse cx="150" cy="204" rx="128" ry="14" fill="#fff" stroke={INK} strokeWidth="4" />
        {/* bottom tier: leafy green */}
        <path d="M40 140H260V196C260 204 240 206 150 206C60 206 40 204 40 196Z" fill="#3fae5a" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M40 140H260V156C250 170 242 156 232 166C222 176 214 156 204 166C194 176 184 156 174 166C164 176 156 156 146 166C136 176 128 156 118 166C108 176 100 156 90 166C80 176 72 156 62 166C52 176 46 160 40 156Z" fill="#fff6d8" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        {[75, 115, 155, 195, 235].map((x, i) => <path key={x} d={`M${x - 6} ${188 + (i % 2) * 6}l6 -10l6 10z`} fill={PALETTE[(i + 1) % 5]} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />)}
        {/* top tier: sunny orange */}
        <path d="M80 96H220V140H80Z" fill="#ff7a2f" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M80 96H220V108C212 120 206 108 198 116C190 124 184 108 176 116C168 124 162 108 154 116C146 124 140 108 132 116C124 124 118 108 110 116C102 124 96 108 88 116C84 118 82 112 80 108Z" fill="#fff6d8" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        {[100, 130, 160, 190].map((x, i) => <circle key={x} cx={x} cy={128} r="5" fill={PALETTE[(i + 2) % 5]} stroke={INK} strokeWidth="2" />)}
        {/* toy dino on the ledge */}
        <g transform="translate(58 140) scale(.8)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round">
          <path d="M-22 -28Q-52 -26 -58 -6Q-40 -20 -20 -14Z" fill="#2f8f4a" />
          <path d="M-14 -44L-8 -56L-2 -44L6 -56L12 -42Z" fill="#ffb703" />
          <ellipse cx="0" cy="-26" rx="26" ry="17" fill="#3fae5a" />
          <rect x="-14" y="-14" width="10" height="14" rx="3" fill="#2f8f4a" /><rect x="6" y="-14" width="10" height="14" rx="3" fill="#2f8f4a" />
          <circle cx="26" cy="-44" r="13" fill="#3fae5a" />
          <circle cx="30" cy="-48" r="3" fill={INK} stroke="none" />
          <path d="M30 -38Q36 -36 38 -40" fill="none" />
        </g>
        {/* little egg on the other side */}
        <g transform="translate(236 118) scale(.34)"><path d={EGG} fill="#ffe9a8" stroke={INK} strokeWidth="8" /><circle cx="28" cy="48" r="7" fill="#ffb703" /><circle cx="52" cy="70" r="9" fill="#ffb703" /></g>
        {/* candles */}
        {candles.map((dx, i) => (
          <g key={dx} transform={`translate(${150 + dx} 0)`}>
            <rect x="-5" y="62" width="10" height="34" rx="2" fill={PALETTE[(i + 3) % 5]} stroke={INK} strokeWidth="3" />
            <path d="M-5 72l10 6M-5 82l10 6" stroke="#fff" strokeWidth="3" opacity=".8" />
            <path d="M0 62V56" stroke={INK} strokeWidth="2.5" />
            <path className="flame" d="M0 28C-9 40 -8 52 0 56C8 52 9 40 0 28Z" fill="#ffb02e" stroke={INK} strokeWidth="2.5" />
            <path className="flame" d="M0 40C-4 46 -4 52 0 54C4 52 4 46 0 40Z" fill="#fff3b0" />
            <circle className="smoke" cx="0" cy="40" r="6" fill="#bbb" />
          </g>
        ))}
      </svg>
    </button>
  );
}

export default function DinoBirthdayPage() {
  const [stage, setStage] = useState("envelope"); // egg → invite → gates → main
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [go, setGo] = useState(false);
  const [blown, setBlown] = useState(false);
  const [rumble, setRumble] = useState(false);
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
    if (B.music && audio.current) {
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

  const openEnv = useCallback((withSound = true) => {
    if (withSound) play();
    setTimeout(() => setStage("invite"), 2700);
  }, [play]);

  const tap = () => { if (go) return; setGo(true); openEnv(true); };

  useEffect(() => {
    if (stage !== "envelope" || go) return;
    const t = setTimeout(() => { setGo(true); openEnv(false); }, 4000);
    return () => clearTimeout(t);
  }, [stage, go, openEnv]);

  const ensureMusic = () => { if (!playing) play(); };

  const allHatched = () => {
    setRevealed(true);
    setConfetti((c) => c + 1);
    setTimeout(() => setStage("curtains"), 2600);
    setTimeout(() => setStage("main"), 4600);
  };

  const blow = () => {
    if (blown) return;
    setBlown(true);
    setConfetti((c) => c + 1);
    setRumble(true);
    setTimeout(() => setRumble(false), 800);
    synth.current && synth.current.roar();
  };

  const SITE_URL = "https://www.seankrixtechnologies.com";
  const PAGE_URL = `${SITE_URL}/dino-birthday-invitation`;
  const OG_IMAGE = `${SITE_URL}/og-dino-birthday.webp`; // 1200x630 image in /public
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Dinosaur Birthday Invitation | ${B.first} ${B.last}'s ${B.age}th Birthday`,
    description: "Interactive dinosaur-theme digital birthday invitation with egg-hatching reveal, roaring cake, live countdown, party plan, music and Google Maps QR by Seankrix Technologies, Jaipur.",
    url: PAGE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Seankrix Technologies",
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  };

  const rsvpHref = `https://wa.me/${B.rsvpPhone}?text=${encodeURIComponent(`Roar! We will be there for ${B.first}'s birthday on ${B.dateLabel} 🦖`)}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3fae5a" />
        <title>{`Dinosaur Birthday Invitation — ${B.first} ${B.last}'s ${B.age}th Birthday | Seankrix Technologies`}</title>
        <meta name="description" content={`Roar! ${B.first} ${B.last} is turning ${B.age} on ${B.dateLabel}. Hatch the dino eggs, blow the candles, see the party plan and venue map. Interactive invitation by Seankrix Technologies, Jaipur.`} />
        <meta name="keywords" content="dinosaur birthday invitation, dino theme birthday card, kids birthday invitation India, interactive digital invite, online birthday invite Jaipur, Seankrix Technologies" />
        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content={`Roar! You're invited to ${B.first}'s Dino Party`} />
        <meta property="og:description" content="Hatch the dino eggs to find the date, then make the birthday cake ROAR. Interactive invite by Seankrix Technologies." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dinosaur theme digital birthday invitation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={`Roar! ${B.first}'s Dino Birthday Party`} />
        <meta name="twitter:description" content="Interactive dino birthday invite with egg-hatching reveal, roaring cake, countdown and venue QR." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className={"dn" + (rumble ? " shake" : "")}>
        <style>{css}</style>
        {B.music && <audio ref={audio} src={B.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "envelope" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}

        {/* 1. hatching egg */}
        {stage === "envelope" && (
          <div
            className={"full env" + (go ? " go" : "")}
            role="button"
            tabIndex={0}
            aria-label="You are invited to a dino party. Tap to hatch the egg."
            onClick={tap}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tap())}
          >
            <div className="stage"><HatchEgg /></div>
          </div>
        )}

        {/* 2. hatch the eggs */}
        {stage === "invite" && (
          <div className="full invite" onPointerDown={ensureMusic}>
            <div className="stage">
              <div className="panel pop-in">
                <span className="chip">{B.theme}</span>
                <p className="small" style={{ marginTop: 10 }}>Roar! Come to the dino party of</p>
                <h1 className="names">{B.first} {B.last}</h1>
                <p className="small">turning <b>{B.age}</b> 🦖</p>
                <EggHatch onDone={allHatched} onStart={ensureMusic} onPopSound={() => synth.current && synth.current.pop()} />
                {revealed ? (
                  <div className="pop-in">
                    <Countdown small />
                    <p className="disp muted" style={{ margin: "6px 0 0", fontSize: "1.2rem" }}>until the stomping begins</p>
                  </div>
                ) : (
                  <p className="hint">Tap the 3 numbered eggs to hatch the date</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. jungle gates */}
        {stage === "curtains" && (
          <div className="full curt open">
            <div className="gate l">Let’s</div>
            <div className="gate r">ROAR!</div>
          </div>
        )}

        {/* 4. main */}
        {(stage === "curtains" || stage === "main") && (
          <main>
            <FallingLeaves />

            <div className="hero">
              <Bunting />
              <p className="small">{B.host[0]} invite you to the</p>
              <p className="disp" style={{ margin: "0", fontSize: "1.8rem", color: "var(--teal)" }}>Dino Birthday Party of</p>
              <h1 className="big-name">{B.first}<span>{B.last}</span></h1>
              <div className="agewrap" aria-label={`Turning ${B.age}`}>
                <svg className="agestar" viewBox="0 0 112 112" aria-hidden="true">
                  <polygon points={starPoints(56, 56, 54, 40, 12)} fill="#ff7a2f" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
                </svg>
                <b>{B.age}</b>
              </div>
              <Cake blown={blown} onBlow={blow} />
              <p className="disp wish" aria-live="polite">{blown ? "ROOAAR! Make a wish! ✨" : "Tap the cake to blow the candles"}</p>
              <p style={{ margin: "14px 0 0", fontWeight: 800, fontSize: "1.2rem" }}>{B.day}, {B.dateLabel}</p>
              <p className="muted" style={{ margin: 0 }}>{B.time} · {B.city}</p>
            </div>

            <Footprints />

            <section>
              <h2>Countdown to cake</h2>
              <Countdown />
            </section>

            <section>
              <h2>Party plan</h2>
              <div className="plan">
                {B.events.map((e, i) => <EventCard key={e.name} event={e} index={i} />)}
              </div>
            </section>

            <Footprints />

            <section>
              <h2>{B.theme}</h2>
              <div className="perks">
                {B.perks.map((p) => (
                  <div key={p.title} className="rock">
                    <div className="ico">{p.icon}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Find the dino den</h2>
              <div className="rock">
                <p style={{ margin: 0, fontWeight: 700 }}>{B.venue}</p>
                <div className="qr">
                  <QRCodeSVG value={B.mapUrl} size={150} level="M" bgColor="#ffffff" fgColor={INK} title="Scan for the party location" />
                </div>
                <p className="muted" style={{ margin: 0 }}>Scan for directions</p>
                <a className="btn" href={B.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
              </div>
            </section>

            <Footprints />

            <section>
              <h2>{B.storyTag}</h2>
              <Photo className="photo" src={B.photo} label={B.first} />
              <Carousel />
              <p style={{ maxWidth: 480, margin: "10px auto 0" }}>{B.story}</p>
            </section>

            <section>
              <h2>Will you come?</h2>
              <div className="rock">
                <p style={{ margin: "0 0 4px" }}>Let us know by <b>{B.rsvpBy}</b> so we can save you a slice.</p>
                <a className="btn wa" href={rsvpHref} target="_blank" rel="noreferrer">Reply on WhatsApp</a>
              </div>
            </section>

            <footer>
              <p className="disp" style={{ fontSize: "1.8rem", color: "var(--leaf)", margin: 0 }}>See you at the party! 🦖</p>
              <p style={{ margin: "4px 0 0" }}>{B.first} {B.last}’s {B.age}th birthday · {B.dateLabel} · {B.city}</p>
            </footer>
          </main>
        )}
      </div>
    </>
  );
}
