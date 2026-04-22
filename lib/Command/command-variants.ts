import { cva } from "class-variance-authority";

/** Malbec OS Command surface — Figma node 59:2394. */
export const commandRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:h-full ui:w-full ui:max-w-[450px] ui:flex-col ui:overflow-hidden",
  "ui:rounded-md ui:bg-background-100 ui:text-text-default",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
]);

/** Search field shell — top row with bottom rule. */
export const commandInputShellVariants = cva([
  "ui:relative ui:flex ui:w-full ui:flex-col ui:justify-center",
  "ui:rounded-t-md ui:border-b ui:border-background-300",
  "ui:bg-background-100",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
]);

/** Inner row padding — Figma Input/Search inset. */
export const commandInputInnerRowVariants = cva([
  "ui:flex ui:w-full ui:items-center ui:py-2 ui:pl-8 ui:pr-3",
]);

export const commandInputVariants = cva([
  "malbec-font-sans",
  "ui:flex-1 ui:min-w-0 ui:border-0 ui:bg-transparent",
  "ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
  "ui:outline-none ui:placeholder:text-text-default-muted",
]);

export const commandListVariants = cva([
  "ui:overflow-y-auto ui:overflow-x-hidden ui:min-h-0",
]);

/** Group shell — padding around heading + items (Figma `p-1` on Rows). */
export const commandGroupVariants = cva([
  "ui:p-1",
  "ui:**:[[cmdk-group-heading]]:flex ui:**:[[cmdk-group-heading]]:items-center",
  "ui:**:[[cmdk-group-heading]]:px-1.5 ui:**:[[cmdk-group-heading]]:py-1.5",
  "ui:**:[[cmdk-group-heading]]:text-xs ui:**:[[cmdk-group-heading]]:font-semibold ui:**:[[cmdk-group-heading]]:leading-tight ui:**:[[cmdk-group-heading]]:text-text-default",
]);

export const commandItemVariants = cva([
  "ui:relative ui:flex ui:w-full ui:cursor-default ui:select-none ui:items-center ui:justify-start",
  "ui:rounded-sm ui:px-2 ui:py-1.5",
  "ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
  "ui:outline-none",
  "ui:data-[selected=true]:bg-background-200",
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
  "ui:bg-black/45 dark:ui:bg-black/55",
  "ui:backdrop-blur-md",
]);

export const commandDialogContentVariants = cva([
  "ui:fixed ui:top-[50%] ui:left-[50%] ui:z-50 ui:w-full ui:max-w-[450px]",
  "ui:translate-x-[-50%] ui:translate-y-[-50%]",
  "ui:overflow-hidden ui:rounded-md ui:border-0 ui:bg-transparent ui:p-0",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)]",
]);

export const commandLoadingVariants = cva([
  "ui:flex ui:items-center ui:justify-center ui:py-6 ui:text-sm ui:text-text-default-muted",
]);
