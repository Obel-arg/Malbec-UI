import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Button } from "../Button/Button";
import { DataTable } from "../DataTable/DataTable";
import { EmptyState } from "./EmptyState";

/**
 * The empty state of a list, a table or a screen, in three forms, from quietest to most present:
 *
 * - **`row`** (default): one line inside the table, the action as a link. The table keeps its
 *   header, search and columns. A plain `emptyLabel` on `DataTable` already renders this way.
 * - **`ghost`**: faded placeholder rows with the text and action on top, the shape of what will
 *   arrive without inventing data.
 * - **`page`**: a whole screen with nothing yet, left-aligned with the actions on the right.
 *
 * While the action lives in the empty state, don't repeat it in the toolbar above.
 *
 * ```tsx
 * <DataTable
 *   columns={columns}
 *   data={[]}
 *   emptyLabel={
 *     <EmptyState title="Todavía no hay proveedores." action={<a href="/proveedores/nuevo">Agregar el primero</a>} />
 *   }
 * />
 * ```
 */
const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: { title: "Todavía no hay proveedores" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

type Vendor = { id: string; name: string; cuit: string; category: string; balance: string };
const columns: ColumnDef<Vendor>[] = [
  { accessorKey: "name", header: "Proveedor" },
  { accessorKey: "cuit", header: "CUIT" },
  { accessorKey: "category", header: "Categoría" },
  { accessorKey: "balance", header: "Saldo" },
];

export const Row: Story = {
  name: "Row (inside a table)",
  parameters: {
    docs: {
      source: {
        code: `import { DataTable, EmptyState } from "@obel-arg/malbec-ui";

<DataTable
  columns={columns}
  data={[]}
  emptyLabel={
    <EmptyState
      title="Todavía no hay proveedores."
      action={<a href="/proveedores/nuevo">Agregar el primero</a>}
    />
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[680px]">
      <DataTable<Vendor, unknown>
        columns={columns}
        data={[]}
        emptyLabel={
          <EmptyState
            title="Todavía no hay proveedores."
            action={<a href="#nuevo">Agregar el primero</a>}
          />
        }
      />
    </div>
  ),
};

export const Ghost: Story = {
  name: "Ghost rows",
  parameters: {
    docs: {
      source: {
        code: `import { Button, DataTable, EmptyState } from "@obel-arg/malbec-ui";

<DataTable
  columns={columns}
  data={[]}
  emptyLabel={
    <EmptyState
      variant="ghost"
      columns={4}
      title="Todavía no hay proveedores"
      description="Cargá el primero para poder asignarle costos."
      action={
        <Button variant="outline">
          <Button.Icon><Plus /></Button.Icon>
          <Button.Text>Agregar proveedor</Button.Text>
        </Button>
      }
    />
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[680px]">
      <DataTable<Vendor, unknown>
        columns={columns}
        data={[]}
        emptyLabel={
          <EmptyState
            variant="ghost"
            columns={4}
            title="Todavía no hay proveedores"
            description="Cargá el primero para poder asignarle costos."
            action={
              <Button variant="outline">
                <Button.Icon>
                  <Plus />
                </Button.Icon>
                <Button.Text>Agregar proveedor</Button.Text>
              </Button>
            }
          />
        }
      />
    </div>
  ),
};

export const Page: Story = {
  name: "Page (nothing yet)",
  parameters: {
    docs: {
      source: {
        code: `import { Button, EmptyState } from "@obel-arg/malbec-ui";

<EmptyState
  variant="page"
  title="Todavía no hay proveedores"
  description="Cargá el primero para poder asignarle costos. También podés importarlos desde un Excel."
  action={
    <>
      <Button variant="outline"><Button.Text>Importar</Button.Text></Button>
      <Button>
        <Button.Icon><Plus /></Button.Icon>
        <Button.Text>Agregar proveedor</Button.Text>
      </Button>
    </>
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[680px]">
      <EmptyState
        variant="page"
        title="Todavía no hay proveedores"
        description="Cargá el primero para poder asignarle costos. También podés importarlos desde un Excel."
        action={
          <>
            <Button variant="outline">
              <Button.Text>Importar</Button.Text>
            </Button>
            <Button>
              <Button.Icon>
                <Plus />
              </Button.Icon>
              <Button.Text>Agregar proveedor</Button.Text>
            </Button>
          </>
        }
      />
    </div>
  ),
};
