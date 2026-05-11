import { cva, type VariantProps } from "class-variance-authority";

/**
 * [Malbec — Badge Figma](https://www.figma.com/design/xpeITaQp7zbkU4htYHvHXo/Malbec-OS-Design-System?node-id=58-191):
 * 4px corner radius, `text-xs` / medium, `tracking-[-0.36px]`, `px-2.5` / `py-0.5`.
 * `destructive` matches `Button` (`destructive` / `destructive-foreground` tokens).
 * For a neutral Figma-style chip, override with e.g. `ui:bg-background-100 ui:text-text-default`.
 */
export const badgeVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex",
    "ui:items-center",
    "ui:justify-center",
    "ui:gap-1",
    "ui:rounded-[4px]",
    "ui:border",
    "ui:px-2.5",
    "ui:py-0.5",
    "ui:text-xs",
    "ui:font-medium",
    "ui:leading-5",
    "ui:tracking-[-0.36px]",
    "ui:whitespace-nowrap",
    "ui:shrink-0",
    "ui:select-none",
    "ui:transition-[color,background-color,border-color,opacity,box-shadow]",
    "ui:outline-none",
    "ui:focus-visible:ring-2",
    "ui:focus-visible:ring-primary",
    "ui:focus-visible:ring-offset-2",
    "ui:focus-visible:ring-offset-background-100",
  ],
  {
    variants: {
      variant: {
        default: "ui:border-transparent ui:bg-primary ui:text-primary-foreground",
        secondary: "ui:border-transparent ui:bg-background-200 ui:text-text-default",
        outline:
          "ui:border-background-300 ui:border-solid ui:bg-transparent ui:text-text-default",
        destructive:
          "ui:border-transparent ui:bg-destructive ui:text-destructive-foreground",
        ghost:
          "ui:border-transparent ui:bg-transparent ui:text-text-default ui:hover:bg-background-300/60",
        link:
          "ui:border-transparent ui:bg-transparent ui:text-primary ui:underline-offset-4 ui:hover:underline",
        /** Status chips (Product UI status popover, Figma 651:11230). */
        yellow:
          "ui:border-transparent ui:bg-[#efeed4] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#8a862f] ui:[--malbec-badge-accent:#8a862f]",
        orange:
          "ui:border-transparent ui:bg-[#efe3d4] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#8a642f] ui:[--malbec-badge-accent:#8a642f]",
        blue:
          "ui:border-transparent ui:bg-[#dce6ec] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#2f628a] ui:[--malbec-badge-accent:#2f628a]",
        violet:
          "ui:border-transparent ui:bg-[#e5dcec] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#352a60] ui:[--malbec-badge-accent:#352a60]",
        emerald:
          "ui:border-transparent ui:bg-[#d0dfd0] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#2a602c] ui:[--malbec-badge-accent:#2a602c]",
        sage:
          "ui:border-transparent ui:bg-[#b4c5b5] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#025406] ui:[--malbec-badge-accent:#025406]",
        red:
          "ui:border-transparent ui:bg-[#dfd0d0] ui:text-(--malbec-badge-fg) ui:[--malbec-badge-fg:#602a2a] ui:[--malbec-badge-accent:#602a2a]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export const badgeIconVariants = cva(
  "ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center ui:size-3 ui:[&>svg]:size-full",
);

export const badgeTextVariants = cva(
  "ui:inline-block ui:min-w-0 ui:truncate",
  {
    variants: {
      /** `accent` uses `--malbec-badge-accent` (categorical `Badge` variants). */
      tone: {
        default: "ui:text-inherit",
        accent: "ui:text-(--malbec-badge-accent)",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>["variant"]
>;
