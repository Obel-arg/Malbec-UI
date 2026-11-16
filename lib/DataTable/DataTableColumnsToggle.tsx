"use client";

import type { ReactNode } from "react";
import type { Column, Table as TanStackTable } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";
import { Button } from "../Button/Button";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { useMalbecLabels } from "../i18n/MalbecLabelsProvider";

export type DataTableColumnsToggleProps<TData> = {
  /** The TanStack table, from `DataTable`'s `toolbar={({ table }) => …}`. */
  table: TanStackTable<TData>;
  /** Trigger text. Defaults to the `columns` label of `MalbecLabelsProvider`. */
  label?: ReactNode;
  className?: string;
};

/** Name shown in the menu: `meta.label`, else a string `header`, else the column id. */
function columnLabel<TData>(column: Column<TData, unknown>): ReactNode {
  const meta = column.columnDef.meta as { label?: ReactNode } | undefined;
  if (meta?.label != null) return meta.label;
  const header = column.columnDef.header;
  return typeof header === "string" ? header : column.id;
}

/**
 * Menu to show or hide columns of a `DataTable`. Lists every column that can hide
 * (`enableHiding: false` opts one out).
 */
export function DataTableColumnsToggle<TData>({
  table,
  label,
  className,
}: DataTableColumnsToggleProps<TData>) {
  const labels = useMalbecLabels();
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" className={className}>
          <Button.Icon>
            <Columns3 />
          </Button.Icon>
          <Button.Text>{label ?? labels.columns}</Button.Text>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="ui:min-w-[200px]">
        {table
          .getAllLeafColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenu.CheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(value === true)}
              onSelect={(event) => event.preventDefault()}
            >
              {columnLabel(column as Column<TData, unknown>)}
            </DropdownMenu.CheckboxItem>
          ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
