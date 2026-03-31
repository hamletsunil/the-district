import Link from "next/link";
import type { ChapterMeta } from "@/data/civic-guide/types-chapter";
import { SourcesCitations } from "@/components/article/SourcesCitations";

interface ChapterFooterProps {
  sources: { title: string; outlet: string; url: string }[];
  prevChapter?: ChapterMeta;
  nextChapter?: ChapterMeta;
}

export function ChapterFooter({ sources, prevChapter, nextChapter }: ChapterFooterProps) {
  return (
    <footer className="lg-chapter-footer">
      {/* Sources */}
      <SourcesCitations sources={sources} />

      {/* Chapter Navigation */}
      <nav className="lg-chapter-nav-footer">
        {prevChapter ? (
          <Link href={`/articles/how-local-government-works/${prevChapter.slug}`} className="lg-chapter-nav-link lg-prev">
            <span className="lg-chapter-nav-label">&larr; Previous</span>
            <span className="lg-chapter-nav-title">
              {prevChapter.number}. {prevChapter.shortTitle}
            </span>
          </Link>
        ) : (
          <Link href="/" className="lg-chapter-nav-link lg-prev">
            <span className="lg-chapter-nav-label">&larr; Home</span>
            <span className="lg-chapter-nav-title">The Guide</span>
          </Link>
        )}

        {nextChapter ? (
          <Link href={`/articles/how-local-government-works/${nextChapter.slug}`} className="lg-chapter-nav-link lg-next">
            <span className="lg-chapter-nav-label">Next &rarr;</span>
            <span className="lg-chapter-nav-title">
              {nextChapter.number}. {nextChapter.shortTitle}
            </span>
          </Link>
        ) : (
          <Link href="/" className="lg-chapter-nav-link lg-next">
            <span className="lg-chapter-nav-label">Finish &rarr;</span>
            <span className="lg-chapter-nav-title">Back to Guide</span>
          </Link>
        )}
      </nav>
    </footer>
  );
}
