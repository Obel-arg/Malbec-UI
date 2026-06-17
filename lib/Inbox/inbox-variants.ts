import { cva } from "class-variance-authority";

/**
 * Card shell matching Figma `Inbox.overview`: 8px radius, 1px border, soft
 * elevation. Width is left to the consumer (the default story uses 440px).
 */
export const inboxRootVariants = cva([
  "malbec-font-sans",
  "ui:flex ui:flex-col ui:overflow-hidden ui:isolate",
  "ui:bg-background-100 ui:border ui:border-background-300 ui:rounded-[8px]",
  "ui:shadow-[0_2px_3px_0_rgba(0,0,0,0.08),0_8px_13px_0_rgba(0,0,0,0.12)]",
  "ui:w-full",
]);

/** Top bar: title + filter chevron on the left, more-actions on the right. */
export const inboxHeaderVariants = cva([
  "ui:flex ui:items-center ui:justify-between ui:shrink-0 ui:w-full",
  "ui:px-4 ui:pt-3 ui:pb-2",
]);

export const inboxHeaderTitleVariants = cva([
  "ui:flex ui:items-center ui:gap-[2px]",
  "ui:text-[16px] ui:font-medium ui:leading-6 ui:tracking-[-0.176px]",
  "ui:text-text-default",
]);

/** Trigger surrounding the title + chevron when a filter menu is wired up. */
export const inboxFilterTriggerVariants = cva([
  "ui:inline-flex ui:items-center ui:gap-[2px] ui:cursor-pointer",
  "ui:outline-none ui:bg-transparent ui:p-0 ui:m-0 ui:border-0",
  "ui:rounded-[4px]",
  "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
]);

/** Icon button used for the top-right more-actions trigger. */
export const inboxIconButtonVariants = cva([
  "ui:inline-flex ui:items-center ui:justify-center ui:cursor-pointer",
  "ui:size-5 ui:p-[3px] ui:rounded-[4px] ui:bg-transparent ui:border-0",
  "ui:text-text-default-muted ui:hover:text-text-default ui:hover:bg-background-200",
  "ui:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
  "ui:transition-colors",
]);

/** Tabs row matching the underline variant; full-width with a bottom border. */
export const inboxTabsRowVariants = cva([
  "ui:flex ui:items-center ui:gap-6 ui:shrink-0 ui:w-full",
  "ui:h-11 ui:px-4 ui:py-2",
  "ui:border-b ui:border-background-300",
]);

/** Each tab trigger: text + optional count badge, with an active underline. */
export const inboxTabTriggerVariants = cva(
  [
    "ui:relative ui:inline-flex ui:items-center ui:gap-1 ui:cursor-pointer",
    "ui:bg-transparent ui:border-0 ui:p-0 ui:m-0",
    "ui:text-[14px] ui:font-medium ui:leading-5 ui:tracking-[-0.084px]",
    "ui:outline-none",
    "ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background-100",
    "ui:rounded-[2px]",
    // Underline sits exactly on the row's bottom border (row has `py-2` so the
    // trigger bottom edge is 12px above the row bottom; -bottom-[12px] places
    // the 2px stripe right on the border, replacing it in the active section).
    "ui:after:content-[''] ui:after:absolute ui:after:left-0 ui:after:right-0 ui:after:-bottom-[12px] ui:after:h-[2px] ui:after:bg-primary ui:after:opacity-0",
    "ui:data-[state=active]:after:opacity-100",
  ],
  {
    variants: {
      active: {
        true: "ui:text-text-default ui:after:opacity-100",
        false: "ui:text-text-default-muted ui:hover:text-text-default",
      },
    },
    defaultVariants: { active: false },
  },
);

/** Count chip rendered next to each tab label. Mirrors Figma pill: bg-primary, white text. */
export const inboxTabCountVariants = cva([
  "ui:inline-flex ui:items-center ui:justify-center",
  "ui:h-4 ui:min-w-4 ui:px-[5px] ui:rounded-full",
  "ui:bg-primary ui:text-primary-foreground",
  "ui:text-[11px] ui:font-medium ui:leading-3 ui:tracking-[0.22px] ui:uppercase",
  "ui:tabular-nums",
]);

/** List container — scrollable when the consumer constrains height. */
export const inboxListVariants = cva([
  "ui:flex ui:flex-col ui:items-stretch ui:w-full ui:min-h-0 ui:flex-1",
  "ui:overflow-y-auto",
]);

/**
 * Notification row. Unread state paints a subtle tint of `primary` so the row
 * reads as "still open" even when the dot indicator scrolls out of view.
 */
