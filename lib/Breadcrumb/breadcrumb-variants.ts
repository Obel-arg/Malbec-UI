import { cva } from "class-variance-authority";

/**
 * Malbec OS breadcrumb frame (node 58:238): row, 10px gaps, 14/20 Inter regular,
 * −0.42px tracking, `#3f3f46` trail text, darker current page, 16px chevron / ellipsis.
 */
export const breadcrumbListVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex",
    "ui:flex-wrap",
    "ui:items-center",
    "ui:gap-2.5",
    "ui:wrap-break-word",
    "ui:text-sm",
    "ui:font-normal",
    "ui:leading-5",
    "ui:tracking-[-0.42px]",
  ],
);

export const breadcrumbItemVariants = cva(
  "ui:inline-flex ui:items-center ui:gap-2.5 ui:shrink-0",
);

export const breadcrumbLinkVariants = cva(
  [
    "ui:text-text-default",
    "ui:transition-colors",
    "ui:hover:text-foreground",
    "ui:focus-visible:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:rounded-sm",
  ],
);

export const breadcrumbPageVariants = cva(
  "ui:font-normal ui:text-foreground ui:max-w-[20ch] ui:truncate",
);

export const breadcrumbSeparatorVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default-muted ui:[&>svg]:size-4 ui:pointer-events-none",
);

export const breadcrumbEllipsisVariants = cva(
  "ui:inline-flex ui:size-4 ui:shrink-0 ui:items-center ui:justify-center ui:text-text-default-muted ui:[&>svg]:size-4",
);
