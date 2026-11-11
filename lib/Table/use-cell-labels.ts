"use client";

import * as React from "react";

/**
 * Writes each body/footer cell's column name into `data-label`, read from the last header row
 * and honouring `colSpan` (a cell spanning columns gets none). `stackOnMobile` shows it under
 * the value when the row turns into a card.
 */
function labelCells(table: HTMLTableElement) {
  const headRows = table.tHead?.rows;
  const head = headRows?.length ? headRows[headRows.length - 1] : null;
  if (!head) return;
  const labels: string[] = [];
  for (const th of Array.from(head.cells)) {
    const text = (th.textContent ?? "").replace(/\s+/g, " ").trim();
    for (let i = 0; i < Math.max(1, th.colSpan); i++) labels.push(text);
  }
  const rows = [
    ...Array.from(table.tBodies).flatMap((body) => Array.from(body.rows)),
    ...(table.tFoot ? Array.from(table.tFoot.rows) : []),
  ];
  for (const row of rows) {
    let col = 0;
    for (const cell of Array.from(row.cells)) {
      const label = cell.colSpan > 1 ? "" : (labels[col] ?? "");
      if (label) {
        if (cell.getAttribute("data-label") !== label) cell.setAttribute("data-label", label);
      } else if (cell.hasAttribute("data-label")) {
        cell.removeAttribute("data-label");
      }
      col += Math.max(1, cell.colSpan);
    }
  }
}

/** Keeps the `data-label`s current: rows change without the table re-mounting. */
export function useCellLabels(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  React.useEffect(() => {
    const root = ref.current;
    if (!enabled || !root) return;
    const run = () => root.querySelectorAll("table").forEach(labelCells);
    run();
    const observer = new MutationObserver(run);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [ref, enabled]);
}
