import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge, type StatusBadgeProps } from "./StatusBadge";
import { priorityVariant } from "./status-tone";
import { Badge } from "./Badge";

/**
 * `Badge` whose colour comes from the canonical status map — the single source
 * of truth for the whole Malbec suite. Pass the product's status string; the
 * colour is chosen for you (accent/case-insensitive). Unknown statuses fall
 * back to `secondary` (gray), overridable per call via `fallback`.
 *
 * ```tsx
 * <StatusBadge status="Aprobado" />
 * // enum status + translated label: pass the tone, the colour no longer depends on the text
 * <StatusBadge tone="green">{t("status.APPROVED")}</StatusBadge>
 * ```
 */
const meta = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  // Default for the required `status` prop, so render-only stories type-check.
  args: { status: "Aprobado" },
  argTypes: {
    status: { control: "text" },
    tone: { control: "select", options: ["gray", "yellow", "blue", "orange", "green", "red"] },
    fallback: { control: "text" },
  },
} satisfies Meta<StatusBadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/** One representative status per tone. */
const byTone: { tone: string; status: string }[] = [
  { tone: "gray", status: "Borrador" },
  { tone: "yellow", status: "En revisión" },
  { tone: "blue", status: "En progreso" },
  { tone: "orange", status: "Demorado" },
  { tone: "green", status: "Aprobado" },
  { tone: "red", status: "Cancelado" },
];

export const Playground: Story = {
  args: { status: "Aprobado" },
};

export const ByTone: Story = {
  name: "All tones",
  render: () => (
    <div className="ui:flex ui:flex-col ui:items-start ui:gap-2">
      {byTone.map(({ status }) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { StatusBadge } from "@obel-arg/malbec-ui";

<StatusBadge status="Borrador" />     {/* gray   */}
<StatusBadge status="En revisión" />  {/* yellow */}
<StatusBadge status="En progreso" />  {/* blue   */}
<StatusBadge status="Demorado" />     {/* orange */}
<StatusBadge status="Aprobado" />     {/* green  */}
<StatusBadge status="Cancelado" />    {/* red    */}`,
      },
    },
  },
};

export const ExplicitTone: Story = {
  name: "Explicit tone (translated label)",
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-3">
      <StatusBadge tone="green">Approved</StatusBadge>
      <StatusBadge tone="green">Aprobado</StatusBadge>
      <StatusBadge tone="orange">Delayed</StatusBadge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { StatusBadge } from "@obel-arg/malbec-ui";

// The product maps its enum to a tone once; the label comes from i18n.
const TONE = { APPROVED: "green", DELAYED: "orange" } as const;

<StatusBadge tone={TONE[status]}>{t(\`status.\${status}\`)}</StatusBadge>`,
      },
    },
  },
};

export const UnknownStatus: Story = {
  name: "Unknown status (fallback)",
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-3">
      <StatusBadge status="Algo nuevo" />
      <StatusBadge status="Algo nuevo" fallback="outline" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { StatusBadge } from "@obel-arg/malbec-ui";

// Not in the catalog → secondary (gray) by default
<StatusBadge status="Algo nuevo" />
// …or override per call site
<StatusBadge status="Algo nuevo" fallback="outline" />`,
      },
    },
  },
};

export const Priority: Story = {
  name: "Priority",
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-3">
      {(["Alta", "Media", "Baja"] as const).map((p) => (
        <Badge key={p} variant={priorityVariant(p)}>
          <Badge.Text>{p}</Badge.Text>
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Badge, priorityVariant } from "@obel-arg/malbec-ui";

<Badge variant={priorityVariant("Alta")}>
  <Badge.Text>Alta</Badge.Text>
</Badge>
// Media → orange, Baja → yellow`,
      },
    },
  },
};
