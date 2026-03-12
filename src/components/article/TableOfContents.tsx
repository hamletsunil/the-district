"use client";

import { useState, useEffect } from "react";

interface TOCSection {
  id: string;
  label: string;
  number: string;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  cssPrefix?: string;
}

export function TableOfContents({
  sections,
  cssPrefix = "toc",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const p = cssPrefix;

  return (
    <>
      <button
        className={`${p}-toc-toggle`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Table of contents"
      >
        <span className={`${p}-toc-toggle-icon`}>
          {isOpen ? "\u2715" : "\u2630"}
        </span>
        <span className={`${p}-toc-toggle-label`}>Contents</span>
      </button>

      <nav
        className={`${p}-toc ${isOpen ? `${p}-toc--open` : ""}`}
        aria-label="Table of contents"
      >
        <div className={`${p}-toc-header`}>Contents</div>
        <ol className={`${p}-toc-list`}>
          {sections.map(({ id, label, number }) => (
            <li key={id} className={`${p}-toc-item`}>
              <button
                className={`${p}-toc-link ${activeId === id ? `${p}-toc-link--active` : ""}`}
                onClick={() => handleClick(id)}
              >
                <span className={`${p}-toc-number`}>{number}</span>
                <span className={`${p}-toc-label`}>{label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {isOpen && (
        <div
          className={`${p}-toc-overlay`}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
