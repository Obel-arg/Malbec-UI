/**
 * Self-check for status-tone (no test runner in this repo).
 * Run: npx tsx lib/Badge/status-tone.check.ts
 */
import assert from "node:assert/strict";
import { statusVariant, statusTone, priorityVariant, STATUS_TONES } from "./status-tone";

// known statuses map to the right Badge variant
assert.equal(statusVariant("Aprobado"), "emerald");
assert.equal(statusVariant("Cancelado"), "red");
assert.equal(statusVariant("Borrador"), "secondary"); // gray tone
assert.equal(statusVariant("Enviado"), "blue");

// accent / case / whitespace insensitive
assert.equal(statusVariant("en revision"), "yellow");
assert.equal(statusVariant("EN  NEGOCIACIÓN"), "orange");

// unknown falls back (default + override)
assert.equal(statusVariant("Qué sé yo"), "secondary");
assert.equal(statusVariant("Qué sé yo", "outline"), "outline");
assert.equal(statusTone("Qué sé yo"), undefined);

// priority
assert.equal(priorityVariant("Alta"), "red");
assert.equal(priorityVariant("Baja"), "yellow");

// no status string is claimed by two tones
const seen = new Set<string>();
for (const list of Object.values(STATUS_TONES))
  for (const s of list) {
    const k = s.toLowerCase();
    assert.ok(!seen.has(k), `duplicate status across tones: ${s}`);
    seen.add(k);
  }

console.log("status-tone: all checks passed");
