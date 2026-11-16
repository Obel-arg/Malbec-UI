# Migrar a malbec-ui 2.0

Guía para las cuatro apps (Live, Artist, Publishing, Records). Tiene tres partes:

1. [Migrar paso a paso](#1-migrar-paso-a-paso): instalar, lo que no compila, lo que cambia a la vista y las copias locales que se borran.
2. [Qué usar en cada caso](#2-qué-usar-en-cada-caso): qué componente elegir cuando hay varios parecidos.
3. [Qué cambió](#3-qué-cambió): resumen con links al CHANGELOG, que tiene el detalle.

La 2.0 alinea los defaults con la skill `malbec-ux-ui` aprobada por Isa. Casi todo cambia **sin que toques código**. El trabajo de migrar consiste sobre todo en **borrar** los overrides que cada app había armado para llegar a ese mismo resultado.

Esta guía dice qué componente usar. Cómo se ve cada pantalla (tokens, embossed, tipografía) lo define la skill `malbec-ux-ui`.

---

## 1. Migrar paso a paso

Seguí este orden: primero lo que rompe el build, después lo visual y al final la limpieza.

### 1.1 Instalar

- Instalá la versión **exacta**, sin `^`, con el alias de siempre: `"malbec-ui": "npm:@obel-arg/malbec-ui@2.0.0"`.
- Si la versión tiene menos de 7 días, la cuarentena (`minimumReleaseAge`) la rechaza. Para eso hay que agregar una excepción en `minimumReleaseAgeExclude` **con la versión exacta**, aprobada por el tech lead, con el motivo y la fecha en que se saca.
- Seguí la ceremonia de instalación del `CLAUDE.md` de tu app:
  1. `--lockfile-only --save-exact`
  2. revisar el diff del lockfile
  3. `osv-scanner`
  4. `pnpm install --frozen-lockfile`
- Antes del release final hay candidatas (`2.0.0-rc.N`) publicadas con el dist-tag `next`. `latest` recién pasa a 2.0 cuando se publica la `2.0.0`.

### 1.2 Lo que no compila

Arreglá esto primero. TypeScript te marca cada caso.

| Cambio | Qué hacer |
|---|---|
| `Form`, `useForm`, `withForm`, `withFieldGroup` ya no salen de `malbec-ui` | Importalos de **`malbec-ui/form`**. `@tanstack/react-form` pasa a ser peer opcional: si la app usa forms, tiene que tenerlo instalado. |
| `DataTable` exige `emptyLabel` | Pasá el texto del vacío en el idioma de la app. Si pasás un string, se muestra como `EmptyState` `row`. |
| `onRowSelectionChange` sin `rowSelection` | `rowSelection` pasó a ser `false` por defecto. Agregá `rowSelection` a las tablas que seleccionan filas. |
| No existe más `PageHeader` | Es un patrón, no un componente. Copiá el JSX de Storybook → **Patterns/Page header** (ver [2.8](#28-encabezado-de-página)). |
| La DataCard v1 (`accentSide`, título adentro, banda de marca) no existe más | Pasala a la API nueva: el título viejo va en `label` y la cifra en `value` (ver [2.5](#25-mostrar-un-dato)). |
| El preset `management` ahora se llama `artist` | Cambiá el nombre donde elijas el tema. |
| Se eliminaron `statusTone`, `statusVariant`, `priorityVariant`, `STATUS_TONES`, `TONE_VARIANT` y `formatGmtOffsetLabel` | Usá `<StatusBadge status="…" />` o `<StatusBadge tone={…} />`. `PRIORITY_TONE` sigue existiendo. |

Hay dos cambios que **compilan igual** pero que conviene resolver en esta misma pasada:

- **`size="sm"` en Button** ahora se dibuja como `md` y está deprecado. En botones con texto, poné `md` (o borrá la prop). En botones chicos que son solo un ícono, usá `size="icon-sm"`.
- **`tone="neutral"` en Button** ya no hace nada, porque outline, ghost y secondary son siempre grises. Borralo.

### 1.3 Textos ES/EN

Los componentes no traen más texto en inglés fijo. Envolvé la app una sola vez:

```tsx
import { MalbecLabelsProvider } from "malbec-ui";

<MalbecLabelsProvider locale={locale}>{children}</MalbecLabelsProvider>
```

Esto traduce los botones de cerrar, Pagination, Breadcrumb, Sidebar, la selección de DataTable, Combobox, DatePicker, los calendarios, Inbox y Command. Para cambiar un texto puntual, usá `labels={{ … }}`. Después borrá los wrappers locales que solo traducían esas etiquetas.

### 1.4 Lo que cambia a la vista y qué borrar en cada app

Estos cambios se ven solos al actualizar. En cada uno, lo que queda por hacer es **borrar** el override local, porque ahora sobra o directamente empeora el resultado. Los números son los que se contaron en cada app durante el desarrollo de la 2.0: tomalos como referencia, no como una lista cerrada.

**En todas las apps**
- [ ] `overlay="none"` en Dialog, Sheet, AlertDialog y Command: ahora es el default. Si una pantalla necesita velo de verdad, usá `overlay="veil"`.
- [ ] Overrides `focus-visible:ring-*` que solo estaban para neutralizar el anillo de marca, incluido `focus-visible:ring-background-300!`.
- [ ] `defaultMode="light"` en `MalbecThemeProvider`: ahora es el default.
- [ ] Overrides de `--color-foreground` a ink, y los `text-malbec-ink` que solo evitaban `text-foreground`.
- [ ] `tableAppearance="default"` y `rowSelection={false}`: los dos son ahora el default.
- [ ] `bg-background-100` en `Popover.Content` y `shadow-none` en `Card`.
- [ ] `rounded-[8px]` en `Badge`.
- [ ] Overrides de tamaño de texto y de `max-w` en el Tooltip claro.
- [ ] Paletas de gráfico locales y módulos `chart-style`: se reemplazan por los primitivos de `charts` (ver [2.9](#29-gráficos)).
- [ ] Paddings propios o márgenes negativos que compensaban los 40 px de padding del Dialog. Ahora son 24 px.
- [ ] Cualquier override que pusiera a mano el rojo destructive en `#ef4444`.

**Live**
- [ ] `modal-classes` y el velo de ink al 55 % en `globals.css:312`.
- [ ] `SEGMENTED_TABS_TRIGGER_CLASS`.
- [ ] `malbecOutlineButtonClass`, `malbecGhostButtonClass` y el `ui:h-9 ui:px-4 ui:text-[12px]` repetido en cada botón, que ahora es el `md` por defecto.
- [ ] `tone="neutral"` (2 archivos), `size="sm"` (~72) y el Tooltip con `text-[12px]` (~51).
- [ ] `bg-background-100` en `Popover.Content` (~41).
- [ ] `tableAppearance` y `rowSelection` (~25).
- [ ] La DataCard v1 (1 archivo).

**Artist**
- [ ] Imports de form a `malbec-ui/form` (22 archivos).
- [ ] `floating-dialog-classes`, `segmented-tabs-classes.ts`, `no-green-button-classes` y `NEUTRAL_CHECKBOX_CLASS`.
- [ ] `size="sm"` (~179).
- [ ] `tableAppearance` y `rowSelection` (~63), y `[&_tbody_tr]:bg-white` (×7).
- [ ] Popover (~9) y `shadow-none` en Card (~8).
- [ ] La DataCard v1 (6 archivos).
- [ ] El preset `management`, que pasa a llamarse `artist`.

**Publishing**
- [ ] `sheet-no-veil.css`, `segmented-tabs.ts` (con su `!`), `badge-destructive.css`, `button-outline.css` y `button-ghost.css`.
- [ ] `no-green-button-classes` y `NEUTRAL_CHECKBOX_CLASS`.
- [ ] `tone="neutral"` (7 archivos) y `size="sm"` (~61).
- [ ] `tableAppearance` y `rowSelection` (~27), y el parche `[&_thead_tr]:bg-background-200` (×26).
- [ ] `shadow-none` en Card (~13).
- [ ] La DataCard v1 (1 archivo).

**En las PWA (Records y Artist)**

La librería ya resuelve el zoom de iOS, los márgenes del notch y las áreas de toque (ver el [CHANGELOG](../CHANGELOG.md#fixes-phones-and-pwas)). Lo que queda en la app:
- [ ] Sacá `maximum-scale=1` o `user-scalable=no` del viewport si los agregaste para evitar el zoom al enfocar un campo: ya no hace falta y bloquean el zoom con dos dedos.
- [ ] Borrá los overrides que ponían los inputs en 16px en mobile.
- [ ] Si la app se dibuja debajo de la barra de estado (`viewport-fit=cover`), los Sheets, el Sidebar, la FloatingBar y los toasts ya respetan el notch y la barra de inicio. El resto de tu layout (headers fijos, barras inferiores propias) tenés que ajustarlo vos con `env(safe-area-inset-*)`.

**Records**
- [ ] El trigger de tabs con `text-xs`.
- [ ] La DataCard v1 (10 archivos).
- [ ] `LockedField` pasa a `Input locked`, e `InfoPopover` pasa a `Field.Label info` (ver [1.5](#15-copias-locales-que-se-reemplazan)).

### 1.5 Copias locales que se reemplazan

Estos componentes nacieron en alguna app y ya están aprobados en pantalla. Si tu app tiene una copia propia, pasala al de la librería y borrala.

| Copia local (o equivalente) | En malbec-ui 2.0 |
|---|---|
| Módulos `chart-style`, paletas de series, donuts y barras de porcentaje | `CHART_INK` / `SERIES_INK`, `ChartCard`, `ChartMarkDefs`, `CrosshairCursor`, `Donut`, `PctBlocks` |
| `NoticeCard` / aviso de "falta configurar" | `Notice` |
| Estados vacíos propios (textos sueltos, ilustraciones) | `EmptyState` (`row`, `ghost`, `page`) |
| Placeholders de carga a mano | `Skeleton` |
| Diálogos de confirmación propios | `ConfirmDialog` |
| Campanita de notificaciones | `NotificationBell` (el toast flotante sigue viviendo en cada app) |
| `LockedField` (Records) | `Input locked` + `lockReason` |
| `InfoPopover` (Records) | `Field.Label info` |
| `data-card-style.ts`, `DATA_CARD_*`, `rail-data-card` | `DataCard` |
| Sidebar con rail que se despliega al pasar el mouse | `Sidebar.Provider collapsible="dock"` |
| Paginación y selector de columnas armados alrededor de DataTable | `DataTable.Pagination` y `DataTable.ColumnsToggle` |
| Tablas que se apilan en mobile, encabezado fijo | `Table stackOnMobile`, `Table stickyHeader` |
| Clases `scroll-hidden` / `scroll-thin` y easings locales | `tokens.css` |

### 1.6 Verificar

- [ ] `tsc`, `lint` y los tests de la app en verde.
- [ ] Recorré cada pantalla en claro y en oscuro. Los diálogos, las tablas, las tabs y los botones son lo que más cambia.
- [ ] Buscá los overrides que todavía quedan: `grep -rn 'overlay="none"\|tone="neutral"\|size="sm"\|tableAppearance="default"\|rowSelection={false}'`.
- [ ] En Records y Artist, probá en un iPhone y en un Android: enfocar un campo (no tiene que hacer zoom), abrir un Dialog con el teclado abierto, un Select o un menú largo, y la PWA instalada a pantalla completa.
- [ ] Para confirmar que una clase compiló, seguí `references/verificacion.md` de la skill `malbec-ux-ui`.

---

## 2. Qué usar en cada caso

Cada tabla responde una pregunta concreta. Si tu caso no aparece, lo más probable es que lo resuelva un primitivo que ya existe. En ese caso, consultá la skill o preguntá antes de crear un componente nuevo.

### 2.1 Avisar algo

| Situación | Usá | No uses |
|---|---|---|
| Falta configurar algo, o un módulo está apagado. Es un estado de la pantalla, no un error | `Notice tone="pending"` (el único amarillo de la suite) o `tone="info"`, con `action` hacia donde se resuelve | `Alert variant="destructive"`: hace parecer que la pantalla se rompió |
| Un error de verdad: no se pudo guardar, falló una carga | `Alert variant="destructive"` | `Notice` |
| Confirmar una acción que ya pasó ("Guardado") | `Sonner.toast()` (montá `<Sonner />` una sola vez) | Un `Notice` fijo |
| El estado de una entidad (pendiente, aprobado, rechazado) | `StatusBadge` o `Badge`. Pendiente va en `variant="yellow"`, nunca en rojo | Un `Notice` por fila |

Regla de la skill: **un solo amarillo por pantalla**. Los conteos de tabs, los resúmenes y los íconos de fila van en gris.

### 2.2 Pantalla o lista vacía

| Situación | Usá |
|---|---|
| Una tabla sin resultados (filtros o búsqueda) | `EmptyState variant="row"` dentro de la tabla. Es lo que dibuja `emptyLabel` cuando le pasás un string |
| Una tabla que todavía no tiene nada, para mostrar qué va a llegar | `EmptyState variant="ghost"` en lugar del cuerpo de la tabla, con `columns` igual a la tabla real |
| Una pantalla entera sin datos todavía | `EmptyState variant="page"`, alineado a la izquierda, con las acciones a la derecha, en el lugar donde van a quedar cuando haya datos |
| Algo que todavía está cargando | `Skeleton` (`circle` solo para avatares). `Spinner` se usa solo dentro de un botón o de un badge |

### 2.3 Confirmar o pedir datos en un modal

| Situación | Usá |
|---|---|
| "¿Seguro?", con la acción asincrónica, estado de carga y error | `ConfirmDialog` (`tone="destructive"` para borrar o rechazar, `requireReason` si hay que justificar) |
| Una confirmación con contenido propio que `ConfirmDialog` no cubre | `AlertDialog` |
| Un formulario o contenido que se edita | `Dialog` (`size` sm, md, lg o xl). Si es largo, partilo con `Steps` y dejá el alto del cuerpo fijo |
| Un detalle o una edición al costado sin perder la pantalla de fondo | `Sheet` |
| Acciones sobre una selección de filas | `FloatingBar` |

Ninguno lleva velo por defecto. Para un "Siguiente" que todavía no se puede usar, dejalo habilitado y marcá con `aria-invalid` lo que falta, en vez de deshabilitarlo sin explicar por qué.

### 2.4 Elegir de una lista

| Situación | Usá |
|---|---|
| Pocas opciones fijas, sin búsqueda | `Select` |
| Muchas opciones, búsqueda, varias a la vez, búsqueda remota o "Crear «…»" | `Combobox` (`keywords`, `filter={null}` + `onInputValueChange`, `loading`, `onCreate`, `onLoadMore`) |
| Ejecutar acciones o navegar desde el teclado (⌘K) | `Command` / `Command.Dialog`, con `Command.Context`, `Command.Shortcut keys` y `Command.Footer` |
| Dos a cinco opciones visibles que cambian una vista | `Tabs` o `ToggleGroup` (ver [2.7](#27-tabs)) |
| Sí o no | `Switch` para lo que aplica en el momento, `Checkbox` dentro de un formulario |

### 2.5 Mostrar un dato

| Situación | Usá |
|---|---|
| Un monto o una cifra clave, con su título | `DataCard value="…" label="…" icon={…}` (y `sub` para una línea debajo) |
| Un conteo corto | `DataCard variant="count"` |
| Varias cifras juntas (tira de KPIs) | Una grilla con `items-stretch` y **una DataCard por cifra**, nunca varias cifras en una card |
| Muchas filas con columnas | `Table` para algo estático y `DataTable` cuando hay orden, paginación o selección. Nunca un `<table>` a mano |
| Un contenedor genérico sin cifra | `Card` |

### 2.6 Campos de formulario

| Situación | Usá |
|---|---|
| Explicar qué significa un campo | `Field.Label info="…"`: una "i" que se abre con click, tap o teclado |
| Explicar un valor ya calculado, al pasar el mouse | `Tooltip` |
| Un valor que se ve pero no se puede editar | `Input locked lockReason="…"`, en la misma caja que los campos de al lado, con el motivo en el tooltip del candado |
| Varios campos con validación | `malbec-ui/form` (`useForm`, `withForm`) |

### 2.7 Tabs

| Situación | Usá |
|---|---|
| Las secciones de una pantalla | `Tabs variant="opacity"` de borde a borde |
| Un selector chico dentro de una sección | `Tabs variant="segmented"` (el default) |
| Subrayado | No lo uses: la skill no lo avala en pantallas nuevas |

Una sola fila de tabs por pantalla.

### 2.8 Encabezado de página

No hay componente: es una composición de primitivos. Copiá el JSX de Storybook → **Patterns/Page header**:

- un `h1` de 18 px en negrita, con su `Badge` de estado en la misma línea;
- el `Button` principal a la derecha;
- un subtítulo de una oración en 13 px muted;
- `Tabs.List` pegado abajo;
- 8 px antes del contenido.

### 2.9 Gráficos

- Los colores salen de `CHART_INK` / `SERIES_INK` y de las variables `--chart-1..5`. Son grises cálidos y **nunca** el color de marca: los datos no van en color de marca.
- `ChartCard` es el contenedor, con el campo de puntos. `ChartMarkDefs` se renderiza una vez por pantalla. `CrosshairCursor` y `TOOLTIP_CARD_CLASS` son para la interacción.
- `Donut` sirve para partes de un total: el resto lo junta en "Otros". `PctBlocks` sirve para porcentajes en bloques.

### 2.10 Botones

| Situación | Usá |
|---|---|
| La acción principal (una sola a la vista) | `Button` (primary) |
| Acciones secundarias | `variant="outline"`, siempre gris |
| La acción que se repite en cada fila | `variant="ghost"` o `row` |
| Borrar o rechazar | `variant="destructive"` |
| Solo ícono | `size="icon"`, o `size="icon-sm"` si es compacto, siempre con `aria-label` |
| Un link que se ve como botón | `Button asChild` con el `<Link>` adentro |

Si un outline o un ghost "necesita" color de marca, en realidad es el botón `primary`.

---

## 3. Qué cambió

Resumen de la 2.0. El detalle de cada punto, con las medidas, está en la [entrada v2.0.0 del CHANGELOG](../CHANGELOG.md#v200--2026-11-11).

**Cambia por defecto (breaking)**
- **Modales sin velo:** Dialog, Sheet, AlertDialog y Command flotan con una sombra de dos capas. `overlay="veil"` trae de vuelta el velo de la 1.x.
- **Tabs segmentadas de 40 / 14.**
- **Badges:** radio de 8 px. `destructive` pasa al par apagado `#dfd0d0` / `#602a2a`.
- **Un solo rojo destructive**, `#ef4444`, en claro y en oscuro. Con texto blanco da 3,6:1: no lo uses detrás de texto chico.
- **Dialog:** padding de 24 px y la X alineada con la primera línea del título.
- **Color de marca solo en el CTA principal:** outline, ghost y secondary son grises, y Checkbox, Switch, RadioGroup y Steps usan gris sólido.
- **Superficies sin blanco puro:** Popover sobre `background-100`, Card sin sombra.
- **DataTable con el aspecto de Table**, con `rowSelection` en `false` por defecto.
- **Claro por defecto** y foreground ink `#1a1a1f`, sin negro.
- **Anillos de foco grises**, con el token `--color-focus`.
- **Más sobrios:** el Tooltip claro pasa a 13/18 px, Inbox no usa color de marca y los gráficos van en grises.
- **Button:** `size="sm"` deprecado y `icon-sm` nuevo.
- **Sin textos en inglés fijos:** `MalbecLabelsProvider` y `emptyLabel` requerido.
- **El form se importa de `malbec-ui/form`**, con react-form como peer opcional.
- **Preset `management` → `artist`.**
- **Command nuevo**, la versión C del taller.
- **DataCard rehecha** según el spec.
- **Page header como patrón**, sin export.
- **Exports sin uso eliminados.**

**Nuevo (aditivo)**
- Charts, `Donut`, `PctBlocks`, `Notice`, `EmptyState`, `Skeleton`, `ConfirmDialog`, `NotificationBell`, `Field.Label info` e `Input locked`.
- Sidebar `collapsible="dock"`.
- DataTable con paginación, selector de columnas y orden del lado del server.
- `Table stackOnMobile` / `stickyHeader`.
- Combobox con búsqueda remota, `loading` y `onCreate`.
- Utilidades en `tokens.css`.

**Arreglos**
- Teléfonos y PWA: sin zoom de iOS al enfocar un campo, overlays que entran en pantalla y scrollean, áreas de toque de 44 px, márgenes del notch y la barra de inicio, calendarios con scroll lateral, y las acciones de Inbox, el motivo de `Input locked` y el orden de la tabla apilada accesibles con el dedo.
- Combobox: el ancho de la lista, los chips deshabilitados, la opción seleccionada marcada, el scroll dentro de un modal y la etiqueta del chevron.
