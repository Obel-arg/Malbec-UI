# Malbec UI — Guía operativa para Claude

Librería de componentes de la suite Malbec (`@obel-arg/malbec-ui`, GitHub Packages). La consumen
Live, Artist, Publishing y Records, así que cada cambio impacta en cuatro apps.

## Criterio

Ideas ambiciosas, sistemas simples, software que se siente obvio. No conserves complejidad sólo
porque ya está; no metas maquinaria porque queda arquitectónicamente impresionante. «Medí dos
veces, cortá una» y «yagni» a la vez. Estas reglas son buenos defaults: las preferencias del dev
pueden pisarlas.

## 1. Versionado y releases

Un PR que toca `lib/**` publica su propia versión. No hay un PR de release aparte.

1. `pnpm version <patch|minor|major> --no-git-tag-version` en el mismo PR.
2. Entrada `## vX.Y.Z — YYYY-MM-DD` arriba de todo en `CHANGELOG.md`, escrita para quien consume
   la librería: qué cambia en su pantalla y si tiene que hacer algo.
3. Al mergear, `publish.yml` publica la versión que no tiene tag, la tagea y crea la GitHub Release.

`ci.yml` corre build, lint, tests y `scripts/release-check.sh`. Un PR que toca `lib/**` sin
bump o sin entrada de CHANGELOG falla.

**Qué nivel corresponde.** Lo que decide es lo que ve el consumidor:

- **patch**: fix sin cambio visual. Si un fix cambia algo a la vista, aunque sea volver a la
  intención original, se avisa en el CHANGELOG.
- **minor**: aditivo u opt-in, como un componente nuevo, una prop nueva o una variante nueva.
- **major**: cambia lo que se ve por defecto o rompe la API. Antes de implementarlo pasa por el
  taller con Isa (ver §3).

## 2. Convenciones de código

- **Prefijo `ui:` siempre primero.** En Tailwind 4 el prefijo va antes de toda variante:
  `ui:hover:bg-x`, `ui:dark:text-y`, `ui:[&>svg]:size-4`. `hover:ui:…`, `dark:ui:…` o
  `ui:[…]:ui:…` compilan sin error, pero no generan CSS. Un test de `lib/` los rechaza.
- **`cn()` para combinar clases**, con la clase que tiene que ganar al final. Si agregás un token
  de tamaño a la escala de `styles.css` (`--text-*`), registralo en `utils/cn.ts`. Si no, twMerge
  lo toma por un color y lo descarta.
- **`"use client"`** en todo módulo que use hooks o que cree un context al cargarse
  (`createContext`, `createFormHookContexts`, …). Sin esa directiva, el barrel no se puede importar
  desde un Server Component. `preserveDirectives` la conserva en `dist/`.
- **SSR primero.** Nada de leer `window` ni `matchMedia` en el initializer de `useState`: el estado
  inicial tiene que coincidir con el del server, y lo que depende del navegador se lee en el effect.
- **Subpaths públicos** (`.`, `./icons`, `./style.css`, `./theme`, `./theme/presets`): un subpath
  nuevo va en `exports` de `package.json`, con un test que verifique que su destino existe en `dist/`.
- **Nada de texto visible hardcodeado.** Toda etiqueta (Close, Previous, No results…) tiene que
  poder configurarse, porque las apps son ES + EN.
- **Colores sólo desde tokens** de `styles.css`. Nada de hex en componentes ni de `color-mix()`
  (se parte en dos con `@supports` y se ve distinto según la máquina).
- **z-index desde las variables `--ui-z-*`**, nunca un número suelto.
- **Stories con uso real.** El code panel de Storybook muestra el JSX que escribiría el
  consumidor, no `{ render }` ni un componente wrapper.

## 3. Diseño: la skill `malbec-ux-ui`

Esta librería es la **forma por defecto** de las cuatro apps. La skill `malbec-ux-ui` es el sistema
de diseño aprobado con Isa, dueña del diseño de la suite. Leela antes de tocar el aspecto de un
primitivo.

- **Un default visual no se cambia en un patch ni en un minor.** La auditoría de UI lista los
  defaults que hoy contradicen el spec: velo detrás de diálogos, sombras, outline/ghost en color,
  foreground negro, etc. Se corrigen juntos en la 2.0, después del taller con Isa, y no de a uno.
- **Lo nuevo nace en spec**: superficies sin blanco puro, sin negro (`#09090b`), chips con
  `rounded-[8px]` y no cápsulas, color de marca sólo para CTA y estado, cero eyebrows en
  mayúsculas, botones `md`.
