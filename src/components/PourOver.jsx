import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#f2ede3",
  ink: "#1a1a1a",
  green: "#2d5a27",
  greenLight: "#3d7a35",
  greenPale: "#e8efe6",
  muted: "#9a9080",
  subtle: "#d4cfc4",
};

// All animations injected once into document head
const STYLES = `
@keyframes po_beanL{0%,100%{transform:rotate(-15deg)}50%{transform:rotate(-5deg)}}
@keyframes po_beanR{0%,100%{transform:rotate(15deg)}50%{transform:rotate(5deg)}}
@keyframes po_spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes po_fall{0%{transform:translateY(0);opacity:1}100%{transform:translateY(8px);opacity:0}}
@keyframes po_steam{0%{transform:translateY(0);opacity:0.9}100%{transform:translateY(-12px);opacity:0}}
@keyframes po_drip{0%{transform:translateY(0);opacity:1}100%{transform:translateY(9px);opacity:0}}
@keyframes po_fillfade{0%,100%{opacity:0.08}50%{opacity:0.22}}
@keyframes po_blink{0%,100%{opacity:0.4}50%{opacity:1}}
@keyframes po_settle{0%{transform:translateY(-4px)}70%{transform:translateY(1px)}100%{transform:translateY(0)}}
@keyframes po_bub{0%{transform:translateY(0) scale(1);opacity:0.9}100%{transform:translateY(-16px) scale(0.4);opacity:0}}
@keyframes po_swell{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.1)}}
@keyframes po_flow{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-20}}
@keyframes po_spulse{0%,100%{opacity:0.5}50%{opacity:1}}
@keyframes po_dfal{0%{transform:translateY(0);opacity:1}100%{transform:translateY(7px);opacity:0}}
@keyframes po_mhand{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes po_hhand{0%{transform:rotate(0deg)}100%{transform:rotate(30deg)}}
@keyframes po_sdrift{0%{transform:translateY(0);opacity:0.9}100%{transform:translateY(-14px);opacity:0}}
@keyframes po_swirl{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-28}}
`;

