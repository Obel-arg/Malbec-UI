import { cva } from "class-variance-authority";

export const stepsRootVariants = cva([
  "ui:flex ui:h-1 ui:items-start ui:gap-2 ui:overflow-hidden",
]);

export const stepsSegmentVariants = cva(
  "ui:h-1 ui:min-h-1 ui:flex-1 ui:shrink-0 ui:rounded-full",
  {
    variants: {
      state: {
        active: "ui:bg-primary",
        inactive: "ui:bg-background-300",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);
