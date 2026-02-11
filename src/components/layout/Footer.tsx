import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-minimal">
      <p className="footer-attribution">
        A{" "}
        <a
          href="https://www.myhamlet.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hamlet
        </a>{" "}
        Publication
      </p>
      <p className="footer-colophon">
        <Link href="/about">About</Link>
      </p>
    </footer>
  );
}
