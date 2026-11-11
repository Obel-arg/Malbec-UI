"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "../Checkbox/Checkbox";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import type { MalbecLabels } from "../i18n/labels";
import { Table, type TableAppearance } from "../Table/Table";
import { cn } from "../utils/cn";
import { DataTablePagination } from "./DataTablePagination";
import {
  dataTableRootVariants,
  dataTableToolbarVariants,
} from "./data-table-variants";

export type DataTableRenderFooterContext<TData> = {
  table: TanStackTable<TData>;
};

export type DataTableRowEvent =
  | MouseEvent<HTMLTableRowElement>
  | KeyboardEvent<HTMLTableRowElement>;

type DataTableOnRowSelectionChange<TData> = (selectedRows: TData[]) => void;

interface DataTableBaseProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Shown when there are no rows. Required: apps are ES + EN, so there is no built-in text. */
  emptyLabel: ReactNode;
  /** Class on the outer wrapper (not the bordered `Table` shell). */
  className?: string;
  /** Renders after `<table>` starts (e.g. `<colgroup>`) before the header. */
  tableChildrenStart?: ReactNode;
  /**
   * Toolbar area above the table (e.g. filter + column controls). Use a function to read
   * TanStack `table` (e.g. `<DataTable.ColumnsToggle table={table} />`).
   */
  toolbar?:
    | ReactNode
    | ((ctx: DataTableRenderFooterContext<TData>) => ReactNode);
  /**
   * Renders below the table. Use a function to read TanStack `table` (e.g. selection
   * counts, pagination state).
   */
  footer?:
    | ReactNode
    | ((ctx: DataTableRenderFooterContext<TData>) => ReactNode);
  /**
   * Table shell look. The default is `default` (10px shell, `background-200` header,
   * 58px rows). `dataGrid` is the denser 6px grid with a 48px header.
   */
  tableAppearance?: TableAppearance;
  /**
   * When true, prepends a selection column with checkboxes (header: select all,
   * rows: per-row). Defaults to `false`.
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
   * Rows per page. Turns on client-side pagination; render the page links with
   * `footer={({ table }) => <DataTable.Pagination table={table} />}`.
   */
  pageSize?: number;
  /** Controlled pagination (`pageIndex` is 0-based). Pair with `onPaginationChange`. */
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  /**
   * Server-side pagination: total rows on the server. `data` is then the current page only and
   * the table doesn't slice it.
   */
  rowCount?: number;
  /**
   * Called whenever the row selection changes.
   * Receives the array of currently selected rows.
   */
  /**
   * Called when a row is clicked, middle-clicked, or activated with Enter/Space.
   * Receives the resolved row id, the original row data, and the event, so the
   * consumer can check modifiers (`metaKey`/`ctrlKey`) or `button === 1` to open
   * the row somewhere else.
   */
  onRowClick?: (rowId: string, rowData: TData, event: DataTableRowEvent) => void;
}

type DataTableWithRowSelectionProps<TData, TValue> = DataTableBaseProps<
  TData,
  TValue
> & {
  rowSelection: true;
  onRowSelectionChange?: DataTableOnRowSelectionChange<TData>;
};

type DataTableWithoutRowSelectionProps<TData, TValue> = DataTableBaseProps<
  TData,
  TValue
> & {
  rowSelection?: false;
  onRowSelectionChange?: () => void;
};

export type DataTableProps<TData, TValue> =
  | DataTableWithRowSelectionProps<TData, TValue>
  | DataTableWithoutRowSelectionProps<TData, TValue>;

function selectColumnDef<TData>(
  labels: Pick<MalbecLabels, "selectAllRows" | "selectRow">,
): ColumnDef<TData, unknown> {
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
          aria-label={labels.selectAllRows}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="ui:flex ui:h-full ui:items-center ui:justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={labels.selectRow}
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
  emptyLabel,
  className,
  tableChildrenStart,
  toolbar,
  footer,
  tableAppearance = "default",
  rowSelection: rowSelectionEnabled = false,
  getRowId,
  enableSorting = true,
  pageSize,
  pagination: paginationProp,
  onPaginationChange,
  rowCount,
  onRowSelectionChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const paginated = paginationProp != null || pageSize != null || rowCount != null;
  const [innerPagination, setInnerPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize ?? 10,
  });
  const pagination = paginationProp ?? innerPagination;
  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const next = typeof updater === "function" ? updater(pagination) : updater;
    if (!paginationProp) setInnerPagination(next);
    onPaginationChange?.(next);
  };

  const { selectAllRows, selectRow } = useMalbecLabels();
  const mergedColumns = useMemo<ColumnDef<TData, TValue>[]>(
    () =>
      rowSelectionEnabled
        ? (
            [selectColumnDef<TData>({ selectAllRows, selectRow })] as ColumnDef<TData, TValue>[]
          ).concat(columns)
        : columns,
    [columns, rowSelectionEnabled, selectAllRows, selectRow],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: mergedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(paginated && rowCount == null ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    manualPagination: rowCount != null,
    rowCount,
    getRowId,
    onSortingChange: setSorting,
    onRowSelectionChange: rowSelectionEnabled ? setRowSelection : undefined,
    onPaginationChange: paginated ? handlePaginationChange : undefined,
    state: {
      sorting,
      ...(rowSelectionEnabled ? { rowSelection } : {}),
      ...(paginated ? { pagination } : {}),
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
  const toolbarNode = typeof toolbar === "function" ? toolbar({ table }) : toolbar;
  const isRowClickable = Boolean(onRowClick);

  return (
    <div
      className={cn(dataTableRootVariants(), className)}
      data-slot="data-table"
      data-row-selection={rowSelectionEnabled || undefined}
    >
      {toolbarNode ? (
        <div
          className={dataTableToolbarVariants()}
          data-slot="data-table-toolbar"
        >
          {toolbarNode}
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
        <Table.Body className="ui:[&>tr:hover]:bg-background-200/50">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className={cn(isRowClickable && "ui:cursor-pointer")}
                tabIndex={isRowClickable ? 0 : undefined}
                role={isRowClickable ? "button" : undefined}
                onClick={(event) => {
                  if (!onRowClick || shouldIgnoreRowInteraction(event.target, event.currentTarget)) return;
                  onRowClick(row.id, row.original, event);
                }}
                onAuxClick={(event) => {
                  if (event.button !== 1) return;
                  if (!onRowClick || shouldIgnoreRowInteraction(event.target, event.currentTarget)) return;
                  onRowClick(row.id, row.original, event);
                }}
                onKeyDown={(event) => {
                  if (!onRowClick || shouldIgnoreRowInteraction(event.target, event.currentTarget)) return;
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onRowClick(row.id, row.original, event);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    className={dataCellClassName(cell.column.id, tableAppearance)}
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

// The row itself has role="button", so a match on the row doesn't count: only an
// interactive element inside it does.
function shouldIgnoreRowInteraction(target: EventTarget | null, row: HTMLElement): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const interactive = target.closest(
    'a, button, input, select, textarea, [role="button"], [data-row-click-ignore]',
  );
  return interactive !== null && interactive !== row;
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
  appearance: TableAppearance,
): string | undefined {
  if (columnId === "select") {
    return appearance === "dataGrid"
      ? "ui:w-8 ui:min-w-8 ui:px-2 ui:py-0 ui:text-center"
      : "ui:w-11 ui:min-w-[44px] ui:px-2 ui:text-center";
  }
  return undefined;
}

/** Page links for a paginated table: `footer={({ table }) => <DataTable.Pagination table={table} />}`. */
DataTable.Pagination = DataTablePagination;
