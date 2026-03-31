import type { ChapterMeta } from "@/data/civic-guide/types-chapter";

// Accent colors per chapter — matches the hub page card accents
const CHAPTER_ACCENTS: Record<string, string> = {
  "why-it-matters": "#2563eb",
  "taxonomy": "#7c3aed",
  "forms": "#059669",
  "roles": "#b45309",
  "lawmaking": "#dc2626",
  "the-meeting": "#0891b2",
  "land-use": "#65a30d",
  "money": "#ca8a04",
  "elections": "#e11d48",
  "engagement": "#7c3aed",
  "legal-framework": "#4338ca",
  "county-government": "#92400e",
  "infrastructure": "#6b7280",
  "challenges": "#0f766e",
};

interface ChapterHeaderProps {
  chapter: ChapterMeta;
}

export function ChapterHeader({ chapter }: ChapterHeaderProps) {
  const accent = CHAPTER_ACCENTS[chapter.id] || "#2563eb";

  return (
    <header className="lg-chapter-hero">
      {/* Subtle accent glow */}
      <div
        className="lg-chapter-hero-glow"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 60%, ${accent}12 0%, transparent 70%)`,
        }}
      />

      <div className="lg-chapter-hero-content">
        {/* Large chapter number as decorative element */}
        <div className="lg-chapter-big-number" style={{ color: `${accent}18` }}>
          {chapter.number}
        </div>

        <div className="lg-chapter-number-badge" style={{ color: accent }}>
          Chapter {chapter.number}
        </div>

        <h1 className="lg-chapter-title">{chapter.title}</h1>

        <p className="lg-chapter-subtitle">{chapter.description}</p>

        {/* Accent line */}
        <div className="lg-chapter-accent-line" style={{ background: accent }} />
      </div>
    </header>
  );
}
