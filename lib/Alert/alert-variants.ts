import { cva, type VariantProps } from "class-variance-authority";

export const alertRootVariants = cva(
  [
    "ui:malbec-font-sans",
    "ui:relative ui:grid ui:w-full ui:grid-cols-[0_1fr] ui:items-start ui:gap-y-1",
    "ui:rounded-[8px] ui:border ui:px-5 ui:py-5",
    "ui:has-data-[slot=alert-action]:**:data-[slot=alert-title]:pr-28",
    "ui:has-data-[slot=alert-action]:**:data-[slot=alert-description]:pr-28",
    "ui:has-data-[slot=alert-icon]:grid-cols-[1rem_1fr] ui:has-data-[slot=alert-icon]:gap-x-3",
    "ui:has(>svg:first-of-type):grid-cols-[1rem_1fr] ui:has(>svg:first-of-type):gap-x-3",
    "ui:[&>svg:first-of-type]:col-start-1 ui:[&>svg:first-of-type]:row-start-1",
    "ui:[&>svg:first-of-type]:flex ui:[&>svg:first-of-type]:items-center",
    "ui:[&>svg:first-of-type]:size-4 ui:[&>svg:first-of-type]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "ui:bg-background-100 ui:text-text-default",
          "ui:border-background-300",
          "ui:[&>svg]:text-text-default",
        ],
        destructive: [
          "ui:bg-background-100 ui:text-destructive",
          "ui:border-destructive",
          "ui:[&>svg]:text-destructive",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const alertIconVariants = cva(
  [
    "ui:col-start-1 ui:row-start-1 ui:shrink-0",
    "ui:flex ui:items-center ui:justify-center",
    "ui:size-4",
    "ui:[&>svg]:size-4",
    "ui:[&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "ui:text-text-default",
        destructive: "ui:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const alertTitleVariants = cva(
  "ui:col-start-2 ui:row-start-1 ui:line-clamp-2 ui:min-h-4 ui:font-semibold ui:leading-4 ui:tracking-[0.4px]",
  {
    variants: {
      variant: {
        default: "ui:min-w-0 ui:text-[16px] ui:text-text-default",
        destructive: "ui:min-w-0 ui:text-[16px] ui:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const alertDescriptionVariants = cva(
  [
    "ui:col-start-2 ui:row-start-2",
    "ui:min-w-0 ui:justify-items-start",
    "ui:grid ui:gap-1",
    "ui:[&_p]:m-0 ui:[&_p]:leading-5",
    "ui:text-[14px] ui:font-normal ui:text-balance ui:tracking-[-0.42px]",
  ],
  {
    variants: {
      variant: {
        default: "ui:text-text-default-muted",
        destructive: "ui:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const alertActionVariants = cva(
  "ui:absolute ui:inset-y-0 ui:right-5 ui:flex ui:items-center",
);

export type AlertVariant = NonNullable<
  VariantProps<typeof alertRootVariants>["variant"]
>;
