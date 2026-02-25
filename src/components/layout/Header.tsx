"use client";

import Link from "next/link";
import { DistrictMark } from "@/components/home";

export function Header() {
  return (
    <header className="masthead">
      <div className="flex items-center gap-3 district-logo">
        {/* H mark links to parent site */}
        <a
          href="https://www.myhamlet.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 district-logo-mark hamlet-mark-link"
          aria-label="Hamlet — parent site"
        >
          <DistrictMark className="w-6 h-5" />
        </a>

        {/* Wordmark links to district homepage */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight district-logo-title">
            The District
          </span>
          <span className="text-[11px] font-normal italic district-logo-tagline mt-0.5">
            Stories from city halls
          </span>
          <span className="text-[9px] font-medium tracking-[0.15em] district-logo-attribution uppercase mt-2">
            A Hamlet Publication
          </span>
        </Link>
      </div>
    </header>
  );
}
