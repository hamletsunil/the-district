export default function PiedmontSkylineSVG() {
  return (
    <svg
      viewBox="0 0 1920 700"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        {/* Primary building gradient — warm gold, dissolving at base */}
        <linearGradient id="pm-bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a44a" stopOpacity="1.00" />
          <stop offset="55%" stopColor="#c49440" stopOpacity="0.77" />
          <stop offset="100%" stopColor="#b08436" stopOpacity="0.80" />
        </linearGradient>
        {/* Secondary / background buildings — lighter gold */}
        <linearGradient id="pm-bldgLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c06a" stopOpacity="0.84" />
          <stop offset="100%" stopColor="#d4a44a" stopOpacity="0.55" />
        </linearGradient>
        {/* Hills gradient — gold into forest dark */}
        <linearGradient id="pm-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a44a" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#9a7a3a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#111a12" stopOpacity="0.15" />
        </linearGradient>
        {/* Deep hills — far background, very faint */}
        <linearGradient id="pm-hillDeep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a44a" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#9a7a3a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#111a12" stopOpacity="0.06" />
        </linearGradient>
        {/* Tree canopy — deep forest green */}
        <linearGradient id="pm-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d5a2e" stopOpacity="0.92" />
          <stop offset="60%" stopColor="#1e4a1f" stopOpacity="0.80" />
          <stop offset="100%" stopColor="#153416" stopOpacity="0.65" />
        </linearGradient>
        {/* Lighter tree canopy — background trees */}
        <linearGradient id="pm-treeLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a6a3b" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#2d5a2e" stopOpacity="0.35" />
        </linearGradient>
        {/* Oakland distant skyline — very muted */}
        <linearGradient id="pm-oakland" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a9e93" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#111a12" stopOpacity="0.05" />
        </linearGradient>
        {/* Water / pool gradient */}
        <linearGradient id="pm-pool" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a8fa8" stopOpacity="0.50" />
          <stop offset="50%" stopColor="#5aa0b8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#4a8fa8" stopOpacity="0.40" />
        </linearGradient>
        {/* Data viz accent glow */}
        <linearGradient id="pm-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a44a" stopOpacity="0.77" />
          <stop offset="100%" stopColor="#e8c06a" stopOpacity="0.54" />
        </linearGradient>
        {/* City Hall tower glow — warm gold radial */}
        <radialGradient id="pm-towerGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#e8c06a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d4a44a" stopOpacity="0.00" />
        </radialGradient>
        {/* Glow filter for data elements */}
        <filter id="pm-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft glow for City Hall tower beacon */}
        <filter id="pm-beacon">
          <feGaussianBlur stdDeviation="8" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle ambient glow */}
        <filter id="pm-ambient">
          <feGaussianBlur stdDeviation="12" result="ambientGlow" />
          <feMerge>
            <feMergeNode in="ambientGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LAYER 1: Ground glow — warm golden atmosphere ===== */}
      <ellipse cx="960" cy="680" rx="900" ry="80" fill="#d4a44a" opacity="0.10" />
      <ellipse cx="400" cy="660" rx="350" ry="50" fill="#d4a44a" opacity="0.06" />
      <ellipse cx="1520" cy="660" rx="350" ry="50" fill="#d4a44a" opacity="0.06" />

      {/* ===== LAYER 2: Oakland distant skyline — Piedmont is surrounded ===== */}
      <g id="oakland-border">
        {/* Far left Oakland buildings — faint silhouettes on the horizon */}
        <rect x="20" y="320" width="18" height="80" fill="url(#pm-oakland)" opacity="0.25" />
        <rect x="45" y="300" width="22" height="100" fill="url(#pm-oakland)" opacity="0.20" />
        <rect x="75" y="280" width="15" height="120" fill="url(#pm-oakland)" opacity="0.22" />
        <rect x="98" y="310" width="20" height="90" fill="url(#pm-oakland)" opacity="0.18" />
        <rect x="125" y="290" width="25" height="110" fill="url(#pm-oakland)" opacity="0.20" />
        <rect x="158" y="305" width="18" height="95" fill="url(#pm-oakland)" opacity="0.16" />

        {/* Far right Oakland buildings */}
        <rect x="1720" y="310" width="20" height="90" fill="url(#pm-oakland)" opacity="0.22" />
        <rect x="1748" y="285" width="24" height="115" fill="url(#pm-oakland)" opacity="0.20" />
        <rect x="1780" y="300" width="16" height="100" fill="url(#pm-oakland)" opacity="0.18" />
        <rect x="1805" y="275" width="28" height="125" fill="url(#pm-oakland)" opacity="0.22" />
        <rect x="1840" y="295" width="20" height="105" fill="url(#pm-oakland)" opacity="0.16" />
        <rect x="1868" y="310" width="22" height="90" fill="url(#pm-oakland)" opacity="0.14" />
        <rect x="1895" y="325" width="25" height="75" fill="url(#pm-oakland)" opacity="0.12" />

        {/* Oakland text-level hint — very subtle border markers */}
        <line x1="0" y1="398" x2="200" y2="398" stroke="#9a9e93" strokeWidth="0.8" opacity="0.12" strokeDasharray="4 8" />
        <line x1="1700" y1="398" x2="1920" y2="398" stroke="#9a9e93" strokeWidth="0.8" opacity="0.12" strokeDasharray="4 8" />
      </g>

      {/* ===== LAYER 3: Rolling hills — four layered waves, Piedmont's terrain ===== */}
      <g id="rolling-hills">
        {/* Farthest hills — most transparent, highest, gentle rolling */}
        <path
          d="M0,380 Q100,350 220,370 Q360,395 500,360 Q640,330 780,355 Q920,380 1060,345 Q1200,315 1340,340 Q1480,365 1620,335 Q1760,310 1860,330 Q1920,340 1920,340 L1920,700 L0,700Z"
          fill="url(#pm-hillDeep)"
        />
        {/* Middle-far hills */}
        <path
          d="M0,430 Q140,405 280,420 Q420,440 560,415 Q700,390 840,410 Q980,430 1120,405 Q1260,385 1400,405 Q1540,425 1680,400 Q1800,385 1880,395 L1920,390 L1920,700 L0,700Z"
          fill="url(#pm-hillDeep)"
          opacity="0.85"
        />
        {/* Middle hills — moderate opacity */}
        <path
          d="M0,480 Q120,455 260,470 Q400,490 540,460 Q680,435 820,455 Q960,475 1100,450 Q1240,430 1380,450 Q1520,470 1660,445 Q1800,425 1880,440 L1920,435 L1920,700 L0,700Z"
          fill="url(#pm-hill)"
        />
        {/* Front hills — most opaque, lowest */}
        <path
          d="M0,540 Q180,520 360,535 Q540,550 720,525 Q900,505 1060,525 Q1220,545 1400,520 Q1580,500 1740,520 Q1860,535 1920,525 L1920,700 L0,700Z"
          fill="url(#pm-hill)"
        />
      </g>

      {/* ===== LAYER 4: Background tree canopy — dense oak coverage ===== */}
      <g id="background-trees" opacity="0.60">
        {/* Left background canopy cluster */}
        <circle cx="60" cy="410" r="28" fill="url(#pm-treeLight)" />
        <circle cx="100" cy="400" r="32" fill="url(#pm-treeLight)" opacity="0.75" />
        <circle cx="145" cy="415" r="26" fill="url(#pm-treeLight)" opacity="0.65" />
        <circle cx="190" cy="405" r="30" fill="url(#pm-treeLight)" opacity="0.70" />

        {/* Center-left background canopy */}
        <circle cx="380" cy="420" r="24" fill="url(#pm-treeLight)" opacity="0.55" />
        <circle cx="420" cy="410" r="28" fill="url(#pm-treeLight)" opacity="0.60" />
        <circle cx="460" cy="425" r="22" fill="url(#pm-treeLight)" opacity="0.50" />

        {/* Center-right background canopy */}
        <circle cx="1400" cy="415" r="26" fill="url(#pm-treeLight)" opacity="0.55" />
        <circle cx="1440" cy="405" r="30" fill="url(#pm-treeLight)" opacity="0.60" />
        <circle cx="1490" cy="420" r="24" fill="url(#pm-treeLight)" opacity="0.50" />

        {/* Right background canopy */}
        <circle cx="1680" cy="410" r="28" fill="url(#pm-treeLight)" opacity="0.55" />
        <circle cx="1720" cy="400" r="32" fill="url(#pm-treeLight)" opacity="0.60" />
        <circle cx="1770" cy="415" r="24" fill="url(#pm-treeLight)" opacity="0.50" />
        <circle cx="1820" cy="408" r="26" fill="url(#pm-treeLight)" opacity="0.45" />
      </g>

      {/* ===== LAYER 5: Residential homes on hillsides (left area) ===== */}
      <g id="left-residences" transform="translate(220, 0)">
        {/* Hillside slope hint */}
        <path d="M0,490 Q60,470 120,455 Q180,445 240,438" stroke="#d4a44a" strokeWidth="0.8" opacity="0.15" fill="none" />

        {/* House 1 — large Piedmont home */}
        <rect x="10" y="472" width="28" height="22" rx="1" fill="url(#pm-bldgLight)" opacity="0.55" />
        <polygon points="10,472 24,458 38,472" fill="url(#pm-bldg)" opacity="0.50" />
        <rect x="18" y="479" width="6" height="8" rx="0.5" fill="#111a12" opacity="0.50" />

        {/* House 2 */}
        <rect x="55" y="462" width="32" height="24" rx="1" fill="url(#pm-bldg)" opacity="0.52" />
        <polygon points="55,462 71,446 87,462" fill="url(#pm-bldg)" opacity="0.48" />
        <rect x="64" y="470" width="5" height="7" rx="0.5" fill="#111a12" opacity="0.45" />
        <rect x="74" y="470" width="5" height="7" rx="0.5" fill="#111a12" opacity="0.45" />

        {/* House 3 — larger estate */}
        <rect x="105" y="452" width="36" height="26" rx="1" fill="url(#pm-bldgLight)" opacity="0.50" />
        <polygon points="105,452 123,434 141,452" fill="url(#pm-bldg)" opacity="0.48" />
        <rect x="115" y="460" width="6" height="8" rx="0.5" fill="#111a12" opacity="0.40" />
        <rect x="126" y="460" width="6" height="8" rx="0.5" fill="#111a12" opacity="0.40" />

        {/* House 4 */}
        <rect x="160" y="445" width="26" height="20" rx="1" fill="url(#pm-bldg)" opacity="0.46" />
        <polygon points="160,445 173,433 186,445" fill="url(#pm-bldg)" opacity="0.44" />

        {/* House 5 */}
        <rect x="200" y="438" width="30" height="22" rx="1" fill="url(#pm-bldgLight)" opacity="0.42" />
        <polygon points="200,438 215,424 230,438" fill="url(#pm-bldg)" opacity="0.40" />
      </g>

      {/* ===== LAYER 6: Mid-ground trees around residences ===== */}
      <g id="mid-trees-left">
        {/* Oak tree between houses — left side */}
        <g transform="translate(260, 0)">
          <rect x="12" y="460" width="8" height="35" fill="#1e4a1f" opacity="0.65" />
          <circle cx="16" cy="438" r="22" fill="url(#pm-tree)" opacity="0.72" />
          <circle cx="0" cy="450" r="16" fill="#2d5a2e" opacity="0.68" />
          <circle cx="30" cy="448" r="18" fill="url(#pm-treeLight)" opacity="0.60" />
          <circle cx="16" cy="422" r="14" fill="#3a6a3b" opacity="0.55" />
        </g>

        {/* Another oak — left of City Hall */}
        <g transform="translate(480, 0)">
          <rect x="15" y="470" width="10" height="40" fill="#1e4a1f" opacity="0.70" />
          <path d="M20,478 L5,460" stroke="#1e4a1f" strokeWidth="3.5" strokeLinecap="round" opacity="0.60" />
          <path d="M22,474 L38,458" stroke="#1e4a1f" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <circle cx="20" cy="438" r="28" fill="url(#pm-tree)" opacity="0.78" />
          <circle cx="-2" cy="452" r="18" fill="#2d5a2e" opacity="0.70" />
          <circle cx="40" cy="448" r="20" fill="url(#pm-tree)" opacity="0.65" />
          <circle cx="20" cy="418" r="18" fill="#3a6a3b" opacity="0.60" />
          <circle cx="-8" cy="435" r="12" fill="url(#pm-treeLight)" opacity="0.50" />
        </g>
      </g>

      {/* ===== LAYER 7: PIEDMONT CITY HALL — Centerpiece, Mediterranean/Spanish Colonial ===== */}
      <g id="city-hall" transform="translate(660, 0)">
        {/* Tower glow — subtle warm radiance behind the tower */}
        <ellipse cx="120" cy="340" rx="100" ry="120" fill="url(#pm-towerGlow)" opacity="0.40" />

        {/* Main building body — wide Mediterranean structure */}
        <rect x="0" y="460" width="240" height="140" rx="3" fill="url(#pm-bldg)" opacity="0.78" />

        {/* Arched windows — first floor */}
        <rect x="15" y="520" width="14" height="22" rx="1" fill="#111a12" opacity="0.55" />
        <path d="M15,520 Q22,512 29,520" fill="url(#pm-bldg)" opacity="0.65" />
        <rect x="40" y="520" width="14" height="22" rx="1" fill="#111a12" opacity="0.50" />
        <path d="M40,520 Q47,512 54,520" fill="url(#pm-bldg)" opacity="0.60" />
        <rect x="65" y="520" width="14" height="22" rx="1" fill="#111a12" opacity="0.55" />
        <path d="M65,520 Q72,512 79,520" fill="url(#pm-bldg)" opacity="0.65" />

        {/* Right wing windows */}
        <rect x="162" y="520" width="14" height="22" rx="1" fill="#111a12" opacity="0.55" />
        <path d="M162,520 Q169,512 176,520" fill="url(#pm-bldg)" opacity="0.65" />
        <rect x="187" y="520" width="14" height="22" rx="1" fill="#111a12" opacity="0.50" />
        <path d="M187,520 Q194,512 201,520" fill="url(#pm-bldg)" opacity="0.60" />
        <rect x="212" y="520" width="14" height="22" rx="1" fill="#111a12" opacity="0.55" />
        <path d="M212,520 Q219,512 226,520" fill="url(#pm-bldg)" opacity="0.65" />

        {/* Second floor windows — smaller */}
        <rect x="20" y="478" width="10" height="14" rx="1" fill="#111a12" opacity="0.45" />
        <rect x="42" y="478" width="10" height="14" rx="1" fill="#111a12" opacity="0.45" />
        <rect x="65" y="478" width="10" height="14" rx="1" fill="#111a12" opacity="0.45" />
        <rect x="168" y="478" width="10" height="14" rx="1" fill="#111a12" opacity="0.45" />
        <rect x="190" y="478" width="10" height="14" rx="1" fill="#111a12" opacity="0.45" />
        <rect x="213" y="478" width="10" height="14" rx="1" fill="#111a12" opacity="0.45" />

        {/* Central entrance — grand arched doorway */}
        <rect x="95" y="540" width="50" height="60" rx="3" fill="#111a12" opacity="0.65" />
        <path d="M95,540 Q120,518 145,540" fill="url(#pm-bldg)" opacity="0.80" />
        {/* Entrance steps */}
        <rect x="90" y="598" width="60" height="3" fill="#d4a44a" opacity="0.40" />
        <rect x="88" y="603" width="64" height="2.5" fill="#d4a44a" opacity="0.25" />

        {/* Horizontal cornice line */}
        <rect x="0" y="458" width="240" height="4" fill="#d4a44a" opacity="0.60" />
        <rect x="0" y="510" width="240" height="2" fill="#d4a44a" opacity="0.35" />

        {/* === Central Tower — the distinctive City Hall tower === */}
        <g transform="translate(95, 0)">
          {/* Tower base — wider than shaft, sits on building */}
          <rect x="-5" y="410" width="60" height="52" fill="url(#pm-bldg)" opacity="0.90" />
          {/* Decorative band at tower base */}
          <rect x="-5" y="410" width="60" height="4" fill="#e8c06a" opacity="0.70" />
          <rect x="-5" y="455" width="60" height="4" fill="#e8c06a" opacity="0.65" />

          {/* Tower windows — paired arched windows on each face */}
          <rect x="5" y="420" width="8" height="16" rx="1" fill="#111a12" opacity="0.60" />
          <path d="M5,420 Q9,414 13,420" fill="url(#pm-bldg)" opacity="0.70" />
          <rect x="18" y="420" width="8" height="16" rx="1" fill="#111a12" opacity="0.60" />
          <path d="M18,420 Q22,414 26,420" fill="url(#pm-bldg)" opacity="0.70" />
          <rect x="30" y="420" width="8" height="16" rx="1" fill="#111a12" opacity="0.55" />
          <path d="M30,420 Q34,414 38,420" fill="url(#pm-bldg)" opacity="0.65" />
          <rect x="42" y="420" width="8" height="16" rx="1" fill="#111a12" opacity="0.55" />
          <path d="M42,420 Q46,414 50,420" fill="url(#pm-bldg)" opacity="0.65" />

          {/* Tower shaft — narrower upper section */}
          <rect x="5" y="350" width="40" height="64" fill="url(#pm-bldg)" opacity="0.95" />
          {/* Upper tower band */}
          <rect x="3" y="350" width="44" height="3" fill="#e8c06a" opacity="0.75" />
          <rect x="3" y="405" width="44" height="3" fill="#e8c06a" opacity="0.60" />

          {/* Upper tower windows */}
          <rect x="12" y="360" width="6" height="14" rx="1" fill="#111a12" opacity="0.65" />
          <rect x="32" y="360" width="6" height="14" rx="1" fill="#111a12" opacity="0.65" />
          <rect x="12" y="382" width="6" height="12" rx="1" fill="#111a12" opacity="0.55" />
          <rect x="32" y="382" width="6" height="12" rx="1" fill="#111a12" opacity="0.55" />

          {/* Belfry / open arched section at top */}
          <rect x="8" y="320" width="34" height="34" fill="url(#pm-bldg)" opacity="0.96" />
          <rect x="6" y="318" width="38" height="4" fill="#e8c06a" opacity="0.80" />
          {/* Open arches in belfry */}
          <rect x="12" y="326" width="8" height="20" rx="4" fill="#111a12" opacity="0.70" />
          <rect x="30" y="326" width="8" height="20" rx="4" fill="#111a12" opacity="0.70" />

          {/* Pyramidal tile roof — Spanish colonial */}
          <polygon points="25,280 2,320 48,320" fill="url(#pm-bldg)" opacity="1.00" />
          {/* Roof ridge lines */}
          <line x1="25" y1="280" x2="2" y2="320" stroke="#e8c06a" strokeWidth="1" opacity="0.50" />
          <line x1="25" y1="280" x2="48" y2="320" stroke="#e8c06a" strokeWidth="1" opacity="0.50" />

          {/* Finial / cross at top */}
          <rect x="23" y="265" width="4" height="18" fill="#e8c06a" opacity="0.90" />
          <rect x="19" y="272" width="12" height="3" fill="#e8c06a" opacity="0.85" />

          {/* Tower beacon glow */}
          <circle cx="25" cy="265" r="6" fill="#e8c06a" opacity="0.50" filter="url(#pm-beacon)" />
          <circle cx="25" cy="265" r="2.5" fill="#e8c06a" opacity="0.95" />
        </g>

        {/* Side wing rooflines — red tile roof suggestion */}
        <path d="M0,460 Q60,448 120,460" fill="url(#pm-bldg)" opacity="0.55" />
        <path d="M120,460 Q180,448 240,460" fill="url(#pm-bldg)" opacity="0.55" />
      </g>

      {/* ===== LAYER 8: Trees flanking City Hall ===== */}
      <g id="cityhall-trees">
        {/* Large oak right of City Hall */}
        <g transform="translate(920, 0)">
          <rect x="18" y="480" width="12" height="50" fill="#1e4a1f" opacity="0.72" />
          <path d="M24,490 L8,470" stroke="#1e4a1f" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
          <path d="M28,485 L45,468" stroke="#1e4a1f" strokeWidth="3.5" strokeLinecap="round" opacity="0.60" />
          <circle cx="24" cy="445" r="32" fill="url(#pm-tree)" opacity="0.80" />
          <circle cx="0" cy="462" r="22" fill="#2d5a2e" opacity="0.75" />
          <circle cx="48" cy="458" r="24" fill="url(#pm-tree)" opacity="0.70" />
          <circle cx="24" cy="420" r="22" fill="#3a6a3b" opacity="0.65" />
          <circle cx="55" cy="440" r="16" fill="url(#pm-treeLight)" opacity="0.55" />
          <circle cx="-10" cy="445" r="14" fill="url(#pm-treeLight)" opacity="0.50" />
        </g>

        {/* Smaller oak between City Hall and Exedra */}
        <g transform="translate(1000, 0)" opacity="0.80">
          <rect x="10" y="490" width="8" height="38" fill="#1e4a1f" opacity="0.65" />
          <circle cx="14" cy="465" r="22" fill="url(#pm-tree)" opacity="0.72" />
          <circle cx="0" cy="475" r="15" fill="#2d5a2e" opacity="0.65" />
          <circle cx="28" cy="472" r="16" fill="url(#pm-treeLight)" opacity="0.58" />
          <circle cx="14" cy="448" r="14" fill="#3a6a3b" opacity="0.50" />
        </g>
      </g>

      {/* ===== LAYER 9: THE EXEDRA — Curved stone colonnade in Piedmont Park ===== */}
      <g id="exedra" transform="translate(1060, 0)">
        {/* Curved back wall — sweeping arc */}
        <path
          d="M0,540 Q20,510 50,495 Q80,484 110,480 Q140,484 170,495 Q200,510 220,540"
          stroke="#d4a44a"
          strokeWidth="3"
          fill="none"
          opacity="0.65"
        />
        {/* Inner curve — second wall line */}
        <path
          d="M8,540 Q28,514 55,500 Q82,490 110,487 Q138,490 165,500 Q192,514 212,540"
          stroke="#d4a44a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.40"
        />

        {/* Columns — evenly spaced along the curve */}
        <rect x="18" y="508" width="5" height="32" fill="url(#pm-bldg)" opacity="0.70" />
        <rect x="38" y="498" width="5" height="42" fill="url(#pm-bldg)" opacity="0.72" />
        <rect x="58" y="492" width="5" height="48" fill="url(#pm-bldg)" opacity="0.75" />
        <rect x="78" y="488" width="5" height="52" fill="url(#pm-bldg)" opacity="0.78" />
        <rect x="98" y="486" width="5" height="54" fill="url(#pm-bldg)" opacity="0.80" />
        <rect x="118" y="486" width="5" height="54" fill="url(#pm-bldg)" opacity="0.78" />
        <rect x="138" y="488" width="5" height="52" fill="url(#pm-bldg)" opacity="0.75" />
        <rect x="158" y="492" width="5" height="48" fill="url(#pm-bldg)" opacity="0.72" />
        <rect x="178" y="498" width="5" height="42" fill="url(#pm-bldg)" opacity="0.70" />
        <rect x="198" y="508" width="5" height="32" fill="url(#pm-bldg)" opacity="0.65" />

        {/* Column capitals — small rectangles at top of each column */}
        <rect x="16" y="506" width="9" height="4" fill="#e8c06a" opacity="0.60" />
        <rect x="36" y="496" width="9" height="4" fill="#e8c06a" opacity="0.62" />
        <rect x="56" y="490" width="9" height="4" fill="#e8c06a" opacity="0.65" />
        <rect x="76" y="486" width="9" height="4" fill="#e8c06a" opacity="0.68" />
        <rect x="96" y="484" width="9" height="4" fill="#e8c06a" opacity="0.70" />
        <rect x="116" y="484" width="9" height="4" fill="#e8c06a" opacity="0.68" />
        <rect x="136" y="486" width="9" height="4" fill="#e8c06a" opacity="0.65" />
        <rect x="156" y="490" width="9" height="4" fill="#e8c06a" opacity="0.62" />
        <rect x="176" y="496" width="9" height="4" fill="#e8c06a" opacity="0.60" />
        <rect x="196" y="506" width="9" height="4" fill="#e8c06a" opacity="0.55" />

        {/* Stone base / platform */}
        <path
          d="M0,540 L0,548 Q50,555 110,558 Q170,555 220,548 L220,540"
          fill="url(#pm-bldg)"
          opacity="0.40"
        />

        {/* Steps leading down from Exedra */}
        <rect x="60" y="558" width="100" height="3" fill="#d4a44a" opacity="0.30" />
        <rect x="55" y="563" width="110" height="2.5" fill="#d4a44a" opacity="0.22" />
        <rect x="50" y="568" width="120" height="2" fill="#d4a44a" opacity="0.15" />
      </g>

      {/* ===== LAYER 10: Community Pool ===== */}
      <g id="community-pool" transform="translate(1330, 0)">
        {/* Pool building — low rec center structure */}
        <rect x="0" y="530" width="70" height="70" rx="2" fill="url(#pm-bldgLight)" opacity="0.55" />
        <rect x="5" y="545" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
        <rect x="18" y="545" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
        <rect x="5" y="560" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
        <rect x="18" y="560" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
        {/* Entrance */}
        <rect x="40" y="565" width="18" height="35" rx="1" fill="#111a12" opacity="0.50" />

        {/* Pool water — elongated rectangle */}
        <rect x="80" y="555" width="100" height="40" rx="3" fill="url(#pm-pool)" opacity="0.60" />
        {/* Lane lines */}
        <line x1="100" y1="558" x2="100" y2="592" stroke="#5aa0b8" strokeWidth="0.8" opacity="0.40" />
        <line x1="120" y1="558" x2="120" y2="592" stroke="#5aa0b8" strokeWidth="0.8" opacity="0.40" />
        <line x1="140" y1="558" x2="140" y2="592" stroke="#5aa0b8" strokeWidth="0.8" opacity="0.40" />
        <line x1="160" y1="558" x2="160" y2="592" stroke="#5aa0b8" strokeWidth="0.8" opacity="0.40" />

        {/* Pool deck edge */}
        <rect x="78" y="552" width="104" height="3" fill="#d4a44a" opacity="0.30" />
      </g>

      {/* ===== LAYER 11: Right-side residences and school buildings ===== */}
      <g id="right-section">
        {/* Piedmont High School — larger institutional building */}
        <g transform="translate(1490, 0)">
          <rect x="0" y="500" width="80" height="100" rx="3" fill="url(#pm-bldg)" opacity="0.60" />
          <rect x="80" y="510" width="50" height="90" rx="2" fill="url(#pm-bldgLight)" opacity="0.55" />
          {/* School windows — grid pattern */}
          <rect x="8" y="515" width="8" height="10" rx="1" fill="#111a12" opacity="0.45" />
          <rect x="22" y="515" width="8" height="10" rx="1" fill="#111a12" opacity="0.45" />
          <rect x="36" y="515" width="8" height="10" rx="1" fill="#111a12" opacity="0.45" />
          <rect x="50" y="515" width="8" height="10" rx="1" fill="#111a12" opacity="0.45" />
          <rect x="64" y="515" width="8" height="10" rx="1" fill="#111a12" opacity="0.45" />
          <rect x="8" y="535" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="22" y="535" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="36" y="535" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="50" y="535" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="64" y="535" width="8" height="10" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="8" y="555" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
          <rect x="22" y="555" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
          <rect x="36" y="555" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
          <rect x="50" y="555" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
          <rect x="64" y="555" width="8" height="10" rx="1" fill="#111a12" opacity="0.35" />
          {/* Wing windows */}
          <rect x="88" y="525" width="7" height="9" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="100" y="525" width="7" height="9" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="112" y="525" width="7" height="9" rx="1" fill="#111a12" opacity="0.40" />
          <rect x="88" y="545" width="7" height="9" rx="1" fill="#111a12" opacity="0.35" />
          <rect x="100" y="545" width="7" height="9" rx="1" fill="#111a12" opacity="0.35" />
          <rect x="112" y="545" width="7" height="9" rx="1" fill="#111a12" opacity="0.35" />
          {/* Entrance */}
          <rect x="30" y="575" width="20" height="25" rx="1" fill="#111a12" opacity="0.55" />
          <path d="M30,575 Q40,565 50,575" fill="url(#pm-bldg)" opacity="0.50" />
          {/* Cornice */}
          <rect x="0" y="498" width="80" height="3" fill="#d4a44a" opacity="0.45" />
        </g>

        {/* More hillside homes — right edge */}
        <g transform="translate(1620, 0)">
          <rect x="10" y="485" width="24" height="18" rx="1" fill="url(#pm-bldgLight)" opacity="0.45" />
          <polygon points="10,485 22,474 34,485" fill="url(#pm-bldg)" opacity="0.42" />

          <rect x="50" y="478" width="28" height="20" rx="1" fill="url(#pm-bldg)" opacity="0.40" />
          <polygon points="50,478 64,466 78,478" fill="url(#pm-bldg)" opacity="0.38" />

          <rect x="92" y="472" width="22" height="16" rx="1" fill="url(#pm-bldgLight)" opacity="0.38" />
          <polygon points="92,472 103,462 114,472" fill="url(#pm-bldg)" opacity="0.36" />
        </g>
      </g>

      {/* ===== LAYER 12: Dense foreground oak tree canopy — Piedmont's signature ===== */}
      <g id="foreground-oaks">
        {/* Major oak tree #1 — far left */}
        <g transform="translate(60, 0)">
          <rect x="22" y="520" width="14" height="60" fill="#153416" opacity="0.75" />
          <path d="M29,530 L10,510" stroke="#153416" strokeWidth="5" strokeLinecap="round" opacity="0.70" />
          <path d="M33,525 L52,508" stroke="#153416" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
          <circle cx="29" cy="470" r="40" fill="url(#pm-tree)" opacity="0.82" />
          <circle cx="5" cy="488" r="28" fill="#2d5a2e" opacity="0.78" />
          <circle cx="52" cy="484" r="30" fill="url(#pm-tree)" opacity="0.72" />
          <circle cx="29" cy="442" r="26" fill="#3a6a3b" opacity="0.65" />
          <circle cx="-8" cy="468" r="18" fill="url(#pm-treeLight)" opacity="0.55" />
          <circle cx="65" cy="470" r="20" fill="url(#pm-treeLight)" opacity="0.60" />
          <circle cx="29" cy="425" r="16" fill="#3a6a3b" opacity="0.50" />
        </g>

        {/* Major oak tree #2 — left of center */}
        <g transform="translate(180, 0)">
          <rect x="18" y="530" width="12" height="55" fill="#153416" opacity="0.72" />
          <path d="M24,535 L8,518" stroke="#153416" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
          <path d="M28,530 L44,515" stroke="#153416" strokeWidth="3.5" strokeLinecap="round" opacity="0.60" />
          <circle cx="24" cy="485" r="35" fill="url(#pm-tree)" opacity="0.78" />
          <circle cx="2" cy="500" r="24" fill="#2d5a2e" opacity="0.72" />
          <circle cx="46" cy="496" r="26" fill="url(#pm-tree)" opacity="0.68" />
          <circle cx="24" cy="458" r="22" fill="#3a6a3b" opacity="0.60" />
          <circle cx="55" cy="480" r="16" fill="url(#pm-treeLight)" opacity="0.50" />
        </g>

        {/* Major oak tree #3 — right of pool */}
        <g transform="translate(1460, 0)">
          <rect x="20" y="510" width="12" height="50" fill="#153416" opacity="0.70" />
          <path d="M26,518 L10,500" stroke="#153416" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
          <path d="M30,512 L46,498" stroke="#153416" strokeWidth="3.5" strokeLinecap="round" opacity="0.60" />
          <circle cx="26" cy="470" r="32" fill="url(#pm-tree)" opacity="0.76" />
          <circle cx="4" cy="485" r="22" fill="#2d5a2e" opacity="0.70" />
          <circle cx="46" cy="482" r="24" fill="url(#pm-tree)" opacity="0.65" />
          <circle cx="26" cy="445" r="20" fill="#3a6a3b" opacity="0.58" />
          <circle cx="55" cy="465" r="14" fill="url(#pm-treeLight)" opacity="0.48" />
        </g>

        {/* Major oak tree #4 — far right */}
        <g transform="translate(1780, 0)">
          <rect x="20" y="518" width="14" height="55" fill="#153416" opacity="0.72" />
          <path d="M27,525 L10,508" stroke="#153416" strokeWidth="4.5" strokeLinecap="round" opacity="0.68" />
          <path d="M32,520 L50,505" stroke="#153416" strokeWidth="4" strokeLinecap="round" opacity="0.62" />
          <circle cx="27" cy="475" r="36" fill="url(#pm-tree)" opacity="0.80" />
          <circle cx="3" cy="490" r="25" fill="#2d5a2e" opacity="0.74" />
          <circle cx="50" cy="486" r="28" fill="url(#pm-tree)" opacity="0.70" />
          <circle cx="27" cy="448" r="24" fill="#3a6a3b" opacity="0.62" />
          <circle cx="-8" cy="472" r="16" fill="url(#pm-treeLight)" opacity="0.52" />
          <circle cx="62" cy="470" r="18" fill="url(#pm-treeLight)" opacity="0.55" />
        </g>

        {/* Smaller accent trees filling gaps */}
        <g transform="translate(380, 0)" opacity="0.75">
          <rect x="10" y="535" width="8" height="40" fill="#153416" opacity="0.65" />
          <circle cx="14" cy="508" r="22" fill="url(#pm-tree)" opacity="0.70" />
          <circle cx="0" cy="518" r="15" fill="#2d5a2e" opacity="0.65" />
          <circle cx="28" cy="515" r="16" fill="url(#pm-treeLight)" opacity="0.55" />
        </g>

        <g transform="translate(1150, 0)" opacity="0.72">
          <rect x="10" y="530" width="8" height="42" fill="#153416" opacity="0.62" />
          <circle cx="14" cy="504" r="20" fill="url(#pm-tree)" opacity="0.68" />
          <circle cx="0" cy="514" r="14" fill="#2d5a2e" opacity="0.60" />
          <circle cx="26" cy="512" r="15" fill="url(#pm-treeLight)" opacity="0.52" />
        </g>

        <g transform="translate(1870, 0)" opacity="0.65">
          <rect x="8" y="530" width="8" height="38" fill="#153416" opacity="0.60" />
          <circle cx="12" cy="505" r="20" fill="url(#pm-tree)" opacity="0.65" />
          <circle cx="0" cy="515" r="14" fill="#2d5a2e" opacity="0.58" />
          <circle cx="24" cy="512" r="15" fill="url(#pm-treeLight)" opacity="0.48" />
        </g>
      </g>

      {/* ===== LAYER 13: Data visualization — meeting activity trend woven into landscape ===== */}
      <g id="data-trend">
        {/* Primary trend line — deliberation intensity over time */}
        <path
          d="M100,360 Q180,352 280,340 Q380,328 480,335 Q580,342 680,318 Q780,300 880,310 Q980,320 1080,305 Q1180,292 1280,298 Q1380,308 1480,295 Q1580,285 1680,292 Q1780,300 1860,296"
          stroke="#d4a44a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.35"
          strokeLinecap="round"
        />
        {/* Secondary line — word count trend, dashed */}
        <path
          d="M100,378 Q180,370 280,360 Q380,350 480,356 Q580,362 680,342 Q780,325 880,333 Q980,340 1080,328 Q1180,316 1280,322 Q1380,330 1480,318 Q1580,308 1680,315 Q1780,322 1860,318"
          stroke="#e8c06a"
          strokeWidth="1"
          fill="none"
          opacity="0.28"
          strokeLinecap="round"
          strokeDasharray="6 4"
        />

        {/* Data dots at peaks — key meeting moments */}
        <g filter="url(#pm-glow)">
          <circle cx="280" cy="340" r="3" fill="#d4a44a" opacity="0.70" />
          <circle cx="680" cy="318" r="3.5" fill="#d4a44a" opacity="0.75" />
          <circle cx="880" cy="310" r="3" fill="#e8c06a" opacity="0.65" />
          <circle cx="1080" cy="305" r="3.5" fill="#d4a44a" opacity="0.72" />
          <circle cx="1480" cy="295" r="3" fill="#d4a44a" opacity="0.68" />
          <circle cx="1680" cy="292" r="2.5" fill="#e8c06a" opacity="0.60" />
        </g>

        {/* Subtle tick marks under peak dots */}
        <line x1="680" y1="322" x2="680" y2="332" stroke="#d4a44a" strokeWidth="0.8" opacity="0.40" />
        <line x1="1080" y1="309" x2="1080" y2="319" stroke="#d4a44a" strokeWidth="0.8" opacity="0.35" />
        <line x1="1480" y1="299" x2="1480" y2="309" stroke="#d4a44a" strokeWidth="0.8" opacity="0.30" />

        {/* Connection arcs — analytical feel */}
        <g opacity="0.22">
          <path d="M280,340 Q480,310 680,318" stroke="#d4a44a" strokeWidth="1.2" strokeDasharray="8 6" fill="none" />
          <path d="M1080,305 Q1280,280 1480,295" stroke="#d4a44a" strokeWidth="1.2" strokeDasharray="8 6" fill="none" />
        </g>
      </g>

      {/* ===== LAYER 14: Foreground vegetation — grass and ground cover ===== */}
      <g id="foreground-vegetation">
        {/* Grass tufts along the ground */}
        <path d="M40,598 Q45,584 50,598" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.45" fill="none" />
        <path d="M150,596 Q156,582 162,596" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.38" fill="none" />
        <path d="M310,598 Q316,585 322,598" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.42" fill="none" />
        <path d="M550,596 Q556,583 562,596" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.35" fill="none" />
        <path d="M730,598 Q736,585 742,598" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.40" fill="none" />
        <path d="M980,596 Q986,582 992,596" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.36" fill="none" />
        <path d="M1200,598 Q1206,585 1212,598" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.38" fill="none" />
        <path d="M1390,596 Q1396,583 1402,596" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.42" fill="none" />
        <path d="M1560,598 Q1566,585 1572,598" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.34" fill="none" />
        <path d="M1750,596 Q1756,583 1762,596" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.38" fill="none" />
        <path d="M1880,598 Q1886,586 1892,598" stroke="#2d5a2e" strokeWidth="1.5" opacity="0.30" fill="none" />

        {/* Low shrubs / bushes */}
        <ellipse cx="420" cy="595" rx="14" ry="6" fill="url(#pm-treeLight)" opacity="0.38" />
        <ellipse cx="640" cy="596" rx="10" ry="5" fill="url(#pm-treeLight)" opacity="0.42" />
        <ellipse cx="1120" cy="594" rx="12" ry="5" fill="url(#pm-treeLight)" opacity="0.40" />
        <ellipse cx="1600" cy="596" rx="14" ry="6" fill="url(#pm-treeLight)" opacity="0.35" />
        <ellipse cx="1850" cy="595" rx="10" ry="5" fill="url(#pm-treeLight)" opacity="0.32" />
      </g>

      {/* ===== LAYER 15: Atmospheric particles — floating golden motes ===== */}
      <g id="particles" opacity="0.40">
        <circle cx="120" cy="360" r="1.5" fill="#d4a44a" />
        <circle cx="340" cy="380" r="1" fill="#e8c06a" />
        <circle cx="520" cy="350" r="1.2" fill="#d4a44a" />
        <circle cx="700" cy="370" r="1.5" fill="#e8c06a" />
        <circle cx="870" cy="340" r="1" fill="#d4a44a" />
        <circle cx="1020" cy="365" r="1.3" fill="#d4a44a" />
        <circle cx="1180" cy="355" r="1" fill="#e8c06a" />
        <circle cx="1350" cy="375" r="1.5" fill="#d4a44a" />
        <circle cx="1520" cy="345" r="1.2" fill="#e8c06a" />
        <circle cx="1660" cy="368" r="1" fill="#d4a44a" />
        <circle cx="1800" cy="352" r="1.3" fill="#d4a44a" />
        <circle cx="1900" cy="378" r="1" fill="#e8c06a" />
      </g>

      {/* Additional motes — deeper in the scene */}
      <g id="deep-particles" opacity="0.25">
        <circle cx="200" cy="420" r="1" fill="#d4a44a" />
        <circle cx="450" cy="440" r="0.8" fill="#e8c06a" />
        <circle cx="750" cy="410" r="1.2" fill="#d4a44a" />
        <circle cx="1100" cy="430" r="0.8" fill="#e8c06a" />
        <circle cx="1300" cy="415" r="1" fill="#d4a44a" />
        <circle cx="1550" cy="435" r="0.8" fill="#d4a44a" />
        <circle cx="1750" cy="420" r="1" fill="#e8c06a" />
      </g>

      {/* ===== LAYER 16: Ground plane — ties everything together ===== */}
      <rect x="0" y="600" width="1920" height="2.5" fill="#d4a44a" opacity="0.28" />
      <rect x="0" y="605" width="1920" height="1.5" fill="#d4a44a" opacity="0.12" />

      {/* ===== LAYER 17: Piedmont border outline — subtle boundary hint ===== */}
      <g id="border-markers" opacity="0.12">
        {/* Left border with Oakland */}
        <path
          d="M200,600 L200,420"
          stroke="#9a9e93"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        {/* Right border with Oakland */}
        <path
          d="M1720,600 L1720,420"
          stroke="#9a9e93"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
      </g>

      {/* ===== LAYER 18: Location labels ===== */}
      <text x="100" y="640" textAnchor="middle" fill="#9a9e93" fontSize="13" fontWeight="500" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.15em" opacity="0.35">OAKLAND</text>
      <text x="960" y="640" textAnchor="middle" fill="#d4a44a" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.14em" opacity="0.55">PIEDMONT</text>
      <text x="1820" y="640" textAnchor="middle" fill="#9a9e93" fontSize="13" fontWeight="500" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.15em" opacity="0.35">OAKLAND</text>
    </svg>
  );
}
