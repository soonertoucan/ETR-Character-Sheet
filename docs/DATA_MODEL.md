# Data Model — Eat the Reich Character Sheet App

Proposed localStorage schema. One root object, versioned for safe migrations. All persistence
is local; export/import is JSON. (Subject to refinement during scaffolding.)

## Root (localStorage key: `etr.appstate.v1`)
```jsonc
{
  "version": 1,
  "activeCharacterId": "uuid",
  "characters": [ /* Character[] */ ],
  "settings": { "theme": "default" }
}
```

## Character
```jsonc
{
  "id": "uuid",
  "name": "Edwin 'The Blitz Witch' Cosgrave",
  "concept": "Special Operations Executive — Undead / British / Necromancer",
  "notes": "Where you come from and why you're with F.A.N.G. …",
  "portrait": "data:image/jpeg;base64,…",   // downscaled on upload; null if none

  "stats": {                                  // rating = dice pool size
    "brawl": 0, "con": 0, "fix": 0, "search": 0,
    "shoot": 0, "sneak": 0, "terrify": 0
  },

  "blood": { "current": 0, "max": 10 },

  "equipment": [
    {
      "id": "uuid",
      "name": "Enormous Knife",
      "uses": { "total": 1, "spent": 0 },     // boxes; renders as [ ][ ]…
      "tags": "Never saw you coming",          // includes +bonus requirements
      "neverRunsOut": false                    // some gear has no use limit
    }
  ],
  "loot": "Free-text battlefield spoils / loot.",

  "abilities": [
    {
      "id": "uuid",
      "name": "Cadre Macabre",
      "effect": "Spend 1 Blood: full control of a corpse for ~a minute.",
      "isSpecial": false,                       // true = activates only on a Critical
      "bloodCost": 1                            // parsed/optional; null if N/A
    }
  ],

  "advances": [
    {
      "id": "uuid",
      "unlocked": false,                        // XP checkbox
      "name": "Hell's Ravenous Fire",
      "bloodCost": 1,
      "effect": "Ignore Challenge on your next action against a Threat."
    }
  ],

  "injuries": [
    // Fixed 6 slots: row LIGHT|SEVERE × band 1-2|3-4|5-6
    {
      "id": "light-1-2",
      "row": "light", "band": "1-2",
      "label": "Light Bone Fingers",
      "penalty": "",                            // text shown when this is the 2nd-in-category
      "marked": false
    }
    // … 5 more
  ],

  "lastStand": {
    "actionName": "",
    "catastrophicEffect": ""
  },

  // Per-character RP content (see AI question — authoring vs runtime).
  // Each tab holds rich content the user (or AI) generates.
  "rp": {
    "tips":          { "format": "markdown|blocks|html", "content": "…" },
    "phrases":       { "format": "…", "content": "…" },
    "opportunities": { "format": "…", "content": "…" },
    "voice":         { "format": "…", "content": "…" }   // "how to speak in character" cues
  },

  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## Tabs (app navigation)
1. **Sheet** (main) — identity + portrait, stats, Blood track, equipment, loot, abilities,
   advances, injuries, last stand. Dice-roll buttons live inline next to stats/pools.
2. **RP Tips** — per character.
3. **Phrases** — per character.
4. **Opportunities** — per character.
5. **Voice** — per character (speech/voice cues).

Top-level chrome: **character switcher** (select / new / delete / duplicate) + **export/import**
(JSON for all characters; image/PDF snapshot for the active sheet).

## Dice Roller behavior
- Buttons present a pool (e.g. derived from a stat, or a manual `NdN` picker, and the fixed
  `8d6` Last Stand button).
- On click: roll in-app (show individual dice, count successes 4–5 and criticals 6), **and**
  copy a Roll20-ready string to clipboard, e.g. `/r 8d6` (or `/r {Stat}d6`).
- An optional "build a pool" helper can sum stat + gear + ability + bonus dice before rolling.

## Open questions tracked elsewhere
- **AI integration** (RP/dynamic content & images): authoring-time vs runtime — see CLAUDE.md
  / project notes. Affects whether `rp.content` is static stored data or fetched live.
