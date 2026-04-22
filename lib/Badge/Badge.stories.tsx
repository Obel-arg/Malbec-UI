import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "../Spinner/Spinner";
import { Badge, type BadgeProps } from "./Badge";
import type { BadgeVariant } from "./badge-variants";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M7 7h10v10" />
    <path d="M7 17L17 7" />
  </svg>
);

/**
 * Follows [shadcn/ui Badge](https://ui.shadcn.com/docs/components/radix/badge) API (`variant`, `asChild`, optional icons via `data-icon` on children).
 */
const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "destructive",
        "ghost",
        "link",
      ] satisfies BadgeVariant[],
    },
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const labels: Record<BadgeVariant, string> = {
  default: "Badge",
  secondary: "Secondary",
  outline: "Outline",
  destructive: "Destructive",
  ghost: "Ghost",
  link: "Link",
};

export const AllVariants: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
      {(
        [
          "default",
          "secondary",
          "outline",
          "destructive",
          "ghost",
          "link",
        ] as const
      ).map((v) => (
        <Badge key={v} variant={v}>
          {labels[v]}
        </Badge>
      ))}
    </div>
  ),
};

export const WithIconInlineStart: Story = {
  name: "With icon (inline start)",
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:gap-3">
      <Badge>
        <span data-icon="inline-start">
          <CheckIcon />
        </span>
        Verified
      </Badge>
      <Badge variant="secondary">
        <span data-icon="inline-start">
          <BookmarkIcon />
        </span>
        Bookmark
      </Badge>
    </div>
  ),
};

export const WithIconInlineEnd: Story = {
  name: "With icon (inline end)",
  render: () => (
    <Badge variant="outline">
      Status
      <span data-icon="inline-end">
        <CheckIcon />
      </span>
    </Badge>
  ),
};

export const WithSpinner: Story = {
  name: "With spinner",
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:gap-3">
      <Badge>
        <span className="ui:contents" data-icon="inline-start">
          <Spinner className="ui:size-3" />
        </span>
        Deleting
      </Badge>
      <Badge variant="secondary">
        Generating
        <span className="ui:contents" data-icon="inline-end">
          <Spinner className="ui:size-3" />
        </span>
      </Badge>
    </div>
  ),
};

export const AsChildLink: Story = {
  name: "asChild (link)",
  render: () => (
    <Badge asChild>
      <a
        className="ui:cursor-pointer"
        href="https://ui.shadcn.com/docs/components/radix/badge"
        target="_blank"
        rel="noreferrer"
      >
        Open shadcn Badge
        <span className="ui:contents" data-icon="inline-end">
          <ArrowUpRightIcon />
        </span>
      </a>
    </Badge>
  ),
};

export const Default: Story = {
  args: { children: "Badge", variant: "default" },
};
