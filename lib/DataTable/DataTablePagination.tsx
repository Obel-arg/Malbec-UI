"use client";

import type { MouseEvent } from "react";
import type { Table as TanStackTable } from "@tanstack/react-table";
import { Pagination } from "../Pagination/Pagination";
import { cn } from "../utils/cn";

type PageToken = number | "gap-left" | "gap-right";

/** First, last and the current page ± `siblings`, with a gap marker wherever pages are skipped. */
function pageWindow(current: number, total: number, siblings = 1): PageToken[] {
  const visible = new Set([1, total]);
  for (let p = current - siblings; p <= current + siblings; p++) visible.add(p);
  const pages = [...visible].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: PageToken[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) out.push(p > current ? "gap-right" : "gap-left");
    out.push(p);
  });
  return out;
}

export type DataTablePaginationProps<TData> = {
  /** The TanStack table, from `DataTable`'s `footer={({ table }) => …}`. */
  table: TanStackTable<TData>;
  /** Pages shown on each side of the current one. @default 1 */
  siblings?: number;
  className?: string;
};

/**
 * Page links for a paginated `DataTable` (`pageSize`, controlled `pagination` or server
 * `rowCount`). Renders nothing when everything fits in one page.
 */
export function DataTablePagination<TData>({
  table,
  siblings = 1,
  className,
}: DataTablePaginationProps<TData>) {
  const total = table.getPageCount();
  if (total <= 1) return null;
  const current = table.getState().pagination.pageIndex + 1;
  const isFirst = current === 1;
  const isLast = current === total;

  const go = (page: number) => (event: MouseEvent) => {
    event.preventDefault();
    if (page >= 1 && page <= total && page !== current) table.setPageIndex(page - 1);
  };

  return (
    <Pagination className={className}>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            href="#"
            aria-disabled={isFirst || undefined}
            tabIndex={isFirst ? -1 : undefined}
            className={cn(isFirst && "ui:pointer-events-none ui:opacity-40")}
            onClick={go(current - 1)}
          />
        </Pagination.Item>
        {pageWindow(current, total, siblings).map((token) =>
          typeof token === "number" ? (
            <Pagination.Item key={token}>
              <Pagination.Link href="#" isActive={token === current} onClick={go(token)}>
                {token}
              </Pagination.Link>
            </Pagination.Item>
          ) : (
            <Pagination.Item key={token}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next
            href="#"
            aria-disabled={isLast || undefined}
            tabIndex={isLast ? -1 : undefined}
            className={cn(isLast && "ui:pointer-events-none ui:opacity-40")}
            onClick={go(current + 1)}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
