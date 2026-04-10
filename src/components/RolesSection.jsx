import { useState } from "react";

const A = "#2d5a27";
const BG = "#f2ede3";
const TEXT = "#1a1a1a";

const ROLES = [
  {
    id: "gm",
    annotation: "ROLE.001",
    title: "General Manager",
    tagline: "Full ownership. New environment.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="14" width="20" height="16" rx="2" stroke={A} strokeWidth="1.5" fill="none"/>
        <path d="M14 14 L14 11 Q14 8 20 8 Q26 8 26 11 L26 14" stroke={A} strokeWidth="1.5" fill="none"/>
        <line x1="10" y1="21" x2="30" y2="21" stroke={A} strokeWidth="1" opacity="0.4"/>
        <circle cx="20" cy="21" r="2.5" fill={A}/>
        <line x1="20" y1="23.5" x2="20" y2="27" stroke={A} strokeWidth="1.5"/>
      </svg>
    ),
    why: "Ready to take full-site ownership to a new brand. Hotel GM is the primary target — operations, revenue, culture, and guest experience are the same core job I've been doing, in a new context I'm genuinely excited about.",
    brings: "High-volume ops experience, team development depth, P&L accountability, strong data habits, culture-building from scratch.",
    targets: "Marriott, Hilton, IHG, Hyatt properties in Pacific Northwest. Boutique hotel groups in Bend OR, Vancouver WA, Seattle WA, Tacoma WA."
  },
  {
    id: "ops",
    annotation: "ROLE.003",
    title: "Operations Manager",
    tagline: "Systems at org scale.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="8" width="10" height="10" rx="1" stroke={A} strokeWidth="1.5" fill="none"/>
        <rect x="22" y="8" width="10" height="10" rx="1" stroke={A} strokeWidth="1.5" fill="none"/>
        <rect x="8" y="22" width="10" height="10" rx="1" stroke={A} strokeWidth="1.5" fill="none"/>
        <rect x="22" y="22" width="10" height="10" rx="1" stroke={A} strokeWidth="1.5" fill="none"/>
        <line x1="18" y1="13" x2="22" y2="13" stroke={A} strokeWidth="1" opacity="0.5"/>
        <line x1="18" y1="27" x2="22" y2="27" stroke={A} strokeWidth="1" opacity="0.5"/>
        <line x1="13" y1="18" x2="13" y2="22" stroke={A} strokeWidth="1" opacity="0.5"/>
        <line x1="27" y1="18" x2="27" y2="22" stroke={A} strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    why: "Corporate-side ops is a natural pivot from the floor. I've been building SOPs, optimizing labor, and driving consistency from inside a store. This is doing that at scale — for a whole organization instead of one location.",
    brings: "SOP development, labor optimization, cross-functional communication, process documentation, change management at the team level.",
    targets: "Tech companies, logistics firms, healthcare systems, retail chains. PNW employers: REI, Costco HQ, Amazon Ops, Boeing supply chain, healthcare networks."
  },
  {
    id: "pm",
    annotation: "ROLE.004",
    title: "Project Manager",
    tagline: "Been doing the job without the title.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="10" width="24" height="22" rx="2" stroke={A} strokeWidth="1.5" fill="none"/>
        <line x1="8" y1="16" x2="32" y2="16" stroke={A} strokeWidth="1" opacity="0.4"/>
        <line x1="14" y1="8" x2="14" y2="14" stroke={A} strokeWidth="1.5"/>
        <line x1="26" y1="8" x2="26" y2="14" stroke={A} strokeWidth="1.5"/>
        <line x1="13" y1="22" x2="22" y2="22" stroke={A} strokeWidth="1.5"/>
        <line x1="13" y1="26" x2="19" y2="26" stroke={A} strokeWidth="1" opacity="0.5"/>
        <polyline points="23,24 26,27 31,21" stroke={A} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    why: "I've been PM-ing without the title for years — store builds, equipment installs, menu rollouts, team restructures. The framework maps directly to how I already think and work. The certification is next.",
    brings: "Scope management, stakeholder alignment, timeline accountability, risk identification, documentation habits, cross-functional coordination.",
    targets: "Construction, tech product teams, healthcare, retail expansion, ops-adjacent PM roles. Any org that values operators who can run a project end-to-end."
  },
  {
    id: "dm",
    annotation: "ROLE.005",
    title: "District Manager",
    tagline: "Multi-unit. One standard.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke={A} strokeWidth="1.5" fill="none" opacity="0.6"/>
        {[{x:20,y:8},{x:30,y:26},{x:10,y:26}].map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" stroke={A} strokeWidth="1.5" fill="none"/>
            <line x1={p.x} y1={p.y} x2="20" y2="20" stroke={A} strokeWidth="1" opacity="0.4"/>
          </g>
        ))}
        <circle cx="20" cy="20" r="2.5" fill={A}/>
      </svg>
    ),
    why: "Natural next step from GM. I've already been running one location like a district — systems that replicate, managers I develop, data I read across multiple revenue streams. I'm ready to do that across five locations instead of one.",
    brings: "Multi-unit operational thinking, P&L ownership at scale, GM coaching frameworks, culture replication systems, high-volume drive-thru expertise.",
    targets: "Starbucks, Dutch Bros, Chick-fil-A, Target, Costco, hotel management groups, QSR operators in the Pacific Northwest."
  },
  {
    id: "tech",
    annotation: "ROLE.006",
    title: "Tech & Admin Roles",
    tagline: "Ops brain. Builder instincts.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="12" width="24" height="16" rx="2" stroke={A} strokeWidth="1.5" fill="none"/>
        <line x1="20" y1="28" x2="20" y2="32" stroke={A} strokeWidth="1.5"/>
        <line x1="14" y1="32" x2="26" y2="32" stroke={A} strokeWidth="1.5"/>
        <text x="12" y="23" fontFamily="monospace" fontSize="7" fill={A} opacity="0.7">{"</>"}</text>
        <circle cx="28" cy="16" r="3" stroke={A} strokeWidth="1" fill="none"/>
        <line x1="30.1" y1="18.1" x2="33" y2="21" stroke={A} strokeWidth="1.5"/>
      </svg>
    ),
    why: "Proven builder. Shipped two production React apps on an Android phone. The ops-to-tech crossover is real — I understand the business problem and can build the tool to solve it. Looking for roles where both sides of that are valued.",
    brings: "React + Vite, Node.js Express, Anthropic API integration, GitHub Actions CI/CD, Python scripting, system administration, practical product thinking.",
    targets: "Technical Program Manager, Internal Tools, Ops-Tech startups, SaaS companies with ops-heavy workflows, admin and systems roles in the Pacific Northwest tech corridor."
  }
];

