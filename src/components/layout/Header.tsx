"use client";

import Link from "next/link";
import { DistrictLogo } from "@/components/home";

export function Header() {
  return (
    <header className="masthead">
      <Link href="/">
        <DistrictLogo showTagline={true} />
      </Link>
    </header>
  );
}
