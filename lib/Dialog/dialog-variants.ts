import { cva } from "class-variance-authority";

/**
 * Modals float without a veil (malbec-ux-ui, rule 15). The overlay element stays, so outside
 * clicks still close the dialog, but it is transparent; the surface lifts off the page with this
 * two-layer shadow. `overlay="veil"` brings back the light frosted veil of 1.x.
 */
export const FLOATING_SURFACE_SHADOW =
  "ui:shadow-[0_24px_70px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.1)]";

export const overlayVeilVariants = {
  none: "ui:bg-transparent ui:backdrop-blur-none",
  veil: "ui:bg-background-200/60 ui:backdrop-blur-[3.5px]",
} as const;

/** The short shadow a surface keeps when it sits on the veil. */
export const VEILED_SURFACE_SHADOW = "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]";

export type OverlayVeil = keyof typeof overlayVeilVariants;

export const dialogOverlayVariants = cva(
  [
    "ui:fixed ui:inset-0 ui:z-(--ui-z-overlay)",
    "ui:data-[state=open]:animate-malbec-overlay-in",
    "ui:data-[state=closed]:animate-malbec-overlay-out",
    "ui:motion-reduce:animate-none",
  ],
  { variants: { overlay: overlayVeilVariants }, defaultVariants: { overlay: "none" } },
);

export const dialogContentVariants = cva([
  "ui:malbec-font-sans",
  "ui:fixed ui:top-1/2 ui:left-1/2 ui:right-auto ui:bottom-auto ui:z-(--ui-z-overlay)",
  "ui:-translate-x-1/2 ui:-translate-y-1/2",
  "ui:flex ui:w-full ui:max-w-[425px] ui:flex-col",
  "ui:h-auto",
  "ui:gap-4",
  "ui:rounded-[8px]",
  "ui:bg-background-100",
  "ui:p-10",
  "ui:outline-none",
  "ui:data-[state=open]:animate-malbec-dialog-in",
  "ui:data-[state=closed]:animate-malbec-dialog-out",
  "ui:motion-reduce:animate-none",
], {
  variants: {
    /** Width, capped at the viewport minus 1rem per side. Unset keeps the 425px default. */
    size: {
      sm: "ui:w-[min(calc(100vw-2rem),448px)] ui:max-w-none",
      md: "ui:w-[min(calc(100vw-2rem),560px)] ui:max-w-none",
      lg: "ui:w-[min(calc(100vw-2rem),640px)] ui:max-w-none",
      xl: "ui:w-[min(calc(100vw-2rem),880px)] ui:max-w-none",
    },
    overlay: { none: FLOATING_SURFACE_SHADOW, veil: VEILED_SURFACE_SHADOW },
  },
  defaultVariants: { overlay: "none" },
});

export type DialogSize = "sm" | "md" | "lg" | "xl";

export const dialogCloseVariants = cva([
  "ui:absolute ui:top-4 ui:right-4",
  "ui:inline-flex ui:size-8 ui:items-center ui:justify-center",
  "ui:cursor-pointer",
  "ui:rounded-[8px]",
  "ui:opacity-70",
  "ui:transition-opacity",
  "ui:outline-none",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-focus ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);

export const dialogCloseIconVariants = cva("ui:size-4");

export const dialogHeaderVariants = cva("ui:flex ui:flex-col ui:text-left");

export const dialogTitleVariants = cva(
  "ui:text-[18px] ui:leading-7 ui:font-semibold ui:text-text-default",
);

export const dialogDescriptionVariants = cva(
  "ui:pt-2 ui:text-sm ui:leading-5 ui:font-normal ui:text-text-default",
);

export const dialogBodyVariants = cva(
  "ui:flex ui:flex-col ui:gap-4 ui:py-4",
);

export const dialogFooterVariants = cva("ui:flex ui:items-center ui:justify-end ui:gap-2");

export const dialogActionVariants = cva([
  "ui:malbec-font-sans",
  "ui:inline-flex ui:h-9 ui:min-w-[123px] ui:items-center ui:justify-center",
  "ui:cursor-pointer",
  "ui:rounded-[8px]",
  "ui:bg-primary ui:px-4 ui:py-2",
  "ui:text-sm ui:leading-5 ui:font-medium ui:text-primary-foreground",
  "ui:whitespace-nowrap",
  "ui:outline-none ui:transition-[opacity,background-color]",
  "ui:hover:opacity-90 ui:active:opacity-80",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-focus ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);

export const dialogInlineFieldVariants = cva("ui:flex ui:w-full ui:items-center ui:gap-4");

export const dialogInlineLabelVariants = cva(
  "ui:flex-1 ui:min-w-0 ui:text-sm ui:leading-[14px] ui:font-medium ui:text-text-default",
);

export const dialogInlineInputVariants = cva([
  "ui:flex-1 ui:min-w-0",
  "ui:rounded-[6px]",
  "ui:bg-background-100",
  "ui:px-4 ui:py-2",
  "ui:text-sm ui:leading-5 ui:font-normal ui:text-text-default",
  "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
  "ui:outline-none",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-focus ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);
