import type { BadgeVariant } from "./badge-variants";

/**
 * Canonical status → colour mapping for the Malbec suite (Records, Live,
 * Artist, Publishing). Single source of truth: products import `statusVariant`
 * / `<StatusBadge>` instead of each maintaining its own status→colour table.
 *
 * Palette owned by design (Isa). Six tones; each maps to an existing `Badge`
 * variant — no new colours are introduced here, only the status mapping.
 * `violet`/`sage` Badge variants are intentionally NOT used for status.
 */
export type StatusTone = "gray" | "yellow" | "blue" | "orange" | "green" | "red";

/** Tone → `Badge` variant. `gray`→`secondary`, `green`→`emerald`; rest 1:1. */
export const TONE_VARIANT: Record<StatusTone, BadgeVariant> = {
  gray: "secondary",
  yellow: "yellow",
  blue: "blue",
  orange: "orange",
  green: "emerald",
  red: "red",
};

/**
 * Status catalog per tone. Edit these lists to change the mapping for the whole
 * suite. Strings are matched accent/case-insensitively (see `normalize`).
 */
export const STATUS_TONES: Record<StatusTone, readonly string[]> = {
  gray: ["Borrador", "Sin dato", "Nuevo", "Asignado", "Archivado", "Cerrado", "Inactivo", "Retirado"],
  yellow: ["Pendiente", "Por confirmar", "Tentativo", "En revisión", "Pendiente de información", "Pendiente de aprobación", "Pendiente de pago", "Facturado"],
  blue: ["En progreso", "En curso", "En desarrollo", "En pruebas", "Enviado"],
  orange: ["En negociación", "Demorado", "Vencido de plazo", "Modificado"],
  green: ["Aprobado", "Confirmado", "Firmado", "Activo", "Pagado", "Cobrado", "Resuelto", "Completado", "Realizado"],
  red: ["Cancelado", "Rechazado", "Anulado", "Vencido", "Error"],
};

/** Priority → tone. */
export const PRIORITY_TONE = { Alta: "red", Media: "orange", Baja: "yellow" } as const;
export type Priority = keyof typeof PRIORITY_TONE;

/** lowercase + strip accents + collapse whitespace, so "En revisión" == "en  revision". */
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().replace(/\s+/g, " ").toLowerCase();

const TONE_BY_STATUS: ReadonlyMap<string, StatusTone> = new Map(
  (Object.entries(STATUS_TONES) as [StatusTone, readonly string[]][]).flatMap(
    ([tone, list]) => list.map((s) => [normalize(s), tone] as const),
  ),
);

/** Tone for a status string, or `undefined` if it isn't in the catalog. */
export function statusTone(status: string): StatusTone | undefined {
  return TONE_BY_STATUS.get(normalize(status));
}

/**
 * `Badge` variant for a status string. Unknown statuses fall back to
 * `secondary` (gray) — the doc assigns unmapped states by meaning manually;
 * pass `fallback` to override per call site.
 */
export function statusVariant(status: string, fallback: BadgeVariant = "secondary"): BadgeVariant {
  const tone = statusTone(status);
  return tone ? TONE_VARIANT[tone] : fallback;
}

/** `Badge` variant for a priority (`Alta`/`Media`/`Baja`). */
export function priorityVariant(priority: Priority): BadgeVariant {
  return TONE_VARIANT[PRIORITY_TONE[priority]];
}
