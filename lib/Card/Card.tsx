"use client";

import * as React from "react";
import { cn } from "../utils/cn";
import {
  cardActionVariants,
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardRootVariants,
  cardTitleVariants,
} from "./card-variants";

export type CardProps = React.ComponentProps<"div">;

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(cardRootVariants(), className)}
      {...rest}
    />
  );
});

export type CardHeaderProps = React.ComponentProps<"div">;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(cardHeaderVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CardTitleProps = React.ComponentProps<"div">;

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  function CardTitle({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn(cardTitleVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CardDescriptionProps = React.ComponentProps<"div">;

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  function CardDescription({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-description"
        className={cn(cardDescriptionVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CardActionProps = React.ComponentProps<"div">;

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  function CardAction({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn(cardActionVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CardContentProps = React.ComponentProps<"div">;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn(cardContentVariants(), className)}
        {...rest}
      />
    );
  },
);

export type CardFooterProps = React.ComponentProps<"div">;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn(cardFooterVariants(), className)}
        {...rest}
      />
    );
  },
);

type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Action: typeof CardAction;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

export const Card = CardRoot as CardComponent;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Footer = CardFooter;

/** shadcn-style names — same as `Card.Header` / `Card.Title` / … */
export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
