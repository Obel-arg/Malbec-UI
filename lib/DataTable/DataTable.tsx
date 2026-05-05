"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "../Checkbox/Checkbox";
import { Table, type TableAppearance } from "../Table/Table";
import { cn } from "../utils/cn";
import {
  dataTableRootVariants,
  dataTableToolbarVariants,
} from "./data-table-variants";

export type DataTableRenderFooterContext<TData> = {
  table: TanStackTable<TData>;
};

type DataTableOnRowSelectionChange<TData> = (selectedRows: TData[]) => void;

interface DataTableBaseProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Shown when there are no rows. */
  emptyLabel?: string;
  /** Class on the outer wrapper (not the bordered `Table` shell). */
  className?: string;
  /** Renders after `<table>` starts (e.g. `<colgroup>`) before the header. */
  tableChildrenStart?: ReactNode;
  /** Toolbar area above the table (e.g. filter + column controls). */
  toolbar?: ReactNode;
  /**
   * Renders below the table. Use a function to read TanStack `table` (e.g. selection
   * counts, pagination state).
   */
  footer?:
    | ReactNode
    | ((ctx: DataTableRenderFooterContext<TData>) => ReactNode);
  /**
   * Table shell look. The default is `dataGrid` (Malbec data-table spec: 6px corner,
   * 48px header, 16px body padding). Use `default` for the “Events”-style 10px shell.
   */
  tableAppearance?: TableAppearance;
  /**
   * When true, prepends a selection column with checkboxes (header: select all,
   * rows: per-row). Defaults to `true`.
   */
  rowSelection?: boolean;
  /**
   * Stable id for each row, required for reliable selection. Should match a unique
   * field on `TData` (e.g. `row.id` or `row.uuid`).
   */
  getRowId?: (row: TData) => string;
  /** When false, sorting is disabled. Defaults to `true`. */
  enableSorting?: boolean;
  /**
   * Called whenever the row selection changes.
   * Receives the array of currently selected rows.
   */
  /**
   * Called when a row is clicked (or activated with Enter/Space).
   * Receives the resolved row id and original row data.
   */
  onRowClick?: (rowId: string, rowData: TData) => void;
}

type DataTableWithRowSelectionProps<TData, TValue> = DataTableBaseProps<
  TData,
  TValue
> & {
  rowSelection?: true;
  onRowSelectionChange?: DataTableOnRowSelectionChange<TData>;
};

type DataTableWithoutRowSelectionProps<TData, TValue> = DataTableBaseProps<
  TData,
  TValue
> & {
  rowSelection: false;
  onRowSelectionChange?: () => void;
};

export type DataTableProps<TData, TValue> =
  | DataTableWithRowSelectionProps<TData, TValue>
  | DataTableWithoutRowSelectionProps<TData, TValue>;

