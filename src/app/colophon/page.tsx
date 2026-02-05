import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon — The District",
  description: "About the design, typography, and technology behind The District.",
};

export default function ColophonPage() {
  return (
    <main className="colophon-page">
      <div className="colophon-content">
        <header className="colophon-header">
          <p className="colophon-label">Colophon</p>
          <h1 className="colophon-title">How This Publication Is Made</h1>
        </header>

        <section className="colophon-section">
          <p className="colophon-prose">
            The District is a visual journalism publication by{" "}
            <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">
              Hamlet
            </a>
            . We analyze transcripts, votes, and public records from more than
            3,000 city halls across America to uncover what&rsquo;s really
            happening in local democracy.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Typography</h2>
          <p className="colophon-prose">
            Headlines are set in{" "}
            <strong>Fraunces</strong>, a variable serif by Undercase Type
            with an optical size axis that gives it different character at
            display and text sizes. Its soft, slightly wonky forms bring
            warmth to serious subjects.
          </p>
          <p className="colophon-prose">
            Long-form prose is set in{" "}
            <strong>Literata</strong>, designed by TypeTogether for extended
            reading. Its even texture and generous proportions keep the eye
            comfortable across thousands of words of policy analysis and
            investigative reporting.
          </p>
          <p className="colophon-prose">
            Interface elements, labels, and data visualizations use{" "}
            <strong>Inter</strong> by Rasmus Andersson, optimized for
            screens at small sizes where clarity matters most.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Design</h2>
          <p className="colophon-prose">
            The District uses a dark, cinematic aesthetic where each article
            inhabits its own color world. Data center stories live in deep
            navy blues. Housing analysis sits on warm cream. Vote trackers
            emerge from dark slate with amber accents. This per-article
            theming lets each investigation establish its own visual
            identity while sharing a common typographic and structural
            foundation.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Technology</h2>
          <p className="colophon-prose">
            Every story in The District starts with data. Hamlet&rsquo;s
            platform processes transcripts, agendas, and voting records from
            city council meetings across the country. Our journalism team
            uses this data to find patterns, anomalies, and stories that
            would be impossible to uncover by hand.
          </p>
          <p className="colophon-prose">
            The site is built with Next.js and deployed on Vercel. Articles
            are hand-coded React components with bespoke data visualizations
            &mdash; no CMS templates. Each chart, map, and interactive element is
            built specifically for the story it tells.
          </p>
          <p className="colophon-prose">
            <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">
              Learn more about Hamlet &rarr;
            </a>
          </p>
        </section>

        <footer className="colophon-footer-section">
          <p className="colophon-prose">
            The District is a publication by{" "}
            <a href="https://myhamlet.com" target="_blank" rel="noopener noreferrer">
              Hamlet
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
