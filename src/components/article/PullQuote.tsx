interface PullQuoteProps {
  text: string;
  attribution?: string;
  city?: string;
  state?: string;
  className?: string;
}

/**
 * Pull quote / blockquote for articles.
 * Renders a styled blockquote with optional attribution.
 */
export function PullQuote({
  text,
  attribution,
  city,
  state,
  className,
}: PullQuoteProps) {
  const cite = attribution
    ? attribution
    : city && state
      ? `${city}, ${state}`
      : city || undefined;

  return (
    <div className={className}>
      <blockquote>
        {text}
      </blockquote>
      {cite && <cite>&mdash; {cite}</cite>}
    </div>
  );
}
