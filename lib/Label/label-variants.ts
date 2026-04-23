import { cva, type VariantProps } from "class-variance-authority";

export const labelVariants = cva(
  [
    "malbec-font-sans",
    "ui:inline-flex",
    "ui:items-center",
    "ui:text-[14px]",
    "ui:leading-[14px]",
    "ui:tracking-[-0.42px]",
    "ui:text-text-default",
    "ui:select-none",
    "ui:group-has-disabled:cursor-not-allowed",
    "ui:group-has-disabled:opacity-50",
  ],
  {
    variants: {
      weight: {
        regular: "ui:font-medium",
        semibold: "ui:font-semibold",
      },
    },
    defaultVariants: {
      weight: "regular",
    },
  },
);

export type LabelWeight = NonNullable<VariantProps<typeof labelVariants>["weight"]>;
