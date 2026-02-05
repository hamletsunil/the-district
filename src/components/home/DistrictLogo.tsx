/**
 * The District Logo
 *
 * Features the Hamlet H mark alongside "The District" wordmark.
 * Clear sub-brand relationship: A Hamlet Publication.
 */

interface DistrictLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "default" | "large";
}

export function DistrictLogo({ className, showTagline = true, size = "default" }: DistrictLogoProps) {
  const markSize = size === "large" ? "w-8 h-7" : "w-6 h-5";
  const titleSize = size === "large" ? "text-xl" : "text-lg";

  return (
    <div className={`flex items-center gap-3 district-logo ${className || ""}`}>
      {/* Hamlet H Mark */}
      <svg
        viewBox="0 0 170 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${markSize} flex-shrink-0 district-logo-mark`}
        aria-hidden="true"
      >
        {/* Right vertical bar */}
        <path d="M169.665 0H135.973V150H169.665V0Z" fill="currentColor" />
        {/* Left vertical bar */}
        <path d="M57.6378 0H23.9453V150H57.6378V0Z" fill="currentColor" />
        {/* Diagonal crossbar */}
        <path
          d="M0 96.7193L96.6264 52.3063L169.387 85.3426V118.889L96.6264 85.8526L0 130.266V96.7193Z"
          fill="currentColor"
        />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`${titleSize} font-bold tracking-tight district-logo-title`}>
          The District
        </span>
        {showTagline && (
          <>
            <span className="text-[11px] font-normal italic district-logo-tagline mt-0.5">
              Stories from city halls
            </span>
            <a
              href="https://myhamlet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-medium tracking-[0.15em] district-logo-attribution uppercase mt-2 hamlet-link"
            >
              A Hamlet Publication
            </a>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Just the Hamlet H mark, for use in favicons or small contexts
 */
export function DistrictMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 170 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The District - A Hamlet Publication"
    >
      <path d="M169.665 0H135.973V150H169.665V0Z" fill="currentColor" />
      <path d="M57.6378 0H23.9453V150H57.6378V0Z" fill="currentColor" />
      <path
        d="M0 96.7193L96.6264 52.3063L169.387 85.3426V118.889L96.6264 85.8526L0 130.266V96.7193Z"
        fill="currentColor"
      />
    </svg>
  );
}
