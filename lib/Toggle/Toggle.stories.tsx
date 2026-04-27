import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Toggle, type ToggleProps } from "./Toggle";

function BoldIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
      <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
    </svg>
  );
}

function ItalicIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

function UnderlineIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );
}

/**
 * `Toggle` is a two-state button. Compose icon content with `<Toggle.Icon>`.
 * Pair with a visible label or `aria-label` when the control is icon-only.
 *
 * ```tsx
 * <Toggle aria-label="Bold" size="md" variant="default">
 *   <Toggle.Icon>…</Toggle.Icon>
 * </Toggle>
 * ```
 */
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = "ui:inline-flex ui:items-center ui:gap-1";

export const Default: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle aria-label="Bold" size="md" variant="default">
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Italic" size="md" variant="default">
        <Toggle.Icon>
          <ItalicIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Underline" size="md" variant="default">
        <Toggle.Icon>
          <UnderlineIcon />
        </Toggle.Icon>
      </Toggle>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle aria-label="Bold" size="md" variant="outline">
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Italic" size="md" variant="outline">
        <Toggle.Icon>
          <ItalicIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Underline" size="md" variant="outline">
        <Toggle.Icon>
          <UnderlineIcon />
        </Toggle.Icon>
      </Toggle>
    </div>
  ),
};

export const Small: Story = {
  name: "Size · Small",
  render: () => (
    <div className={rowClass}>
      <Toggle aria-label="Bold" size="sm" variant="default">
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Italic" size="sm" variant="default">
        <Toggle.Icon>
          <ItalicIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Underline" size="sm" variant="default">
        <Toggle.Icon>
          <UnderlineIcon />
        </Toggle.Icon>
      </Toggle>
    </div>
  ),
};

export const Large: Story = {
  name: "Size · Large",
  render: () => (
    <div className={rowClass}>
      <Toggle aria-label="Bold" size="lg" variant="default">
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Italic" size="lg" variant="default">
        <Toggle.Icon>
          <ItalicIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Underline" size="lg" variant="default">
        <Toggle.Icon>
          <UnderlineIcon />
        </Toggle.Icon>
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle aria-label="Bold" size="md" variant="outline" disabled>
        <Toggle.Icon>
          <BoldIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Italic" size="md" variant="outline" disabled>
        <Toggle.Icon>
          <ItalicIcon />
        </Toggle.Icon>
      </Toggle>
      <Toggle aria-label="Underline" size="md" variant="outline" disabled>
        <Toggle.Icon>
          <UnderlineIcon />
        </Toggle.Icon>
      </Toggle>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    "aria-label": "Bold",
    variant: "default" satisfies ToggleProps["variant"],
    size: "md" satisfies ToggleProps["size"],
    disabled: false,
  },
  render: (args) => (
    <Toggle {...args}>
      <Toggle.Icon>
        <BoldIcon />
      </Toggle.Icon>
    </Toggle>
  ),
};
