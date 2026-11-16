"use client";

import { Fragment, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import {
  type Cell,
  type Column,
  type Row,
  type Table as TanStackTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { Checkbox } from "../Checkbox/Checkbox";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";
import { cn } from "../utils/cn";
import { columnLabel } from "./column-label";
import {
  dataTableListItemVariants,
  dataTableListSubtitleVariants,
  dataTableListTitleVariants,
  dataTableListToolbarVariants,
  dataTableListVariants,
} from "./data-table-variants";
import { shouldIgnoreRowInteraction } from "./row-interaction";

/** Where a column goes in a phone list row (`DataTable mobileLayout="list"`). */
export type DataTableMobileSlot = "title" | "subtitle" | "trailing" | "hidden";

type ListMeta = { mobile?: DataTableMobileSlot };

export type DataTableListRowEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;

/**
 * Slot of each data column: `meta.mobile` when set. With no `meta.mobile` on any column, the
 * first column is the title and the next two the subtitle, the rest hidden.
 */
function slotsFor<TData>(columns: Column<TData, unknown>[]): Map<string, DataTableMobileSlot> {
  const anyMeta = columns.some((c) => (c.columnDef.meta as ListMeta | undefined)?.mobile);
  const slots = new Map<string, DataTableMobileSlot>();
  columns.forEach((column, index) => {
    const meta = (column.columnDef.meta as ListMeta | undefined)?.mobile;
    slots.set(
      column.id,
      anyMeta ? (meta ?? "hidden") : index === 0 ? "title" : index <= 2 ? "subtitle" : "hidden",
    );
  });
  return slots;
}

export interface DataTableListProps<TData> {
  table: TanStackTable<TData>;
  emptyLabel: ReactNode;
  rowSelection: boolean;
  onRowClick?: (rowId: string, rowData: TData, event: DataTableListRowEvent) => void;
}

/**
 * The phone layout of `DataTable` (`mobileLayout="list"`): one line per row with a title, a
 * subtitle that joins a few values, and trailing values (a status, a menu). Sorting and
 * select-all sit in a bar above. Rendered next to the table and shown only below `sm`, so the
 * server and the first client render match.
 */
export function DataTableList<TData>({
  table,
  emptyLabel,
  rowSelection,
  onRowClick,
}: DataTableListProps<TData>) {
  const labels = useMalbecLabels();
  const dataColumns = table
    .getVisibleLeafColumns()
    .filter((c) => c.id !== "select") as Column<TData, unknown>[];
  const slots = slotsFor(dataColumns);
  const sortable = table.getAllLeafColumns().filter((c) => c.getCanSort());
  const sorted = table.getState().sorting[0];
  const sortedColumn = sorted ? table.getColumn(sorted.id) : undefined;
  const rows = table.getRowModel().rows;

  const toolbar =
    sortable.length > 0 || rowSelection ? (
      <div className={dataTableListToolbarVariants()} data-slot="data-table-list-toolbar">
        {rowSelection ? (
          <label className="ui:flex ui:items-center ui:gap-2 ui:text-[13px] ui:text-text-default">
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
            <span aria-hidden>{labels.selectAllRows}</span>
          </label>
        ) : (
          <span />
        )}
        {sortable.length > 0 ? (
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="ui:inline-flex ui:min-h-9 ui:items-center ui:gap-1.5 ui:rounded-[8px] ui:px-2 ui:text-[13px] ui:text-text-default ui:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-focus"
              >
                <span className="ui:text-text-default-muted">{labels.sortBy}</span>
                {sortedColumn ? (
                  <>
                    <span className="ui:font-medium">
                      {columnLabel(sortedColumn as Column<TData, unknown>)}
                    </span>
                    {sorted?.desc ? (
                      <ArrowDown aria-hidden className="ui:size-3.5" />
                    ) : (
                      <ArrowUp aria-hidden className="ui:size-3.5" />
                    )}
                  </>
                ) : (
                  <ChevronDown aria-hidden className="ui:size-3.5 ui:text-text-default-muted" />
                )}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" className="ui:min-w-[200px]">
              <DropdownMenu.RadioGroup
                value={sorted?.id ?? ""}
                onValueChange={(id) => table.setSorting([{ id, desc: sorted?.desc ?? false }])}
              >
                {sortable.map((column) => (
                  <DropdownMenu.RadioItem key={column.id} value={column.id}>
                    {columnLabel(column as Column<TData, unknown>)}
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup
                value={sorted ? (sorted.desc ? "desc" : "asc") : ""}
                onValueChange={(dir) => {
                  if (sorted) table.setSorting([{ id: sorted.id, desc: dir === "desc" }]);
                }}
              >
                <DropdownMenu.RadioItem value="asc" disabled={!sorted}>
                  {labels.ascending}
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="desc" disabled={!sorted}>
                  {labels.descending}
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu>
        ) : null}
      </div>
    ) : null;

  return (
    <div className={dataTableListVariants()} data-slot="data-table-list">
      {toolbar}
      {rows.length ? (
        <ul className="ui:m-0 ui:list-none ui:p-0">
          {rows.map((row) => (
            <ListRow key={row.id} row={row} slots={slots} rowSelection={rowSelection} onRowClick={onRowClick} />
          ))}
        </ul>
      ) : (
        <div className="ui:px-4 ui:py-4 ui:text-[13px] ui:text-text-default-muted">{emptyLabel}</div>
      )}
    </div>
  );
}

function ListRow<TData>({
  row,
  slots,
  rowSelection,
  onRowClick,
}: {
  row: Row<TData>;
  slots: Map<string, DataTableMobileSlot>;
  rowSelection: boolean;
  onRowClick?: DataTableListProps<TData>["onRowClick"];
}) {
  const labels = useMalbecLabels();
  const cells = row.getVisibleCells().filter((c) => c.column.id !== "select");
  const inSlot = (slot: DataTableMobileSlot) => cells.filter((c) => slots.get(c.column.id) === slot);
  const render = (cell: Cell<TData, unknown>) => flexRender(cell.column.columnDef.cell, cell.getContext());
  const title = inSlot("title");
  const subtitle = inSlot("subtitle");
  const trailing = inSlot("trailing");
  const clickable = Boolean(onRowClick);
  const open = (event: DataTableListRowEvent) => {
    if (!onRowClick || shouldIgnoreRowInteraction(event.target, event.currentTarget)) return;
    onRowClick(row.id, row.original, event);
  };

  return (
    <li className={dataTableListItemVariants()} data-state={row.getIsSelected() ? "selected" : undefined}>
      {rowSelection ? (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={labels.selectRow}
        />
      ) : null}
      <div
        data-slot="data-table-list-text"
        // Width 0 + flex-1: the nowrap title adds nothing to the list's minimum width, so a long
        // one truncates instead of widening a flex parent past the screen.
        className={cn("ui:w-0 ui:min-w-0 ui:flex-1 ui:outline-none", clickable && "ui:cursor-pointer")}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={open}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          open(event);
        }}
      >
        {title.length ? (
          <div className={dataTableListTitleVariants()} data-slot="data-table-list-title">
            {title.map((cell) => (
              <Fragment key={cell.id}>{render(cell)}</Fragment>
            ))}
          </div>
        ) : null}
        {subtitle.length ? (
          <div className={dataTableListSubtitleVariants()} data-slot="data-table-list-subtitle">
            {subtitle.map((cell, i) => (
              <Fragment key={cell.id}>
                {i > 0 ? (
                  <span aria-hidden className="ui:whitespace-pre">
                    {" · "}
                  </span>
                ) : null}
                <span className="ui:inline-flex ui:items-center">{render(cell)}</span>
              </Fragment>
            ))}
          </div>
        ) : null}
      </div>
      {trailing.length ? (
        <div className="ui:flex ui:shrink-0 ui:items-center ui:gap-2" data-slot="data-table-list-trailing">
          {trailing.map((cell) => (
            <Fragment key={cell.id}>{render(cell)}</Fragment>
          ))}
        </div>
      ) : null}
    </li>
  );
}
