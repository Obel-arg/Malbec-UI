"use client";

import * as React from "react";
import {
  Root as AvatarPrimitiveRoot,
  Image as AvatarPrimitiveImage,
  Fallback as AvatarPrimitiveFallback,
} from "@radix-ui/react-avatar";
import { cn } from "../utils/cn";
import {
  avatarBadgeVariants,
  avatarFallbackVariants,
  avatarGroupCountVariants,
  avatarGroupVariants,
  avatarImageVariants,
  avatarRootVariants,
} from "./avatar-variants";
import type { AvatarSize } from "./avatar-variants";

export type { AvatarSize } from "./avatar-variants";

type AvatarContextValue = {
  size: AvatarSize;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarSize(component: string): AvatarContextValue {
  const ctx = React.useContext(AvatarContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside an <Avatar> component.`);
  }
  return ctx;
}

export interface AvatarProps extends React.ComponentPropsWithoutRef<
  typeof AvatarPrimitiveRoot
> {
  size?: AvatarSize;
}

const AvatarRoot = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitiveRoot>,
  AvatarProps
>(function AvatarRoot({ className, size = "default", ...rest }, ref) {
  const ctx = React.useMemo<AvatarContextValue>(() => ({ size }), [size]);

  return (
    <AvatarContext.Provider value={ctx}>
      <AvatarPrimitiveRoot
        ref={ref}
        data-slot="avatar"
        data-size={size}
        className={cn(avatarRootVariants({ size }), className)}
        {...rest}
      />
    </AvatarContext.Provider>
  );
});

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitiveImage>,
  AvatarImageProps
>(function AvatarImage({ className, ...rest }, ref) {
  useAvatarSize("AvatarImage");
  return (
    <AvatarPrimitiveImage
      ref={ref}
      data-slot="avatar-image"
      className={cn(avatarImageVariants(), className)}
      {...rest}
    />
  );
});

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitiveFallback
>;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitiveFallback>,
  AvatarFallbackProps
>(function AvatarFallback({ className, ...rest }, ref) {
  const { size } = useAvatarSize("AvatarFallback");
  return (
    <AvatarPrimitiveFallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants({ size }), className)}
      {...rest}
    />
  );
});

export type AvatarBadgeProps = React.ComponentPropsWithoutRef<"span">;

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  function AvatarBadge({ className, ...rest }, ref) {
    const { size } = useAvatarSize("AvatarBadge");
    return (
      <span
        ref={ref}
        data-slot="avatar-badge"
        className={cn(avatarBadgeVariants({ size }), className)}
        {...rest}
      />
    );
  },
);

type AvatarGroupContextValue = {
  size: AvatarSize;
};

const AvatarGroupContext = React.createContext<AvatarGroupContextValue | null>(
  null,
);

function useAvatarGroupContext(component: string): AvatarGroupContextValue {
  const ctx = React.useContext(AvatarGroupContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside an <AvatarGroup> component.`);
  }
  return ctx;
}

export type AvatarGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: AvatarSize;
};

const AvatarGroupRoot = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ className, size = "default", ...rest }, ref) {
    const ctx = React.useMemo<AvatarGroupContextValue>(() => ({ size }), [size]);

    return (
      <AvatarGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          data-slot="avatar-group"
          data-size={size}
          className={cn(avatarGroupVariants({ size }), className)}
          {...rest}
        />
      </AvatarGroupContext.Provider>
    );
  },
);

export type AvatarGroupCountProps = React.ComponentPropsWithoutRef<"div">;

const AvatarGroupCount = React.forwardRef<HTMLDivElement, AvatarGroupCountProps>(
  function AvatarGroupCount({ className, ...rest }, ref) {
    const { size } = useAvatarGroupContext("AvatarGroupCount");
    return (
      <div
        ref={ref}
        data-slot="avatar-group-count"
        className={cn(avatarGroupCountVariants({ size }), className)}
        {...rest}
      />
    );
  },
);

type AvatarComponent = typeof AvatarRoot & {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
  Badge: typeof AvatarBadge;
};

export const Avatar = AvatarRoot as AvatarComponent;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
Avatar.Badge = AvatarBadge;

type AvatarGroupComponent = typeof AvatarGroupRoot & {
  Count: typeof AvatarGroupCount;
};

const AvatarGroup = AvatarGroupRoot as AvatarGroupComponent;
AvatarGroup.Count = AvatarGroupCount;

export { AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount };
