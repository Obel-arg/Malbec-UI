import { cva } from "class-variance-authority";

/**
 * 44×24px track, 20×20px thumb, primary fill, Off = bg-100, On = bg-200; both
 * states use border-300 on the track so the pill is visible (off was borderless in
 * the raw frame and read as a floating dot only on light backgrounds).
 */
export const switchRootVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex",
    "ui:h-6",
    "ui:w-11",
    "ui:shrink-0",
    "ui:items-center",
    "ui:rounded-full",
    "ui:cursor-pointer",
    "ui:border",
    "ui:border-solid",
    "ui:outline-none",
    "ui:transition-[color,background-color,border-color,opacity,box-shadow]",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:opacity-50",
    "ui:data-[state=unchecked]:bg-background-100",
    "ui:data-[state=unchecked]:border-background-300",
    "ui:data-[state=checked]:bg-background-200",
    "ui:data-[state=checked]:border-background-300",
    /** Invalid state. */
    "ui:aria-invalid:outline-2",
    "ui:aria-invalid:outline-solid",
    "ui:aria-invalid:outline-destructive",
    "ui:aria-invalid:outline-offset-0",
  ],
);

export const switchThumbVariants = cva(
  [
    "ui:pointer-events-none",
    "ui:block",
    "ui:size-5",
    "ui:rounded-full",
    "ui:bg-primary",
    "ui:shadow-none",
    "ui:transition-transform",
    "ui:duration-200",
    "ui:ease-out",
    "ui:data-[state=unchecked]:translate-x-[2px]",
    "ui:data-[state=checked]:translate-x-[22px]",
  ],
);
