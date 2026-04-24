import { cva, type VariantProps } from "class-variance-authority";

/** Outer wrapper from `Sidebar.Provider` — sets width vars and font. */
export const sidebarProviderVariants = cva(
  [
    "malbec-font-sans",
    "ui:group/sidebar-wrapper",
    "ui:flex ui:min-h-svh ui:w-full ui:flex-col",
  ],
  {
    variants: {
      side: {
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

export const sidebarGapVariants = cva("ui:flex ui:flex-1 ui:min-h-0 ui:min-w-0 ui:flex-col", {
  variants: {
    side: {
      left: "ui:md:flex-row ui:md:items-stretch",
      right: "ui:md:flex-row-reverse ui:md:items-stretch",
    },
  },
  defaultVariants: {
    side: "left",
  },
});

export const sidebarRootVariants = cva(
  [
    "ui:bg-background-200",
    "ui:text-text-default",
    "ui:flex ui:h-full ui:max-h-svh ui:w-(--sidebar-width) ui:flex-col",
    "ui:overflow-hidden",
  ],
  {
    variants: {
      side: {
        left: "ui:border-sidebar-border ui:border-r ui:md:sticky ui:md:top-0 ui:md:z-10",
        right: "ui:border-sidebar-border ui:border-l ui:md:sticky ui:md:top-0 ui:md:z-10",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

/** Desktop panel: hidden on small screens (mobile uses sheet). */
export const sidebarDesktopVariants = cva(
  "ui:hidden ui:md:flex ui:md:shrink-0 ui:md:self-stretch",
  {
    variants: {
      side: {
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

export const sidebarHeaderVariants = cva(
  "ui:bg-background-200 ui:flex ui:flex-col ui:gap-0 ui:items-start ui:justify-center ui:overflow-hidden ui:p-2 ui:shrink-0 ui:w-full",
);

/** Outer footer shell — padding only; inner card uses `sidebarFooterInnerVariants`. */
export const sidebarFooterVariants = cva(
  "ui:shrink-0 ui:w-full ui:flex ui:min-h-0 ui:flex-col ui:overflow-hidden ui:p-2",
  {
    variants: {
      side: {
        left: "",
        right: "ui:flex-1 ui:items-center ui:justify-end",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

/** Inner footer card: `--color-background-300` + radius + shadow (both sidebar sides). */
export const sidebarFooterInnerVariants = cva(
  "ui:w-full ui:overflow-hidden ui:rounded-[5px] ui:bg-background-300 ui:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.04)]",
);

export const sidebarContentVariants = cva(
  "ui:bg-background-200 ui:flex ui:min-h-0 ui:flex-1 ui:flex-col ui:gap-0 ui:items-start ui:justify-start ui:overflow-y-auto ui:overflow-x-hidden ui:p-2 ui:w-full",
);

export const sidebarGroupVariants = cva(
  "ui:relative ui:flex ui:w-full ui:flex-col ui:items-start ui:justify-start ui:overflow-visible ui:bg-background-200",
);

export const sidebarGroupLabelVariants = cva(
  "ui:flex ui:h-8 ui:w-full ui:flex-col ui:items-center ui:justify-center ui:rounded-md ui:px-2",
);

export const sidebarGroupLabelTextVariants = cva(
  "ui:w-full ui:text-left ui:text-xs ui:font-medium ui:leading-tight ui:text-text-default",
);

export const sidebarGroupContentVariants = cva("ui:flex ui:w-full ui:flex-col");

export const sidebarMenuVariants = cva("ui:flex ui:w-full ui:flex-col ui:gap-0 ui:p-0 ui:m-0");

export const sidebarMenuItemVariants = cva(
  "ui:relative ui:list-none ui:w-full",
);

export const sidebarMenuButtonVariants = cva(
  [
    "ui:peer/menu-button",
    "ui:flex ui:h-8 ui:w-full ui:items-center ui:gap-2 ui:rounded-md ui:p-2",
    "ui:text-left ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
    "ui:outline-none ui:transition-colors",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
    "ui:disabled:pointer-events-none ui:disabled:opacity-50",
    "ui:hover:bg-background-300/40",
    "ui:data-[active=true]:bg-background-300/60",
  ],
  {
    variants: {
      isActive: {
        true: "ui:font-medium ui:bg-background-300/50",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export const sidebarMenuSubVariants = cva(
  "ui:flex ui:w-full ui:flex-col ui:gap-0 ui:py-0.5 ui:pl-3.5 ui:pr-3.5",
);

export const sidebarMenuSubRailVariants = cva(
  "ui:flex ui:w-full ui:flex-col ui:items-start ui:border-l ui:border-sidebar-border ui:px-2.5",
);

export const sidebarMenuSubItemVariants = cva("ui:relative ui:list-none ui:w-full");

export const sidebarMenuSubButtonVariants = cva(
  [
    "ui:flex ui:h-8 ui:w-full ui:items-center ui:gap-2 ui:rounded-md ui:p-2",
    "ui:text-left ui:text-sm ui:font-normal ui:leading-tight ui:text-text-default",
    "ui:outline-none ui:transition-colors",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
    "ui:hover:bg-background-300/40",
    "ui:data-[active=true]:bg-background-300/60",
  ],
  {
    variants: {
      isActive: {
        true: "ui:font-medium ui:bg-background-300/50",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

/** Workspace / user row in header & footer (Figma: h-12, gap-2, p-2). */
export const sidebarRowButtonVariants = cva(
  "ui:flex ui:h-12 ui:w-full ui:min-w-0 ui:items-center ui:gap-2 ui:overflow-hidden ui:rounded-md ui:p-2 ui:bg-transparent ui:text-left ui:outline-none ui:transition-colors ui:hover:bg-background-300/40 ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
);

export const sidebarWorkspaceIconVariants = cva(
  "ui:flex ui:size-8 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-lg",
  {
    variants: {
      side: {
        left: "ui:bg-background-100",
        right: "ui:bg-background-300",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

export const sidebarRowTextStackVariants = cva(
  "ui:flex ui:min-w-0 ui:flex-1 ui:flex-col ui:items-stretch ui:justify-center ui:leading-none ui:text-text-default",
);

export const sidebarRowTitleVariants = cva(
  "ui:w-full ui:truncate ui:text-sm ui:font-semibold ui:leading-tight",
);

export const sidebarRowSubtitleVariants = cva(
  "ui:w-full ui:truncate ui:text-xs ui:font-normal ui:leading-tight ui:text-text-default",
);

export const sidebarIconBoxVariants = cva(
  "ui:inline-flex ui:size-4 ui:shrink-0 ui:items-center ui:justify-center ui:[&>svg]:size-full",
);

/** Main column when sidebar is a flex sibling (`Sidebar.Gap`). */
export const sidebarInsetVariants = cva(
  "ui:relative ui:flex ui:min-h-svh ui:min-w-0 ui:flex-1 ui:flex-col ui:bg-background-100",
);

/** Classes for `Sheet.Content` with `unstyled` — mobile drawer shell. */
export const sidebarSheetContentVariants = cva(
  [
    "ui:fixed ui:inset-y-0 ui:z-50",
    "ui:flex ui:h-full ui:max-h-svh ui:w-(--sidebar-width-mobile) ui:max-w-(--sidebar-width-mobile) ui:flex-col ui:overflow-hidden ui:gap-0 ui:bg-background-200 ui:p-0 ui:outline-none",
    "ui:border-sidebar-border",
  ],
  {
    variants: {
      side: {
        left: "ui:left-0 ui:right-auto ui:border-r",
        right: "ui:right-0 ui:left-auto ui:border-l",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

/** Rotates when parent trigger has `ui:group` + Radix `data-state=open` (see `Sidebar.CollapsibleTrigger`). */
export const sidebarCollapsibleChevronVariants = cva(
  "ui:size-4 ui:shrink-0 ui:text-text-default ui:transition-transform ui:duration-200 ui:group-data-[state=open]:rotate-90",
);

export type SidebarSide = NonNullable<VariantProps<typeof sidebarRootVariants>["side"]>;