function injectStyles() {
  if (document.getElementById('po-styles')) return;
  const el = document.createElement('style');
  el.id = 'po-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

const a = (name, dur, delay, fn = 'ease-in-out', iter = 'infinite') =>
  `${name} ${dur} ${fn} ${iter}${delay ? ' ' + delay : ''}`;

function IconBeans({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <rect x="20" y="25" width="40" height="42" rx="2"/>
        <path d="M20 37L60 37"/>
        <path d="M28 25L28 20Q40 14 52 20L52 25"/>
        <g style={{ transformOrigin:'32px 50px', animation: on ? a('po_beanL','1.8s','','ease-in-out') : 'none' }}>
          <ellipse cx="32" cy="50" rx="6" ry="9" transform="rotate(-15 32 50)"/>
          <path d="M26.5 49Q32 43 37.5 49" strokeWidth="1.2"/>
        </g>
        <g style={{ transformOrigin:'48px 50px', animation: on ? a('po_beanR','1.8s','0.3s','ease-in-out') : 'none' }}>
          <ellipse cx="48" cy="50" rx="6" ry="9" transform="rotate(15 48 50)"/>
          <path d="M42.5 49Q48 43 53.5 49" strokeWidth="1.2"/>
        </g>
        <path d="M30 40L50 40M28 43L52 43" strokeWidth="1" opacity="0.4"/>
      </g>
    </svg>
  );
}

function IconGrinder({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <rect x="22" y="30" width="36" height="38" rx="2"/>
        <path d="M28 30L24 18L56 18L52 30"/>
        <g style={{ transformOrigin:'40px 49px', animation: on ? a('po_spin','1.2s','','linear') : 'none' }}>
          <circle cx="40" cy="49" r="8"/>
          <circle cx="40" cy="49" r="3"/>
          <path d="M40 41L40 39M48 49L50 49M40 57L40 59M32 49L30 49" strokeWidth="2"/>
        </g>
        <g style={{ animation: on ? a('po_fall','0.9s','','ease-in') : 'none' }}>
          <circle cx="36" cy="62" r="1.2" fill={C.green} stroke="none"/>
        </g>
        <g style={{ animation: on ? a('po_fall','0.9s','0.3s','ease-in') : 'none' }}>
          <circle cx="40" cy="64" r="1.5" fill={C.green} stroke="none"/>
        </g>
        <g style={{ animation: on ? a('po_fall','0.9s','0.6s','ease-in') : 'none' }}>
          <circle cx="44" cy="62" r="1.2" fill={C.green} stroke="none"/>
        </g>
        <path d="M52 20L62 14"/><circle cx="63" cy="13" r="2"/>
        <path d="M24 38L20 38M22 34L20 34M22 42L20 42" strokeWidth="1" opacity="0.6"/>
      </g>
    </svg>
  );
}

function IconKettle({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M18 55Q18 32 35 30L55 30Q65 30 65 42Q65 55 50 58Z"/>
        <path d="M35 30Q30 22 20 20Q12 18 10 26Q9 32 18 35"/>
        <path d="M55 30Q72 30 72 42Q72 54 55 58"/>
        <ellipse cx="46" cy="30" rx="12" ry="3"/>
        <rect x="43" y="25" width="6" height="5" rx="1"/>
        <g style={{ animation: on ? a('po_steam','1.4s','','ease-out') : 'none' }}>
          <path d="M36 24Q34 19 36 14" strokeDasharray="2 2"/>
        </g>
        <g style={{ animation: on ? a('po_steam','1.4s','0.45s','ease-out') : 'none' }}>
          <path d="M44 23Q46 17 44 12" strokeDasharray="2 2"/>
        </g>
        <g style={{ animation: on ? a('po_steam','1.4s','0.9s','ease-out') : 'none' }}>
          <path d="M51 25Q53 19 51 15" strokeDasharray="2 2"/>
        </g>
      </g>
    </svg>
  );
}

function IconFilter({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M18 20L30 60L50 60L62 20Z"/>
        <polygon points="18,20 30,60 50,60 62,20" fill={C.green} style={{ animation: on ? a('po_fillfade','2s','') : 'none' }}/>
        <path d="M22 24L31 56L49 56L58 24" strokeWidth="1" opacity="0.5"/>
        <path d="M35 28L32 52M40 28L40 52M45 28L48 52" strokeWidth="1" opacity="0.35"/>
        <circle cx="40" cy="63" r="3"/>
        <g style={{ animation: on ? a('po_drip','1s','','ease-in') : 'none' }}>
          <path d="M40 66L40 73" strokeDasharray="2 2" strokeWidth="1.5"/>
        </g>
        <g style={{ animation: on ? a('po_drip','1s','0.45s','ease-in') : 'none' }}>
          <path d="M37 67L37 74" strokeDasharray="1 2" strokeWidth="1" opacity="0.6"/>
        </g>
        <path d="M25 15L25 22M22 20L25 23L28 20M55 15L55 22M52 20L55 23L58 20"/>
      </g>
    </svg>
  );
}

function IconScale({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <rect x="12" y="58" width="56" height="6" rx="1"/>
        <rect x="18" y="36" width="44" height="22" rx="2"/>
        <rect x="22" y="40" width="36" height="12" rx="1"/>
        <g style={{ animation: on ? a('po_blink','1.4s','') : 'none' }}>
          <path d="M26 46L29 46M31 46L37 46M39 46L43 46M45 46L47 46" strokeWidth="2.5"/>
        </g>
        <g style={{ animation: on ? 'po_settle 0.7s ease-out forwards' : 'none' }}>
          <rect x="28" y="20" width="24" height="16" rx="1"/>
          <ellipse cx="40" cy="20" rx="10" ry="3.5"/>
          <path d="M34 16Q34 10 40 10Q46 10 46 16"/>
        </g>
        <path d="M64 46L70 46M64 42L68 42M64 50L68 50" strokeWidth="1" opacity="0.6"/>
      </g>
    </svg>
  );
}

function IconBloom({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M22 18L30 55L50 55L58 18Z" opacity="0.45"/>
        <g style={{ transformOrigin:'40px 46px', animation: on ? a('po_swell','1.6s','') : 'none' }}>
          <ellipse cx="40" cy="46" rx="10" ry="5" fill={C.green} opacity="0.18"/>
          <ellipse cx="40" cy="46" rx="10" ry="5"/>
        </g>
        {[[36,40,2.5,''],[44,38,2,'0.25s'],[40,36,3,'0.5s'],[32,38,1.8,'0.75s'],[48,40,1.5,'0.9s']].map(([cx,cy,r,delay],i) => (
          <g key={i} style={{ animation: on ? a('po_bub','1.1s',delay,'ease-out') : 'none' }}>
            <circle cx={cx} cy={cy} r={r}/>
          </g>
        ))}
        <path d="M28 63Q40 59 52 63" strokeDasharray="3 2"/>
        <path d="M50 60L52 63L49 65"/>
      </g>
    </svg>
  );
}

function IconPour({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M8 14Q8 20 16 22Q22 24 22 30"/>
        <path d="M8 14Q14 8 18 14Q22 18 22 30"/>
        <path d="M24 30L32 62L52 62L60 30Z"/>
        <g style={{ animation: on ? a('po_spulse','1s','') : 'none' }}>
          <path d="M40 38Q44 36 44 40Q44 44 40 44Q36 44 36 40Q36 36 40 38" strokeWidth="1.5"/>
          <path d="M40 34Q48 32 49 40Q49 48 40 48Q31 48 31 40Q31 32 40 34" strokeWidth="1" opacity="0.5"/>
        </g>
        <path d="M22 30Q27 33 31 38" strokeWidth="2.2" strokeDasharray="4 3" style={{ animation: on ? a('po_flow','0.5s','','linear') : 'none' }}/>
        <g style={{ animation: on ? a('po_dfal','0.8s','','ease-in') : 'none' }}>
          <path d="M42 65L42 71" strokeWidth="1.5"/>
        </g>
        <g style={{ animation: on ? a('po_dfal','0.8s','0.4s','ease-in') : 'none' }}>
          <path d="M38 66L38 72" strokeWidth="1" opacity="0.6"/>
        </g>
      </g>
    </svg>
  );
}

function IconWait({ on }) {
  const ticks = [0,30,60,90,120,150,180,210,240,270,300,330];
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <circle cx="40" cy="38" r="22"/>
        <circle cx="40" cy="38" r="2" fill={C.green}/>
        {ticks.map((angle, i) => {
          const r1 = i % 3 === 0 ? 17 : 20;
          const rad = (angle - 90) * Math.PI / 180;
          return <line key={i} x1={40+r1*Math.cos(rad)} y1={38+r1*Math.sin(rad)} x2={40+22*Math.cos(rad)} y2={38+22*Math.sin(rad)} strokeWidth={i%3===0?1.8:0.8}/>;
        })}
        <g style={{ transformOrigin:'40px 38px', animation: on ? a('po_mhand','6s','','linear') : 'none' }}>
          <path d="M40 38L40 20" strokeWidth="2.2"/>
        </g>
        <g style={{ transformOrigin:'40px 38px', animation: on ? a('po_hhand','72s','','linear') : 'none' }}>
          <path d="M40 38L54 38" strokeWidth="1.6"/>
        </g>
        <path d="M30 68L34 76L46 76L50 68Z" opacity="0.5"/>
      </g>
    </svg>
  );
}