- **Antes de sumar un componente**, fijate si ya existe en alguna app (la auditoría §7 tiene el
  ranking). Se sube el que ya está aprobado en pantalla; no se diseña otro.
- Para verificar que una clase compiló, ver `references/verificacion.md` de la skill (sección de
  Tailwind 4).

## 4. Tests

- `pnpm test` (Vitest + jsdom + Testing Library). Los tests viven al lado del código:
  `lib/<Comp>/<algo>.test.ts(x)`.
- **Todo fix lleva primero un test que reproduce el bug** y falla, y después el fix que lo pone en
  verde.
- Antes de commitear: `pnpm build` (tsc + vite), `pnpm lint` y `pnpm test`.

## 5. Commits y ramas

- Rama `<tipo>/<LINEAR-ID>-<desc>` (equipo Linear `UI`). Commits en Conventional Commits, en
  inglés, uno por subtask, con `Refs: UI-<n>` en el footer. El hook `commit-msg` valida el subject.
- Los git hooks se activan con `pnpm run prepare` después de clonar, porque `ignoreScripts` no
  deja que corra solo.

## 6. Seguridad

- **Nunca hardcodear tokens.** El `.npmrc` del repo sólo lleva el mapeo de registry. El token de
  GitHub Packages vive en el `~/.npmrc` del dev (`//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}`)
  o en el del runner. pnpm 11 ignora credenciales de un `.npmrc` commiteado.
- El README se publica dentro del paquete (npm siempre incluye el README): nada sensible ahí.
- Si encontrás un secreto, frená, avisá y proponé rotarlo. No lo reproduzcas.
- En cada PR a main, `pr-vuln-gate.yml` corre `pnpm audit` (runtime y desarrollo) y frena cualquier Critical/High, sin excepciones.
- Findings aceptados de osv-scanner: `osv-scanner.toml`, cada uno con motivo y `ignoreUntil`. Cuando vencen, se reevalúan; no se renuevan sin revisar si ya hay fix.

### 6.1. Protocolo de seguridad de dependencias (supply chain)

**Eje 1: cuarentena temporal (pasiva, ya activa).** `minimumReleaseAge: 10080` en
`pnpm-workspace.yaml`: pnpm rechaza versiones publicadas hace menos de 7 días. **La unidad son
MINUTOS.** `ignoreScripts: true` bloquea los scripts de instalación. El repo pinea pnpm 11 en
`packageManager`. En cada install tiene que aparecer `✓ Lockfile passes supply-chain policies`.

Unidades por manager, por si el stack cambia (7 días): npm `min-release-age=7` (días) ·
pnpm/yarn `10080` (minutos) · bun `604800` (segundos) · uv `"7 days"`. cargo no tiene
cuarentena: ahí sólo aplica el Eje 2, con riesgo residual.

**Eje 2: ceremonia de instalación (activa, obligatoria).** Nunca `pnpm add` a secas:

1. **Proponer** el paquete por nombre exacto y la razón. Esperar confirmación del dev.
2. **Resolver sin instalar**, con versión exacta y sin cambios previos sin commitear en el lockfile:
   `pnpm add <pkg> --lockfile-only --save-exact`.
3. **Diff del lockfile** (`git diff -- pnpm-lock.yaml`): sacar la lista de paquetes y versiones que
   entran, **incluidas las transitivas**.
4. **Escanear** en modo online (nunca `--offline`): `osv-scanner scan -L pnpm-lock.yaml`.
5. **Decidir cruzando los findings contra el diff del paso 3**:
   - finding en un paquete o transitiva **nuevo** → **FRENAR**, reportar y no instalar.
   - findings sólo en deps preexistentes → no bloquean; se reportan aparte como deuda.
   - scan limpio (exit 0) → instalar.
   - exit 128 → no encontró lockfile y no escaneó nada; investigar.
6. **Instalar** respetando el lock: `pnpm install --frozen-lockfile`.

El orden importa: **resolución → scan → instalación**.

**Políticas:** no bajar la cuarentena (excepciones puntuales en `minimumReleaseAgeExclude`, con
aprobación) · no desactivar `ignoreScripts` (una dep que necesite build va en `allowBuilds`, que es
un mapa) · versiones exactas y lockfile commiteado · nada de URLs, tarballs ni repos git · preferir
lo que ya está instalado · verificar el nombre exacto (typosquatting) y preferir paquetes scoped.

## 7. Estilo de respuesta

Respuestas en español. Resúmenes cortos al cerrar una tarea: qué cambió y qué falta verificar.
