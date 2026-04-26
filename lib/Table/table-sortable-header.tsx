"use client";

import type { ReactNode } from "react";
import { useCallback, useId } from "react";
import { cn } from "../utils/cn";
import type { TableSortState } from "./table-sort-utils";

const ChevronUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="ui:size-3 ui:shrink-0"
    aria-hidden
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);
const ChevronDown = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="ui:size-3 ui:shrink-0"
    aria-hidden
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ChevronsUpDown = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="ui:size-3 ui:shrink-0 ui:opacity-50"
    aria-hidden
  >
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

type TableSortableHeaderProps = {
  columnId: string;
  sort: TableSortState;
  onSort: () => void;
  children: ReactNode;
  className?: string;
};

/**
 * Client-side sortable header for composed `Table` (no TanStack on the page).
 * For Storybook demos; not a package export.
 */
export function TableSortableHeader({
  columnId,
  sort,
  onSort,
  children,
  className,
}: TableSortableHeaderProps) {
  const id = useId();
  const active = sort?.key === columnId;
  const direction = active ? sort?.direction : null;
  const handle = useCallback(() => {
    onSort();
  }, [onSort]);

  return (
    <div
      className={cn("ui:flex ui:items-center ui:gap-[5px]", className)}
      aria-sort={
        !active
          ? undefined
          : direction === "asc"
            ? "ascending"
            : "descending"
      }
    >
      <button
        type="button"
        className={cn(
          "ui:inline-flex ui:appearance-none ui:items-center ui:gap-[5px]",
          "ui:border-0 ui:bg-transparent ui:p-0 ui:text-left ui:text-inherit",
          "ui:font-[inherit] ui:leading-[inherit] ui:tracking-[inherit]",
          "ui:text-current ui:outline-none ui:transition-colors",
          "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2",
          "ui:focus-visible:ring-offset-background-100",
        )}
        onClick={handle}
        aria-describedby={id}
        aria-pressed={active}
      >
        {children}
        {direction === "desc" ? (
          <ChevronDown />
        ) : direction === "asc" ? (
          <ChevronUp />
        ) : (
          <ChevronsUpDown />
        )}
      </button>
      <span id={id} className="ui:sr-only">
        {active
          ? `Sorted ${direction === "asc" ? "ascending" : "descending"}.`
          : "Click to sort this column."}
      </span>
    </div>
  );
}
