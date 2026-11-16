import { cva } from "class-variance-authority";

/** Optional outer wrapper for `DataTable` (the bordered shell lives on `Table`). */
export const dataTableRootVariants = cva(
  "ui:malbec-font-sans ui:w-full ui:min-w-0",
);

/** Top toolbar row (e.g. filter + column menu) above the table. */
export const dataTableToolbarVariants = cva(
  "ui:mb-2 ui:flex ui:w-full ui:flex-wrap ui:items-center ui:gap-2",
);

/** Phone list (`mobileLayout="list"`): the same shell as `Table`, one line per row. */
export const dataTableListVariants = cva([
  "ui:sm:hidden",
  "ui:w-full ui:overflow-hidden ui:rounded-[10px]",
  "ui:border ui:border-solid ui:border-background-300 ui:bg-background-100",
  "ui:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]",
]);

/** Sort and select-all above the rows. */
export const dataTableListToolbarVariants = cva(
  "ui:flex ui:min-h-11 ui:items-center ui:justify-between ui:gap-3 ui:border-b ui:border-background-300 ui:bg-background-200 ui:px-4 ui:py-1.5",
);

export const dataTableListItemVariants = cva([
  "ui:flex ui:min-h-14 ui:items-center ui:gap-3 ui:px-4 ui:py-2.5",
  "ui:border-b ui:border-background-300 ui:last:border-b-0",
  "ui:data-[state=selected]:bg-background-200",
]);

export const dataTableListTitleVariants = cva(
  "ui:min-w-0 ui:truncate ui:text-sm ui:font-medium ui:leading-5 ui:text-text-default",
);

/** Up to two lines; each value stays whole and wraps as a unit, never cut in the middle. */
export const dataTableListSubtitleVariants = cva(
  "ui:mt-0.5 ui:min-w-0 ui:line-clamp-2 ui:text-xs ui:leading-5 ui:text-text-default-muted ui:[&_*]:align-middle",
);
