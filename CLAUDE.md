# CLAUDE.md

Interactive character sheet for the TTRPG **Eat the Reich**. Offline-first single-page app:
all data lives in the browser via `localStorage`, deployed as a static site to GitHub Pages.

## Stack
- React 18 + Vite 6 (no backend, no server state).
- Plain CSS (`src/styles/`). No CSS framework.
- `react-markdown` + `remark-gfm` for RP-tab content. `html2canvas` + `jspdf` (lazy-loaded) for sheet snapshots.

## Architecture
- **State:** one versioned root object in `localStorage` under `etr.appstate.v1`.
  See `src/store/persistence.js` (load/save/migrate, export/import) and
  `src/store/factory.js` (blank-character schema, constants). The single source of truth
  is `src/store/StoreContext.jsx` (`useStore()`); all reads/writes go through it.
- **Active character:** `useStore().activeCharacter` + `updateActive(patchOrFn)`.
- **Tabs:** `Character Sheet` + per-character RP tabs (Tips, Phrases, Opportunities, Voice).
  RP content is editable Markdown stored on the character (`character.rp[tab]`).
- **Dice:** `src/lib/dice.js` (4–5 success, 6 critical) + `src/components/dice/` (shared
  `DiceProvider`/`useDice` so stat & Last-Stand buttons feed one result tray). Rolls also
  copy a Roll20 `/r Nd6` string to the clipboard — there is no live Roll20 integration
  (Roll20 has no external push API).

## Conventions
- Persistence is debounced (250 ms) in `StoreContext`. Never write `localStorage` directly
  from components — go through the store.
- Bump the storage key / add a `migrate()` step in `persistence.js` for any schema change.
- Portraits are downscaled to JPEG data URLs on upload (`src/lib/files.js`) to limit
  `localStorage` growth.
- **AI is authoring-time only.** The app makes no network/API calls. RP pages, portraits,
  and dynamic content are generated externally (e.g. with Claude) and pasted/imported in.

## Source of truth for game rules
See `/docs`:
- `RULES_SYNOPSIS.md` — distilled mechanics (stats, dice, Blood, injuries, Last Stand).
- `DATA_MODEL.md` — the localStorage schema.
- `source/` — original rulebook PDF, blank sheet, design/reference images, extracted text.

## Commands
- `npm run dev` — local dev server (served from `/`).
- `npm run build` — production build to `dist/` (base path `/Eat-the-Reich-Character-Sheet/`;
  override with `VITE_BASE`).
- `npm run preview` — preview the production build.
- `npm run deploy` — build + publish `dist/` to the `gh-pages` branch.

## Licensing note
*Eat the Reich* is © 2023 Grant Howitt / Rowan, Rook and Decard. This is a personal,
non-commercial fan tool. Do not commit the full rulebook PDF to a public repo if that would
violate the publisher's terms — keep `docs/source/` local or in a private repo.
