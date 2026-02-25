"use client";

import { useState } from "react";

interface Moment {
  time: string;
  seconds: number;
  quote: string;
}

interface HamletMeetingEmbedProps {
  videoId: string;
  startTime: number;
  meetingTitle: string;
  meetingDate: string;
  bodyName: string;
  location: string;
  hamletMeetingUrl: string;
  moments: Moment[];
  searchUrl: string;
  searchLabel: string;
  className?: string;
}

export function HamletMeetingEmbed({
  videoId,
  startTime,
  meetingTitle,
  meetingDate,
  bodyName,
  location,
  hamletMeetingUrl,
  moments,
  searchUrl,
  searchLabel,
  className,
}: HamletMeetingEmbedProps) {
  const [currentStart, setCurrentStart] = useState(startTime);

  return (
    <div className={`hamlet-embed ${className ?? ""}`}>
      <div className="hamlet-embed__video">
        <iframe
          key={currentStart}
          src={`https://www.youtube.com/embed/${videoId}?start=${currentStart}&rel=0`}
          title={meetingTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="hamlet-embed__meta">
        <div className="hamlet-embed__location">
          <span className="hamlet-embed__dot" />
          {location} &middot; {bodyName}
        </div>
        <a
          href={hamletMeetingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hamlet-embed__title"
        >
          {meetingTitle} &mdash; {meetingDate}
        </a>
      </div>

      <div className="hamlet-embed__moments">
        {moments.map((m) => (
          <button
            key={m.seconds}
            className="hamlet-embed__moment"
            onClick={() => setCurrentStart(m.seconds)}
            title={`Jump to ${m.time}`}
          >
            <span className="hamlet-embed__timestamp">{m.time}</span>
            <span className="hamlet-embed__quote">
              &ldquo;{m.quote}&rdquo;
            </span>
          </button>
        ))}
      </div>

      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hamlet-embed__explore"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Explore {searchLabel} on Hamlet
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hamlet-embed__arrow"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );
}
