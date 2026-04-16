import { useState, useEffect, useRef } from "react";
import PourOver from './components/PourOver.jsx';
import SkillsSection from './components/SkillsSection_green.jsx';
import RolesSection from './components/RolesSection_green.jsx';

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

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w < 900, w };
}

function MtnRange({ height = "70px", style = {} }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 180" preserveAspectRatio="none" style={{ width: "100%", height, display: "block", ...style }}>
      <polygon points="0,180 80,90 160,130 260,50 360,100 460,30 560,80 660,40 760,90 860,60 1000,180" fill={C.ink} opacity="0.18" />
      <polygon points="0,180 100,110 200,140 340,70 440,120 540,50 640,100 740,70 850,110 1000,180" fill={C.ink} opacity="0.45" />
      <polygon points="0,180 150,130 280,160 400,100 520,150 650,110 780,140 1000,180" fill={C.ink} />
    </svg>
  );
}


function MtnHero({ isMobile }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 320" preserveAspectRatio="none" style={{ width: "100%", height: isMobile ? "120px" : "220px", display: "block" }}>
      <polygon points="0,320 100,160 220,230 380,80 500,150 620,40 740,120 860,70 980,140 1100,90 1200,320" fill={C.green} opacity="0.18" />
      <polygon points="0,320 80,200 200,250 360,110 480,180 600,70 720,150 840,100 960,170 1100,120 1200,320" fill={C.green} opacity="0.4" />
      <polygon points="0,320 120,230 260,270 420,160 560,220 680,140 800,200 920,160 1060,210 1200,320" fill={C.ink} opacity="0.85" />
      <polygon points="590,80 620,40 650,80 630,92 610,92" fill={C.bg} opacity="0.7" />
      <polygon points="370,92 380,80 400,60 420,80 430,92 410,102 390,102" fill={C.bg} opacity="0.5" />
    </svg>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, stretch = false }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(20px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      height: stretch ? "100%" : undefined,
    }}>{children}</div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  const links = ["Experience", "Projects", "Skills", "Roles", "Contact", "Pour-Over", "Resume"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(242,237,227,0.97)",
        borderBottom: `3px solid ${C.ink}`,
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
        padding: isMobile ? "0.8rem 1.2rem" : "0.9rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Arial Black', sans-serif",
      }}>
        <a href="#hero" aria-label="Sky Madsen — back to top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.65rem", fontWeight: 900 }}>SM</span>
          </div>
        </a>

        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem" }}>
           {links.map(l => (
  l === "Resume" ? (
    <button key={l}
      onClick={() => { window.location.href="/Sky_Madsen_Resume.pdf"; }}
      style={{
        fontFamily: "'Arial Black', sans-serif", color: C.ink,
        textDecoration: "none", fontSize: "0.6rem", background: "none",
        border: "none", letterSpacing: "0.15em", textTransform: "uppercase",
        fontWeight: 900, borderBottom: "2px solid transparent",
        paddingBottom: "2px", transition: "all 0.2s", cursor: "pointer",
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = C.ink; }}
    >Resume</button>
  ) : (
    <a key={l} href={`#${l.toLowerCase()}`}
      style={{
        fontFamily: "'Arial Black', sans-serif", color: C.ink,
        textDecoration: "none", fontSize: "0.6rem",
        letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900,
        borderBottom: "2px solid transparent",
        paddingBottom: "2px", transition: "all 0.2s",
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = C.ink; }}
    >{l}</a>
  )
))}
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            style={{
              background: "none", border: `2px solid ${C.ink}`, padding: "0.3rem 0.5rem",
              cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px",
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: "18px", height: "2px", background: C.ink }} />
            ))}
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div id="mobile-nav" role="navigation" aria-label="Mobile navigation" style={{
          position: "fixed", top: "51px", left: 0, right: 0, zIndex: 99,
          background: C.bg, borderBottom: `3px solid ${C.ink}`,
          display: "flex", flexDirection: "column",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "1rem 1.5rem", color: C.ink, textDecoration: "none",
                fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem",
                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900,
                borderBottom: `1px solid ${C.subtle}`,
              }}
            >{l}</a>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [v, setV] = useState(false);
  const { isMobile } = useBreakpoint();
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);

  return (
    <section id="hero" style={{ minHeight: isMobile ? "auto" : "100vh", background: C.bg, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Hero grid */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      }}>
        {/* LEFT */}
        {!isMobile && <div style={{
          padding: "3rem 2rem 2rem 3rem",
          paddingTop: "5rem",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          borderRight: `5px solid ${C.ink}`,
        }}>
          <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}>
            {/* E — SKY solid / MADSEN outlined on two lines but tighter */}
            <h1 style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: "clamp(4rem,9vw,8rem)",
              lineHeight: 0.85, fontWeight: 900,
              textTransform: "uppercase", margin: 0,
            }}>
              <span style={{ color: C.ink }}>SKY</span><br />
              <span style={{ WebkitTextStroke: `4px ${C.ink}`, color: "transparent" }}>MADSEN</span>
            </h1>

            {/* A — tagline */}
            <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", color: C.muted, fontSize: "0.62rem", margin: "1.2rem 0 0", lineHeight: 1.5 }}>
              "Operations Leader | People Champion | AI Integrator: Driving Measurable Growth Through Human-Centric Systems."
            </p>
          </div>

          <div style={{ opacity: v ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>
            {/* C — location strip replaces plain rule */}
            <div style={{ display: "flex", gap: "1.2rem", marginBottom: "1rem", justifyContent: "center" }}>
              {["Washington", "Oregon", "Remote"].map((c, i) => (
                <span key={c} style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.42rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  {c}{i < 2 && <span style={{ color: C.subtle }}>·</span>}
                </span>
              ))}
            </div>
            <div style={{ height: "2px", background: C.ink, marginBottom: "1rem" }} />

            {/* Open to badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: C.greenPale, border: `2px solid ${C.green}`, padding: "0.4rem 0.8rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
              <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>
                Open to Opportunities · PNW 2026
              </span>
            </div>

            {/* D — two buttons */}
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
              <a href="#contact" style={{ flex: 1, textDecoration: "none", padding: "0.8rem", background: C.green, color: C.bg, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900, textAlign: "center" }}>Reach Out! →</a>
              <a href="/Sky_Madsen_Resume.pdf" style={{ flex: 1, textDecoration: "none", padding: "0.8rem", border: `3px solid ${C.ink}`, color: C.ink, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900, textAlign: "center" }}>Resume</a>
            </div>
          </div>
        </div>}

        {/* RIGHT */}
        {!isMobile && (
          <div style={{ position: "relative", overflow: "hidden", opacity: v ? 1 : 0, transition: "opacity 0.9s ease 0.35s" }}>
            {/* background layer — filter isolated here, top offset matches nav height */}
            <div style={{
              position: "absolute", top: "3.5rem", left: 0, right: 0, bottom: 0,
              backgroundImage: "image-set(url('/sky-tree.webp') type('image/webp'), url('/sky-tree.png') type('image/png'))",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "brightness(0.75) contrast(1.15) grayscale(55%) saturate(2.5)",
            }} />
            <div style={{ position: "absolute", top: "3.5rem", left: 0, right: 0, bottom: 0, background: `linear-gradient(to top, ${C.ink} 0%, ${C.ink} 28%, rgba(26,26,26,0.6) 55%, rgba(26,26,26,0.15) 100%)` }} />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
              <p style={{ margin: "0 0 0.7rem", fontFamily: "Georgia,serif", fontSize: "0.44rem", letterSpacing: "0.12em", color: "rgba(242,237,227,0.7)", fontStyle: "italic", lineHeight: 1.8 }}>
                Coffee Bean Planting* | Costa Rica
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                {[["20+", "Years Exp."], ["30+", "Team Led"], ["Full", "P&L Owner"], ["ASU", "Org. Lead"]].map(([n, l]) => (
                  <div key={l} style={{ border: `2px solid rgba(242,237,227,0.25)`, padding: "0.9rem", background: "rgba(26,26,26,0.6)", backdropFilter: "blur(4px)" }}>
                    <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: C.bg, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "0.52rem", letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase", marginTop: "0.2rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ opacity: v ? 1 : 0, transition: "opacity 0.8s ease 0.4s", display: "flex", flexDirection: "column" }}>
            <div style={{ background: C.ink, paddingTop: "4.5rem", paddingBottom: "1.8rem", paddingLeft: "1.8rem", paddingRight: "1.8rem", textAlign: "center", width: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.38 }}>
                <svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMax meet" style={{ width: "100%", display: "block" }}>
                  <g opacity="0.5">
                    {[[0,120,22,58,44,120],[54,120,76,52,98,120],[108,120,130,56,152,120],[162,120,184,50,206,120],[216,120,238,54,260,120],[270,120,292,52,314,120],[324,120,346,56,368,120],[378,120,400,51,422,120]].map(([x1,y1,x2,y2,x3,y3],i) => (
                      <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill={C.greenLight} />
                    ))}
                  </g>
                </svg>
              </div>
              <p style={{ position: "relative", fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.35)", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.8rem" }}>General Manager → Operations Director</p>
              <div style={{ position: "relative", fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(3.5rem,14vw,4.8rem)", lineHeight: 0.85, fontWeight: 900, color: C.bg, textTransform: "uppercase" }}>SKY</div>
            </div>
            <div style={{ background: C.bg, paddingTop: "0.2rem", paddingBottom: "1rem", paddingLeft: "1.8rem", paddingRight: "1.8rem", textAlign: "center", width: "100%", overflow: "hidden" }}>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(3.5rem,14vw,4.8rem)", lineHeight: 0.85, fontWeight: 900, color: C.ink, textTransform: "uppercase" }}>MADSEN</div>
              <div style={{ height: "4px", background: C.ink, margin: "1.4rem 0 1.2rem" }} />
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.2rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: C.greenPale, border: `2px solid ${C.green}`, padding: "0.45rem 1rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />
                  <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>Open to Opportunities · PNW 2026</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1.4rem" }}>
                <a href="#contact" style={{ flex: 1, textDecoration: "none", padding: "0.85rem", border: `3px solid ${C.ink}`, color: C.ink, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>Hire Me →</a>
                <a href="#experience" style={{ flex: 1, textDecoration: "none", padding: "0.85rem", border: `3px solid ${C.ink}`, color: C.ink, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>Experience</a>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", borderTop: `2px solid ${C.subtle}`, paddingTop: "1rem" }}>
                {[["20+","Years"],["30+","Team Led"],["Full","P&L"]].map(([n,l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: C.ink, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "0.44rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}</div>

      {/* Mountain */}
      <div>
        <div style={{ background: C.ink, padding: "0.4rem 1.5rem", overflowX: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? "1rem" : "2.5rem", minWidth: "fit-content", margin: "0 auto" }}>
            {["Washington", "Oregon", "Remote"].map(c => (
              <span key={c} style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: isMobile ? "0.42rem" : "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{c}</span>
            ))}
          </div>
        </div>
        <MtnHero isMobile={isMobile} />
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const { isMobile } = useBreakpoint();

  const stats = [
    { n: "25+", label: "Years Leading" },
    { n: "30+", label: "Team Built" },
    { n: "Full", label: "P&L Ownership" },
    { n: "100K+", label: "Customers Served" },
  ];

  const chapters = [
    {
      era: "2018 – Present",
      role: "General Manager",
      company: "Starbucks Coffee Company",
      loc: "Los Angeles, CA · High-Volume Drive-Thru",
      narrative: "Ran one of LA’s most demanding drive-thru operations — full P&L, 30+ person team, and a reputation as a trusted peer advisor across some of the most complex markets in the country.",
      outcomes: ["Full P&L Accountability", "Community Partnership", "Peer Advisory", "High-Volume Ops"],
    },
    {
      era: "2004 – 2018",
      role: "Sales & Operations Leadership",
      company: "Automotive & Direct-to-Consumer",
      loc: "California · Multi-Location",
      narrative: "14 years scaling customer-facing operations from the floor up — top performer across automotive retail and DTC, with roles spanning web development, internet sales, marketing, and multi-location management.",
      outcomes: ["Top Performer", "Full Sales Cycle", "Multi-Location", "Web + Marketing"],
    },
  ];

  return (
    <section id="experience" style={{ background: C.bg, borderTop: `5px solid ${C.ink}` }}>
      <div style={{ background: C.green, padding: isMobile ? "1.2rem 1.5rem" : "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "’Arial Black’, sans-serif", fontSize: isMobile ? "1.3rem" : "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>Experience</h2>
          <p style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.6)", fontSize: "0.65rem", marginTop: "0.2rem", fontStyle: "italic" }}>The Record</p>
        </div>
      </div>

      {/* ── stat bar ── */}
      <Reveal>
        <div style={{ background: C.ink, display: "grid", gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`, borderBottom: `3px solid ${C.green}` }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: isMobile ? "1.4rem 1rem" : "1.8rem 2rem", textAlign: "center", borderRight: i < stats.length - 1 ? "1px solid rgba(242,237,227,0.08)" : "none" }}>
              <div style={{ fontFamily: "’Arial Black’, sans-serif", fontSize: isMobile ? "2rem" : "2.6rem", fontWeight: 900, color: C.bg, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "0.6rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.35rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── chapter cards ── */}
      <div style={{ padding: isMobile ? "1.5rem" : "3rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
        {chapters.map((ch, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ border: `3px solid ${C.ink}`, background: C.white, height: "100%", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = C.green}
              onMouseOut={e => e.currentTarget.style.borderColor = C.ink}
            >
              {/* card header */}
              <div style={{ background: C.ink, padding: isMobile ? "1rem 1.2rem" : "1.1rem 1.6rem" }}>
                <div style={{ fontFamily: "’Arial Black’, sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: C.greenLight, textTransform: "uppercase", marginBottom: "0.3rem" }}>{ch.era}</div>
                <div style={{ fontFamily: "’Arial Black’, sans-serif", fontSize: isMobile ? "0.82rem" : "0.95rem", color: C.bg, textTransform: "uppercase", fontWeight: 900, lineHeight: 1.2 }}>{ch.role}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: "0.7rem", color: "rgba(242,237,227,0.55)", marginTop: "0.25rem" }}>{ch.company} · {ch.loc}</div>
              </div>
              {/* card body */}
              <div style={{ padding: isMobile ? "1.2rem" : "1.4rem 1.6rem" }}>
                <p style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? "0.85rem" : "0.92rem", color: "#3a3a3a", lineHeight: 1.7, margin: "0 0 1.2rem" }}>{ch.narrative}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {ch.outcomes.map(o => (
                    <span key={o} style={{ fontFamily: "’Arial Black’, sans-serif", fontSize: "0.42rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.green, border: `1px solid rgba(45,90,39,0.3)`, padding: "0.22rem 0.55rem", background: C.greenPale }}>{o}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── mission quote ── */}
      <Reveal delay={100}>
        <div style={{ margin: isMobile ? "0 1.5rem 3.5rem" : "0 3rem 4.5rem", borderLeft: `4px solid ${C.green}`, paddingLeft: isMobile ? "1.2rem" : "2rem" }}>
          <p style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? "1rem" : "1.2rem", lineHeight: 1.7, color: C.ink, fontStyle: "italic", margin: "0 0 1rem" }}>
            "With 25 years of leadership in the Southern California market, I specialize in bridging the gap between traditional operations and emerging AI technologies. I help small-to-medium businesses reclaim labor hours by strategically integrating AI into their core workflows."
          </p>
          <span style={{ fontFamily: "’Arial Black’, sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted }}>
            Data Driven &nbsp;·&nbsp; Iterative &nbsp;·&nbsp; Rapid
          </span>
        </div>
      </Reveal>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const { isMobile } = useBreakpoint();

  const projects = [
    {
      num: "01",
      name: "Somebody Stole That",
      impact: "Peer-to-peer stolen item recovery — built to serve the community",
      desc: "A reference platform covering fraud schemes, scam patterns, and consumer protection — breaking down how common cons operate and how to recognize, avoid, or respond to them. Built for general awareness and practical help.",
      tech: ["Community Platform", "React", "Node.js", "Live Site"],
      url: "somebodystolethat.com",
      badge: "LIVE",
      preview: "/preview-sst.jpg",
    },
    {
      num: "02",
      name: "AI Integration+",
      impact: "Live platform for practical AI integration + business acceleration",
      desc: "AI Integration+ is a client-facing service platform focused on practical AI adoption, transformation narratives, and clear value pathways. The site at www.aii.coach showcases consulting packages, conversion flows, and real-world modernization messaging.",
      tech: ["AI Strategy", "Platform", "Consulting", "Live Site"],
      url: "www.aii.coach",
      badge: "LIVE",
      preview: "/preview-aii.jpg",
    },
    {
      num: "03",
      name: "The Deschutes Plan",
      impact: "Real-time ops intelligence for Bend's premier public house",
      desc: "Live floor data & strategic insights dashboard for Deschutes Brewery's Bend Public House. Tracks table turns, labor %, pours per hour, and inventory alerts in real time — built to demonstrate operations leadership at scale.",
      tech: ["Operations", "Data Viz", "Dashboard", "Hospitality"],
      localUrl: "/deschutes-plan/index.html",
      badge: "DEMO",
      preview: "/preview-deschutes.jpg",
    },
    {
      num: "04",
      name: "Career Finder / Move Dashboard",
      impact: "AI-powered relocation + career intelligence for PNW markets",
      desc: "Interactive field-notes dashboard mapping PNW job markets, cost of living, and lifestyle data across key relocation targets. Visualizes career opportunities against regional data to support data-driven move decisions.",
      tech: ["Data Analysis", "Mapping", "Career Intelligence", "React"],
      badge: "WIP",
      preview: "/career-finder.jpg",
    },
  ];

  const badgeColors = {
    LIVE: "#c62828",
    DEMO: "#1565c0",
    WIP: "#5d4037",
  };

  return (
    <section id="projects" style={{ background: C.ink, borderTop: `5px solid ${C.green}` }}>
      <div style={{ background: C.green, padding: isMobile ? "1.2rem 1.5rem" : "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: isMobile ? "1.3rem" : "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>Projects</h2>
          <p style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.6)", fontSize: "0.65rem", marginTop: "0.2rem", fontStyle: "italic" }}>Built, Not Just Managed</p>
        </div>
        {!isMobile && <span style={{ fontFamily: "'Arial Black', sans-serif", color: "rgba(242,237,227,0.4)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>  03</span>}
      </div>

      <div style={{ padding: isMobile ? "1.5rem" : "3rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem", alignItems: "stretch" }}>
        {projects.map((p, i) => {
          const hasLink = p.url || p.localUrl;
          const href = p.url ? `https://${p.url}` : p.localUrl;

          const card = (
            <div
              style={{
                border: "2px solid rgba(242,237,227,0.12)",
                background: "rgba(242,237,227,0.03)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxSizing: "border-box",
                transition: "border-color 0.2s, background 0.2s",
                cursor: hasLink ? "pointer" : "default",
                overflow: "hidden",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = C.greenLight; e.currentTarget.style.background = "rgba(45,90,39,0.12)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(242,237,227,0.12)"; e.currentTarget.style.background = "rgba(242,237,227,0.03)"; }}
            >
              {/* ── preview image ── */}
              <div style={{ position: "relative", height: "175px", overflow: "hidden", flexShrink: 0, background: "#0d0d0d" }}>
                <img
                  src={p.preview}
                  alt={`${p.name} preview`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", opacity: 0.88 }}
                  onError={e => { e.currentTarget.parentNode.style.background = "#111"; e.currentTarget.style.display = "none"; }}
                />
                {/* gradient fade into card */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "70px", background: "linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0.6) 60%, transparent 100%)", pointerEvents: "none" }} />
                {/* badge */}
                <div style={{ position: "absolute", top: "0.7rem", right: "0.7rem", display: "inline-flex", alignItems: "center", gap: "0.28rem", background: badgeColors[p.badge] || "#333", color: "#fff", fontSize: "0.4rem", letterSpacing: "0.18em", padding: "0.22rem 0.5rem", fontFamily: "'Arial Black', sans-serif", fontWeight: 900 }}>
                  {p.badge === "LIVE" && <span style={{ width: 5, height: 5, background: "#fff", borderRadius: "50%", display: "inline-block", animation: "livePulse 1.6s ease-in-out infinite" }} />}
                  {p.badge}
                </div>
                {/* num overlay bottom-left */}
                <div style={{ position: "absolute", bottom: "0.5rem", left: "1rem", fontFamily: "'Arial Black', sans-serif", color: "rgba(242,237,227,0.25)", fontSize: "0.55rem", letterSpacing: "0.25em" }}>{p.num}</div>
              </div>

              {/* ── card body ── */}
              <div style={{ padding: "1.2rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* title row */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexWrap: "wrap", marginBottom: "0.45rem" }}>
                  <h3 style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.9rem", textTransform: "uppercase", margin: 0, fontWeight: 900, lineHeight: 1.2 }}>{p.name}</h3>
                </div>

                {/* impact */}
                <p style={{ fontFamily: "Georgia,serif", color: C.greenLight, fontSize: "0.76rem", fontStyle: "italic", margin: "0 0 0.75rem", lineHeight: 1.45 }}>{p.impact}</p>

                {/* desc */}
                <p style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.45)", lineHeight: 1.7, fontSize: "0.8rem", margin: "0 0 1.1rem", flex: 1 }}>{p.desc}</p>

                {/* tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.42rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.greenLight, border: "1px solid rgba(61,122,53,0.35)", padding: "0.2rem 0.5rem" }}>{t}</span>
                  ))}
                </div>

                {/* url */}
                {(p.url || p.localUrl) && (
                  <div style={{ marginTop: "0.75rem", fontFamily: "'Arial Black', sans-serif", fontSize: "0.42rem", letterSpacing: "0.12em", color: "rgba(61,122,53,0.7)", textTransform: "uppercase" }}>
                    → {p.localUrl ? "View Demo" : "View Site"}
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <Reveal key={i} delay={i * 80} stretch>
              {hasLink
                ? <a href={href} target="_blank" rel="noreferrer" style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}>{card}</a>
                : card}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── SKILLS — UNTOUCHED ───────────────────────────────────────────────────────
function Skills() {
  const { isMobile } = useBreakpoint();
  const groups = [
    { label: "Operations", items: ["P&L Management", "Inventory", "Cash Management", "Food Safety", "Business Administration", "Staffing",] },
    { label: "Leadership", items: ["Team Development", "Talent Pipeline", "Change Management", "Partner Engagement", "Cross-functional Collab"] },
    { label: "Tech & Build", items: ["Scheduling Software", "Audio Visual", "Web Development", "Excel", "Powerpoint"] },
    { label: "Strategy", items: ["Strategic Planning", "P&L Forecasting", "Customer Experience", "Market Research", "Prioritization & Planning"] },
  ];

  return (
    <section id="skills" style={{ background: C.bg, borderTop: `5px solid ${C.ink}` }}>
      <div style={{ background: C.ink, padding: isMobile ? "1.2rem 1.5rem" : "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: isMobile ? "1.3rem" : "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0 }}>Skills</h2>
        {!isMobile && <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.muted, fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>  04 — Skills</span>}
      </div>

      <div style={{ padding: isMobile ? "1.5rem" : "3rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.2rem" }}>
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 70}>
            <div style={{ border: `3px solid ${C.ink}`, background: C.white }}>
              <div style={{ background: i % 2 === 0 ? C.ink : C.green, padding: "0.7rem 1.2rem" }}>
                <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900 }}>{g.label}</span>
              </div>
              <div style={{ padding: "1rem 1.2rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {g.items.map(skill => (
                  <span key={skill} style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? "0.75rem" : "0.78rem", color: C.ink, border: `2px solid ${C.subtle}`, padding: "0.3rem 0.65rem", background: C.bg, transition: "all 0.2s", cursor: "default" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; e.currentTarget.style.background = C.greenPale; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.subtle; e.currentTarget.style.color = C.ink; e.currentTarget.style.background = C.bg; }}
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
  const { isMobile } = useBreakpoint();
  return (
    <section id="contact" style={{ background: C.ink, borderTop: `5px solid ${C.green}`, position: "relative", overflow: "hidden" }}>
      <div style={{ opacity: 0.06 }}>
        <MtnRange height={isMobile ? "70px" : "120px"} style={{ filter: "invert(1)" }} />
      </div>

      <div style={{ padding: isMobile ? "1rem 1.5rem 3rem" : "0rem 3rem 4rem", position: "relative", marginTop: isMobile ? "-35px" : "-80px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{
            fontFamily: "'Arial Black', sans-serif",
            fontSize: isMobile ? "clamp(3rem,18vw,5rem)" : "clamp(3.5rem,9vw,8rem)",
            fontWeight: 900, color: C.bg, textTransform: "uppercase",
            lineHeight: 0.88, margin: "0 0 0.5rem",
            textAlign: "left",
          }}>
            LET'S<br />
            <span style={{ WebkitTextStroke: `3px ${C.greenLight}`, color: "transparent" }}>TALK</span>
          </h2>
          <div style={{ fontFamily: "Georgia,serif", fontSize: "0.82rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(242,237,227,0.5)", marginBottom: "1.8rem" }}>
            "We'll find a way... or make one."
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* ── UPDATED: contact body copy, centered */}
          <p style={{ fontFamily: "Georgia,serif", color: "#7a7570", fontSize: isMobile ? "0.88rem" : "1rem", lineHeight: 1.75, maxWidth: "820px",textAlign: "center", margin: "0 auto 2rem" }}>
            I've served 100,000s in the last 20+ years in Southern California in brick & mortar locations. I'm now focused on leveraging that experience to help PNW businesses thrive through strategic operational leadership and practical AI integration. If you're looking for a dedicated, experienced leader to drive operational excellence and team success, let's connect.
          </p>
        </Reveal>

        <Reveal delay={180}>
          {/* ── UPDATED: buttons centered */}
          <div id="resume" style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "center" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/moleculardeveloper" },
            
              { label: "Email", href: "mailto:verifiedbysky@gmail.com" },
              { label: "Resume", href:"/Sky_Madsen_Resume.pdf"
              },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                textDecoration: "none",
                padding: isMobile ? "0.8rem 1.5rem" : "0.9rem 2rem",
                border: `3px solid ${C.bg}`, color: C.bg,
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900,
                transition: "all 0.2s",
              }}
              onMouseOver={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.borderColor = C.green; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.bg; }}
              >{link.label} →</a>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ background: C.green, padding: isMobile ? "0.8rem 1.5rem" : "1rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>© 2026 Sky Madsen</span>
        {!isMobile && (
          <span style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.4)", fontSize: "0.52rem", letterSpacing: "0.08em" }}>
            Washington · Oregon · Remote 
          </span>
        )}
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 200,
        width: 40, height: 40,
        background: C.ink, border: `2px solid ${C.green}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polyline points="2,10 7,4 12,10" stroke={C.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #1a1a1a; font-family: "Georgia", serif; -webkit-font-smoothing: antialiased; }
        button, input, textarea, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f2ede3; }
        ::-webkit-scrollbar-thumb { background: #2d5a27; }
        a { cursor: pointer; }
        ul { list-style: disc; }
        img { max-width: 100%; }
        @keyframes livePulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <Nav />
      <BackToTop />
      <main>
        <Hero />
        <SkillsSection />
        <Experience />
        <Projects />
        <RolesSection />
        <PourOver />
        <Contact />
      </main>
    </>
  );
}
