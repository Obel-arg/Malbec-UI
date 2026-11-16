import type { ReactNode } from "react";
import type { Column } from "@tanstack/react-table";

/** Name shown in the menu: `meta.label`, else a string `header`, else the column id. */
export function columnLabel<TData>(column: Column<TData, unknown>): ReactNode {
  const meta = column.columnDef.meta as { label?: ReactNode } | undefined;
  if (meta?.label != null) return meta.label;
  const header = column.columnDef.header;
  return typeof header === "string" ? header : column.id;
}