function IconCup({ on }) {
  return (
    <svg viewBox="0 0 80 80" width="60" height="60">
      <g stroke={C.green} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M16 28L22 68L58 68L64 28Z"/>
        <path d="M58 38Q72 38 72 48Q72 58 58 58"/>
        <ellipse cx="40" cy="35" rx="18" ry="4" fill={C.green} opacity="0.15"/>
        <ellipse cx="40" cy="35" rx="18" ry="4"/>
        <path d="M26 35Q33 30 40 35Q47 40 54 35" strokeWidth="1.3" opacity="0.7" strokeDasharray="8 4" style={{ animation: on ? a('po_swirl','2s','','linear') : 'none' }}/>
        {[['','M30 26Q28 20 30 12'],['0.5s','M40 24Q38 17 40 9'],['0.9s','M50 26Q52 19 50 12']].map(([delay, d], i) => (
          <g key={i} style={{ animation: on ? a('po_sdrift','1.5s',delay,'ease-out') : 'none' }}>
            <path d={d} strokeDasharray="2 2"/>
          </g>
        ))}
        <ellipse cx="40" cy="68" rx="26" ry="4"/>
      </g>
    </svg>
  );
}

const STEPS = [
  { id:"01", title:"Select Beans", short:"Single origin · Light-medium", icon:IconBeans,
    spec:"25g · Light-medium roast · 2–4 weeks post-roast",
    detail:"Start with 25g of freshly roasted single-origin beans. Light to medium roast gives you the cleanest expression of origin — fruity, floral, or tea-like notes that heavy roasts bury. Roasted within 2–4 weeks is the sweet spot. Older beans have lost their CO₂ and simply won't bloom." },
  { id:"02", title:"Grind Fresh", short:"Medium-coarse · Right before", icon:IconGrinder,
    spec:"Medium-coarse · Burr grinder · Grind to order only",
    detail:"Grind immediately before you brew. Ground coffee goes stale within minutes. Use a burr grinder set to medium-coarse — roughly the texture of coarse sea salt. Too fine: over-extracted, bitter. Too coarse: under-extracted, sour and thin. Change one variable at a time when dialing in." },
  { id:"03", title:"Heat Water", short:"200–205°F · Gooseneck", icon:IconKettle,
    spec:"200–205°F / 93–96°C · Gooseneck kettle · Filtered water",
    detail:"Boiling water at 212°F scorches the grounds. Pull off heat 30–45 seconds early, or target 200–205°F. A gooseneck kettle gives you the precision and flow control that makes or breaks a pour over. It is the most important tool in this process." },
  { id:"04", title:"Rinse Filter", short:"Remove paper taste · Preheat", icon:IconFilter,
    spec:"Full hot water rinse · Preheat dripper and vessel · Discard rinse",
    detail:"Set your paper filter in the dripper over your cup or carafe. Pour hot water through it completely — this removes the papery taste and preheats everything so your brew stays at temperature. Discard the rinse water before adding your grounds." },
  { id:"05", title:"Dose & Set", short:"25g · 1:16 ratio by weight", icon:IconScale,
    spec:"25g coffee · 400ml water · 1:16 ratio · Use a scale",
    detail:"Add your ground coffee to the rinsed filter. Use a scale. A 1:16 ratio (25g coffee to 400ml water) produces a clean, balanced cup. Adjust to 1:15 for stronger, 1:17 for lighter. The scale removes guesswork entirely." },
  { id:"06", title:"Bloom", short:"50ml · 45 seconds · Watch it swell", icon:IconBloom,
    spec:"50ml water · 30–45 second wait · Observe CO₂ release",
    detail:"This is the step most people skip and it is the most important. Pour just 50ml of water to saturate the grounds, then wait 30–45 seconds. Fresh coffee releases CO₂ when it contacts hot water. If you skip the bloom, bubbles disrupt your pour and cause uneven extraction. Watch the grounds swell." },
  { id:"07", title:"First Pour", short:"Spiral out to 200ml by 1:00", icon:IconPour,
    spec:"200ml total · Tight spiral center-out · Complete by 1:00",
    detail:"Begin pouring slowly in a tight spiral from center outward. Reach 200ml by 1:00. Keep your kettle 3–4 inches above the grounds. Slow, controlled pours extract evenly. Rushing creates channels where water bypasses grounds completely." },
  { id:"08", title:"Second Pour", short:"To 300ml · Maintain the level", icon:IconWait,
    spec:"300ml total · Begin at 1:15 · Finish by 1:45",
    detail:"When the water level drops near the coffee bed around 1:15, begin your second pour. Bring total water to 300ml by 1:45. Same spiral technique. Consistent water level above the bed keeps extraction even and prevents the bed from drying out." },
  { id:"09", title:"Serve", short:"To 400ml · Finish by 3:30 · Drink fresh", icon:IconCup,
    spec:"400ml total · Draw-down complete by 3:00–3:30 · Drink within 10 min",
    detail:"Final pour to 400ml, finished by 2:15. Total draw-down should complete by 3:00–3:30. If it finishes faster, grind finer. Slower, go coarser. A flat, even bed at the end means you extracted uniformly. Pour immediately and drink within 10 minutes." },
];

