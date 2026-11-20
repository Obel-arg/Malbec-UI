"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { useCellLabels } from "./use-cell-labels";
import { SortButton } from "./sort-button";
import { ariaSortFor, type SortDirection } from "./table-sort-utils";
import {
  type TableAppearance,
  tableBodyGroupVariants,
  tableCaptionVariants,
  tableCellVariants,
  tableContainerVariants,
  tableElementVariants,
  tableFooterGroupVariants,
  tableHeaderGroupVariants,
  tableHeadVariants,
  tableRowVariants,
  tablePinnedHeaderVariants,
  tableStickyHeaderVariants,
} from "./table-variants";
import { usePinnedHeader, type TableStickyHeaderOptions } from "./use-pinned-header";

export type { TableStickyHeaderOptions } from "./use-pinned-header";

export type { TableAppearance } from "./table-variants";

const TableAppearanceContext = React.createContext<TableAppearance>("default");
const TableStickyHeaderContext = React.createContext<boolean | TableStickyHeaderOptions>(false);

function useTableAppearance(): TableAppearance {
  return React.useContext(TableAppearanceContext);
}

export type TableRootProps = React.ComponentProps<"table"> & {
  /**
   * `default` — Malbec “Events”-style table shell.
   * `dataGrid` — Data table spec (6px shell, 48px header, 16px body cells).
   */
  appearance?: TableAppearance;
  /**
   * Below 640px each row becomes a card: no header and no horizontal scroll, the first cell on
   * top at full width and the rest in a grid, each value with its column name underneath.
   * Desktop is unchanged.
   */
  stackOnMobile?: boolean;
  /**
   * Pins the header while the rows scroll.
   * - `true`: the rows scroll inside the table's own shell; give it a height with
   *   `containerClassName` (e.g. `ui:max-h-[480px]`).
   * - `{ scrollRoot }`: the page scrolls and the header stays at the top of `scrollRoot` (omitted:
   *   the nearest ancestor that scrolls, or the window) until the table's last row goes by. Works
   *   with a table that also scrolls sideways.
   */
  stickyHeader?: boolean | TableStickyHeaderOptions;
  /** Classes for the bordered container that scrolls (not the `<table>`). */
  containerClassName?: string;
};

const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  {
    className,
    appearance = "default",
    stackOnMobile = false,
    stickyHeader = false,
    containerClassName,
    ...rest
  },
  ref,
) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  useCellLabels(containerRef, stackOnMobile);
  return (
    <TableAppearanceContext.Provider value={appearance}>
      <TableStickyHeaderContext.Provider value={stickyHeader}>
        <div
          ref={containerRef}
          className={cn(
            tableContainerVariants({ appearance }),
            stickyHeader === true && "ui:overflow-y-auto",
            containerClassName,
          )}
          data-appearance={appearance}
          data-stack-on-mobile={stackOnMobile ? "" : undefined}
        >
          <table
            ref={ref}
            data-slot="table"
            className={cn(tableElementVariants({ appearance }), className)}
            {...rest}
          />
        </div>
      </TableStickyHeaderContext.Provider>
    </TableAppearanceContext.Provider>
  );
});

export type TableHeaderProps = React.ComponentProps<"thead">;

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...rest }, ref) {
    const appearance = useTableAppearance();
    const sticky = React.useContext(TableStickyHeaderContext);
    const pinned = typeof sticky === "object" ? sticky : null;
    const innerRef = React.useRef<HTMLTableSectionElement | null>(null);
    usePinnedHeader(innerRef, pinned);
    const setRef = (node: HTMLTableSectionElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };
    return (
      <thead
        ref={setRef}
        data-slot="table-header"
        className={cn(
          tableHeaderGroupVariants({ appearance }),
          sticky === true && tableStickyHeaderVariants({ appearance }),
          pinned && tablePinnedHeaderVariants({ appearance }),
          className,
        )}
        {...rest}
      />
    );
  },
);