function selectColumnDef<TData>(): ColumnDef<TData, unknown> {
  return {
    id: "select",
    header: ({ table }) => (
      <div className="ui:flex ui:h-full ui:items-center ui:justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="ui:flex ui:h-full ui:items-center ui:justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

/**
 * Headless data grid: TanStack `useReactTable` + the design-system `Table` shell.
 * Supports column sorting and optional row selection (checkbox column).
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  emptyLabel = "No results.",
  className,
  tableChildrenStart,
  toolbar,
  footer,
  tableAppearance = "dataGrid",
  rowSelection: rowSelectionEnabled = true,
  getRowId,
  enableSorting = true,
  onRowSelectionChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const mergedColumns = useMemo<ColumnDef<TData, TValue>[]>(
    () =>
      rowSelectionEnabled
        ? ([selectColumnDef<TData>()] as ColumnDef<TData, TValue>[]).concat(
            columns,
          )
        : columns,
    [columns, rowSelectionEnabled],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: mergedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId,
    onSortingChange: setSorting,
    onRowSelectionChange: rowSelectionEnabled ? setRowSelection : undefined,
    state: {
      sorting,
      ...(rowSelectionEnabled ? { rowSelection } : {}),
    },
    enableRowSelection: rowSelectionEnabled,
    enableSorting,
  });

  const onRowSelectionChangeRef = useRef<
    DataTableOnRowSelectionChange<TData> | undefined
  >(undefined);
  useEffect(() => {
    onRowSelectionChangeRef.current = rowSelectionEnabled
      ? (onRowSelectionChange as DataTableOnRowSelectionChange<TData> | undefined)
      : undefined;
  }, [onRowSelectionChange, rowSelectionEnabled]);

  useEffect(() => {
    if (!rowSelectionEnabled || !onRowSelectionChangeRef.current) return;
    const selectedRows = table
      .getFilteredSelectedRowModel()
      .rows.map((r) => r.original);
    onRowSelectionChangeRef.current(selectedRows);
  }, [rowSelection, rowSelectionEnabled, table]);

  const columnCount = table.getVisibleFlatColumns().length;

  const footerNode = typeof footer === "function" ? footer({ table }) : footer;
  const isRowClickable = Boolean(onRowClick);

  return (
    <div
      className={cn(dataTableRootVariants(), className)}
      data-slot="data-table"
      data-row-selection={rowSelectionEnabled || undefined}
    >
      {toolbar ? (
        <div
          className={dataTableToolbarVariants()}
          data-slot="data-table-toolbar"
        >
          {toolbar}
        </div>
      ) : null}
      <Table appearance={tableAppearance}>
        {tableChildrenStart}
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Head
                    key={header.id}
                    colSpan={header.colSpan}
                    className={headerThClassName(header, tableAppearance)}
                    aria-sort={(() => {
                      if (!header.column.getCanSort()) return undefined;
                      const s = header.column.getIsSorted();
                      if (s === "asc") return "ascending";
                      if (s === "desc") return "descending";
                      return undefined;
                    })()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.Head>
                );
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className={cn(isRowClickable && "ui:cursor-pointer")}
                tabIndex={isRowClickable ? 0 : undefined}
                role={isRowClickable ? "button" : undefined}
                onClick={(event) => {
                  if (!onRowClick || shouldIgnoreRowInteraction(event.target)) return;
                  onRowClick(row.id, row.original);
                }}
                onKeyDown={(event) => {
                  if (!onRowClick || shouldIgnoreRowInteraction(event.target)) return;
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onRowClick(row.id, row.original);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    className={dataCellClassName(
                      cell.column.id,
                      rowSelectionEnabled,
                      tableAppearance,
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row className="ui:h-24!">
              <Table.Cell
                colSpan={Math.max(1, columnCount)}
                className={cn(
                  "ui:h-24 ui:text-center ui:font-medium ui:text-text-default-muted",
                  tableAppearance === "dataGrid"
                    ? "ui:text-sm"
                    : "ui:text-[13px]",
                )}
              >
                {emptyLabel}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {footerNode ? (
        <div className="ui:mt-2 ui:w-full" data-slot="data-table-footer">
          {footerNode}
        </div>
      ) : null}
    </div>
  );
}

type ColMeta = { thClassName?: string; tdClassName?: string };

function shouldIgnoreRowInteraction(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'a, button, input, select, textarea, [role="button"], [data-row-click-ignore]',
    ),
  );
}

function headerThClassName(
  header: {
    column: { id: string; columnDef: { meta?: unknown } };
  },
  appearance: TableAppearance,
): string | undefined {
  return cn(
    header.column.id === "select" &&
      (appearance === "dataGrid"
        ? "ui:w-8 ui:min-w-8 ui:px-2 ui:py-0 ui:text-center"
        : "ui:w-11 ui:min-w-[44px] ui:px-2 ui:text-center"),
    (header.column.columnDef.meta as ColMeta | undefined)?.thClassName,
  );
}

function dataCellClassName(
  columnId: string,
  hasRowSelect: boolean,
  appearance: TableAppearance,
): string | undefined {
  if (columnId === "select") {
    return appearance === "dataGrid"
      ? "ui:w-8 ui:min-w-8 ui:px-2 ui:py-0 ui:text-center"
      : "ui:w-11 ui:min-w-[44px] ui:px-2 ui:text-center";
  }
  if (hasRowSelect && columnId === "artist" && appearance === "default") {
    return "ui:!pl-[13px] ui:pr-4";
  }
  return undefined;
}
