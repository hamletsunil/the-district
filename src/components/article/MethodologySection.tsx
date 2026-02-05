import type { ReactNode } from "react";

interface MethodologyItem {
  label: string;
  content: string;
}

interface MethodologySectionProps {
  items: MethodologyItem[];
  title?: string;
  prefix?: string;
  children?: ReactNode;
}

/**
 * Methodology section for articles.
 * Renders a header + structured methodology items as prose paragraphs.
 *
 * Uses article-specific class prefixes for theme styling.
 * If `prefix` is provided, applies `{prefix}-section`, `{prefix}-methodology`, etc.
 * Falls back to generic article classes without a prefix.
 */
export function MethodologySection({
  items,
  title = "How We Built This Analysis",
  prefix,
  children,
}: MethodologySectionProps) {
  const sectionClass = prefix
    ? `${prefix}-section ${prefix}-methodology`
    : "article-section article-methodology";
  const headerClass = prefix ? `${prefix}-prose-header` : "article-prose-header";
  const numberClass = prefix ? `${prefix}-section-number` : "article-section-number";
  const proseClass = prefix
    ? `${prefix}-prose ${prefix}-prose-small`
    : "article-prose article-prose-small";

  return (
    <section className={sectionClass}>
      <div className={headerClass}>
        <span className={numberClass}>Methodology</span>
        <h2>{title}</h2>
      </div>

      <div className={proseClass}>
        {items.map((item, i) => (
          <p key={i}>
            <strong>{item.label}:</strong> {item.content}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}
