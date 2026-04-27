import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ToggleGroup } from "./ToggleGroup";

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

const iconBox =
  "ui:inline-flex ui:shrink-0 ui:size-4 ui:items-center ui:justify-center";

/**
 * `ToggleGroup` uses a compound API: `ToggleGroup.Item` for each option.
 * Pass `type="single"` or `type="multiple"` per your selection model.
 *
 * ```tsx
 * <ToggleGroup type="single" value={value} onValueChange={setValue} aria-label="Text formatting">
 *   <ToggleGroup.Item value="bold" aria-label="Bold">…</ToggleGroup.Item>
 * </ToggleGroup>
 * ```
 */
const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: "single" as const },
  render: () => (
    <ToggleGroup type="single" aria-label="Text formatting" size="md" variant="default">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <span className={iconBox}>
          <BoldIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <span className={iconBox}>
          <ItalicIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={iconBox}>
          <UnderlineIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  args: { type: "single" as const },
  render: () => (
    <ToggleGroup
      type="single"
      aria-label="Text formatting"
      size="md"
      variant="outline"
    >
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <span className={iconBox}>
          <BoldIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <span className={iconBox}>
          <ItalicIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={iconBox}>
          <UnderlineIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Small: Story = {
  name: "Size · Small",
  args: { type: "single" as const },
  render: () => (
    <ToggleGroup
      type="single"
      aria-label="Text formatting"
      size="sm"
      variant="default"
    >
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <span className={iconBox}>
          <BoldIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <span className={iconBox}>
          <ItalicIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={iconBox}>
          <UnderlineIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Large: Story = {
  name: "Size · Large",
  args: { type: "single" as const },
  render: () => (
    <ToggleGroup
      type="single"
      aria-label="Text formatting"
      size="lg"
      variant="default"
    >
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <span className={iconBox}>
          <BoldIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <span className={iconBox}>
          <ItalicIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={iconBox}>
          <UnderlineIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { type: "single" as const },
  render: () => (
    <ToggleGroup
      type="single"
      aria-label="Text formatting"
      size="md"
      variant="outline"
      disabled
    >
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <span className={iconBox}>
          <BoldIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <span className={iconBox}>
          <ItalicIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={iconBox}>
          <UnderlineIcon className="ui:size-full" />
        </span>
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};
