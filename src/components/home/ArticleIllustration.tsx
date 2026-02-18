/**
 * Article Illustrations - Premium Edition
 *
 * Elevated illustrations in Hamlet's geometric style
 * with gradients, shadows, glows, and rich details.
 */

import type { ReactElement } from "react";

type IllustrationType = "data-centers" | "housing" | "zoning" | "climate" | "oakland" | "san-francisco";

interface ArticleIllustrationProps {
  type: IllustrationType;
  className?: string;
}

export function ArticleIllustration({ type, className }: ArticleIllustrationProps) {
  const illustrations: Record<IllustrationType, ReactElement> = {
    "data-centers": <DataCentersIllustration />,
    housing: <HousingIllustration />,
    zoning: <ZoningIllustration />,
    climate: <ClimateIllustration />,
    oakland: <OaklandIllustration />,
    "san-francisco": <SanFranciscoIllustration />,
  };

  return (
    <div className={`illustration-container ${className || ""}`}>
      {illustrations[type]}
    </div>
  );
}

/**
 * Premium SVG Filters - Shared definitions
 */
function PremiumFilters() {
  return (
    <defs>
      {/* Soft drop shadow for depth */}
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.2" />
      </filter>

      {/* Ambient glow for tech elements */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Subtle inner shadow */}
      <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feOffset dx="0" dy="2" />
        <feGaussianBlur stdDeviation="2" result="offset-blur" />
        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
        <feFlood floodColor="black" floodOpacity="0.1" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>

      {/* Navy gradient */}
      <linearGradient id="navyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#164b7e" />
        <stop offset="100%" stopColor="#001d3d" />
      </linearGradient>

      {/* Deep navy gradient */}
      <linearGradient id="deepNavyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a3161" />
        <stop offset="100%" stopColor="#00152e" />
      </linearGradient>

      {/* Indigo gradient */}
      <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>

      {/* Coral gradient */}
      <linearGradient id="coralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>

      {/* Warm cream gradient */}
      <linearGradient id="creamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fff7ed" />
        <stop offset="100%" stopColor="#ffedd5" />
      </linearGradient>

      {/* Sage gradient */}
      <linearGradient id="sageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>

      {/* Sky gradient for backgrounds */}
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  );
}

/**
 * Data Centers: Premium geometric server towers with ambient glow
 */
function DataCentersIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PremiumFilters />

      {/* Background ambient glow */}
      <ellipse cx="140" cy="165" rx="130" ry="25" fill="#6366f1" opacity="0.08" />
      <ellipse cx="140" cy="165" rx="80" ry="15" fill="#818cf8" opacity="0.12" />

      {/* Connection lines with glow */}
      <g opacity="0.4">
        <path d="M55 90 Q80 70 100 90" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <path d="M130 60 Q150 40 170 60" stroke="#818cf8" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <path d="M200 80 Q220 60 240 80" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      </g>

      {/* Server Tower 1 - Left */}
      <g filter="url(#softShadow)">
        <rect x="25" y="55" width="55" height="105" rx="4" fill="url(#navyGradient)" />
        {/* Server slots with depth */}
        <rect x="32" y="65" width="41" height="10" rx="2" fill="#0a3161" />
        <rect x="32" y="80" width="41" height="10" rx="2" fill="#0a3161" />
        <rect x="32" y="95" width="41" height="10" rx="2" fill="#0a3161" />
        <rect x="32" y="110" width="41" height="10" rx="2" fill="#0a3161" />
        <rect x="32" y="125" width="41" height="10" rx="2" fill="#0a3161" />
        <rect x="32" y="140" width="41" height="10" rx="2" fill="#0a3161" />
        {/* Indicator lights with glow */}
        <g filter="url(#glow)">
          <circle cx="39" cy="70" r="2.5" fill="#818cf8" />
          <circle cx="39" cy="85" r="2.5" fill="#10b981" />
          <circle cx="39" cy="100" r="2.5" fill="#818cf8" />
          <circle cx="39" cy="115" r="2.5" fill="#10b981" />
          <circle cx="39" cy="130" r="2.5" fill="#818cf8" />
          <circle cx="39" cy="145" r="2.5" fill="#10b981" />
        </g>
        {/* Ventilation detail */}
        <rect x="55" y="67" width="12" height="1" rx="0.5" fill="#3a7ab5" opacity="0.5" />
        <rect x="55" y="70" width="12" height="1" rx="0.5" fill="#3a7ab5" opacity="0.5" />
        <rect x="55" y="73" width="12" height="1" rx="0.5" fill="#3a7ab5" opacity="0.5" />
      </g>

      {/* Server Tower 2 - Center (tallest, main focus) */}
      <g filter="url(#softShadow)">
        <rect x="95" y="25" width="70" height="135" rx="5" fill="url(#deepNavyGradient)" />
        {/* Front panel */}
        <rect x="100" y="30" width="60" height="125" rx="3" fill="#0a3161" opacity="0.5" />
        {/* Server slots */}
        <rect x="105" y="38" width="50" height="12" rx="2" fill="#001d3d" />
        <rect x="105" y="55" width="50" height="12" rx="2" fill="#001d3d" />
        <rect x="105" y="72" width="50" height="12" rx="2" fill="#001d3d" />
        <rect x="105" y="89" width="50" height="12" rx="2" fill="#001d3d" />
        <rect x="105" y="106" width="50" height="12" rx="2" fill="#001d3d" />
        <rect x="105" y="123" width="50" height="12" rx="2" fill="#001d3d" />
        <rect x="105" y="140" width="50" height="12" rx="2" fill="#001d3d" />
        {/* Indicator lights with strong glow */}
        <g filter="url(#glow)">
          <circle cx="114" cy="44" r="3" fill="#6366f1" />
          <circle cx="114" cy="61" r="3" fill="#6366f1" />
          <circle cx="114" cy="78" r="3" fill="#10b981" />
          <circle cx="114" cy="95" r="3" fill="#6366f1" />
          <circle cx="114" cy="112" r="3" fill="#10b981" />
          <circle cx="114" cy="129" r="3" fill="#6366f1" />
          <circle cx="114" cy="146" r="3" fill="#10b981" />
        </g>
        {/* Activity bars */}
        <rect x="125" y="43" width="20" height="2" rx="1" fill="#4f46e5" opacity="0.8" />
        <rect x="125" y="60" width="15" height="2" rx="1" fill="#4f46e5" opacity="0.6" />
        <rect x="125" y="77" width="25" height="2" rx="1" fill="#10b981" opacity="0.8" />
        <rect x="125" y="94" width="18" height="2" rx="1" fill="#4f46e5" opacity="0.7" />
        <rect x="125" y="111" width="22" height="2" rx="1" fill="#10b981" opacity="0.8" />
      </g>

      {/* Server Tower 3 - Right */}
      <g filter="url(#softShadow)">
        <rect x="180" y="45" width="60" height="115" rx="4" fill="url(#navyGradient)" />
        <rect x="187" y="55" width="46" height="10" rx="2" fill="#0f3d6e" />
        <rect x="187" y="70" width="46" height="10" rx="2" fill="#0f3d6e" />
        <rect x="187" y="85" width="46" height="10" rx="2" fill="#0f3d6e" />
        <rect x="187" y="100" width="46" height="10" rx="2" fill="#0f3d6e" />
        <rect x="187" y="115" width="46" height="10" rx="2" fill="#0f3d6e" />
        <rect x="187" y="130" width="46" height="10" rx="2" fill="#0f3d6e" />
        <rect x="187" y="145" width="46" height="10" rx="2" fill="#0f3d6e" />
        {/* Indicator lights */}
        <g filter="url(#glow)">
          <circle cx="195" cy="60" r="2.5" fill="#a5b4fc" />
          <circle cx="195" cy="75" r="2.5" fill="#10b981" />
          <circle cx="195" cy="90" r="2.5" fill="#a5b4fc" />
          <circle cx="195" cy="105" r="2.5" fill="#a5b4fc" />
          <circle cx="195" cy="120" r="2.5" fill="#10b981" />
          <circle cx="195" cy="135" r="2.5" fill="#a5b4fc" />
          <circle cx="195" cy="150" r="2.5" fill="#10b981" />
        </g>
      </g>

      {/* Small accent buildings */}
      <rect x="255" y="115" width="18" height="45" rx="2" fill="#0a3161" opacity="0.5" filter="url(#softShadow)" />
      <rect x="7" y="125" width="14" height="35" rx="2" fill="#0a3161" opacity="0.5" filter="url(#softShadow)" />

      {/* Floating data particles */}
      <circle cx="70" cy="40" r="2" fill="#818cf8" opacity="0.6" />
      <circle cx="210" cy="30" r="1.5" fill="#6366f1" opacity="0.5" />
      <circle cx="250" cy="50" r="2" fill="#a5b4fc" opacity="0.4" />
    </svg>
  );
}

