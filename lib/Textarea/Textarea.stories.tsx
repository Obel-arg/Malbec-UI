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

const statesGrid =
  "malbec-font-sans ui:grid ui:grid-cols-[auto_320px] ui:items-center ui:gap-x-6 ui:gap-y-4";
const stateCaption = "ui:text-muted-medium ui:text-text-default-muted";

export const States: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      source: {
        code: `import { Textarea } from "@obel-arg/malbec-ui";

<Textarea placeholder="Tell us a bit about you…" />

<Textarea disabled placeholder="Tell us a bit about you…" />

<Textarea aria-invalid placeholder="Tell us a bit about you…" />`,
      },
    },
  },
  render: () => (
    <div className={statesGrid}>
      <span className={stateCaption}>Default</span>
      <Textarea aria-label="Default" placeholder="Tell us a bit about you…" />
      <span className={stateCaption}>Disabled</span>
      <Textarea
        aria-label="Disabled"
        disabled
        placeholder="Tell us a bit about you…"
      />
      <span className={stateCaption}>Invalid</span>
      <Textarea
        aria-label="Invalid"
        aria-invalid
        placeholder="Tell us a bit about you…"
      />
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
  parameters: {
    docs: {
      source: {
        code: `import { Label, Textarea } from "@obel-arg/malbec-ui";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio" weight="regular">
    Bio
  </Label>
  <Textarea id="bio" name="bio" placeholder="Tell us a bit about you…" />
</div>`,
      },
    },
  },
};
