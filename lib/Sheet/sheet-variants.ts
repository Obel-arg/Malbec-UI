import { cva } from "class-variance-authority";

export const sheetOverlayVariants = cva([
  "ui:fixed ui:inset-0 ui:z-50",
  "ui:bg-background-200/60",
  "ui:backdrop-blur-[3.5px]",
  "ui:data-[state=open]:animate-malbec-overlay-in",
  "ui:data-[state=closed]:animate-malbec-overlay-out",
  "ui:motion-reduce:animate-none",
]);

export const sheetContentVariants = cva(
  [
    "ui:malbec-font-sans",
    "ui:fixed ui:z-50",
    "ui:flex ui:flex-col ui:gap-4",
    "ui:rounded-none",
    "ui:bg-background-100",
    "ui:p-6",
    "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
    "ui:outline-none",
    "ui:motion-reduce:animate-none",
  ],
  {
    variants: {
      side: {
        top: [
          "ui:inset-x-0 ui:top-0 ui:border-b ui:border-background-300 ui:w-full",
          "ui:data-[state=open]:animate-malbec-sheet-in-top",
          "ui:data-[state=closed]:animate-malbec-sheet-out-top",
        ],
        bottom: [
          "ui:inset-x-0 ui:bottom-0 ui:border-t ui:border-background-300 ui:w-full",
          "ui:data-[state=open]:animate-malbec-sheet-in-bottom",
          "ui:data-[state=closed]:animate-malbec-sheet-out-bottom",
        ],
        left: [
          "ui:top-0 ui:bottom-0 ui:left-0 ui:right-auto ui:h-full ui:w-[384px] ui:border-r ui:border-background-300",
          "ui:data-[state=open]:animate-malbec-sheet-in-left",
          "ui:data-[state=closed]:animate-malbec-sheet-out-left",
        ],
        right: [
          "ui:top-0 ui:bottom-0 ui:right-0 ui:left-auto ui:h-full ui:w-[384px] ui:border-l ui:border-background-300",
          "ui:data-[state=open]:animate-malbec-sheet-in-right",
          "ui:data-[state=closed]:animate-malbec-sheet-out-right",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export const sheetCloseVariants = cva([
  "ui:absolute ui:top-2 ui:right-2",
  "ui:inline-flex ui:size-8 ui:items-center ui:justify-center",
  "ui:cursor-pointer",
  "ui:rounded-[8px]",
  "ui:opacity-70",
  "ui:transition-opacity",
  "ui:outline-none",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);

export const sheetCloseIconVariants = cva("ui:size-4");

export const sheetHeaderVariants = cva("ui:flex ui:flex-col ui:text-left");

export const sheetTitleVariants = cva(
  "ui:text-[18px] ui:leading-7 ui:font-semibold ui:text-text-default",
);

export const sheetDescriptionVariants = cva(
  "ui:pt-2 ui:text-sm ui:leading-5 ui:font-normal ui:text-text-default",
);

export const sheetBodyVariants = cva("ui:flex ui:flex-col ui:gap-4 ui:py-4");

export const sheetFooterVariants = cva("ui:flex ui:items-center ui:justify-end ui:gap-2");

export const sheetActionVariants = cva([
  "ui:malbec-font-sans",
  "ui:inline-flex ui:h-9 ui:min-w-[123px] ui:items-center ui:justify-center",
  "ui:cursor-pointer",
  "ui:rounded-[8px]",
  "ui:bg-primary ui:px-4 ui:py-2",
  "ui:text-sm ui:leading-5 ui:font-medium ui:text-primary-foreground",
  "ui:whitespace-nowrap",
  "ui:outline-none ui:transition-[opacity,background-color]",
  "ui:hover:opacity-90 ui:active:opacity-80",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);

export const sheetInlineFieldVariants = cva("ui:flex ui:w-full ui:items-center ui:gap-4");

export const sheetInlineLabelVariants = cva(
  "ui:flex-1 ui:min-w-0 ui:text-sm ui:leading-[14px] ui:font-medium ui:text-text-default",
);

export const sheetInlineInputVariants = cva([
  "ui:flex-1 ui:min-w-0",
  "ui:rounded-[6px]",
  "ui:bg-background-100",
  "ui:px-4 ui:py-2",
  "ui:text-sm ui:leading-5 ui:font-normal ui:text-text-default",
  "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
  "ui:outline-none",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);
