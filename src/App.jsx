import { useState, useEffect, useRef } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#f2ede3",
  ink: "#1a1a1a",
  green: "#2d5a27",
  greenLight: "#3d7a35",
  greenPale: "#e8efe6",
  muted: "#9a9080",
  subtle: "#d4cfc4",
  white: "#fdfaf5",
};

// ─── MOUNTAIN SVGs ────────────────────────────────────────────────────────────
function MtnRange({ height = "70px", style = {} }) {
  return (
    <svg viewBox="0 0 1000 180" preserveAspectRatio="none" style={{ width: "100%", height, display: "block", ...style }}>
      <polygon points="0,180 80,90 160,130 260,50 360,100 460,30 560,80 660,40 760,90 860,60 1000,180" fill={C.ink} opacity="0.18" />
      <polygon points="0,180 100,110 200,140 340,70 440,120 540,50 640,100 740,70 850,110 1000,180" fill={C.ink} opacity="0.45" />
      <polygon points="0,180 150,130 280,160 400,100 520,150 650,110 780,140 1000,180" fill={C.ink} />
    </svg>
  );
}

function MtnStamp({ color = C.ink, size = 90 }) {
  return (
    <svg viewBox="0 0 200 120" width={size} height={size * 0.6} style={{ display: "block" }}>
      <polygon points="10,110 80,20 100,45 130,10 190,110" fill={color} opacity="0.9" />
      <polygon points="80,20 100,45 130,10" fill={C.bg} opacity="0.6" />
      <line x1="10" y1="112" x2="190" y2="112" stroke={color} strokeWidth="3" />
    </svg>
  );
}

