import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, type PaginationProps } from "./Pagination";
import { cn } from "../utils/cn";

/**
 * `Pagination` is a compound component. Compose the row with nested parts:
 *
 * ```tsx
 * <Pagination>
 *   <Pagination.Content>
 *     <Pagination.Item>
 *       <Pagination.Previous href="#" />
 *     </Pagination.Item>
 *     <Pagination.Item>
 *       <Pagination.Link href="#" isActive>
 *         1
 *       </Pagination.Link>
 *     </Pagination.Item>
 *   </Pagination.Content>
 * </Pagination>
 * ```
 *
 * Aligned with [shadcn/ui Pagination](https://ui.shadcn.com/docs/components/radix/pagination) composition.
 */
const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<PaginationProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender() {
    const [page, setPage] = React.useState(2);
    const isFirst = page === 1;
    const isLast = page === 3;

    return (
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              href="#"
              aria-disabled={isFirst}
              tabIndex={isFirst ? -1 : undefined}
              className={cn(
                isFirst && "ui:pointer-events-none ui:opacity-40",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (!isFirst) setPage((p) => p - 1);
              }}
            />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              href="#"
              isActive={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            >
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              href="#"
              isActive={page === 2}
              onClick={(e) => {
                e.preventDefault();
                setPage(2);
              }}
            >
              2
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              href="#"
              isActive={page === 3}
              onClick={(e) => {
                e.preventDefault();
                setPage(3);
              }}
            >
              3
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next
              href="#"
              aria-disabled={isLast}
              tabIndex={isLast ? -1 : undefined}
              className={cn(
                isLast && "ui:pointer-events-none ui:opacity-40",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (!isLast) setPage((p) => p + 1);
              }}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    );
  },
};

export const Simple: Story = {
  render: function SimpleRender() {
    const [page, setPage] = React.useState(2);
    const pages = [1, 2, 3, 4, 5] as const;

    return (
      <Pagination>
        <Pagination.Content>
          {pages.map((n) => (
            <Pagination.Item key={n}>
              <Pagination.Link
                href="#"
                isActive={page === n}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                }}
              >
                {n}
              </Pagination.Link>
            </Pagination.Item>
          ))}
        </Pagination.Content>
      </Pagination>
    );
  },
};
