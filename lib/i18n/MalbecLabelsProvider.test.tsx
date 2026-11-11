import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { labelsEn, labelsEs } from "./labels";
import { MalbecLabelsProvider, useMalbecLabels } from "./MalbecLabelsProvider";

function Probe() {
  const labels = useMalbecLabels();
  return (
    <p>
      {labels.next}|{labels.close}|{labels.moreEvents(3)}
    </p>
  );
}

describe("MalbecLabelsProvider", () => {
  it("defaults to English without a provider", () => {
    render(<Probe />);
    expect(screen.getByText("Next|Close|3 more events")).toBeTruthy();
  });

  it('locale="es" switches every label to Spanish', () => {
    render(
      <MalbecLabelsProvider locale="es">
        <Probe />
      </MalbecLabelsProvider>,
    );
    expect(screen.getByText("Siguiente|Cerrar|3 eventos más")).toBeTruthy();
  });

  it("overrides single labels on top of the locale", () => {
    render(
      <MalbecLabelsProvider locale="es" labels={{ close: "Salir" }}>
        <Probe />
      </MalbecLabelsProvider>,
    );
    expect(screen.getByText("Siguiente|Salir|3 eventos más")).toBeTruthy();
  });

  it("ships the same keys in both catalogs", () => {
    expect(Object.keys(labelsEs).sort()).toEqual(Object.keys(labelsEn).sort());
  });
});
