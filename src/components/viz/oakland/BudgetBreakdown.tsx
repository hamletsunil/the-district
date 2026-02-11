"use client";

const EXPENDITURE = [
  { name: "Police", value: 364, color: "#ef4444" },
  { name: "Fire", value: 220, color: "#f97316" },
  { name: "Public Works", value: 180, color: "#f59e0b" },
  { name: "Housing & Community Dev", value: 150, color: "#10b981" },
  { name: "Parks & Rec", value: 85, color: "#22c55e" },
  { name: "Administration", value: 120, color: "#6366f1" },
  { name: "Debt Service", value: 81, color: "#8b5cf6" },
  { name: "Other", value: 1000, color: "#94a3b8" },
];

const TOTAL_BUDGET = 2200;

export function BudgetBreakdown() {
  return (
    <div className="my-8">
      <h3
        className="text-base font-semibold mb-1"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}
      >
        Oakland FY2024-25 Budget &mdash; $2.2 Billion
      </h3>
      <p
        className="text-xs mb-6"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}
      >
        Source: City of Oakland Adopted Budget FY2024-25
      </p>

      {/* Expenditure bar */}
      <div className="mb-6">
        <div
          className="label-sans mb-2"
          style={{ fontSize: "var(--type-tiny)" }}
        >
          Expenditure ($M)
        </div>
        <div className="flex h-10 rounded-lg overflow-hidden">
          {EXPENDITURE.map((item) => (
            <div
              key={item.name}
              className="relative group"
              style={{
                width: `${(item.value / TOTAL_BUDGET) * 100}%`,
                background: item.color,
              }}
            >
              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                style={{
                  background: "var(--navy-950)",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.name}: ${item.value}M
              </div>
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {EXPENDITURE.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ background: item.color }}
              />
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)" }}
              >
                {item.name} ${item.value}M
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Police callout */}
      <div
        className="mt-6 p-4 rounded-lg flex items-center gap-4"
        style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
      >
        <div
          className="stat-number text-2xl"
          style={{ color: "var(--sentiment-negative)" }}
        >
          16.5%
        </div>
        <div
          className="text-sm"
          style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}
        >
          of the total budget goes to police ($364M) &mdash; the single largest line item.
          Yet Oakland has only <strong>535 officers</strong> against a recommended 877.
        </div>
      </div>
    </div>
  );
}
