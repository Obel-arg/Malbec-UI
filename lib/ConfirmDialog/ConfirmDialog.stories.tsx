import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";

/**
 * A confirmation on top of `AlertDialog`. An async `onConfirm` keeps the dialog open with both
 * buttons disabled until it settles; `requireReason` asks for the reason first (rejections).
 *
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="¿Eliminar el costo?"
 *   description="No se puede deshacer."
 *   tone="destructive"
 *   confirmLabel="Eliminar"
 *   onConfirm={() => deleteCost(id)}
 * />
 * ```
 */
const meta = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const wait = () => new Promise<void>((r) => setTimeout(r, 1200));

function Demo({
  trigger,
  ...props
}: Omit<ConfirmDialogProps, "open" | "onOpenChange" | "trigger"> & { trigger: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <ConfirmDialog open={open} onOpenChange={setOpen} {...props} />
    </>
  );
}

const demoArgs = { open: false, onOpenChange: () => {}, title: "", onConfirm: () => {} };

export const Destructive: Story = {
  args: demoArgs,
  parameters: {
    docs: {
      source: {
        code: `import { ConfirmDialog } from "@obel-arg/malbec-ui";

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="¿Eliminar el costo?"
  description="Se quita del P&L del show. No se puede deshacer."
  tone="destructive"
  confirmLabel="Eliminar"
  onConfirm={() => deleteCost(costId)}
/>`,
      },
    },
  },
  render: () => (
    <Demo
      trigger="Eliminar costo"
      title="¿Eliminar el costo?"
      description="Se quita del P&L del show. No se puede deshacer."
      tone="destructive"
      confirmLabel="Eliminar"
      onConfirm={wait}
    />
  ),
};

export const RequireReason: Story = {
  name: "With a required reason",
  args: demoArgs,
  parameters: {
    docs: {
      source: {
        code: `import { ConfirmDialog } from "@obel-arg/malbec-ui";

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Rechazar la factura"
  description="El proveedor recibe el motivo por mail."
  tone="destructive"
  requireReason
  reasonPlaceholder="Qué tiene que corregir"
  confirmLabel="Rechazar"
  onConfirm={(reason) => rejectInvoice(invoiceId, reason)}
/>`,
      },
    },
  },
  render: () => (
    <Demo
      trigger="Rechazar factura"
      title="Rechazar la factura"
      description="El proveedor recibe el motivo por mail."
      tone="destructive"
      requireReason
      reasonPlaceholder="Qué tiene que corregir"
      confirmLabel="Rechazar"
      onConfirm={wait}
    />
  ),
};

export const WithTrigger: Story = {
  name: "Trigger, compact size and its own pending text",
  args: demoArgs,
  parameters: {
    docs: {
      source: {
        code: `import { Button, ConfirmDialog } from "@obel-arg/malbec-ui";

<ConfirmDialog
  trigger={<Button variant="outline">Mover show</Button>}
  size="sm"
  title="¿Mover el show al 14/11?"
  confirmLabel="Mover"
  confirmingLabel="Moviendo…"
  onConfirm={() => moveShow(showId)}
/>`,
      },
    },
  },
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="outline">Mover show</Button>}
      size="sm"
      title="¿Mover el show al 14/11?"
      confirmLabel="Mover"
      confirmingLabel="Moviendo…"
      onConfirm={wait}
    />
  ),
};

export const ReasonWithLimits: Story = {
  name: "Reason with a hint and a length limit",
  args: demoArgs,
  parameters: {
    docs: {
      source: {
        code: `import { Button, ConfirmDialog } from "@obel-arg/malbec-ui";

<ConfirmDialog
  trigger={<Button variant="outline">Rechazar costo</Button>}
  title="Rechazar el costo"
  tone="destructive"
  requireReason
  reasonHint="Lo ve quien cargó el costo. Hasta 280 caracteres."
  reasonProps={{ maxLength: 280, rows: 3, autoFocus: true }}
  confirmLabel="Rechazar"
  confirmingLabel="Rechazando…"
  onConfirm={async (reason) => (await rejectCost(costId, reason)).ok}
/>`,
      },
    },
  },
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="outline">Rechazar costo</Button>}
      title="Rechazar el costo"
      tone="destructive"
      requireReason
      reasonHint="Lo ve quien cargó el costo. Hasta 280 caracteres."
      reasonProps={{ maxLength: 280, rows: 3, autoFocus: true }}
      confirmLabel="Rechazar"
      confirmingLabel="Rechazando…"
      onConfirm={wait}
    />
  ),
};

export const WithContentAndMinimum: Story = {
  name: "Content and a minimum reason",
  args: demoArgs,
  parameters: {
    docs: {
      source: {
        code: `import { Button, ConfirmDialog } from "@obel-arg/malbec-ui";

<ConfirmDialog
  trigger={<Button variant="outline">Eliminar costo</Button>}
  title="Eliminar el costo"
  description="Se quita del P&L del show."
  tone="destructive"
  requireReason
  reasonMinLength={10}
  confirmLabel="Eliminar"
  confirmingLabel="Eliminando…"
  onConfirm={(reason) => deleteCost(costId, reason)}
>
  <p className="m-0 text-sm text-text-default">Está vinculado a 2 tareas del Gantt.</p>
</ConfirmDialog>`,
      },
    },
  },
  render: () => (
    <ConfirmDialog
      trigger={<Button variant="outline">Eliminar costo</Button>}
      title="Eliminar el costo"
      description="Se quita del P&L del show."
      tone="destructive"
      requireReason
      reasonMinLength={10}
      confirmLabel="Eliminar"
      confirmingLabel="Eliminando…"
      onConfirm={wait}
    >
      <p className="ui:m-0 ui:text-sm ui:text-text-default">Está vinculado a 2 tareas del Gantt.</p>
    </ConfirmDialog>
  ),
};
