"use client";

/**
 * CivicSkyline — Editorial-quality city illustration
 * Modeled on The District's Piedmont/Lamorinda skyline technique:
 * layered composition, 3-stop gradients, warm window glows, hand-placed elements.
 */

export function CivicSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1920 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        {/* Primary building — civic slate blue */}
        <linearGradient id="cs-bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a6a8a" stopOpacity="0.88" />
          <stop offset="55%" stopColor="#3a5a7a" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#2a4a6a" stopOpacity="0.74" />
        </linearGradient>
        {/* Secondary buildings — lighter */}
        <linearGradient id="cs-bldgLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a7a9a" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#4a6a8a" stopOpacity="0.48" />
        </linearGradient>
        {/* Rolling hills */}
        <linearGradient id="cs-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5a7a" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#2a3a4a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#1a2a3a" stopOpacity="0.12" />
        </linearGradient>
        {/* Far hills — atmospheric */}
        <linearGradient id="cs-hillDeep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5a7a" stopOpacity="0.28" />
          <stop offset="50%" stopColor="#2a3a4a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a2a3a" stopOpacity="0.05" />
        </linearGradient>
        {/* Tree canopy — deep blue-green */}
        <linearGradient id="cs-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a4a3a" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#1a3a2e" stopOpacity="0.70" />
          <stop offset="100%" stopColor="#0a2a1e" stopOpacity="0.55" />
        </linearGradient>
        {/* Background trees — lighter */}
        <linearGradient id="cs-treeLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a5a4a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1a4a3a" stopOpacity="0.30" />
        </linearGradient>
        {/* City Hall dome — brighter, dignified */}
        <linearGradient id="cs-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a8aaa" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#5a7a9a" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#4a6a8a" stopOpacity="0.82" />
        </linearGradient>
        {/* Dome glow — radial warmth */}
        <radialGradient id="cs-domeGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#6a9aca" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4a6a8a" stopOpacity="0.00" />
        </radialGradient>
        {/* Roof gradient */}
        <linearGradient id="cs-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a7080" stopOpacity="0.80" />
          <stop offset="100%" stopColor="#3a5060" stopOpacity="0.60" />
        </linearGradient>
        {/* Glow filter for accent elements */}
        <filter id="cs-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Beacon glow for dome lantern */}
        <filter id="cs-beacon">
          <feGaussianBlur stdDeviation="8" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle ambient */}
        <filter id="cs-ambient">
          <feGaussianBlur stdDeviation="12" result="ambientGlow" />
          <feMerge>
            <feMergeNode in="ambientGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LAYER 1: Ground atmosphere ===== */}
      <ellipse cx="960" cy="680" rx="920" ry="80" fill="#2563eb" opacity="0.06" />
      <ellipse cx="400" cy="670" rx="380" ry="55" fill="#2563eb" opacity="0.04" />
      <ellipse cx="1520" cy="670" rx="380" ry="55" fill="#2563eb" opacity="0.04" />

      {/* ===== LAYER 2: Distant skyline silhouettes ===== */}
      <g id="cs-distant">
        <rect x="30" y="340" width="16" height="75" fill="url(#cs-hillDeep)" opacity="0.22" />
        <rect x="55" y="320" width="20" height="95" fill="url(#cs-hillDeep)" opacity="0.18" />
        <rect x="82" y="300" width="14" height="115" fill="url(#cs-hillDeep)" opacity="0.20" />
        <rect x="105" y="330" width="18" height="85" fill="url(#cs-hillDeep)" opacity="0.16" />
        <rect x="130" y="310" width="22" height="105" fill="url(#cs-hillDeep)" opacity="0.18" />
        <rect x="162" y="325" width="15" height="90" fill="url(#cs-hillDeep)" opacity="0.14" />

        <rect x="1710" y="330" width="18" height="85" fill="url(#cs-hillDeep)" opacity="0.20" />
        <rect x="1738" y="305" width="22" height="110" fill="url(#cs-hillDeep)" opacity="0.18" />
        <rect x="1768" y="320" width="14" height="95" fill="url(#cs-hillDeep)" opacity="0.16" />
        <rect x="1790" y="295" width="26" height="120" fill="url(#cs-hillDeep)" opacity="0.20" />
        <rect x="1825" y="310" width="18" height="105" fill="url(#cs-hillDeep)" opacity="0.14" />
        <rect x="1852" y="325" width="20" height="90" fill="url(#cs-hillDeep)" opacity="0.12" />
        <rect x="1880" y="340" width="22" height="75" fill="url(#cs-hillDeep)" opacity="0.10" />
      </g>

      {/* ===== LAYER 3: Rolling hills — four layered wave paths ===== */}
      <g id="cs-hills">
        <path d="M0 520 Q200 440 480 480 Q700 510 960 460 Q1200 420 1440 470 Q1700 510 1920 450 L1920 700 L0 700Z" fill="url(#cs-hillDeep)" opacity="0.35" />
        <path d="M0 560 Q240 500 520 530 Q780 555 960 510 Q1160 470 1400 520 Q1660 560 1920 500 L1920 700 L0 700Z" fill="url(#cs-hill)" opacity="0.40" />
        <path d="M0 590 Q300 555 600 570 Q820 580 960 555 Q1120 535 1340 560 Q1620 585 1920 550 L1920 700 L0 700Z" fill="url(#cs-hill)" opacity="0.50" />
        <path d="M0 620 Q350 600 700 610 Q900 615 960 605 Q1060 595 1250 608 Q1580 620 1920 600 L1920 700 L0 700Z" fill="url(#cs-bldg)" opacity="0.25" />
      </g>

      {/* ===== LAYER 4: Background trees ===== */}
      <g id="cs-bg-trees">
        <circle cx="120" cy="530" r="28" fill="url(#cs-treeLight)" opacity="0.40" />
        <circle cx="135" cy="525" r="24" fill="url(#cs-treeLight)" opacity="0.35" />
        <circle cx="108" cy="535" r="20" fill="url(#cs-treeLight)" opacity="0.38" />

        <circle cx="320" cy="520" r="32" fill="url(#cs-treeLight)" opacity="0.38" />
        <circle cx="340" cy="515" r="26" fill="url(#cs-treeLight)" opacity="0.33" />
        <circle cx="305" cy="525" r="22" fill="url(#cs-treeLight)" opacity="0.36" />

        <circle cx="1580" cy="515" r="30" fill="url(#cs-treeLight)" opacity="0.36" />
        <circle cx="1600" cy="510" r="25" fill="url(#cs-treeLight)" opacity="0.32" />
        <circle cx="1565" cy="520" r="22" fill="url(#cs-treeLight)" opacity="0.34" />

        <circle cx="1780" cy="530" r="26" fill="url(#cs-treeLight)" opacity="0.38" />
        <circle cx="1795" cy="525" r="22" fill="url(#cs-treeLight)" opacity="0.34" />
      </g>

      {/* ===== LAYER 5: Left residential — suburban houses ===== */}
      <g id="cs-left-houses">
        {/* House 1 */}
        <rect x="200" y="555" width="65" height="50" fill="url(#cs-bldgLight)" opacity="0.62" />
        <polygon points="195,555 232,520 270,555" fill="url(#cs-roof)" opacity="0.68" />
        <rect x="218" y="570" width="10" height="18" rx="1" fill="#0f1419" opacity="0.65" />
        <rect x="220" y="572" width="6" height="14" rx="0.5" fill="#f59e0b" opacity="0.22" />
        <rect x="240" y="568" width="8" height="8" fill="#0f1419" opacity="0.60" />
        <rect x="241.5" y="569.5" width="5" height="5" fill="#2563eb" opacity="0.30" />
        <rect x="200" y="600" width="65" height="5" fill="#2a4a6a" opacity="0.30" />

        {/* House 2 — slightly larger */}
        <rect x="295" y="548" width="75" height="57" fill="url(#cs-bldg)" opacity="0.65" />
        <polygon points="290,548 332,505 375,548" fill="url(#cs-roof)" opacity="0.72" />
        <rect x="310" y="565" width="9" height="9" fill="#0f1419" opacity="0.62" />
        <rect x="311.5" y="566.5" width="6" height="6" fill="#2563eb" opacity="0.36" />
        <rect x="328" y="565" width="9" height="9" fill="#0f1419" opacity="0.58" />
        <rect x="329.5" y="566.5" width="6" height="6" fill="#f59e0b" opacity="0.28" />
        <rect x="345" y="565" width="9" height="9" fill="#0f1419" opacity="0.62" />
        <rect x="346.5" y="566.5" width="6" height="6" fill="#2563eb" opacity="0.32" />
        <rect x="322" y="582" width="12" height="23" rx="1.5" fill="#0f1419" opacity="0.70" />
        <rect x="324" y="584" width="8" height="19" rx="1" fill="#f59e0b" opacity="0.20" />

        {/* House 3 — small cottage */}
        <rect x="400" y="560" width="55" height="45" fill="url(#cs-bldgLight)" opacity="0.58" />
        <polygon points="396,560 427,530 460,560" fill="url(#cs-roof)" opacity="0.64" />
        <rect x="414" y="575" width="8" height="8" fill="#0f1419" opacity="0.58" />
        <rect x="415.5" y="576.5" width="5" height="5" fill="#2563eb" opacity="0.38" />
        <rect x="434" y="575" width="8" height="8" fill="#0f1419" opacity="0.55" />
        <rect x="435.5" y="576.5" width="5" height="5" fill="#2563eb" opacity="0.28" />
      </g>

      {/* ===== LAYER 6: Church with steeple ===== */}
      <g id="cs-church">
        <rect x="510" y="490" width="80" height="115" fill="url(#cs-bldg)" opacity="0.75" />
        <rect x="543" y="440" width="14" height="50" fill="url(#cs-bldg)" opacity="0.78" />
        <polygon points="536,440 550,410 564,440" fill="url(#cs-dome)" opacity="0.72" />
        {/* Cross */}
        <rect x="548" y="398" width="4" height="16" fill="#6a8aaa" opacity="0.65" />
        <rect x="544" y="404" width="12" height="3" fill="#6a8aaa" opacity="0.60" />
        {/* Arched windows */}
        <rect x="524" y="520" width="12" height="22" rx="6" fill="#0f1419" opacity="0.68" />
        <rect x="526" y="522" width="8" height="18" rx="4" fill="#2563eb" opacity="0.40" />
        <rect x="548" y="520" width="12" height="22" rx="6" fill="#0f1419" opacity="0.65" />
        <rect x="550" y="522" width="8" height="18" rx="4" fill="#2563eb" opacity="0.35" />
        <rect x="572" y="520" width="12" height="22" rx="6" fill="#0f1419" opacity="0.68" />
        <rect x="574" y="522" width="8" height="18" rx="4" fill="#f59e0b" opacity="0.25" />
        {/* Rose window */}
        <circle cx="550" cy="502" r="10" fill="#0f1419" opacity="0.60" />
        <circle cx="550" cy="502" r="7" fill="#2563eb" opacity="0.35" />
      </g>

      {/* ===== LAYER 7: Office building ===== */}
      <g id="cs-office">
        <rect x="630" y="460" width="70" height="145" fill="url(#cs-bldg)" opacity="0.72" />
        <rect x="630" y="458" width="70" height="4" fill="#5a7a9a" opacity="0.50" />
        {/* Windows — hand-placed, varying opacity */}
        <rect x="640" y="474" width="10" height="8" fill="#0f1419" opacity="0.65" />
        <rect x="641.5" y="475.5" width="7" height="5" fill="#2563eb" opacity="0.38" />
        <rect x="658" y="474" width="10" height="8" fill="#0f1419" opacity="0.62" />
        <rect x="659.5" y="475.5" width="7" height="5" fill="#2563eb" opacity="0.32" />
        <rect x="676" y="474" width="10" height="8" fill="#0f1419" opacity="0.65" />
        <rect x="677.5" y="475.5" width="7" height="5" fill="#f59e0b" opacity="0.26" />

        <rect x="640" y="492" width="10" height="8" fill="#0f1419" opacity="0.60" />
        <rect x="641.5" y="493.5" width="7" height="5" fill="#2563eb" opacity="0.34" />
        <rect x="658" y="492" width="10" height="8" fill="#0f1419" opacity="0.64" />
        <rect x="659.5" y="493.5" width="7" height="5" fill="#2563eb" opacity="0.40" />
        <rect x="676" y="492" width="10" height="8" fill="#0f1419" opacity="0.58" />
        <rect x="677.5" y="493.5" width="7" height="5" fill="#2563eb" opacity="0.30" />

        <rect x="640" y="510" width="10" height="8" fill="#0f1419" opacity="0.62" />
        <rect x="641.5" y="511.5" width="7" height="5" fill="#f59e0b" opacity="0.24" />
        <rect x="658" y="510" width="10" height="8" fill="#0f1419" opacity="0.66" />
        <rect x="659.5" y="511.5" width="7" height="5" fill="#2563eb" opacity="0.36" />
        <rect x="676" y="510" width="10" height="8" fill="#0f1419" opacity="0.60" />
        <rect x="677.5" y="511.5" width="7" height="5" fill="#2563eb" opacity="0.42" />

        <rect x="640" y="528" width="10" height="8" fill="#0f1419" opacity="0.64" />
        <rect x="641.5" y="529.5" width="7" height="5" fill="#2563eb" opacity="0.28" />
        <rect x="658" y="528" width="10" height="8" fill="#0f1419" opacity="0.60" />
        <rect x="659.5" y="529.5" width="7" height="5" fill="#2563eb" opacity="0.38" />
        <rect x="676" y="528" width="10" height="8" fill="#0f1419" opacity="0.62" />
        <rect x="677.5" y="529.5" width="7" height="5" fill="#f59e0b" opacity="0.22" />

        <rect x="640" y="546" width="10" height="8" fill="#0f1419" opacity="0.58" />
        <rect x="641.5" y="547.5" width="7" height="5" fill="#2563eb" opacity="0.34" />
        <rect x="658" y="546" width="10" height="8" fill="#0f1419" opacity="0.62" />
        <rect x="659.5" y="547.5" width="7" height="5" fill="#2563eb" opacity="0.30" />
        <rect x="676" y="546" width="10" height="8" fill="#0f1419" opacity="0.60" />
        <rect x="677.5" y="547.5" width="7" height="5" fill="#2563eb" opacity="0.36" />
      </g>

      {/* ===== LAYER 8: CITY HALL — the centerpiece ===== */}
      <g id="cs-city-hall">
        {/* Dome glow aura */}
        <ellipse cx="960" cy="380" rx="120" ry="80" fill="url(#cs-domeGlow)" />

        {/* Main building body */}
        <rect x="840" y="440" width="240" height="165" fill="url(#cs-bldg)" opacity="0.82" />
        {/* Cornice */}
        <rect x="835" y="436" width="250" height="6" fill="#5a7a9a" opacity="0.60" />
        <rect x="838" y="440" width="244" height="2" fill="#6a8aaa" opacity="0.35" />

        {/* Columns — 6, hand-placed */}
        <rect x="860" y="448" width="8" height="145" rx="3" fill="#6a8aaa" opacity="0.55" />
        <rect x="898" y="448" width="8" height="145" rx="3" fill="#6a8aaa" opacity="0.52" />
        <rect x="936" y="448" width="8" height="145" rx="3" fill="#6a8aaa" opacity="0.58" />
        <rect x="974" y="448" width="8" height="145" rx="3" fill="#6a8aaa" opacity="0.52" />
        <rect x="1012" y="448" width="8" height="145" rx="3" fill="#6a8aaa" opacity="0.55" />
        <rect x="1050" y="448" width="8" height="145" rx="3" fill="#6a8aaa" opacity="0.50" />

        {/* Pediment — classical triangle */}
        <polygon points="830,440 960,370 1090,440" fill="url(#cs-dome)" opacity="0.78" />
        <line x1="835" y1="438" x2="960" y2="372" stroke="#6a8aaa" strokeWidth="1.5" opacity="0.30" />
        <line x1="1085" y1="438" x2="960" y2="372" stroke="#6a8aaa" strokeWidth="1.5" opacity="0.30" />

        {/* Dome */}
        <ellipse cx="960" cy="370" rx="50" ry="42" fill="url(#cs-dome)" opacity="0.85" />
        {/* Dome lantern */}
        <rect x="953" y="322" width="14" height="20" rx="2" fill="#6a8aaa" opacity="0.80" />
        <ellipse cx="960" cy="320" rx="10" ry="7" fill="#6a8aaa" opacity="0.75" />
        {/* Beacon glow */}
        <circle cx="960" cy="318" r="6" fill="#2563eb" opacity="0.40" filter="url(#cs-beacon)" />

        {/* Flagpole + flag */}
        <rect x="958" y="295" width="3" height="28" fill="#6a8aaa" opacity="0.70" />
        <rect x="961" y="296" width="18" height="10" rx="1" fill="#dc2626" opacity="0.55" />
        <rect x="961" y="296" width="18" height="4" fill="#dc2626" opacity="0.60" />
        <rect x="961" y="303" width="18" height="3" fill="#f0f0f0" opacity="0.35" />

        {/* Grand entrance */}
        <rect x="940" y="548" width="40" height="57" rx="20" fill="#0f1419" opacity="0.72" />
        <rect x="943" y="551" width="34" height="51" rx="17" fill="#2563eb" opacity="0.18" />

        {/* Arched windows — left side */}
        <rect x="862" y="470" width="16" height="28" rx="8" fill="#0f1419" opacity="0.68" />
        <rect x="864.5" y="472.5" width="11" height="23" rx="5.5" fill="#2563eb" opacity="0.42" />
        <rect x="892" y="470" width="16" height="28" rx="8" fill="#0f1419" opacity="0.65" />
        <rect x="894.5" y="472.5" width="11" height="23" rx="5.5" fill="#f59e0b" opacity="0.28" />
        {/* Arched windows — right side */}
        <rect x="1012" y="470" width="16" height="28" rx="8" fill="#0f1419" opacity="0.68" />
        <rect x="1014.5" y="472.5" width="11" height="23" rx="5.5" fill="#2563eb" opacity="0.38" />
        <rect x="1042" y="470" width="16" height="28" rx="8" fill="#0f1419" opacity="0.65" />
        <rect x="1044.5" y="472.5" width="11" height="23" rx="5.5" fill="#2563eb" opacity="0.45" />

        {/* Second row windows */}
        <rect x="862" y="520" width="16" height="22" fill="#0f1419" opacity="0.62" />
        <rect x="864.5" y="522" width="11" height="18" fill="#2563eb" opacity="0.34" />
        <rect x="892" y="520" width="16" height="22" fill="#0f1419" opacity="0.58" />
        <rect x="894.5" y="522" width="11" height="18" fill="#f59e0b" opacity="0.22" />
        <rect x="1012" y="520" width="16" height="22" fill="#0f1419" opacity="0.62" />
        <rect x="1014.5" y="522" width="11" height="18" fill="#2563eb" opacity="0.40" />
        <rect x="1042" y="520" width="16" height="22" fill="#0f1419" opacity="0.60" />
        <rect x="1044.5" y="522" width="11" height="18" fill="#2563eb" opacity="0.32" />

        {/* Steps */}
        <rect x="900" y="605" width="120" height="8" fill="#4a6a8a" opacity="0.35" />
        <rect x="910" y="598" width="100" height="7" fill="#4a6a8a" opacity="0.30" />
        <rect x="920" y="592" width="80" height="6" fill="#4a6a8a" opacity="0.25" />
      </g>

      {/* ===== LAYER 9: Water tower ===== */}
      <g id="cs-water-tower">
        <rect x="1150" y="510" width="6" height="95" fill="#4a6a8a" opacity="0.50" />
        <rect x="1180" y="510" width="6" height="95" fill="#4a6a8a" opacity="0.48" />
        {/* Cross brace */}
        <line x1="1153" y1="540" x2="1183" y2="570" stroke="#4a6a8a" strokeWidth="2" opacity="0.30" />
        <line x1="1183" y1="540" x2="1153" y2="570" stroke="#4a6a8a" strokeWidth="2" opacity="0.28" />
        {/* Tank */}
        <ellipse cx="1168" cy="500" rx="32" ry="20" fill="url(#cs-bldg)" opacity="0.68" />
        <rect x="1140" y="492" width="56" height="16" fill="url(#cs-bldg)" opacity="0.65" />
        <rect x="1140" y="490" width="56" height="3" fill="#5a7a9a" opacity="0.40" />
      </g>

      {/* ===== LAYER 10: Right buildings ===== */}
      <g id="cs-right-bldgs">
        {/* Apartment building */}
        <rect x="1250" y="470" width="85" height="135" fill="url(#cs-bldg)" opacity="0.70" />
        <rect x="1250" y="468" width="85" height="4" fill="#5a7a9a" opacity="0.45" />
        {/* Windows */}
        <rect x="1262" y="484" width="10" height="10" fill="#0f1419" opacity="0.62" />
        <rect x="1263.5" y="485.5" width="7" height="7" fill="#2563eb" opacity="0.36" />
        <rect x="1282" y="484" width="10" height="10" fill="#0f1419" opacity="0.58" />
        <rect x="1283.5" y="485.5" width="7" height="7" fill="#f59e0b" opacity="0.24" />
        <rect x="1302" y="484" width="10" height="10" fill="#0f1419" opacity="0.64" />
        <rect x="1303.5" y="485.5" width="7" height="7" fill="#2563eb" opacity="0.40" />
        <rect x="1322" y="484" width="10" height="10" fill="#0f1419" opacity="0.56" />

        <rect x="1262" y="504" width="10" height="10" fill="#0f1419" opacity="0.60" />
        <rect x="1263.5" y="505.5" width="7" height="7" fill="#2563eb" opacity="0.32" />
        <rect x="1282" y="504" width="10" height="10" fill="#0f1419" opacity="0.64" />
        <rect x="1283.5" y="505.5" width="7" height="7" fill="#2563eb" opacity="0.38" />
        <rect x="1302" y="504" width="10" height="10" fill="#0f1419" opacity="0.58" />
        <rect x="1303.5" y="505.5" width="7" height="7" fill="#f59e0b" opacity="0.26" />
        <rect x="1322" y="504" width="10" height="10" fill="#0f1419" opacity="0.62" />
        <rect x="1323.5" y="505.5" width="7" height="7" fill="#2563eb" opacity="0.34" />

        <rect x="1262" y="524" width="10" height="10" fill="#0f1419" opacity="0.64" />
        <rect x="1263.5" y="525.5" width="7" height="7" fill="#2563eb" opacity="0.42" />
        <rect x="1282" y="524" width="10" height="10" fill="#0f1419" opacity="0.56" />
        <rect x="1283.5" y="525.5" width="7" height="7" fill="#2563eb" opacity="0.30" />
        <rect x="1302" y="524" width="10" height="10" fill="#0f1419" opacity="0.60" />
        <rect x="1303.5" y="525.5" width="7" height="7" fill="#2563eb" opacity="0.36" />
        <rect x="1322" y="524" width="10" height="10" fill="#0f1419" opacity="0.58" />
        <rect x="1323.5" y="525.5" width="7" height="7" fill="#f59e0b" opacity="0.20" />

        {/* School building */}
        <rect x="1380" y="520" width="100" height="85" fill="url(#cs-bldg)" opacity="0.68" />
        <rect x="1380" y="518" width="100" height="4" fill="#5a7a9a" opacity="0.42" />
        <rect x="1420" y="500" width="22" height="22" fill="url(#cs-dome)" opacity="0.55" />
        {/* School windows */}
        <rect x="1394" y="540" width="12" height="16" fill="#0f1419" opacity="0.60" />
        <rect x="1396" y="542" width="8" height="12" fill="#2563eb" opacity="0.35" />
        <rect x="1418" y="540" width="12" height="16" fill="#0f1419" opacity="0.56" />
        <rect x="1420" y="542" width="8" height="12" fill="#f59e0b" opacity="0.22" />
        <rect x="1442" y="540" width="12" height="16" fill="#0f1419" opacity="0.62" />
        <rect x="1444" y="542" width="8" height="12" fill="#2563eb" opacity="0.38" />
        <rect x="1466" y="540" width="12" height="16" fill="#0f1419" opacity="0.58" />
        <rect x="1468" y="542" width="8" height="12" fill="#2563eb" opacity="0.30" />
      </g>

      {/* ===== LAYER 11: Right residential ===== */}
      <g id="cs-right-houses">
        <rect x="1520" y="548" width="60" height="55" fill="url(#cs-bldgLight)" opacity="0.60" />
        <polygon points="1516,548 1550,512 1584,548" fill="url(#cs-roof)" opacity="0.66" />
        <rect x="1536" y="565" width="8" height="8" fill="#0f1419" opacity="0.60" />
        <rect x="1537.5" y="566.5" width="5" height="5" fill="#2563eb" opacity="0.34" />
        <rect x="1554" y="565" width="8" height="8" fill="#0f1419" opacity="0.56" />
        <rect x="1555.5" y="566.5" width="5" height="5" fill="#f59e0b" opacity="0.26" />
        <rect x="1542" y="580" width="10" height="23" rx="1" fill="#0f1419" opacity="0.65" />
        <rect x="1544" y="582" width="6" height="19" rx="0.5" fill="#f59e0b" opacity="0.18" />

        <rect x="1610" y="555" width="55" height="48" fill="url(#cs-bldgLight)" opacity="0.56" />
        <polygon points="1607,555 1637,525 1668,555" fill="url(#cs-roof)" opacity="0.62" />
        <rect x="1622" y="568" width="8" height="8" fill="#0f1419" opacity="0.58" />
        <rect x="1623.5" y="569.5" width="5" height="5" fill="#2563eb" opacity="0.30" />
        <rect x="1640" y="568" width="8" height="8" fill="#0f1419" opacity="0.54" />
        <rect x="1641.5" y="569.5" width="5" height="5" fill="#2563eb" opacity="0.36" />
      </g>

      {/* ===== LAYER 12: Foreground trees flanking city hall ===== */}
      <g id="cs-fg-trees">
        {/* Left cluster */}
        <rect x="770" y="560" width="5" height="45" fill="#1a3a2e" opacity="0.50" />
        <circle cx="773" cy="540" r="30" fill="url(#cs-tree)" opacity="0.72" />
        <circle cx="758" cy="548" r="24" fill="url(#cs-tree)" opacity="0.65" />
        <circle cx="788" cy="545" r="22" fill="url(#cs-tree)" opacity="0.68" />
        <circle cx="770" cy="530" r="18" fill="url(#cs-tree)" opacity="0.58" />
        <circle cx="780" cy="535" r="15" fill="url(#cs-treeLight)" opacity="0.42" />

        {/* Right cluster */}
        <rect x="1108" y="555" width="5" height="50" fill="#1a3a2e" opacity="0.48" />
        <circle cx="1110" cy="535" r="28" fill="url(#cs-tree)" opacity="0.70" />
        <circle cx="1095" cy="542" r="22" fill="url(#cs-tree)" opacity="0.62" />
        <circle cx="1125" cy="540" r="24" fill="url(#cs-tree)" opacity="0.66" />
        <circle cx="1108" cy="526" r="16" fill="url(#cs-tree)" opacity="0.55" />
        <circle cx="1118" cy="530" r="14" fill="url(#cs-treeLight)" opacity="0.40" />

        {/* Scattered small trees */}
        <rect x="470" y="565" width="4" height="38" fill="#1a3a2e" opacity="0.42" />
        <circle cx="472" cy="550" r="18" fill="url(#cs-tree)" opacity="0.58" />
        <circle cx="463" cy="555" r="14" fill="url(#cs-tree)" opacity="0.52" />
        <circle cx="480" cy="553" r="15" fill="url(#cs-treeLight)" opacity="0.45" />

        <rect x="1195" y="560" width="4" height="42" fill="#1a3a2e" opacity="0.44" />
        <circle cx="1197" cy="544" r="20" fill="url(#cs-tree)" opacity="0.60" />
        <circle cx="1186" cy="550" r="16" fill="url(#cs-tree)" opacity="0.54" />
        <circle cx="1207" cy="548" r="17" fill="url(#cs-treeLight)" opacity="0.42" />

        <rect x="1680" y="558" width="4" height="44" fill="#1a3a2e" opacity="0.46" />
        <circle cx="1682" cy="540" r="22" fill="url(#cs-tree)" opacity="0.62" />
        <circle cx="1670" cy="546" r="18" fill="url(#cs-tree)" opacity="0.56" />
        <circle cx="1694" cy="543" r="16" fill="url(#cs-treeLight)" opacity="0.44" />
      </g>

      {/* ===== LAYER 13: Ground plane ===== */}
      <g id="cs-ground">
        <rect x="0" y="600" width="1920" height="100" fill="#1a2a3a" opacity="0.40" />
        {/* Path lines */}
        <line x1="180" y1="604" x2="500" y2="604" stroke="#4a6a8a" strokeWidth="0.8" opacity="0.15" />
        <line x1="1130" y1="604" x2="1700" y2="604" stroke="#4a6a8a" strokeWidth="0.8" opacity="0.15" />
        {/* Grass tufts */}
        <ellipse cx="250" cy="608" rx="40" ry="4" fill="#1a4a3a" opacity="0.20" />
        <ellipse cx="450" cy="610" rx="35" ry="3" fill="#1a4a3a" opacity="0.18" />
        <ellipse cx="1450" cy="608" rx="45" ry="4" fill="#1a4a3a" opacity="0.22" />
        <ellipse cx="1650" cy="610" rx="30" ry="3" fill="#1a4a3a" opacity="0.16" />
      </g>
    </svg>
  );
}
