"use client";

import type { ReactNode } from "react";
import type { Column } from "@tanstack/react-table";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
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

const ALIGN = {
  left: "ui:justify-start",
  center: "ui:justify-center",
  right: "ui:justify-end",
} as const;

export type SortableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  children: ReactNode;
  /** Leading icon, before the label (e.g. a column glyph). */
  icon?: ReactNode;
  /** Number columns go `right`: the title sits over its values. @default "left" */
  align?: keyof typeof ALIGN;
  className?: string;
};

/**
 * Sortable table header cell for TanStack Table column defs (used with {@link DataTable}
 * or any `flexRender` header). Inherits header typography; reads optional
 * `column.columnDef.meta.thClassName` for header cell classes. For server-side sorting,
 * pass `sorting`, `onSortingChange` and `manualSorting` to `DataTable`.
 */
export function SortableColumnHeader<TData, TValue>({
  column,
  children,
  icon,
  align = "left",
  className,
}: SortableColumnHeaderProps<TData, TValue>) {
  const labels = useMalbecLabels();
  const meta = column.columnDef.meta as MetaWithClass | undefined;
  const wrapper = cn(
    "ui:flex ui:items-center ui:gap-[5px]",
    ALIGN[align],
    className,
    meta?.thClassName,
  );
  const iconNode = icon ? (
    <span className="ui:inline-flex ui:shrink-0 ui:items-center ui:[&>svg]:size-4">
      {icon}
    </span>
  ) : null;
  if (!column.getCanSort()) {
    return (
      <div className={wrapper}>
        {iconNode}
        {children}
      </div>
    );
  }

  const sort = column.getIsSorted();
  return (
    <div className={wrapper}>
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
        onClick={column.getToggleSortingHandler()}
        aria-label={
          sort === "asc"
            ? labels.sortDescending
            : sort === "desc"
              ? labels.clearSort
              : labels.sortAscending
        }
      >
        {iconNode}
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
