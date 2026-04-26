"use client";

import type { ReactNode } from "react";

const Icon20 = ({ children }: { children: ReactNode }) => (
  <span
    className="ui:inline-flex ui:size-5 ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default-muted"
    aria-hidden
  >
    {children}
  </span>
);

const Icon24 = ({ children }: { children: ReactNode }) => (
  <span
    className="ui:inline-flex ui:size-6 ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default-muted"
    aria-hidden
  >
    {children}
  </span>
);

export function TableStoryHeaderIconArtist() {
  return (
    <Icon20>
      <svg viewBox="0 0 24 24" fill="currentColor" className="ui:size-5">
        <path d="M12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1.5c-2.33 0-7 1.17-7 3.5V19h6v-5h2v5h6v-8c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    </Icon20>
  );
}

export function TableStoryHeaderIconVenue() {
  return (
    <Icon20>
      <svg viewBox="0 0 24 24" fill="currentColor" className="ui:size-5">
        <path d="M4 5v15h2v-6h2v6h2V5H4zm4 0v5h2V5H8zm4 0v2h2V5h-2zm0 3v2h2V8h-2zm-4 5v-2H8v2H6zm4 0H8v-2h2v2z" />
      </svg>
    </Icon20>
  );
}

export function TableStoryHeaderIconCalendar() {
  return (
    <Icon20>
      <svg viewBox="0 0 24 24" fill="currentColor" className="ui:size-5">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
      </svg>
    </Icon20>
  );
}

export function TableStoryHeaderIconListStatus() {
  return (
    <Icon24>
      <svg viewBox="0 0 24 24" fill="currentColor" className="ui:size-6">
        <path d="M3 5h2v2H3V5zm0 6h2v2H3v-2zm0 6h2v2H3v-2zm4-12h12v2H7V5zm0 6h12v2H7v-2zm0 6h12v2H7v-2z" />
      </svg>
    </Icon24>
  );
}
