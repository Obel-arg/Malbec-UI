import { cva, type VariantProps } from "class-variance-authority";

/** Which edge carries the thick primary accent stripe. */
export type DataCardAccentSide = NonNullable<
  VariantProps<typeof dataCardRootVariants>["accentSide"]
>;

const rootBase = [
  "ui:malbec-font-sans",
  "ui:bg-primary",
  "ui:rounded-xl",
  "ui:flex",
  "ui:w-full",
  "ui:shrink-0",
];

export const dataCardRootVariants = cva(rootBase, {
  variants: {
    accentSide: {
      top: "ui:pt-1",
      right: "ui:pr-1",
      bottom: "ui:pb-1",
      left: "ui:pl-1",
    },
  },
  defaultVariants: {
    accentSide: "top",
  },
});

export const dataCardPanelVariants = cva([
  "ui:bg-background-200",
  "ui:rounded-xl",
  "ui:p-6",
  "ui:w-full",
  "ui:min-w-0",
  "ui:flex-1",
]);
