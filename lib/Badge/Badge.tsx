"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils/cn";
import {
  badgeIconVariants,
  badgeTextVariants,
  badgeVariants,
} from "./badge-variants";
import type { VariantProps } from "class-variance-authority";
import type { BadgeVariant } from "./badge-variants";

export type { BadgeVariant };

export interface BadgeProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
  variant?: BadgeVariant;
}

type BadgeInternalContext = {
  variant: BadgeVariant;
};

const BadgeContext = React.createContext<BadgeInternalContext | null>(null);

function useBadgeContext(component: string): BadgeInternalContext {
  const ctx = React.useContext(BadgeContext);
  if (!ctx) {
    throw new Error(
      `<${component}> must be rendered inside a <Badge> component.`,
    );
  }
  return ctx;
}

const BadgeRoot = React.forwardRef<HTMLDivElement, BadgeProps>(
  function BadgeRoot(
    {
      className,
      variant = "default",
      asChild = false,
      children,
      ...rest
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "div";
    const ctx = React.useMemo<BadgeInternalContext>(
      () => ({ variant }),
      [variant],
    );

    return (
      <BadgeContext.Provider value={ctx}>
        <Comp
          ref={ref}
          data-slot="badge"
          data-variant={variant}
          className={cn(badgeVariants({ variant }), className)}
          {...rest}
        >
          {children}
        </Comp>
      </BadgeContext.Provider>
    );
  },
);

export interface BadgeIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When true, the icon is hidden from assistive tech (purely decorative). */
  decorative?: boolean;
}

const BadgeIcon = React.forwardRef<HTMLSpanElement, BadgeIconProps>(
  function BadgeIcon(
    { className, children, decorative = true, ...rest },
    ref,
  ) {
    useBadgeContext("Badge.Icon");

    return (
      <span
        ref={ref}
        className={cn(badgeIconVariants(), className)}
        aria-hidden={decorative || undefined}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

export type BadgeTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** When `accent`, uses `var(--malbec-badge-accent)` (set on categorical `Badge` roots). */
  tone?: NonNullable<VariantProps<typeof badgeTextVariants>["tone"]>;
};

const BadgeText = React.forwardRef<HTMLSpanElement, BadgeTextProps>(
  function BadgeText({ className, children, tone = "default", ...rest }, ref) {
    useBadgeContext("Badge.Text");

    return (
      <span
        ref={ref}
        className={cn(badgeTextVariants({ tone }), className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

BadgeRoot.displayName = "Badge";
BadgeIcon.displayName = "Badge.Icon";
BadgeText.displayName = "Badge.Text";

type BadgeComponent = typeof BadgeRoot & {
  Icon: typeof BadgeIcon;
  Text: typeof BadgeText;
};

export const Badge = BadgeRoot as BadgeComponent;
Badge.Icon = BadgeIcon;
Badge.Text = BadgeText;
