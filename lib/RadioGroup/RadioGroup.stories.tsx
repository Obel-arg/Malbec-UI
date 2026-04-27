import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../Label/Label";
import { RadioGroup, type RadioGroupProps } from "./RadioGroup";

/**
 * Compound API: use `<RadioGroup.Item />` for the circular control (indicator is built-in)
 * and `<RadioGroup.Card />` for card-style options. Pair items with [`Label`](./?path=/docs/components-label--docs) via `htmlFor` / `id`.
 *
 * See [shadcn/ui Radio Group](https://ui.shadcn.com/docs/components/radix/radio-group) for controlled state, forms, and accessibility.
 *
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <div className="ui:flex ui:items-center ui:gap-2">
 *     <RadioGroup.Item value="a" id="a" />
 *     <Label htmlFor="a">Option A</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<RadioGroupProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const [value, setValue] = React.useState("b");
    return (
      <RadioGroup
        {...args}
        value={value}
        onValueChange={setValue}
        className="ui:gap-4"
      >
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="a" id="pg-a" />
          <Label htmlFor="pg-a">Option A</Label>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="b" id="pg-b" />
          <Label htmlFor="pg-b">Option B</Label>
        </div>
      </RadioGroup>
    );
  },
  args: {
    disabled: false,
  },
};

/** Three stacked options with the middle value selected (design reference layout). */
export const Default: Story = {
  render: function DefaultRender() {
    return (
      <RadioGroup defaultValue="comfortable" className="ui:w-[108px]">
        <div className="ui:flex ui:w-full ui:items-center ui:gap-2">
          <RadioGroup.Item value="default" id="rg-default" />
          <Label htmlFor="rg-default">Default</Label>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="comfortable" id="rg-comfortable" />
          <Label htmlFor="rg-comfortable">Comfortable</Label>
        </div>
        <div className="ui:flex ui:w-full ui:items-center ui:gap-2">
          <RadioGroup.Item value="compact" id="rg-compact" />
          <Label htmlFor="rg-compact">Compact</Label>
        </div>
      </RadioGroup>
    );
  },
};

export const WithLabels: Story = {
  render: function WithLabelsRender() {
    return (
      <RadioGroup defaultValue="one" className="ui:items-start">
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="one" id="wl-one" />
          <Label htmlFor="wl-one">Default</Label>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="two" id="wl-two" />
          <Label htmlFor="wl-two">Default</Label>
        </div>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    return (
      <RadioGroup defaultValue="a">
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="a" id="dis-a" />
          <Label htmlFor="dis-a">Available</Label>
        </div>
        <div className="ui:flex ui:items-center ui:gap-2">
          <RadioGroup.Item value="b" id="dis-b" disabled />
          <Label htmlFor="dis-b">Disabled</Label>
        </div>
      </RadioGroup>
    );
  },
};

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ui:size-6 ui:text-text-default-muted"
      aria-hidden
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

/** Card-style options: inactive border vs active primary border. */
export const Cards: Story = {
  render: function CardsRender() {
    return (
      <RadioGroup
        defaultValue="card-b"
        className="ui:w-[177px] ui:gap-3"
      >
        <RadioGroup.Card value="card-a" aria-label="Radio card label">
          <CreditCardIcon />
          <span>Radio card label</span>
        </RadioGroup.Card>
        <RadioGroup.Card value="card-b" aria-label="Radio card label">
          <CreditCardIcon />
          <span>Radio card label</span>
        </RadioGroup.Card>
      </RadioGroup>
    );
  },
};
