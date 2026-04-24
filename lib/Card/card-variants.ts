import { cva } from "class-variance-authority";

export const cardRootVariants = cva([
  "ui:malbec-font-sans",
  "ui:flex ui:w-full ui:flex-col ui:gap-[25px]",
  "ui:rounded-[10px] ui:border ui:border-background-300 ui:bg-background-100",
  "ui:p-10",
  "ui:shadow-[0px_4px_14px_0px_rgba(0,0,0,0.07)]",
]);

export const cardHeaderVariants = cva(
  "ui:relative ui:grid ui:gap-1.5 ui:has-data-[slot=card-action]:**:data-[slot=card-title]:pr-28",
);

export const cardTitleVariants = cva(
  "ui:font-semibold ui:text-[20px] ui:leading-7 ui:tracking-[-0.8px] ui:text-text-default",
);

export const cardDescriptionVariants = cva(
  "ui:text-[14px] ui:font-normal ui:leading-5 ui:tracking-[-0.42px] ui:text-text-default-muted",
);

export const cardActionVariants = cva(
  "ui:absolute ui:top-0 ui:right-0 ui:flex ui:items-center",
);

export const cardContentVariants = cva(
  "ui:flex ui:flex-col ui:gap-4",
);

export const cardFooterVariants = cva(
  "ui:flex ui:items-center ui:justify-between",
);