export const inboxItemVariants = cva(
  [
    "ui:group/inbox-item ui:relative ui:flex ui:items-start ui:gap-3 ui:p-4 ui:w-full",
    "ui:border-b ui:border-background-300 ui:bg-background-100",
    "ui:text-left ui:transition-colors",
  ],
  {
    variants: {
      unread: {
        true: "ui:bg-[color-mix(in_srgb,var(--color-primary)_5%,var(--color-background-100))]",
        false: "",
      },
      interactive: {
        true: "ui:cursor-pointer ui:hover:bg-background-200/60 ui:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-inset",
        false: "",
      },
    },
    defaultVariants: { unread: false, interactive: false },
  },
);

/** 32px circular badge containing the notification glyph. */
export const inboxItemAvatarVariants = cva([
  "ui:inline-flex ui:items-center ui:justify-center ui:shrink-0",
  "ui:size-8 ui:rounded-full",
  "ui:bg-background-200 ui:text-text-default-muted",
]);

/** Stack holding title row, body paragraph, actions, footer. */
export const inboxItemContentVariants = cva([
  "ui:flex ui:flex-col ui:items-start ui:gap-3 ui:flex-1 ui:min-w-0",
]);

export const inboxItemTitleRowVariants = cva([
  "ui:flex ui:items-start ui:justify-between ui:gap-1.5 ui:w-full",
]);

export const inboxItemTitleVariants = cva([
  "ui:flex-1 ui:min-w-0",
  "ui:text-[14px] ui:font-medium ui:leading-5 ui:tracking-[-0.084px]",
  "ui:text-text-default",
]);

export const inboxItemBodyVariants = cva([
  "ui:w-full ui:min-w-0",
  "ui:text-[14px] ui:font-normal ui:leading-5 ui:tracking-[-0.084px]",
  "ui:text-text-default-muted ui:opacity-90",
]);

export const inboxItemActionsVariants = cva([
  "ui:flex ui:flex-wrap ui:items-center ui:gap-2",
]);

/**
 * Footer wraps inline so it can sit on the same row as `<Inbox.Item.Actions>`
 * (Content composes the surrounding flex-row that right-aligns it). When the
 * footer is alone, Content wraps it in a full-width justify-end container.
 */
export const inboxItemFooterVariants = cva([
  "ui:inline-flex ui:items-center ui:gap-1.5",
  "ui:text-[12px] ui:font-normal ui:leading-4",
  "ui:text-text-default-muted",
]);

/** 6px dot signalling unread, top-right of the title row. */
export const inboxItemUnreadDotVariants = cva([
  "ui:inline-block ui:size-1.5 ui:shrink-0 ui:rounded-full ui:bg-primary",
]);

/**
 * Hover-only floating toolbar in the top-right of the row. Revealed via the
 * `group/inbox-item` hover state and stays open while focused inside.
 *
 * Insets match Figma (`top-2 right-2` ≈ 8px): the bar sits over the row's
 * 16px padding so it nudges right up to the card border, *not* the row body.
 */
export const inboxItemHoverBarVariants = cva([
  "ui:absolute ui:right-2 ui:top-2 ui:flex ui:items-center ui:gap-[3px]",
  "ui:p-[3px] ui:rounded-[6px]",
  "ui:bg-background-100 ui:border ui:border-background-100",
  "ui:shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]",
  "ui:opacity-0 ui:pointer-events-none ui:transition-opacity",
  "ui:group-hover/inbox-item:opacity-100 ui:group-hover/inbox-item:pointer-events-auto",
  "ui:group-focus-within/inbox-item:opacity-100 ui:group-focus-within/inbox-item:pointer-events-auto",
]);

export const inboxItemHoverActionVariants = cva(
  [
    "ui:inline-flex ui:items-center ui:justify-center ui:cursor-pointer",
    "ui:size-5 ui:p-[5px] ui:rounded-[4px] ui:border-0 ui:bg-transparent",
    "ui:text-text-default-muted ui:hover:text-text-default ui:hover:bg-background-200",
    "ui:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-primary ui:focus-visible:ring-inset",
    "ui:transition-colors",
  ],
  {
    variants: {
      active: {
        true: "ui:bg-background-200 ui:text-text-default",
        false: "",
      },
    },
    defaultVariants: { active: false },
  },
);

/** Skeleton row mirrors the populated row's geometry so loading -> loaded is calm. */
export const inboxSkeletonRowVariants = cva([
  "ui:flex ui:items-start ui:gap-3 ui:p-4 ui:w-full",
  "ui:border-b ui:border-background-300 ui:bg-background-100",
]);

/** Linear gradient used by every skeleton block; animation kept off by default for accessibility. */
export const inboxSkeletonBlockVariants = cva([
  "ui:relative ui:overflow-hidden ui:rounded-[6px]",
  "ui:bg-[linear-gradient(90deg,#f1efef_24%,#f9f8f8_43%,rgba(249,248,248,0.75)_115%)]",
]);
