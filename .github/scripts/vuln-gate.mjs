// Gate de vulnerabilidades de los PR a main: ninguna Critical o High entra a la rama
// desde la que se publica la librería. Portado de Malbec-Live (deploy-vuln-gate.mjs).
//
// Sin lista de excepciones ni baseline, igual que en Live: la deuda aceptada de
// `osv-scanner.toml` es sólo Moderate, que este gate no mira. Una Critical/High se remedia,
// no se perdona.
//
// A diferencia de Live, el audit NO usa `--prod`. En una librería las devDependencies
// son lo que corre en el job de publish, con el token de GitHub Packages a mano: una dev
// dependency comprometida puede publicar una versión maliciosa a las cuatro apps.
//
// Se audita el merge commit del PR (lo que quedaría en main), así que el PR que remedia
// pasa: ya trae el lockfile arreglado.
//
// Uso:
//   pnpm audit --json > pnpm-audit.json || true
//   node .github/scripts/vuln-gate.mjs pnpm-audit.json
//
// El `|| true` es correcto: `pnpm audit` sale != 0 con CUALQUIER finding, incluso `low`.
// Quien decide si eso frena el merge es este script.

import { readFileSync, appendFileSync } from "node:fs";

const BLOQUEANTES = ["critical", "high"];

const auditPath = process.argv[2] || "pnpm-audit.json";

let audit;
try {
  audit = JSON.parse(readFileSync(auditPath, "utf8"));
} catch (err) {
  // Exit 2, no 1: no es "encontre vulnerabilidades", es "no pude mirar". Un gate que no
  // pudo correr tiene que frenar el deploy igual, pero distinguible en el log.
  console.error(`No se pudo leer el reporte de pnpm audit (${auditPath}): ${err.message}`);
  process.exit(2);
}

/** Advisories del output de `pnpm audit --json`, deduplicados por id de GHSA. */
function recolectar(a) {
  const out = new Map();
  for (const adv of Object.values(a.advisories ?? {})) {
    const id = adv.github_advisory_id || String(adv.id ?? "");
    if (!id) continue;
    out.set(id, {
      id,
      modulo: adv.module_name ?? "?",
      severidad: String(adv.severity ?? "info").toLowerCase(),
      titulo: adv.title ?? "",
      vulnerable: adv.vulnerable_versions ?? "",
      // "<0.0.0" es como el advisory DB dice "no hay version parcheada". Vale la pena
      // marcarlo: no se arregla subiendo, hay que sacar la dependencia.
      parchada: adv.patched_versions ?? "",
      cves: adv.cves ?? [],
    });
  }
  return [...out.values()];
}

const todos = recolectar(audit);
const bloqueantes = todos
  .filter((a) => BLOQUEANTES.includes(a.severidad))
  .sort((p, q) =>
    p.severidad === q.severidad ? p.modulo.localeCompare(q.modulo) : p.severidad === "critical" ? -1 : 1,
  );

const lineas = [];
const decir = (s) => {
  console.log(s);
  lineas.push(s);
};

const conteo = audit.metadata?.vulnerabilities ?? {};
// En un PR GITHUB_REF_NAME es `<n>/merge`, que no dice nada; lo util es origen → destino.
const esPR = Boolean(process.env.GITHUB_BASE_REF);
const ref = esPR
  ? `${process.env.GITHUB_HEAD_REF} → ${process.env.GITHUB_BASE_REF}`
  : process.env.GITHUB_REF_NAME || "(ref desconocido)";
const frena = esPR ? "merge" : "deploy";

decir(`## Gate de vulnerabilidades del ${frena} — \`${ref}\``);
decir("");
decir(
  `Audit: ${Object.entries(conteo)
    .map(([k, v]) => `${k}=${v}`)
    .join(" · ")}`,
);
decir("");

if (bloqueantes.length) {
  decir(`### ❌ ${bloqueantes.length} vulnerabilidad(es) Critical/High — ${frena} frenado`);
  decir("");
  decir("| Sev | Paquete | Advisory | Corregido en |");
  decir("|-----|---------|----------|--------------|");
  for (const a of bloqueantes) {
    const fix = !a.parchada || a.parchada === "<0.0.0" ? "**sin parche**" : `\`${a.parchada}\``;
    decir(`| ${a.severidad} | \`${a.modulo}\` | ${a.id} | ${fix} |`);
  }
  decir("");
  for (const a of bloqueantes) {
    decir(`- **${a.severidad}** · \`${a.modulo}\` · ${a.id}${a.cves.length ? ` (${a.cves.join(", ")})` : ""}`);
    decir(`  ${a.titulo}`);
  }
  decir("");
  decir(
    "Para desbloquear hay que REMEDIAR: subir la dependencia (directa, o `overrides` en " +
      "`pnpm-workspace.yaml` si es transitiva) con la ceremonia de CLAUDE.md §6.1 y commitear " +
      "el lockfile. Este gate no tiene lista de excepciones a propósito.",
  );
  decir("");
  decir(
    "Si un advisory figura **sin parche**, no se arregla subiendo de version: hay que " + "reemplazar la dependencia.",
  );
} else {
  decir("### ✅ Sin vulnerabilidades Critical/High (runtime ni desarrollo).");
}

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lineas.join("\n")}\n`);
}

process.exit(bloqueantes.length ? 1 : 0);