function MtnHero() {
  return (
    <svg viewBox="0 0 1200 320" preserveAspectRatio="none" style={{ width: "100%", height: "220px", display: "block" }}>
      {/* back range */}
      <polygon points="0,320 100,160 220,230 380,80 500,150 620,40 740,120 860,70 980,140 1100,90 1200,320" fill={C.green} opacity="0.18" />
      {/* mid range */}
      <polygon points="0,320 80,200 200,250 360,110 480,180 600,70 720,150 840,100 960,170 1100,120 1200,320" fill={C.green} opacity="0.4" />
      {/* front range */}
      <polygon points="0,320 120,230 260,270 420,160 560,220 680,140 800,200 920,160 1060,210 1200,320" fill={C.ink} opacity="0.85" />
      {/* snow caps */}
      <polygon points="590,80 620,40 650,80 630,92 610,92" fill={C.bg} opacity="0.7" />
      <polygon points="370,92 380,80 400,60 420,80 430,92 410,102 390,102" fill={C.bg} opacity="0.5" />
    </svg>
  );
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, x = false }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : x ? "translateX(-24px)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Experience", "Projects", "Skills", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(242,237,227,0.97)" : "transparent",
      borderBottom: scrolled ? `3px solid ${C.ink}` : "none",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      transition: "all 0.35s ease",
      padding: "0.9rem 2rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: "'Arial Black', Impact, sans-serif",
    }}>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <div style={{ width: 32, height: 32, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: C.bg, fontSize: "0.65rem", fontWeight: 900, letterSpacing: "0.05em" }}>SM</span>
        </div>
        <span style={{ color: C.ink, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", display: scrolled ? "block" : "none" }}>Sky Madsen</span>
      </a>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: C.ink, textDecoration: "none", fontSize: "0.6rem", letterSpacing: "0.18em",
            textTransform: "uppercase", fontWeight: 900,
            borderBottom: "2px solid transparent", paddingBottom: "2px",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseOver={e => { e.target.style.borderColor = C.green; e.target.style.color = C.green; }}
          onMouseOut={e => { e.target.style.borderColor = "transparent"; e.target.style.color = C.ink; }}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  return (
    <section id="hero" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ background: C.ink, padding: "0.6rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Sky Madsen · Portfolio</span>
        <span style={{ fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.55rem", letterSpacing: "0.15em" }}>Operations · People · Pacific Northwest</span>
      </div>

      {/* Main hero grid */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "4rem" }}>
        {/* LEFT */}
        <div style={{ padding: "3rem 2rem 2rem 3rem", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: `5px solid ${C.ink}` }}>
          <div>
            <div style={{
              opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)",
              transition: "all 0.7s ease 0.1s",
            }}>
              <div style={{ fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>No. 001 — Operations Leader</div>
              <h1 style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: "clamp(4rem, 9vw, 8rem)",
                lineHeight: 0.85, fontWeight: 900, color: C.ink,
                textTransform: "uppercase", margin: 0,
              }}>
                SKY<br />
                <span style={{ WebkitTextStroke: `4px ${C.ink}`, color: "transparent" }}>MAD</span><br />
                SEN
              </h1>
            </div>
          </div>

          <div style={{ opacity: v ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>
            <div style={{ height: "5px", background: C.ink, marginBottom: "1rem" }} />
            <p style={{ fontFamily: "Georgia,serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, maxWidth: "380px" }}>
              20+ years turning complex operations into high-performance culture. General Manager. Team builder. Builder of AI tools. Heading to the Pacific Northwest.
            </p>
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a href="#contact" style={{ textDecoration: "none", padding: "0.8rem 2rem", background: C.green, color: C.bg, fontFamily: "'Arial Black',sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900, transition: "background 0.2s" }}
                onMouseOver={e => e.target.style.background = C.greenLight}
                onMouseOut={e => e.target.style.background = C.green}
              >Hire Me →</a>
              <a href="#experience" style={{ textDecoration: "none", padding: "0.8rem 2rem", border: `3px solid ${C.ink}`, color: C.ink, fontFamily: "'Arial Black',sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900, transition: "all 0.2s" }}
                onMouseOver={e => { e.target.style.background = C.ink; e.target.style.color = C.bg; }}
                onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = C.ink; }}
              >View Record</a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ padding: "3rem 2rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: v ? 1 : 0, transition: "opacity 0.9s ease 0.35s" }}>
          {/* Stamp badge */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: "130px", height: "130px", borderRadius: "50%", border: `4px solid ${C.green}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "0.38rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.green, textAlign: "center", lineHeight: 2.1 }}>
                PNW<br />BOUND<br />✦ 2025 ✦
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
            {[["20+", "Years Exp."], ["30+", "Team Size"], ["Tier 2", "Drive-Thru"], ["ASU", "Org. Lead"]].map(([n, l]) => (
              <div key={l} style={{ border: `2px solid ${C.ink}`, padding: "0.9rem", background: C.white }}>
                <div style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "1.5rem", fontWeight: 900, color: C.ink, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: C.muted, textTransform: "uppercase", marginTop: "0.2rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mountain range at bottom */}
      <div>
        <div style={{ background: C.ink, padding: "0.4rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem" }}>
            {["Seattle WA", "Tacoma WA", "Olympia WA", "Bend OR"].map(c => (
              <span key={c} style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{c}</span>
            ))}
          </div>
        </div>
        <MtnHero />
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: C.white, borderTop: `5px solid ${C.ink}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr" }}>
        {/* Sidebar label */}
        <div style={{ background: C.ink, padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Section 01</div>
            <h2 style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "2.8rem", fontWeight: 900, color: C.bg, textTransform: "uppercase", lineHeight: 0.9, margin: 0 }}>
              THE<br />LEAD<br />ER
            </h2>
          </div>
          <MtnStamp color={C.greenLight} size={100} />
        </div>

        {/* Content */}
        <div style={{ padding: "3rem 3rem" }}>
          <Reveal>
            <p style={{ fontFamily: "Georgia,serif", fontSize: "1.1rem", color: C.ink, lineHeight: 1.85, marginBottom: "2rem", maxWidth: "680px" }}>
              I've spent 20+ years turning chaos into culture. From high-volume automotive sales floors to a Tier 2 Starbucks Drive-Thru with 30+ partners, I've built teams that perform under pressure, beat their numbers, and stay.
            </p>
            <p style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "#555", lineHeight: 1.85, maxWidth: "680px" }}>
              I own the P&L. I develop talent. And on weekends I build AI-powered tools in React and Node.js — because a modern operations leader has to understand the technology running the operation. Currently pursuing my B.S. in Organizational Leadership at ASU.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: `3px solid ${C.ink}` }}>
              {[
                { label: "Current Role", value: "GM · Starbucks", sub: "Tier 2 Drive-Thru" },
                { label: "Target", value: "Ops Director", sub: "Regional / District" },
                { label: "Relocating", value: "PNW 2025", sub: "Seattle · Tacoma · Bend" },
              ].map((s, i) => (
                <div key={s.label} style={{ padding: "1.5rem", borderRight: i < 2 ? `3px solid ${C.ink}` : "none", background: i === 1 ? C.greenPale : C.white }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: "0.4rem" }}>{s.label}</div>
                  <div style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "0.95rem", fontWeight: 900, color: C.ink, textTransform: "uppercase" }}>{s.value}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "0.72rem", color: "#666", marginTop: "0.2rem" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const jobs = [
    {
      role: "Coffeehouse Leader — General Manager",
      company: "Starbucks Coffee Company",
      period: "2018 – Present",
      loc: "Los Angeles, CA · Tier 2 Drive-Thru",
      bullets: [
        "Lead 30+ partner team across all operational, staffing, and financial functions",
        "Full P&L ownership — labor scheduling, COGS management, revenue growth strategy",
        "Built culture of excellence; top-quartile partner engagement scores quarter over quarter",
        "Developed internal talent pipeline — promoted 4 shift supervisors to management track",
        "Built and deployed AI-powered Command Center dashboard (React, Node.js, Anthropic API) for performance tracking",
      ],
    },
    {
      role: "Sales & Operations Leadership",
      company: "Automotive & Direct-to-Consumer Sales",
      period: "2004 – 2018",
      loc: "California · Multi-Location",
      bullets: [
        "20+ years customer-facing leadership across automotive retail and DTC environments",
        "Managed full sales cycle, team coaching, and operational efficiency for high-volume sales floors",
        "Consistent top-performer recognition across multiple organizations and markets",
        "Built foundational skills in people management, pipeline development, and customer experience",
      ],
    },
  ];

  return (
    <section id="experience" style={{ background: C.bg, borderTop: `5px solid ${C.ink}` }}>
      {/* Section header */}
      <div style={{ background: C.green, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0 }}>
          The Record
        </h2>
        <span style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.5)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Section 02 — Experience</span>
      </div>

      <div style={{ padding: "3rem" }}>
        {jobs.map((job, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ marginBottom: i < jobs.length - 1 ? "2.5rem" : 0, border: `3px solid ${C.ink}`, background: C.white, position: "relative" }}
              onMouseOver={e => e.currentTarget.style.borderColor = C.green}
              onMouseOut={e => e.currentTarget.style.borderColor = C.ink}
            >
              <div style={{ transition: "border-color 0.2s" }} />
              <div style={{ background: C.ink, padding: "1rem 1.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "0.95rem", color: C.bg, textTransform: "uppercase", fontWeight: 900 }}>{job.role}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "0.75rem", color: C.greenLight, marginTop: "0.2rem" }}>{job.company} · {job.loc}</div>
                </div>
                <div style={{ border: `2px solid ${C.greenLight}`, padding: "0.3rem 0.9rem" }}>
                  <span style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{job.period}</span>
                </div>
              </div>
              <div style={{ padding: "1.5rem 1.8rem" }}>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ fontFamily: "Georgia,serif", color: "#444", lineHeight: 1.75, marginBottom: "0.5rem", fontSize: "0.9rem" }}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Education */}
        <Reveal delay={200}>
          <div style={{ marginTop: "2rem", border: `3px solid ${C.green}`, background: C.greenPale, padding: "1.3rem 1.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Arial Black',sans-serif", color: C.ink, fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 900 }}>B.S. Organizational Leadership</div>
              <div style={{ fontFamily: "Georgia,serif", color: C.green, fontSize: "0.75rem", marginTop: "0.2rem" }}>Arizona State University — In Progress</div>
            </div>
            <div style={{ background: C.green, padding: "0.4rem 1rem" }}>
              <span style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>In Progress</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      num: "01",
      name: "Command Center Dashboard",
      desc: "Full-stack AI-powered personal ops dashboard. React + Node.js + Vite + Anthropic API. Deployed via GitHub Actions CI/CD from Termux on Android. Includes AI Assistant, Job Tracker, Housing Tracker, Move Budget, and a Telegram bot for natural-language deployments.",
      tech: ["React", "Node.js", "Vite", "Anthropic API", "GitHub Actions", "Termux"],
      url: "github.com/josephsmithvapes/Command-center",
    },
    {
      num: "02",
      name: "PNW Relocation Intelligence Report",
      desc: "Data-driven 10-city relocation analysis — LA vs. Pacific Northwest markets. Compared cost of living, job markets, housing, and lifestyle across Spokane, Tacoma, Bend, Vancouver WA, and more. Built as interactive PowerPoint + MP4.",
      tech: ["Data Analysis", "Research", "PowerPoint", "Visualization"],
    },
    {
      num: "03",
      name: "Polymarket AI Trading Agent",
      desc: "Always-on Android/Termux prediction market intelligence pipeline ingesting RSS feeds, government data, and crypto signals. Master run script with validation framework and live-trading safety gate.",
      tech: ["Python", "Termux", "RSS/APIs", "Automation", "Financial Data"],
    },
    {
      num: "04",
      name: "LinkedIn Post Generator",
      desc: "AI-powered LinkedIn ghostwriting tool built with the Anthropic API. 6 post types, 4 tones, quick variant refinements, LinkedIn preview simulator, persistent post library. Integrated directly into Command Center.",
      tech: ["React", "Anthropic API", "Persistent Storage", "UI/UX"],
    },
  ];

  return (
    <section id="projects" style={{ background: C.ink, borderTop: `5px solid ${C.green}` }}>
      <div style={{ background: C.green, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0 }}>
          Built, Not Just Managed
        </h2>
        <span style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.5)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Section 03 — Projects</span>
      </div>

      <div style={{ padding: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {projects.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ border: `2px solid rgba(242,237,227,0.12)`, background: "rgba(242,237,227,0.03)", padding: "1.8rem", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.25s", cursor: "default" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = C.greenLight; e.currentTarget.style.background = "rgba(45,90,39,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(242,237,227,0.12)"; e.currentTarget.style.background = "rgba(242,237,227,0.03)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ fontFamily: "'Arial Black',sans-serif", color: C.green, fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>{p.num}</div>
              <h3 style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.95rem", textTransform: "uppercase", margin: "0 0 0.8rem", fontWeight: 900 }}>{p.name}</h3>
              <p style={{ fontFamily: "Georgia,serif", color: "#8a8580", lineHeight: 1.75, fontSize: "0.82rem", flex: 1 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.2rem" }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.greenLight, border: `1px solid rgba(61,122,53,0.4)`, padding: "0.2rem 0.5rem" }}>{t}</span>
                ))}
              </div>
              {p.url && <div style={{ marginTop: "0.8rem", fontFamily: "Georgia,serif", color: C.greenLight, fontSize: "0.72rem" }}>→ {p.url}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  const groups = [
    { label: "Operations", items: ["P&L Management", "Drive-Thru Ops", "Inventory & COGS", "Process Optimization", "Multi-Unit Awareness"] },
    { label: "Leadership", items: ["Team Development", "Talent Pipeline", "Change Management", "Partner Engagement", "Cross-functional Collab"] },
    { label: "Tech & Build", items: ["React / Node.js", "Vite / GitHub CI/CD", "Anthropic API", "Python / Termux", "Data Analysis"] },
    { label: "Strategy", items: ["Strategic Planning", "P&L Forecasting", "Customer Experience", "Market Research", "Relocation Analysis"] },
  ];

  return (
    <section id="skills" style={{ background: C.bg, borderTop: `5px solid ${C.ink}` }}>
      <div style={{ background: C.ink, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0 }}>The Toolkit</h2>
        <span style={{ fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Section 04 — Skills</span>
      </div>

      <div style={{ padding: "3rem", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 80}>
            <div style={{ border: `3px solid ${C.ink}`, background: C.white }}>
              <div style={{ background: i % 2 === 0 ? C.ink : C.green, padding: "0.7rem 1.3rem" }}>
                <span style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 900 }}>{g.label}</span>
              </div>
              <div style={{ padding: "1.2rem 1.3rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {g.items.map(skill => (
                  <span key={skill} style={{ fontFamily: "Georgia,serif", fontSize: "0.78rem", color: C.ink, border: `2px solid ${C.subtle}`, padding: "0.3rem 0.7rem", background: C.bg, transition: "all 0.2s", cursor: "default" }}
                    onMouseOver={e => { e.target.style.borderColor = C.green; e.target.style.color = C.green; e.target.style.background = C.greenPale; }}
                    onMouseOut={e => { e.target.style.borderColor = C.subtle; e.target.style.color = C.ink; e.target.style.background = C.bg; }}
                  >{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ background: C.ink, borderTop: `5px solid ${C.green}`, position: "relative", overflow: "hidden" }}>
      {/* Mountain range decoration */}
      <div style={{ opacity: 0.07 }}>
        <MtnRange height="120px" style={{ filter: "invert(1)" }} />
      </div>

      <div style={{ padding: "0rem 3rem 4rem", position: "relative", marginTop: "-60px" }}>
        <Reveal>
          <div style={{ background: C.green, padding: "1.5rem 2rem", display: "inline-block", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Section 05 — Contact</span>
          </div>
          <h2 style={{ fontFamily: "'Arial Black',sans-serif", fontSize: "clamp(2.5rem,7vw,6rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", lineHeight: 0.9, margin: "0 0 2rem" }}>
            READY<br />TO<br />
            <span style={{ WebkitTextStroke: `4px ${C.greenLight}`, color: "transparent" }}>BUILD</span><br />
            <span style={{ color: C.greenLight }}>TOGETHER?</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p style={{ fontFamily: "Georgia,serif", color: "#7a7570", fontSize: "1rem", lineHeight: 1.75, maxWidth: "520px", marginBottom: "2.5rem" }}>
            Targeting General Manager, Operations Director, and Regional Leadership roles in Seattle, Tacoma, Olympia, and Bend. Open to conversations starting now — relocating in 2025.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/skymadsen" },
              { label: "GitHub", href: "https://github.com/josephsmithvapes" },
              { label: "Email", href: "mailto:sky@skymadsen.com" },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                textDecoration: "none", padding: "0.9rem 2rem",
                border: `3px solid ${C.bg}`, color: C.bg,
                fontFamily: "'Arial Black',sans-serif", fontSize: "0.62rem",
                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900,
                transition: "all 0.2s",
              }}
              onMouseOver={e => { e.target.style.background = C.green; e.target.style.borderColor = C.green; }}
              onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.borderColor = C.bg; }}
              >{link.label} →</a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <div style={{ background: C.green, padding: "1rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'Arial Black',sans-serif", color: C.bg, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>© 2025 Sky Madsen</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["React + Vite", "GitHub Actions", "Deployed from Termux"].map(t => (
            <span key={t} style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.5)", fontSize: "0.55rem", letterSpacing: "0.1em" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #1a1a1a; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f2ede3; }
        ::-webkit-scrollbar-thumb { background: #2d5a27; }
        a { cursor: pointer; }
        ul { list-style: disc; }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
