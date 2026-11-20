"use client";

import * as React from "react";

export type TableStickyHeaderOptions = {
  /**
   * The element that scrolls the page the table sits in. Omitted: the nearest ancestor that
   * scrolls vertically, or the window. `null`: not mounted yet; the header waits for it.
   */
  scrollRoot?: HTMLElement | null;
};

function nearestScrollRoot(from: HTMLElement): HTMLElement | null {
  let node = from.parentElement;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * Pins the header cells to the top of an outer scroll root while the table scrolls under it.
 * CSS `position: sticky` can't do it: the table shell scrolls sideways (`overflow-x`), which makes
 * it the sticky container. So each `<th>` moves with `translateY`, synced to the root's scroll,
 * and stops at the table's last row. The pin goes on the cells, not the `<thead>`: a
 * `table-header-group` can't be positioned in every engine, a `table-cell` can.
 */
export function usePinnedHeader(
  theadRef: React.RefObject<HTMLTableSectionElement | null>,
  options: TableStickyHeaderOptions | null,
): void {
  const waiting = options !== null && "scrollRoot" in options && options.scrollRoot == null;
  const explicitRoot = options?.scrollRoot ?? null;
  const enabled = options !== null && !waiting;

  React.useEffect(() => {
    const thead = theadRef.current;
    const table = thead?.closest("table");
    if (!enabled || !thead || !table) return;

    const root = explicitRoot ?? nearestScrollRoot(table);
    const scrollTarget: HTMLElement | Window = root ?? window;
    let frame = 0;
    let pinned = false;

    const cells = () => Array.from(thead.querySelectorAll<HTMLTableCellElement>("th"));

    const update = () => {
      frame = 0;
      const tableRect = table.getBoundingClientRect();
      const rootTop = root ? root.getBoundingClientRect().top : 0;
      const headerHeight = thead.getBoundingClientRect().height;
      const offset = Math.min(rootTop - tableRect.top, tableRect.height - headerHeight);
      const nextPinned = offset > 0;
      if (nextPinned !== pinned) {
        pinned = nextPinned;
        if (pinned) thead.setAttribute("data-pinned", "");
        else thead.removeAttribute("data-pinned");
      }
      for (const cell of cells()) {
        cell.style.transform = pinned ? `translateY(${offset}px)` : "";
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    scrollTarget.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(table);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scrollTarget.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      thead.removeAttribute("data-pinned");
      for (const cell of cells()) cell.style.transform = "";
    };
  }, [theadRef, enabled, explicitRoot]);
}
