// AirportArt.jsx — airport scene illustration + icon set

// ─────────────────────────────────────────────────────────────
// Main hero airport scene
// ─────────────────────────────────────────────────────────────
export function AirportScene({ height = 480, animatePlanes = true, showGround = true }) {
  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
      {/* Sky gradient bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #6ab8e8 0%, #a4d8f2 30%, #bfe4f5 60%, #d6eef9 80%, #e9f5fb 100%)',
      }} />

      <svg viewBox="0 0 380 480" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="towerGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bfe7e6"/>
            <stop offset="1" stopColor="#5fb6bc"/>
          </linearGradient>
          <linearGradient id="towerBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"   stopColor="#eef5fb"/>
            <stop offset="0.5" stopColor="#ffffff"/>
            <stop offset="1"   stopColor="#d6e3ee"/>
          </linearGradient>
          <linearGradient id="termGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a8e0db"/>
            <stop offset="1" stopColor="#3aaab8"/>
          </linearGradient>
          <linearGradient id="bushDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fc28a"/>
            <stop offset="1" stopColor="#4ea36b"/>
          </linearGradient>
          <linearGradient id="bushLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c5e8a6"/>
            <stop offset="1" stopColor="#8fcc85"/>
          </linearGradient>
          <filter id="cloudBlur">
            <feGaussianBlur stdDeviation="1.2"/>
          </filter>
        </defs>

        {/* ── Clouds — multiple layers ── */}
        {/* Far layer, slow drift */}
        <g style={{ animation: 'cloudDrift 22s ease-in-out infinite alternate' }} opacity="0.55">
          <Cloud cx={60} cy={80} rx={36} ry={10}/>
        </g>
        <g style={{ animation: 'cloudDrift2 28s ease-in-out infinite alternate-reverse' }} opacity="0.5">
          <Cloud cx={300} cy={65} rx={42} ry={12}/>
        </g>

        {/* Mid layer */}
        <g style={{ animation: 'cloudDrift 18s ease-in-out infinite alternate' }} opacity="0.75">
          <Cloud cx={130} cy={130} rx={50} ry={14}/>
        </g>
        <g style={{ animation: 'cloudDrift2 24s ease-in-out infinite alternate-reverse' }} opacity="0.7">
          <Cloud cx={320} cy={160} rx={44} ry={13}/>
        </g>
        <g style={{ animation: 'cloudDrift3 20s ease-in-out infinite alternate' }} opacity="0.65">
          <Cloud cx={55} cy={200} rx={38} ry={11}/>
        </g>

        {/* Near layer */}
        <g style={{ animation: 'cloudDrift3 16s ease-in-out infinite alternate-reverse' }} opacity="0.55">
          <Cloud cx={200} cy={255} rx={52} ry={14}/>
        </g>
        <g style={{ animation: 'cloudDrift 14s ease-in-out infinite alternate' }} opacity="0.45">
          <Cloud cx={355} cy={230} rx={32} ry={10}/>
        </g>

        {/* Background mountain hint */}
        <path d="M0,360 Q60,340 110,355 T220,348 T380,360 L380,400 L0,400 Z"
              fill="#8fc7d8" opacity="0.45"/>

        {/* ── Control tower (right side) ── */}
        <g>
          <path d="M250,135 C250,135 258,160 258,205 C258,260 245,300 245,345 L290,345 C290,300 277,260 277,205 C277,160 285,135 285,135 Z"
                fill="url(#towerBody)"/>
          <path d="M250,135 C250,135 258,160 258,205 C258,260 245,300 245,345 L255,345 C255,300 263,260 263,205 C263,160 252,135 252,135 Z"
                fill="#cad9e6" opacity="0.55"/>
          <rect x="252" y="240" width="34" height="14" rx="3" fill="#2f7ea3"/>
          <rect x="252" y="240" width="34" height="6"  rx="3" fill="#4ba7c8" opacity="0.85"/>
          <path d="M232,135 L303,135 L298,150 L237,150 Z" fill="#ffffff"/>
          <rect x="240" y="120" width="55" height="20" rx="6" fill="url(#towerGlass)"/>
          <rect x="232" y="115" width="71" height="9" rx="4" fill="#ffffff"/>
          <rect x="232" y="115" width="71" height="9" rx="4" fill="#e7eef4" opacity="0.6"/>
          <line x1="245" y1="115" x2="245" y2="92"  stroke="#4a5e72" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="258" y1="115" x2="258" y2="80"  stroke="#4a5e72" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="270" y1="115" x2="270" y2="85"  stroke="#4a5e72" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="283" y1="115" x2="283" y2="95"  stroke="#4a5e72" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="258" cy="78" r="2.5" fill="#e8513a">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <rect x="240" y="340" width="55" height="14" rx="6" fill="#ffffff"/>
          <rect x="240" y="350" width="55" height="6"  rx="3" fill="#5fb6bc"/>
        </g>

        {/* ── Terminal building (left side) ── */}
        <g>
          <path d="M10,300 L210,300 L220,265 L20,265 Z" fill="#f3f7fa"/>
          <path d="M28,275 L208,275 L201,295 L26,295 Z" fill="url(#termGlass)"/>
          <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1">
            {Array.from({length: 11}).map((_, i) => (
              <line key={'v'+i} x1={40 + i*16} y1="277" x2={40 + i*16} y2="293"/>
            ))}
            <line x1="28" y1="284" x2="208" y2="284"/>
          </g>
          <rect x="0" y="298" width="220" height="50" fill="#ffffff"/>
          <g fill="#cae0ee">
            <rect x="38"  y="320" width="22" height="28" rx="4"/>
            <rect x="90"  y="320" width="22" height="28" rx="4"/>
            <rect x="142" y="320" width="22" height="28" rx="4"/>
          </g>
          <rect x="0" y="346" width="220" height="6" fill="#dde7ee"/>
        </g>

        {/* ── Two light poles ── */}
        <g>
          <rect x="80"  y="200" width="4" height="155" fill="#ffffff"/>
          <rect x="80"  y="220" width="4" height="14"  fill="#e25656"/>
          <rect x="80"  y="335" width="4" height="14"  fill="#e25656"/>
          <circle cx="74" cy="205" r="5" fill="#ffffff"/>
          <circle cx="88" cy="205" r="5" fill="#ffffff"/>
          <rect x="320" y="240" width="3" height="115" fill="#ffffff"/>
          <rect x="320" y="260" width="3" height="11"  fill="#e25656"/>
          <rect x="320" y="335" width="3" height="11"  fill="#e25656"/>
          <circle cx="316" cy="244" r="4" fill="#ffffff"/>
          <circle cx="327" cy="244" r="4" fill="#ffffff"/>
        </g>

        {/* ── Ground tarmac ── */}
        {showGround && (
          <>
            <path d="M0,352 Q190,348 380,352 L380,420 L0,420 Z" fill="#dceef5"/>
            <path d="M0,360 Q190,356 380,360 L380,395 L0,395 Z" fill="#e8f4f9"/>
          </>
        )}

        {/* ── Foreground bushes ── */}
        <g>
          <ellipse cx="15"  cy="358" rx="32" ry="15" fill="url(#bushDark)"/>
          <ellipse cx="225" cy="358" rx="30" ry="14" fill="url(#bushDark)"/>
          <ellipse cx="370" cy="362" rx="32" ry="15" fill="url(#bushLight)"/>
          <circle cx="200" cy="354" r="5" fill="#ffd166"/>
          <circle cx="206" cy="358" r="3" fill="#ffd166"/>
          <circle cx="360" cy="370" r="4" fill="#ffd166"/>
        </g>
      </svg>

      {animatePlanes && <PlaneFlock />}
    </div>
  );
}

