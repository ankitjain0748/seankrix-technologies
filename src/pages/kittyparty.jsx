import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react

/* ================= EDIT YOUR DETAILS HERE ================= */
const K = {
  club: "Denim Divas Kitty Club",
  theme: "Denim & Diamonds",
  host: "Neha Agarwal",
  hostLine: "invites all her fabulous ladies to a",
  dateLabel: "5 December 2026",
  dateParts: ["05", "DEC", "2026"], // printed under the 3 rivet buttons
  dateISO: "2026-12-05T15:00:00", // live countdown target
  day: "Saturday",
  time: "3:00 pm – 7:00 pm",
  city: "Jaipur",
  venue: "Add venue / host's home address here, Jaipur, Rajasthan",
  mapUrl: "https://maps.google.com/?q=Jaipur",
  rsvpPhone: "919999999999", // WhatsApp number with country code, no + or spaces
  rsvpBy: "2 December",
  kitty: "₹2,000 per member", // leave "" to hide
  nextHost: "Pooja Mehta", // leave "" to hide
  luckyNote: "Show this card at the lucky draw table!",
  dress: "Denim on denim! Best look wins a prize.",
  events: [
    { icon: "🥤", name: "Welcome drinks & selfie wall", when: "3:00 pm", where: "Entrance lounge" },
    { icon: "👖", name: "Denim ramp walk", when: "3:45 pm", where: "The runway" },
    { icon: "🎲", name: "Tambola & fun games", when: "4:30 pm", where: "Main hall" },
    { icon: "🍰", name: "High tea & snacks", when: "5:30 pm", where: "Dining area" },
    { icon: "🎁", name: "Lucky draw & kitty reveal", when: "6:15 pm", where: "Main hall" },
  ],
  perks: [
    { icon: "💃", title: "Show-stopper prize", text: "Best denim look takes home the crown" },
    { icon: "🎶", title: "Music & dance", text: "Bollywood hits, antakshari & a dance floor" },
    { icon: "🎟️", title: "Lucky draw", text: "Gifts and surprises for every table" },
  ],
  music: "", // e.g. "/party-song.mp3" in /public. Empty = built-in upbeat party beat
  storyTag: "Our favourite kitty moments",
  story: "Good food, great gossip and way too much laughter. Bring your best denim, your biggest smile and your loudest cheer, because this one is going to be iconic.",
  gallery: [
    { src: "/assets/k1.jpg", caption: "Last month's ramp walk" },
    { src: "/assets/k2.jpg", caption: "Tambola champions" },
    { src: "/assets/k3.jpg", caption: "Squad goals" },
    { src: "/assets/k4.jpg", caption: "Cheers, ladies!" },
  ],
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Oswald:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap');
.kp{--d1:#2e5b8c;--d2:#1f3f66;--d3:#14263f;--wash:#e7f0fa;--ice:#cfe1f4;--thread:#f0c05a;--pink:#ff7fa5;--cream:#fffaf0;--ink:#14263f;--muted:#5d7391;
 font:400 1.03rem/1.6 Poppins,system-ui,sans-serif;color:var(--ink);min-height:100vh;overflow-x:hidden;
 background:#e7f0fa repeating-linear-gradient(135deg,#ffffff66 0 2px,transparent 2px 5px)}
.kp *{box-sizing:border-box}
.kp h1,.kp h2,.kp h3{margin:0;line-height:1.15}
.kp .script{font-family:"Kaushan Script",cursive;font-weight:400}
.kp .lab{font-family:Oswald,sans-serif;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.kp .muted{color:var(--muted)}
.kp .denim{background-color:var(--d1);background-image:repeating-linear-gradient(135deg,#ffffff12 0 1px,transparent 1px 3px),repeating-linear-gradient(45deg,#0000001c 0 1px,transparent 1px 3px),radial-gradient(120% 90% at 20% 0%,#3d70a5,#264b78);color:#fff}
.kp .stitch{position:relative}
.kp .stitch::after{content:"";position:absolute;inset:7px;border:2px dashed var(--thread);border-radius:inherit;pointer-events:none;opacity:.9}
.kp .full{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center}
.kp .stage{position:relative;width:100%;height:100%;max-width:520px;display:flex;align-items:center;justify-content:center}
.kp .pop-in{animation:kp-pop .7s cubic-bezier(.3,1.6,.5,1) both}
@keyframes kp-pop{from{opacity:0;transform:scale(.7) rotate(-3deg)}to{opacity:1;transform:none}}

/* ---------- zipper intro ---------- */
.kp .zip{z-index:50;cursor:pointer;background:transparent}
.kp .zip .half{position:absolute;top:0;bottom:0;width:50.2%}
.kp .zip .half.l{left:0;clip-path:polygon(0 0,50% 0,50% 0,50% 100%,0 100%)}
.kp .zip .half.r{right:0;clip-path:polygon(100% 0,50% 0,50% 0,50% 100%,100% 100%)}
.kp .zip .teeth{position:absolute;top:0;bottom:0;width:13px;background:repeating-linear-gradient(180deg,#e9eef4 0 8px,#8d9bad 8px 10px,transparent 10px 16px)}
.kp .zip .l .teeth{right:0}.kp .zip .r .teeth{left:0;background-position:0 8px}
.kp .zip .tape{position:absolute;top:0;bottom:0;width:22px;background:#f0c05a;opacity:.0}
.kp .zip .title{position:absolute;left:0;right:0;top:34%;text-align:center;color:#fff;text-shadow:0 3px 14px #0006;padding:0 24px}
.kp .zip .title .script{font-size:clamp(2.6rem,12vw,3.6rem);line-height:1.1;color:#fff}
.kp .slider{position:absolute;left:50%;top:0;width:54px;margin-left:-27px;z-index:3;filter:drop-shadow(0 6px 8px #0007)}
.kp .zip .hint{position:absolute;left:0;right:0;bottom:12%;color:#fff;text-shadow:0 2px 8px #0008;animation:kp-bl 1.4s ease-in-out infinite}
@keyframes kp-bl{50%{opacity:.35}}
.kp .zip.go .half.l{animation:kp-zl 1.5s .15s cubic-bezier(.5,0,.4,1) forwards,kp-sl .6s 1.65s ease-in forwards}
.kp .zip.go .half.r{animation:kp-zr 1.5s .15s cubic-bezier(.5,0,.4,1) forwards,kp-sr .6s 1.65s ease-in forwards}
.kp .zip.go .slider{animation:kp-pull 1.5s .15s cubic-bezier(.5,0,.4,1) forwards}
.kp .zip.go .hint,.kp .zip.go .title{opacity:0;transition:opacity .4s}
@keyframes kp-zl{to{clip-path:polygon(0 0,0 0,50% 100%,50% 100%,0 100%)}}
@keyframes kp-zr{to{clip-path:polygon(100% 0,100% 0,50% 100%,50% 100%,100% 100%)}}
@keyframes kp-sl{to{transform:translateX(-105%)}}@keyframes kp-sr{to{transform:translateX(105%)}}
@keyframes kp-pull{from{top:0}to{top:calc(100% - 96px)}}

/* ---------- rivet button reveal ---------- */
.kp .invite{background:linear-gradient(180deg,#cfe1f4,#e7f0fa)}
.kp .panel{position:relative;z-index:2;width:90%;padding:26px 16px 20px;border-radius:26px;box-shadow:0 20px 50px #14263f55,0 0 0 4px #14263f}
.kp .waist{display:inline-block;padding:6px 20px;background:linear-gradient(160deg,#b57a46,#8b5a2b);border-radius:6px;color:#f7e3c0;font-size:.82rem;box-shadow:inset 0 0 0 2px #8b5a2b,inset 0 0 0 3px #e3b97a99,0 3px 0 #5c3a1a;text-shadow:0 1px 0 #5c3a1a}
.kp .names{font-family:"Kaushan Script",cursive;font-size:clamp(2.2rem,10vw,3.1rem);line-height:1.1;color:#fff;margin:12px 0 2px;text-shadow:0 3px 0 #14263f}
.kp .names i{font-style:normal;color:var(--pink)}
.kp .small{margin:0;font-size:.95rem;color:#d8e6f6}
.kp .slots{display:flex;justify-content:center;gap:10px;margin:18px 0 6px}
.kp .slot{position:relative;width:30%;max-width:98px;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 50% 40%,#173456,#0f2440);box-shadow:inset 0 4px 10px #000a,0 0 0 3px #f0c05a,0 0 0 5px #14263f;display:flex;flex-direction:column;align-items:center;justify-content:center}
.kp .slot b{font:600 1.65rem Oswald,sans-serif;letter-spacing:.04em;color:var(--thread);text-shadow:0 0 10px #f0c05a88}
.kp .slot.on{animation:kp-glow 1.2s ease-out}
@keyframes kp-glow{0%{box-shadow:inset 0 4px 10px #000a,0 0 0 3px #f0c05a,0 0 30px 10px #f0c05acc}100%{box-shadow:inset 0 4px 10px #000a,0 0 0 3px #f0c05a,0 0 0 5px #14263f}}
.kp .rivet{position:absolute;inset:-4px;border:0;padding:0;border-radius:50%;cursor:pointer;background:radial-gradient(circle at 35% 30%,#fff3d1,#e0a84d 45%,#a06f22 100%);box-shadow:0 4px 8px #0008,inset 0 -3px 6px #7a5316;display:flex;align-items:center;justify-content:center;animation:kp-wig 2.6s ease-in-out infinite;-webkit-tap-highlight-color:transparent}
.kp .rivet::before{content:"";position:absolute;inset:8px;border-radius:50%;border:2px solid #fff6;box-shadow:inset 0 2px 4px #fff8,inset 0 -2px 4px #7a5316}
.kp .rivet svg{position:relative;width:46%}
.kp .slot:nth-child(2) .rivet{animation-delay:.3s}.kp .slot:nth-child(3) .rivet{animation-delay:.6s}
@keyframes kp-wig{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg) scale(1.03)}}
.kp .rivet.gone{animation:kp-drop .9s cubic-bezier(.5,-.2,.8,.6) forwards;pointer-events:none}
@keyframes kp-drop{0%{transform:scale(1)}20%{transform:scale(1.25) rotate(40deg)}100%{transform:translateY(260px) rotate(480deg) scale(.7);opacity:0}}
.kp .hint2{font-size:.85rem;color:#c3d7ee;margin:8px 0 0}

/* ---------- swoosh transition ---------- */
.kp .swoosh{position:fixed;top:0;bottom:0;left:-30%;width:160%;z-index:75;pointer-events:none;transform:translateX(-120%) skewX(-14deg);animation:kp-sw 1.6s cubic-bezier(.7,0,.3,1) forwards}
.kp .swoosh::before,.kp .swoosh::after{content:"";position:absolute;top:0;bottom:0;width:0;border-left:3px dashed var(--thread)}
.kp .swoosh::before{left:14px}.kp .swoosh::after{right:14px}
@keyframes kp-sw{to{transform:translateX(120%) skewX(-14deg)}}

/* ---------- main ---------- */
.kp .hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:96px 16px 60px;overflow:hidden}
.kp .waistband{position:absolute;top:0;left:0;width:100%;height:78px}
.kp .big{font-family:"Kaushan Script",cursive;font-size:clamp(3.2rem,16vw,5.6rem);line-height:1.02;color:#fff;margin:12px 0 4px;text-shadow:0 4px 0 #14263f,0 0 24px #0005}
.kp .big span{color:var(--pink)}
.kp .tagwrap{position:relative;margin:8px auto 0;width:min(250px,70vw);transform-origin:50% 0;animation:kp-swing 3.2s ease-in-out infinite alternate}
@keyframes kp-swing{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.kp .hangtag{position:relative;margin-top:44px;padding:30px 14px 16px;background:var(--cream);color:var(--ink);clip-path:polygon(14% 0,86% 0,100% 12%,100% 100%,0 100%,0 12%);box-shadow:0 10px 24px #0006}
.kp .hangtag::before{content:"";position:absolute;inset:6px;border:2px dashed #e0678d;clip-path:inherit;pointer-events:none}
.kp .hangtag .lab{font-size:.7rem;color:#e0678d}
.kp .hangtag b{display:block;font:600 3rem/1 Oswald,sans-serif;letter-spacing:.02em;color:var(--d2)}
.kp .hangtag small{display:block;font-size:.85rem;color:var(--muted)}
.kp .hole{position:absolute;top:20px;left:50%;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#2e5b8c;box-shadow:inset 0 2px 4px #000a,0 0 0 3px #e9d8b4;z-index:2}
.kp .string{position:absolute;top:-34px;left:50%;width:80px;height:78px;margin-left:-40px;z-index:1}
.kp .pocketbtn{display:block;margin:20px auto 0;padding:0;border:0;background:none;cursor:pointer;width:min(210px,56vw)}
.kp .pocketbtn svg{width:100%;overflow:visible}
.kp .lucky{transform:translateY(0);transition:transform .9s cubic-bezier(.3,1.4,.5,1)}
.kp .pocketbtn.on .lucky{transform:translateY(-105px)}
.kp .pocketnote{min-height:2.6em;margin:8px 0 0;font-size:1.05rem;color:#fff}
section.kp-s{position:relative;z-index:2;max-width:720px;margin:0 auto;padding:30px 16px;text-align:center}
.kp h2{font-family:Oswald,sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:clamp(1.5rem,6vw,2rem);color:var(--d2);margin-bottom:4px}
.kp .under{display:flex;align-items:center;justify-content:center;gap:10px;margin:0 0 18px;color:var(--pink)}
.kp .under::before,.kp .under::after{content:"";width:64px;border-top:2px dashed var(--d1)}
.kp .card{border-radius:18px;padding:20px 16px;box-shadow:0 8px 0 #14263f33}
.kp .cd{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.kp .cd div{min-width:72px;padding:10px 6px;border-radius:12px;position:relative}
.kp .cd b{display:block;font:600 2.3rem Oswald,sans-serif;line-height:1.1}.kp .cd span{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#d8e6f6}
.kp .cd.sm{gap:6px}.kp .cd.sm div{min-width:54px;padding:6px 4px}.kp .cd.sm b{font-size:1.5rem}.kp .cd.sm span{font-size:.58rem}
.kp .plan{display:flex;flex-direction:column;gap:16px}
.kp .ev{display:flex;gap:14px;align-items:center;text-align:left;width:min(92%,470px);opacity:0;transition:opacity .7s,transform .8s cubic-bezier(.22,1,.36,1)}
.kp .ev.left{align-self:flex-start;transform:translateX(-40px) rotate(-1.5deg)}.kp .ev.right{align-self:flex-end;transform:translateX(40px) rotate(1.5deg)}
.kp .ev.in{opacity:1;transform:none}
.kp .ev .ico{flex:none;width:56px;height:56px;border-radius:50%;background:var(--cream);box-shadow:0 0 0 3px var(--thread);display:flex;align-items:center;justify-content:center;font-size:1.7rem}
.kp .ev h3{font-size:1.08rem;font-weight:600}.kp .ev p{margin:0;font-size:.88rem;color:#d8e6f6}
.kp .perks{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}
.kp .perks .ico{font-size:2.2rem}.kp .perks h3{font-size:1.05rem;margin-top:2px}.kp .perks p{margin:2px 0 0;font-size:.9rem;color:#d8e6f6}
.kp .chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:12px}
.kp .chip{padding:5px 14px;border-radius:999px;background:var(--cream);color:var(--d2);font-weight:500;font-size:.88rem;box-shadow:0 0 0 2px var(--thread)}
.kp .kit{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.kp .kit div{padding:12px 8px;border-radius:12px;background:#ffffff14;border:1px dashed #f0c05a99}
.kp .kit b{display:block;font:500 1.15rem Oswald,sans-serif;color:var(--thread)}.kp .kit span{font-size:.78rem;color:#d8e6f6;letter-spacing:.1em;text-transform:uppercase}
.kp .qr{display:inline-block;margin:12px 0 4px;padding:12px;background:#fff;border-radius:14px;line-height:0;box-shadow:0 0 0 3px var(--thread)}
.kp .btn{display:inline-block;margin-top:10px;padding:.65rem 1.7rem;border-radius:999px;background:var(--thread);color:var(--d3);font:600 1rem Poppins;text-decoration:none;box-shadow:0 5px 0 #a87a1c;transition:transform .15s,box-shadow .15s;cursor:pointer;border:0}
.kp .btn:hover{transform:translateY(2px);box-shadow:0 3px 0 #a87a1c}
.kp .btn.wa{background:#25d366;color:#fff;box-shadow:0 5px 0 #168a43}
.kp .ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#4e7fb4,#2e5b8c);color:#fff;font:1.6rem "Kaushan Script",cursive;text-align:center;padding:1rem}
.kp .car{position:relative;max-width:340px;margin:1rem auto}
.kp .frame{position:relative;aspect-ratio:4/5;border:9px solid #fffaf0;outline:3px dashed var(--d1);outline-offset:3px;box-shadow:0 12px 26px #14263f44;border-radius:6px;overflow:hidden;background:#2e5b8c;transform:rotate(-1.5deg)}
.kp .slide{position:absolute;inset:0;opacity:0;transition:opacity .8s}.kp .slide.on{opacity:1}
.kp .slide>img{width:100%;height:100%;object-fit:cover;display:block}.kp .slide>.ph{width:100%;height:100%}
.kp .cap{margin:1rem 0 .2rem;font-size:1.5rem;color:var(--d1)}
.kp .arr{position:absolute;top:44%;z-index:2;width:40px;height:40px;border-radius:50%;border:0;background:var(--thread);color:var(--d3);font-size:1.4rem;line-height:1;cursor:pointer;box-shadow:0 3px 0 #a87a1c}
.kp .arr.l{left:-12px}.kp .arr.r{right:-12px}
.kp .dots{display:flex;justify-content:center;gap:7px;margin-top:6px}.kp .dots button{width:10px;height:10px;border-radius:50%;border:2px solid var(--d1);background:#fff;padding:0;cursor:pointer}.kp .dots button.on{background:var(--pink);border-color:var(--pink)}
.kp .mute{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:12px;z-index:90;width:44px;height:44px;border-radius:50%;border:0;background:var(--thread);color:var(--d3);cursor:pointer;font-size:1.1rem;box-shadow:0 4px 0 #a87a1c}
.kp .conf{position:fixed;inset:0;width:100%;height:100%;z-index:95;pointer-events:none}
.kp footer{position:relative;z-index:2;padding:30px 16px 46px;text-align:center;color:var(--muted)}
.kp button:focus-visible,.kp a:focus-visible,.kp .zip:focus-visible{outline:3px solid var(--pink);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.kp *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.01s!important}.kp .ev{opacity:1!important;transform:none!important}}
`;

/* ---------- shared bits ---------- */
const DIAMOND = "M0 -14L12 -4L0 16L-12 -4Z";

function Waistband() {
  return (
    <svg className="waistband" viewBox="0 0 400 78" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="78" fill="#173456" />
      <path d="M0 10H400M0 68H400" stroke="#f0c05a" strokeWidth="2" strokeDasharray="7 5" />
      <path d="M0 16H400M0 62H400" stroke="#f0c05a" strokeWidth="1.5" strokeDasharray="5 5" opacity=".6" />
      {[40, 150, 250, 360].map((x) => (<g key={x}><rect x={x - 9} y="0" width="18" height="78" fill="#244a78" /><path d={`M${x - 9} 8V70M${x + 9} 8V70`} stroke="#f0c05a" strokeWidth="1.5" strokeDasharray="4 4" /></g>))}
      <g transform="translate(200 39)">
        <circle r="22" fill="#e0a84d" stroke="#a06f22" strokeWidth="3" />
        <circle r="15" fill="none" stroke="#fff3d1" strokeWidth="2" />
        <path d="M0 -9L2.6 -2.8L9 -2.8L3.8 1.2L5.8 7.4L0 3.8L-5.8 7.4L-3.8 1.2L-9 -2.8L-2.6 -2.8Z" fill="#fff3d1" />
      </g>
    </svg>
  );
}

function Sparkles({ n = 14 }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} viewBox="-14 -16 28 34" width={i % 3 === 0 ? 20 : 13} style={{ position: "absolute", left: `${(i * 37 + 8) % 94}%`, top: `${(i * 53 + 12) % 92}%`, opacity: 0.55, animation: `kp-bl ${2 + (i % 4) * 0.6}s ease-in-out ${(i % 5) * 0.3}s infinite` }}>
          <path d={DIAMOND} fill={i % 2 ? "#cfe1f4" : "#ff7fa5"} />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Stage 1: zipper ---------- */
function ZipperIntro({ go, onTap }) {
  return (
    <div
      className={"full zip" + (go ? " go" : "")}
      role="button"
      tabIndex={0}
      aria-label="Pull the zip down to open the invitation"
      onClick={onTap}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onTap())}
    >
      <div className="half l denim"><div className="teeth" /></div>
      <div className="half r denim"><div className="teeth" /></div>
      <div className="title">
        <p className="lab" style={{ margin: "0 0 6px", fontSize: ".85rem" }}>{K.club}</p>
        <div className="script">You’re<br />invited!</div>
      </div>
      <svg className="slider" viewBox="0 0 54 96" aria-hidden="true">
        <rect x="9" y="0" width="36" height="46" rx="8" fill="#e9eef4" stroke="#8d9bad" strokeWidth="2.5" />
        <rect x="16" y="8" width="22" height="28" rx="5" fill="#bcc7d4" />
        <path d="M27 46V54" stroke="#8d9bad" strokeWidth="5" />
        <rect x="12" y="52" width="30" height="40" rx="15" fill="#f0c05a" stroke="#a06f22" strokeWidth="3" />
        <rect x="21" y="62" width="12" height="20" rx="6" fill="#14263f" opacity=".85" />
      </svg>
      <p className="lab hint" style={{ fontSize: ".95rem" }}>Pull the zip down</p>
    </div>
  );
}

/* ---------- Stage 2: unbutton the rivets ---------- */
function RivetReveal({ onDone, onStart, onSound }) {
  const [gone, setGone] = useState([]);
  const done = useRef(false);
  const labels = ["day", "month", "year"];
  const pop = (i) => {
    if (gone.includes(i)) return;
    onStart && onStart();
    onSound && onSound();
    const next = [...gone, i];
    setGone(next);
    if (!done.current && next.length === K.dateParts.length) { done.current = true; onDone(); }
  };
  return (
    <div className="slots" aria-live="polite">
      {K.dateParts.map((p, i) => (
        <div key={i} className={"slot" + (gone.includes(i) ? " on" : "")}>
          <b>{p}</b>
          <span className="lab" style={{ fontSize: ".55rem", color: "#9db9d8" }}>{labels[i]}</span>
          <button type="button" className={"rivet" + (gone.includes(i) ? " gone" : "")} onClick={() => pop(i)} aria-label={gone.includes(i) ? `${labels[i]} ${p}` : `Unbutton rivet ${i + 1}`}>
            <svg viewBox="-20 -22 40 44" aria-hidden="true"><path d={DIAMOND} fill="#fff3d1" stroke="#a06f22" strokeWidth="2" /></svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------- jeans pocket surprise ---------- */
function Pocket({ open, onOpen }) {
  return (
    <button type="button" className={"pocketbtn" + (open ? " on" : "")} onClick={onOpen} aria-label={open ? "Lucky card pulled out" : "Tap the pocket for a surprise"}>
      <svg viewBox="0 -120 240 380" aria-hidden="true">
        <defs>
          <pattern id="kp-tw" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#2e5b8c" /><rect width="2" height="6" fill="#ffffff22" /></pattern>
        </defs>
        <g className="lucky">
          <rect x="45" y="30" width="150" height="110" rx="10" fill="#fffaf0" stroke="#f0c05a" strokeWidth="3" />
          <rect x="53" y="38" width="134" height="94" rx="6" fill="none" stroke="#ff7fa5" strokeWidth="2" strokeDasharray="5 4" />
          <text x="120" y="68" textAnchor="middle" fontFamily="Oswald,sans-serif" fontWeight="600" fontSize="15" letterSpacing="2" fill="#e0678d">LUCKY DRAW</text>
          <path transform="translate(120 96)" d={DIAMOND} fill="#2e5b8c" />
          <text x="120" y="124" textAnchor="middle" fontFamily="Poppins,sans-serif" fontWeight="500" fontSize="9.5" fill="#14263f">ENTRY CARD</text>
        </g>
        <path d="M20 20H220V168L120 242L20 168Z" fill="url(#kp-tw)" stroke="#14263f" strokeWidth="4" strokeLinejoin="round" />
        <path d="M30 30H210V162L120 228L30 162Z" fill="none" stroke="#f0c05a" strokeWidth="2.5" strokeDasharray="7 5" />
        <path d="M20 54H220" stroke="#14263f" strokeWidth="3" opacity=".5" />
        <path d="M20 60H220" stroke="#f0c05a" strokeWidth="2" strokeDasharray="6 5" />
        <path d="M78 100C100 140 140 140 162 100" fill="none" stroke="#f0c05a" strokeWidth="2.5" strokeDasharray="6 5" />
        <path d="M60 86C88 150 152 150 180 86" fill="none" stroke="#f0c05a" strokeWidth="2.5" strokeDasharray="6 5" />
        {[[30, 30], [210, 30]].map(([x, y]) => (<g key={x}><circle cx={x} cy={y} r="8" fill="#e0a84d" stroke="#a06f22" strokeWidth="2" /><circle cx={x - 2} cy={y - 2} r="2.5" fill="#fff3d1" /></g>))}
        <path transform="translate(120 180)" d={DIAMOND} fill="#ff7fa5" stroke="#14263f" strokeWidth="2" />
      </svg>
    </button>
  );
}

/* ---------- helpers ---------- */
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
    <div ref={ref} className={`card denim stitch ev ${index % 2 ? "right" : "left"}${show ? " in" : ""}`}>
      <div className="ico">{event.icon}</div>
      <div><h3>{event.name}</h3><p>{event.when} · {event.where}</p></div>
    </div>
  );
}

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
  const { over, parts } = useCountdown(K.dateISO);
  if (over) return <p className="script" style={{ fontSize: "2rem", margin: 0 }}>It’s party time, ladies!</p>;
  return (
    <div className={"cd" + (small ? " sm" : "")} role="timer" aria-label="Time until the kitty party">
      {parts.map(([l, v]) => (<div key={l} className="denim stitch"><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>))}
    </div>
  );
}

function Photo({ src, label, className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <div className={"ph " + (className || "")}><span>{label}</span></div>;
  return <img className={className} src={src} alt={label} onError={() => setBad(true)} />;
}

function Carousel() {
  const g = K.gallery;
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

function Confetti({ fire }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!fire || typeof window === "undefined") return;
    const c = ref.current;
    const x = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const col = ["#ff7fa5", "#f0c05a", "#ffffff", "#6fa3d8", "#2e5b8c", "#ffd1e0"];
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
        else if (p.o === 1) { x.beginPath(); x.arc(0, 0, p.s / 3, 0, 7); x.fill(); }
        else { x.beginPath(); x.moveTo(0, -p.s / 2); x.lineTo(p.s / 2.6, -p.s / 7); x.lineTo(0, p.s / 2); x.lineTo(-p.s / 2.6, -p.s / 7); x.closePath(); x.fill(); }
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

/* ---------- built-in music: upbeat party groove + zip / rivet sound effects ---------- */
function makeSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const out = ctx.createGain();
  out.gain.value = 0.5;
  out.connect(ctx.destination);

  const nb = ctx.createBuffer(1, 4410, 44100);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  const noise = (at, dur, type, freq, vol, q = 1) => {
    const s = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    s.buffer = nb;
    f.type = type; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(vol, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + dur);
    s.connect(f); f.connect(g); g.connect(out);
    s.start(at);
  };
  const kick = (at) => {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.frequency.setValueAtTime(150, at);
    o.frequency.exponentialRampToValueAtTime(45, at + 0.14);
    g.gain.setValueAtTime(0.7, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.28);
    o.connect(g); g.connect(out); o.start(at); o.stop(at + 0.3);
  };
  const bassN = (f, at, d) => {
    const o = ctx.createOscillator(); const l = ctx.createBiquadFilter(); const g = ctx.createGain();
    o.type = "sawtooth"; o.frequency.value = f;
    l.type = "lowpass"; l.frequency.value = 420;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.3, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, at + d);
    o.connect(l); l.connect(g); g.connect(out); o.start(at); o.stop(at + d + 0.02);
  };
  const stab = (freqs, at) => {
    freqs.forEach((f) => {
      const o = ctx.createOscillator(); const l = ctx.createBiquadFilter(); const g = ctx.createGain();
      o.type = "square"; o.frequency.value = f;
      l.type = "lowpass"; l.frequency.value = 1700;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.linearRampToValueAtTime(0.045, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.16);
      o.connect(l); l.connect(g); g.connect(out); o.start(at); o.stop(at + 0.2);
    });
  };
  const lead = (f, at) => {
    const o = ctx.createOscillator(); const l = ctx.createBiquadFilter(); const g = ctx.createGain();
    o.type = "triangle"; o.frequency.value = f;
    l.type = "lowpass"; l.frequency.value = 3000;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.16, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.32);
    o.connect(l); l.connect(g); g.connect(out); o.start(at); o.stop(at + 0.36);
  };

  const roots = [110, 87.31, 130.81, 98];
  const chords = [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]];
  const leads = [
    [[0, 659.25], [3, 783.99], [6, 880], [8, 783.99], [11, 659.25], [14, 523.25]],
    [[0, 698.46], [3, 880], [6, 1046.5], [8, 880], [11, 698.46], [14, 880]],
    [[0, 783.99], [3, 659.25], [6, 523.25], [8, 659.25], [11, 783.99], [14, 1046.5]],
    [[0, 783.99], [3, 987.77], [6, 880], [8, 783.99], [11, 587.33], [14, 493.88]],
  ];
  const step = 0.135;
  let bar = 0, t = ctx.currentTime + 0.3, timer;
  const run = () => {
    while (t < ctx.currentTime + 1.6) {
      const bi = bar % 4;
      for (let s = 0; s < 16; s++) {
        const at = t + s * step;
        if (s % 4 === 0) kick(at);
        if (s === 4 || s === 12) noise(at, 0.12, "bandpass", 1500, 0.3, 0.8);
        if (s % 2 === 0) noise(at, 0.04, "highpass", 7500, s % 4 === 2 ? 0.14 : 0.08);
        if ([0, 3, 6, 8, 10, 14].includes(s)) bassN(roots[bi] * (s === 14 ? 2 : 1), at, step * 1.8);
        if ([3, 6, 11].includes(s)) stab(chords[bi], at);
      }
      leads[bi].forEach(([s, f]) => lead(f, t + s * step));
      t += step * 16;
      bar++;
    }
    timer = setTimeout(run, 400);
  };
  run();

  return {
    pause() { clearTimeout(timer); ctx.suspend(); },
    resume() { ctx.resume(); t = Math.max(t, ctx.currentTime + 0.2); run(); },
    zip() {
      const now = ctx.currentTime;
      const s = ctx.createBufferSource();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      s.buffer = nb; s.loop = true;
      f.type = "bandpass"; f.Q.value = 3;
      f.frequency.setValueAtTime(1500, now + 0.15);
      f.frequency.linearRampToValueAtTime(4200, now + 1.6);
      g.gain.value = 0.1;
      lfo.frequency.value = 46; lg.gain.value = 0.1;
      lfo.connect(lg); lg.connect(g.gain);
      s.connect(f); f.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.1, now + 0.2);
      g.gain.setValueAtTime(0.1, now + 1.4);
      g.gain.linearRampToValueAtTime(0.0001, now + 1.7);
      s.start(now + 0.15); lfo.start(now + 0.15);
      s.stop(now + 1.75); lfo.stop(now + 1.75);
    },
    pop() {
      const now = ctx.currentTime;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(2000, now);
      o.frequency.exponentialRampToValueAtTime(900, now + 0.12);
      g.gain.setValueAtTime(0.3, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.45);
      const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
      o2.type = "triangle"; o2.frequency.value = 3200;
      g2.gain.setValueAtTime(0.12, now);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      o2.connect(g2); g2.connect(ctx.destination); o2.start(now); o2.stop(now + 0.25);
    },
    get on() { return ctx.state === "running"; },
  };
}

export default function KittyPartyPage() {
  const [stage, setStage] = useState("zip"); // zip → invite → main
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [go, setGo] = useState(false);
  const [sweep, setSweep] = useState(false);
  const [pocket, setPocket] = useState(false);
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
    if (K.music && audio.current) {
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

  const unzip = useCallback((withSound = true) => {
    if (withSound) {
      play();
      setTimeout(() => synth.current && synth.current.zip(), 60);
    }
    setTimeout(() => setStage("invite"), 2400);
  }, [play]);

  const tap = () => { if (go) return; setGo(true); unzip(true); };

  useEffect(() => {
    if (stage !== "zip" || go) return;
    const t = setTimeout(() => { setGo(true); unzip(false); }, 4500);
    return () => clearTimeout(t);
  }, [stage, go, unzip]);

  const ensureMusic = () => { if (!playing) play(); };

  const allOff = () => {
    setRevealed(true);
    setConfetti((c) => c + 1);
    setTimeout(() => setSweep(true), 2600);
    setTimeout(() => setStage("main"), 3300);
    setTimeout(() => setSweep(false), 4300);
  };

  const openPocket = () => {
    if (pocket) return;
    ensureMusic();
    setPocket(true);
    setConfetti((c) => c + 1);
    setTimeout(() => synth.current && synth.current.pop(), 200);
  };

  const SITE_URL = "https://www.seankrixtechnologies.com";
  const PAGE_URL = `${SITE_URL}/kitty-party-invitation`;
  const OG_IMAGE = `${SITE_URL}/og-kitty-party.webp`; // 1200x630 image in /public
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Denim Kitty Party Invitation | ${K.club}`,
    description: "Interactive denim-theme digital kitty party invitation for ladies with zipper reveal, rivet-button date, live countdown, party plan, music and Google Maps QR by Seankrix Technologies, Jaipur.",
    url: PAGE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Seankrix Technologies",
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  };

  const rsvpHref = `https://wa.me/${K.rsvpPhone}?text=${encodeURIComponent(`Count me in, ${K.host}! See you at the ${K.theme} kitty party on ${K.dateLabel} 💙`)}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2e5b8c" />
        <title>{`Denim Kitty Party Invitation — ${K.theme} | Seankrix Technologies`}</title>
        <meta name="description" content={`You're invited to the ${K.theme} ladies kitty party on ${K.dateLabel}. Unzip the invite, unbutton the rivets, see the party plan and venue map. Interactive invitation by Seankrix Technologies, Jaipur.`} />
        <meta name="keywords" content="kitty party invitation, ladies kitty party card, denim theme kitty party, digital kitty party invite India, online kitty invitation Jaipur, Seankrix Technologies" />
        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content={`${K.theme} — Ladies Kitty Party Invitation`} />
        <meta property="og:description" content="Unzip the denim, unbutton the rivets and find the date. Interactive kitty party invite by Seankrix Technologies." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Denim theme digital kitty party invitation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content={`${K.theme} Kitty Party`} />
        <meta name="twitter:description" content="Interactive denim-theme kitty party invitation with zipper reveal, countdown and venue QR." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="kp">
        <style>{css}</style>
        {K.music && <audio ref={audio} src={K.music} loop preload="auto" onError={startSynth} />}
        <Confetti fire={confetti} />
        {stage !== "zip" && (
          <button type="button" className="mute" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
            {playing ? "♪" : "✕"}
          </button>
        )}
        {sweep && <div className="swoosh denim" aria-hidden="true" />}

        {/* the invite screen sits under the zipper so it is revealed as the zip opens */}
        {(stage === "zip" || stage === "invite") && (
          <div className="full invite" onPointerDown={stage === "invite" ? ensureMusic : undefined} style={{ pointerEvents: stage === "invite" ? "auto" : "none" }}>
            <div className="stage">
              <div className="panel denim stitch pop-in">
                <span className="waist lab">Ladies Kitty Party</span>
                <h1 className="names">{K.theme.split(" & ")[0]} <i>&amp;</i> {K.theme.split(" & ")[1]}</h1>
                <p className="small">{K.host} {K.hostLine} denim-themed kitty</p>
                <RivetReveal onDone={allOff} onStart={ensureMusic} onSound={() => synth.current && synth.current.pop()} />
                {revealed ? (
                  <div className="pop-in" style={{ marginTop: 10 }}>
                    <Countdown small />
                    <p className="script" style={{ margin: "6px 0 0", fontSize: "1.3rem", color: "var(--thread)" }}>wear your best denim, ladies!</p>
                  </div>
                ) : (
                  <p className="hint2">Tap the 3 rivets to unbutton the date</p>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "zip" && <ZipperIntro go={go} onTap={tap} />}

        {stage === "main" && (
          <main>
            <div className="hero denim">
              <Waistband />
              <Sparkles />
              <span className="waist lab" style={{ position: "relative" }}>{K.club}</span>
              <p className="small" style={{ position: "relative", marginTop: 12 }}>{K.host} {K.hostLine}</p>
              <h1 className="big" style={{ position: "relative" }}>Denim <span>&amp;</span><br />Diamonds</h1>
              <p className="lab" style={{ position: "relative", margin: "0 0 4px", fontSize: ".95rem", color: "var(--thread)" }}>Ladies Kitty Party</p>

              <div className="tagwrap" style={{ position: "relative" }}>
                <svg className="string" viewBox="0 0 80 78" aria-hidden="true"><path d="M40 78C40 40 12 38 12 14C12 -2 36 -2 40 14C44 -2 68 -2 68 14C68 38 40 40 40 78" fill="none" stroke="#f0c05a" strokeWidth="3" /></svg>
                <div className="hangtag">
                  <span className="hole" />
                  <span className="lab">Save the date</span>
                  <b>{K.dateParts[0]} {K.dateParts[1]}</b>
                  <small>{K.day} · {K.time}</small>
                </div>
              </div>

              <Pocket open={pocket} onOpen={openPocket} />
              <p className="pocketnote script" aria-live="polite" style={{ position: "relative" }}>{pocket ? K.luckyNote : "Tap the pocket, there’s a surprise inside"}</p>
            </div>

            <section className="kp-s">
              <h2>Counting down</h2>
              <div className="under">◆</div>
              <Countdown />
              <p className="muted">{K.day}, {K.dateLabel} · {K.city}</p>
            </section>

            <section className="kp-s">
              <h2>Party plan</h2>
              <div className="under">◆</div>
              <div className="plan">
                {K.events.map((e, i) => <EventCard key={e.name} event={e} index={i} />)}
              </div>
            </section>

            <section className="kp-s">
              <h2>Dress code</h2>
              <div className="under">◆</div>
              <div className="card denim stitch">
                <p className="script" style={{ fontSize: "2rem", margin: 0, color: "var(--thread)" }}>{K.dress}</p>
                <div className="chips">
                  {["Denim jacket", "Jeans & kurti", "Denim saree", "Denim dress", "Sparkly accessories"].map((c) => (<span key={c} className="chip">{c}</span>))}
                </div>
              </div>
            </section>

            <section className="kp-s">
              <h2>What’s in store</h2>
              <div className="under">◆</div>
              <div className="perks">
                {K.perks.map((p) => (
                  <div key={p.title} className="card denim stitch">
                    <div className="ico">{p.icon}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
              {(K.kitty || K.nextHost) && (
                <div className="kit">
                  {K.kitty && <div><b>{K.kitty}</b><span>Kitty amount</span></div>}
                  {K.nextHost && <div><b>{K.nextHost}</b><span>Next hostess</span></div>}
                </div>
              )}
            </section>

            <section className="kp-s">
              <h2>Venue</h2>
              <div className="under">◆</div>
              <div className="card denim stitch">
                <p style={{ margin: 0 }}>{K.venue}</p>
                <div className="qr">
                  <QRCodeSVG value={K.mapUrl} size={150} level="M" bgColor="#ffffff" fgColor="#14263f" title="Scan for the party location" />
                </div>
                <p style={{ margin: 0, color: "#d8e6f6" }}>Scan for directions</p>
                <a className="btn" href={K.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
              </div>
            </section>

            <section className="kp-s">
              <h2>{K.storyTag}</h2>
              <div className="under">◆</div>
              <Carousel />
              <p style={{ maxWidth: 480, margin: "10px auto 0" }}>{K.story}</p>
            </section>

            <section className="kp-s">
              <h2>Are you in?</h2>
              <div className="under">◆</div>
              <div className="card denim stitch">
                <p style={{ margin: "0 0 4px" }}>Please confirm by <b>{K.rsvpBy}</b> so we can plan the food and the prizes.</p>
                <a className="btn wa" href={rsvpHref} target="_blank" rel="noreferrer">Count me in on WhatsApp</a>
              </div>
            </section>

            <footer>
              <p className="script" style={{ fontSize: "2rem", color: "var(--d1)", margin: 0 }}>See you in denim, ladies!</p>
              <p style={{ margin: "4px 0 0" }}>{K.club} · {K.dateLabel} · {K.city}</p>
            </footer>
          </main>
        )}
      </div>
    </>
  );
}
