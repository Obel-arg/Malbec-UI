"use client";

import type { ReactNode } from "react";
import type { Column } from "@tanstack/react-table";
import { cn } from "../utils/cn";

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

type MetaWithClass = { thClassName?: string };

/**
 * Renders a semantic button that inherits the table header typography.
 * (Internal helper; not re-exported from the package root.)
 */
export function SortableColumnHeader<TData, TValue>({
  column,
  children,
  className,
}: {
  column: Column<TData, TValue>;
  children: ReactNode;
  className?: string;
}) {
  const meta = column.columnDef.meta as MetaWithClass | undefined;
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "ui:flex ui:items-center ui:gap-[5px]",
          className,
          meta?.thClassName,
        )}
      >
        {children}
      </div>
    );
  }

  const sort = column.getIsSorted();
  return (
    <div
      className={cn(
        "ui:flex ui:items-center ui:gap-[5px]",
        className,
        meta?.thClassName,
      )}
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
        onClick={column.getToggleSortingHandler()}
        aria-label={
          sort === "asc"
            ? "Sort descending"
            : sort === "desc"
              ? "Clear sort"
              : "Sort ascending"
        }
      >
        {children}
        {sort === "desc" ? (
          <ChevronDown />
        ) : sort === "asc" ? (
          <ChevronUp />
        ) : (
          <ChevronsUpDown />
        )}
      </button>
    </div>
  );
}