// Puffy realistic cloud shape
function Cloud({ cx, cy, rx, ry }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx="0"     cy="0"    rx={rx}      ry={ry}      fill="#ffffff"/>
      <ellipse cx={rx*-0.38} cy={ry*-0.5} rx={rx*0.45} ry={ry*0.85} fill="#ffffff"/>
      <ellipse cx={rx*0.32}  cy={ry*-0.55} rx={rx*0.52} ry={ry*0.95} fill="#ffffff"/>
      <ellipse cx={rx*-0.62} cy={ry*0.1}   rx={rx*0.32} ry={ry*0.7}  fill="#f0f8ff" opacity="0.8"/>
      <ellipse cx={rx*0.62}  cy={ry*0.15}  rx={rx*0.28} ry={ry*0.65} fill="#f0f8ff" opacity="0.8"/>
    </g>
  );
}

function PlaneFlock() {
  const plane = (top, size, dur, delay, flip, body, accent, stripe) => ({
    position: 'absolute', top, left: 0,
    pointerEvents: 'none',
    animation: `${flip ? 'flyRTL' : 'flyLTR'} ${dur}s linear infinite ${delay}s`,
    animationFillMode: 'backwards',
  });
  return (
    <>
      {/* Large, left → right */}
      <div style={plane('6%',  44, 22,  0, false)}>
        <JetPlane size={44} bodyColor="#ffffff"  accentColor="#3a99cf" stripe="#1d9d8d"/>
      </div>
      {/* Medium, right → left */}
      <div style={plane('23%', 34, 30,  6, true)}>
        <JetPlane size={34} bodyColor="#e8f4fc" accentColor="#5fb6bc" stripe="#2db8a7" flip/>
      </div>
      {/* Small, left → right */}
      <div style={plane('40%', 26, 38, 13, false)}>
        <JetPlane size={26} bodyColor="#ffffff"  accentColor="#84c5e9" stripe="#5fb4e3"/>
      </div>
      {/* Tiny high, left → right */}
      <div style={plane('13%', 20, 46, 20, false)}>
        <JetPlane size={20} bodyColor="#ddeef8" accentColor="#3a99cf" stripe="#2db8a7"/>
      </div>
      {/* Medium-small, right → left */}
      <div style={plane('31%', 30, 34, 28, true)}>
        <JetPlane size={30} bodyColor="#ffffff"  accentColor="#6ab8e8" stripe="#3a99cf" flip/>
      </div>
    </>
  );
}