/**
 * Housing: Premium neighborhood with NIMBY barriers
 */
function HousingIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PremiumFilters />

      {/* Ground with gradient */}
      <rect x="0" y="145" width="280" height="35" fill="url(#creamGradient)" opacity="0.4" />

      {/* Tree 1 - Large */}
      <g filter="url(#softShadow)">
        <circle cx="22" cy="115" r="22" fill="#86efac" />
        <circle cx="12" cy="125" r="14" fill="#4ade80" />
        <circle cx="35" cy="122" r="16" fill="#a7f3d0" />
        <rect x="18" y="135" width="8" height="20" fill="#059669" />
      </g>

      {/* House 1 - Left (approved, warm) */}
      <g filter="url(#softShadow)">
        <polygon points="55,95 90,55 125,95" fill="url(#coralGradient)" />
        <rect x="65" y="95" width="50" height="50" fill="url(#creamGradient)" />
        {/* Door */}
        <rect x="82" y="115" width="16" height="30" rx="1" fill="#fed7aa" />
        <circle cx="95" cy="132" r="1.5" fill="#f97316" />
        {/* Windows with reflection */}
        <rect x="70" y="102" width="12" height="10" rx="1" fill="#fef3c7" />
        <rect x="70" y="102" width="6" height="10" rx="1" fill="white" opacity="0.3" />
        <rect x="100" y="102" width="12" height="10" rx="1" fill="#fef3c7" />
        <rect x="100" y="102" width="6" height="10" rx="1" fill="white" opacity="0.3" />
        {/* Chimney */}
        <rect x="105" y="60" width="10" height="20" fill="#ea580c" />
      </g>

      {/* House 2 - Center (rejected with X) */}
      <g opacity="0.5" filter="url(#softShadow)">
        <polygon points="130,85 170,40 210,85" fill="#fb923c" />
        <rect x="142" y="85" width="56" height="60" fill="#ffedd5" />
        <rect x="160" y="110" width="18" height="35" rx="1" fill="#fed7aa" />
        <rect x="147" y="92" width="12" height="10" rx="1" fill="#fef3c7" />
        <rect x="180" y="92" width="12" height="10" rx="1" fill="#fef3c7" />
      </g>
      {/* Bold X mark */}
      <line x1="120" y1="35" x2="220" y2="150" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
      <line x1="220" y1="35" x2="120" y2="150" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />

      {/* "NO" circle badge */}
      <g filter="url(#softShadow)">
        <circle cx="170" cy="30" r="16" fill="#dc2626" />
        <rect x="160" y="28" width="20" height="5" rx="2" fill="white" />
      </g>

      {/* Barrier fence around rejected house */}
      <rect x="115" y="142" width="110" height="5" rx="1" fill="#dc2626" opacity="0.25" />
      <rect x="115" y="125" width="5" height="22" rx="1" fill="#dc2626" opacity="0.25" />
      <rect x="220" y="125" width="5" height="22" rx="1" fill="#dc2626" opacity="0.25" />

      {/* House 3 - Right (approved, smaller) */}
      <g filter="url(#softShadow)">
        <polygon points="230,100 258,65 286,100" fill="#fdba74" />
        <rect x="240" y="100" width="36" height="45" fill="url(#creamGradient)" />
        <rect x="252" y="118" width="12" height="27" rx="1" fill="#fed7aa" />
        <rect x="244" y="106" width="9" height="8" rx="1" fill="#fef3c7" />
        <rect x="267" y="106" width="9" height="8" rx="1" fill="#fef3c7" />
      </g>

      {/* Decorative birds */}
      <path d="M45 45 Q50 40 55 45" stroke="#6b7280" strokeWidth="1.5" fill="none" />
      <path d="M52 42 Q57 37 62 42" stroke="#6b7280" strokeWidth="1.5" fill="none" />

      {/* Small decorative tree */}
      <circle cx="275" cy="130" r="10" fill="#86efac" opacity="0.7" />
      <rect x="273" y="138" width="4" height="10" fill="#059669" opacity="0.7" />
    </svg>
  );
}

/**
 * Zoning: Premium city hall with dome and columns
 */
function ZoningIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PremiumFilters />

      {/* Background glow */}
      <ellipse cx="140" cy="165" rx="110" ry="18" fill="#6366f1" opacity="0.08" />

      {/* Sky gradient backdrop */}
      <rect x="40" y="20" width="200" height="100" fill="url(#skyGradient)" rx="50" />

      {/* Main building base */}
      <g filter="url(#softShadow)">
        <rect x="45" y="78" width="190" height="82" fill="url(#indigoGradient)" opacity="0.15" />
        <rect x="50" y="80" width="180" height="80" fill="#e0e7ff" />
      </g>

      {/* Dome */}
      <g filter="url(#softShadow)">
        <ellipse cx="140" cy="80" rx="65" ry="38" fill="url(#indigoGradient)" />
        <ellipse cx="140" cy="78" rx="50" ry="28" fill="#a5b4fc" />
        <ellipse cx="140" cy="76" rx="35" ry="18" fill="#c7d2fe" opacity="0.5" />
      </g>

      {/* Dome ornament */}
      <circle cx="140" cy="47" r="10" fill="#4f46e5" />
      <rect x="137" y="40" width="6" height="12" fill="#312e81" />
      <circle cx="140" cy="38" r="3" fill="#6366f1" />

      {/* Columns with depth */}
      {[65, 95, 125, 155, 185].map((x, i) => (
        <g key={i} filter="url(#softShadow)">
          <rect x={x} y="85" width="16" height="72" rx="2" fill="#4f46e5" />
          <rect x={x + 2} y="85" width="4" height="72" fill="#6366f1" opacity="0.4" />
          {/* Column capital */}
          <rect x={x - 3} y="82" width="22" height="6" rx="1" fill="#c7d2fe" />
          {/* Column base */}
          <rect x={x - 2} y="155" width="20" height="5" rx="1" fill="#c7d2fe" />
        </g>
      ))}

      {/* Steps with gradient */}
      <rect x="35" y="157" width="210" height="8" rx="2" fill="#c7d2fe" />
      <rect x="40" y="163" width="200" height="8" rx="2" fill="#a5b4fc" />
      <rect x="45" y="169" width="190" height="11" rx="2" fill="#818cf8" />

      {/* Grand entrance */}
      <g filter="url(#softShadow)">
        <rect x="115" y="110" width="50" height="47" rx="25" fill="#312e81" />
        <rect x="120" y="115" width="40" height="40" rx="20" fill="#1e1b4b" />
        {/* Door details */}
        <rect x="138" y="130" width="4" height="25" fill="#312e81" />
      </g>

      {/* Windows */}
      <rect x="67" y="100" width="14" height="20" rx="2" fill="#312e81" />
      <rect x="67" y="100" width="7" height="20" rx="2" fill="#4f46e5" opacity="0.3" />
      <rect x="187" y="100" width="14" height="20" rx="2" fill="#312e81" />
      <rect x="187" y="100" width="7" height="20" rx="2" fill="#4f46e5" opacity="0.3" />

      {/* Small flanking buildings */}
      <g opacity="0.5">
        <rect x="5" y="120" width="30" height="40" rx="3" fill="#c7d2fe" filter="url(#softShadow)" />
        <rect x="10" y="130" width="8" height="10" rx="1" fill="#818cf8" />
        <rect x="245" y="125" width="30" height="35" rx="3" fill="#c7d2fe" filter="url(#softShadow)" />
        <rect x="250" y="133" width="8" height="10" rx="1" fill="#818cf8" />
      </g>

      {/* Flag on top */}
      <rect x="138" y="28" width="2" height="15" fill="#312e81" />
      <polygon points="140,28 155,33 140,38" fill="#4f46e5" />
    </svg>
  );
}

/**
 * Climate: Premium trees meeting sustainable buildings
 */
function ClimateIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PremiumFilters />

      {/* Sun with glow */}
      <g filter="url(#glow)">
        <circle cx="245" cy="32" r="28" fill="#fbbf24" opacity="0.3" />
        <circle cx="245" cy="32" r="22" fill="#fbbf24" opacity="0.6" />
        <circle cx="245" cy="32" r="16" fill="#fcd34d" />
      </g>

      {/* Clouds */}
      <g opacity="0.5">
        <ellipse cx="55" cy="28" rx="28" ry="14" fill="#d1fae5" />
        <ellipse cx="80" cy="32" rx="22" ry="11" fill="#d1fae5" />
        <ellipse cx="38" cy="35" rx="18" ry="9" fill="#d1fae5" />
      </g>

      {/* Tree 1 - Large prominent tree */}
      <g filter="url(#softShadow)">
        <circle cx="55" cy="90" r="40" fill="url(#sageGradient)" />
        <circle cx="35" cy="108" r="24" fill="#059669" />
        <circle cx="80" cy="100" r="28" fill="#34d399" />
        <circle cx="55" cy="75" r="20" fill="#6ee7b7" opacity="0.7" />
        <rect x="48" y="125" width="14" height="40" fill="#065f46" />
      </g>

      {/* Tree 2 - Medium */}
      <g filter="url(#softShadow)">
        <circle cx="125" cy="108" r="28" fill="#34d399" />
        <circle cx="110" cy="118" r="18" fill="#10b981" />
        <circle cx="140" cy="115" r="15" fill="#6ee7b7" />
        <rect x="120" y="132" width="10" height="32" fill="#065f46" />
      </g>

      {/* Green Building - Main */}
      <g filter="url(#softShadow)">
        <rect x="155" y="65" width="55" height="95" rx="4" fill="#d1fae5" />
        {/* Green living roof */}
        <rect x="150" y="55" width="65" height="14" rx="3" fill="#10b981" />
        <circle cx="160" cy="52" r="7" fill="#34d399" />
        <circle cx="175" cy="48" r="9" fill="#10b981" />
        <circle cx="192" cy="50" r="8" fill="#34d399" />
        <circle cx="207" cy="53" r="6" fill="#10b981" />

        {/* Windows with eco-tint */}
        <rect x="163" y="78" width="14" height="16" rx="2" fill="#059669" opacity="0.35" />
        <rect x="163" y="78" width="7" height="16" rx="2" fill="white" opacity="0.15" />
        <rect x="185" y="78" width="14" height="16" rx="2" fill="#059669" opacity="0.35" />
        <rect x="185" y="78" width="7" height="16" rx="2" fill="white" opacity="0.15" />

        <rect x="163" y="102" width="14" height="16" rx="2" fill="#059669" opacity="0.35" />
        <rect x="185" y="102" width="14" height="16" rx="2" fill="#059669" opacity="0.35" />

        <rect x="163" y="126" width="14" height="16" rx="2" fill="#059669" opacity="0.35" />
        <rect x="185" y="126" width="14" height="16" rx="2" fill="#059669" opacity="0.35" />

        {/* Solar panels */}
        <g transform="rotate(-12 160 45)">
          <rect x="155" y="38" width="22" height="10" rx="1" fill="#1e3a5f" />
          <line x1="160" y1="38" x2="160" y2="48" stroke="#3a7ab5" strokeWidth="0.5" />
          <line x1="166" y1="38" x2="166" y2="48" stroke="#3a7ab5" strokeWidth="0.5" />
          <line x1="172" y1="38" x2="172" y2="48" stroke="#3a7ab5" strokeWidth="0.5" />
        </g>
        <g transform="rotate(-12 190 42)">
          <rect x="185" y="35" width="22" height="10" rx="1" fill="#1e3a5f" />
          <line x1="190" y1="35" x2="190" y2="45" stroke="#3a7ab5" strokeWidth="0.5" />
          <line x1="196" y1="35" x2="196" y2="45" stroke="#3a7ab5" strokeWidth="0.5" />
          <line x1="202" y1="35" x2="202" y2="45" stroke="#3a7ab5" strokeWidth="0.5" />
        </g>
      </g>

      {/* Building 2 - Right */}
      <g filter="url(#softShadow)">
        <rect x="225" y="85" width="45" height="75" rx="3" fill="#ecfdf5" />
        <rect x="222" y="78" width="51" height="10" rx="2" fill="#34d399" />

        <rect x="233" y="98" width="11" height="13" rx="1" fill="#059669" opacity="0.35" />
        <rect x="251" y="98" width="11" height="13" rx="1" fill="#059669" opacity="0.35" />
        <rect x="233" y="118" width="11" height="13" rx="1" fill="#059669" opacity="0.35" />
        <rect x="251" y="118" width="11" height="13" rx="1" fill="#059669" opacity="0.35" />
        <rect x="233" y="138" width="11" height="13" rx="1" fill="#059669" opacity="0.35" />
        <rect x="251" y="138" width="11" height="13" rx="1" fill="#059669" opacity="0.35" />
      </g>

      {/* Ground vegetation */}
      <ellipse cx="95" cy="162" rx="25" ry="8" fill="#86efac" opacity="0.6" />
      <ellipse cx="145" cy="165" rx="18" ry="6" fill="#86efac" opacity="0.5" />
      <ellipse cx="200" cy="163" rx="20" ry="7" fill="#86efac" opacity="0.5" />

      {/* Small decorative tree */}
      <g>
        <circle cx="12" cy="145" r="12" fill="#34d399" opacity="0.8" />
        <rect x="10" y="155" width="5" height="12" fill="#065f46" opacity="0.8" />
      </g>

      {/* Birds */}
      <path d="M180 25 Q185 20 190 25" stroke="#065f46" strokeWidth="1.5" fill="none" />
      <path d="M195 30 Q200 25 205 30" stroke="#065f46" strokeWidth="1.5" fill="none" />

      {/* Ground line */}
      <rect x="0" y="160" width="280" height="20" fill="#d1fae5" opacity="0.25" />
    </svg>
  );
}

