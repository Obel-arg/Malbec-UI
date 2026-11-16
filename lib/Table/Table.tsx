"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import { useCellLabels } from "./use-cell-labels";
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
  tableStickyHeaderVariants,
} from "./table-variants";

export type { TableAppearance } from "./table-variants";

const TableAppearanceContext = React.createContext<TableAppearance>("default");
const TableStickyHeaderContext = React.createContext(false);

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
   * Pins the header while the rows scroll. The container becomes the scroller, so give it a
   * height with `containerClassName` (e.g. `ui:max-h-[480px]`).
   */
  stickyHeader?: boolean;
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
            stickyHeader && "ui:overflow-y-auto",
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
    return (
      <thead
        ref={ref}
        data-slot="table-header"
        className={cn(
          tableHeaderGroupVariants({ appearance }),
          sticky && tableStickyHeaderVariants({ appearance }),
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
TableCell.displayName = "Table.Cell";
TableCaption.displayName = "Table.Caption";

type TableComponent = typeof TableRoot & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
  Row: typeof TableRow;
  Head: typeof TableHead;
  Cell: typeof TableCell;
  Caption: typeof TableCaption;
};

export const Table = TableRoot as TableComponent;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
