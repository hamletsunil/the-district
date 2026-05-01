/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Charlotte skyline silhouette for "Why Charlotte Said No Just Once".
 *
 * Recognizable Uptown silhouette, left-to-right (north-south Tryon corridor):
 *   - Truist Center (modern glass)
 *   - Hearst Tower (with characteristic "crown" cornice)
 *   - Bank of America Corporate Center (the Crown Building, 871 ft, distinctive
 *     pyramidal crown with spire — Charlotte's most-photographed silhouette)
 *   - Duke Energy Center (angular notched top)
 *   - 300 South Tryon (glass slab)
 * Plus:
 *   - Bank of America Stadium silhouette (football oval, low and wide on the right)
 *   - Lynx Blue Line tracks + a hint of the light-rail pole in the foreground
 *   - Beatties Ford Road treeline (a low foreground band, in homage to the
 *     historically-Black corridor that recurs in council utterances throughout
 *     this article)
 *
 * Palette: Catawba teal #00B4D8 primary on deep Carolina navy. All gradients
 * pull from the article's accent palette (matches tokens.css [data-theme="charlotte"]).
 */
export function CharlotteSkylineSVG() {
  return (
    <svg
      viewBox="0 0 1920 700"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        {/* Primary building gradient — Catawba teal, dissolving toward base */}
        <linearGradient id="charlotte-bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00B4D8" stopOpacity="1.00" />
          <stop offset="55%" stopColor="#0EA5C9" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#1E7C95" stopOpacity="0.78" />
        </linearGradient>
        {/* Secondary / background buildings (further away, lower opacity) */}
        <linearGradient id="charlotte-bldgLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6EC4D6" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#3A8FA8" stopOpacity="0.55" />
        </linearGradient>
        {/* Stadium silhouette gradient — softer */}
        <linearGradient id="charlotte-stadium" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5C9" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#0a1726" stopOpacity="0.10" />
        </linearGradient>
        {/* Foreground tree band — Beatties Ford homage */}
        <linearGradient id="charlotte-trees" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5C9" stopOpacity="0.46" />
          <stop offset="100%" stopColor="#0a1726" stopOpacity="0.18" />
        </linearGradient>
        {/* Hazy bg ridge — distant suburb silhouette */}
        <linearGradient id="charlotte-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#0a1726" stopOpacity="0.05" />
        </linearGradient>
        {/* Soft glow under building tops */}
        <filter id="charlotte-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Light-rail track gradient */}
        <linearGradient id="charlotte-rail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6EC4D6" stopOpacity="0" />
          <stop offset="50%" stopColor="#6EC4D6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6EC4D6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Distant haze / suburban ridgeline (very faint) */}
      <path
        d="M 0 540
           L 180 510 L 320 525 L 480 500 L 640 520 L 820 505
           L 980 525 L 1180 500 L 1380 520 L 1560 510 L 1760 530 L 1920 515
           L 1920 700 L 0 700 Z"
        fill="url(#charlotte-haze)"
      />

      {/* Bank of America Stadium — left of the skyline center, low oval suggestion */}
      <g opacity="0.85">
        <ellipse cx="320" cy="488" rx="180" ry="40" fill="url(#charlotte-stadium)" />
        <path
          d="M 165 488 Q 320 430 475 488 L 475 510 Q 320 470 165 510 Z"
          fill="url(#charlotte-stadium)"
        />
        {/* stadium "spine" / top trusses */}
        <path
          d="M 200 470 L 220 460 L 260 458 L 320 455 L 380 458 L 420 460 L 440 470"
          stroke="#6EC4D6"
          strokeWidth="2"
          strokeOpacity="0.6"
          fill="none"
        />
      </g>

      {/* === UPTOWN SKYLINE (cluster, center-right of frame) === */}

      {/* Background slabs (further away) */}
      <g opacity="0.75">
        <rect x="640" y="380" width="60" height="170" fill="url(#charlotte-bldgLight)" />
        <rect x="710" y="350" width="48" height="200" fill="url(#charlotte-bldgLight)" />
        <rect x="1240" y="370" width="55" height="180" fill="url(#charlotte-bldgLight)" />
        <rect x="1310" y="340" width="50" height="210" fill="url(#charlotte-bldgLight)" />
      </g>

      {/* Truist Center — left-of-cluster, modern glass slab */}
      <g filter="url(#charlotte-glow)">
        <rect x="780" y="290" width="68" height="260" fill="url(#charlotte-bldg)" />
        {/* window grid (very subtle) */}
        <rect x="794" y="320" width="40" height="220" fill="none" stroke="#0a1726" strokeOpacity="0.15" strokeWidth="1" />
        {/* top mast */}
        <rect x="809" y="270" width="10" height="22" fill="url(#charlotte-bldg)" />
      </g>

      {/* Hearst Tower — distinctive cornice "petals" on top */}
      <g filter="url(#charlotte-glow)">
        <rect x="870" y="265" width="62" height="285" fill="url(#charlotte-bldg)" />
        {/* signature crown — three "petal" notches at the cornice */}
        <path
          d="M 870 265
             L 870 245 L 882 245 L 882 255 L 894 255 L 894 245 L 906 245
             L 906 255 L 918 255 L 918 245 L 932 245 L 932 265 Z"
          fill="url(#charlotte-bldg)"
        />
      </g>

      {/* Bank of America Corporate Center — THE Crown Building (centerpiece) */}
      <g filter="url(#charlotte-glow)">
        {/* main shaft */}
        <rect x="945" y="190" width="86" height="360" fill="url(#charlotte-bldg)" />
        {/* setbacks two-thirds up */}
        <rect x="950" y="220" width="76" height="20" fill="url(#charlotte-bldg)" />
        {/* the iconic crown — pyramidal, hollow-look */}
        <path
          d="M 945 190
             L 962 145 L 988 130 L 1014 145 L 1031 190 Z"
          fill="url(#charlotte-bldg)"
        />
        {/* spire */}
        <path
          d="M 982 130 L 988 88 L 994 130 Z"
          fill="#00B4D8"
          opacity="0.9"
        />
        {/* tiny aviation light at very top */}
        <circle cx="988" cy="86" r="2.5" fill="#F59E0B" />
      </g>

      {/* Duke Energy Center — angular notched top, right of BoA */}
      <g filter="url(#charlotte-glow)">
        <rect x="1050" y="240" width="74" height="310" fill="url(#charlotte-bldg)" />
        {/* notched top */}
        <path
          d="M 1050 240
             L 1050 220 L 1078 220 L 1078 205 L 1096 205 L 1096 220 L 1124 220 L 1124 240 Z"
          fill="url(#charlotte-bldg)"
        />
        {/* secondary mast */}
        <rect x="1083" y="190" width="8" height="18" fill="url(#charlotte-bldg)" />
      </g>

      {/* 300 South Tryon — modern glass slab to the right */}
      <g filter="url(#charlotte-glow)">
        <rect x="1140" y="305" width="58" height="245" fill="url(#charlotte-bldg)" />
        {/* angled top corner (the "wedge" feature) */}
        <path
          d="M 1140 305
             L 1140 285 L 1198 305 Z"
          fill="url(#charlotte-bldg)"
        />
      </g>

      {/* === FOREGROUND === */}

      {/* Beatties Ford Road treeline — a low band of trees, west-side reference */}
      <g opacity="0.85">
        <path
          d="M 0 600
             Q 60 580 90 590 Q 120 575 160 588 Q 200 572 240 586
             Q 280 574 320 590 Q 360 578 400 585 Q 440 572 480 586
             L 480 700 L 0 700 Z"
          fill="url(#charlotte-trees)"
        />
        {/* a few suggested tree silhouettes poking up */}
        <circle cx="80" cy="582" r="14" fill="url(#charlotte-trees)" />
        <circle cx="180" cy="578" r="16" fill="url(#charlotte-trees)" />
        <circle cx="280" cy="580" r="13" fill="url(#charlotte-trees)" />
        <circle cx="380" cy="576" r="15" fill="url(#charlotte-trees)" />
      </g>

      {/* Lynx Blue Line — horizontal track + utility pole hint, mid-foreground */}
      <g>
        <line x1="0" y1="640" x2="1920" y2="640" stroke="url(#charlotte-rail)" strokeWidth="2" />
        <line x1="0" y1="650" x2="1920" y2="650" stroke="url(#charlotte-rail)" strokeWidth="1.5" />
        {/* OCS pole every ~250px */}
        {[240, 490, 740, 990, 1240, 1490, 1740].map((x) => (
          <g key={x}>
            <line x1={x} y1="612" x2={x} y2="640" stroke="#6EC4D6" strokeOpacity="0.4" strokeWidth="1.5" />
            <line x1={x - 18} y1="618" x2={x + 18} y2="618" stroke="#6EC4D6" strokeOpacity="0.4" strokeWidth="1.5" />
          </g>
        ))}
      </g>

      {/* Right-side foreground tree band (mirrors Beatties Ford on left) */}
      <g opacity="0.75">
        <path
          d="M 1440 605
             Q 1480 588 1520 598 Q 1560 582 1600 596
             Q 1640 584 1680 596 Q 1720 582 1760 598 Q 1800 588 1840 596
             Q 1880 584 1920 600
             L 1920 700 L 1440 700 Z"
          fill="url(#charlotte-trees)"
        />
        <circle cx="1500" cy="592" r="12" fill="url(#charlotte-trees)" />
        <circle cx="1620" cy="588" r="14" fill="url(#charlotte-trees)" />
        <circle cx="1740" cy="592" r="13" fill="url(#charlotte-trees)" />
        <circle cx="1860" cy="590" r="11" fill="url(#charlotte-trees)" />
      </g>

      {/* Subtle Excelsior Club homage — small low rectangle on far left, suggesting
          a one-story historic building on the Beatties Ford corridor */}
      <g opacity="0.85">
        <rect x="100" y="558" width="50" height="34" fill="url(#charlotte-bldg)" opacity="0.6" />
        {/* hint of a dormer/awning */}
        <path d="M 100 558 L 125 552 L 150 558 Z" fill="url(#charlotte-bldg)" opacity="0.5" />
      </g>
    </svg>
  );
}
