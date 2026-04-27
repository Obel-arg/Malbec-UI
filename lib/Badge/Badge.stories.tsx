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
 * Composed API (like `Button`): wrap labels in `<Badge.Text>` and icons in `<Badge.Icon>`.
 * Root props: `variant`, `asChild`, plus standard div attributes.
 *
 * See [shadcn/ui Badge](https://ui.shadcn.com/docs/components/radix/badge) for the upstream pattern.
 *
 * ```tsx
 * <Badge variant="default">
 *   <Badge.Text>Label</Badge.Text>
 * </Badge>
 * ```
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
        "green",
        "purple",
        "pink",
        "indigo",
        "amber",
      ] satisfies BadgeVariant[],
    },
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const categoricalDot: Partial<Record<BadgeVariant, string>> = {
  green: "#218c33",
  purple: "#7d3bed",
  pink: "#db2678",
  indigo: "#4f4acc",
  amber: "#d9780a",
};

const labels: Record<BadgeVariant, string> = {
  default: "Badge",
  secondary: "Secondary",
  outline: "Outline",
  destructive: "Destructive",
  ghost: "Ghost",
  link: "Link",
  green: "Green",
  purple: "Purple",
  pink: "Pink",
  indigo: "Indigo",
  amber: "Amber",
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
          <Badge.Text>{labels[v]}</Badge.Text>
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
        <Badge.Icon>
          <CheckIcon />
        </Badge.Icon>
        <Badge.Text>Verified</Badge.Text>
      </Badge>
      <Badge variant="secondary">
        <Badge.Icon>
          <BookmarkIcon />
        </Badge.Icon>
        <Badge.Text>Bookmark</Badge.Text>
      </Badge>
    </div>
  ),
};

export const WithIconInlineEnd: Story = {
  name: "With icon (inline end)",
  render: () => (
    <Badge variant="outline">
      <Badge.Text>Status</Badge.Text>
      <Badge.Icon>
        <CheckIcon />
      </Badge.Icon>
    </Badge>
  ),
};

export const WithSpinner: Story = {
  name: "With spinner",
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:gap-3">
      <Badge>
        <Badge.Icon>
          <Spinner className="ui:size-full" />
        </Badge.Icon>
        <Badge.Text>Deleting</Badge.Text>
      </Badge>
      <Badge variant="secondary">
        <Badge.Text>Generating</Badge.Text>
        <Badge.Icon>
          <Spinner className="ui:size-full" />
        </Badge.Icon>
      </Badge>
    </div>
  ),
};

export const CategoricalPills: Story = {
  name: "Categorical (event pill)",
  render: () => (
    <div className="ui:flex ui:w-full ui:max-w-md ui:flex-col ui:gap-2">
      {(
        [
          "green",
          "purple",
          "pink",
          "indigo",
          "amber",
        ] as const satisfies readonly BadgeVariant[]
      ).map((v) => (
        <Badge key={v} variant={v} className="ui:justify-start">
          <span
            aria-hidden
            className="ui:inline-block ui:h-[6px] ui:min-h-[6px] ui:min-w-[6px] ui:w-[6px] ui:shrink-0 ui:rounded-full"
            style={{ backgroundColor: categoricalDot[v] }}
          />
          <Badge.Text tone="accent">20:00</Badge.Text>
          <Badge.Text>{labels[v]}</Badge.Text>
        </Badge>
      ))}
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
        <Badge.Text>Open shadcn Badge</Badge.Text>
        <Badge.Icon>
          <ArrowUpRightIcon />
        </Badge.Icon>
      </a>
    </Badge>
  ),
};

export const Default: Story = {
  args: { children: "Badge", variant: "default" },
};
