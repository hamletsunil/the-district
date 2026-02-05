import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — The District",
  description: "About The District, a visual journalism publication by Hamlet.",
};

export default function AboutPage() {
  return (
    <main className="colophon-page">
      <div className="colophon-content">
        <header className="colophon-header">
          <p className="colophon-label">About</p>
          <h1 className="colophon-title">The District</h1>
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
          <h2 className="colophon-section-title">How It&rsquo;s Made</h2>
          <p className="colophon-prose">
            Every story in The District starts with data. Hamlet&rsquo;s
            platform processes transcripts, agendas, and voting records from
            city council meetings across the country. Our journalism team
            uses this data to find patterns, anomalies, and stories that
            would be impossible to uncover by hand.
          </p>
        </section>

        <section className="colophon-section">
          <h2 className="colophon-section-title">Authors</h2>
          <div className="about-authors">
            <div className="about-author">
              <Image
                src="https://www.myhamlet.com/team/sunil-rajaraman.jpg"
                alt="Sunil Rajaraman"
                width={56}
                height={56}
                className="about-author-avatar"
              />
              <div>
                <p className="about-author-name">Sunil Rajaraman</p>
                <p className="about-author-role">Founder &amp; CEO, Hamlet</p>
              </div>
            </div>
            <div className="about-author">
              <Image
                src="https://www.myhamlet.com/team/paige-saez.jpg"
                alt="Paige Saez"
                width={56}
                height={56}
                className="about-author-avatar"
              />
              <div>
                <p className="about-author-name">Paige Saez</p>
                <p className="about-author-role">Designer</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="colophon-footer-section">
          <p className="colophon-prose">
            <a href="https://www.myhamlet.com/about" target="_blank" rel="noopener noreferrer">
              Meet the full team at Hamlet &rarr;
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