function Card({ step, isActive, onClick, isMobile }) {
  const Icon = step.icon;
  return (
    <div
      data-card="true"
      onClick={onClick}
      style={{
        flexShrink:0, width: isMobile ? "132px" : "150px",
        cursor:"pointer", display:"flex", flexDirection:"column",
        alignItems:"center", gap:"0.55rem",
        padding: isMobile ? "1rem 0.7rem 0.8rem" : "1.3rem 0.9rem 1rem",
        border:`2px solid ${isActive ? C.green : C.subtle}`,
        background: isActive ? C.greenPale : C.bg,
        transition:"all 0.2s", position:"relative",
        boxShadow: isActive ? "0 4px 16px rgba(45,90,39,0.15)" : "none",
      }}
    >
      <div style={{ position:"absolute", top:"0.45rem", left:"0.55rem", fontFamily:"'Arial Black',sans-serif", fontSize:"0.46rem", letterSpacing:"0.15em", color: isActive ? C.green : C.muted, fontWeight:900 }}>{step.id}</div>
      <div style={{ position:"absolute", top:4, right:4, width:9, height:9, borderTop:`1.5px solid ${isActive?C.green:C.subtle}`, borderRight:`1.5px solid ${isActive?C.green:C.subtle}` }}/>
      <div style={{ position:"absolute", bottom:4, left:4, width:9, height:9, borderBottom:`1.5px solid ${isActive?C.green:C.subtle}`, borderLeft:`1.5px solid ${isActive?C.green:C.subtle}` }}/>
      <Icon on={isActive}/>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"'Arial Black',sans-serif", fontSize:"0.56rem", letterSpacing:"0.1em", textTransform:"uppercase", color: isActive ? C.green : C.ink, fontWeight:900, lineHeight:1.3, marginBottom:"0.22rem" }}>{step.title}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.54rem", color:C.muted, lineHeight:1.4 }}>{step.short}</div>
      </div>
      {isActive && <div style={{ position:"absolute", bottom:-7, left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderTop:`7px solid ${C.green}` }}/>}
    </div>
  );
}

