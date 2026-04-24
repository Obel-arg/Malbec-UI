import { cva } from "class-variance-authority";

/** Optional outer wrapper for `DataTable` (the bordered shell lives on `Table`). */
export const dataTableRootVariants = cva(
  "ui:malbec-font-sans ui:w-full ui:min-w-0",
);

/** Top toolbar row (e.g. filter + column menu) above the table. */
export const dataTableToolbarVariants = cva(
  "ui:mb-2 ui:flex ui:w-full ui:flex-wrap ui:items-center ui:gap-2",
);
