import { describe, expect, it } from "vitest";
import { priorityVariant, STATUS_TONES, statusTone, statusVariant } from "./status-tone";

describe("status-tone", () => {
  it("maps known statuses to their Badge variant", () => {
    expect(statusVariant("Aprobado")).toBe("emerald");
    expect(statusVariant("Cancelado")).toBe("red");
    expect(statusVariant("Borrador")).toBe("secondary");
    expect(statusVariant("Enviado")).toBe("blue");
  });

  it("ignores accents, case and extra whitespace", () => {
    expect(statusVariant("en revision")).toBe("yellow");
    expect(statusVariant("EN  NEGOCIACIÓN")).toBe("orange");
  });

  it("falls back for unknown statuses", () => {
    expect(statusVariant("Qué sé yo")).toBe("secondary");
    expect(statusVariant("Qué sé yo", "outline")).toBe("outline");
    expect(statusTone("Qué sé yo")).toBeUndefined();
  });

  it("maps priorities", () => {
    expect(priorityVariant("Alta")).toBe("red");
    expect(priorityVariant("Baja")).toBe("yellow");
  });

  it("never claims a status for two tones", () => {
    const all = Object.values(STATUS_TONES).flat().map((s) => s.toLowerCase());
    expect(new Set(all).size).toBe(all.length);
  });
});
