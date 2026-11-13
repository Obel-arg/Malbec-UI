import { FLOATING_SURFACE_SHADOW } from "../Dialog/dialog-variants";
import { cva } from "class-variance-authority";

/**
 * Command surface, version C of the Command workshop (Linear structure + Resend keys and footer):
 * a 600px light surface with a 12px radius and a background-300 edge.
 */
export const commandRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:h-full ui:w-full ui:max-w-[600px] ui:flex-col ui:items-stretch ui:overflow-hidden",
  "ui:rounded-[12px] ui:border ui:border-solid ui:border-background-300",
  "ui:bg-background-100 ui:text-text-default",
]);

/** Context chip above the input: what the commands act on ("Show · Rosario"). */
export const commandContextVariants = cva([
  "ui:mx-3.5 ui:mt-3.5 ui:inline-flex ui:h-6 ui:w-fit ui:max-w-[calc(100%-28px)] ui:items-center ui:gap-1.5",
  "ui:rounded-[8px] ui:border ui:border-background-300 ui:bg-background-200 ui:px-2",
  "ui:truncate ui:text-xs ui:text-text-default ui:[&_svg]:size-3.5 ui:[&_svg]:shrink-0",
]);

/** Input row: no box and no search glyph, a rule below. */
export const commandInputShellVariants = cva([
  "ui:flex ui:w-full ui:items-center ui:border-b ui:border-solid ui:border-background-300",
  "ui:px-[18px] ui:pt-3 ui:pb-3.5",
]);

export const commandInputVariants = cva([
  "malbec-font-sans",
  "ui:flex-1 ui:min-w-0 ui:border-0 ui:bg-transparent ui:p-0",
  "ui:text-[16px] ui:font-normal ui:leading-6 ui:text-malbec-ink",
  "ui:outline-none ui:placeholder:text-text-default-muted",
]);

export const commandListVariants = cva([
  "ui:min-h-0 ui:w-full ui:overflow-y-auto ui:overflow-x-hidden ui:p-1.5",
]);

/** Group: light heading (12px muted), no bold. */
export const commandGroupVariants = cva([
  "ui:**:[[cmdk-group-heading]]:flex ui:**:[[cmdk-group-heading]]:items-center",
  "ui:**:[[cmdk-group-heading]]:px-2.5 ui:**:[[cmdk-group-heading]]:pt-2.5 ui:**:[[cmdk-group-heading]]:pb-1",
  "ui:**:[[cmdk-group-heading]]:text-xs ui:**:[[cmdk-group-heading]]:font-normal ui:**:[[cmdk-group-heading]]:text-text-default-muted",
]);

/** 36px row: muted 16px icon, ink label, keys on the right; the selected one on background-200. */
export const commandItemVariants = cva([
  "ui:relative ui:flex ui:h-9 ui:w-full ui:cursor-pointer ui:select-none ui:items-center ui:justify-start ui:gap-3",
  "ui:data-[disabled=true]:cursor-not-allowed",
  "ui:rounded-[8px] ui:px-3",
  "ui:text-sm ui:font-normal ui:text-malbec-ink",
  "ui:outline-none",
  "ui:[&_svg]:size-4 ui:[&_svg]:shrink-0 ui:[&_svg]:text-text-default-muted",
  "ui:data-[selected=true]:bg-background-200 ui:data-[selected=true]:[&_svg]:text-malbec-ink",
  "ui:data-[disabled=true]:pointer-events-none ui:data-[disabled=true]:opacity-45",
]);

export const commandSeparatorVariants = cva([
  "ui:-mx-1 ui:my-1 ui:h-px ui:shrink-0 ui:bg-background-100",
]);

export const commandEmptyVariants = cva([
  "ui:flex ui:h-16 ui:items-center ui:justify-center ui:px-2 ui:text-center ui:text-[13px] ui:text-text-default-muted",
]);

export const commandShortcutVariants = cva([
  "ui:ml-auto ui:flex ui:shrink-0 ui:items-center ui:gap-1 ui:text-[11px] ui:text-text-default-muted",
]);

/** A keyboard key: a small boxed cap. */
export const commandKbdVariants = cva([
  "malbec-font-sans ui:inline-flex ui:h-5 ui:min-w-5 ui:items-center ui:justify-center ui:rounded-[5px] ui:px-1.5",
  "ui:border ui:border-background-300 ui:bg-background-100 ui:shadow-[0_1px_0_var(--color-background-300)]",
  "ui:text-[11px] ui:font-normal ui:text-text-default",
]);

/** Footer with the keyboard hints. */
export const commandFooterVariants = cva([
  "ui:flex ui:w-full ui:items-center ui:gap-3.5 ui:border-t ui:border-background-300 ui:px-3.5 ui:py-2.5",
  "ui:text-xs ui:text-text-default-muted",
]);

export const commandDialogOverlayVariants = cva([
  "ui:fixed ui:inset-0 ui:z-(--ui-z-overlay)",
  // No veil (malbec-ux-ui rule 15); pass overlayClassName to dim the page.
  "ui:data-[state=open]:animate-malbec-overlay-in",
  "ui:data-[state=closed]:animate-malbec-overlay-out",
  "ui:motion-reduce:animate-none",
]);

export const commandDialogContentVariants = cva([
  "ui:fixed ui:top-[50%] ui:left-[50%] ui:z-(--ui-z-overlay) ui:w-full ui:max-w-[600px]",
  "ui:translate-x-[-50%] ui:translate-y-[-50%]",
  "ui:overflow-hidden ui:rounded-[12px] ui:border-0 ui:bg-transparent ui:p-0",
  FLOATING_SURFACE_SHADOW,
  "ui:data-[state=open]:animate-malbec-dialog-in",
  "ui:data-[state=closed]:animate-malbec-dialog-out",
  "ui:motion-reduce:animate-none",
]);

export const commandLoadingVariants = cva([
  "ui:flex ui:items-center ui:justify-center ui:py-6 ui:text-sm ui:text-text-default-muted",
]);
