import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Field, type FieldProps } from "./Field";

/**
 * `Field` is a low-level, headless wrapper for label + control + description +
 * error. It does **not** depend on any form-state library — wire `invalid` and
 * the error string yourself, or use the higher-level `Form` + `Form.Field`
 * (which integrates with TanStack Form) for automatic wiring.
 *
 * ```tsx
 * <Field invalid={hasError}>
 *   <Field.Label htmlFor="title" required>Title</Field.Label>
 *   <Input id="title" />
 *   <Field.Description>Short, descriptive name.</Field.Description>
 *   <Field.Error>{errorMessage}</Field.Error>
 * </Field>
 * ```
 */
const meta = {
  title: "Components/Field",
  component: Field,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    invalid: { control: "boolean" },
  },
} satisfies Meta<FieldProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { invalid: false },
  render: (args) => (
    <div className="ui:w-80">
      <Field {...args}>
        <Field.Label required>Title</Field.Label>
        <Input placeholder="My new project" />
        <Field.Description>Short, descriptive name.</Field.Description>
        <Field.Error>Title is required.</Field.Error>
      </Field>
    </div>
  ),
};

export const NoLayoutShift: Story = {
  name: "No layout shift",
  render: () => {
    const Demo = () => {
      const [invalid, setInvalid] = useState(false);
      return (
        <div className="ui:flex ui:flex-col ui:gap-6 ui:w-80">
          <button
            type="button"
            className="ui:rounded ui:border ui:border-background-300 ui:px-2 ui:py-1 ui:text-[12px]"
            onClick={() => setInvalid((v) => !v)}
          >
            Toggle error ({invalid ? "on" : "off"})
          </button>
          <Field invalid={invalid}>
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="you@example.com" />
            <Field.Error>Please enter a valid email address.</Field.Error>
          </Field>
          <p className="ui:text-[12px] ui:text-text-default-muted">
            Note: text below stays at the same y-position.
          </p>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Group: Story = {
  render: () => (
    <Field.Group>
      <Field>
        <Field.Label required>First name</Field.Label>
        <Input placeholder="Jane" />
        <Field.Error />
      </Field>
      <Field>
        <Field.Label required>Last name</Field.Label>
        <Input placeholder="Doe" />
        <Field.Error />
      </Field>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="you@example.com" />
        <Field.Error>Email is required.</Field.Error>
      </Field>
    </Field.Group>
  ),
  parameters: { docs: { source: { type: "code" } } },
};

export const FieldsetWithLegend: Story = {
  name: "Fieldset + Legend",
  render: () => (
    <Field.Set className="ui:w-80">
      <Field.Legend>Shipping address</Field.Legend>
      <Field>
        <Field.Label required>Street</Field.Label>
        <Input placeholder="221B Baker Street" />
        <Field.Error />
      </Field>
      <Field>
        <Field.Label required>City</Field.Label>
        <Input placeholder="London" />
        <Field.Error />
      </Field>
    </Field.Set>
  ),
};
