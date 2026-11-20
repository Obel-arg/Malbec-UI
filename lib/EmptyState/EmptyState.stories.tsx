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

export const RowInset: Story = {
  name: "Row · straight inside a frame",
  parameters: {
    docs: {
      source: {
        code: `import { EmptyState } from "@obel-arg/malbec-ui";

<div className="rounded-[10px] border border-background-300">
  <EmptyState title="Todavía no hay costos en esta bandeja." action={<a href="/costos/nuevo">Cargar uno</a>} />
</div>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[480px] ui:rounded-[10px] ui:border ui:border-solid ui:border-background-300">
      <EmptyState title="Todavía no hay costos en esta bandeja." action={<a href="#new">Cargar uno</a>} />
    </div>
  ),
};

export const GhostFramedSmall: Story = {
  name: "Ghost · framed, sm (dialogs and sheets)",
  parameters: {
    docs: {
      source: {
        code: `import { Button, EmptyState } from "@obel-arg/malbec-ui";

<EmptyState
  variant="ghost"
  framed
  size="sm"
  rows={2}
  columns={3}
  title="Todavía no hay facturas"
  action={<Button variant="outline">Cargar factura</Button>}
/>`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[420px]">
      <EmptyState
        variant="ghost"
        framed
        size="sm"
        rows={2}
        columns={3}
        title="Todavía no hay facturas"
        action={<Button variant="outline">Cargar factura</Button>}
      />
    </div>
  ),
};

export const PageInsideCard: Story = {
  name: "Page · no divider (inside a card)",
  parameters: {
    docs: {
      source: {
        code: `import { EmptyState } from "@obel-arg/malbec-ui";

<EmptyState variant="page" divider={false} title="Todavía no hay campañas" description="Conectá Meta Ads para ver la inversión del show." />`,
      },
    },
  },
  render: () => (
    <div className="ui:w-[560px] ui:rounded-xl ui:border ui:border-solid ui:border-background-300 ui:px-5">
      <EmptyState
        variant="page"
        divider={false}
        title="Todavía no hay campañas"
        description="Conectá Meta Ads para ver la inversión del show."
      />
    </div>
  ),
};
