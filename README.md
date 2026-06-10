# Eat the Reich — Interactive Character Sheet

A browser-based, offline-first character sheet for the tabletop RPG **Eat the Reich** — undead
commandos tearing through Nazi-occupied Paris, 1943. Track your stats, Blood, equipment,
abilities, advances, injuries, and Last Stand; keep per-character roleplay notes; roll dice and
copy Roll20 strings to your clipboard. Everything is stored locally in your browser.

> *Eat the Reich* is © 2023 Grant Howitt / Rowan, Rook and Decard. This is an unofficial,
> non-commercial fan tool.

## Features
- **Multiple characters** with a switcher (new / duplicate / delete).
- **Full sheet:** identity + portrait upload, the seven stats, a 0–10 Blood track, equipment with
  use-boxes and tags, loot, blood abilities, XP advances, the injuries grid, and Last Stand.
- **Dice roller:** roll any pool (player dice — 4–5 success, 6 critical); every roll also copies a
  Roll20 `/r Nd6` string to your clipboard to paste into chat.
- **RP tabs:** per-character Tips, Phrases, Opportunities, and Voice — editable Markdown you can
  author by hand or generate with AI and paste in.
- **Backup & portability:** export/import all characters as JSON; snapshot the active sheet to
  PNG or PDF.
- **Offline & private:** no backend, no login, no network calls. Data lives in `localStorage`.

## Local development
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & deploy (GitHub Pages)
```bash
npm run build      # outputs to dist/ (base path /ETR-Character-Sheet/)
npm run deploy     # publishes dist/ to the gh-pages branch
```
If you rename the repo, update the `base` in `vite.config.js` (or set `VITE_BASE=/your-repo/`).
A GitHub Actions workflow in `.github/workflows/deploy.yml` also builds and deploys on push to
`main`.

## Project layout
```
src/
  store/        localStorage state, character factory, persistence, export/import
  lib/          dice, file/image helpers, snapshot (PNG/PDF)
  components/   sheet sections (Identity, Stats, Blood, Equipment, …) + dice
  tabs/         SheetTab, RPTab
  styles/       theme + component CSS
docs/           rules synopsis, data model, source material (see CLAUDE.md)
```

## A note on data safety
`localStorage` is cleared if you clear your browser data. **Export to JSON regularly** to keep a
backup, especially before importing (import replaces local data).
