import { cva } from "class-variance-authority";

/**
 * Default + disabled are driven by the native `disabled` attribute; file styling
 * uses `::file-selector-button` utilities.
 */
export const inputVariants = cva(
  [
    "malbec-font-sans",
    "ui:flex",
    "ui:h-9",
    "ui:w-full",
    "ui:min-w-0",
    "ui:items-center",
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
    // Outline-based focus indicator: kept as a constant 2px solid transparent outline
    // so the only thing that animates on focus is `outline-color`. Using `outline`
    // (vs `ring`) gives a smooth native CSS transition — Tailwind's ring relies on
    // `@property syntax: "*"` custom properties that browsers can't interpolate.
    // `-outline-offset-2` makes it inset so it can never be clipped by parent
    // overflow containers and stays visible regardless of consumer bg overrides.
    "ui:outline-2",
    "ui:outline-solid",
    "ui:outline-transparent",
    "ui:-outline-offset-2",
    "ui:transition-[color,outline-color,box-shadow,opacity]",
    "ui:duration-150",
    // `:focus-within` (not `:focus-visible`) so the outline shows for both keyboard
    // and mouse focus. When a label wraps the input, clicking the label or icon
    // moves focus to the input via label-association — but browsers don't apply
    // `:focus-visible` to focus moves caused by mouse, even though `:focus` is set.
    // `:focus-within` matches on `:focus` regardless of method, and works on the
    // input itself (standalone) and on the wrapper element (with Input.Icon).
    "ui:focus-within:outline-primary",
    "ui:disabled:cursor-not-allowed",
    "ui:disabled:opacity-50",
    /**
     * Invalid state. `aria-invalid:` matches when the element itself carries the attribute
     * (bare input render) and `has-[…]` matches when the wrapper label sees an invalid child
     * (icon render — the attribute lives on the inner input).
     */
    "ui:aria-invalid:outline-destructive",
    "ui:has-[input[aria-invalid='true']]:outline-destructive",
    "ui:file:mr-2",
    "ui:file:inline-flex",
    "ui:file:cursor-pointer",
    "ui:file:border-0",
    "ui:file:bg-transparent",
    "ui:file:p-0",
    "ui:file:font-medium",
    "ui:file:text-[14px]",
    "ui:file:leading-5",
    "ui:file:tracking-[-0.42px]",
    "ui:file:text-text-default",
  ],
);