// Commercial jet side-view silhouette
export function JetPlane({ size = 40, bodyColor = '#ffffff', accentColor = '#3a99cf', stripe = '#1d9d8d', flip = false }) {
  const w = size * 3.2;
  const h = size;
  // All coordinates in a 128×40 viewBox, nose pointing right
  return (
    <svg width={w} height={h} viewBox="0 0 128 40"
         style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined }}>
      {/* Fuselage */}
      <path d="M10,18 C18,11 36,13 56,13 L96,13 C110,13 118,17 120,20 C118,23 110,27 96,27 L56,27 C36,27 18,29 10,22 Z"
            fill={bodyColor}/>
      {/* Nose cone */}
      <path d="M96,13 C110,13 122,16 124,20 C122,24 110,27 96,27 Z"
            fill={bodyColor} opacity="0.9"/>
      {/* Cockpit window tint */}
      <path d="M98,15 C108,15 118,17 121,20 C118,23 108,25 98,25 Z"
            fill={accentColor} opacity="0.35"/>
      {/* Passenger windows */}
      {[60,69,78,87,96].map((x, i) => (
        <rect key={i} x={x} y="15" width="5.5" height="4" rx="2"
              fill={accentColor} opacity="0.45"/>
      ))}
      {/* Fuselage colour stripe */}
      <path d="M18,21 Q56,20.5 96,21 L110,21.5"
            stroke={stripe} strokeWidth="1.6" fill="none" opacity="0.4" strokeLinecap="round"/>
      {/* Main wing — swept back */}
      <path d="M60,25 L38,40 L20,40 L48,25 Z"
            fill={bodyColor} opacity="0.92"/>
      {/* Engine pod under wing */}
      <path d="M36,36 Q44,34 48,36 Q44,39 36,38 Z"
            fill={bodyColor}/>
      <ellipse cx="42" cy="37" rx="5" ry="1.6" fill={accentColor} opacity="0.22"/>
      {/* Winglet at tip */}
      <path d="M20,39 L17,33 L22,33 Z" fill={bodyColor} opacity="0.8"/>
      {/* Vertical tail fin */}
      <path d="M13,13 L20,2 L28,13 Z" fill={bodyColor}/>
      {/* Horizontal stabiliser */}
      <path d="M11,21 L4,29 L2,29 L8,21 Z" fill={bodyColor} opacity="0.9"/>
    </svg>
  );
}

// Keep PaperPlane export for compatibility
export function PaperPlane({ size = 24, color = '#fff', stroke = '#3a99cf' }) {
  return <JetPlane size={size} bodyColor={color} accentColor={stroke}/>;
}

