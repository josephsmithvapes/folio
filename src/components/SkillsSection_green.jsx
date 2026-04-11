import { useState, useEffect, useRef } from "react";

const A = "#2d5a27"; // accent — deep navy (replaces cyan)
const BG = "#f2ede3"; // background — cream
const TEXT = "#1a1a1a"; // primary text — dark navy
const MUTED = "rgba(26,26,26,0.5)";

// ─── Animated SVG Icons ──────────────────────────────────────────────────────

const IconOperations = ({ active }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <style>{`
      .gear-outer { transform-origin: 24px 24px; animation: ${active ? "spinGear 4s linear infinite" : "none"}; }
      .gear-inner { transform-origin: 24px 24px; animation: ${active ? "spinGearR 4s linear infinite" : "none"}; }
      @keyframes spinGear { to { transform: rotate(360deg); } }
      @keyframes spinGearR { to { transform: rotate(-360deg); } }
    `}</style>
    <g className="gear-outer">
      <path d="M24 14a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke={A} strokeWidth="1.5" fill="none"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <rect key={i} x="22.5" y="9" width="3" height="5" rx="1"
          fill={A} transform={`rotate(${deg} 24 24)`}/>
      ))}
    </g>
    <circle className="gear-inner" cx="24" cy="24" r="4" fill="none" stroke={A} strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="1.5" fill={A}/>
  </svg>
);

const IconLeadership = ({ active }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <style>{`
      .compass-needle { transform-origin: 24px 24px; animation: ${active ? "swingNeedle 2s ease-in-out infinite alternate" : "none"}; }
      @keyframes swingNeedle { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }
    `}</style>
    <circle cx="24" cy="24" r="14" stroke={A} strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="24" r="2" fill={A}/>
    {["N","S","E","W"].map((l, i) => {
      const pos = [{x:24,y:13},{x:24,y:37},{x:37,y:25},{x:11,y:25}][i];
      return <text key={l} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
        fill={A} fontSize="5" fontFamily="monospace" opacity="0.6">{l}</text>
    })}
    <g className="compass-needle">
      <polygon points="24,10 22,24 24,22 26,24" fill={A}/>
      <polygon points="24,38 22,24 24,26 26,24" fill={A} opacity="0.3"/>
    </g>
  </svg>
);

const IconCommunication = ({ active }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <style>{`
      .wave1 { animation: ${active ? "pulse 1.5s ease-out infinite" : "none"}; opacity: 0; transform-origin: 12px 32px; }
      .wave2 { animation: ${active ? "pulse 1.5s ease-out 0.4s infinite" : "none"}; opacity: 0; transform-origin: 12px 32px; }
      .wave3 { animation: ${active ? "pulse 1.5s ease-out 0.8s infinite" : "none"}; opacity: 0; transform-origin: 12px 32px; }
      @keyframes pulse { 0% { opacity: 0; transform: scale(0.7); } 50% { opacity: 1; } 100% { opacity: 0; transform: scale(1.3); } }
    `}</style>
    <path d="M8 14h24a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H20l-8 6v-6H8a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2z"
      stroke={A} strokeWidth="1.5" fill="none"/>
    <line x1="12" y1="20" x2="26" y2="20" stroke={A} strokeWidth="1" opacity="0.4"/>
    <line x1="12" y1="24" x2="22" y2="24" stroke={A} strokeWidth="1" opacity="0.4"/>
    <path className="wave1" d="M34 20 Q38 24 34 28" stroke={A} strokeWidth="1.5" fill="none"/>
    <path className="wave2" d="M37 17 Q43 24 37 31" stroke={A} strokeWidth="1.5" fill="none"/>
    <path className="wave3" d="M40 14 Q48 24 40 34" stroke={A} strokeWidth="1.5" fill="none"/>
  </svg>
);

const IconTeamBuilding = ({ active }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <style>{`
      .node-line { stroke-dasharray: 20; stroke-dashoffset: ${active ? "0" : "20"};
        animation: ${active ? "drawLine 1s ease forwards, linePulse 2s 1s ease-in-out infinite" : "none"}; }
      @keyframes drawLine { to { stroke-dashoffset: 0; } }
      @keyframes linePulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      .node-dot { animation: ${active ? "nodePop 0.5s ease forwards" : "none"}; transform: scale(0); transform-origin: center; }
      .n1 { animation-delay: 0s; } .n2 { animation-delay: 0.2s; }
      .n3 { animation-delay: 0.4s; } .n4 { animation-delay: 0.6s; } .n5 { animation-delay: 0.3s; }
      @keyframes nodePop { to { transform: scale(1); } }
    `}</style>
    <circle className="node-dot n5" cx="24" cy="24" r="4" fill={A}/>
    {[{cx:12,cy:14,cls:"n1"},{cx:36,cy:14,cls:"n2"},{cx:36,cy:34,cls:"n3"},{cx:12,cy:34,cls:"n4"}].map((n,i)=>(
      <g key={i}>
        <line className="node-line" x1={n.cx} y1={n.cy} x2="24" y2="24" stroke={A} strokeWidth="1" opacity="0.4"/>
        <circle className={`node-dot ${n.cls}`} cx={n.cx} cy={n.cy} r="3.5" fill="none" stroke={A} strokeWidth="1.5"/>
        <circle className={`node-dot ${n.cls}`} cx={n.cx} cy={n.cy} r="1" fill={A}/>
      </g>
    ))}
  </svg>
);