export type TableBodyProps = React.ComponentProps<"tbody">;

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...rest }, ref) {
    const appearance = useTableAppearance();
    return (
      <tbody
        ref={ref}
        data-slot="table-body"
        className={cn(tableBodyGroupVariants({ appearance }), className)}
        {...rest}
      />
    );
  },
);

export type TableFooterProps = React.ComponentProps<"tfoot">;

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ className, ...rest }, ref) {
    return (
      <tfoot
        ref={ref}
        data-slot="table-footer"
        className={cn(tableFooterGroupVariants(), className)}
        {...rest}
      />
    );
  },
);

export type TableRowProps = React.ComponentProps<"tr">;

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...rest },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(tableRowVariants(), className)}
      {...rest}
    />
  );
});

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = "col", ...rest },
  ref,
) {
  const appearance = useTableAppearance();
  return (
    <th
      ref={ref}
      data-slot="table-head"
      scope={scope}
      className={cn(tableHeadVariants({ appearance }), className)}
      {...rest}
    />
  );
});

const SORTABLE_HEAD_ALIGN = {
  left: "ui:justify-start",
  center: "ui:justify-center",
  right: "ui:justify-end",
} as const;

export type TableSortableHeadProps = Omit<TableHeadProps, "onClick"> & {
  /** Current direction of this column, or `null` when the table is sorted by another one. */
  sort: SortDirection | null;
  /** Called on click; the table decides the next sort (URL, server, local state). */
  onSort: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * What a click does, for the button's accessible name. Defaults to `asc` → `desc`, anything
   * else → `asc`. Pass `null` when the click clears the sort.
   */
  nextSort?: SortDirection | null;
  /** Number columns go `right`: the title sits over its values. @default "left" */
  align?: keyof typeof SORTABLE_HEAD_ALIGN;
};

/**
 * Header cell that sorts its column in a table built with `Table` (no TanStack). Puts `aria-sort`
 * on the `<th>` and renders the same control as `SortableColumnHeader` in `DataTable`.
 */
const TableSortableHead = React.forwardRef<HTMLTableCellElement, TableSortableHeadProps>(
  function TableSortableHead({ sort, onSort, nextSort, align = "left", children, ...rest }, ref) {
    const next = nextSort === undefined ? (sort === "asc" ? "desc" : "asc") : nextSort;
    return (
      <TableHead ref={ref} aria-sort={ariaSortFor(sort)} {...rest}>
        <div className={cn("ui:flex ui:items-center ui:gap-[5px]", SORTABLE_HEAD_ALIGN[align])}>
          <SortButton direction={sort} next={next} onClick={onSort}>
            {children}
          </SortButton>
        </div>
      </TableHead>
    );
  },
);

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...rest },
  ref,
) {
  const appearance = useTableAppearance();
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(tableCellVariants({ appearance }), className)}
      {...rest}
    />
  );
});

export type TableCaptionProps = React.ComponentProps<"caption">;

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...rest }, ref) {
    return (
      <caption
        ref={ref}
        data-slot="table-caption"
        className={cn(tableCaptionVariants(), className)}
        {...rest}
      />
    );
  },
);

TableRoot.displayName = "Table";
TableHeader.displayName = "Table.Header";
TableBody.displayName = "Table.Body";
TableFooter.displayName = "Table.Footer";
TableRow.displayName = "Table.Row";
TableHead.displayName = "Table.Head";
TableSortableHead.displayName = "Table.SortableHead";
TableCell.displayName = "Table.Cell";
TableCaption.displayName = "Table.Caption";

type TableComponent = typeof TableRoot & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Head: typeof TableHead;
  SortableHead: typeof TableSortableHead;
  Cell: typeof TableCell;
  Caption: typeof TableCaption;
};

export const Table = TableRoot as TableComponent;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.SortableHead = TableSortableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
