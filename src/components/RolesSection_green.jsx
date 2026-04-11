import { useState } from "react";

const A = "#2d5a27";
const AMBER = "#e8a96a";  // shared skill highlight on green bg
const BG = "#f2ede3";
const TEXT = "#1a1a1a";

const ROLES = [
  {
    id: "gm",
    annotation: "ROLE.001",
    title: "General Manager",
    skills: ["P&L ownership", "team development", "culture-building"]
  },
  {
    id: "dm",
    annotation: "ROLE.005",
    title: "District Manager",
    skills: ["multi-unit ops", "P&L ownership", "team development"]
  },
  {
    id: "ops",
    annotation: "ROLE.003",
    title: "Operations Manager",
    skills: ["SOP development", "cross-functional comms", "labor optimization"]
  },
  {
    id: "pm",
    annotation: "ROLE.004",
    title: "Project Manager",
    skills: ["stakeholder alignment", "cross-functional comms", "timeline accountability"]
  },
  {
    id: "ecom",
    annotation: "ROLE.002",
    title: "E-Commerce Manager",
    skills: ["CX optimization", "analytics", "inventory management"]
  },
  {
    id: "tech",
    annotation: "ROLE.006",
    title: "Tech & Admin Roles",
    skills: ["React + Vite", "Anthropic API", "product thinking"]
  }
];

// Pairs: [frontIndex, backIndex] by id
const PAIRS = [
  ["gm", "dm"],   // leadership track
  ["ops", "pm"],  // systems / process track
  ["ecom", "tech"] // digital track
];

// compute overlapping skills across all 6 roles
const skillCount = {};
ROLES.forEach(r => r.skills.forEach(s => { skillCount[s] = (skillCount[s] || 0) + 1; }));
const sharedSkills = new Set(Object.keys(skillCount).filter(s => skillCount[s] > 1));

function RoleCard({ role }) {
  return (
    <div style={{ padding: "28px 24px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <div style={{ minHeight: 68 }}>
        <div style={{ color: "rgba(242,237,227,0.35)", fontFamily: "monospace", fontSize: 8, letterSpacing: 3, marginBottom: 10 }}>
          {role.annotation}
        </div>
        <div style={{ color: BG, fontSize: 15, fontWeight: 900, fontFamily: "Arial Black, Arial, sans-serif", letterSpacing: 0.3, lineHeight: 1.2, marginBottom: 14 }}>
          {role.title}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {role.skills.map(skill => {
            const shared = sharedSkills.has(skill);
            return (
              <span key={skill} style={{
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: 0.8,
                color: shared ? AMBER : "rgba(242,237,227,0.75)",
                border: `1px solid ${shared ? "rgba(232,169,106,0.45)" : "rgba(242,237,227,0.2)"}`,
                padding: "3px 7px",
              }}>
                {skill}
              </span>
            );
          })}
        </div>
    </div>
  );
}

export default function RolesSection() {
  const [hovered, setHovered] = useState([false, false, false]);

  const set = (i, val) => setHovered(h => h.map((v, idx) => idx === i ? val : v));

  const roleMap = Object.fromEntries(ROLES.map(r => [r.id, r]));

  return (
    <div id="roles" style={{
      background: BG,
      backgroundImage: "linear-gradient(rgba(45,90,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.06) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      fontFamily: "Arial Black, Arial, sans-serif",
      padding: "64px 24px 80px",
    }}>

      {/* Section header */}
      <div style={{ maxWidth: 900, margin: "0 auto 52px" }}>
        <h2 style={{ color: TEXT, fontSize: "clamp(28px, 5vw, 48px)", margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>
          ROLES I'M
        </h2>
        <h2 style={{ color: A, fontSize: "clamp(28px, 5vw, 48px)", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          TARGETING
        </h2>
        <div style={{ width: 48, height: 2, background: A, opacity: 0.4, marginBottom: 16 }}/>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{
              fontFamily: "monospace", fontSize: 9, letterSpacing: 0.8,
              color: "rgba(242,237,227,0.75)", border: "1px solid rgba(242,237,227,0.2)",
              padding: "2px 7px", background: A
            }}>skill</span>
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 11, color: "rgba(26,26,26,0.45)" }}>
              role-specific
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{
              fontFamily: "monospace", fontSize: 9, letterSpacing: 0.8,
              color: AMBER, border: "1px solid rgba(232,169,106,0.45)",
              padding: "2px 7px", background: A
            }}>skill</span>
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 11, color: "rgba(26,26,26,0.45)" }}>
              transfers across roles
            </span>
          </div>
        </div>
      </div>

      {/* 3-card flip grid */}
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16
      }}>
        {PAIRS.map(([frontId, backId], i) => (
          <div
            key={i}
            style={{ height: 240, perspective: "1000px", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
            onMouseEnter={() => set(i, true)}
            onMouseLeave={() => set(i, false)}
          >
            <div style={{
              position: "relative", width: "100%", height: "100%",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
              transform: hovered[i] ? "rotateY(180deg)" : "rotateY(0deg)",
            }}>

              {/* Front */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                background: A,
              }}>
                <RoleCard role={roleMap[frontId]} />
              </div>

              {/* Back */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: A,
              }}>
                <RoleCard role={roleMap[backId]} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
