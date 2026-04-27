import { cva } from "class-variance-authority";

/**
 * Malbec OS Pagination (node 66:5224 / 66:5243): row, gap-1, 14/20 Inter medium,
 * number cells 40×40 rounded-md, active = border on background-300, prev/next
 * 40px height rounded-sm, ellipsis 16px inside padded hit area.
 */
export const paginationContentVariants = cva([
  "malbec-font-sans",
  "ui:flex",
  "ui:flex-row",
  "ui:items-center",
  "ui:gap-1",
  "ui:w-full",
  "ui:justify-center",
  "ui:list-none",
]);

export const paginationItemVariants = cva(
  "ui:inline-flex ui:items-center",
);

export const paginationLinkVariants = cva(
  [
    "ui:inline-flex",
    "ui:items-center",
    "ui:justify-center",
    "ui:shrink-0",
    "ui:cursor-pointer",
    "ui:size-10",
    "ui:px-2",
    "ui:py-1.5",
    "ui:rounded-md",
    "ui:text-sm",
    "ui:font-medium",
    "ui:leading-5",
    "ui:text-text-default",
    "ui:transition-colors",
    "ui:outline-offset-2",
    "ui:focus-visible:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
  ],
  {
    variants: {
      isActive: {
        true: "ui:border ui:border-background-300 ui:border-solid",
        false: "ui:border ui:border-transparent",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export const paginationPreviousNextVariants = cva(
  [
    "ui:inline-flex",
    "ui:h-10",
    "ui:shrink-0",
    "ui:cursor-pointer",
    "ui:items-center",
    "ui:justify-center",
    "ui:gap-1",
    "ui:px-2",
    "ui:py-1.5",
    "ui:rounded-sm",
    "ui:text-sm",
    "ui:font-medium",
    "ui:leading-5",
    "ui:text-text-default",
    "ui:transition-colors",
    "ui:outline-offset-2",
    "ui:focus-visible:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
  ],
);

export const paginationEllipsisVariants = cva(
  [
    "ui:inline-flex",
    "ui:shrink-0",
    "ui:items-center",
    "ui:justify-center",
    "ui:px-2",
    "ui:py-1.5",
    "ui:rounded-sm",
    "ui:text-text-default-muted",
    "ui:[&>svg]:size-4",
  ],
);