function DetailPanel({ step, stepIndex, total, onClose, onPrev, onNext, isMobile }) {
  if (!step) return null;
  return (
    <div style={{ borderTop:`3px solid ${C.green}`, background:"#fdfaf5", padding: isMobile ? "1.5rem 1.5rem 2rem" : "2rem 3rem 2.5rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
        <div>
          <div style={{ fontFamily:"'Arial Black',sans-serif", color:C.green, fontSize:"0.52rem", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.3rem" }}>Step {step.id} of {total}</div>
          <h3 style={{ fontFamily:"'Arial Black',sans-serif", color:C.ink, fontSize: isMobile ? "1rem" : "1.2rem", textTransform:"uppercase", fontWeight:900, margin:0 }}>{step.title}</h3>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ background:"none", border:`2px solid ${C.subtle}`, color:C.muted, cursor:"pointer", padding:"0.35rem 0.7rem", fontFamily:"'Arial Black',sans-serif", fontSize:"0.6rem" }}>✕</button>
      </div>
      <div style={{ background:C.greenPale, border:`2px solid ${C.green}`, padding:"0.55rem 1rem", marginBottom:"1.1rem", fontFamily:"'Arial Black',sans-serif", fontSize:"0.52rem", color:C.green, letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:900 }}>{step.spec}</div>
      <p style={{ fontFamily:"Georgia,serif", fontSize: isMobile ? "0.88rem" : "0.95rem", color:"#444", lineHeight:1.85, maxWidth:"640px" }}>{step.detail}</p>
      <div style={{ display:"flex", gap:"0.7rem", marginTop:"1.4rem" }}>
        {stepIndex > 0 && <button onClick={onPrev} style={{ padding:"0.55rem 1.1rem", background:"transparent", border:`2px solid ${C.subtle}`, color:C.muted, cursor:"pointer", fontFamily:"'Arial Black',sans-serif", fontSize:"0.55rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>← {STEPS[stepIndex-1].title}</button>}
        {stepIndex < total-1 && <button onClick={onNext} style={{ padding:"0.55rem 1.1rem", background:C.green, border:`2px solid ${C.green}`, color:C.bg, cursor:"pointer", fontFamily:"'Arial Black',sans-serif", fontSize:"0.55rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:900 }}>{STEPS[stepIndex+1].title} →</button>}
      </div>
    </div>
  );
}

export default function PourOver({ isMobile }) {
  const [active, setActive] = useState(null);
  const scrollRef = useRef(null);
  const isDrag = useRef(false);
  const startX = useRef(0);
  const scrollL = useRef(0);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    if (active !== null && scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll('[data-card]');
      if (cards[active]) cards[active].scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
    }
  }, [active]);

  return (
    <section id="pour-over" style={{ background:C.bg, borderTop:`5px solid ${C.ink}` }}>
      <div style={{ background:C.green, padding: isMobile ? "1.2rem 1.5rem" : "1.5rem 3rem", display:"flex", justifyContent:"space-around", alignItems:"center" }}>
        <div>
          <h2 style={{ fontFamily:"'Arial Black',sans-serif", fontSize: isMobile ? "1.1rem" : "clamp(1.2rem,3vw,1.8rem)", fontWeight:900, color:C.bg, textTransform:"uppercase", margin:0, lineHeight:1, textAlign: "center"}}>The Coffee Master's Secret.</h2>
          <p style={{ fontFamily:"Georgia,serif", color:"rgba(242,237,227,0.6)", fontSize:"0.65rem", marginTop:"0.2rem", fontStyle:"italic" }}>9 steps · Tap any icon to learn</p>
        </div>
        
      </div>

      <div
        ref={scrollRef}
        onMouseDown={e => { isDrag.current=true; startX.current=e.pageX-scrollRef.current.offsetLeft; scrollL.current=scrollRef.current.scrollLeft; }}
        onMouseMove={e => { if(!isDrag.current) return; e.preventDefault(); scrollRef.current.scrollLeft=scrollL.current-(e.pageX-scrollRef.current.offsetLeft-startX.current); }}
        onMouseUp={() => isDrag.current=false}
        onMouseLeave={() => isDrag.current=false}
        style={{ display:"flex", gap:"0.8rem", padding: isMobile ? "1.4rem 1.2rem 0.6rem" : "1.8rem 2rem 0.8rem", overflowX:"auto", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", cursor:"grab", scrollbarWidth:"thin", scrollbarColor:`${C.green} ${C.subtle}` }}
      >
        {STEPS.map((step, i) => (
          <div key={step.id} style={{ scrollSnapAlign:"start" }}>
            <Card step={step} isActive={active===i} isMobile={!!isMobile} onClick={() => setActive(active===i ? null : i)}/>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"center", gap:"0.4rem", padding:"0.5rem 0 0.8rem" }}>
        {STEPS.map((_,i) => (
          <div key={i} onClick={() => setActive(i)} style={{ width:active===i?"18px":"6px", height:"6px", background:active===i?C.green:C.subtle, transition:"all 0.25s", cursor:"pointer" }}/>
        ))}
      </div>

      <div style={{ maxHeight: active !== null ? "500px" : "0", overflow:"hidden", transition:"max-height 0.35s ease" }}>
        <DetailPanel
          step={active !== null ? STEPS[active] : null}
          stepIndex={active !== null ? active : 0}
          total={STEPS.length}
          onClose={() => setActive(null)}
          onPrev={() => setActive(active - 1)}
          onNext={() => setActive(active + 1)}
          isMobile={!!isMobile}
        />
      </div>
    </section>
  );
}
