path = '/data/data/com.termux/files/home/folio/src/App.jsx'
with open(path, 'r') as f:
    c = f.read()

fixes = 0

# 1. Remove Impact from font stacks everywhere
c, n = c.replace("'Arial Black', Impact, sans-serif", "'Arial Black', sans-serif"), c.count("'Arial Black', Impact, sans-serif")
fixes += n
c, n = c.replace("'Arial Black',Impact,sans-serif", "'Arial Black', sans-serif"), c.count("'Arial Black',Impact,sans-serif")
fixes += n

# 2. Standardize all button/CTA font sizes to 0.6rem and letter-spacing to 0.15em
# Desktop hero CTAs: 0.6rem / 0.18em -> 0.6rem / 0.15em
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900 }}>Hire Me',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900 }}>Hire Me'
)
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900 }}>View Record',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900 }}>View Record'
)

# Mobile hero CTAs: 0.58rem -> 0.6rem
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900, textAlign: "center" }}>Hire Me',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900, textAlign: "center" }}>Hire Me'
)
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>View Record',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>View Record'
)

# Contact CTAs: 0.6rem / no consistent spacing
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif",\n                fontSize: isMobile ? "0.6rem" : "0.62rem",',
    'fontFamily: "\'Arial Black\', sans-serif",\n                fontSize: "0.6rem",'
)

# 3. Mobile nav links: 0.75rem -> 0.6rem
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "0.75rem",\n                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900,',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "0.6rem",\n                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900,'
)

# 4. Standardize badge text: 0.48rem -> 0.5rem
c = c.replace(
    'fontSize: "0.48rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>Open to Opportunities',
    'fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>Open to Opportunities'
)
c = c.replace(
    'fontSize: "0.48rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>Open to Opportunities \u00b7 PNW 2026',
    'fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.green, fontWeight: 900 }}>Open to Opportunities \u00b7 PNW 2026'
)

# 5. Small metadata labels: Georgia uppercase -> Arial Black
# Section number labels
c = c.replace(
    'fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: isMobile ? "0.3rem" : "1.5rem"',
    'fontFamily: "\'Arial Black\', sans-serif", color: C.muted, fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: isMobile ? "0.3rem" : "1.5rem"'
)
# Hero trajectory label desktop
c = c.replace(
    'fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.8rem"',
    'fontFamily: "\'Arial Black\', sans-serif", color: C.muted, fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem"'
)
# Section 02/03 labels
c = c.replace(
    'fontFamily: "Georgia,serif", color: "rgba(242,237,227,0.4)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase"',
    'fontFamily: "\'Arial Black\', sans-serif", color: "rgba(242,237,227,0.4)", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase"'
)
# Section 04 label
c = c.replace(
    'fontFamily: "Georgia,serif", color: C.muted, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase"',
    'fontFamily: "\'Arial Black\', sans-serif", color: C.muted, fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase"'
)

# 6. Stat numbers: 1.5rem -> 1.4rem (mobile was 1.5)
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "1.5rem", fontWeight: 900, color: C.ink, lineHeight: 1',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: C.ink, lineHeight: 1'
)

# 7. Tech tags: 0.48rem -> 0.5rem
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", fontSize: "0.48rem", letterSpacing: "0.1em"',
    'fontFamily: "\'Arial Black\', sans-serif", fontSize: "0.5rem", letterSpacing: "0.1em"'
)

# 8. Nav SM logo - add explicit fontFamily
c = c.replace(
    '<span style={{ color: C.bg, fontSize: "0.65rem", fontWeight: 900 }}>SM</span>',
    '<span style={{ fontFamily: "\'Arial Black\', sans-serif", color: C.bg, fontSize: "0.65rem", fontWeight: 900 }}>SM</span>'
)
# Nav Sky Madsen text
c = c.replace(
    '{scrolled && !isMobile && <span style={{ color: C.ink, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Sky Madsen</span>}',
    '{scrolled && !isMobile && <span style={{ fontFamily: "\'Arial Black\', sans-serif", color: C.ink, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900 }}>Sky Madsen</span>}'
)

# 9. Desktop nav links - ensure consistent
c = c.replace(
    'color: C.ink, textDecoration: "none", fontSize: "0.6rem",\n                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 900,',
    'fontFamily: "\'Arial Black\', sans-serif", color: C.ink, textDecoration: "none", fontSize: "0.6rem",\n                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 900,'
)

# 10. In Progress badge
c = c.replace(
    'fontFamily: "\'Arial Black\',sans-serif", color: C.bg, fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase"',
    'fontFamily: "\'Arial Black\', sans-serif", color: C.bg, fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase"'
)

# Clean up any remaining 'Arial Black',sans-serif -> 'Arial Black', sans-serif
c = c.replace("'Arial Black',sans-serif", "'Arial Black', sans-serif")

with open(path, 'w') as f:
    f.write(c)

print("Done -", len(c.splitlines()), "lines")
print("Remaining 'Impact':", c.count("Impact"))
print("Remaining ',sans-serif' (no space):", c.count("'Arial Black',sans-serif"))
