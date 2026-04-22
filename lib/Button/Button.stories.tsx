import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment } from "react";
import {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from "./Button";

/**
 * `Button` ships as a compound/composition component. You compose the inner
 * pieces yourself:
 *
 * ```tsx
 * <Button variant="primary">
 *   <Button.Icon><MailIcon /></Button.Icon>
 *   <Button.Text>Send email</Button.Text>
 * </Button>
 * ```
 *
 * Use the **Theme** and **Scheme** toolbars (top bar) to preview every product
 * palette and light/dark scheme without separate stories.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "outline",
        "destructive",
        "link",
      ] satisfies ButtonVariant[],
      description: "Visual style of the button.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"] satisfies ButtonSize[],
      description:
        "Small (10px text), Medium (default, 12px), Large (12px with roomier padding) or Icon-only square.",
    },
    loading: {
      control: "boolean",
      description:
        "Disables the button and swaps `<Button.Icon>` for `<Button.Spinner>`.",
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },
  /**
   * `typeof Button` is a compound (Icon/Text/Spinner), so Storybook can omit DOM args like
   * `disabled` from the inferred `Args` — and `{...args}` would never get them. `Meta<ButtonProps>`
   * keeps the root’s props in sync so `disabled` (and the rest) reach the component.
   */
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const Playground: Story = {
  render: (args) => (
    <Button {...args}>
      <Button.Spinner />
      <Button.Icon>
        <MailIcon />
      </Button.Icon>
      <Button.Text>Login with Email</Button.Text>
    </Button>
  ),
};

export const TextOnly: Story = {
  name: "Composition · Text only",
  render: (args) => (
    <Button {...args}>
      <Button.Text>Button</Button.Text>
    </Button>
  ),
};

export const WithIcon: Story = {
  name: "Composition · Icon + Text",
  render: (args) => (
    <Button {...args}>
      <Button.Icon>
        <MailIcon />
      </Button.Icon>
      <Button.Text>Login with Email</Button.Text>
    </Button>
  ),
};

export const IconTrailing: Story = {
  name: "Composition · Text + trailing icon",
  render: (args) => (
    <Button {...args}>
      <Button.Text>Continue</Button.Text>
      <Button.Icon>
        <ChevronRightIcon />
      </Button.Icon>
    </Button>
  ),
};

export const IconOnly: Story = {
  name: "Composition · Icon only",
  args: { size: "icon" },
  render: (args) => (
    <Button aria-label="Next" {...args}>
      <Button.Icon decorative={false}>
        <ChevronRightIcon />
      </Button.Icon>
    </Button>
  ),
};

export const Loading: Story = {
  name: "State · Loading",
  args: { loading: true },
  render: (args) => (
    <Button {...args}>
      <Button.Spinner />
      <Button.Icon>
        <MailIcon />
      </Button.Icon>
      <Button.Text>Please wait</Button.Text>
    </Button>
  ),
};

export const Disabled: Story = {
  name: "State · Disabled",
  args: { disabled: true },
  render: (args) => (
    <Button {...args}>
      <Button.Icon>
        <MailIcon />
      </Button.Icon>
      <Button.Text>Disabled</Button.Text>
    </Button>
  ),
};

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "outline",
  "destructive",
  "link",
];

export const AllVariants: Story = {
  name: "Matrix · Variants",
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <div className="malbec-font-sans ui:grid ui:grid-cols-[auto_1fr] ui:gap-x-6 ui:gap-y-4 ui:items-center">
      {VARIANTS.map((variant) => (
        <Fragment key={variant}>
          <span className="ui:text-muted-medium ui:text-text-default-muted ui:capitalize">
            {variant}
          </span>
          <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
            <Button variant={variant}>
              <Button.Text>Button</Button.Text>
            </Button>
            <Button variant={variant}>
              <Button.Icon>
                <MailIcon />
              </Button.Icon>
              <Button.Text>Login with Email</Button.Text>
            </Button>
            <Button variant={variant} loading>
              <Button.Spinner />
              <Button.Text>Please wait</Button.Text>
            </Button>
          </div>
        </Fragment>
      ))}
    </div>
  ),
};

const SIZES: ButtonSize[] = ["sm", "md", "lg"];

export const AllSizes: Story = {
  name: "Matrix · Sizes",
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <div className="malbec-font-sans ui:flex ui:flex-col ui:gap-5">
      <div className="ui:flex ui:items-end ui:gap-3">
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            <Button.Text>Size {size}</Button.Text>
          </Button>
        ))}
        <Button size="icon" aria-label="Next">
          <Button.Icon decorative={false}>
            <ChevronRightIcon />
          </Button.Icon>
        </Button>
      </div>
      <div className="ui:flex ui:items-end ui:gap-3">
        {SIZES.map((size) => (
          <Button key={size} size={size} variant="outline">
            <Button.Icon>
              <MailIcon />
            </Button.Icon>
            <Button.Text>Size {size}</Button.Text>
          </Button>
        ))}
        <Button size="icon" variant="outline" aria-label="Next">
          <Button.Icon decorative={false}>
            <ChevronRightIcon />
          </Button.Icon>
        </Button>
      </div>
    </div>
  ),
};
