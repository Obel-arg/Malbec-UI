import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Dialog } from "../Dialog/Dialog";
import { FloatingBar } from "../FloatingBar/FloatingBar";
import { Sheet } from "../Sheet/Sheet";
import { Pagination } from "../Pagination/Pagination";
import { Sidebar } from "../Sidebar/Sidebar";
import { MalbecLabelsProvider } from "./MalbecLabelsProvider";

const es = (ui: ReactNode) => render(<MalbecLabelsProvider locale="es">{ui}</MalbecLabelsProvider>);

describe("navigation components read their labels from MalbecLabelsProvider", () => {
  it("Pagination", () => {
    es(
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous href="#" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next href="#" />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>,
    );
    expect(screen.getByRole("navigation", { name: "Paginación" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Ir a la página anterior" }).textContent).toBe("Anterior");
    expect(screen.getByRole("link", { name: "Ir a la página siguiente" }).textContent).toBe("Siguiente");
    expect(screen.getByText("Más páginas")).toBeTruthy();
  });

  it("Breadcrumb", () => {
    es(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "Ruta de navegación" })).toBeTruthy();
    expect(screen.getByText("Más")).toBeTruthy();
  });

  it("Sidebar.Trigger", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    es(
      <Sidebar.Provider>
        <Sidebar.Trigger />
      </Sidebar.Provider>,
    );
    expect(screen.getByRole("button", { name: "Mostrar u ocultar la barra lateral" })).toBeTruthy();
  });
});

describe("overlay close buttons read their labels from MalbecLabelsProvider", () => {
  it("Dialog", () => {
    es(
      <Dialog open>
        <Dialog.Content showCloseButton aria-describedby={undefined}>
          <Dialog.Title>Editar</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: "Cerrar diálogo" })).toBeTruthy();
  });

  it("Sheet", () => {
    es(
      <Sheet open>
        <Sheet.Content aria-describedby={undefined}>
          <Sheet.Title>Filtros</Sheet.Title>
        </Sheet.Content>
      </Sheet>,
    );
    expect(screen.getByRole("button", { name: "Cerrar panel" })).toBeTruthy();
  });

  it("FloatingBar.Close", () => {
    es(
      <FloatingBar open>
        <FloatingBar.Close />
      </FloatingBar>,
    );
    expect(screen.getByRole("button", { name: "Cerrar" })).toBeTruthy();
  });
});
