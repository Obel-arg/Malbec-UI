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
}: Omit<ConfirmDialogProps, "open" | "onOpenChange"> & { trigger: string }) {
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
