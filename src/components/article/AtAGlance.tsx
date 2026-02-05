import type { AtAGlanceStat } from "@/types/article";

interface AtAGlanceProps {
  stats: AtAGlanceStat[];
  finding: string;
  findingLabel?: string;
}

/**
 * At a Glance section — key stats + finding callout.
 * Uses shared `.at-a-glance-*` CSS classes from globals.css.
 */
export function AtAGlance({
  stats,
  finding,
  findingLabel = "Key Finding",
}: AtAGlanceProps) {
  return (
    <section className="at-a-glance">
      <div className="at-a-glance-inner">
        <div className="at-a-glance-label">At a Glance</div>
        <div className="at-a-glance-stats">
          {stats.map((stat, i) => (
            <div key={i} className="at-a-glance-stat">
              <div className="at-a-glance-stat-value">{stat.value}</div>
              <div className="at-a-glance-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="at-a-glance-finding">
          <div className="at-a-glance-finding-label">{findingLabel}</div>
          <div className="at-a-glance-finding-text">{finding}</div>
        </div>
      </div>
    </section>
  );
}
