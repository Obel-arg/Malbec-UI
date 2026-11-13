import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { CalendarDays, Check, CircleDollarSign, CreditCard, FileText, Inbox, Plus, Truck, User } from "lucide-react";
import { Button } from "../Button/Button";
import { Command, type CommandProps } from "./Command";

/**
 * Command palette, version C of the Command workshop: Linear's structure (context chip, a large
 * input without a box, light group headings) with Resend's boxed keys and keyboard footer.
 * 600px, 36px rows, 16px input, 12px radius. Empty, footer and "then" texts come from
 * `MalbecLabelsProvider`.
 *
 * ```tsx
 * <Command.Dialog open={open} onOpenChange={setOpen} label="Comandos">
 *   <Command.Context><CalendarDays /> Show · Rosario · Metropolitano</Command.Context>
 *   <Command.Input placeholder="Escribí un comando o buscá…" />
 *   <Command.List>
 *     <Command.Empty />
 *     <Command.Group heading="Acciones">
 *       <Command.Item><Plus /> Crear show <Command.Shortcut keys={["C"]} /></Command.Item>
 *     </Command.Group>
 *   </Command.List>
 *   <Command.Footer />
 * </Command.Dialog>
 * ```
 */
const meta = {
  title: "Components/Command",
  component: Command,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<CommandProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const PALETTE_CODE = `import { CalendarDays, Check, CircleDollarSign, CreditCard, FileText, Inbox, Plus, Truck, User } from "lucide-react";
import { Command } from "@obel-arg/malbec-ui";

<Command label="Comandos">
  <Command.Context>
    <CalendarDays /> Show · Rosario · Metropolitano
  </Command.Context>
  <Command.Input placeholder="Escribí un comando o buscá…" />
  <Command.List>
    <Command.Empty />
    <Command.Group heading="Acciones">
      <Command.Item><Plus /> Crear show <Command.Shortcut keys={["C"]} /></Command.Item>
      <Command.Item><CircleDollarSign /> Cargar costo <Command.Shortcut keys={["⇧", "C"]} /></Command.Item>
      <Command.Item><Check /> Aprobar costos <Command.Shortcut keys={["A"]} /></Command.Item>
      <Command.Item disabled><FileText /> Generar liquidación</Command.Item>
    </Command.Group>
    <Command.Group heading="Ir a">
      <Command.Item><CalendarDays /> Shows <Command.Shortcut keys={["G", "S"]} sequence /></Command.Item>
      <Command.Item><Truck /> Proveedores <Command.Shortcut keys={["G", "P"]} sequence /></Command.Item>
      <Command.Item><Inbox /> Aprobaciones <Command.Shortcut keys={["G", "A"]} sequence /></Command.Item>
    </Command.Group>
    <Command.Group heading="Configuración">
      <Command.Item><User /> Perfil</Command.Item>
      <Command.Item><CreditCard /> Facturación</Command.Item>
    </Command.Group>
  </Command.List>
  <Command.Footer />
</Command>`;

function PaletteBody({ onSelect }: { onSelect?: () => void }) {
  return (
    <>
      <Command.Context>
        <CalendarDays /> Show · Rosario · Metropolitano
      </Command.Context>
      <Command.Input placeholder="Escribí un comando o buscá…" />
      <Command.List>
        <Command.Empty />
        <Command.Group heading="Acciones">
          <Command.Item onSelect={onSelect}>
            <Plus /> Crear show <Command.Shortcut keys={["C"]} />
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <CircleDollarSign /> Cargar costo <Command.Shortcut keys={["⇧", "C"]} />
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <Check /> Aprobar costos <Command.Shortcut keys={["A"]} />
          </Command.Item>
          <Command.Item disabled>
            <FileText /> Generar liquidación
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Ir a">
          <Command.Item onSelect={onSelect}>
            <CalendarDays /> Shows <Command.Shortcut keys={["G", "S"]} sequence />
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <Truck /> Proveedores <Command.Shortcut keys={["G", "P"]} sequence />
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <Inbox /> Aprobaciones <Command.Shortcut keys={["G", "A"]} sequence />
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Configuración">
          <Command.Item onSelect={onSelect}>
            <User /> Perfil
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <CreditCard /> Facturación
          </Command.Item>
        </Command.Group>
      </Command.List>
      <Command.Footer />
    </>
  );
}

export const Palette: Story = {
  parameters: { docs: { source: { code: PALETTE_CODE } } },
  render: () => (
    <div className="ui:w-[600px]">
      <Command label="Comandos">
        <PaletteBody />
      </Command>
    </div>
  ),
};

export const InDialog: Story = {
  name: "In a dialog (⌘K)",
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Button, Command } from "@obel-arg/malbec-ui";

function CommandPalette() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Button.Text>Abrir comandos</Button.Text>
      </Button>
      <Command.Dialog open={open} onOpenChange={setOpen} label="Comandos">
        {/* the same parts as the Palette story */}
      </Command.Dialog>
    </>
  );
}`,
      },
    },
  },
  render: function CommandInDialog() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Button.Text>Abrir comandos</Button.Text>
        </Button>
        <Command.Dialog open={open} onOpenChange={setOpen} label="Comandos">
          <PaletteBody onSelect={() => setOpen(false)} />
        </Command.Dialog>
      </>
    );
  },
};
