import { cva } from "class-variance-authority";
import { popoverSurfaceMotionClasses } from "../Popover/popover-variants";

/** Main / submenu surface — Figma: rounded 6px, p-1, shadow, background-100. */
export const dropdownMenuContentVariants = cva([
  "malbec-font-sans",
  "ui:z-50 ui:min-w-48 ui:overflow-hidden ui:rounded-md",
  "ui:border ui:border-background-300 ui:bg-background-100 ui:p-1",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)] ui:outline-none",
  "dark:ui:bg-background-200",
  /** Radix Menu exposes this on the content node (Popper). */
  "ui:origin-(--radix-dropdown-menu-content-transform-origin)",
  ...popoverSurfaceMotionClasses,
]);

export const dropdownMenuSubContentVariants = cva([
  "malbec-font-sans",
  /** Above root menu content (`z-50`) so the nested surface receives hover/focus. */
  "ui:z-60 ui:min-w-32 ui:overflow-hidden ui:rounded-md",
  "ui:border ui:border-background-300 ui:bg-background-100 ui:p-1",
  "ui:shadow-[0_0_2px_rgba(0,0,0,0.2)] ui:outline-none",
  "dark:ui:bg-background-200",
  "ui:origin-(--radix-dropdown-menu-content-transform-origin)",
  ...popoverSurfaceMotionClasses,
]);

/** Row: px-2 py-1.5, rounded-sm, text-sm — Default / Active / Disabled from Figma. */
export const dropdownMenuItemVariants = cva([
  "ui:relative ui:flex ui:w-full ui:cursor-default ui:select-none ui:items-center ui:gap-2 ui:rounded-sm",
  "ui:px-2 ui:py-1.5",
  "ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default ui:outline-none",
  "ui:data-highlighted:bg-background-200",
  "ui:data-disabled:pointer-events-none ui:data-disabled:opacity-50",
]);

/** Same as item; use with leading indicator + `justify-between` for shortcut. */
export const dropdownMenuSubTriggerVariants = cva([
  "ui:relative ui:flex ui:w-full ui:cursor-default ui:select-none ui:items-center ui:gap-2 ui:rounded-sm",
  "ui:px-2 ui:py-1.5",
  "ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default ui:outline-none",
  "ui:data-highlighted:bg-background-200",
  "ui:data-[state=open]:bg-background-200",
  "ui:data-disabled:pointer-events-none ui:data-disabled:opacity-50",
]);

/** Header row — Figma: text-xs semibold. */
export const dropdownMenuLabelVariants = cva([
  "ui:px-2 ui:py-1.5",
  "ui:text-xs ui:font-semibold ui:leading-tight ui:text-text-default",
]);

/** Separator — visible hairline on background-100 (Figma row uses bg-300 on small popover divider). */
export const dropdownMenuSeparatorVariants = cva(
  "ui:-mx-1 ui:my-1 ui:h-px ui:bg-background-300",
);

/** Trailing shortcut — opacity 60%. */
export const dropdownMenuShortcutVariants = cva([
  "malbec-font-sans ui:ml-auto ui:shrink-0 ui:text-sm ui:font-normal ui:leading-tight",
  "ui:text-text-default ui:opacity-60 ui:tabular-nums",
]);

/** Leading slot for custom icons (14px) — Figma `mr-2`. */
export const dropdownMenuItemIconSlotVariants = cva(
  "ui:pointer-events-none ui:flex ui:size-3.5 ui:shrink-0 ui:items-center ui:justify-center ui:mr-2 ui:text-text-default",
);

/** Checkbox leading area (14px check). */
export const dropdownMenuCheckboxIndicatorVariants = cva(
  "ui:pointer-events-none ui:flex ui:size-3.5 ui:shrink-0 ui:items-center ui:justify-center ui:mr-2 ui:text-text-default",
);

/** Radio leading column (16px). ItemIndicator inside uses `forceMount` + these classes. */
export const dropdownMenuRadioIndicatorVariants = cva(
  "ui:pointer-events-none ui:flex ui:size-4 ui:shrink-0 ui:items-center ui:justify-center ui:mr-2",
);

/** Radix `ItemIndicator` for radio: always mounted (`forceMount`), ring + inner dot. */
export const dropdownMenuRadioItemIndicatorVariants = cva([
  "ui:group ui:relative ui:flex ui:size-4 ui:items-center ui:justify-center ui:rounded-full ui:border ui:border-text-default/40 ui:text-text-default",
  "ui:data-[state=checked]:border-text-default/70",
]);
