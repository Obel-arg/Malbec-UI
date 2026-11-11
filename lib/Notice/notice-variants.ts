import { cva } from "class-variance-authority";

export type NoticeTone = "pending" | "info";

export const noticeVariants = cva(
  // items-center: with the icon on top, two lines of text sat off-centre (malbec-ux-ui).
  "malbec-font-sans ui:flex ui:items-center ui:gap-3.5 ui:rounded-xl ui:border ui:p-4",
  {
    variants: {
      tone: {
        // The whole card goes faintly yellow: with the tone only on the icon it passed unnoticed.
        pending:
          "ui:border-pending-edge ui:bg-pending-surface ui:shadow-[0_0_0_1.5px_var(--color-pending-ring),0_1px_2px_rgba(0,0,0,0.04)]",
        info: "ui:border-white ui:bg-background-100 ui:shadow-[0_0_0_1.5px_var(--color-background-200),0_1px_2px_rgba(0,0,0,0.04)]",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

export const noticeIconVariants = cva(
  "ui:flex ui:size-9 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-lg ui:[&_svg]:size-[18px]",
  {
    variants: {
      tone: {
        pending:
          "ui:bg-pending-tile ui:text-pending-ink ui:shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
        info: "ui:bg-background-200 ui:text-text-default-muted",
      },
    },
    defaultVariants: { tone: "info" },
  },
);