/**
 * Oakland: Port cranes, oak tree, hills, Lake Merritt, city skyline
 */
function OaklandIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PremiumFilters />

      {/* Oakland green gradients */}
      <defs>
        <linearGradient id="oaklandGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00845a" />
          <stop offset="100%" stopColor="#006341" />
        </linearGradient>
        <linearGradient id="oaklandDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c1621" />
          <stop offset="100%" stopColor="#00152e" />
        </linearGradient>
        <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#006341" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <ellipse cx="140" cy="165" rx="120" ry="20" fill="#006341" opacity="0.1" />

      {/* Oakland hills silhouette */}
      <path d="M0 100 Q30 60 70 80 Q100 65 140 75 Q180 60 220 70 Q250 55 280 75 L280 180 L0 180Z" fill="url(#hillGradient)" />

      {/* Lake Merritt water */}
      <ellipse cx="195" cy="140" rx="35" ry="14" fill="url(#waterGradient)" />
      <ellipse cx="195" cy="138" rx="25" ry="8" fill="#0ea5e9" opacity="0.1" />

      {/* Port crane 1 - Left */}
      <g filter="url(#softShadow)">
        <rect x="18" y="65" width="5" height="95" fill="#164b7e" />
        <rect x="10" y="62" width="22" height="6" rx="1" fill="#0a3161" />
        {/* Boom arm */}
        <line x1="20" y1="65" x2="60" y2="55" stroke="#3a7ab5" strokeWidth="3" />
        <line x1="20" y1="65" x2="5" y2="80" stroke="#3a7ab5" strokeWidth="2" />
        {/* Cable lines */}
        <line x1="40" y1="59" x2="40" y2="85" stroke="#6a9fcf" strokeWidth="1" opacity="0.6" />
        <line x1="50" y1="57" x2="50" y2="90" stroke="#6a9fcf" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Port crane 2 */}
      <g filter="url(#softShadow)" opacity="0.7">
        <rect x="55" y="75" width="4" height="85" fill="#164b7e" />
        <rect x="49" y="72" width="18" height="5" rx="1" fill="#0a3161" />
        <line x1="57" y1="75" x2="88" y2="66" stroke="#3a7ab5" strokeWidth="2.5" />
        <line x1="57" y1="75" x2="44" y2="87" stroke="#3a7ab5" strokeWidth="1.5" />
        <line x1="73" y1="70" x2="73" y2="92" stroke="#6a9fcf" strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* Downtown skyline */}
      <g filter="url(#softShadow)">
        {/* Tribune Tower */}
        <rect x="100" y="58" width="18" height="102" rx="2" fill="url(#oaklandDark)" />
        <rect x="103" y="62" width="5" height="6" rx="1" fill="#3a7ab5" opacity="0.4" />
        <rect x="110" y="62" width="5" height="6" rx="1" fill="#3a7ab5" opacity="0.4" />
        <rect x="103" y="72" width="5" height="6" rx="1" fill="#3a7ab5" opacity="0.3" />
        <rect x="110" y="72" width="5" height="6" rx="1" fill="#3a7ab5" opacity="0.3" />
        <rect x="103" y="82" width="5" height="6" rx="1" fill="#3a7ab5" opacity="0.2" />
        <rect x="110" y="82" width="5" height="6" rx="1" fill="#3a7ab5" opacity="0.2" />
        {/* Spire */}
        <rect x="107" y="48" width="4" height="12" fill="#0a3161" />
        <polygon points="109,42 112,48 106,48" fill="#164b7e" />
      </g>

      {/* Building 2 */}
      <g filter="url(#softShadow)">
        <rect x="122" y="75" width="22" height="85" rx="2" fill="#0a3161" />
        <rect x="126" y="80" width="6" height="5" rx="1" fill="#006341" opacity="0.4" />
        <rect x="134" y="80" width="6" height="5" rx="1" fill="#006341" opacity="0.4" />
        <rect x="126" y="90" width="6" height="5" rx="1" fill="#006341" opacity="0.3" />
        <rect x="134" y="90" width="6" height="5" rx="1" fill="#006341" opacity="0.3" />
      </g>

      {/* Building 3 (shorter) */}
      <rect x="148" y="95" width="16" height="65" rx="2" fill="#001d3d" opacity="0.8" filter="url(#softShadow)" />

      {/* Oak tree — symbol of Oakland */}
      <g filter="url(#softShadow)">
        {/* Trunk */}
        <rect x="225" y="120" width="8" height="30" fill="#065f46" />
        <path d="M225 130 L218 140" stroke="#065f46" strokeWidth="3" strokeLinecap="round" />
        <path d="M233 128 L240 138" stroke="#065f46" strokeWidth="3" strokeLinecap="round" />
        {/* Canopy */}
        <circle cx="230" cy="100" r="26" fill="url(#oaklandGreen)" />
        <circle cx="218" cy="110" r="16" fill="#006341" />
        <circle cx="244" cy="108" r="14" fill="#059669" />
        <circle cx="230" cy="88" r="14" fill="#00845a" opacity="0.8" />
      </g>

      {/* Small accent tree */}
      <circle cx="268" cy="130" r="8" fill="#059669" opacity="0.6" />
      <rect x="266" y="136" width="4" height="10" fill="#065f46" opacity="0.6" />

      {/* Data visualization dots (referencing the simulation) */}
      <g filter="url(#glow)">
        <circle cx="85" cy="50" r="2.5" fill="#00845a" opacity="0.7" />
        <circle cx="165" cy="45" r="2" fill="#006341" opacity="0.6" />
        <circle cx="200" cy="55" r="1.5" fill="#059669" opacity="0.5" />
      </g>

      {/* Ground line */}
      <rect x="0" y="158" width="280" height="22" fill="#006341" opacity="0.12" />
    </svg>
  );
}

