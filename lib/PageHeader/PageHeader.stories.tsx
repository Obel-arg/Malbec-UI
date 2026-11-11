import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { PageHeader } from "./PageHeader";

/**
 * The title row of a page: ink `h1`, the scope chip on the same line, one sentence below and the
 * main action on the right of the title row.
 *
 * ```tsx
 * <PageHeader
 *   title="Usuarios"
 *   titleAddon={<Badge variant="neutral">Todos los sellos</Badge>}
 *   description="Quién entra a Malbec y qué puede ver."
 *   actions={<Button size="md">…</Button>}
 * />
 * ```
 */
const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { title: "Usuarios" },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Badge, Button, PageHeader } from "@obel-arg/malbec-ui";
import { Plus } from "lucide-react";

<PageHeader
  title="Usuarios"
  titleAddon={<Badge variant="neutral">Todos los sellos</Badge>}
  description="Quién entra a Malbec y qué puede ver."
  actions={
    <Button size="md">
      <Button.Icon><Plus /></Button.Icon>
      <Button.Text>Agregar usuario</Button.Text>
    </Button>
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[960px] ui:max-w-full">
      <PageHeader
        title="Usuarios"
        titleAddon={<Badge variant="neutral">Todos los sellos</Badge>}
        description="Quién entra a Malbec y qué puede ver."
        actions={
          <Button size="md">
            <Button.Icon>
              <Plus />
            </Button.Icon>
            <Button.Text>Agregar usuario</Button.Text>
          </Button>
        }
      />
    </div>
  ),
};
