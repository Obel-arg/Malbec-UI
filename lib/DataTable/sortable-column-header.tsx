"use client";

import type { ReactNode } from "react";
import type { Column } from "@tanstack/react-table";
import { SortButton } from "../Table/sort-button";
import { cn } from "../utils/cn";

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

  const sort = column.getIsSorted() || null;
  return (
    <div className={wrapper}>
      <SortButton
        direction={sort}
        next={column.getNextSortingOrder() || null}
        onClick={column.getToggleSortingHandler() ?? (() => {})}
      >
        {iconNode}
        {children}
      </SortButton>
    </div>
  );
}