const Corner = ({ pos }) => {
  const p = { tl:{top:7,left:7}, tr:{top:7,right:7}, bl:{bottom:7,left:7}, br:{bottom:7,right:7} };
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

export default function RolesSection() {
  const [flipped, setFlipped] = useState({});

  const toggle = (id) => setFlipped(f => ({ ...f, [id]: !f[id] }));

  return (
    <div id="roles" style={{
      background: BG,
      backgroundImage: "linear-gradient(rgba(45,90,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.06) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      fontFamily: "Arial Black, Arial, sans-serif",
      padding: "64px 24px 80px",
      position: "relative"
    }}>

      {/* Section header */}
      <div style={{ maxWidth: 900, margin: "0 auto 52px" }}>
        <h2 style={{ color: TEXT, fontSize: "clamp(28px, 5vw, 48px)", margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>
          ROLES I'M
        </h2>
        <h2 style={{ color: A, fontSize: "clamp(28px, 5vw, 48px)", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          TARGETING
        </h2>
        <div style={{ width: 48, height: 2, background: A, opacity: 0.4, marginBottom: 12 }}/>
        <div style={{ color: "rgba(26,26,26,0.45)", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13 }}>
          Tap any card to see why it fits.
        </div>
      </div>

      {/* Card grid */}
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20
      }}>
        {ROLES.map(role => {
          const isFlipped = !!flipped[role.id];
          return (
            <div key={role.id}
              onClick={() => toggle(role.id)}
              style={{
                height: 320,
                perspective: "1000px",
                cursor: "pointer"
              }}
            >
              <div style={{
                position: "relative",
                width: "100%", height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}>

                {/* ── FRONT ── */}
                <div style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  background: BG,
                  border: `1px solid rgba(45,90,39,0.18)`,
                  borderRadius: 4,
                  padding: "28px 22px 22px",
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <Corner pos="tl"/><Corner pos="tr"/><Corner pos="bl"/><Corner pos="br"/>

                  <div>
                    <div style={{ color: A, fontFamily: "monospace", fontSize: 9, letterSpacing: 3, opacity: 0.4, marginBottom: 20 }}>
                      {role.annotation}
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      {role.icon}
                    </div>
                    <div style={{ color: TEXT, fontSize: 17, letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 8 }}>
                      {role.title}
                    </div>
                    <div style={{ color: "rgba(26,26,26,0.5)", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 12, lineHeight: 1.5 }}>
                      {role.tagline}
                    </div>
                  </div>

                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    borderTop: `1px solid rgba(45,90,39,0.1)`, paddingTop: 14
                  }}>
                    <div style={{ color: A, fontFamily: "monospace", fontSize: 9, opacity: 0.35, letterSpacing: 2 }}>
                      3 SECTIONS
                    </div>
                    <div style={{ color: A, fontFamily: "monospace", fontSize: 10, opacity: 0.5, letterSpacing: 2 }}>
                      FLIP →
                    </div>
                  </div>
                </div>

                {/* ── BACK ── */}
                <div style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: A,
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  borderRadius: 4,
                  padding: "20px 20px 16px",
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden"
                }}>
                  {/* Back corners in cream */}
                  {["tl","tr","bl","br"].map(pos => {
                    const p = { tl:{top:7,left:7}, tr:{top:7,right:7}, bl:{bottom:7,left:7}, br:{bottom:7,right:7} };
                    const lines = {
                      tl: <><line x1="0" y1="8" x2="8" y2="8"/><line x1="8" y1="0" x2="8" y2="8"/></>,
                      tr: <><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="0" x2="8" y2="8"/></>,
                      bl: <><line x1="0" y1="8" x2="8" y2="8"/><line x1="8" y1="8" x2="8" y2="16"/></>,
                      br: <><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="8" x2="8" y2="16"/></>
                    };
                    return (
                      <svg key={pos} style={{ position:"absolute", width:16, height:16, ...p[pos] }}
                        viewBox="0 0 16 16" fill="none" stroke={BG} strokeWidth="1.5" opacity="0.25">
                        {lines[pos]}
                      </svg>
                    );
                  })}

                  <div style={{ color: "rgba(242,237,227,0.4)", fontFamily: "monospace", fontSize: 9, letterSpacing: 3 }}>
                    {role.annotation} / {role.title.toUpperCase()}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, padding: "12px 0 8px" }}>

                    <div>
                      <div style={{ color: "rgba(242,237,227,0.45)", fontFamily: "monospace", fontSize: 8, letterSpacing: 3, marginBottom: 5 }}>
                        WHY IT FITS
                      </div>
                      <div style={{ color: BG, fontFamily: "Georgia, serif", fontSize: 11, lineHeight: 1.55, opacity: 0.9 }}>
                        {role.why}
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(242,237,227,0.1)", paddingTop: 10 }}>
                      <div style={{ color: "rgba(242,237,227,0.45)", fontFamily: "monospace", fontSize: 8, letterSpacing: 3, marginBottom: 5 }}>
                        WHAT I BRING
                      </div>
                      <div style={{ color: BG, fontFamily: "Georgia, serif", fontSize: 11, lineHeight: 1.55, opacity: 0.9 }}>
                        {role.brings}
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(242,237,227,0.1)", paddingTop: 10 }}>
                      <div style={{ color: "rgba(242,237,227,0.45)", fontFamily: "monospace", fontSize: 8, letterSpacing: 3, marginBottom: 5 }}>
                        TARGET COMPANIES
                      </div>
                      <div style={{ color: BG, fontFamily: "Georgia, serif", fontSize: 11, lineHeight: 1.55, opacity: 0.9 }}>
                        {role.targets}
                      </div>
                    </div>

                  </div>

                  <div style={{
                    borderTop: "1px solid rgba(242,237,227,0.1)", paddingTop: 10,
                    display: "flex", justifyContent: "flex-end"
                  }}>
                    <div style={{ color: "rgba(242,237,227,0.35)", fontFamily: "monospace", fontSize: 9, letterSpacing: 2 }}>
                      ← FLIP BACK
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