const IconDevelopmental = ({ active }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <style>{`
      .bar1 { animation: ${active ? "growBar 0.6s 0.1s ease forwards" : "none"}; transform: scaleY(0); transform-origin: bottom; }
      .bar2 { animation: ${active ? "growBar 0.6s 0.3s ease forwards" : "none"}; transform: scaleY(0); transform-origin: bottom; }
      .bar3 { animation: ${active ? "growBar 0.6s 0.5s ease forwards" : "none"}; transform: scaleY(0); transform-origin: bottom; }
      .arrow-up { animation: ${active ? "arrowBounce 1s 1.2s ease-in-out infinite" : "none"}; }
      @keyframes growBar { to { transform: scaleY(1); } }
      @keyframes arrowBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    `}</style>
    <line x1="10" y1="38" x2="38" y2="38" stroke={A} strokeWidth="1.5" opacity="0.35"/>
    <rect className="bar1" x="13" y="26" width="5" height="12" fill={A} opacity="0.3" rx="1"/>
    <rect className="bar2" x="21.5" y="20" width="5" height="18" fill={A} opacity="0.55" rx="1"/>
    <rect className="bar3" x="30" y="13" width="5" height="25" fill={A} rx="1"/>
    <g className="arrow-up">
      <line x1="32.5" y1="13" x2="32.5" y2="8" stroke={A} strokeWidth="1.5"/>
      <polyline points="30,11 32.5,8 35,11" stroke={A} strokeWidth="1.5" fill="none"/>
    </g>
  </svg>
);

const IconPrioritization = ({ active }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <style>{`
      .quad-line { stroke-dasharray: 30; stroke-dashoffset: ${active ? "0" : "30"};
        animation: ${active ? "quadDraw 0.8s ease forwards" : "none"}; }
      .pri-dot { animation: ${active ? "priPulse 1.5s ease-in-out infinite" : "none"}; transform-origin: 14px 14px; }
      @keyframes quadDraw { to { stroke-dashoffset: 0; } }
      @keyframes priPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.6; } }
    `}</style>
    <line className="quad-line" x1="24" y1="10" x2="24" y2="38" stroke={A} strokeWidth="1" opacity="0.4" style={{animationDelay:"0s"}}/>
    <line className="quad-line" x1="10" y1="24" x2="38" y2="24" stroke={A} strokeWidth="1" opacity="0.4" style={{animationDelay:"0.2s"}}/>
    <rect x="10" y="10" width="28" height="28" rx="1" stroke={A} strokeWidth="1.5" fill="none" opacity="0.6"/>
    <circle className="pri-dot" cx="17" cy="17" r="4" fill={A}/>
    <circle cx="31" cy="17" r="2" fill={A} opacity="0.25"/>
    <circle cx="17" cy="31" r="2" fill={A} opacity="0.25"/>
    <circle cx="31" cy="31" r="1.5" fill={A} opacity="0.15"/>
    <text x="13" y="23" fontFamily="monospace" fontSize="4" fill={A} opacity="0.4">HI</text>
    <text x="27" y="23" fontFamily="monospace" fontSize="4" fill={A} opacity="0.4">LO</text>
  </svg>
);

// ─── Step Icons ───────────────────────────────────────────────────────────────

