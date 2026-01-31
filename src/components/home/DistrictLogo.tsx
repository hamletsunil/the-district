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
    <div className={`flex items-center gap-3 ${className || ""}`}>
      {/* Hamlet H Mark */}
      <svg
        viewBox="0 0 170 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${markSize} flex-shrink-0`}
        aria-hidden="true"
      >
        {/* Right vertical bar */}
        <path d="M169.665 0H135.973V150H169.665V0Z" fill="white" />
        {/* Left vertical bar */}
        <path d="M57.6378 0H23.9453V150H57.6378V0Z" fill="white" />
        {/* Diagonal crossbar */}
        <path
          d="M0 96.7193L96.6264 52.3063L169.387 85.3426V118.889L96.6264 85.8526L0 130.266V96.7193Z"
          fill="white"
        />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={`${titleSize} font-bold tracking-tight text-white`}>
          The District
        </span>
        {showTagline && (
          <>
            <span className="text-[11px] font-normal italic text-gray-400 mt-0.5">
              Stories from city halls
            </span>
            <span className="text-[9px] font-medium tracking-[0.15em] text-gray-500 uppercase mt-2">
              A Hamlet Publication
            </span>
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
