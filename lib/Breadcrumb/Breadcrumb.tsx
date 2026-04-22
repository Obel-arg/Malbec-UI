import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils/cn";
import {
  breadcrumbEllipsisVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
} from "./breadcrumb-variants";

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

function EllipsisIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav">;

const BreadcrumbRoot = React.forwardRef<
  React.ElementRef<"nav">,
  BreadcrumbProps
>(function BreadcrumbRoot({ className, ...props }, ref) {
  return (
    <nav
      ref={ref}
      data-slot="breadcrumb"
      aria-label="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
});
BreadcrumbRoot.displayName = "Breadcrumb";

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">;

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, ...props }, ref) {
    return (
      <ol
        ref={ref}
        data-slot="breadcrumb-list"
        className={cn(breadcrumbListVariants(), className)}
        {...props}
      />
    );
  },
);
BreadcrumbList.displayName = "BreadcrumbList";

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">;

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        data-slot="breadcrumb-item"
        className={cn(breadcrumbItemVariants(), className)}
        {...props}
      />
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean;
};

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ asChild, className, ...props }, ref) {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        data-slot="breadcrumb-link"
        className={cn(breadcrumbLinkVariants(), className)}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">;

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="breadcrumb-page"
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn(breadcrumbPageVariants(), className)}
        {...props}
      />
    );
  },
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"li">;

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants(), className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export type BreadcrumbEllipsisProps = React.ComponentPropsWithoutRef<"span">;

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbEllipsisVariants(), className)}
      {...props}
    >
      <EllipsisIcon />
      <span className="ui:sr-only">More</span>
    </span>
  );
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

type BreadcrumbComponent = typeof BreadcrumbRoot & {
  List: typeof BreadcrumbList;
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Page: typeof BreadcrumbPage;
  Separator: typeof BreadcrumbSeparator;
  Ellipsis: typeof BreadcrumbEllipsis;
};

export const Breadcrumb = BreadcrumbRoot as BreadcrumbComponent;
Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;

/** shadcn-style names — same as `Breadcrumb.List` / `Breadcrumb.Item` / … */
export {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
