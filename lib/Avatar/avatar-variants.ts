import { cva, type VariantProps } from "class-variance-authority";

export const avatarRootVariants = cva(
  [
    /** `overflow-visible` so `AvatarBadge` is not clipped; image/fallback clip themselves. */
    "ui:relative ui:inline-flex ui:shrink-0 ui:overflow-visible ui:rounded-full",
    "ui:malbec-font-sans ui:align-middle",
  ],
  {
    variants: {
      size: {
        sm: "ui:size-8",
        default: "ui:size-10",
        lg: "ui:size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const avatarImageVariants = cva(
  "ui:pointer-events-none ui:aspect-square ui:size-full ui:overflow-hidden ui:rounded-full ui:object-cover",
);

export const avatarFallbackVariants = cva(
  "ui:flex ui:size-full ui:items-center ui:justify-center ui:overflow-hidden ui:rounded-full ui:bg-background-200 ui:text-text-default",
  {
    variants: {
      size: {
        sm: "ui:text-[10px] ui:leading-4 ui:font-normal",
        default: "ui:text-[12px] ui:leading-5 ui:font-normal",
        lg: "ui:text-[14px] ui:leading-5 ui:font-normal",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const avatarBadgeVariants = cva(
  [
    "ui:absolute ui:bottom-0 ui:right-0 ui:z-10 ui:box-border ui:flex ui:translate-x-[15%] ui:translate-y-[15%]",
    "ui:items-center ui:justify-center ui:rounded-full ui:border-2 ui:border-background-100",
    "ui:[&:not(:has(svg))]:bg-primary ui:[&:not(:has(svg))]:text-primary-foreground",
    "ui:[&:has(svg)]:bg-background-100 ui:[&:has(svg)]:text-primary",
    "ui:[&_svg]:shrink-0 ui:[&:has(svg)_svg]:text-primary",
  ],
  {
    variants: {
      size: {
        sm: "ui:size-3 ui:[&_svg]:size-2.5",
        default: "ui:size-4 ui:[&_svg]:size-3",
        lg: "ui:size-[18px] ui:[&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Overlap matches Product UI avatar stack
 * ([Figma](https://www.figma.com/design/3hJrSG0n3licademk2EaOT/Product-UI?node-id=329-6181)):
 * `mr-[-14.05px]` on ~36px cells → ratio ≈ 0.389 of the avatar diameter.
 */
export const avatarGroupVariants = cva(
  [
    "ui:flex ui:items-center",
    "ui:*:data-[slot=avatar]:box-border ui:*:data-[slot=avatar]:border-[2.203px] ui:*:data-[slot=avatar]:border-solid ui:*:data-[slot=avatar]:border-background-200",
    "ui:*:data-[slot=avatar-group-count]:box-border ui:*:data-[slot=avatar-group-count]:border-[2.203px] ui:*:data-[slot=avatar-group-count]:border-solid ui:*:data-[slot=avatar-group-count]:border-background-200",
  ],
  {
    variants: {
      size: {
        sm: "ui:[&>*:not(:first-child)]:ml-[-12.45px]",
        default: "ui:[&>*:not(:first-child)]:ml-[-15.56px]",
        lg: "ui:[&>*:not(:first-child)]:ml-[-18.67px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const avatarGroupCountVariants = cva(
  [
    "ui:relative ui:z-0 ui:inline-flex ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full",
    "ui:bg-primary ui:text-primary-foreground ui:malbec-font-sans",
    "ui:[&_svg]:shrink-0 ui:[&_svg]:text-current",
  ],
  {
    variants: {
      size: {
        sm: "ui:size-8 ui:text-[11px] ui:font-medium ui:leading-none ui:tracking-[-0.04em] ui:[&_svg]:size-2",
        default:
          "ui:size-10 ui:text-[13px] ui:font-medium ui:leading-none ui:tracking-[-0.06em] ui:[&_svg]:size-2.5",
        lg: "ui:size-12 ui:text-[14px] ui:font-medium ui:leading-none ui:tracking-[-0.06em] ui:[&_svg]:size-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type AvatarSize = NonNullable<
  VariantProps<typeof avatarRootVariants>["size"]
>;
