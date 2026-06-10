# Eat the Reich — Rules Synopsis (for the Character Sheet App)

> Distilled from the official rulebook (`source/Eat-the-Reich-Rulebook.pdf`). This is a
> mechanics reference for building the app, **not** a replacement for the rules text.
> *Eat the Reich* © 2023 Grant Howitt / Rowan, Rook and Decard. Used here for a personal,
> non-commercial fan tool.

## Premise
You play undead vampire commandos dropped (in blood-filled coffins) into Nazi-occupied
Paris, 1943, working for **F.A.N.G.** Mission: carve a bloody path to Hitler and drink him
dry. Tone: pulp-horror, punk, over-the-top, darkly comic.

## The Seven Stats
Every action uses one of these. A stat's **rating = number of d6 you grab** for that action.

| Stat | Use |
|------|-----|
| **BRAWL** | Kill nazis up close |
| **CON** | Sway nazis with lies, flattery, charisma |
| **FIX** | Repair or modify devices and structures |
| **SEARCH** | Investigate to uncover information |
| **SHOOT** | Kill nazis at a distance |
| **SNEAK** | Avoid detection, minimise disruption |
| **TERRIFY** | Scare nazis into compliance |

If an action fits no stat, roll 2 dice. Pregens have ratings roughly 1–4.

## The Dice System (a player's turn)
1. **Build your pool:** grab dice = your rating in the chosen stat.
2. **Add dice for gear/abilities:** +1 die per piece of equipment used (spend 1 use) or
   per ability used (pay its cost, usually 1 Blood).
   - **Go out with a bang:** spending the *last* use of a multi-use item adds an extra bonus die.
   - **Bonus dice (`+` requirements):** equipment/abilities list situational requirements
     prefixed with `+`. The number of `+` = bonus dice gained if the requirement is met.
     e.g. `(+flanking)` = +1 die; `(+++ armoured target)` = +3 dice.
3. **GM builds the Threat pool:** dice = current Attack rating of the engaged Threat.
4. **Roll & read results (player dice only have special 6s):**
   - **1–3:** discard (failure)
   - **4–5 = SUCCESS:** +1 damage **OR** +1 defence **OR** +1 Blood
   - **6 = CRITICAL:** +2 damage **OR** +2 defence **OR** +2 Blood **OR** activate a SPECIAL
   - GM's Attack dice: 4+ = a success, no special 6s.
5. **Allocate each die** to one of: Advance an Objective, Eliminate a Threat, Defend
   yourself, Feed (gain Blood), or Activate a SPECIAL. Add a narrative detail per die.
   - Success vs Objective/Threat: reduce its rating by 1 (Critical: by 2). Rating 0 = done.
   - **Challenge rating** on an Objective/Threat absorbs that many dice before damage applies.
   - Defend: each success removes 1 GM Attack die (Critical: 2).
   - Feed: success = +1 Blood, Critical = +2 Blood.
   - **SPECIAL:** only triggers when a **Critical** is allocated to it. Specials break rules
     (massive damage, ignore challenge, etc.) and are listed on the sheet beside abilities.

## Blood
- Core resource. Capital-B **Blood**. **Max 10.** Everyone **starts at 0** (regeneration burned
  the drop-coffin supply).
- **Gain** by allocating successes/criticals to Feeding.
- **Spend** to fuel abilities (usually 1; some cost 2+) and to heal.
- **Share** freely with vampires within arm's reach.
- Tracked as a **Blood Track 0–10** on the sheet.

## Injuries & Trauma
- If the GM has Attack dice left when you have no dice left, **mark an Injury**.
- **Marking:** roll a D6 → category by result band (**1–2**, **3–4**, **5–6**). Tick the first
  box in that category; if taken, tick the second; if both taken, mark an alternate category.
- **Second box in a category = a mechanical penalty** (limits gear/abilities, alters Blood
  gain/spend, or changes stat values). Penalties are character-specific.
- Each character has **6 injury slots**: a **LIGHT** and a **SEVERE** row across the three
  category bands (1–2, 3–4, 5–6) — see the blank sheet.
- **Downed:** if GM has **3+** Attack dice left when you're out of dice → roll a category and
  mark **all** boxes in it; you're out until a vampire rescues you (rescue becomes an Objective
  rated ~2–4).
- **Healing:** spend **3 Blood** at any time to erase one Injury mark.
- **Death:** mark **all six** Injuries → you're dead. Go to **LAST STAND**.

## Last Stand (8D6)
On death: invoke your sheet's named **Last Stand** action + its catastrophic final effect,
narrate a dramatic finish, roll **8D6**, allocate to current Objectives/Threats freely, then
retire from the game. Heal-Injury SPECIALs cannot be used during a Last Stand.

## Objectives & Threats (context only — GM-side, not on the player sheet)
Everything in Paris is mechanically an **Objective** (advance to rating 0 to complete) or a
**Threat** (Attack rating; reduce to 0 to beat back). Both may have a **Challenge** rating
that soaks dice. Threats reinforce over rounds. These live on the GM/mission side, but the
app may optionally let a player jot the current scene's objectives/threats as scratch notes.

## Advances (XP)
Characters unlock additional **Advances** (extra abilities, often `Spend [n] Blood: effect`)
by spending XP. The custom sheet has checkbox-gated advance slots.

## Character Build Summary (what a sheet holds)
- **Identity:** Name, Concept, Notes/background (why you're with F.A.N.G.), portrait.
- **Stats:** the 7 stats, each with a rating.
- **Blood Track:** 0–10, current value.
- **Equipment:** item name, number of **uses** (boxes, last-use bonus), and **tags**
  (incl. `+` bonus requirements). Plus a free **Loot / battlefield spoils** area.
- **Abilities:** name + effect (cost in the text, e.g. "Spend 1 Blood:"). Some are **SPECIAL**.
- **Advances:** XP-unlockable abilities (checkbox + name + Blood cost + effect).
- **Injuries:** 6 slots in a Light/Severe × (1–2 / 3–4 / 5–6) grid, each a named injury with
  a check box; second-in-category carries a penalty.
- **Last Stand:** named action + catastrophic final effect.

## The Six Pregens (for reference / quick-start templates)
Iryna (old-money occultist sniper), Nicole (resistance demolitions, lots of guns), Cosgrave
(the most magical — necromancer/Soul Jars, creative powers), Chuck (good-natured cowpoke who
eats corpses), Astrid, Flint. Full stat blocks in `source/Rulebook-extracted-text.txt`.
