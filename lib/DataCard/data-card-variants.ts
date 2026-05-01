import { cva, type VariantProps } from "class-variance-authority";

/** Which edge carries the thick primary accent border. */
export type DataCardAccentSide = NonNullable<
  VariantProps<typeof dataCardRootVariants>["accentSide"]
>;

const shellBase = [
  "ui:malbec-font-sans",
  "ui:bg-background-200",
  "ui:rounded-xl",
  "ui:border ui:border-solid ui:border-background-300",
  "ui:p-6",
  "ui:shadow-[0px_0px_0.65px_rgba(0,0,0,0.2)]",
];

export const dataCardRootVariants = cva(shellBase, {
  variants: {
    accentSide: {
      top: "ui:border-t-[3px] ui:border-t-primary",
      right: "ui:border-r-[3px] ui:border-r-primary",
      bottom: "ui:border-b-[3px] ui:border-b-primary",
      left: "ui:border-l-[3px] ui:border-l-primary",
    },
  },
  defaultVariants: {
    accentSide: "top",
  },
});
