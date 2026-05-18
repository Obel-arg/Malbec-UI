import { cva } from "class-variance-authority";

/** Figma: Toggle Group — horizontal row, gap 1 (4px). */
export const toggleGroupRootVariants = cva([
  "ui:inline-flex",
  "ui:items-center",
  "ui:gap-1",
  "ui:rounded-[6px]",
  "ui:aria-invalid:outline-1",
  "ui:aria-invalid:outline-solid",
  "ui:aria-invalid:outline-destructive",
  "ui:aria-invalid:outline-offset-0",
]);
