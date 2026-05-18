import { cva } from "class-variance-authority";

/**
 * Multi-line counterpart to {@link inputVariants}. Mirrors the same surface
 * tokens (background, radius, shadow, outline-based focus indicator) so a
 * Textarea sits visually consistent with Input/Select/Combobox/DatePicker in
 * the same form.
 */
export const textareaVariants = cva([
  "malbec-font-sans",
  "ui:block",
  "ui:w-full",
  "ui:min-w-0",
  "ui:min-h-20",
  "ui:border-0",
  "ui:bg-background-100",
  "ui:rounded-[6px]",
  "ui:px-4",
  "ui:py-2",
  "ui:shadow-[0_0_2px_0_rgba(0,0,0,0.2)]",
  "ui:text-[14px]",
  "ui:leading-5",
  "ui:tracking-[-0.42px]",
  "ui:text-text-default",
  "ui:placeholder:text-text-default-muted",
  "ui:resize-y",
  // Outline-based focus indicator — identical mechanism to Input so the two
  // animate the same way and don't get clipped by parent overflow containers.
  "ui:outline-1",
  "ui:outline-solid",
  "ui:outline-transparent",
  "ui:-outline-offset-1",
  "ui:transition-[color,outline-color,box-shadow,opacity]",
  "ui:duration-150",
  "ui:focus-within:outline-background-300",
  "ui:disabled:cursor-not-allowed",
  "ui:disabled:opacity-50",
  /** Invalid state set by callers via `aria-invalid` on the textarea itself. */
  "ui:aria-invalid:outline-destructive",
]);
