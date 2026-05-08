import { cva } from "class-variance-authority";

export const fieldRootVariants = cva([
  "ui:relative",
  "ui:flex ui:flex-col ui:gap-1.5",
]);

export const fieldDescriptionVariants = cva([
  "malbec-font-sans",
  "ui:text-[12px] ui:leading-4 ui:tracking-[-0.36px]",
  "ui:text-text-default-muted",
]);

export const fieldErrorVariants = cva([
  "malbec-font-sans",
  "ui:pointer-events-none",
  "ui:absolute ui:left-0 ui:top-full ui:mt-0.5",
  "ui:text-[10px] ui:leading-3",
  "ui:text-destructive",
]);

export const fieldGroupVariants = cva(["ui:flex ui:flex-col ui:gap-5"]);

export const fieldSetVariants = cva([
  "ui:flex ui:flex-col ui:gap-4",
  "ui:border-0 ui:p-0 ui:m-0 ui:min-w-0",
]);

export const fieldLegendVariants = cva([
  "malbec-font-sans",
  "ui:text-[14px] ui:leading-[14px] ui:tracking-[-0.42px]",
  "ui:text-text-default ui:font-semibold",
  "ui:mb-1.5 ui:p-0",
]);

export const fieldLabelRequiredMarkVariants = cva([
  "ui:text-destructive ui:ml-0.5",
]);
