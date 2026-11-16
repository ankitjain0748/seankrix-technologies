import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react

/* ================= EDIT YOUR DETAILS HERE ================= */
const B = {
  name: "Aanya",
  age: 7,
  nickname: "our little superstar",
  theme: "Jungle Safari Adventure",
  dateLabel: "20 March 2027",
  dateParts: ["20", "MAR", "2027"], // shown inside the 3 date balloons
  dateISO: "2027-03-20T17:00:00", // live countdown target
  day: "Saturday",
  time: "5:00 pm onwards",
  city: "Jaipur",
  venue: "The Garden Pavilion, C-Scheme, Jaipur, Rajasthan",
  mapUrl: "https://maps.google.com/?q=C-Scheme+Jaipur",
  host: ["Hosted by", "Rajesh & Sunita Sharma", "(Aanya's Mumma & Papa)"],
  rsvpPhone: "919999999999", // WhatsApp number with country code, no + or spaces
  rsvpBy: "15 March",
  perks: [
    { icon: "🦁", title: "Dress code", text: "Come as your favourite jungle animal" },
    { icon: "🎁", title: "Gifts", text: "Your hugs are the best gift" },
    { icon: "🍕", title: "Food", text: "Pizza, pasta & a rainbow cake" },
  ],
  events: [
    { icon: "🎈", name: "Welcome & face painting", when: "5:00 pm", where: "Garden entrance" },
    { icon: "🎪", name: "Games & treasure hunt", when: "5:45 pm", where: "Main lawn" },
    { icon: "🎂", name: "Cake cutting", when: "7:00 pm", where: "Under the fairy lights" },
    { icon: "🕺", name: "Dinner & dance party", when: "7:30 pm", where: "Pavilion hall" },
  ],
  music: "", // e.g. "/birthday-song.mp3" in /public. Empty = built-in "Happy Birthday" music box
  photo: "/assets/birthday-girl.jpg", // /public/assets
  storyTag: "Seven years of giggles",
  story: "From her first wobbly steps to her very first cartwheel, every year with Aanya has been a party. Come and help us make this one the loudest, silliest and sweetest yet.",
  gallery: [
    { src: "/assets/b1.jpg", caption: "Baby Aanya, 1st birthday" },
    { src: "/assets/b2.jpg", caption: "Beach holiday 2024" },
    { src: "/assets/b3.jpg", caption: "Her first cartwheel" },
    { src: "/assets/b4.jpg", caption: "Now: 7 and fabulous" },
  ],
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Pacifico&display=swap');
.bd{--ink:#2b1b5a;--pink:#ff5d8f;--sun:#ffc93c;--teal:#2ec4b6;--orange:#ff8a3d;--violet:#8e6cff;--paper:#fff7e8;
 font:400 1.05rem/1.55 Fredoka,system-ui,sans-serif;color:var(--ink);background:var(--paper);min-height:100vh;overflow-x:hidden}
.bd *{box-sizing:border-box}
.bd h1,.bd h2,.bd h3{margin:0;font-weight:600;line-height:1.15}
.bd .pac{font-family:Pacifico,cursive;font-weight:400}
.bd .full{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center}
.bd .stage{position:relative;width:100%;height:100%;max-width:520px;display:flex;align-items:center;justify-content:center}
.bd .pop-in{animation:bd-pop .7s cubic-bezier(.3,1.6,.5,1) both}
@keyframes bd-pop{from{opacity:0;transform:scale(.6) rotate(-4deg)}to{opacity:1;transform:none}}

/* ---------- envelope ---------- */
.bd .env{cursor:pointer;background:linear-gradient(170deg,#3b2a86,#7a3fb5 55%,#ff5d8f)}
.bd .env svg{width:100%;height:100%}
.bd .env.go svg{animation:bd-zoom 1.8s .2s ease-in forwards}
@keyframes bd-zoom{0%{transform:scale(1);opacity:1}65%{opacity:1}100%{transform:scale(1.6);opacity:0}}
.bd .e-flapF,.bd .e-flapB{transform-box:view-box;transform-origin:0 250px}
.bd .e-flapB{opacity:0;transform:scaleY(0)}
.bd .env.go .e-flapF{animation:bd-ff .45s .15s ease-in forwards}
.bd .env.go .e-flapB{animation:bd-fb .5s .6s ease-out forwards}
.bd .env.go .e-card{animation:bd-card .9s 1s cubic-bezier(.3,1.3,.5,1) forwards}
.bd .env.go .e-seal{animation:bd-seal .45s forwards;transform-box:fill-box;transform-origin:center}
.bd .e-pulse{animation:bd-pulse 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.bd .e-float{animation:bd-float 3.2s ease-in-out infinite}
@keyframes bd-ff{to{transform:scaleY(0);opacity:1}}
@keyframes bd-fb{from{opacity:1;transform:scaleY(0)}to{opacity:1;transform:scaleY(-1)}}
@keyframes bd-card{to{transform:translateY(-150px)}}
@keyframes bd-seal{to{transform:scale(2);opacity:0}}
@keyframes bd-pulse{50%{transform:scale(1.08)}}
@keyframes bd-float{50%{transform:translateY(-9px)}}

/* ---------- balloon pop screen ---------- */
.bd .invite{background:linear-gradient(180deg,#ffe3ef,#fff1d6 60%,#d9f6f1)}
.bd .panel{position:relative;z-index:2;width:90%;padding:22px 14px 18px;background:#fffdf6;border:3px solid var(--ink);border-radius:28px;box-shadow:6px 6px 0 var(--ink)}
.bd .names{font-family:Pacifico,cursive;font-weight:400;font-size:clamp(2.4rem,11vw,3.4rem);color:var(--pink);line-height:1.2;text-shadow:3px 3px 0 var(--ink)}
.bd .chip{display:inline-block;padding:2px 14px;border:2.5px solid var(--ink);border-radius:999px;background:var(--sun);font-weight:600;font-size:.85rem}
.bd .slots{display:flex;justify-content:center;gap:8px;margin:12px 0 4px}
.bd .slot{min-width:64px;padding:6px 10px;border:2.5px dashed var(--ink);border-radius:14px;font-weight:700;font-size:1.5rem;background:#fff;transition:transform .3s}
.bd .slot.on{border-style:solid;background:var(--teal);color:#fff;animation:bd-pop .5s both;box-shadow:3px 3px 0 var(--ink)}
.bd .field{position:relative;height:210px;margin-top:10px}
.bd .bal{position:absolute;bottom:0;width:21%;padding:0;border:0;background:none;cursor:pointer;animation:bd-bob 3s ease-in-out infinite;-webkit-tap-highlight-color:transparent}
.bd .bal svg{width:100%;display:block;overflow:visible}
.bd .bal:active{transform:scale(1.1)}
@keyframes bd-bob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-14px) rotate(3deg)}}
.bd .burst{position:absolute;pointer-events:none;width:0;height:0}
.bd .burst i{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;animation:bd-burst .7s ease-out forwards;transform:rotate(var(--a)) translateY(0)}
@keyframes bd-burst{to{transform:rotate(var(--a)) translateY(-70px);opacity:0}}
.bd .hint{font-size:.95rem;color:#6a5a99;margin:6px 0 0}

/* ---------- curtains ---------- */
.bd .curt{z-index:45;pointer-events:none;background:transparent}
.bd .cd-door{position:absolute;top:0;bottom:0;width:50.5%;display:flex;align-items:center;justify-content:center;font:3.2rem Pacifico,cursive;color:#fff;
 background:repeating-linear-gradient(90deg,#ff5d8f 0 28px,#e23f74 28px 56px);border-bottom:14px solid var(--sun);text-shadow:3px 3px 0 var(--ink)}
.bd .cd-door.l{left:0;transform-origin:left}.bd .cd-door.r{right:0;transform-origin:right}
.bd .open .cd-door.l{animation:bd-cl 1.5s .35s cubic-bezier(.7,0,.3,1) forwards}
.bd .open .cd-door.r{animation:bd-cr 1.5s .35s cubic-bezier(.7,0,.3,1) forwards}
@keyframes bd-cl{to{transform:translateX(-102%)}}@keyframes bd-cr{to{transform:translateX(102%)}}

/* ---------- main ---------- */
.bd main{position:relative;background-color:var(--paper);background-image:radial-gradient(#ffc93c55 2.5px,transparent 3px),radial-gradient(#ff5d8f33 2.5px,transparent 3px);background-size:46px 46px;background-position:0 0,23px 23px}
.bd .rise{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.bd .rise svg{position:absolute;bottom:-140px;width:46px;animation:bd-rise linear infinite;opacity:.8}
@keyframes bd-rise{to{transform:translateY(-130vh) rotate(8deg)}}
.bd .hero{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px 14px 40px}
.bd .bunting{position:absolute;top:0;left:0;width:100%;height:70px}
.bd .small{font-size:1.15rem;font-weight:500;margin:0}
.bd .big-name{font-family:Pacifico,cursive;font-weight:400;font-size:clamp(3.4rem,17vw,6rem);line-height:1.05;color:var(--pink);text-shadow:4px 4px 0 var(--ink);margin:2px 0}
.bd .cakebtn{position:relative;display:block;margin:6px auto 0;padding:0;border:0;background:none;cursor:pointer;width:min(300px,78vw)}
.bd .cakebtn svg{width:100%;overflow:visible}
.bd .flame{transform-box:fill-box;transform-origin:50% 100%;animation:bd-fl .5s ease-in-out infinite alternate}
.bd .flame:nth-of-type(2n){animation-delay:.2s}
@keyframes bd-fl{from{transform:scale(1,1) rotate(-4deg)}to{transform:scale(.88,1.15) rotate(4deg)}}
.bd .smoke{opacity:0}.bd .blown .smoke{animation:bd-sm 2s ease-out forwards}
@keyframes bd-sm{0%{opacity:.8;transform:translateY(0)}100%{opacity:0;transform:translateY(-50px)}}
.bd .blown .flame{display:none}
.bd .wish{min-height:1.8em;margin:8px 0 0;font-weight:600}
.bd .agestar{width:118px;margin:-6px auto 6px;display:block;animation:bd-spin 14s linear infinite}
.bd .agewrap{position:relative;width:118px;margin:0 auto}
.bd .agewrap b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 2.7rem Fredoka;color:var(--ink)}
@keyframes bd-spin{to{transform:rotate(360deg)}}
.bd section{position:relative;z-index:2;max-width:720px;margin:0 auto;padding:30px 14px;text-align:center}
.bd h2{font-family:Pacifico,cursive;font-weight:400;font-size:clamp(1.9rem,7vw,2.6rem);color:var(--violet);margin-bottom:14px;text-shadow:2px 2px 0 var(--ink)}
.bd .sticker{background:#fff;border:3px solid var(--ink);border-radius:22px;box-shadow:5px 5px 0 var(--ink);padding:16px 14px}
.bd .cdn{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.bd .cdn div{min-width:70px;padding:8px 6px;border:3px solid var(--ink);border-radius:18px;box-shadow:4px 4px 0 var(--ink)}
.bd .cdn div:nth-child(1){background:var(--pink);color:#fff}.bd .cdn div:nth-child(2){background:var(--sun)}
.bd .cdn div:nth-child(3){background:var(--teal);color:#fff}.bd .cdn div:nth-child(4){background:var(--violet);color:#fff}
.bd .cdn b{display:block;font:700 2.2rem Fredoka;line-height:1.1}.bd .cdn span{font-size:.75rem}
.bd .cdn.sm{gap:6px}.bd .cdn.sm div{min-width:52px;padding:4px;box-shadow:3px 3px 0 var(--ink)}.bd .cdn.sm b{font-size:1.4rem}
.bd .plan{display:flex;flex-direction:column;gap:18px}
.bd .ev{position:relative;width:min(90%,450px);display:flex;gap:12px;align-items:center;text-align:left;opacity:0;transition:opacity .6s,transform .7s cubic-bezier(.3,1.5,.5,1)}
.bd .ev.left{align-self:flex-start;transform:translateX(-40px) rotate(-3deg)}
.bd .ev.right{align-self:flex-end;transform:translateX(40px) rotate(3deg)}
.bd .ev.in{opacity:1;transform:rotate(var(--r,0deg))}
.bd .ev .ico{flex:none;width:58px;height:58px;border-radius:50%;border:3px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:1.8rem}
.bd .ev h3{font-size:1.2rem}.bd .ev p{margin:0;font-size:.95rem;color:#6a5a99}
.bd .perks{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}
.bd .perks .sticker:nth-child(1){transform:rotate(-2deg)}.bd .perks .sticker:nth-child(2){transform:rotate(1.5deg)}.bd .perks .sticker:nth-child(3){transform:rotate(-1deg)}
.bd .perks .ico{font-size:2.2rem}.bd .perks h3{font-size:1.15rem}.bd .perks p{margin:2px 0 0;font-size:.95rem}
.bd .qr{display:inline-block;margin:12px 0 4px;padding:10px;background:#fff;border:3px solid var(--ink);border-radius:16px;line-height:0}
.bd .btn{display:inline-block;margin-top:10px;padding:.65rem 1.6rem;border:3px solid var(--ink);border-radius:999px;background:var(--sun);color:var(--ink);font:600 1.05rem Fredoka;text-decoration:none;box-shadow:4px 4px 0 var(--ink);transition:transform .15s,box-shadow .15s;cursor:pointer}
.bd .btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink)}
.bd .btn.wa{background:#25d366;color:#fff}
.bd .muted{color:#6a5a99}
.bd .photo{width:min(78%,240px);aspect-ratio:1;object-fit:cover;border-radius:50%;border:5px solid var(--ink);box-shadow:0 0 0 7px var(--sun);display:block;margin:6px auto 14px;background:#ffe3ef}
.bd .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#ffd1e1,#ffe9a8);color:var(--ink);font:2.6rem Pacifico,cursive;text-align:center}
.bd .car{position:relative;max-width:340px;margin:1rem auto}
.bd .frame{position:relative;aspect-ratio:4/5;border:10px solid #fff;outline:3px solid var(--ink);box-shadow:6px 6px 0 var(--ink);border-radius:6px;overflow:hidden;background:#ffe3ef;transform:rotate(-2deg)}
.bd .slide{position:absolute;inset:0;opacity:0;transition:opacity .8s}.bd .slide.on{opacity:1}
.bd .slide>img{width:100%;height:100%;object-fit:cover;display:block}
.bd .slide>.ph{width:100%;height:100%;font-size:1.5rem;padding:1rem}
.bd .cap{margin:1rem 0 .2rem;font-size:1.4rem;color:var(--pink)}
.bd .arr{position:absolute;top:44%;z-index:2;width:40px;height:40px;border-radius:50%;border:3px solid var(--ink);background:var(--sun);color:var(--ink);font-size:1.4rem;line-height:1;cursor:pointer}
.bd .arr.l{left:-12px}.bd .arr.r{right:-12px}
.bd .dots{display:flex;justify-content:center;gap:6px;margin-top:6px}.bd .dots button{width:10px;height:10px;border-radius:50%;border:2px solid var(--ink);background:#fff;padding:0;cursor:pointer}.bd .dots button.on{background:var(--pink)}
.bd .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:60;width:44px;height:44px;border-radius:50%;border:3px solid var(--ink);background:var(--sun);cursor:pointer;font-size:1.1rem;box-shadow:3px 3px 0 var(--ink)}
.bd .conf{position:fixed;inset:0;width:100%;height:100%;z-index:70;pointer-events:none}
.bd footer{position:relative;z-index:2;padding:30px 14px 40px;text-align:center;color:#6a5a99}
.bd button:focus-visible,.bd a:focus-visible,.bd .env:focus-visible{outline:3px solid var(--violet);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.bd *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.bd .ev{opacity:1!important;transform:none!important}}
`;

/* ---------- small shared SVG bits ---------- */
const PALETTE = ["#ff5d8f", "#ffc93c", "#2ec4b6", "#ff8a3d", "#8e6cff"];

function starPoints(cx, cy, R, r, n) {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i - Math.PI / 2;
    const rad = i % 2 ? r : R;
    p.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(" ");
}

function BalloonShape({ color, label, small }) {
  return (
    <svg viewBox="0 0 80 130" aria-hidden="true">
      <path d="M40 112C38 120 44 124 40 130" stroke="#2b1b5a" strokeWidth="1.6" fill="none" />
      <path d="M40 4C14 4 6 30 12 52C18 74 34 90 40 98C46 90 62 74 68 52C74 30 66 4 40 4Z" fill={color} stroke="#2b1b5a" strokeWidth="3" />
      <path d="M34 98L40 108L46 98Z" fill={color} stroke="#2b1b5a" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="25" cy="30" rx="6" ry="11" fill="#fff" opacity=".45" transform="rotate(20 25 30)" />
      <text x="40" y={small ? 58 : 56} textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize={small ? 17 : 26} fill="#fff" stroke="#2b1b5a" strokeWidth="1" paintOrder="stroke">{label}</text>
    </svg>
  );
}

function Bunting() {
  const flags = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * (400 / n);
    const y = 6 + 14 * Math.sin((x / 400) * Math.PI * 4 + 0.3) * 0.0 + 10 * Math.sin((i / (n - 1)) * Math.PI);
    flags.push(<polygon key={i} points={`${x - 12},${y} ${x + 12},${y} ${x},${y + 38}`} fill={PALETTE[i % 5]} stroke="#2b1b5a" strokeWidth="2" strokeLinejoin="round" />);
  }
  return (
    <svg className="bunting" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 4Q200 ${10 + 20} 400 4`} stroke="#2b1b5a" strokeWidth="2.5" fill="none" />
      {flags}
    </svg>
  );
}

function RisingBalloons() {
  const list = [[6, 13, 0, 0], [22, 17, -6, 1], [38, 12, -3, 2], [55, 19, -10, 3], [72, 14, -8, 4], [88, 16, -2, 0]];
  return (
    <div className="rise" aria-hidden="true">
      {list.map(([x, d, dl, c], i) => (
        <svg key={i} viewBox="0 0 80 130" style={{ left: `${x}%`, animationDuration: `${d + 6}s`, animationDelay: `${dl}s` }}>
          <path d="M40 112C38 120 44 124 40 130" stroke="#2b1b5a" strokeWidth="2" fill="none" />
          <path d="M40 4C14 4 6 30 12 52C18 74 34 90 40 98C46 90 62 74 68 52C74 30 66 4 40 4Z" fill={PALETTE[c]} stroke="#2b1b5a" strokeWidth="3" />
          <ellipse cx="25" cy="30" rx="6" ry="11" fill="#fff" opacity=".45" transform="rotate(20 25 30)" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Stage 1: animated party envelope ---------- */
function PartyEnvelope() {
  const heart = "M0 12C-18 -2 -12 -18 0 -8C12 -18 18 -2 0 12Z";
  return (
    <svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="e-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff7e8" /><stop offset="1" stopColor="#ffe3ef" /></linearGradient>
        <linearGradient id="e-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffc93c" /><stop offset="1" stopColor="#ff8a3d" /></linearGradient>
      </defs>
      {/* stars */}
      {[[40, 60], [350, 90], [70, 640], [340, 620], [200, 40], [30, 330], [372, 380]].map(([x, y], i) => (
        <polygon key={i} points={starPoints(x, y, 9, 4, 4)} fill="#ffc93c" opacity=".85" className="e-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      {/* balloons peeking behind the envelope */}
      <g className="e-float">
        <g transform="translate(50 120) scale(.9)"><foreignObject width="0" height="0" /><path d="M40 4C14 4 6 30 12 52C18 74 34 90 40 98C46 90 62 74 68 52C74 30 66 4 40 4Z" fill="#ff5d8f" stroke="#2b1b5a" strokeWidth="3" /><path d="M40 98C38 120 46 130 40 160" stroke="#fff" strokeWidth="2" fill="none" /></g>
        <g transform="translate(270 100) scale(1)"><path d="M40 4C14 4 6 30 12 52C18 74 34 90 40 98C46 90 62 74 68 52C74 30 66 4 40 4Z" fill="#2ec4b6" stroke="#2b1b5a" strokeWidth="3" /><path d="M40 98C42 125 34 140 40 170" stroke="#fff" strokeWidth="2" fill="none" /></g>
        <g transform="translate(160 40) scale(.8)"><path d="M40 4C14 4 6 30 12 52C18 74 34 90 40 98C46 90 62 74 68 52C74 30 66 4 40 4Z" fill="#8e6cff" stroke="#2b1b5a" strokeWidth="3" /><path d="M40 98C38 120 46 130 40 160" stroke="#fff" strokeWidth="2" fill="none" /></g>
      </g>

      {/* envelope back */}
      <rect x="40" y="250" width="320" height="260" rx="10" fill="url(#e-in)" stroke="#2b1b5a" strokeWidth="4" />
      {/* flap inside */}
      <polygon className="e-flapB" points="40,250 360,250 200,400" fill="#ffd77a" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
      {/* card */}
      <g className="e-card">
        <rect x="70" y="275" width="260" height="215" rx="10" fill="#fff" stroke="#2b1b5a" strokeWidth="4" />
        <text x="200" y="335" textAnchor="middle" fontFamily="Pacifico,cursive" fontSize="34" fill="#ff5d8f">Let’s party!</text>
        <text x="200" y="375" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="19" fill="#2b1b5a">Come celebrate with us</text>
        <polygon points={starPoints(200, 425, 26, 12, 5)} fill="#ffc93c" stroke="#2b1b5a" strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* front pocket */}
      <g fill="url(#e-body)" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round">
        <polygon points="40,250 200,400 40,510" />
        <polygon points="360,250 200,400 360,510" />
        <polygon points="40,510 200,385 360,510" />
      </g>
      <text x="200" y="478" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="18" fill="#2b1b5a">TAP TO OPEN</text>
      {/* flap front */}
      <g className="e-flapF">
        <polygon points="40,250 360,250 200,400" fill="url(#e-body)" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
        <text x="200" y="296" textAnchor="middle" fontFamily="Pacifico,cursive" fontSize="31" fill="#ff5d8f">You’re invited!</text>
      </g>
      {/* seal */}
      <g className="e-seal">
        <g className="e-pulse">
          <polygon points={starPoints(200, 392, 34, 26, 12)} fill="#ff5d8f" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="200" cy="392" r="19" fill="#ffc93c" stroke="#2b1b5a" strokeWidth="3" />
          <path transform="translate(200 394)" d={heart} fill="#ff5d8f" stroke="#2b1b5a" strokeWidth="2.5" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- Event art circles ---------- */
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
    <div ref={ref} className={`sticker ev ${side}${show ? " in" : ""}`} style={{ "--r": index % 2 ? "1.5deg" : "-1.5deg" }}>
      <div className="ico" style={{ background: PALETTE[index % 5] }}>{event.icon}</div>
      <div>
        <h3>{event.name}</h3>
        <p>{event.when} · {event.where}</p>
      </div>
    </div>
  );
}

/* ---------- Countdown ---------- */
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
  if (over) return <p className="pac" style={{ fontSize: "2rem", margin: 0 }}>Party time! 🎉</p>;
  return (
    <div className={"cdn" + (small ? " sm" : "")} role="timer" aria-label="Time until the party">
      {parts.map(([l, v]) => (
        <div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>
      ))}
    </div>
  );
}

/* ---------- Photos with fallback ---------- */
function Photo({ src, label, className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className={"ph " + (className || "")}><span>{label}</span></div>;
  return <img className={className} src={src} alt={label} onError={() => setBad(true)} />;
}

function Carousel() {
  const g = B.gallery;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const x0 = useRef(null);
  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((n) => (n + 1) % g.length), 4500);
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
        {g.map((p, k) => (
          <div key={k} className={"slide" + (k === i ? " on" : "")}><Photo src={p.src} label={p.caption} /></div>
        ))}
      </div>
      <button type="button" className="arr l" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
      <button type="button" className="arr r" onClick={() => go(1)} aria-label="Next photo">›</button>
      <p className="pac cap">{g[i].caption}</p>
      <div className="dots">
        {g.map((_, k) => (
          <button type="button" key={k} className={k === i ? "on" : ""} onClick={() => { setHold(true); setI(k); }} aria-label={`Photo ${k + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Stage 2: pop the balloons to reveal the date ---------- */
const BALLOONS = [
  { id: 0, c: "#ff5d8f", label: B.dateParts[0], slot: 0, x: 2, d: 0 },
  { id: 1, c: "#ffc93c", label: "🎁", slot: null, x: 21, d: 0.6 },
  { id: 2, c: "#2ec4b6", label: B.dateParts[1], slot: 1, x: 40, d: 0.3 },
  { id: 3, c: "#ff8a3d", label: "⭐", slot: null, x: 59, d: 0.9 },
  { id: 4, c: "#8e6cff", label: B.dateParts[2], slot: 2, x: 77, d: 0.15 },
];

function BalloonPop({ onDone, onStart, onPopSound }) {
  const [popped, setPopped] = useState([]);
  const [bursts, setBursts] = useState([]);
  const done = useRef(false);

  const pop = (b) => {
    if (popped.includes(b.id)) return;
    onStart && onStart();
    onPopSound && onPopSound();
    const next = [...popped, b.id];
    setPopped(next);
    setBursts((x) => [...x, b]);
    setTimeout(() => setBursts((x) => x.filter((q) => q.id !== b.id)), 800);
    const dateIds = BALLOONS.filter((q) => q.slot !== null).map((q) => q.id);
    if (!done.current && dateIds.every((id) => next.includes(id))) {
      done.current = true;
      onDone();
    }
  };

  const slotOn = (s) => popped.includes(BALLOONS.find((b) => b.slot === s).id);

  return (
    <div>
      <div className="slots" aria-live="polite">
        {B.dateParts.map((p, s) => (
          <div key={s} className={"slot" + (slotOn(s) ? " on" : "")}>{slotOn(s) ? p : "?"}</div>
        ))}
      </div>
      <div className="field">
        {BALLOONS.map((b) => !popped.includes(b.id) && (
          <button
            key={b.id}
            type="button"
            className="bal"
            style={{ left: `${b.x}%`, animationDelay: `${b.d}s`, bottom: `${(b.id % 2) * 26}px` }}
            onClick={() => pop(b)}
            aria-label={`Pop balloon ${b.label}`}
          >
            <BalloonShape color={b.c} label={b.label} small={b.label.length > 3} />
          </button>
        ))}
        {bursts.map((b) => (
          <div key={b.id} className="burst" style={{ left: `${b.x + 10.5}%`, bottom: `${(b.id % 2) * 26 + 70}px` }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
              <i key={a} style={{ "--a": `${a}deg`, background: PALETTE[(i + b.id) % 5] }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Confetti (re-fires each time `fire` changes) ---------- */
function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#ff5d8f", "#ffc93c", "#2ec4b6", "#ff8a3d", "#8e6cff", "#ffffff"];
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

/* ---------- Built-in music: "Happy Birthday" on a music box, waltz bass ---------- */
function makeSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const out = ctx.createGain();
  out.gain.value = 0.55;
  out.connect(ctx.destination);

  const N = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, Bb4: 466.16, C5: 523.25 };
  // [note, beats]  — each line is 6 beats (two bars of 3/4)
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
      o.connect(g);
      g.connect(out);
      o.start(at);
      o.stop(at + d + 1.1);
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
    o.connect(g);
    g.connect(out);
    o.start(at);
    o.stop(at + 0.45);
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
      if (li % 4 === 0) t += beat * 2; // short breath between verses
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
    get on() { return ctx.state === "running"; },
  };
}

/* ---------- The cake: tap to blow the candles ---------- */
function Cake({ blown, onBlow }) {
  const candles = [-46, -16, 16, 46];
  return (
    <button type="button" className={"cakebtn" + (blown ? " blown" : "")} onClick={onBlow} aria-label={blown ? "Candles blown out" : "Tap to blow out the candles"}>
      <svg viewBox="0 0 300 230" aria-hidden="true">
        <ellipse cx="150" cy="214" rx="130" ry="12" fill="#2b1b5a" opacity=".18" />
        {/* plate */}
        <ellipse cx="150" cy="204" rx="128" ry="14" fill="#fff" stroke="#2b1b5a" strokeWidth="4" />
        {/* bottom tier */}
        <path d="M40 140H260V196C260 204 240 206 150 206C60 206 40 204 40 196Z" fill="#ff5d8f" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
        <path d="M40 140H260V156C250 170 242 156 232 166C222 176 214 156 204 166C194 176 184 156 174 166C164 176 156 156 146 166C136 176 128 156 118 166C108 176 100 156 90 166C80 176 72 156 62 166C52 176 46 160 40 156Z" fill="#fff" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
        {[70, 110, 150, 190, 230].map((x, i) => <circle key={x} cx={x} cy={186 + (i % 2) * 6} r="5" fill={PALETTE[(i + 1) % 5]} stroke="#2b1b5a" strokeWidth="2.5" />)}
        {/* top tier */}
        <path d="M80 96H220V140H80Z" fill="#ffc93c" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
        <path d="M80 96H220V108C212 120 206 108 198 116C190 124 184 108 176 116C168 124 162 108 154 116C146 124 140 108 132 116C124 124 118 108 110 116C102 124 96 108 88 116C84 118 82 112 80 108Z" fill="#fff" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
        {[100, 130, 160, 190].map((x, i) => <rect key={x} x={x - 6} y={124} width="12" height="8" rx="3" fill={PALETTE[(i + 2) % 5]} stroke="#2b1b5a" strokeWidth="2" />)}
        {/* candles */}
        {candles.map((dx, i) => (
          <g key={dx} transform={`translate(${150 + dx} 0)`}>
            <rect x="-5" y="62" width="10" height="34" rx="2" fill={PALETTE[(i + 3) % 5]} stroke="#2b1b5a" strokeWidth="3" />
            <path d="M-5 72l10 6M-5 82l10 6" stroke="#fff" strokeWidth="3" opacity=".8" />
            <path d="M0 62V56" stroke="#2b1b5a" strokeWidth="2.5" />
            <path className="flame" d="M0 28C-9 40 -8 52 0 56C8 52 9 40 0 28Z" fill="#ffb02e" stroke="#2b1b5a" strokeWidth="2.5" />
            <path className="flame" d="M0 40C-4 46 -4 52 0 54C4 52 4 46 0 40Z" fill="#fff3b0" />
            <circle className="smoke" cx="0" cy="40" r="6" fill="#bbb" />
          </g>
        ))}
      </svg>
    </button>
  );
}

export default function BirthdayPage() {
  const [stage, setStage] = useState("envelope"); // envelope → invite → curtains → main
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [go, setGo] = useState(false);
  const [blown, setBlown] = useState(false);
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
    setTimeout(() => setStage("invite"), 2100);
  }, [play]);

  const tap = () => { if (go) return; setGo(true); openEnv(true); };

  useEffect(() => {
    if (stage !== "envelope" || go) return;
    const t = setTimeout(() => { setGo(true); openEnv(false); }, 4000);
    return () => clearTimeout(t);
  }, [stage, go, openEnv]);

  const ensureMusic = () => { if (!playing) play(); };

  const allPopped = () => {
    setRevealed(true);
    setConfetti((c) => c + 1);
    setTimeout(() => setStage("curtains"), 2600);
    setTimeout(() => setStage("main"), 4600);
  };

  const blow = () => {
    if (blown) return;
    setBlown(true);
    setConfetti((c) => c + 1);
  };

  const SITE_URL = "https://www.seankrixtechnologies.com";
  const PAGE_URL = `${SITE_URL}/birthday-planner`;
  const OG_IMAGE = `${SITE_URL}/og-birthday.webp`; // 1200x630 image in /public
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Interactive Digital Birthday Invitation | ${B.name}'s ${B.age}th Birthday`,
    description: "Interactive digital birthday invitation with balloon-pop reveal, cake candles, live countdown, party schedule, music and Google Maps QR by Seankrix Technologies, Jaipur.",
    url: PAGE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Seankrix Technologies",
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  };

  const rsvpHref = `https://wa.me/${B.rsvpPhone}?text=${encodeURIComponent(`Hi! We will be there for ${B.name}'s birthday on ${B.dateLabel} 🎉`)}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff5d8f" />
        <title>{`Digital Birthday Invitation — ${B.name}'s ${B.age}th Birthday | Seankrix Technologies`}</title>
        <meta name="description" content={`Interactive birthday invitation for ${B.name} (${B.dateLabel}): pop the balloons, blow the candles, live countdown, party schedule & venue QR. Built by Seankrix Technologies, Jaipur.`} />
        <meta name="keywords" content="digital birthday invitation India, interactive birthday card, online birthday invite, kids birthday invitation website, Jaipur birthday invitation, Seankrix Technologies" />
        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content="Interactive Digital Birthday Invitation | Seankrix Technologies" />
        <meta property="og:description" content="Pop balloons to reveal the date, blow out the candles, join the party. Interactive birthday invite by Seankrix Technologies, Jaipur." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Interactive digital birthday invitation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content="Digital Birthday Invitation | Seankrix Technologies" />
        <meta name="twitter:description" content="Interactive birthday invite with balloon-pop reveal, cake candles, countdown and venue QR." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="bd">
        <style>{css}</style>
        {B.music && <audio ref={audio} src={B.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "envelope" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}

        {/* 1. envelope */}
        {stage === "envelope" && (
          <div
            className={"full env" + (go ? " go" : "")}
            role="button"
            tabIndex={0}
            aria-label="You are invited. Tap to open."
            onClick={tap}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tap())}
          >
            <div className="stage"><PartyEnvelope /></div>
          </div>
        )}

        {/* 2. balloon pop */}
        {stage === "invite" && (
          <div className="full invite" onPointerDown={ensureMusic}>
            <div className="stage">
              <div className="panel pop-in">
                <span className="chip">{B.theme}</span>
                <p className="small" style={{ marginTop: 10 }}>Come to the birthday party of</p>
                <h1 className="names">{B.name}</h1>
                <p className="small">turning <b>{B.age}</b> 🎉</p>
                <BalloonPop onDone={allPopped} onStart={ensureMusic} onPopSound={() => synth.current && synth.current.pop()} />
                {revealed ? (
                  <div className="pop-in">
                    <Countdown small />
                    <p className="pac muted" style={{ margin: "6px 0 0" }}>days until the fun begins</p>
                  </div>
                ) : (
                  <p className="hint">Pop the 3 numbered balloons to find the date</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. curtains */}
        {stage === "curtains" && (
          <div className="full curt open">
            <div className="cd-door l">Let’s</div>
            <div className="cd-door r">party!</div>
          </div>
        )}

        {/* 4. main page */}
        {(stage === "curtains" || stage === "main") && (
          <main>
            <RisingBalloons />

            <div className="hero">
              <Bunting />
              <p className="small">{B.host[0]} {B.host[1]} invite you to</p>
              <h2 className="pac" style={{ margin: "2px 0", fontSize: "1.7rem", color: "var(--violet)", textShadow: "none" }}>the birthday party of</h2>
              <h1 className="big-name">{B.name}</h1>
              <div className="agewrap" aria-label={`Turning ${B.age}`}>
                <svg className="agestar" viewBox="0 0 118 118" aria-hidden="true">
                  <polygon points={starPoints(59, 59, 56, 42, 14)} fill="#ffc93c" stroke="#2b1b5a" strokeWidth="4" strokeLinejoin="round" />
                </svg>
                <b>{B.age}</b>
              </div>
              <Cake blown={blown} onBlow={blow} />
              <p className="pac wish" style={{ color: "var(--pink)", fontSize: "1.35rem" }} aria-live="polite">
                {blown ? "Make a wish! ✨" : "Tap the cake to blow the candles"}
              </p>
              <p style={{ margin: "14px 0 0", fontWeight: 600, fontSize: "1.2rem" }}>{B.day}, {B.dateLabel}</p>
              <p className="muted" style={{ margin: 0 }}>{B.time} · {B.city}</p>
            </div>

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

            <section>
              <h2>{B.theme}</h2>
              <div className="perks">
                {B.perks.map((p) => (
                  <div key={p.title} className="sticker">
                    <div className="ico">{p.icon}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Find the party</h2>
              <div className="sticker">
                <p style={{ margin: 0, fontWeight: 500 }}>{B.venue}</p>
                <div className="qr">
                  <QRCodeSVG value={B.mapUrl} size={150} level="M" bgColor="#ffffff" fgColor="#2b1b5a" title="Scan for the party location" />
                </div>
                <p className="muted" style={{ margin: 0 }}>Scan for directions</p>
                <a className="btn" href={B.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
              </div>
            </section>

            <section>
              <h2>{B.storyTag}</h2>
              <Photo className="photo" src={B.photo} label={B.name} />
              <Carousel />
              <p style={{ maxWidth: 480, margin: "10px auto 0" }}>{B.story}</p>
            </section>

            <section>
              <h2>Will you come?</h2>
              <div className="sticker">
                <p style={{ margin: "0 0 4px" }}>Let us know by <b>{B.rsvpBy}</b> so we can save you a slice.</p>
                <a className="btn wa" href={rsvpHref} target="_blank" rel="noreferrer">Reply on WhatsApp</a>
              </div>
            </section>

            <footer>
              <p className="pac" style={{ fontSize: "1.6rem", color: "var(--pink)", margin: 0 }}>See you at the party!</p>
              <p style={{ margin: "4px 0 0" }}>{B.name}’s {B.age}th birthday · {B.dateLabel} · {B.city}</p>
            </footer>
          </main>
        )}
      </div>
    </>
  );
}

