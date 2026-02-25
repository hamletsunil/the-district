"use client";

/**
 * Continue to next article link
 */

import Link from "next/link";

interface UpNextProps {
  slug: string;
  title: string;
}

export function UpNext({ slug, title }: UpNextProps) {
  return (
    <div className="continue-next">
      <Link href={`/articles/${slug}`} className="continue-next__link">
        Continue to {title} →
      </Link>
    </div>
  );
}
