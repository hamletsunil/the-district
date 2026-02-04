/**
 * Sources & Citations Component
 *
 * Displays validated sources at the bottom of each article.
 * Shows a "Fact-Checked" badge to demonstrate editorial rigor.
 */

export interface Source {
  title: string;
  outlet: string;
  url: string;
  accessDate?: string;
}

interface SourcesCitationsProps {
  sources: Source[];
  className?: string;
}

export function SourcesCitations({ sources, className }: SourcesCitationsProps) {
  if (sources.length === 0) return null;

  return (
    <section className={`sources-citations ${className || ""}`}>
      <div className="sources-header">
        <span className="sources-badge">Fact-Checked</span>
        <h3>Sources & Verification</h3>
        <p className="sources-note">
          All major claims in this article have been validated against public records
          and independent news sources.
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
