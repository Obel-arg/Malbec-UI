import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../Label/Label";
import { Textarea, type TextareaProps } from "./Textarea";

/**
 * Multi-line text field that mirrors the {@link Input} surface tokens. Pair
 * with [`Label`](?path=/docs/components-label) for field layouts, or with
 * [`Field`](?path=/docs/components-field) for full label + error wiring.
 *
 * ```tsx
 * <div className="ui:w-[280px]">
 *   <Textarea placeholder="Tell us a bit about you…" />
 * </div>
 * ```
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 20 } },
  },
} satisfies Meta<TextareaProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: "Tell us a bit about you…",
    disabled: false,
    rows: 4,
  },
  render: (args) => (
    <div className="ui:w-[320px]">
      <Textarea {...args} />
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div className="ui:w-[320px]">
      <Textarea placeholder="Tell us a bit about you…" />
    </div>
  ),
};

export const Disabled: Story = {
  name: "State · disabled",
  render: () => (
    <div className="ui:w-[320px]">
      <Textarea disabled placeholder="Tell us a bit about you…" />
    </div>
  ),
};

export const Invalid: Story = {
  name: "State · invalid",
  render: () => (
    <div className="ui:w-[320px]">
      <Textarea aria-invalid placeholder="Tell us a bit about you…" />
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="malbec-font-sans ui:flex ui:w-[320px] ui:flex-col ui:gap-1.5">
      <Label htmlFor="textarea-story-bio" weight="regular">
        Bio
      </Label>
      <Textarea
        id="textarea-story-bio"
        name="bio"
        placeholder="Tell us a bit about you…"
      />
    </div>
  ),
};
