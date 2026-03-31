interface KeyFactProps {
  value: string;
  unit?: string;
  description: string;
  className?: string;
}

export function KeyFact({ value, unit, description, className = "" }: KeyFactProps) {
  return (
    <figure className={`lg-key-fact ${className}`}>
      <div className="lg-key-fact-value-row">
        <span className="lg-key-fact-value">{value}</span>
        {unit && <span className="lg-key-fact-unit">{unit}</span>}
      </div>
      <figcaption className="lg-key-fact-desc">{description}</figcaption>
    </figure>
  );
}
