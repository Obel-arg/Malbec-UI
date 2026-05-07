import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "../Button/Button";
import { Label } from "../Label/Label";
import { Input, type InputProps } from "./Input";

/**
 * Text input with Malbec surface tokens. Pair with [`Label`](?path=/docs/components-label) for field layouts.
 *
 * ```tsx
 * <div className="ui:w-[280px]">
 *   <Input type="email" placeholder="Email" />
 * </div>
 * ```
 */
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<InputProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: "Email",
    disabled: false,
    type: "text",
  },
  render: (args) => (
    <div className="ui:w-[280px]">
      <Input {...args} />
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div className="ui:w-[280px]">
      <Input placeholder="Email" />
    </div>
  ),
};

export const Disabled: Story = {
  name: "State · disabled",
  render: () => (
    <div className="ui:w-[280px]">
      <Input disabled placeholder="Email" />
    </div>
  ),
};

export const Invalid: Story = {
  name: "State · invalid",
  render: () => (
    <div className="ui:flex ui:w-[280px] ui:flex-col ui:gap-1.5">
      <Input aria-invalid placeholder="Email" />
      <Input aria-invalid placeholder="Search">
        <Input.Icon side="start">
          <SearchIcon className="ui:size-full" />
        </Input.Icon>
      </Input>
    </div>
  ),
};

export const File: Story = {
  name: "Type · file",
  render: () => (
    <div className="malbec-font-sans ui:group ui:flex ui:w-[280px] ui:flex-col ui:items-start ui:gap-1.5">
      <Label htmlFor="input-story-picture" weight="regular">
        Picture
      </Label>
      <Input
        className="ui:pr-0"
        id="input-story-picture"
        type="file"
        name="input-story-picture"
      />
    </div>
  ),
};

export const FileInvalid: Story = {
  name: "Type · file · invalid",
  render: () => (
    <div className="malbec-font-sans ui:group ui:flex ui:w-[280px] ui:flex-col ui:items-start ui:gap-1.5">
      <Label htmlFor="input-story-picture-invalid" weight="regular">
        Picture
      </Label>
      <Input
        aria-invalid
        className="ui:pr-0"
        id="input-story-picture-invalid"
        type="file"
        name="input-story-picture-invalid"
      />
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="malbec-font-sans ui:group ui:flex ui:w-[280px] ui:flex-col ui:gap-1.5">
      <Label htmlFor="input-story-email" weight="regular">
        Email
      </Label>
      <Input
        id="input-story-email"
        type="email"
        autoComplete="email"
        placeholder="Email"
      />
    </div>
  ),
};

export const Inline: Story = {
  name: "With label (inline row)",
  render: () => (
    <div className="malbec-font-sans ui:group ui:flex ui:w-[336px] ui:items-center ui:gap-4">
      <Label
        className="ui:flex-1"
        htmlFor="input-story-username"
        weight="regular"
      >
        Username
      </Label>
      <Input
        className="ui:w-[240px] ui:shrink-0"
        id="input-story-username"
        type="text"
        defaultValue="@peduarte"
        autoComplete="username"
      />
    </div>
  ),
};

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export const WithStartIcon: Story = {
  name: "With icon · start",
  render: () => (
    <div className="ui:w-[280px]">
      <Input placeholder="Search">
        <Input.Icon side="start">
          <SearchIcon className="ui:size-full" />
        </Input.Icon>
      </Input>
    </div>
  ),
};

export const WithEndIcon: Story = {
  name: "With icon · end",
  render: () => (
    <div className="ui:w-[280px]">
      <Input type="email" placeholder="Email">
        <Input.Icon side="end">
          <MailIcon className="ui:size-full" />
        </Input.Icon>
      </Input>
    </div>
  ),
};

export const WithBothIcons: Story = {
  name: "With icons · both sides",
  render: () => (
    <div className="ui:w-[280px]">
      <Input placeholder="Search mail">
        <Input.Icon side="start">
          <SearchIcon className="ui:size-full" />
        </Input.Icon>
        <Input.Icon side="end">
          <MailIcon className="ui:size-full" />
        </Input.Icon>
      </Input>
    </div>
  ),
};

export const WithButton: Story = {
  name: "With button",
  render: () => (
    <div className="malbec-font-sans ui:flex ui:w-[280px] ui:items-center ui:gap-1.5">
      <Input
        className="ui:w-[175px] ui:shrink-0"
        type="email"
        autoComplete="email"
        placeholder="Email"
        aria-label="Email"
      />
      <Button
        className="ui:w-[97px] ui:shrink-0"
        htmlType="button"
        size="md"
        variant="primary"
      >
        <Button.Text>Subscribe</Button.Text>
      </Button>
    </div>
  ),
};
