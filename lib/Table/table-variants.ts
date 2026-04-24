import { cva } from "class-variance-authority";

export type TableAppearance = "default" | "dataGrid";

export const tableContainerVariants = cva(
  [
    "ui:malbec-font-sans ui:relative ui:w-full ui:overflow-x-auto ui:overflow-y-hidden",
    "ui:border ui:border-background-300 ui:border-solid",
    "ui:bg-background-100",
    "ui:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      /**
       * `default` — Figma Table (e.g. Events): 10px radius, 44px header, 58px rows.
       * `dataGrid` — Figma Data Table (Malbec OS): 6px radius, 48px header, 16px cell padding.
       */
      appearance: {
        default: "ui:rounded-[10px]",
        dataGrid: "ui:rounded-[6px]",
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableElementVariants = cva(
  "ui:w-full ui:border-collapse ui:caption-bottom ui:text-text-default",
  {
    variants: {
      appearance: {
        default: "",
        dataGrid: "",
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableHeaderGroupVariants = cva(
  "ui:[&_tr]:border-b ui:[&_tr]:border-background-300",
  {
    variants: {
      appearance: {
        default: "ui:[&_tr]:h-11 ui:[&_tr]:bg-background-200",
        dataGrid: "ui:[&_tr]:h-12",
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableBodyGroupVariants = cva(
  [
    "ui:[&>tr]:bg-background-100",
    "ui:[&>tr>td:first-child]:pl-4 ui:[&>tr>td:first-child]:pr-4",
    "ui:[&>tr>th:first-child]:pl-4",
  ],
  {
    variants: {
      appearance: {
        default: [
          "ui:[&>tr]:h-[58px] ui:[&>tr]:border-b ui:[&>tr]:border-background-300",
          "ui:[&>tr:last-child]:border-b-0",
        ],
        dataGrid: "ui:[&>tr]:h-auto ui:[&>tr]:min-h-0",
      },
    },
    defaultVariants: { appearance: "default" },
  },
);

export const tableFooterGroupVariants = cva(
  "ui:border-t ui:border-background-300 ui:bg-background-100 ui:font-medium",
);

export const tableRowVariants = cva(
  "ui:transition-colors ui:data-[state=selected]:bg-background-200/80",
);

export const tableHeadVariants = cva("ui:text-left ui:align-middle", {
  variants: {
    appearance: {
      default: [
        "ui:h-11 ui:px-4 ui:py-0",
        "ui:text-[12px] ui:font-medium ui:leading-5",
        "ui:text-[#6b6b7a] dark:ui:text-text-default-muted",
      ],
      dataGrid: [
        "ui:h-12 ui:px-4 ui:py-2.5",
        "ui:text-sm ui:font-normal ui:leading-5",
        "ui:text-text-default",
      ],
    },
  },
  defaultVariants: { appearance: "default" },
});

export const tableCellVariants = cva("ui:align-middle", {
  variants: {
    appearance: {
      default: [
        "ui:px-4 ui:py-0",
        "ui:text-[13px] ui:font-medium ui:leading-5",
        "ui:text-text-default",
      ],
      dataGrid: [
        "ui:p-4",
        "ui:text-sm ui:font-normal ui:leading-5",
        "ui:text-text-default",
      ],
    },
  },
  defaultVariants: { appearance: "default" },
});

export const tableCaptionVariants = cva(
  "ui:mt-4 ui:px-4 ui:py-2 ui:text-left ui:text-sm ui:text-text-default-muted",
);
