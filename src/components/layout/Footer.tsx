import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-minimal">
      <p className="footer-attribution">
        A{" "}
        <a
          href="https://myhamlet.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hamlet
        </a>{" "}
        Publication
      </p>
      <p className="footer-colophon">
        Set in Fraunces &amp; Literata &middot;{" "}
        <Link href="/colophon">Colophon</Link>
      </p>
    </footer>
  );
}
