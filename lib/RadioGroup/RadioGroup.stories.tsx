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

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_auto] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

export const States: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { RadioGroup } from "@obel-arg/malbec-ui";

<RadioGroup defaultValue="checked" className="flex-row">
  <RadioGroup.Item value="unchecked" aria-label="Unchecked" />
  <RadioGroup.Item value="checked" aria-label="Checked" />
</RadioGroup>

<RadioGroup defaultValue="checked" disabled className="flex-row">
  <RadioGroup.Item value="unchecked" aria-label="Unchecked" />
  <RadioGroup.Item value="checked" aria-label="Checked" />
</RadioGroup>

// Mark items with aria-invalid to show the error state.
<RadioGroup className="flex-row">
  <RadioGroup.Item aria-invalid value="one" aria-label="Option one" />
  <RadioGroup.Item aria-invalid value="two" aria-label="Option two" />
</RadioGroup>`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      <span className={stateCaption}>Default</span>
      <RadioGroup defaultValue="checked" className="ui:flex-row">
        <RadioGroup.Item value="unchecked" aria-label="Unchecked" />
        <RadioGroup.Item value="checked" aria-label="Checked" />
      </RadioGroup>
      <span className={stateCaption}>Disabled</span>
      <RadioGroup defaultValue="checked" disabled className="ui:flex-row">
        <RadioGroup.Item value="unchecked" aria-label="Unchecked" />
        <RadioGroup.Item value="checked" aria-label="Checked" />
      </RadioGroup>
      <span className={stateCaption}>Invalid</span>
      <RadioGroup className="ui:flex-row">
        <RadioGroup.Item aria-invalid value="one" aria-label="Option one" />
        <RadioGroup.Item aria-invalid value="two" aria-label="Option two" />
      </RadioGroup>
    </div>
  ),
};

export const WithLabels: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label, RadioGroup } from "@obel-arg/malbec-ui";

<RadioGroup defaultValue="one" className="items-start">
  <div className="flex items-center gap-2">
    <RadioGroup.Item value="one" id="wl-one" />
    <Label htmlFor="wl-one">Option one</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroup.Item value="two" id="wl-two" />
    <Label htmlFor="wl-two">Option two</Label>
  </div>
</RadioGroup>`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import { RadioGroup } from "@obel-arg/malbec-ui";

// Use RadioGroup.Card for card-style options (active shows a primary border).
<RadioGroup defaultValue="card-b" className="w-[177px] gap-3">
  <RadioGroup.Card value="card-a" aria-label="Radio card label">
    <CreditCardIcon /> {/* your icon */}
    <span>Radio card label</span>
  </RadioGroup.Card>
  <RadioGroup.Card value="card-b" aria-label="Radio card label">
    <CreditCardIcon /> {/* your icon */}
    <span>Radio card label</span>
  </RadioGroup.Card>
</RadioGroup>`,
      },
    },
  },
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
