"use client";

import React from "react";
import { Badge, type BadgeProps } from "./Badge";
import { statusVariant, TONE_VARIANT, type StatusTone } from "./status-tone";

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  /** Status string from the product's catalog (e.g. "Aprobado", "En revisión"). */
  status?: string;
  /**
   * Explicit tone, for products whose status is an enum rendered with a translated
   * label: the colour stays put whatever the language. Wins over `status`.
   */
  tone?: StatusTone;
  /** Variant when `status` isn't in the canonical map. Default `secondary` (gray). */
  fallback?: BadgeProps["variant"];
}

/**
 * `Badge` that picks its colour from the canonical status map, so products pass
 * the status (or its tone) and never choose a colour. Renders `status` as its
 * label unless `children` are given.
 */
export const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  function StatusBadge({ status, tone, fallback = "secondary", children, ...rest }, ref) {
    const variant = tone ? TONE_VARIANT[tone] : statusVariant(status ?? "", fallback);
    return (
      <Badge ref={ref} variant={variant} {...rest}>
        {children ?? status}
      </Badge>
    );
  },
);

StatusBadge.displayName = "StatusBadge";
