import { useState, useEffect, useRef } from "react";

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

function MtnHero({ isMobile }) {
  return (
    <svg viewBox="0 0 1200 320" preserveAspectRatio="none" style={{ width: "100%", height: isMobile ? "120px" : "220px", display: "block" }}>
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

function Reveal({ children, delay = 0 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(20px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["About", "Experience", "Projects", "Skills", "Contact"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: isMobile ? "rgba(242,237,227,0.97)" : scrolled || menuOpen ? "rgba(242,237,227,0.97)" : "transparent",
        borderBottom: isMobile || scrolled || menuOpen ? `3px solid ${C.ink}` : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
        padding: isMobile ? "0.8rem 1.2rem" : "0.9rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Arial Black', sans-serif",
      }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.65rem", fontWeight: 900 }}>SM</span>
          </div>
          {scrolled && !isMobile && <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.ink, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900 }}>Sky Madsen</span>}
        </a>

        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem" }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontFamily: "'Arial Black', sans-serif", color: C.ink, textDecoration: "none", fontSize: "0.6rem",
                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900,
                borderBottom: "2px solid transparent", paddingBottom: "2px", transition: "all 0.2s",
              }}
              onMouseOver={e => { e.target.style.borderColor = C.green; e.target.style.color = C.green; }}
              onMouseOut={e => { e.target.style.borderColor = "transparent"; e.target.style.color = C.ink; }}
              >{l}</a>
            ))}
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: `2px solid ${C.ink}`, padding: "0.3rem 0.5rem",
            cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px",
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: "18px", height: "2px", background: C.ink }} />
            ))}
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={{
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
  const { isMobile, isTablet } = useBreakpoint();
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);

  return (
    <section id="hero" style={{ minHeight: isMobile ? "auto" : "100vh", background: C.bg, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ background: C.ink, padding: "0.6rem 1.5rem", display: isMobile ? "none" : "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.3rem" }}>
        <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Sky Madsen · 2026</span>
        {!isMobile && <span style={{ fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.5rem", letterSpacing: "0.12em" }}>Operations · People Leadership · Hospitality</span>}
      </div>

      {/* Hero grid */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        paddingTop: isMobile ? "2.0rem" : "4rem",
      }}>
        {/* LEFT */}
        {!isMobile && <div style={{
          padding: "3rem 2rem 2rem 3rem",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          borderRight: `5px solid ${C.ink}`,
        }}>
          <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.1s" }}>
            {/* ── UPDATED: trajectory label */}
         
                       <div style={{ fontFamily: "'Arial Black', sans-serif", color: C.muted, fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
                General Manager → Operations Director
            </div>
            <h1 style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: isMobile ? "clamp(3.5rem,18vw,5rem)" : "clamp(4rem,9vw,8rem)",
              lineHeight: 0.85, fontWeight: 900, color: C.ink,
              textTransform: "uppercase", margin: 0,
            }}>
              SKY<br />
              <span style={{ WebkitTextStroke: isMobile ? `3px ${C.ink}` : `4px ${C.ink}`, color: "transparent" }}>MAD</span><br />
              SEN
            </h1>
          </div>

          <div style={{ opacity: v ? 1 : 0, transition: "opacity 0.8s ease 0.5s", marginTop: isMobile ? "1.5rem" : 0 }}>
            <div style={{ height: "4px", background: C.ink, marginBottom: "0.8rem" }} />

    

            {/* ── NEW: Open to badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "1rem", background: C.greenPale, border: `2px solid ${C.green}`, padding: "0.4rem 0.8rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
              <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>
                Open to Opportunities · PNW 2026
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem", flexWrap: "wrap" }}>
              <a href="#experience" style={{ textDecoration: "none", padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem", border: `3px solid ${C.ink}`, color: C.ink, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900 }}>View Record</a>
              <a href="#contact" style={{ textDecoration: "none", padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem", background: C.green, color: C.bg, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900 }}>Hire Me →</a>
              
              <a href="#contact" style={{ textDecoration: "none", padding: isMobile ? "0.7rem 0.9rem" : "0.8rem 2rem", border: `3px solid ${C.ink}`, color: C.ink, fontFamily: "'Arial Black', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900 }}>Email</a>
            </div>
          </div>
        </div>}

        {/* RIGHT */}
        {!isMobile && (
          <div style={{ padding: "3rem 2rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: v ? 1 : 0, transition: "opacity 0.9s ease 0.35s" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: isTablet ? "100px" : "130px", height: isTablet ? "100px" : "130px", borderRadius: "50%", border: `4px solid ${C.green}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.35rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.green, textAlign: "center", lineHeight: 2.1 }}>
                  PNW<br />BOUND<br />✦ 2026 ✦
                </div>
              </div>
            </div>
            {/* ── UPDATED: stat tile labels */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {[["20+", "Years Exp."], ["30+", "Team Led"], ["Full", "P&L Owner"], ["ASU", "Org. Lead"]].map(([n, l]) => (
                <div key={l} style={{ border: `2px solid ${C.ink}`, padding: "0.9rem", background: C.white }}>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: C.ink, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "0.52rem", letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase", marginTop: "0.2rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ opacity: v ? 1 : 0, transition: "opacity 0.8s ease 0.4s", display: "flex", flexDirection: "column" }}>
            <div style={{ background: C.ink, paddingTop: "4.5rem", paddingBottom: "1.8rem", paddingLeft: "1.8rem", paddingRight: "1.8rem", textAlign: "center", width: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%", overflow: "hidden" }}>
                <img src="/photo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%) brightness(0.35)", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1a1a1a 0%, rgba(26,26,26,0.5) 50%, transparent 100%)" }} />
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.1 }}>
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
            {["Seattle WA", "Tacoma WA", "Olympia WA", "Bend OR"].map(c => (
              <span key={c} style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: isMobile ? "0.42rem" : "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{c}</span>
            ))}
          </div>
        </div>
        <MtnHero isMobile={isMobile} />
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const { isMobile } = useBreakpoint();
  return (
    <section id="about" style={{ background: C.white, borderTop: `5px solid ${C.ink}` }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr" }}>
        <div style={{
          background: C.ink,
          padding: isMobile ? "1.5rem" : "3rem 2rem",
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: "space-between",
          alignItems: isMobile ? "center" : "flex-start",
          borderBottom: isMobile ? `5px solid ${C.green}` : "none",
        }}>
          <div>
            
            <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: isMobile ? "1.8rem" : "2.8rem", fontWeight: 900, color: C.bg, textTransform: "uppercase", lineHeight: 0.9, margin: 0 }}>
              {isMobile ? "This team is much more than the sum of individuals gathered here." : <>THE<br />LEAD<br />ER</>}
            </h2>
          </div>
          <MtnStamp color={C.greenLight} size={isMobile ? 70 : 100} />
        </div>

        <div style={{ padding: isMobile ? "2rem 1.5rem" : "3rem" }}>
          <Reveal>
            {/* ── UPDATED: about copy */}
            
                 
            <p style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? "0.88rem" : "1rem", color: "#555", lineHeight: 1.85 }}>
               Constantly innovating to find new ways to surprise & delight my guests.
               Developing leaders, relationships & revenue.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 0, border: `3px solid ${C.ink}` }}>
              {[
                { label: "Current Role", value: "GM · Starbucks", sub: "Tier 2 Drive-Thru" },
                { label: "Target", value: "Ops Director", sub: "Regional / District" },
                { label: "Relocating", value: "PNW 2026", sub: "Washington · Oregon" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  padding: "1.2rem 1.5rem",
                  borderRight: !isMobile && i < 2 ? `3px solid ${C.ink}` : "none",
                  borderBottom: isMobile && i < 2 ? `3px solid ${C.ink}` : "none",
                  background: i === 1 ? C.greenPale : C.white,
                }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, marginBottom: "0.3rem" }}>{s.label}</div>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.88rem", fontWeight: 900, color: C.ink, textTransform: "uppercase" }}>{s.value}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: "0.7rem", color: "#666", marginTop: "0.2rem" }}>{s.sub}</div>
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
  const { isMobile } = useBreakpoint();
  const jobs = [
    {
      role: "Coffeehouse Leader — General Manager",
      company: "Starbucks Coffee Company",
      period: "2018 – Present",
      loc: "Los Angeles, CA · Drive-Thru",
      bullets: [
        "Fostered relationships with local schools, churches, and first response departments to champion our community, team, and brand."
        ,
        "Consistently challenge the mindset of my tean and vise versa in order to create a dynamic - collaborative environment.",
        "Planned & coordinated public events such as Music Cares, LA Aids Walk, LA Pride Parade, & National Night Out",
        "Established as a trusted peer advisor in some of the most complex markets possible",
      ],
    },
    {
      role: "Sales & Operations Leadership",
      company: "Automotive & Direct-to-Consumer Sales",
      period: "2004 – 2018",
      loc: "California · Multi-Location",
      bullets: [
        "20+ years of customer-facing leadership across automotive retail and DTC environments",
        "Managed full sales cycle, team coaching, and operational efficiency for high-volume floors",
        "Consistent top-performer recognition across multiple organizations and markets",
        "Built foundational expertise in people management, pipeline development, and customer experience",
      ],
    },
  ];

  return (
    <section id="experience" style={{ background: C.bg, borderTop: `5px solid ${C.ink}` }}>
      {/* ── UPDATED: section header with subtitle */}
      <div style={{ background: C.green, padding: isMobile ? "1.2rem 1.5rem" : "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: isMobile ? "1.3rem" : "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>Experience</h2>
          <p style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.6)", fontSize: "0.65rem", marginTop: "0.2rem", fontStyle: "italic" }}>The Record</p>
        </div>
        {!isMobile && <span style={{ fontFamily: "'Arial Black', sans-serif", color: "rgba(242,237,227,0.4)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase" }}></span>}
      </div>

      <div style={{ padding: isMobile ? "1.5rem" : "3rem" }}>
        {jobs.map((job, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ marginBottom: i < jobs.length - 1 ? "2rem" : 0, border: `3px solid ${C.ink}`, background: C.white, transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = C.green}
              onMouseOut={e => e.currentTarget.style.borderColor = C.ink}
            >
              <div style={{ background: C.ink, padding: isMobile ? "1rem 1.2rem" : "1rem 1.8rem" }}>
                <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: isMobile ? "0.78rem" : "0.95rem", color: C.bg, textTransform: "uppercase", fontWeight: 900, lineHeight: 1.3 }}>{job.role}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: "0.72rem", color: C.greenLight, marginTop: "0.3rem" }}>{job.company}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", flexWrap: "wrap", gap: "0.3rem" }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: "0.65rem", color: C.muted }}>{job.loc}</span>
                  <span style={{ border: `1px solid ${C.greenLight}`, padding: "0.2rem 0.6rem", fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{job.period}</span>
                </div>
              </div>
              <div style={{ padding: isMobile ? "1.2rem" : "1.5rem 1.8rem" }}>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ fontFamily: "Georgia,serif", color: "#444", lineHeight: 1.7, marginBottom: "0.4rem", fontSize: isMobile ? "0.82rem" : "0.9rem" }}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={200}>
          <div style={{ marginTop: "1.5rem", border: `3px solid ${C.green}`, background: C.greenPale, padding: isMobile ? "1rem 1.2rem" : "1.3rem 1.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" }}>
            <div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", color: C.ink, fontSize: isMobile ? "0.78rem" : "0.85rem", textTransform: "uppercase", fontWeight: 900 }}>B.S. Organizational Leadership</div>
              <div style={{ fontFamily: "Georgia,serif", color: C.green, fontSize: "0.72rem", marginTop: "0.2rem" }}>Arizona State University</div>
            </div>
            <div style={{ background: C.green, padding: "0.4rem 1rem" }}>
              <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>In Progress</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const { isMobile, isTablet } = useBreakpoint();

  // ── UPDATED: no AI mentions, impact statements added
  const projects = [
    {
      num: "01",
      name: "Command Center Dashboard",
      impact: "Built a full personal ops dashboard from a phone",
      desc: "Full-stack personal operations dashboard. React + Node.js + Vite. Deployed via GitHub Actions CI/CD directly from an Android device. Includes Job Tracker, Housing Tracker, Move Budget, Milestone Tracker, and automated deployment notifications.",
      tech: ["React", "Node.js", "Vite", "GitHub Actions"],
      url: "github.com/josephsmithvapes/Command-center",
    },
    {
      num: "02",
      name: "PNW Relocation Report",
      impact: "Data-driven decision making before making the move",
      desc: "10-city relocation analysis comparing LA vs. Pacific Northwest markets across cost of living, job availability, housing, and lifestyle. Built as an interactive presentation with supporting data exports.",
      tech: ["Data Analysis", "Research", "Visualization"],
    },
    {
      num: "03",
      name: "Market Intelligence Pipeline",
      impact: "Automated research pipeline running 24/7",
      desc: "Always-on data pipeline ingesting news feeds, government data, and market signals on a scheduled basis. Includes a master run script, validation framework, and safety gate before any action is taken.",
      tech: ["Python", "Automation", "Data Feeds", "Scheduling"],
    },
    {
      num: "04",
      name: "LinkedIn Content System",
      impact: "Consistent professional presence without the grind",
      desc: "Content generation tool with 6 post formats, 4 tone modes, and a built-in preview simulator. Includes a persistent post library and one-click copy to clipboard. Built to keep a professional presence active while focused on the job search.",
      tech: ["React", "Content Strategy", "UI/UX"],
    },
  ];
0
  return (
    <section id="projects" style={{ background: C.ink, borderTop: `5px solid ${C.green}` }}>
      {/* ── UPDATED: section header with subtitle */}
      <div style={{ background: C.green, padding: isMobile ? "1.2rem 1.5rem" : "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: isMobile ? "1.3rem" : "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: C.bg, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>Projects</h2>
          <p style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.6)", fontSize: "0.65rem", marginTop: "0.2rem", fontStyle: "italic" }}>Built, Not Just Managed</p>
        </div>
        {!isMobile && <span style={{ fontFamily: "'Arial Black', sans-serif", color: "rgba(242,237,227,0.4)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>  03</span>}
      </div>

      <div style={{ padding: isMobile ? "1.5rem" : "3rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1fr", gap: "1.2rem" }}>
        {projects.map((p, i) => (
          <Reveal key={i} delay={i * 70}>
            <div style={{ border: "2px solid rgba(242,237,227,0.12)", background: "rgba(242,237,227,0.03)", padding: isMobile ? "1.3rem" : "1.8rem", display: "flex", flexDirection: "column", transition: "all 0.25s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = C.greenLight; e.currentTarget.style.background = "rgba(45,90,39,0.15)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(242,237,227,0.12)"; e.currentTarget.style.background = "rgba(242,237,227,0.03)"; }}
            >
              <div style={{ fontFamily: "'Arial Black', sans-serif", color: C.green, fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>{p.num}</div>
              <h3 style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: isMobile ? "0.85rem" : "0.95rem", textTransform: "uppercase", margin: "0 0 0.3rem", fontWeight: 900 }}>{p.name}</h3>
              {/* ── NEW: impact statement */}
              <p style={{ fontFamily: "Georgia,serif", color: C.greenLight, fontSize: "0.78rem", fontStyle: "italic", margin: "0 0 0.7rem", lineHeight: 1.4 }}>{p.impact}</p>
              <p style={{ fontFamily: "Georgia,serif", color: "#8a8580", lineHeight: 1.7, fontSize: isMobile ? "0.78rem" : "0.82rem", flex: 1 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.greenLight, border: "1px solid rgba(61,122,53,0.4)", padding: "0.2rem 0.5rem" }}>{t}</span>
                ))}
              </div>
              {p.url && <div style={{ marginTop: "0.7rem", fontFamily: "Georgia,serif", color: C.greenLight, fontSize: "0.68rem" }}>→ {p.url}</div>}
            </div>
          </Reveal>
        ))}
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
  const { isMobile } = useBreakpoint();
  return (
    <section id="contact" style={{ background: C.ink, borderTop: `5px solid ${C.green}`, position: "relative", overflow: "hidden" }}>
      <div style={{ opacity: 0.06 }}>
        <MtnRange height={isMobile ? "70px" : "120px"} style={{ filter: "invert(1)" }} />
      </div>

      <div style={{ padding: isMobile ? "1rem 1.5rem 3rem" : "0rem 3rem 4rem", position: "relative", marginTop: isMobile ? "-35px" : "-60px", textAlign: isMobile ? "center" : "left" }}>
        <Reveal>
          <div style={{ background: C.green, padding: "0.8rem 1.2rem", display: "inline-block", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase" }}> Contact</span>
          </div>

          {/* ── UPDATED: contact headline */}
          <h2 style={{
            fontFamily: "'Arial Black', sans-serif",
            fontSize: isMobile ? "clamp(2.5rem,16vw,4rem)" : "clamp(2.5rem,7vw,6rem)",
            fontWeight: 900, color: C.bg, textTransform: "uppercase",
            lineHeight: 0.9, margin: "0 0 1.5rem",
          }}>
            LET'S<br />
            <span style={{ WebkitTextStroke: `3px ${C.greenLight}`, color: "transparent" }}>TALK</span><br />
            <span style={{ color: C.greenLight }}> </span>
             <div style={{ fontFamily: "Georgia,serif", fontSize: "0.82rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.bg, marginBottom: "0.1rem",  }}>
              "We'll find a way... or make one."
            </div>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          {/* ── UPDATED: contact body copy, centered */}
          <p style={{ fontFamily: "Georgia,serif", color: "#7a7570", fontSize: isMobile ? "0.88rem" : "1rem", lineHeight: 1.75, maxWidth: "520px",textAlign: "center", margin: "0 auto 2rem" }}>
            I've served 100,xxx's in the last 20+ years in Southern California. If you're looking for an experienced people leader & dedicated business operator, send me an email! 
          </p>
        </Reveal>

        <Reveal delay={180}>
          {/* ── UPDATED: buttons centered */}
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "center" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/moleculardeveloper" },
            
              { label: "Email", href: "mailto: verifiedbysky@gmail.com" },
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
              onMouseOver={e => { e.target.style.background = C.green; e.target.style.borderColor = C.green; }}
              onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.borderColor = C.bg; }}
              >{link.label} →</a>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ background: C.green, padding: isMobile ? "0.8rem 1.5rem" : "1rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'Arial Black', sans-serif", color: C.bg, fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>© 2026 Sky Madsen</span>
        {!isMobile && (
          <span style={{ fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.4)", fontSize: "0.52rem", letterSpacing: "0.08em" }}>
            Seattle · Tacoma · Olympia · Bend
          </span>
        )}
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
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f2ede3; }
        ::-webkit-scrollbar-thumb { background: #2d5a27; }
        a { cursor: pointer; }
        ul { list-style: disc; }
        img { max-width: 100%; }
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
