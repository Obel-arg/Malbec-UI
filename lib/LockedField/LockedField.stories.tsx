import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "../Field/Field";
import { Input } from "../Input/Input";
import { LockedField } from "./LockedField";

/**
 * A field you can see but not edit: the same box as an `Input`, disabled, with a lock on the
 * right. Why it is fixed goes in `hint` (the lock's tooltip, also read by screen readers), not as
 * a line below.
 *
 * ```tsx
 * <LockedField
 *   id="currency"
 *   label="Moneda"
 *   value="USD"
 *   hint="La define el contrato y no se puede cambiar acá."
 * />
 * ```
 */
const meta = {
  title: "Components/LockedField",
  component: LockedField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { id: "currency", label: "Moneda", value: "USD" },
} satisfies Meta<typeof LockedField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NextToEditableFields: Story = {
  name: "Next to editable fields",
  parameters: {
    docs: {
      source: {
        code: `import { Field, Input, LockedField } from "@obel-arg/malbec-ui";

<Field>
  <Field.Label htmlFor="amount">Monto</Field.Label>
  <Input id="amount" defaultValue="12.500" />
</Field>
<LockedField
  id="currency"
  label="Moneda"
  value="USD"
  hint="La define el contrato y no se puede cambiar acá."
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:grid ui:w-[480px] ui:grid-cols-2 ui:gap-4">
      <Field>
        <Field.Label htmlFor="amount">Monto</Field.Label>
        <Input id="amount" defaultValue="12.500" />
      </Field>
      <LockedField
        id="currency"
        label="Moneda"
        value="USD"
        hint="La define el contrato y no se puede cambiar acá."
      />
    </div>
  ),
};
