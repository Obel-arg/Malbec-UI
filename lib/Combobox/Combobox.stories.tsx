import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox, type ComboboxProps } from "./Combobox";

const frameworks = [
  "Next.js",
  "Svelte.js",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

/**
 * Composed API (like `Button`): `<Combobox.Input>`, `<Combobox.Content>`, etc.
 * Registry-style flat names (`ComboboxInput`, …) are also exported from the module.
 *
 * See [shadcn/ui Combobox](https://ui.shadcn.com/docs/components/radix/combobox) for the upstream interaction model.
 * This library implements the popover surface with **Radix** (`@radix-ui/react-popover`).
 */
const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    autoHighlight: { control: "boolean" },
    multiple: { control: "boolean" },
    mode: { control: "select", options: ["inline", "trigger"] },
  },
  args: {
    items: [...frameworks],
    disabled: false,
    autoHighlight: false,
    multiple: false,
    mode: "inline",
  },
} satisfies Meta<ComboboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Combobox {...args} className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const WithClear: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox items={[...frameworks]} defaultValue="Next.js" className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" showClear />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const Disabled: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox items={[...frameworks]} disabled className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const Invalid: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox items={[...frameworks]} className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" aria-invalid />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const AutoHighlight: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox items={[...frameworks]} autoHighlight className="ui:w-[200px]">
      <Combobox.Input placeholder="Select a framework" />
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const MultipleWithChips: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox
      multiple
      autoHighlight
      items={[...frameworks]}
      defaultValue={["Next.js"]}
      className="ui:w-[min(320px,100%)]"
    >
      <Combobox.Chips className="ui:max-w-xs">
        <Combobox.Value>
          {(values: unknown[]) => (
            <>
              {values.map((item) => (
                <Combobox.Chip key={String(item)} value={item}>
                  {String(item)}
                </Combobox.Chip>
              ))}
              <Combobox.ChipsInput placeholder="Add framework" />
            </>
          )}
        </Combobox.Value>
      </Combobox.Chips>
      <Combobox.Content>
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};

export const TriggerWithSearchField: Story = {
  args: { items: [...frameworks] },
  render: () => (
    <Combobox mode="trigger" items={[...frameworks]} className="ui:w-[200px]">
      <Combobox.Trigger placeholder="Select framework…" />
      <Combobox.Content>
        <Combobox.Input
          filterPlacement="content"
          placeholder="Search framework…"
          showTrigger={false}
        />
        <Combobox.Empty>No items found.</Combobox.Empty>
        <Combobox.List>
          {(item) => (
            <Combobox.Item key={String(item)} value={item}>
              {String(item)}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  ),
};
