export function LamorindaSkylineSVG() {
  return (
    <svg
      viewBox="0 0 1920 700"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        {/* Primary building gradient — golden oak, dissolving at base */}
        <linearGradient id="lam-bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#3DBDB5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2DADA6" stopOpacity="0.45" />
        </linearGradient>
        {/* Secondary / background buildings */}
        <linearGradient id="lam-bldgLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2DADA6" stopOpacity="0.25" />
        </linearGradient>
        {/* Golden hills gradient */}
        <linearGradient id="lam-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#3DBDB5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2DADA6" stopOpacity="0.06" />
        </linearGradient>
        {/* Deeper hills — second layer */}
        <linearGradient id="lam-hillDeep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2DADA6" stopOpacity="0.03" />
        </linearGradient>
        {/* Sage green gradient for trees/vegetation */}
        <linearGradient id="lam-sage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B9E6B" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#6B8E5B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5A7D4A" stopOpacity="0.35" />
        </linearGradient>
        {/* Lighter sage for background trees */}
        <linearGradient id="lam-sageLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B9E6B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5A7D4A" stopOpacity="0.15" />
        </linearGradient>
        {/* Mount Diablo — very faint mountain gradient */}
        <linearGradient id="lam-diablo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.15" />
          <stop offset="40%" stopColor="#2DADA6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1a1916" stopOpacity="0.02" />
        </linearGradient>
        {/* Data viz accent glow */}
        <linearGradient id="lam-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7B9E6B" stopOpacity="0.3" />
        </linearGradient>
        {/* Creek / water element */}
        <linearGradient id="lam-creek" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#7B9E6B" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#8BAE7B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7B9E6B" stopOpacity="0.1" />
        </linearGradient>
        {/* BART train gradient */}
        <linearGradient id="lam-bart" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2DADA6" stopOpacity="0.4" />
        </linearGradient>
        {/* Glow filter for data elements */}
        <filter id="lam-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft glow for fire tower beacon */}
        <filter id="lam-beacon">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LAYER 1: Ground glow — warm golden atmosphere ===== */}
      <ellipse cx="960" cy="680" rx="900" ry="80" fill="#4ECDC4" opacity="0.05" />
      <ellipse cx="320" cy="660" rx="300" ry="50" fill="#4ECDC4" opacity="0.03" />
      <ellipse cx="1600" cy="660" rx="300" ry="50" fill="#4ECDC4" opacity="0.03" />

      {/* ===== LAYER 2: Mount Diablo silhouette — centered background ===== */}
      <g id="mount-diablo">
        {/* Main peak */}
        <polygon
          points="960,180 780,380 820,365 870,385 920,355 960,340 1000,355 1050,385 1100,365 1140,380"
          fill="url(#lam-diablo)"
        />
        {/* North Peak ridge */}
        <polygon
          points="1040,260 960,340 1000,330 1060,355 1120,340 1160,360"
          fill="url(#lam-diablo)"
          opacity="0.6"
        />
        {/* Summit detail — subtle ridge lines */}
        <line x1="960" y1="180" x2="920" y2="220" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.08" />
        <line x1="960" y1="180" x2="1000" y2="215" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.08" />
        <line x1="960" y1="180" x2="960" y2="240" stroke="#4ECDC4" strokeWidth="0.5" opacity="0.06" />
        {/* Western foothills fading */}
        <path d="M780,380 Q720,400 650,420 Q580,440 500,445 L500,445 Q580,430 650,415 Q720,395 780,380Z" fill="#4ECDC4" opacity="0.04" />
        {/* Eastern foothills fading */}
        <path d="M1160,360 Q1240,385 1320,400 Q1400,415 1480,420 L1480,420 Q1400,410 1320,395 Q1240,380 1160,360Z" fill="#4ECDC4" opacity="0.04" />
      </g>

      {/* ===== LAYER 3: Rolling golden hills — three layered waves ===== */}
      <g id="rolling-hills">
        {/* Far hills — most transparent, highest */}
        <path
          d="M0,420 Q80,380 180,400 Q300,425 420,385 Q540,350 660,380 Q780,410 900,370 Q1020,335 1140,365 Q1260,395 1380,355 Q1500,320 1620,350 Q1740,380 1860,345 Q1900,335 1920,340 L1920,700 L0,700Z"
          fill="url(#lam-hillDeep)"
        />
        {/* Middle hills */}
        <path
          d="M0,480 Q120,450 240,465 Q380,485 520,455 Q660,425 800,450 Q940,475 1080,445 Q1220,420 1360,445 Q1500,470 1640,440 Q1780,415 1880,435 L1920,430 L1920,700 L0,700Z"
          fill="url(#lam-hill)"
        />
        {/* Front hills — most opaque, lowest */}
        <path
          d="M0,540 Q160,515 320,530 Q480,545 640,520 Q800,500 960,520 Q1120,540 1280,515 Q1440,495 1600,515 Q1760,535 1880,520 L1920,515 L1920,700 L0,700Z"
          fill="url(#lam-hill)"
        />
      </g>

      {/* ===== LAYER 4: Lafayette section (left third, 0-640) ===== */}
      <g id="lafayette" transform="translate(0, 0)">

        {/* Lafayette Creek trail — subtle flowing line */}
        <path
          d="M0,620 Q40,612 80,618 Q140,625 200,615 Q260,608 320,614 Q380,622 440,612 Q500,605 560,610 Q600,615 640,610"
          stroke="#7B9E6B"
          strokeWidth="2"
          opacity="0.18"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0,624 Q40,616 80,622 Q140,628 200,619 Q260,612 320,618 Q380,626 440,616 Q500,609 560,614 Q600,619 640,614"
          stroke="#7B9E6B"
          strokeWidth="1.2"
          opacity="0.1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Small storefronts along main street baseline — left cluster */}
        <rect x="60" y="530" width="35" height="70" rx="2" fill="url(#lam-bldgLight)" opacity="0.4" />
        <rect x="62" y="545" width="8" height="10" rx="1" fill="#1a1916" opacity="0.2" />
        <rect x="74" y="545" width="8" height="10" rx="1" fill="#1a1916" opacity="0.2" />
        <rect x="62" y="560" width="8" height="10" rx="1" fill="#1a1916" opacity="0.15" />
        <rect x="74" y="560" width="8" height="10" rx="1" fill="#1a1916" opacity="0.15" />
        {/* Storefront awning */}
        <rect x="58" y="582" width="39" height="4" fill="#4ECDC4" opacity="0.2" />

        <rect x="102" y="540" width="30" height="60" rx="2" fill="url(#lam-bldg)" opacity="0.35" />
        <rect x="105" y="555" width="6" height="8" rx="1" fill="#1a1916" opacity="0.18" />
        <rect x="115" y="555" width="6" height="8" rx="1" fill="#1a1916" opacity="0.18" />
        <rect x="100" y="582" width="34" height="4" fill="#4ECDC4" opacity="0.18" />

        <rect x="140" y="535" width="28" height="65" rx="2" fill="url(#lam-bldgLight)" opacity="0.38" />
        <rect x="143" y="550" width="6" height="8" rx="1" fill="#1a1916" opacity="0.15" />
        <rect x="153" y="550" width="6" height="8" rx="1" fill="#1a1916" opacity="0.15" />

        <rect x="175" y="545" width="25" height="55" rx="2" fill="url(#lam-bldg)" opacity="0.32" />

        {/* === Downtown Lafayette Clock Tower — main vertical element === */}
        <g transform="translate(230, 0)">
          {/* Tower base — wider foundation building */}
          <rect x="-15" y="510" width="70" height="90" rx="3" fill="url(#lam-bldg)" opacity="0.6" />
          {/* Base windows */}
          <rect x="-5" y="525" width="10" height="14" rx="2" fill="#1a1916" opacity="0.25" />
          <rect x="12" y="525" width="10" height="14" rx="2" fill="#1a1916" opacity="0.25" />
          <rect x="29" y="525" width="10" height="14" rx="2" fill="#1a1916" opacity="0.25" />
          <rect x="-5" y="548" width="10" height="14" rx="2" fill="#1a1916" opacity="0.2" />
          <rect x="12" y="548" width="10" height="14" rx="2" fill="#1a1916" opacity="0.2" />
          <rect x="29" y="548" width="10" height="14" rx="2" fill="#1a1916" opacity="0.2" />
          {/* Entrance */}
          <rect x="10" y="572" width="20" height="28" rx="2" fill="#1a1916" opacity="0.3" />
          <path d="M10,572 Q20,564 30,572" fill="#4ECDC4" opacity="0.3" />

          {/* Clock tower shaft */}
          <rect x="5" y="430" width="30" height="85" fill="url(#lam-bldg)" opacity="0.75" />
          {/* Horizontal band details */}
          <rect x="5" y="460" width="30" height="2" fill="#4ECDC4" opacity="0.4" />
          <rect x="5" y="485" width="30" height="2" fill="#4ECDC4" opacity="0.35" />
          {/* Tower windows — vertical slits */}
          <rect x="12" y="440" width="4" height="14" rx="2" fill="#1a1916" opacity="0.35" />
          <rect x="24" y="440" width="4" height="14" rx="2" fill="#1a1916" opacity="0.35" />
          <rect x="12" y="468" width="4" height="12" rx="2" fill="#1a1916" opacity="0.3" />
          <rect x="24" y="468" width="4" height="12" rx="2" fill="#1a1916" opacity="0.3" />

          {/* Clock section — wider than shaft */}
          <rect x="0" y="400" width="40" height="34" fill="url(#lam-bldg)" opacity="0.8" />
          {/* Clock face */}
          <circle cx="20" cy="417" r="12" fill="none" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.85" />
          <circle cx="20" cy="417" r="9.5" fill="none" stroke="#4ECDC4" strokeWidth="0.5" opacity="0.4" />
          {/* Clock hour markers */}
          <line x1="20" y1="407" x2="20" y2="409.5" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.7" />
          <line x1="20" y1="425" x2="20" y2="427.5" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.7" />
          <line x1="10" y1="417" x2="12.5" y2="417" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.7" />
          <line x1="27.5" y1="417" x2="30" y2="417" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.7" />
          {/* Clock hands */}
          <line x1="20" y1="410" x2="20" y2="417" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.75" />
          <line x1="20" y1="417" x2="25" y2="421" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.7" />
          <circle cx="20" cy="417" r="1.5" fill="#4ECDC4" opacity="0.8" />

          {/* Roof / cap */}
          <polygon points="20,380 -2,400 42,400" fill="url(#lam-bldg)" opacity="0.85" />
          {/* Finial */}
          <rect x="18" y="372" width="4" height="10" fill="#4ECDC4" opacity="0.7" />
          <circle cx="20" cy="370" r="3" fill="#4ECDC4" opacity="0.8" />
        </g>

        {/* More storefronts right of clock tower */}
        <rect x="310" y="538" width="32" height="62" rx="2" fill="url(#lam-bldg)" opacity="0.38" />
        <rect x="313" y="552" width="7" height="9" rx="1" fill="#1a1916" opacity="0.18" />
        <rect x="324" y="552" width="7" height="9" rx="1" fill="#1a1916" opacity="0.18" />
        <rect x="308" y="582" width="36" height="4" fill="#4ECDC4" opacity="0.16" />

        <rect x="350" y="545" width="28" height="55" rx="2" fill="url(#lam-bldgLight)" opacity="0.35" />
        <rect x="385" y="540" width="35" height="60" rx="2" fill="url(#lam-bldg)" opacity="0.3" />

        {/* The Terraces development — multi-story residential, taller */}
        <g transform="translate(435, 0)">
          <rect x="0" y="470" width="55" height="130" rx="3" fill="url(#lam-bldg)" opacity="0.5" />
          {/* Stepped top — terraced profile */}
          <rect x="5" y="455" width="45" height="20" rx="2" fill="url(#lam-bldg)" opacity="0.55" />
          <rect x="10" y="442" width="35" height="18" rx="2" fill="url(#lam-bldg)" opacity="0.5" />
          <rect x="15" y="432" width="25" height="14" rx="2" fill="url(#lam-bldgLight)" opacity="0.45" />
          {/* Window grid */}
          {[480, 498, 516, 534, 552].map((y) => (
            <g key={`terrace-row-${y}`}>
              <rect x="8" y={y} width="8" height="10" rx="1" fill="#1a1916" opacity="0.2" />
              <rect x="22" y={y} width="8" height="10" rx="1" fill="#1a1916" opacity="0.2" />
              <rect x="36" y={y} width="8" height="10" rx="1" fill="#1a1916" opacity="0.2" />
            </g>
          ))}
          {/* Balconies — horizontal lines */}
          <line x1="5" y1="495" x2="50" y2="495" stroke="#4ECDC4" strokeWidth="1" opacity="0.2" />
          <line x1="5" y1="513" x2="50" y2="513" stroke="#4ECDC4" strokeWidth="1" opacity="0.18" />
          <line x1="5" y1="531" x2="50" y2="531" stroke="#4ECDC4" strokeWidth="1" opacity="0.15" />
        </g>

        {/* Main Street baseline */}
        <rect x="50" y="598" width="460" height="2" fill="#4ECDC4" opacity="0.1" />
      </g>

      {/* ===== LAYER 5: Oak trees — signature Lamorinda element (between Lafayette & Orinda) ===== */}
      <g id="oak-trees">
        {/* Large oak tree #1 — primary */}
        <g transform="translate(530, 0)">
          {/* Trunk */}
          <rect x="25" y="530" width="16" height="70" fill="#5A7D4A" opacity="0.6" />
          {/* Major branches */}
          <path d="M33,545 L10,520" stroke="#5A7D4A" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          <path d="M38,540 L60,515" stroke="#5A7D4A" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
          <path d="M30,530 L15,500" stroke="#5A7D4A" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
          <path d="M36,525 L55,495" stroke="#5A7D4A" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
          {/* Multi-circle canopy — overlapping circles for organic look */}
          <circle cx="33" cy="470" r="50" fill="url(#lam-sage)" opacity="0.65" />
          <circle cx="5" cy="495" r="35" fill="#6B8E5B" opacity="0.55" />
          <circle cx="60" cy="490" r="38" fill="url(#lam-sage)" opacity="0.5" />
          <circle cx="33" cy="440" r="35" fill="#7B9E6B" opacity="0.45" />
          <circle cx="-10" cy="475" r="25" fill="url(#lam-sageLight)" opacity="0.4" />
          <circle cx="75" cy="475" r="28" fill="url(#lam-sageLight)" opacity="0.35" />
          <circle cx="33" cy="420" r="22" fill="#8BAE7B" opacity="0.3" />
        </g>

        {/* Large oak tree #2 */}
        <g transform="translate(650, 0)">
          <rect x="20" y="540" width="14" height="60" fill="#5A7D4A" opacity="0.5" />
          <path d="M27,545 L8,525" stroke="#5A7D4A" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
          <path d="M30,538 L50,520" stroke="#5A7D4A" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
          <circle cx="27" cy="490" r="42" fill="url(#lam-sage)" opacity="0.55" />
          <circle cx="2" cy="510" r="30" fill="#6B8E5B" opacity="0.45" />
          <circle cx="50" cy="505" r="32" fill="url(#lam-sage)" opacity="0.4" />
          <circle cx="27" cy="460" r="28" fill="#7B9E6B" opacity="0.38" />
          <circle cx="60" cy="485" r="22" fill="url(#lam-sageLight)" opacity="0.3" />
        </g>

        {/* Smaller oak tree #3 — background */}
        <g transform="translate(590, 0)" opacity="0.7">
          <rect x="12" y="548" width="10" height="50" fill="#5A7D4A" opacity="0.4" />
          <circle cx="17" cy="510" r="30" fill="url(#lam-sageLight)" opacity="0.5" />
          <circle cx="0" cy="525" r="20" fill="#6B8E5B" opacity="0.35" />
          <circle cx="32" cy="522" r="22" fill="url(#lam-sageLight)" opacity="0.3" />
          <circle cx="17" cy="490" r="18" fill="#7B9E6B" opacity="0.25" />
        </g>
      </g>

      {/* ===== LAYER 6: BART train element (connecting the communities, ~700-900) ===== */}
      <g id="bart-train">
        {/* Track line */}
        <line x1="680" y1="590" x2="920" y2="590" stroke="#4ECDC4" strokeWidth="2.5" opacity="0.15" />
        <line x1="680" y1="594" x2="920" y2="594" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.1" />
        {/* Track ties */}
        {[700, 720, 740, 760, 780, 800, 820, 840, 860, 880, 900].map((x) => (
          <rect key={`tie-${x}`} x={x - 2} y="588" width="4" height="8" fill="#4ECDC4" opacity="0.08" />
        ))}

        {/* BART train car — simplified modern profile */}
        <g transform="translate(740, 0)">
          {/* Car body */}
          <rect x="0" y="565" width="100" height="22" rx="4" fill="url(#lam-bart)" />
          {/* Roof */}
          <rect x="2" y="563" width="96" height="4" rx="2" fill="#4ECDC4" opacity="0.5" />
          {/* Windows — series of lit rectangles */}
          <rect x="8" y="570" width="12" height="10" rx="1.5" fill="#1a1916" opacity="0.35" />
          <rect x="24" y="570" width="12" height="10" rx="1.5" fill="#1a1916" opacity="0.35" />
          <rect x="40" y="570" width="12" height="10" rx="1.5" fill="#1a1916" opacity="0.35" />
          <rect x="56" y="570" width="12" height="10" rx="1.5" fill="#1a1916" opacity="0.35" />
          <rect x="72" y="570" width="12" height="10" rx="1.5" fill="#1a1916" opacity="0.35" />
          {/* Window glow — warm interior light */}
          <rect x="10" y="572" width="8" height="6" rx="1" fill="#4ECDC4" opacity="0.15" />
          <rect x="26" y="572" width="8" height="6" rx="1" fill="#4ECDC4" opacity="0.12" />
          <rect x="42" y="572" width="8" height="6" rx="1" fill="#4ECDC4" opacity="0.15" />
          <rect x="58" y="572" width="8" height="6" rx="1" fill="#4ECDC4" opacity="0.12" />
          <rect x="74" y="572" width="8" height="6" rx="1" fill="#4ECDC4" opacity="0.15" />
          {/* BART stripe */}
          <rect x="0" y="580" width="100" height="2" fill="#7B9E6B" opacity="0.3" />
          {/* Wheels */}
          <circle cx="18" cy="589" r="3" fill="#1a1916" opacity="0.3" />
          <circle cx="82" cy="589" r="3" fill="#1a1916" opacity="0.3" />
        </g>

        {/* Second car — trailing */}
        <g transform="translate(845, 0)" opacity="0.7">
          <rect x="0" y="565" width="70" height="22" rx="4" fill="url(#lam-bart)" opacity="0.7" />
          <rect x="2" y="563" width="66" height="4" rx="2" fill="#4ECDC4" opacity="0.35" />
          <rect x="8" y="570" width="10" height="10" rx="1.5" fill="#1a1916" opacity="0.25" />
          <rect x="22" y="570" width="10" height="10" rx="1.5" fill="#1a1916" opacity="0.25" />
          <rect x="36" y="570" width="10" height="10" rx="1.5" fill="#1a1916" opacity="0.25" />
          <rect x="50" y="570" width="10" height="10" rx="1.5" fill="#1a1916" opacity="0.25" />
          <rect x="0" y="580" width="70" height="2" fill="#7B9E6B" opacity="0.2" />
          <circle cx="14" cy="589" r="3" fill="#1a1916" opacity="0.2" />
          <circle cx="56" cy="589" r="3" fill="#1a1916" opacity="0.2" />
        </g>
      </g>

      {/* ===== LAYER 7: Orinda section (center, 640-1280) ===== */}
      <g id="orinda" transform="translate(0, 0)">

        {/* === Orinda BART station — low modern structure === */}
        <g transform="translate(680, 0)">
          {/* Station platform roof — angular modern canopy */}
          <path d="M0,555 L5,542 L85,542 L90,555 Z" fill="url(#lam-bldg)" opacity="0.4" />
          {/* Support columns */}
          <rect x="15" y="542" width="3" height="55" fill="#4ECDC4" opacity="0.25" />
          <rect x="45" y="542" width="3" height="55" fill="#4ECDC4" opacity="0.25" />
          <rect x="72" y="542" width="3" height="55" fill="#4ECDC4" opacity="0.25" />
          {/* Platform edge */}
          <rect x="0" y="595" width="90" height="3" fill="#4ECDC4" opacity="0.12" />
        </g>

        {/* === Theatre Square — art deco style, Orinda centerpiece === */}
        <g transform="translate(840, 0)">
          {/* Main facade — wide rectangular building */}
          <rect x="0" y="460" width="180" height="140" rx="3" fill="url(#lam-bldg)" opacity="0.6" />

          {/* Art deco vertical pilasters */}
          <rect x="8" y="460" width="4" height="140" fill="#4ECDC4" opacity="0.3" />
          <rect x="44" y="460" width="4" height="140" fill="#4ECDC4" opacity="0.3" />
          <rect x="86" y="460" width="4" height="140" fill="#4ECDC4" opacity="0.3" />
          <rect x="128" y="460" width="4" height="140" fill="#4ECDC4" opacity="0.3" />
          <rect x="168" y="460" width="4" height="140" fill="#4ECDC4" opacity="0.3" />

          {/* Art deco crown / parapet with stepped detail */}
          <rect x="0" y="455" width="180" height="8" fill="#4ECDC4" opacity="0.4" />
          <rect x="30" y="445" width="120" height="14" rx="2" fill="url(#lam-bldg)" opacity="0.65" />
          <rect x="60" y="436" width="60" height="12" rx="2" fill="url(#lam-bldg)" opacity="0.6" />
          {/* Deco ornament at crown center */}
          <polygon points="90,428 82,436 98,436" fill="#4ECDC4" opacity="0.5" />
          <circle cx="90" cy="425" r="3" fill="#4ECDC4" opacity="0.45" />

          {/* Central arched entrance — the theater entrance */}
          <rect x="70" y="530" width="40" height="70" rx="3" fill="#1a1916" opacity="0.35" />
          <path d="M70,530 Q90,510 110,530" fill="url(#lam-bldg)" opacity="0.5" />
          {/* Arch keystone */}
          <rect x="86" y="515" width="8" height="8" fill="#4ECDC4" opacity="0.4" />

          {/* Window rows — art deco proportions (tall narrow) */}
          {[475, 500, 525].map((y) => (
            <g key={`theatre-win-${y}`}>
              <rect x="15" y={y} width="6" height="16" rx="1" fill="#1a1916" opacity="0.25" />
              <rect x="28" y={y} width="6" height="16" rx="1" fill="#1a1916" opacity="0.25" />
              <rect x="52" y={y} width="6" height="16" rx="1" fill="#1a1916" opacity="0.25" />
              <rect x="120" y={y} width="6" height="16" rx="1" fill="#1a1916" opacity="0.25" />
              <rect x="140" y={y} width="6" height="16" rx="1" fill="#1a1916" opacity="0.25" />
              <rect x="155" y={y} width="6" height="16" rx="1" fill="#1a1916" opacity="0.25" />
            </g>
          ))}

          {/* Theater marquee sign */}
          <rect x="72" y="545" width="36" height="14" rx="2" fill="none" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.5" />
          {/* Marquee glow */}
          <rect x="75" y="548" width="30" height="8" rx="1" fill="#4ECDC4" opacity="0.08" />

          {/* Side wing — retail/shops */}
          <rect x="180" y="485" width="50" height="115" rx="2" fill="url(#lam-bldgLight)" opacity="0.4" />
          <rect x="186" y="500" width="6" height="10" rx="1" fill="#1a1916" opacity="0.18" />
          <rect x="198" y="500" width="6" height="10" rx="1" fill="#1a1916" opacity="0.18" />
          <rect x="210" y="500" width="6" height="10" rx="1" fill="#1a1916" opacity="0.18" />

          {/* Steps at base */}
          <rect x="-2" y="598" width="184" height="3" fill="#4ECDC4" opacity="0.15" />
          <rect x="0" y="603" width="180" height="2.5" fill="#4ECDC4" opacity="0.1" />
        </g>

        {/* Hillside homes — small rectangles on a slope (right side of Orinda) */}
        <g transform="translate(1080, 0)">
          {/* Slope line */}
          <path d="M0,520 Q50,495 100,480 Q150,468 200,460" stroke="#4ECDC4" strokeWidth="1" opacity="0.08" fill="none" />

          {/* Houses scattered on hillside — at varying heights following slope */}
          <rect x="10" y="505" width="18" height="14" rx="1" fill="url(#lam-bldgLight)" opacity="0.3" />
          <polygon points="10,505 19,496 28,505" fill="url(#lam-bldg)" opacity="0.25" />

          <rect x="40" y="495" width="20" height="15" rx="1" fill="url(#lam-bldg)" opacity="0.28" />
          <polygon points="40,495 50,485 60,495" fill="url(#lam-bldg)" opacity="0.22" />

          <rect x="72" y="482" width="16" height="13" rx="1" fill="url(#lam-bldgLight)" opacity="0.25" />
          <polygon points="72,482 80,474 88,482" fill="url(#lam-bldg)" opacity="0.2" />

          <rect x="100" y="472" width="22" height="16" rx="1" fill="url(#lam-bldg)" opacity="0.26" />
          <polygon points="100,472 111,462 122,472" fill="url(#lam-bldg)" opacity="0.22" />

          <rect x="135" y="465" width="18" height="14" rx="1" fill="url(#lam-bldgLight)" opacity="0.23" />
          <polygon points="135,465 144,456 153,465" fill="url(#lam-bldg)" opacity="0.18" />

          <rect x="165" y="458" width="20" height="15" rx="1" fill="url(#lam-bldg)" opacity="0.2" />
          <polygon points="165,458 175,448 185,458" fill="url(#lam-bldg)" opacity="0.16" />
        </g>
      </g>

      {/* ===== LAYER 8: Moraga section (right third, 1280-1920) ===== */}
      <g id="moraga" transform="translate(0, 0)">

        {/* Moraga Commons — lower-profile public buildings */}
        <g transform="translate(1310, 0)">
          {/* Community center building — modest, wide, low */}
          <rect x="0" y="520" width="80" height="80" rx="3" fill="url(#lam-bldg)" opacity="0.45" />
          <rect x="80" y="530" width="60" height="70" rx="2" fill="url(#lam-bldgLight)" opacity="0.38" />
          {/* Windows */}
          <rect x="8" y="535" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.2" />
          <rect x="24" y="535" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.2" />
          <rect x="40" y="535" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.2" />
          <rect x="56" y="535" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.2" />
          <rect x="8" y="556" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.15" />
          <rect x="24" y="556" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.15" />
          <rect x="40" y="556" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.15" />
          <rect x="56" y="556" width="10" height="12" rx="1.5" fill="#1a1916" opacity="0.15" />
          {/* Entrance portico */}
          <rect x="28" y="580" width="24" height="20" rx="1" fill="#1a1916" opacity="0.25" />
          {/* Gable roof hint */}
          <path d="M0,520 Q40,505 80,520" fill="url(#lam-bldg)" opacity="0.3" />

          {/* Bandshell / gazebo in park area */}
          <g transform="translate(160, 0)">
            <path d="M0,575 Q25,555 50,575" fill="url(#lam-bldg)" opacity="0.3" />
            <rect x="5" y="575" width="3" height="25" fill="#4ECDC4" opacity="0.25" />
            <rect x="42" y="575" width="3" height="25" fill="#4ECDC4" opacity="0.25" />
            <rect x="22" y="570" width="6" height="30" fill="#4ECDC4" opacity="0.2" />
            {/* Platform */}
            <rect x="0" y="598" width="50" height="3" fill="#4ECDC4" opacity="0.12" />
          </g>

          {/* Small shops / town center */}
          <rect x="230" y="548" width="30" height="52" rx="2" fill="url(#lam-bldgLight)" opacity="0.32" />
          <rect x="265" y="552" width="25" height="48" rx="2" fill="url(#lam-bldg)" opacity="0.28" />
          <rect x="295" y="555" width="28" height="45" rx="2" fill="url(#lam-bldgLight)" opacity="0.25" />
        </g>

        {/* More rolling hills and open space — Moraga has a more rural feel */}
        <path
          d="M1280,530 Q1340,510 1400,520 Q1460,530 1520,505 Q1580,485 1640,500 Q1700,515 1760,495 Q1820,480 1880,490 Q1920,498 1920,495 L1920,700 L1280,700Z"
          fill="url(#lam-hillDeep)"
          opacity="0.5"
        />

        {/* Moraga oak trees — more open spacing */}
        <g transform="translate(1660, 0)">
          <rect x="18" y="530" width="12" height="55" fill="#5A7D4A" opacity="0.45" />
          <path d="M24,540 L6,520" stroke="#5A7D4A" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
          <path d="M28,535 L48,515" stroke="#5A7D4A" strokeWidth="3.5" strokeLinecap="round" opacity="0.38" />
          <circle cx="24" cy="490" r="36" fill="url(#lam-sage)" opacity="0.5" />
          <circle cx="2" cy="508" r="24" fill="#6B8E5B" opacity="0.4" />
          <circle cx="45" cy="505" r="26" fill="url(#lam-sageLight)" opacity="0.35" />
          <circle cx="24" cy="465" r="22" fill="#7B9E6B" opacity="0.3" />
        </g>

        {/* Small background oak */}
        <g transform="translate(1800, 0)" opacity="0.6">
          <rect x="10" y="540" width="8" height="40" fill="#5A7D4A" opacity="0.35" />
          <circle cx="14" cy="510" r="22" fill="url(#lam-sageLight)" opacity="0.4" />
          <circle cx="0" cy="520" r="15" fill="#6B8E5B" opacity="0.3" />
          <circle cx="26" cy="518" r="16" fill="url(#lam-sageLight)" opacity="0.25" />
        </g>

        {/* Another background oak near Moraga Commons */}
        <g transform="translate(1530, 0)" opacity="0.65">
          <rect x="15" y="535" width="10" height="48" fill="#5A7D4A" opacity="0.4" />
          <path d="M20,542 L5,525" stroke="#5A7D4A" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
          <circle cx="20" cy="498" r="30" fill="url(#lam-sage)" opacity="0.45" />
          <circle cx="0" cy="512" r="20" fill="#6B8E5B" opacity="0.35" />
          <circle cx="38" cy="510" r="22" fill="url(#lam-sageLight)" opacity="0.3" />
          <circle cx="20" cy="475" r="18" fill="#7B9E6B" opacity="0.25" />
        </g>
      </g>

      {/* ===== LAYER 9: MOFD Fire Lookout Tower (~1400) ===== */}
      <g id="mofd-tower" transform="translate(1440, 0)">
        {/* Tower legs — tapered steel frame */}
        <line x1="10" y1="400" x2="0" y2="560" stroke="#4ECDC4" strokeWidth="2.5" opacity="0.5" />
        <line x1="30" y1="400" x2="40" y2="560" stroke="#4ECDC4" strokeWidth="2.5" opacity="0.5" />
        {/* Cross bracing */}
        <line x1="3" y1="450" x2="37" y2="470" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3" />
        <line x1="37" y1="450" x2="3" y2="470" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3" />
        <line x1="1" y1="500" x2="39" y2="520" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.25" />
        <line x1="39" y1="500" x2="1" y2="520" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.25" />

        {/* Observation platform */}
        <rect x="2" y="390" width="36" height="14" rx="2" fill="url(#lam-bldg)" opacity="0.65" />
        {/* Platform railing */}
        <rect x="0" y="388" width="40" height="3" fill="#4ECDC4" opacity="0.45" />
        <rect x="0" y="404" width="40" height="2" fill="#4ECDC4" opacity="0.35" />
        {/* Cabin windows */}
        <rect x="8" y="393" width="8" height="8" rx="1" fill="#1a1916" opacity="0.3" />
        <rect x="24" y="393" width="8" height="8" rx="1" fill="#1a1916" opacity="0.3" />
        {/* Roof */}
        <polygon points="20,378 -2,390 42,390" fill="url(#lam-bldg)" opacity="0.55" />

        {/* Beacon / antenna at top */}
        <rect x="18" y="365" width="4" height="15" fill="#4ECDC4" opacity="0.5" />
        {/* Beacon glow */}
        <circle cx="20" cy="362" r="4" fill="#4ECDC4" opacity="0.6" filter="url(#lam-beacon)" />
        <circle cx="20" cy="362" r="2" fill="#4ECDC4" opacity="0.85" />
      </g>

      {/* ===== LAYER 10: Data visualization element — meeting activity trend line ===== */}
      <g id="data-trend">
        {/* Trend line representing meeting activity over time — running across the top */}
        <path
          d="M120,340 Q200,335 280,320 Q360,305 440,315 Q520,325 600,308 Q680,292 760,300 Q840,310 920,285 Q1000,270 1080,280 Q1160,290 1240,275 Q1320,260 1400,270 Q1480,282 1560,265 Q1640,258 1720,268 Q1800,278 1860,272"
          stroke="#4ECDC4"
          strokeWidth="1.5"
          fill="none"
          opacity="0.2"
          strokeLinecap="round"
        />
        {/* Second line — slightly offset, representing a second metric */}
        <path
          d="M120,355 Q200,348 280,340 Q360,330 440,338 Q520,346 600,330 Q680,318 760,325 Q840,332 920,310 Q1000,298 1080,305 Q1160,312 1240,300 Q1320,288 1400,295 Q1480,305 1560,290 Q1640,282 1720,292 Q1800,300 1860,295"
          stroke="#7B9E6B"
          strokeWidth="1"
          fill="none"
          opacity="0.12"
          strokeLinecap="round"
          strokeDasharray="6 4"
        />

        {/* Data dots with glow — peaks of activity */}
        <g filter="url(#lam-glow)">
          <circle cx="280" cy="320" r="3.5" fill="#4ECDC4" opacity="0.55" />
          <circle cx="600" cy="308" r="3" fill="#4ECDC4" opacity="0.5" />
          <circle cx="920" cy="285" r="4" fill="#4ECDC4" opacity="0.6" />
          <circle cx="1240" cy="275" r="3.5" fill="#4ECDC4" opacity="0.5" />
          <circle cx="1560" cy="265" r="3" fill="#7B9E6B" opacity="0.45" />
          <circle cx="1720" cy="268" r="2.5" fill="#4ECDC4" opacity="0.4" />
        </g>

        {/* Small label ticks under peak dots */}
        <line x1="920" y1="289" x2="920" y2="298" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.25" />
        <line x1="1240" y1="279" x2="1240" y2="288" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.2" />

        {/* Connection arcs between data points — subtle analytical feel */}
        <g opacity="0.1">
          <path d="M280,320 Q440,290 600,308" stroke="#4ECDC4" strokeWidth="1.5" strokeDasharray="8 6" fill="none" />
          <path d="M920,285 Q1080,260 1240,275" stroke="#4ECDC4" strokeWidth="1.5" strokeDasharray="8 6" fill="none" />
        </g>
      </g>

      {/* ===== LAYER 11: Foreground vegetation — grass and scrub ===== */}
      <g id="foreground-vegetation">
        {/* Grass tufts along the ground plane */}
        <path d="M30,598 Q35,585 40,598" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.15" fill="none" />
        <path d="M180,596 Q186,582 192,596" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.12" fill="none" />
        <path d="M520,598 Q526,584 532,598" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.13" fill="none" />
        <path d="M1100,596 Q1106,583 1112,596" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.12" fill="none" />
        <path d="M1350,598 Q1356,585 1362,598" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.14" fill="none" />
        <path d="M1700,596 Q1706,583 1712,596" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.11" fill="none" />
        <path d="M1870,598 Q1876,586 1882,598" stroke="#7B9E6B" strokeWidth="1.5" opacity="0.1" fill="none" />

        {/* Small bushes/shrubs scattered */}
        <ellipse cx="460" cy="595" rx="12" ry="6" fill="url(#lam-sageLight)" opacity="0.2" />
        <ellipse cx="1250" cy="594" rx="10" ry="5" fill="url(#lam-sageLight)" opacity="0.18" />
        <ellipse cx="1580" cy="596" rx="14" ry="6" fill="url(#lam-sageLight)" opacity="0.15" />
      </g>

      {/* ===== LAYER 12: Community labels — very faint location markers ===== */}
      <g id="community-markers" opacity="0.06">
        {/* Lafayette area marker */}
        <rect x="220" y="615" width="60" height="1.5" fill="#4ECDC4" />
        {/* Orinda area marker */}
        <rect x="930" y="615" width="50" height="1.5" fill="#4ECDC4" />
        {/* Moraga area marker */}
        <rect x="1480" y="615" width="55" height="1.5" fill="#4ECDC4" />
      </g>

      {/* ===== LAYER 13: Atmospheric particles — floating golden motes ===== */}
      <g id="particles" opacity="0.15">
        <circle cx="150" cy="380" r="1.5" fill="#4ECDC4" />
        <circle cx="380" cy="350" r="1" fill="#4ECDC4" />
        <circle cx="620" cy="390" r="1.2" fill="#7B9E6B" />
        <circle cx="850" cy="360" r="1.5" fill="#4ECDC4" />
        <circle cx="1050" cy="345" r="1" fill="#4ECDC4" />
        <circle cx="1300" cy="370" r="1.3" fill="#7B9E6B" />
        <circle cx="1550" cy="350" r="1" fill="#4ECDC4" />
        <circle cx="1750" cy="375" r="1.2" fill="#4ECDC4" />
      </g>

      {/* ===== LAYER 14: Ground plane — ties everything together ===== */}
      <rect x="0" y="600" width="1920" height="2.5" fill="#4ECDC4" opacity="0.1" />
      <rect x="0" y="605" width="1920" height="1.5" fill="#4ECDC4" opacity="0.05" />
    </svg>
  );
}
