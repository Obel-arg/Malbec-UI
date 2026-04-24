import { cva } from "class-variance-authority";

/**
 * Chart container shell only — no visual variant axes (Figma ships a single neutral chart state).
 */
export const chartContainerVariants = cva([
  "ui:malbec-font-sans",
  "ui:flex ui:min-h-[200px] ui:w-full ui:justify-center ui:text-[12px]",
  "ui:[&_.recharts-layer]:ui:outline-none",
  "ui:[&_.recharts-surface]:ui:outline-none",
  "ui:[&_.recharts-sector]:ui:outline-none",
  "ui:[&_.recharts-cartesian-axis-tick_text]:ui:fill-text-default-muted",
  "ui:[&_.recharts-dot[stroke='#fff']]:ui:stroke-transparent",
  "ui:[&_.recharts-sector[stroke='#fff']]:ui:stroke-transparent",
]);
