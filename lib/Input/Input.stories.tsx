import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Label } from "../Label/Label";
import { Input, type InputProps } from "./Input";

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