/**
 * San Francisco: Golden Gate Bridge, fog, skyline, hills
 */
function SanFranciscoIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PremiumFilters />

      {/* SF-specific gradients */}
      <defs>
        <linearGradient id="sfSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d1b2e" />
          <stop offset="100%" stopColor="#4a2028" />
        </linearGradient>
        <linearGradient id="sfBridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4453a" />
          <stop offset="100%" stopColor="#a62d24" />
        </linearGradient>
        <linearGradient id="sfFogGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8dfe0" stopOpacity="0" />
          <stop offset="30%" stopColor="#e8dfe0" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#e8dfe0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e8dfe0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sfWaterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0d2137" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Bay water */}
      <rect x="0" y="140" width="280" height="40" fill="url(#sfWaterGradient)" />
      <ellipse cx="140" cy="165" rx="130" ry="20" fill="#1a3a5c" opacity="0.15" />

      {/* Distant hills silhouette (Marin Headlands) */}
      <path d="M0 120 Q40 85 80 100 Q110 80 150 95 Q190 75 230 90 Q260 80 280 95 L280 145 L0 145Z" fill="#1c1517" opacity="0.5" />

      {/* Fog bank rolling in */}
      <ellipse cx="60" cy="105" rx="55" ry="18" fill="#e8dfe0" opacity="0.15" />
      <ellipse cx="180" cy="100" rx="70" ry="20" fill="#e8dfe0" opacity="0.12" />
      <ellipse cx="120" cy="115" rx="90" ry="12" fill="#e8dfe0" opacity="0.1" />

      {/* Golden Gate Bridge */}
      <g filter="url(#softShadow)">
        {/* Main cables (catenary) */}
        <path d="M45 75 Q90 110 140 75" stroke="url(#sfBridgeGradient)" strokeWidth="2.5" fill="none" />
        <path d="M140 75 Q190 110 235 75" stroke="url(#sfBridgeGradient)" strokeWidth="2.5" fill="none" />

        {/* Vertical suspender cables */}
        {[60, 75, 90, 105, 120].map((x, i) => (
          <line key={`l${i}`} x1={x} y1={75 + Math.sin((x - 45) / 95 * Math.PI) * 35} x2={x} y2="135" stroke="#C0362C" strokeWidth="0.7" opacity="0.5" />
        ))}
        {[160, 175, 190, 205, 220].map((x, i) => (
          <line key={`r${i}`} x1={x} y1={75 + Math.sin((x - 140) / 95 * Math.PI) * 35} x2={x} y2="135" stroke="#C0362C" strokeWidth="0.7" opacity="0.5" />
        ))}

        {/* Road deck */}
        <rect x="40" y="132" width="200" height="6" rx="1" fill="#8b3a30" />
        <rect x="40" y="134" width="200" height="2" fill="#6b2a22" opacity="0.5" />

        {/* Tower 1 - South */}
        <rect x="38" y="50" width="8" height="88" fill="url(#sfBridgeGradient)" />
        <rect x="42" y="50" width="8" height="88" fill="url(#sfBridgeGradient)" />
        {/* Cross braces */}
        <rect x="38" y="68" width="12" height="3" fill="#d4453a" />
        <rect x="38" y="90" width="12" height="3" fill="#d4453a" />
        <rect x="38" y="112" width="12" height="3" fill="#d4453a" />
        {/* Tower cap */}
        <rect x="36" y="48" width="16" height="5" rx="1" fill="#C0362C" />

        {/* Tower 2 - North */}
        <rect x="133" y="50" width="8" height="88" fill="url(#sfBridgeGradient)" />
        <rect x="137" y="50" width="8" height="88" fill="url(#sfBridgeGradient)" />
        <rect x="133" y="68" width="12" height="3" fill="#d4453a" />
        <rect x="133" y="90" width="12" height="3" fill="#d4453a" />
        <rect x="133" y="112" width="12" height="3" fill="#d4453a" />
        <rect x="131" y="48" width="16" height="5" rx="1" fill="#C0362C" />
      </g>

      {/* Downtown skyline (right side, behind bridge) */}
      <g opacity="0.6">
        {/* Transamerica-like spire */}
        <polygon points="248,70 254,70 251,35" fill="#2d1b2e" />
        {/* Salesforce-like tower */}
        <rect x="258" y="55" width="14" height="85" rx="3" fill="#1c1517" />
        <rect x="261" y="60" width="3" height="4" rx="0.5" fill="#C0362C" opacity="0.3" />
        <rect x="266" y="60" width="3" height="4" rx="0.5" fill="#C0362C" opacity="0.3" />
        <rect x="261" y="70" width="3" height="4" rx="0.5" fill="#C0362C" opacity="0.2" />
        <rect x="266" y="70" width="3" height="4" rx="0.5" fill="#C0362C" opacity="0.2" />
        {/* Shorter buildings */}
        <rect x="240" y="80" width="10" height="60" rx="1" fill="#261a1d" />
        <rect x="228" y="90" width="10" height="50" rx="1" fill="#1c1517" opacity="0.8" />
      </g>

      {/* Fog wisps over bridge */}
      <rect x="0" y="95" width="280" height="25" fill="url(#sfFogGradient)" />

      {/* Water reflections */}
      <line x1="30" y1="150" x2="55" y2="150" stroke="#C0362C" strokeWidth="0.8" opacity="0.15" />
      <line x1="120" y1="155" x2="160" y2="155" stroke="#C0362C" strokeWidth="0.8" opacity="0.12" />
      <line x1="200" y1="148" x2="230" y2="148" stroke="#C0362C" strokeWidth="0.8" opacity="0.1" />

      {/* Data particles */}
      <g filter="url(#glow)">
        <circle cx="20" cy="60" r="2" fill="#C0362C" opacity="0.6" />
        <circle cx="270" cy="45" r="1.5" fill="#d4453a" opacity="0.5" />
        <circle cx="100" cy="40" r="1.5" fill="#C0362C" opacity="0.4" />
      </g>
    </svg>
  );
}
