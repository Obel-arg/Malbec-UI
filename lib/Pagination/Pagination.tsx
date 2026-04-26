"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils/cn";
import {
  paginationContentVariants,
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationLinkVariants,
  paginationPreviousNextVariants,
} from "./pagination-variants";

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export type PaginationProps = React.ComponentPropsWithoutRef<"nav">;

const PaginationRoot = React.forwardRef<HTMLElement, PaginationProps>(
  function PaginationRoot({ className, ...props }, ref) {
    return (
      <nav
        ref={ref}
        data-slot="pagination"
        role="navigation"
        aria-label="pagination"
        className={cn(className)}
        {...props}
      />
    );
  },
);
PaginationRoot.displayName = "Pagination";

export type PaginationContentProps = React.ComponentPropsWithoutRef<"ul">;

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  function PaginationContent({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-slot="pagination-content"
        className={cn(paginationContentVariants(), className)}
        {...props}
      />
    );
  },
);
PaginationContent.displayName = "PaginationContent";

export type PaginationItemProps = React.ComponentPropsWithoutRef<"li">;

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  function PaginationItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        data-slot="pagination-item"
        className={cn(paginationItemVariants(), className)}
        {...props}
      />
    );
  },
);
PaginationItem.displayName = "PaginationItem";

export type PaginationLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  isActive?: boolean;
  asChild?: boolean;
};

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationLink(
    { asChild, isActive = false, className, "aria-current": ariaCurrent, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        data-slot="pagination-link"
        data-active={isActive ? "" : undefined}
        aria-current={ariaCurrent ?? (isActive ? "page" : undefined)}
        className={cn(
          paginationLinkVariants({ isActive }),
          className,
        )}
        {...props}
      />
    );
  },
);
PaginationLink.displayName = "PaginationLink";

export type PaginationPreviousProps = Omit<
  React.ComponentPropsWithoutRef<"a">,
  "children"
> & {
  asChild?: boolean;
  children?: React.ReactNode;
};

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  function PaginationPrevious({ asChild, className, children, ...props }, ref) {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        data-slot="pagination-previous"
        aria-label="Go to previous page"
        className={cn(paginationPreviousNextVariants(), className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <ChevronLeftIcon className="ui:size-3.5 ui:shrink-0 ui:text-text-default-muted" />
            <span className="ui:whitespace-nowrap">{children ?? "Previous"}</span>
          </>
        )}
      </Comp>
    );
  },
);
PaginationPrevious.displayName = "PaginationPrevious";

export type PaginationNextProps = Omit<
  React.ComponentPropsWithoutRef<"a">,
  "children"
> & {
  asChild?: boolean;
  children?: React.ReactNode;
};

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  function PaginationNext({ asChild, className, children, ...props }, ref) {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        data-slot="pagination-next"
        aria-label="Go to next page"
        className={cn(paginationPreviousNextVariants(), className)}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="ui:whitespace-nowrap">{children ?? "Next"}</span>
            <ChevronRightIcon className="ui:size-3.5 ui:shrink-0 ui:text-text-default-muted" />
          </>
        )}
      </Comp>
    );
  },
);
PaginationNext.displayName = "PaginationNext";

export type PaginationEllipsisProps = React.ComponentPropsWithoutRef<"span">;

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(function PaginationEllipsis({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="pagination-ellipsis"
      role="presentation"
      aria-hidden
      className={cn(paginationEllipsisVariants(), className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="ui:sr-only">More pages</span>
    </span>
  );
});
PaginationEllipsis.displayName = "PaginationEllipsis";

type PaginationComponent = typeof PaginationRoot & {
  Content: typeof PaginationContent;
  Item: typeof PaginationItem;
  Link: typeof PaginationLink;
  Previous: typeof PaginationPrevious;
  Next: typeof PaginationNext;
  Ellipsis: typeof PaginationEllipsis;
};

export const Pagination = PaginationRoot as PaginationComponent;
Pagination.Content = PaginationContent;
Pagination.Item = PaginationItem;
Pagination.Link = PaginationLink;
Pagination.Previous = PaginationPrevious;
Pagination.Next = PaginationNext;
Pagination.Ellipsis = PaginationEllipsis;