const StepIcon = ({ skill, step, active }) => {
  const icons = {
    Operations: [
      <svg key="o1" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="18" rx="12" ry="7" stroke={A} strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="18" r="3" stroke={A} strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="18" r="1" fill={A}/>
        <line x1="8" y1="18" x2="28" y2="18" stroke={A} strokeWidth="0.75" opacity="0.3"
          style={{animation: active?"scanAnim 2s ease-in-out infinite":"none"}}/>
        <style>{`@keyframes scanAnim{0%,100%{opacity:0.3}50%{opacity:0.8}}`}</style>
      </svg>,
      <svg key="o2" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.gl{stroke-dasharray:4 2;animation:${active?"gridDraw 1.5s ease forwards":"none"};stroke-dashoffset:20}
        @keyframes gridDraw{to{stroke-dashoffset:0}}`}</style>
        {[10,18,26].map(x=><line key={x} className="gl" x1={x} y1="8" x2={x} y2="28" stroke={A} strokeWidth="1" opacity="0.4"/>)}
        {[10,18,26].map(y=><line key={y+"h"} className="gl" x1="8" y1={y} x2="28" y2={y} stroke={A} strokeWidth="1" opacity="0.4"/>)}
        <circle cx="18" cy="18" r="2" fill={A}/>
      </svg>,
      <svg key="o3" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.metric{animation:${active?"mG 1s ease forwards":"none"};transform:scaleY(0);transform-origin:bottom}
        @keyframes mG{to{transform:scaleY(1)}}`}</style>
        <polyline className="metric" points="8,26 14,20 20,22 28,12" stroke={A} strokeWidth="1.5" fill="none"/>
        <circle cx="28" cy="12" r="2" fill={A}
          style={{animation:active?"np2 0.3s 0.8s ease forwards":"none",transform:"scale(0)",transformOrigin:"28px 12px"}}/>
        <style>{`@keyframes np2{to{transform:scale(1)}}`}</style>
        <line x1="8" y1="28" x2="28" y2="28" stroke={A} strokeWidth="1" opacity="0.3"/>
      </svg>
    ],
    Leadership: [
      <svg key="l1" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.anchor{animation:${active?"anchorBob 2s ease-in-out infinite":"none"}}
        @keyframes anchorBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}`}</style>
        <g className="anchor">
          <circle cx="18" cy="10" r="3" stroke={A} strokeWidth="1.5" fill="none"/>
          <line x1="18" y1="13" x2="18" y2="27" stroke={A} strokeWidth="1.5"/>
          <path d="M10 20 Q18 27 26 20" stroke={A} strokeWidth="1.5" fill="none"/>
          <line x1="10" y1="17" x2="10" y2="22" stroke={A} strokeWidth="1"/>
          <line x1="26" y1="17" x2="26" y2="22" stroke={A} strokeWidth="1"/>
        </g>
      </svg>,
      <svg key="l2" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.star-ray{animation:${active?"starPulse 1.5s ease-in-out infinite":"none"};transform-origin:18px 18px}
        @keyframes starPulse{0%,100%{opacity:0.4;transform:scale(0.9)}50%{opacity:1;transform:scale(1.05)}}`}</style>
        <g className="star-ray">
          <polygon points="18,8 20,15 27,15 21.5,19.5 23.5,27 18,22.5 12.5,27 14.5,19.5 9,15 16,15"
            stroke={A} strokeWidth="1.5" fill="none"/>
        </g>
        <circle cx="18" cy="18" r="2" fill={A}/>
      </svg>,
      <svg key="l3" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.branch{stroke-dasharray:15;stroke-dashoffset:${active?"0":"15"};animation:${active?"branchGrow 1s ease forwards":"none"}}
        @keyframes branchGrow{to{stroke-dashoffset:0}}`}</style>
        <line className="branch" x1="18" y1="28" x2="18" y2="10" stroke={A} strokeWidth="1.5" style={{animationDelay:"0s"}}/>
        <line className="branch" x1="18" y1="16" x2="10" y2="10" stroke={A} strokeWidth="1.5" style={{animationDelay:"0.4s"}}/>
        <line className="branch" x1="18" y1="16" x2="26" y2="10" stroke={A} strokeWidth="1.5" style={{animationDelay:"0.6s"}}/>
        {[{x:18,y:10},{x:10,y:10},{x:26,y:10}].map((p,i)=>
          <circle key={i} cx={p.x} cy={p.y} r="2.5" stroke={A} strokeWidth="1" fill="none"/>)}
        <circle cx="18" cy="28" r="2" fill={A}/>
      </svg>
    ],
    Communication: [
      <svg key="c1" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.ring{animation:${active?"ringExpand 1.5s ease-out infinite":"none"};transform-origin:14px 18px}
        @keyframes ringExpand{0%{opacity:0;transform:scale(0.5)}60%{opacity:1}100%{opacity:0;transform:scale(1.5)}}`}</style>
        <path d="M12 12 Q8 18 12 24 L15 24 Q18 24 18 20 Q22 20 22 16 Q22 10 16 10 Q12 10 12 14"
          stroke={A} strokeWidth="1.5" fill="none"/>
        <circle className="ring" cx="14" cy="18" r="3" stroke={A} strokeWidth="0.75" fill="none"/>
        <circle className="ring" cx="14" cy="18" r="5" stroke={A} strokeWidth="0.75" fill="none" style={{animationDelay:"0.3s"}}/>
      </svg>,
      // Step 2: Lightbulb — Lead With the Why
      <svg key="c2" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.bulb{animation:${active?"bulbGlow 1.5s ease-in-out infinite":"none"};transform-origin:18px 16px}
        .ray{animation:${active?"rayFade 1.5s ease-in-out infinite":"none"};opacity:0}
        @keyframes bulbGlow{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes rayFade{0%,100%{opacity:0}50%{opacity:0.6}}`}</style>
        <g className="bulb">
          <path d="M14 16 Q14 10 18 10 Q22 10 22 16 Q22 19 20 21 L20 24 L16 24 L16 21 Q14 19 14 16Z"
            stroke={A} strokeWidth="1.5" fill="none"/>
          <line x1="16" y1="24" x2="20" y2="24" stroke={A} strokeWidth="1.5"/>
          <line x1="16.5" y1="26" x2="19.5" y2="26" stroke={A} strokeWidth="1"/>
        </g>
        {[{x1:18,y1:6,x2:18,y2:8},{x1:24,y1:8,x2:22,y2:10},{x1:12,y1:8,x2:14,y2:10},{x1:26,y1:14,x2:24,y2:14},{x1:10,y1:14,x2:12,y2:14}].map((r,i)=>
          <line key={i} className="ray" x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={A} strokeWidth="1" style={{animationDelay:`${i*0.1}s`}}/>
        )}
      </svg>,
      <svg key="c3" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.loop{stroke-dasharray:60;stroke-dashoffset:${active?"0":"60"};animation:${active?"loopDraw 1.5s ease forwards":"none"}}
        @keyframes loopDraw{to{stroke-dashoffset:0}}
        @keyframes checkDraw{to{stroke-dashoffset:0}}`}</style>
        <path className="loop" d="M26 12 Q30 18 26 24 Q20 30 14 26 Q8 22 10 16 Q12 10 18 9 Q24 8 28 13"
          stroke={A} strokeWidth="1.5" fill="none"/>
        <polyline points="13,18 17,22 25,14" stroke={A} strokeWidth="2" fill="none"
          style={{strokeDasharray:20,strokeDashoffset:active?0:20,animation:active?"checkDraw 0.5s 1s ease forwards":"none"}}/>
      </svg>
    ],
    "Team-Building": [
      <svg key="t1" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.scan2{animation:${active?"scanPan 2s ease-in-out infinite":"none"};transform-origin:18px 18px}
        @keyframes scanPan{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(20deg)}}`}</style>
        <circle cx="16" cy="15" r="5" stroke={A} strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="13" r="2" stroke={A} strokeWidth="1" fill="none"/>
        <line x1="20" y1="19" x2="26" y2="25" stroke={A} strokeWidth="2"/>
        <line className="scan2" x1="11" y1="15" x2="21" y2="15" stroke={A} strokeWidth="0.75" opacity="0.4"/>
      </svg>,
      <svg key="t2" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.heart{animation:${active?"heartBeat 1s ease-in-out infinite":"none"};transform-origin:18px 17px}
        @keyframes heartBeat{0%,100%{transform:scale(1)}15%{transform:scale(1.15)}30%{transform:scale(1)}45%{transform:scale(1.08)}60%{transform:scale(1)}}`}</style>
        <g className="heart">
          <path d="M18 26 L8 16 Q6 10 12 9 Q15 9 18 13 Q21 9 24 9 Q30 10 28 16 Z"
            stroke={A} strokeWidth="1.5" fill="none"/>
        </g>
      </svg>,
      <svg key="t3" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.climber{animation:${active?"climbUp 2s ease-in-out infinite":"none"}}
        @keyframes climbUp{0%{transform:translateY(4px);opacity:0.5}100%{transform:translateY(-2px);opacity:1}}`}</style>
        <line x1="10" y1="28" x2="26" y2="28" stroke={A} strokeWidth="1.5"/>
        <line x1="10" y1="22" x2="26" y2="22" stroke={A} strokeWidth="1.5"/>
        <line x1="10" y1="16" x2="26" y2="16" stroke={A} strokeWidth="1.5"/>
        <line x1="12" y1="28" x2="12" y2="10" stroke={A} strokeWidth="1" opacity="0.3"/>
        <line x1="24" y1="28" x2="24" y2="10" stroke={A} strokeWidth="1" opacity="0.3"/>
        <g className="climber">
          <circle cx="18" cy="13" r="2.5" stroke={A} strokeWidth="1.5" fill="none"/>
          <line x1="18" y1="16" x2="18" y2="20" stroke={A} strokeWidth="1.5"/>
        </g>
      </svg>
    ],
    Developmental: [
      <svg key="d1" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.mirror{animation:${active?"mirrorPulse 2s ease-in-out infinite":"none"};transform-origin:18px 18px}
        @keyframes mirrorPulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
        <rect x="11" y="8" width="14" height="18" rx="7" stroke={A} strokeWidth="1.5" fill="none"/>
        <line className="mirror" x1="14" y1="28" x2="22" y2="28" stroke={A} strokeWidth="1.5"/>
        <line x1="18" y1="15" x2="18" y2="21" stroke={A} strokeWidth="1" opacity="0.4"/>
        <line x1="15" y1="18" x2="21" y2="18" stroke={A} strokeWidth="1" opacity="0.4"/>
      </svg>,
      <svg key="d2" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.dot-trail{animation:${active?"trailDraw 2s ease-in-out infinite":"none"}}
        @keyframes trailDraw{0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}}`}</style>
        <path className="dot-trail" d="M8 24 Q12 14 18 16 Q24 18 28 10"
          stroke={A} strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
        {[{x:8,y:24},{x:18,y:16},{x:28,y:10}].map((p,i)=>
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={A} opacity={0.35+i*0.3}/>)}
      </svg>,
      <svg key="d3" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.confetti{animation:${active?"confettiFloat 1.5s ease-in-out infinite alternate":"none"}}
        @keyframes confettiFloat{from{transform:translateY(0) rotate(0deg)}to{transform:translateY(-4px) rotate(15deg)}}`}</style>
        <g className="confetti">
          {[{x:10,y:12,r:2},{x:18,y:8,r:1.5},{x:26,y:13,r:2},{x:22,y:20,r:1.5},{x:14,y:20,r:1.5}].map((p,i)=>
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={A} opacity={0.4+i*0.1} style={{animationDelay:`${i*0.1}s`}}/>)}
        </g>
        <polyline points="12,28 18,22 24,28" stroke={A} strokeWidth="2" fill="none"/>
        <line x1="18" y1="22" x2="18" y2="16" stroke={A} strokeWidth="2"/>
        <polyline points="15,18 18,15 21,18" stroke={A} strokeWidth="1.5" fill="none"/>
      </svg>
    ],
    Prioritization: [
      // Step 1: Stack rank — numbered list drawing in
      <svg key="p1" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.row{animation:${active?"rowSlide 0.5s ease forwards":"none"};transform:translateX(-6px);opacity:0}
        .r1{animation-delay:0s}.r2{animation-delay:0.15s}.r3{animation-delay:0.3s}
        @keyframes rowSlide{to{transform:translateX(0);opacity:1}}`}</style>
        <g className="row r1"><text x="8" y="14" fontFamily="monospace" fontSize="7" fill={A} opacity="0.5">01</text>
          <rect x="18" y="9" width="14" height="6" rx="1" fill={A}/></g>
        <g className="row r2"><text x="8" y="22" fontFamily="monospace" fontSize="7" fill={A} opacity="0.5">02</text>
          <rect x="18" y="17" width="10" height="6" rx="1" fill={A} opacity="0.6"/></g>
        <g className="row r3"><text x="8" y="30" fontFamily="monospace" fontSize="7" fill={A} opacity="0.5">03</text>
          <rect x="18" y="25" width="6" height="6" rx="1" fill={A} opacity="0.3"/></g>
      </svg>,
      // Step 2: Calendar with lightning bolt
      <svg key="p2" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.bolt{animation:${active?"boltFlash 1.2s ease-in-out infinite":"none"};transform-origin:22px 20px}
        @keyframes boltFlash{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}`}</style>
        <rect x="7" y="11" width="22" height="18" rx="2" stroke={A} strokeWidth="1.5" fill="none"/>
        <line x1="7" y1="16" x2="29" y2="16" stroke={A} strokeWidth="1" opacity="0.4"/>
        <line x1="13" y1="8" x2="13" y2="14" stroke={A} strokeWidth="1.5"/>
        <line x1="23" y1="8" x2="23" y2="14" stroke={A} strokeWidth="1.5"/>
        <g className="bolt">
          <polyline points="22,17 19,22 22,22 18,28" stroke={A} strokeWidth="2" fill="none"/>
        </g>
      </svg>,
      // Step 3: Shield
      <svg key="p3" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <style>{`.shield{animation:${active?"shieldPulse 2s ease-in-out infinite":"none"};transform-origin:18px 18px}
        @keyframes shieldPulse{0%,100%{opacity:0.8}50%{opacity:1}}`}</style>
        <g className="shield">
          <path d="M18 8 L28 12 L28 20 Q28 27 18 30 Q8 27 8 20 L8 12 Z"
            stroke={A} strokeWidth="1.5" fill="none"/>
        </g>
        <polyline points="13,19 17,23 24,15" stroke={A} strokeWidth="2" fill="none"
          style={{strokeDasharray:20,strokeDashoffset:active?0:20,animation:active?"shieldCheck 0.5s 0.5s ease forwards":"none"}}/>
        <style>{`@keyframes shieldCheck{to{stroke-dashoffset:0}}`}</style>
      </svg>
    ]
  };
  return icons[skill]?.[step] || null;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    id: "Operations",
    label: "Operations",
    annotation: "SYS.OPS.001",
    tagline: "Translate chaos into systems",
    steps: [
      { title: "Diagnose the Floor", body: "Before touching anything — read the data, walk the space, and feel the team's pulse. Assumptions skip this step. Good operators don't." },
      { title: "Build Repeatable Systems", body: "If it only works when I'm there, it's not a system — it's a dependency. Every process gets documented, delegated, and stress-tested without me in the room." },
      { title: "Measure What Moves", body: "Track the two or three metrics that actually reflect health. Cut the noise. Review weekly, adjust monthly, and never mistake activity for progress." }
    ]
  },
  {
    id: "Leadership",
    label: "Leadership",
    annotation: "LDR.CORE.002",
    tagline: "Earned, not assigned",
    steps: [
      { title: "Earn Trust First", body: "Show up consistently. Keep every promise — especially the small ones. Authority from a title expires fast. Authority from trust compounds." },
      { title: "Set the Standard by Living It", body: "The behavior I want from my team, I model first. No exceptions. Culture isn't what's written on the wall — it's what's tolerated and what's celebrated." },
      { title: "Develop, Don't Direct", body: "My job is to make myself replaceable at this level. Coach the decision, don't make it for them. When they outgrow me, the job is done right." }
    ]
  },
  {
    id: "Communication",
    label: "Communication",
    annotation: "COM.FLOW.003",
    tagline: "Message received ≠ message understood",
    steps: [
      { title: "Listen to Understand", body: "Not to respond. Ask one more question than feels necessary. The real issue is rarely the first thing said — it's what comes out when someone feels heard." },
      { title: "Lead With the Why", body: "Before the ask or the directive — give context. When people understand the reason, compliance becomes buy-in. Without it, even good instructions feel arbitrary." },
      { title: "Close the Loop", body: "Confirm understanding, not just delivery. 'Does that make sense?' is the wrong question. 'What's your next step?' is the right one." }
    ]
  },
  {
    id: "Team-Building",
    label: "Team-Building",
    annotation: "TEAM.DEV.004",
    tagline: "Built on individuals, not headcount",
    steps: [
      { title: "Know the Individual", body: "What drives this person beyond the paycheck? What do they want in 2 years? What drains them? This data doesn't come from surveys — it comes from real conversations." },
      { title: "Build a Place People Choose", body: "Retention isn't a benefits package. It's whether someone feels like they matter, belong, and are growing. Create that environment deliberately — it doesn't happen by default." },
      { title: "Build Leaders Inside", body: "The goal is depth. Bench strength. Every high performer on my team should be capable of stepping into a bigger role when the moment comes." }
    ]
  },
  {
    id: "Developmental",
    label: "Developmental",
    annotation: "DEV.GROWTH.005",
    tagline: "Progress over perfection, always",
    steps: [
      { title: "Assess Without Ego", body: "Gap analysis starts with honesty. Where are we actually versus where we need to be? The answer has to be accurate before it can be useful." },
      { title: "Build the Plan Together", body: "A plan handed down gets compliance. A plan built together gets ownership. I co-author every development path — their goals, their language, their timeline." },
      { title: "Celebrate the Climb", body: "The milestone matters less than the momentum. Acknowledge the attempt, mark the progress, and make improving feel worth showing up for." }
    ]
  },
  {
    id: "Prioritization",
    label: "Prioritization",
    annotation: "PRI.PLAN.006",
    tagline: "Know what matters before deciding what's next",
    steps: [
      { title: "Stack Rank Ruthlessly", body: "Not everything is urgent and important. Force the ranking. The work that moves the most weight goes first — everything else waits or gets cut." },
      { title: "Plan for Disruption", body: "The shift is going to get blown up. Build the plan with buffer and fallbacks, not just best-case timelines. Surprises aren't surprises if you've already accounted for them." },
      { title: "Protect the Priority", body: "Once the top item is set, guard it. Every new request gets measured against it. Saying yes to everything is the same as having no priorities at all." }
    ]
  }
];

const ICON_MAP = {
  Operations: IconOperations,
  Leadership: IconLeadership,
  Communication: IconCommunication,
  "Team-Building": IconTeamBuilding,
  Developmental: IconDevelopmental,
  Prioritization: IconPrioritization
};

// ─── Crosshair Corner ─────────────────────────────────────────────────────────

const Corner = ({ pos }) => {
  const p = { tl:{top:8,left:8}, tr:{top:8,right:8}, bl:{bottom:8,left:8}, br:{bottom:8,right:8} };
  const lines = {
    tl: <><line x1="0" y1="8" x2="8" y2="8"/><line x1="8" y1="0" x2="8" y2="8"/></>,
    tr: <><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="0" x2="8" y2="8"/></>,
    bl: <><line x1="0" y1="8" x2="8" y2="8"/><line x1="8" y1="8" x2="8" y2="16"/></>,
    br: <><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="8" x2="8" y2="16"/></>
  };
  return (
    <svg style={{ position:"absolute", width:16, height:16, ...p[pos] }}
      viewBox="0 0 16 16" fill="none" stroke={A} strokeWidth="1.5" opacity="0.3">
      {lines[pos]}
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const modalRef = useRef(null);

  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const directionRef = useRef(1);
  const exactScrollRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isActiveRef = useRef(false);

  const open = (id) => { setActive(id); setStep(0); setAnimKey(k => k + 1); };
  const close = () => setActive(null);
  const goStep = (n) => { setStep(n); setAnimKey(k => k + 1); };

  const skill = SKILLS.find(s => s.id === active);

  useEffect(() => {
    isActiveRef.current = active !== null;
    const handler = (e) => { if (modalRef.current && !modalRef.current.contains(e.target)) close(); };
    if (active) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    exactScrollRef.current = container.scrollLeft;

    const animate = () => {
      if (!isHoveredRef.current && !isActiveRef.current && container.scrollWidth > container.clientWidth) {
        exactScrollRef.current += directionRef.current * 0.4;
        
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (exactScrollRef.current <= 0) {
          directionRef.current = 1;
          exactScrollRef.current = 0;
        } else if (exactScrollRef.current >= maxScroll) {
          directionRef.current = -1;
          exactScrollRef.current = maxScroll;
        }
        
        container.scrollLeft = exactScrollRef.current;
      } else {
        exactScrollRef.current = container.scrollLeft;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div id="skills" style={{
      background: BG,
      backgroundImage: "radial-gradient(circle at 20% 50%, rgba(45,90,39,0.07) 0%, transparent 60%)",
      fontFamily: "Arial Black, Arial, sans-serif",
      padding: "64px 24px",
      position: "relative"
    }}>
      <style>{`
        .skills-grid {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .skills-grid::-webkit-scrollbar { display: none; }
        .skill-card { flex: 0 0 160px; }
        @media (max-width: 768px) {
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            overflow-x: visible;
            padding-bottom: 0;
          }
          .skill-card { flex: auto; }
        }
      `}</style>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
        backgroundImage: "linear-gradient(rgba(45,90,39,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}/>

      {/* Section header */}
      <div style={{ maxWidth: 900, margin: "0 auto 56px", position: "relative" }}>
        <h2 style={{ color: TEXT, fontSize: "clamp(28px, 5vw, 48px)", margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>
          SKILLS &amp;
        </h2>
        <h2 style={{ color: A, fontSize: "clamp(28px, 5vw, 48px)", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          COMPETENCIES
        </h2>
        <div style={{ width: 48, height: 2, background: A, opacity: 0.4 }}/>
      </div>

      {/* Skill Cards */}
      <div className="skills-grid" ref={scrollContainerRef}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onTouchStart={() => { isHoveredRef.current = true; }}
        onTouchEnd={() => { isHoveredRef.current = false; }}
        style={{
        maxWidth: 900, margin: "0 auto",
        gap: 16
      }}>
        {SKILLS.map((s) => {
          const Icon = ICON_MAP[s.id];
          return (
            <button key={s.id} className="skill-card" onClick={() => open(s.id)} aria-label={`View ${s.label} skill details`}
              style={{
                background: "rgba(45,90,39,0.04)", border: "1px solid rgba(45,90,39,0.15)",
                borderRadius: 4, padding: "28px 20px 24px", cursor: "pointer",
                position: "relative", textAlign: "left", transition: "all 0.2s ease", outline: "none"
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(45,90,39,0.09)"; e.currentTarget.style.borderColor="rgba(45,90,39,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(45,90,39,0.04)"; e.currentTarget.style.borderColor="rgba(45,90,39,0.15)"; }}
            >
              <Corner pos="tl"/><Corner pos="tr"/><Corner pos="bl"/><Corner pos="br"/>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                <Icon active={true}/>
              </div>
              <div style={{ color: A, fontFamily: "monospace", fontSize: 9, letterSpacing: 2, marginBottom: 6, opacity: 0.4 }}>
                {s.annotation}
              </div>
              <div style={{ color: TEXT, fontSize: 14, letterSpacing: 1, marginBottom: 6 }}>
                {s.label.toUpperCase()}
              </div>
              <div style={{ color: MUTED, fontSize: 11, fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1.4 }}>
                {s.tagline}
              </div>
              <div style={{ position: "absolute", bottom: 12, right: 12, color: A, fontSize: 10, fontFamily: "monospace", opacity: 0.3 }}>
                TAP →
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Overlay */}
      {active && skill && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(230,225,215,0.9)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16
        }}>
          <div ref={modalRef} role="dialog" aria-modal="true" aria-label={skill.label} style={{
            background: BG, border: "1px solid rgba(45,90,39,0.22)", borderRadius: 4,
            width: "100%", maxWidth: 600, position: "relative", overflow: "hidden",
            boxShadow: "0 8px 48px rgba(45,90,39,0.1), 0 0 1px rgba(45,90,39,0.2)"
          }}>
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(45,90,39,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}/>
            <Corner pos="tl"/><Corner pos="tr"/><Corner pos="bl"/><Corner pos="br"/>

            {/* Header */}
            <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid rgba(45,90,39,0.1)", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: A, fontFamily: "monospace", fontSize: 10, letterSpacing: 3, marginBottom: 6, opacity: 0.4 }}>
                    {skill.annotation}
                  </div>
                  <div style={{ color: TEXT, fontSize: 22, letterSpacing: 1 }}>{skill.label.toUpperCase()}</div>
                  <div style={{ color: MUTED, fontSize: 12, fontFamily: "Georgia, serif", fontStyle: "italic", marginTop: 4 }}>
                    {skill.tagline}
                  </div>
                </div>
                <button onClick={close} aria-label="Close" style={{
                  background: "none", border: "1px solid rgba(45,90,39,0.2)", color: A,
                  fontFamily: "monospace", fontSize: 12, padding: "4px 10px",
                  cursor: "pointer", borderRadius: 2, letterSpacing: 1
                }}>✕ ESC</button>
              </div>
            </div>

            {/* Step indicators */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(45,90,39,0.1)" }}>
              {skill.steps.map((s, i) => (
                <button key={i} onClick={() => goStep(i)} aria-label={`Step ${i+1}: ${s.title}`} aria-current={step===i ? "step" : undefined} style={{
                  flex: 1, padding: "12px 8px", background: step===i ? "rgba(45,90,39,0.07)" : "transparent",
                  border: "none", borderRight: i<2 ? "1px solid rgba(45,90,39,0.1)" : "none",
                  borderBottom: step===i ? `2px solid ${A}` : "2px solid transparent",
                  cursor: "pointer", textAlign: "center"
                }}>
                  <div style={{ color: step===i ? A : "rgba(45,90,39,0.28)", fontFamily: "monospace", fontSize: 10, letterSpacing: 2 }}>
                    STEP.{String(i+1).padStart(2,"0")}
                  </div>
                </button>
              ))}
            </div>

            {/* Step content */}
            <div style={{ padding: "32px 24px 28px", display: "flex", gap: 24, alignItems: "flex-start", position: "relative" }}>
              <div key={`${active}-${step}-${animKey}`} style={{
                flexShrink: 0, width: 60, height: 60,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(45,90,39,0.1)", borderRadius: 2, background: "rgba(45,90,39,0.04)"
              }}>
                <StepIcon skill={active} step={step} active={true}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: TEXT, fontSize: 16, letterSpacing: 0.5, marginBottom: 12, lineHeight: 1.2 }}>
                  {skill.steps[step].title}
                </div>
                <div style={{ color: "rgba(26,26,26,0.6)", fontSize: 14, fontFamily: "Georgia, serif", lineHeight: 1.7 }}>
                  {skill.steps[step].body}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ padding: "0 24px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => goStep(Math.max(0, step-1))} disabled={step===0} aria-label="Previous step" style={{
                background: "none", border: `1px solid rgba(45,90,39,${step===0?0.1:0.22})`,
                color: step===0 ? "rgba(45,90,39,0.22)" : A,
                fontFamily: "monospace", fontSize: 11, padding: "6px 16px",
                cursor: step===0?"default":"pointer", borderRadius: 2, letterSpacing: 2
              }}>← PREV</button>

              <div style={{ display: "flex", gap: 8 }}>
                {skill.steps.map((_,i) => (
                  <div key={i} onClick={() => goStep(i)} style={{
                    width: i===step ? 20 : 6, height: 6, borderRadius: 3,
                    background: i===step ? A : "rgba(45,90,39,0.18)",
                    transition: "all 0.3s ease", cursor: "pointer"
                  }}/>
                ))}
              </div>

              <button onClick={() => goStep(Math.min(skill.steps.length-1, step+1))}
                disabled={step===skill.steps.length-1}
                aria-label="Next step"
                style={{
                  background: step===skill.steps.length-1 ? "none" : "rgba(45,90,39,0.07)",
                  border: `1px solid rgba(45,90,39,${step===skill.steps.length-1?0.1:0.22})`,
                  color: step===skill.steps.length-1 ? "rgba(45,90,39,0.22)" : A,
                  fontFamily: "monospace", fontSize: 11, padding: "6px 16px",
                  cursor: step===skill.steps.length-1?"default":"pointer", borderRadius: 2, letterSpacing: 2
                }}>NEXT →</button>
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid rgba(45,90,39,0.07)", padding: "8px 24px", display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: A, fontFamily: "monospace", fontSize: 9, opacity: 0.28, letterSpacing: 2 }}>
                SKY.MADSEN / OPERATIONS.DIRECTOR
              </div>
              <div style={{ color: A, fontFamily: "monospace", fontSize: 9, opacity: 0.28, letterSpacing: 2 }}>
                {step+1}/{skill.steps.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
