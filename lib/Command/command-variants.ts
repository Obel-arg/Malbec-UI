import { cva } from "class-variance-authority";

/** Product UI Command surface — Figma node 741:5122. */
export const commandRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:h-full ui:w-full ui:max-w-[450px] ui:flex-col ui:items-start ui:overflow-hidden",
  "ui:rounded-[10px] ui:border-2 ui:border-solid ui:border-white",
  "ui:bg-background-200 ui:text-text-default",
]);

/** Search field shell — top row with bottom rule. */
export const commandInputShellVariants = cva([
  "ui:relative ui:flex ui:w-full ui:flex-col ui:justify-center",
  "ui:rounded-t-[6px] ui:border-b-[0.5px] ui:border-solid ui:border-background-300",
  "ui:bg-background-200",
]);

/** Inner row padding — Figma Input/Search inset. */
export const commandInputInnerRowVariants = cva([
  "ui:flex ui:w-full ui:items-center ui:rounded-[6px] ui:py-2 ui:pl-8 ui:pr-3",
]);

export const commandInputVariants = cva([
  "malbec-font-sans",
  "ui:flex-1 ui:min-w-0 ui:border-0 ui:bg-transparent",
  "ui:text-[15px] ui:font-normal ui:leading-[25.284px] ui:text-text-default",
  "ui:outline-none ui:placeholder:text-text-default/50",
]);

export const commandListVariants = cva([
  "ui:min-h-0 ui:w-full ui:overflow-y-auto ui:overflow-x-hidden",
]);

/** Group shell — padding around heading + items (Figma `p-1` on Rows). */
export const commandGroupVariants = cva([
  "ui:p-1",
  "ui:**:[[cmdk-group-heading]]:flex ui:**:[[cmdk-group-heading]]:items-center",
  "ui:**:[[cmdk-group-heading]]:px-1.5 ui:**:[[cmdk-group-heading]]:py-1.5",
  "ui:**:[[cmdk-group-heading]]:min-h-8 ui:**:[[cmdk-group-heading]]:text-xs ui:**:[[cmdk-group-heading]]:font-semibold ui:**:[[cmdk-group-heading]]:leading-5 ui:**:[[cmdk-group-heading]]:text-text-default",
]);

export const commandItemVariants = cva([
  "ui:relative ui:flex ui:w-full ui:cursor-pointer ui:select-none ui:items-center ui:justify-start",
  "ui:data-[disabled=true]:cursor-not-allowed",
  "ui:rounded-sm ui:px-2 ui:py-1.5",
  "ui:text-sm ui:font-normal ui:leading-[25.284px] ui:text-text-default",
  "ui:outline-none",
  "ui:data-[selected=true]:bg-background-300",
  "ui:data-[disabled=true]:pointer-events-none ui:data-[disabled=true]:opacity-50",
]);

export const commandSeparatorVariants = cva([
  "ui:-mx-1 ui:my-1 ui:h-px ui:shrink-0 ui:bg-background-100",
]);

export const commandEmptyVariants = cva([
  "ui:px-2 ui:py-6 ui:text-center ui:text-sm ui:text-text-default-muted",
]);

export const commandShortcutVariants = cva([
  "ui:ml-auto ui:shrink-0 ui:text-xs ui:tabular-nums ui:text-text-default-muted",
]);

export const commandDialogOverlayVariants = cva([
  "ui:fixed ui:inset-0 ui:z-50",
  "ui:bg-background-200/60",
  "ui:backdrop-blur-[3.5px]",
  "ui:data-[state=open]:animate-malbec-overlay-in",
  "ui:data-[state=closed]:animate-malbec-overlay-out",
  "ui:motion-reduce:animate-none",
]);

export const commandDialogContentVariants = cva([
  "ui:fixed ui:top-[50%] ui:left-[50%] ui:z-50 ui:w-full ui:max-w-[450px]",
  "ui:translate-x-[-50%] ui:translate-y-[-50%]",
  "ui:overflow-hidden ui:rounded-[10px] ui:border-0 ui:bg-transparent ui:p-0",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
  "ui:data-[state=open]:animate-malbec-dialog-in",
  "ui:data-[state=closed]:animate-malbec-dialog-out",
  "ui:motion-reduce:animate-none",
]);

export const commandLoadingVariants = cva([
  "ui:flex ui:items-center ui:justify-center ui:py-6 ui:text-sm ui:text-text-default-muted",
]);
