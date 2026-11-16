import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react

/* ================= EDIT YOUR DETAILS HERE ================= */
const A = {
  first: "Rajesh",
  second: "Sunita",
  years: 25,
  milestone: "Silver Jubilee", // 25 = Silver Jubilee, 50 = Golden Jubilee, or any title you like
  weddingYear: 2001,
  dateLabel: "12 December 2026",
  dateParts: ["12", "DEC", "2026"], // shown on the 3 flip cards
  dateISO: "2026-12-12T18:00:00", // live countdown target
  day: "Saturday",
  time: "6:00 pm onwards",
  city: "Jaipur",
  venue: "Add venue name & address here, Jaipur, Rajasthan",
  mapUrl: "https://maps.google.com/?q=Jaipur",
  host: "Aarav & Aanya", // hosted by (children / family)
  hostLine: "request the pleasure of your company to celebrate their parents’",
  rsvpPhone: "919999999999", // WhatsApp number with country code, no + or spaces
  rsvpBy: "5 December",
  dress: "Shades of silver, blush & navy",
  events: [
    { icon: "🪔", name: "Blessings & aarti", when: "6:00 pm", where: "Foyer garden" },
    { icon: "🥂", name: "Welcome drinks & music", when: "6:45 pm", where: "Terrace lawn" },
    { icon: "🎂", name: "Silver jubilee cake & toast", when: "8:00 pm", where: "Main stage" },
    { icon: "💃", name: "Dinner & dance floor", when: "8:30 pm", where: "Grand hall" },
  ],
  journey: [
    { year: "2001", title: "We said “I do”", text: "Seven pheras, a thousand blessings and one very long lunch." },
    { year: "2006", title: "A family of four", text: "Our little Aarav and Aanya made every day louder and sweeter." },
    { year: "2014", title: "Our first big trip", text: "Packed cars, wrong turns and the best memories." },
    { year: "2026", title: "Twenty-five years", text: "Still holding hands. Come celebrate with us." },
  ],
  music: "", // e.g. "/anniversary-song.mp3" in /public. Empty = built-in soft piano (Canon in D)
  photo: "/assets/couple.jpg", // /public/assets
  storyTag: "Twenty-five years, one love story",
  story: "Since 12 December 2001 they have turned every ordinary day into a celebration. Join us for an evening of blessings, laughter, music and a toast to the two people who taught us what love looks like.",
  gallery: [
    { src: "/assets/a1.jpg", caption: "Our wedding day, 2001" },
    { src: "/assets/a2.jpg", caption: "Together on every trip" },
    { src: "/assets/a3.jpg", caption: "The whole family" },
    { src: "/assets/a4.jpg", caption: "Still smiling, 2026" },
  ],
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Manrope:wght@300;400;500;600&family=Pinyon+Script&display=swap');
.an{--night:#0d1530;--navy:#16244a;--silver:#d3dae6;--gold:#e0bf7a;--rose:#e8aaa0;--ivory:#fbf6ee;--muted:#a9b3c9;
 font:400 1.05rem/1.7 Manrope,system-ui,sans-serif;color:var(--ivory);background:var(--night);min-height:100vh;overflow-x:hidden}
.an *{box-sizing:border-box}
.an h1,.an h2,.an h3{margin:0;font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;line-height:1.15}
.an .script{font-family:"Pinyon Script",cursive;font-weight:400}
.an .serif{font-family:"Cormorant Garamond",Georgia,serif}
.an .muted{color:var(--muted)}
.an .full{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center}
.an .stage{position:relative;width:100%;height:100%;max-width:520px;display:flex;align-items:center;justify-content:center}
.an .fade-up{animation:an-up 1s both}@keyframes an-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.an .bg-night{background:radial-gradient(120% 80% at 50% 0%,#24376b 0%,#0d1530 62%)}

/* ---------- stars & bokeh ---------- */
.an .stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.an .stars i{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff;animation:an-tw 3.4s ease-in-out infinite}
@keyframes an-tw{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:.95;transform:scale(1.3)}}

/* ---------- heart-lock intro ---------- */
.an .lock{cursor:pointer}
.an .lock svg{width:100%;height:100%}
.an .lock.go svg{animation:an-zoom .8s 2.1s ease-in forwards}
@keyframes an-zoom{to{transform:scale(1.4);opacity:0}}
.an .shackle{transform-box:view-box;transform-origin:240px 392px}
.an .heartbody{transform-box:fill-box;transform-origin:center}
.an .lock:not(.go) .heartbody{animation:an-beat 1.8s ease-in-out infinite}
@keyframes an-beat{0%,100%{transform:scale(1)}12%{transform:scale(1.04)}24%{transform:scale(1)}36%{transform:scale(1.03)}}
.an .lock.go .heartbody{animation:an-shk .7s .2s}
@keyframes an-shk{15%{transform:rotate(-3deg)}35%{transform:rotate(3deg)}55%{transform:rotate(-2deg)}75%{transform:rotate(2deg)}}
.an .lock.go .shackle{animation:an-open 1s .9s cubic-bezier(.3,1.4,.5,1) forwards}
@keyframes an-open{0%{transform:none}50%{transform:translateY(-30px)}100%{transform:translateY(-30px) rotate(-38deg)}}
.an .rays{opacity:0;transform-box:fill-box;transform-origin:center}
.an .lock.go .rays{animation:an-rays 1.6s .95s ease-out forwards}
@keyframes an-rays{0%{opacity:0;transform:scale(.3) rotate(0)}30%{opacity:1}100%{opacity:0;transform:scale(2.2) rotate(40deg)}}
.an .lock.go .hint{opacity:0}
.an .hint{animation:an-tw 2s ease-in-out infinite;transition:opacity .3s}

/* ---------- flip-card reveal ---------- */
.an .panel{position:relative;z-index:2;width:92%;padding:26px 16px 20px;background:linear-gradient(180deg,#16244aee,#0d1530ee);border:1px solid var(--gold);border-radius:24px;box-shadow:0 0 0 6px #0d1530,0 0 0 7px #e0bf7a55,0 20px 60px #000a}
.an .names{font-family:"Pinyon Script",cursive;font-size:clamp(2.6rem,12vw,3.6rem);line-height:1.15;color:var(--gold)}
.an .names em{font-style:normal;color:var(--silver);font-size:.7em}
.an .small{margin:0;font-size:.95rem;color:var(--muted)}
.an .jub{font:italic 600 1.6rem "Cormorant Garamond",serif;color:var(--silver);margin:2px 0 6px}
.an .cards{display:flex;justify-content:center;gap:12px;margin:14px 0 6px;position:relative;perspective:900px}
.an .cards::before{content:"";position:absolute;left:4%;right:4%;top:-6px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.an .flip{position:relative;width:30%;max-width:104px;aspect-ratio:3/4.2;padding:0;border:0;background:none;cursor:pointer;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.3,1.3,.5,1);animation:an-sway 3.4s ease-in-out infinite;transform-origin:50% -10px;-webkit-tap-highlight-color:transparent}
.an .flip:nth-child(2){animation-delay:.4s}.an .flip:nth-child(3){animation-delay:.8s}
@keyframes an-sway{0%,100%{rotate:-2.5deg}50%{rotate:2.5deg}}
.an .flip.on{transform:rotateY(180deg);animation:none}
.an .face{position:absolute;inset:0;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.an .face.front{background:linear-gradient(160deg,#243a72,#16244a);border:1.5px solid var(--gold);box-shadow:inset 0 0 0 4px #16244a,inset 0 0 0 5px #e0bf7a66}
.an .face.back{transform:rotateY(180deg);background:linear-gradient(160deg,#fffaf0,#efe3cf);border:1.5px solid var(--gold);color:#16244a;box-shadow:0 0 18px #e0bf7a88}
.an .face.back b{font:700 2.1rem "Cormorant Garamond",serif;line-height:1}
.an .face.back span{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;margin-top:4px;color:#7b6a45}
.an .peg{position:absolute;top:-9px;left:50%;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:var(--silver);border:1px solid #fff}
.an .hint2{font-size:.88rem;color:var(--muted);margin:8px 0 0}

/* ---------- heart iris transition ---------- */
.an .iris{z-index:45;pointer-events:none;background:transparent}
.an .iris svg{width:100%;height:100%;display:block}
.an .iris-h{transform-origin:50px 50px;animation:an-iris 2s .2s cubic-bezier(.6,0,.3,1) forwards}
@keyframes an-iris{from{transform:scale(1)}to{transform:scale(34)}}

/* ---------- main ---------- */
.an main{position:relative;background:linear-gradient(180deg,#0d1530,#16244a 40%,#0d1530 100%)}
.an .bubbles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.an .bubbles i{position:absolute;bottom:-30px;border-radius:50%;border:1px solid #ffffff55;background:radial-gradient(circle at 30% 30%,#ffffff55,#ffffff08);animation:an-bub linear infinite}
@keyframes an-bub{to{transform:translateY(-115vh) translateX(24px)}}
.an .hero{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:90px 14px 50px;overflow:hidden}
.an .lights{position:absolute;top:0;left:0;width:100%;height:90px}
.an .bulb{animation:an-tw 2.6s ease-in-out infinite}
.an .jubilee{font-size:1.15rem;margin:0;color:var(--gold);letter-spacing:.3em;text-transform:uppercase;font-weight:500}
.an .big25{font:700 clamp(8rem,44vw,14rem)/.9 "Cormorant Garamond",serif;background:linear-gradient(180deg,#fff 0%,#d3dae6 45%,#8f9bb3 70%,#e8eef7 100%);-webkit-background-clip:text;background-clip:text;color:transparent;margin:6px 0 0;filter:drop-shadow(0 6px 24px #0008)}
.an .years{font-size:clamp(2rem,9vw,2.8rem);color:var(--rose);margin:-8px 0 8px}
.an .couple{font-family:"Cormorant Garamond",serif;font-style:italic;font-weight:500;font-size:clamp(1.9rem,8vw,2.6rem);color:var(--ivory)}
.an .couple span{color:var(--gold);padding:0 .15em}
.an .glassbtn{display:block;margin:14px auto 0;padding:0;border:0;background:none;cursor:pointer;width:min(280px,72vw)}
.an .glassbtn svg{width:100%;overflow:visible}
.an .gl-l,.an .gl-r{transform-box:view-box;transition:transform .5s cubic-bezier(.3,1.5,.5,1)}
.an .gl-l{transform-origin:112px 236px}.an .gl-r{transform-origin:188px 236px}
.an .glassbtn.on .gl-l{transform:rotate(17deg)}.an .glassbtn.on .gl-r{transform:rotate(-17deg)}
.an .spark{opacity:0;transform-box:fill-box;transform-origin:center}
.an .glassbtn.on .spark{animation:an-spk 1.4s .25s ease-out forwards}
@keyframes an-spk{0%{opacity:0;transform:scale(.2)}30%{opacity:1;transform:scale(1.2)}100%{opacity:0;transform:scale(1.8) rotate(30deg)}}
.an .toast{min-height:2em;margin:8px 0 0;font-size:1.9rem;color:var(--gold)}
.an section{position:relative;z-index:2;max-width:720px;margin:0 auto;padding:34px 16px;text-align:center}
.an h2{font-size:clamp(2rem,7vw,2.7rem);font-style:italic;color:var(--ivory);margin-bottom:6px}
.an .rule{display:flex;align-items:center;justify-content:center;gap:12px;color:var(--gold);margin:0 0 18px}
.an .rule::before,.an .rule::after{content:"";width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--gold))}
.an .rule::after{transform:scaleX(-1)}
.an .glass{background:linear-gradient(160deg,#ffffff14,#ffffff05);border:1px solid #e0bf7a66;border-radius:18px;padding:18px 16px;backdrop-filter:blur(6px)}
.an .cdn{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
.an .cdn div{min-width:74px;padding:10px 6px;border:1px solid #e0bf7a66;border-radius:14px;background:#ffffff0d}
.an .cdn b{display:block;font:600 2.3rem "Cormorant Garamond",serif;color:var(--gold);line-height:1.1}.an .cdn span{font-size:.72rem;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}
.an .cdn.sm{gap:7px}.an .cdn.sm div{min-width:54px;padding:5px 4px}.an .cdn.sm b{font-size:1.5rem}.an .cdn.sm span{font-size:.58rem}

/* timeline */
.an .tl{position:relative;display:flex;flex-direction:column;gap:22px;padding:6px 0}
.an .tl::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(var(--gold),#e0bf7a22);transform:translateX(-50%)}
.an .tl-i{position:relative;width:calc(50% - 22px);text-align:left;opacity:0;transition:opacity .8s,transform .9s cubic-bezier(.22,1,.36,1)}
.an .tl-i.l{align-self:flex-start;transform:translateX(-30px);text-align:right}
.an .tl-i.r{align-self:flex-end;transform:translateX(30px)}
.an .tl-i.in{opacity:1;transform:none}
.an .tl-i::after{content:"";position:absolute;top:14px;width:13px;height:13px;border-radius:50%;background:var(--night);border:2px solid var(--gold);box-shadow:0 0 0 4px #e0bf7a22}
.an .tl-i.l::after{right:-29px}.an .tl-i.r::after{left:-29px}
.an .tl-y{font:600 1.7rem "Cormorant Garamond",serif;color:var(--rose)}
.an .tl-i h3{font-size:1.2rem;font-style:italic}.an .tl-i p{margin:2px 0 0;font-size:.88rem;color:var(--muted);line-height:1.5}

/* events */
.an .plan{display:flex;flex-direction:column;gap:14px}
.an .ev{display:flex;gap:14px;align-items:center;text-align:left;opacity:0;transform:translateY(18px);transition:opacity .7s,transform .8s cubic-bezier(.22,1,.36,1)}
.an .ev.in{opacity:1;transform:none}
.an .ev .ico{flex:none;width:54px;height:54px;border-radius:50%;border:1px solid var(--gold);background:#16244a;display:flex;align-items:center;justify-content:center;font-size:1.6rem}
.an .ev h3{font-size:1.3rem}.an .ev p{margin:0;font-size:.92rem;color:var(--muted)}
.an .qr{display:inline-block;margin:12px 0 4px;padding:12px;background:#fff;border:2px solid var(--gold);border-radius:14px;line-height:0}
.an .btn{display:inline-block;margin-top:10px;padding:.65rem 1.7rem;border:1px solid var(--gold);border-radius:999px;color:var(--night);background:linear-gradient(135deg,#f3dba0,#d3a954);font:600 1rem Manrope;text-decoration:none;cursor:pointer;transition:transform .2s,box-shadow .2s;box-shadow:0 6px 20px #d3a95433}
.an .btn:hover{transform:translateY(-2px);box-shadow:0 10px 26px #d3a95455}
.an .btn.wa{background:#25d366;color:#fff;border-color:#25d366}
.an .photo{width:min(78%,260px);aspect-ratio:3/4;object-fit:cover;border-radius:140px 140px 14px 14px;border:1px solid var(--gold);box-shadow:0 0 0 6px #0d1530,0 0 0 7px #e0bf7a66;display:block;margin:6px auto 16px;background:#16244a}
.an .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#243a72,#16244a);color:var(--gold);font:italic 600 1.6rem "Cormorant Garamond",serif;text-align:center;padding:1rem}
.an .car{position:relative;max-width:340px;margin:1rem auto}
.an .frame{position:relative;aspect-ratio:4/5;border:1px solid var(--gold);box-shadow:0 0 0 6px #0d1530,0 0 0 7px #e0bf7a66,0 20px 40px #0008;border-radius:6px;overflow:hidden;background:#16244a}
.an .slide{position:absolute;inset:0;opacity:0;transition:opacity .9s}.an .slide.on{opacity:1}
.an .slide>img{width:100%;height:100%;object-fit:cover;display:block}
.an .slide>.ph{width:100%;height:100%}
.an .cap{margin:1rem 0 .2rem;font-size:1.5rem;color:var(--gold)}
.an .arr{position:absolute;top:44%;z-index:2;width:40px;height:40px;border-radius:50%;border:1px solid var(--gold);background:#0d1530cc;color:var(--gold);font-size:1.4rem;line-height:1;cursor:pointer}
.an .arr.l{left:-14px}.an .arr.r{right:-14px}
.an .dots{display:flex;justify-content:center;gap:7px;margin-top:6px}.an .dots button{width:8px;height:8px;border-radius:50%;border:1px solid var(--gold);background:transparent;padding:0;cursor:pointer}.an .dots button.on{background:var(--gold)}
.an .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:60;width:42px;height:42px;border-radius:50%;border:1px solid var(--gold);background:#0d1530cc;color:var(--gold);cursor:pointer;font-size:1.1rem}
.an .conf{position:fixed;inset:0;width:100%;height:100%;z-index:70;pointer-events:none}
.an footer{position:relative;z-index:2;padding:30px 14px 46px;text-align:center;color:var(--muted)}
.an button:focus-visible,.an a:focus-visible,.an .lock:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
@media (max-width:420px){.an .tl-i{width:calc(50% - 18px)}.an .tl-i h3{font-size:1.05rem}}
@media (prefers-reduced-motion:reduce){.an *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.an .ev,.an .tl-i{opacity:1!important;transform:none!important}}
`;

/* ---------- shared bits ---------- */
const HEART = "M50 66C26 48 28 30 40 30C46 30 50 35 50 38C50 35 54 30 60 30C72 30 74 48 50 66Z";

function Stars({ n = 40 }) {
  // deterministic positions so SSR and client match
  const items = Array.from({ length: n }, (_, i) => ({
    l: (i * 37.7) % 100,
    t: (i * 53.3 + (i % 5) * 7) % 100,
    d: ((i * 0.37) % 3.4).toFixed(2),
    s: i % 7 === 0 ? 4 : 3,
  }));
  return (
    <div className="stars" aria-hidden="true">
      {items.map((s, i) => (<i key={i} style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.d}s`, width: s.s, height: s.s }} />))}
    </div>
  );
}

function Bubbles() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    l: (i * 29 + 6) % 96, s: 8 + ((i * 7) % 18), d: 14 + ((i * 5) % 12), dl: -((i * 3.1) % 14),
  }));
  return (
    <div className="bubbles" aria-hidden="true">
      {items.map((b, i) => (<i key={i} style={{ left: `${b.l}%`, width: b.s, height: b.s, animationDuration: `${b.d}s`, animationDelay: `${b.dl}s` }} />))}
    </div>
  );
}

function FairyLights() {
  const bulbs = [];
  const n = 13;
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * (400 / n);
    const y = 12 + 16 * Math.sin((i / (n - 1)) * Math.PI);
    bulbs.push(
      <g key={i} className="bulb" style={{ animationDelay: `${(i % 5) * 0.4}s` }}>
        <path d={`M${x} ${y - 4}v6`} stroke="#8f9bb3" strokeWidth="1.5" />
        <circle cx={x} cy={y + 12} r="6" fill={i % 2 ? "#f3dba0" : "#ffe9c4"} />
        <circle cx={x} cy={y + 12} r="13" fill="#f3dba0" opacity=".16" />
      </g>
    );
  }
  return (
    <svg className="lights" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6Q200 40 400 6" stroke="#8f9bb3" strokeWidth="1.5" fill="none" />
      {bulbs}
    </svg>
  );
}

/* ---------- Stage 1: heart padlock ---------- */
function HeartLock() {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="a-bg" cx=".5" cy=".38" r=".8"><stop offset="0" stopColor="#2c4287" /><stop offset=".6" stopColor="#0d1530" /></radialGradient>
        <linearGradient id="a-sil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".45" stopColor="#c3ccdb" /><stop offset="1" stopColor="#8794ad" /></linearGradient>
        <linearGradient id="a-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6e2ad" /><stop offset=".5" stopColor="#d3a954" /><stop offset="1" stopColor="#f0d28b" /></linearGradient>
      </defs>
      <rect width="400" height="720" fill="url(#a-bg)" />
      {Array.from({ length: 34 }, (_, i) => (
        <circle key={i} cx={(i * 97) % 400} cy={(i * 61) % 720} r={i % 5 === 0 ? 2.2 : 1.3} fill="#fff" opacity=".7" className="hint" style={{ animationDelay: `${(i % 7) * 0.3}s` }} />
      ))}
      <text x="200" y="120" textAnchor="middle" fontFamily="Pinyon Script,cursive" fontSize="52" fill="#e0bf7a">{A.years} years of us</text>
      <text x="200" y="160" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="15" fill="#a9b3c9" letterSpacing="4">{A.first.toUpperCase()}  &amp;  {A.second.toUpperCase()}</text>

      {/* light rays behind the lock */}
      <g className="rays" transform="translate(200 440)">
        {rays.map((r) => (<path key={r} transform={`rotate(${r})`} d="M-6 -60L0 -230L6 -60Z" fill="#f3dba0" opacity=".55" />))}
      </g>

      {/* shackle */}
      <g className="shackle">
        <path d="M158 392V330a42 42 0 0 1 84 0V392" fill="none" stroke="url(#a-sil)" strokeWidth="17" strokeLinecap="round" />
        <path d="M158 392V330a42 42 0 0 1 84 0V392" fill="none" stroke="#ffffff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" transform="translate(-3 0)" />
      </g>
      {/* heart body */}
      <g className="heartbody">
        <path d="M200 590C70 490 78 330 160 330C186 330 200 350 200 368C200 350 214 330 240 330C322 330 330 490 200 590Z" fill="url(#a-sil)" stroke="#6c7a96" strokeWidth="3" />
        <path d="M200 568C92 484 96 346 160 346C180 346 192 358 196 372" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
        <path d="M200 556C112 484 114 366 164 366C182 366 196 380 200 394C204 380 218 366 236 366C286 366 288 484 200 556Z" fill="none" stroke="url(#a-gold)" strokeWidth="3" />
        <circle cx="200" cy="456" r="26" fill="#16244a" stroke="url(#a-gold)" strokeWidth="4" />
        <path d="M200 446a8 8 0 1 1 0 16l5 22h-10l5-22" fill="#e0bf7a" />
      </g>
      <text className="hint" x="200" y="660" textAnchor="middle" fontFamily="Manrope,sans-serif" fontSize="16" fill="#d3dae6" letterSpacing="3">TAP TO UNLOCK</text>
    </svg>
  );
}

/* ---------- Stage 2: flip the memory cards ---------- */
function FlipCards({ onDone, onStart, onSound }) {
  const [on, setOn] = useState([]);
  const done = useRef(false);
  const labels = ["day", "month", "year"];
  const flip = (i) => {
    if (on.includes(i)) return;
    onStart && onStart();
    onSound && onSound();
    const next = [...on, i];
    setOn(next);
    if (!done.current && next.length === A.dateParts.length) { done.current = true; onDone(); }
  };
  return (
    <div className="cards" aria-live="polite">
      {A.dateParts.map((p, i) => (
        <button key={i} type="button" className={"flip" + (on.includes(i) ? " on" : "")} onClick={() => flip(i)} aria-label={on.includes(i) ? `${labels[i]} ${p}` : `Flip card ${i + 1}`}>
          <span className="peg" />
          <span className="face front">
            <svg width="34" height="34" viewBox="0 0 100 100" aria-hidden="true"><path d={HEART} fill="none" stroke="#e0bf7a" strokeWidth="4" /></svg>
            <span className="serif" style={{ color: "#e0bf7a", fontSize: "1.4rem", marginTop: 4 }}>?</span>
          </span>
          <span className="face back"><b>{p}</b><span>{labels[i]}</span></span>
        </button>
      ))}
    </div>
  );
}

/* ---------- champagne flutes ---------- */
function Flute({ x, cls }) {
  return (
    <g className={cls} transform={`translate(${x} 0)`}>
      <path d="M-20 70C-22 130 -12 168 0 180C12 168 22 130 20 70Z" fill="#ffffff22" stroke="#d3dae6" strokeWidth="3" strokeLinejoin="round" />
      <path d="M-18 104C-18 140 -10 168 0 178C10 168 18 140 18 104Z" fill="#f3dba0" opacity=".85" />
      <ellipse cx="0" cy="104" rx="18" ry="3.5" fill="#fff3cf" />
      {[[-5, 130, 2.5], [5, 118, 2], [0, 150, 2], [-7, 158, 1.6], [8, 140, 1.8]].map(([cx, cy, r], i) => (<circle key={i} cx={cx} cy={cy} r={r} fill="#fff" opacity=".8" />))}
      <path d="M-14 82C-14 120 -9 150 -4 165" stroke="#fff" strokeOpacity=".55" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M0 180V236" stroke="#d3dae6" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="0" cy="240" rx="26" ry="6" fill="#c3ccdb" stroke="#8794ad" strokeWidth="2.5" />
    </g>
  );
}
function Glasses({ clinked, onClink }) {
  return (
    <button type="button" className={"glassbtn" + (clinked ? " on" : "")} onClick={onClink} aria-label={clinked ? "Cheers!" : "Tap to clink the glasses"}>
      <svg viewBox="0 0 300 270" aria-hidden="true">
        <Flute x={112} cls="gl-l" />
        <Flute x={188} cls="gl-r" />
        <g transform="translate(150 78)">
          <polygon className="spark" points="0,-30 7,-8 30,0 7,8 0,30 -7,8 -30,0 -7,-8" fill="#f3dba0" />
          <polygon className="spark" points="0,-18 4,-5 18,0 4,5 0,18 -4,5 -18,0 -4,-5" fill="#fff" transform="translate(-40 -20)" />
          <polygon className="spark" points="0,-18 4,-5 18,0 4,5 0,18 -4,5 -18,0 -4,-5" fill="#fff" transform="translate(42 -26)" />
        </g>
      </svg>
    </button>
  );
}

/* ---------- reveal-on-scroll helper ---------- */
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

function EventCard({ event }) {
  const [ref, show] = useInView();
  return (
    <div ref={ref} className={"glass ev" + (show ? " in" : "")}>
      <div className="ico">{event.icon}</div>
      <div><h3>{event.name}</h3><p>{event.when} · {event.where}</p></div>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const [ref, show] = useInView();
  return (
    <div ref={ref} className={`tl-i ${index % 2 ? "r" : "l"}${show ? " in" : ""}`}>
      <div className="tl-y">{item.year}</div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
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
  const { over, parts } = useCountdown(A.dateISO);
  if (over) return <p className="script" style={{ fontSize: "2.2rem", margin: 0, color: "var(--gold)" }}>Today we celebrate!</p>;
  return (
    <div className={"cdn" + (small ? " sm" : "")} role="timer" aria-label="Time until the celebration">
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
  const g = A.gallery;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const x0 = useRef(null);
  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setI((n) => (n + 1) % g.length), 4800);
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
      </div>
      <button type="button" className="arr l" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
      <button type="button" className="arr r" onClick={() => go(1)} aria-label="Next photo">›</button>
      <p className="script cap">{g[i].caption}</p>
      <div className="dots">
        {g.map((_, k) => (<button type="button" key={k} className={k === i ? "on" : ""} onClick={() => { setHold(true); setI(k); }} aria-label={`Photo ${k + 1}`} />))}
      </div>
    </div>
  );
}

/* ---------- confetti: silver, gold & rose ---------- */
function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#f3dba0", "#d3a954", "#d3dae6", "#ffffff", "#e8aaa0", "#c3ccdb"];
    const ps = [];
    const t0 = performance.now();
    let id, n = 0;
    const spawn = () => ({
      x: Math.random() * w, y: -20 * dpr,
      vx: (Math.random() - 0.5) * 1.6 * dpr, vy: (1.6 + Math.random() * 3.2) * dpr,
      r: Math.random() * 6, vr: Math.random() * 0.2 - 0.1,
      s: (5 + Math.random() * 8) * dpr, c: col[n++ % col.length], o: n % 3,
      ph: Math.random() * 6, sw: (0.5 + Math.random()) * dpr,
    });
    const tick = (t) => {
      x.clearRect(0, 0, w, h);
      if (t - t0 < 3000) for (let i = 0; i < 6; i++) ps.push(spawn());
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
        if (p.o === 0) x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        else { x.beginPath(); x.arc(0, 0, p.s / 3, 0, 7); x.fill(); }
        x.restore();
      }
      if (t - t0 < 3000 || ps.length) id = requestAnimationFrame(tick);
      else x.clearRect(0, 0, w, h);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [fire]);
  return <canvas ref={ref} className="conf" aria-hidden="true" />;
}

/* ---------- built-in music: soft piano arpeggios on the Canon in D progression ---------- */
function makeSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const out = ctx.createGain();
  out.gain.value = 0.5;
  const verb = ctx.createDelay(0.5);
  const fb = ctx.createGain();
  const wet = ctx.createGain();
  verb.delayTime.value = 0.23;
  fb.gain.value = 0.35;
  wet.gain.value = 0.35;
  out.connect(ctx.destination);
  out.connect(verb); verb.connect(fb); fb.connect(verb); verb.connect(wet); wet.connect(ctx.destination);

  // each chord: bass note + 4 arpeggio notes
  const chords = [
    { b: 73.42, a: [146.83, 185.0, 220.0, 293.66] },   // D
    { b: 55.0, a: [138.59, 164.81, 220.0, 277.18] },   // A
    { b: 61.74, a: [146.83, 185.0, 246.94, 293.66] },  // Bm
    { b: 46.25, a: [138.59, 185.0, 220.0, 277.18] },   // F#m
    { b: 49.0, a: [123.47, 146.83, 196.0, 246.94] },   // G
    { b: 73.42, a: [146.83, 185.0, 220.0, 293.66] },   // D
    { b: 49.0, a: [123.47, 146.83, 196.0, 246.94] },   // G
    { b: 55.0, a: [138.59, 164.81, 220.0, 277.18] },   // A
  ];
  const melody = [
    [739.99, 659.25], [587.33, 554.37], [493.88, 440.0], [493.88, 554.37],
    [587.33, 554.37], [493.88, 440.0], [392.0, 369.99], [392.0, 329.63 * 2],
  ];
  const beat = 0.8;

  const key = (f, at, d, vol) => {
    [[1, 1], [2, 0.28], [3, 0.1]].forEach(([m, k]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = m === 1 ? "triangle" : "sine";
      o.frequency.value = f * m;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.linearRampToValueAtTime(vol * k, at + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0008, at + d);
      o.connect(g); g.connect(out);
      o.start(at); o.stop(at + d + 0.05);
    });
  };

  let ci = 0, t = ctx.currentTime + 0.3, timer;
  const run = () => {
    while (t < ctx.currentTime + 2) {
      const c = chords[ci % chords.length];
      const m = melody[ci % melody.length];
      key(c.b, t, beat * 3.6, 0.2);
      [0, 1, 2, 3, 2, 1, 2, 3].forEach((ix, k) => key(c.a[ix], t + k * beat * 0.5, 1.4, 0.07));
      m.forEach((f, k) => key(f, t + k * beat * 2, beat * 2.6, 0.085));
      t += beat * 4;
      ci++;
    }
    timer = setTimeout(run, 500);
  };
  run();

  const bell = (f, at, d, v) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(v, at);
    g.gain.exponentialRampToValueAtTime(0.0005, at + d);
    o.connect(g); g.connect(ctx.destination);
    o.start(at); o.stop(at + d + 0.05);
  };

  return {
    pause() { clearTimeout(timer); ctx.suspend(); },
    resume() { ctx.resume(); t = Math.max(t, ctx.currentTime + 0.2); run(); },
    tick() { const n = ctx.currentTime; bell(1318.5, n, 0.35, 0.12); bell(1975.5, n + 0.02, 0.25, 0.06); },
    clink() {
      const n = ctx.currentTime;
      bell(2637, n, 0.9, 0.2); bell(3520, n + 0.01, 0.7, 0.14); bell(4186, n + 0.015, 0.5, 0.08); bell(2093, n + 0.02, 1.1, 0.1);
    },
    get on() { return ctx.state === "running"; },
  };
}

export default function AnniversaryPage() {
  const [stage, setStage] = useState("lock"); // lock → invite → iris → main
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [go, setGo] = useState(false);
  const [clinked, setClinked] = useState(false);
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
    if (A.music && audio.current) {
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

  const unlock = useCallback((withSound = true) => {
    if (withSound) play();
    setTimeout(() => setStage("invite"), 3100);
  }, [play]);

  const tap = () => { if (go) return; setGo(true); unlock(true); };

  useEffect(() => {
    if (stage !== "lock" || go) return;
    const t = setTimeout(() => { setGo(true); unlock(false); }, 4500);
    return () => clearTimeout(t);
  }, [stage, go, unlock]);

  const ensureMusic = () => { if (!playing) play(); };

  const allFlipped = () => {
    setRevealed(true);
    setConfetti((c) => c + 1);
    setTimeout(() => setStage("iris"), 2800);
    setTimeout(() => setStage("main"), 5000);
  };

  const clink = () => {
    if (clinked) return;
    ensureMusic();
    setClinked(true);
    setConfetti((c) => c + 1);
    setTimeout(() => synth.current && synth.current.clink(), 150);
  };

  const SITE_URL = "https://www.seankrixtechnologies.com";
  const PAGE_URL = `${SITE_URL}/anniversary-invitation`;
  const OG_IMAGE = `${SITE_URL}/og-anniversary.webp`; // 1200x630 image in /public
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Wedding Anniversary Invitation | ${A.first} & ${A.second} ${A.years}th Anniversary`,
    description: "Interactive digital wedding anniversary invitation with heart-lock reveal, flip-card date, clinking glasses, journey timeline, live countdown, music and Google Maps QR by Seankrix Technologies, Jaipur.",
    url: PAGE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Seankrix Technologies",
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  };

  const rsvpHref = `https://wa.me/${A.rsvpPhone}?text=${encodeURIComponent(`Hello! We will be there to celebrate ${A.first} & ${A.second}'s ${A.years}th anniversary on ${A.dateLabel} 🥂`)}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1530" />
        <title>{`Wedding Anniversary Invitation — ${A.first} & ${A.second}, ${A.years} Years | Seankrix Technologies`}</title>
        <meta name="description" content={`Join us for ${A.first} & ${A.second}'s ${A.years}th wedding anniversary on ${A.dateLabel}. Interactive digital invitation with heart-lock reveal, countdown, timeline, venue QR & RSVP. By Seankrix Technologies, Jaipur.`} />
        <meta name="keywords" content="wedding anniversary invitation India, 25th anniversary invitation, silver jubilee invite, digital anniversary card, online anniversary invitation Jaipur, Seankrix Technologies" />
        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content={`${A.years} Years of Love — ${A.first} & ${A.second}'s Anniversary`} />
        <meta property="og:description" content="Unlock the heart, flip the date cards and join the celebration. Interactive anniversary invitation by Seankrix Technologies." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Digital wedding anniversary invitation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={`${A.first} & ${A.second} — ${A.years} Years Together`} />
        <meta name="twitter:description" content="Interactive wedding anniversary invitation with heart-lock reveal, countdown and venue QR." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="an">
        <style>{css}</style>
        {A.music && <audio ref={audio} src={A.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "lock" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}

        {/* 1. heart padlock */}
        {stage === "lock" && (
          <div
            className={"full lock" + (go ? " go" : "")}
            role="button"
            tabIndex={0}
            aria-label={`${A.years} years of love. Tap to unlock the invitation.`}
            onClick={tap}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tap())}
          >
            <div className="stage"><HeartLock /></div>
          </div>
        )}

        {/* 2. flip the date cards */}
        {stage === "invite" && (
          <div className="full bg-night" onPointerDown={ensureMusic}>
            <Stars n={46} />
            <div className="stage">
              <div className="panel fade-up">
                <p className="small">{A.host} {A.hostLine.split(" their")[0]}</p>
                <h1 className="names">{A.first} <em>&amp;</em> {A.second}</h1>
                <p className="jub">{A.years}th Anniversary · {A.milestone}</p>
                <FlipCards onDone={allFlipped} onStart={ensureMusic} onSound={() => synth.current && synth.current.tick()} />
                {revealed ? (
                  <div className="fade-up" style={{ marginTop: 12 }}>
                    <Countdown small />
                    <p className="script" style={{ margin: "6px 0 0", fontSize: "1.5rem", color: "var(--rose)" }}>until we celebrate together</p>
                  </div>
                ) : (
                  <p className="hint2">Tap each card to reveal the date</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. heart iris */}
        {stage === "iris" && (
          <div className="full iris">
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <mask id="a-iris">
                  <rect width="100" height="100" fill="#fff" />
                  <path className="iris-h" d={HEART} fill="#000" />
                </mask>
              </defs>
              <rect width="100" height="100" fill="#0d1530" mask="url(#a-iris)" />
            </svg>
          </div>
        )}

        {/* 4. main page */}
        {(stage === "iris" || stage === "main") && (
          <main>
            <Bubbles />

            <div className="hero">
              <Stars n={60} />
              <FairyLights />
              <p className="jubilee">{A.milestone}</p>
              <h1 className="big25" aria-label={`${A.years} years`}>{A.years}</h1>
              <p className="script years">years of love</p>
              <p className="couple">{A.first} <span>&amp;</span> {A.second}</p>
              <Glasses clinked={clinked} onClink={clink} />
              <p className="script toast" aria-live="polite">{clinked ? "Cheers to 25 years!".replace("25", String(A.years)) : "Tap the glasses to make a toast"}</p>
              <p style={{ margin: "16px 0 0", fontWeight: 600, fontSize: "1.1rem" }}>{A.day}, {A.dateLabel}</p>
              <p className="muted" style={{ margin: 0 }}>{A.time} · {A.city}</p>
              <p className="muted" style={{ margin: "10px 0 0", fontSize: ".9rem", maxWidth: 420 }}>Hosted by {A.host}</p>
            </div>

            <section>
              <h2>Counting down</h2>
              <div className="rule">✦</div>
              <Countdown />
            </section>

            <section>
              <h2>Our journey</h2>
              <div className="rule">✦</div>
              <div className="tl">
                {A.journey.map((j, i) => <TimelineItem key={j.year} item={j} index={i} />)}
              </div>
            </section>

            <section>
              <h2>The evening</h2>
              <div className="rule">✦</div>
              <div className="plan">
                {A.events.map((e) => <EventCard key={e.name} event={e} />)}
              </div>
              <p className="muted" style={{ marginTop: 18 }}>Dress code: <span style={{ color: "var(--ivory)" }}>{A.dress}</span></p>
            </section>

            <section>
              <h2>Venue</h2>
              <div className="rule">✦</div>
              <div className="glass">
                <p style={{ margin: 0 }}>{A.venue}</p>
                <div className="qr">
                  <QRCodeSVG value={A.mapUrl} size={150} level="M" bgColor="#ffffff" fgColor="#0d1530" title="Scan for the venue location" />
                </div>
                <p className="muted" style={{ margin: 0 }}>Scan for directions</p>
                <a className="btn" href={A.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
              </div>
            </section>

            <section>
              <h2>{A.storyTag}</h2>
              <div className="rule">✦</div>
              <Photo className="photo" src={A.photo} label={`${A.first} & ${A.second}`} />
              <Carousel />
              <p style={{ maxWidth: 500, margin: "12px auto 0" }}>{A.story}</p>
            </section>

            <section>
              <h2>Will you join us?</h2>
              <div className="rule">✦</div>
              <div className="glass">
                <p style={{ margin: "0 0 4px" }}>Please let us know by <b>{A.rsvpBy}</b>.</p>
                <a className="btn wa" href={rsvpHref} target="_blank" rel="noreferrer">Reply on WhatsApp</a>
              </div>
            </section>

            <footer>
              <p className="script" style={{ fontSize: "2rem", color: "var(--gold)", margin: 0 }}>With love, {A.host}</p>
              <p style={{ margin: "4px 0 0" }}>{A.first} &amp; {A.second} · {A.years} years · {A.dateLabel} · {A.city}</p>
            </footer>
          </main>
        )}
      </div>
    </>
  );
}
