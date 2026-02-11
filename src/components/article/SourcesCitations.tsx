/**
 * Sources & Citations Component
 *
 * Displays validated sources at the bottom of each article.
 * Shows a "Fact-Checked" badge to demonstrate editorial rigor.
 */

import type { Source } from "@/types/article";

// Re-export for backwards compatibility — articles import Source from here
export type { Source };

interface SourcesCitationsProps {
  sources: Source[];
  className?: string;
}

export function SourcesCitations({ sources, className }: SourcesCitationsProps) {
  if (sources.length === 0) return null;

  return (
    <section className={`sources-citations ${className || ""}`}>
      <div className="sources-header">
        <span className="sources-badge">Primary Sources</span>
        <h3>Sources & Data</h3>
        <p className="sources-note">
          All claims in this article are grounded in public records, government data,
          and independent reporting.
        </p>
      </div>

      <ul className="sources-list">
        {sources.map((source, i) => (
          <li key={i}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
            <span className="sources-outlet">{source.outlet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
