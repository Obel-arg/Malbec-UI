"use client";

import type { ReactNode } from "react";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { cn } from "../utils/cn";
import type { SortDirection } from "./table-sort-utils";

const glyphClass = "ui:size-3 ui:shrink-0";

function SortGlyph({ direction }: { direction: SortDirection | null }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cn(glyphClass, !direction && "ui:opacity-50")}
      aria-hidden
    >
      {direction === "asc" ? (
        <path d="m18 15-6-6-6 6" />
      ) : direction === "desc" ? (
        <path d="m6 9 6 6 6-6" />
      ) : (
        <>
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </>
      )}
    </svg>
  );
}

/**
 * The header's sort control: the label, then a glyph with the current direction. Its accessible
 * name says what the click does next (`next`), so screen readers hear the action, and the `<th>`
 * carries `aria-sort` with the current state.
 */
export function SortButton({
  direction,
  next,
  onClick,
  children,
}: {
  direction: SortDirection | null;
  next: SortDirection | null;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) {
  const labels = useMalbecLabels();
  return (
    <button
      type="button"
      className={cn(
        "ui:inline-flex ui:appearance-none ui:items-center ui:gap-[5px]",
        "ui:border-0 ui:bg-transparent ui:p-0 ui:text-left ui:text-inherit",
        "ui:font-[inherit] ui:leading-[inherit] ui:tracking-[inherit]",
        "ui:text-current ui:outline-none ui:transition-colors",
        "ui:focus-visible:ring-2 ui:focus-visible:ring-focus ui:focus-visible:ring-offset-2",
        "ui:focus-visible:ring-offset-background-100",
      )}
      onClick={onClick}
      aria-label={
        next === "asc" ? labels.sortAscending : next === "desc" ? labels.sortDescending : labels.clearSort
      }
    >
      {children}
      <SortGlyph direction={direction} />
    </button>
  );
}
