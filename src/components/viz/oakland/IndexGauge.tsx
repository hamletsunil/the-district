"use client";

interface GaugeProps {
  label: string;
  score: number;
  maxScore?: number;
  color: string;
  confidence: string;
}

function Gauge({ label, score, maxScore = 100, color, confidence }: GaugeProps) {
  const pct = Math.min(score / maxScore, 1);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  // Arc from -135° to +135° (270° total sweep)
  const arcLength = circumference * 0.75;
  const filledLength = arcLength * pct;
  const emptyLength = arcLength - filledLength;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg]">
          {/* Background arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--border-light)"
            strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${filledLength} ${emptyLength + (circumference - arcLength)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease-out" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-sans)", color }}
          >
            {Math.round(score)}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}
          >
            / {maxScore}
          </span>
        </div>
      </div>
      <div
        className="mt-2 text-sm font-medium text-center"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}
      >
        {label}
      </div>
      <div
        className="text-xs text-center"
        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}
      >
        {confidence} confidence
      </div>
    </div>
  );
}

const DIMENSIONS = [
  { key: "education", label: "Education", color: "var(--dim-education)" },
  { key: "safety", label: "Safety", color: "var(--dim-safety)" },
  { key: "prosperity", label: "Prosperity", color: "var(--dim-prosperity)" },
  { key: "affordability", label: "Affordability", color: "var(--dim-affordability)" },
] as const;

interface IndexData {
  score: number;
  confidence: string;
  coverage: number;
}

export function IndexGauges() {
  const indices: Record<string, IndexData> = {
    education: { score: 36.22, confidence: "low", coverage: 0.478 },
    safety: { score: 31.22, confidence: "high", coverage: 0.778 },
    prosperity: { score: 47.37, confidence: "moderate", coverage: 0.644 },
    affordability: { score: 54.14, confidence: "moderate", coverage: 0.5 },
  };

  return (
    <div className="my-8">
      <h3
        className="text-base font-semibold mb-1"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}
      >
        Oakland Quality-of-Life Indices
      </h3>
      <p
        className="text-xs mb-6"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}
      >
        Composite scores from 10 federal and local data sources, weighted by authority tier
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {DIMENSIONS.map((dim) => {
          const data = indices[dim.key];
          return (
            <Gauge
              key={dim.key}
              label={dim.label}
              score={data.score}
              color={dim.color}
              confidence={data.confidence}
            />
          );
        })}
      </div>
    </div>
  );
}