export function MiniTower({ size = 32, color = '#2db8a7' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M12,10 C12,10 13,14 13,18 C13,22 11,25 11,28 L21,28 C21,25 19,22 19,18 C19,14 20,10 20,10 Z"
            fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <rect x="11" y="8" width="10" height="3" rx="1.5" fill={color}/>
      <line x1="13" y1="8" x2="13" y2="4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="16" y1="8" x2="16" y2="3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="19" y1="8" x2="19" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="16" cy="2.5" r="1" fill="#e8513a"/>
      <rect x="11.5" y="19" width="9" height="2" rx="1" fill={color} opacity="0.5"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Icon set — sized 24, stroke style
// ─────────────────────────────────────────────────────────────
const I = (props) => ({
  width: props.size || 22,
  height: props.size || 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: props.color || 'currentColor',
  strokeWidth: props.weight || 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export function Icon({ name, size, color, weight }) {
  const p = I({ size, color, weight });
  switch(name){
    case 'plane': return (<svg {...p}><path d="M22 16.5L12 21l1-5-7-3 16-9-2 12.5z"/></svg>);
    case 'team': return (<svg {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><path d="M14 19c0-2 2-3.5 4-3.5s3.5 1.5 3.5 3.5"/></svg>);
    case 'calendar': return (<svg {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>);
    case 'pin': return (<svg {...p}><path d="M12 22s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>);
    case 'clock': return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case 'users': return (<svg {...p}><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.4"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><path d="M14 19c0-2 1.7-3.3 3.5-3.3S21 17 21 19"/></svg>);
    case 'door': return (<svg {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="15" cy="12" r="1" fill="currentColor"/></svg>);
    case 'ticket': return (<svg {...p}><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4V8z"/><path d="M10 6v12" strokeDasharray="2 2"/></svg>);
    case 'queue': return (<svg {...p}><circle cx="7" cy="8" r="2.2"/><circle cx="13" cy="8" r="2.2"/><circle cx="19" cy="8" r="2.2"/><path d="M3 20c0-2.4 1.8-4 4-4s4 1.6 4 4"/><path d="M9 20c0-2.4 1.8-4 4-4s4 1.6 4 4"/></svg>);
    case 'shield': return (<svg {...p}><path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>);
    case 'passport': return (<svg {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 16h8"/></svg>);
    case 'bag': return (<svg {...p}><path d="M5 9h14l-1 11a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"/><path d="M9 9V6a3 3 0 016 0v3"/></svg>);
    case 'gate': return (<svg {...p}><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-7h6v7"/></svg>);
    case 'info': return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>);
    case 'transfer': return (<svg {...p}><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>);
    case 'dots': return (<svg {...p}><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg>);
    case 'plus': return (<svg {...p}><path d="M12 5v14M5 12h14"/></svg>);
    case 'check': return (<svg {...p}><path d="M5 12l5 5L20 7"/></svg>);
    case 'check-circle': return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>);
    case 'chevron-left': return (<svg {...p}><path d="M15 6l-6 6 6 6"/></svg>);
    case 'chevron-right': return (<svg {...p}><path d="M9 6l6 6-6 6"/></svg>);
    case 'arrow-left': return (<svg {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>);
    case 'arrow-right': return (<svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case 'download': return (<svg {...p}><path d="M12 4v12M7 11l5 5 5-5M5 20h14"/></svg>);
    case 'share': return (<svg {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M9 11l6-4M9 14l6 4"/></svg>);
    case 'quote': return (<svg {...p}><path d="M7 7h4v4c0 2-1 4-4 5M14 7h4v4c0 2-1 4-4 5"/></svg>);
    case 'sparkle': return (<svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>);
    case 'edit': return (<svg {...p}><path d="M4 20h4l11-11-4-4L4 16v4z"/></svg>);
    case 'pdf': return (<svg {...p}><path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v5h5"/><text x="12" y="18" fontSize="5" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">PDF</text></svg>);
    case 'save': return (<svg {...p}><path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/></svg>);
    case 'list': return (<svg {...p}><path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>);
    case 'heart': return (<svg {...p}><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/></svg>);
    case 'compass': return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-5 2 2-5 5-2z"/></svg>);
    case 'eye': return (<svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>);
    case 'wand': return (<svg {...p}><path d="M5 19L18 6M16 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>);
    case 'cloud': return (<svg {...p}><path d="M7 17h11a4 4 0 000-8 6 6 0 00-11.7 1A4 4 0 007 17z"/></svg>);
    case 'self': return (<svg {...p}><rect x="6" y="3" width="12" height="18" rx="2"/><rect x="9" y="6" width="6" height="5" rx="1"/><circle cx="12" cy="16" r="1.5"/></svg>);
    case 'hallway': return (<svg {...p}><path d="M3 21l4-15h10l4 15"/><path d="M3 21h18M7 6V3h10v3"/></svg>);
    case 'flag': return (<svg {...p}><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>);
    default: return null;
  }
}
