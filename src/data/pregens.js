// The six official Eat the Reich pregenerated characters, used as creation templates.
// Transcribed from the rulebook (see docs/source). Stats each total 17 (range 1-4).
// Equipment `uses` are sensible defaults the player can adjust on the sheet; the bracketed
// numbers on Nicole's gear are her SCAVENGER targets and are preserved in the tags.

export const STAT_BUDGET = 17
export const STAT_MIN = 1
export const STAT_MAX = 4

export const PREGENS = [
  {
    key: 'iryna',
    name: 'Iryna',
    concept: 'Old-money occultist & duellist',
    notes:
      'Provincial aristocrat turned vampire huntress. Fled your decaying estate to fight nazis with F.A.N.G.',
    stats: { brawl: 2, con: 4, fix: 2, search: 2, shoot: 3, sneak: 1, terrify: 3 },
    equipment: [
      { name: 'Exquisite hunting rifle', tags: '+elevated position', uses: 3 },
      { name: 'Magic cavalry sabre', tags: '+charge!', neverRunsOut: true },
      { name: 'Explosive runes', tags: '++concealed', uses: 2 },
      { name: 'Cigarettes from the pockets of hanged men', tags: 'mark to regain 2 Blood', uses: 3 },
    ],
    abilities: [
      { name: 'Dark Glamour', effect: 'Spend 1 Blood: those nearby are mesmerised by your unearthly visage. (+beautiful surroundings)', bloodCost: 1 },
      { name: "Night's Willing Servants", effect: 'Spend 1 Blood: summon a swarm of bats under your control. (+old buildings)', bloodCost: 1 },
      { name: 'Deadeye Shot', effect: 'When you use a ranged weapon, SPECIAL: reduce a Threat’s Attack rating by 1.', isSpecial: true },
    ],
    advances: [
      { name: "Hell's Ravenous Fire", effect: 'Spend 1 Blood: ignore Challenge on your next action against a Threat.', bloodCost: 1 },
      { name: 'Enervation of the Soul', effect: 'Spend 1 Blood: on your next roll, gain SPECIAL: inflict 4 damage to an Übermensch.', bloodCost: 1 },
      { name: 'Mantle of the Fell Beast', effect: 'Spend 2 Blood: BRAWL and TERRIFY become 4, all other stats set to 1, no items. Lasts until the Objective is completed.', bloodCost: 2 },
    ],
    injuries: {
      'light-1-2': { label: 'Suit Torn' },
      'severe-1-2': { label: 'Abdominal Puncture', penalty: "Can't use + dice" },
      'light-3-4': { label: 'Hair Ruined' },
      'severe-3-4': { label: 'Headshot', penalty: '+2 BRAWL, -2 CON' },
      'light-5-6': { label: 'Shoulder Injury' },
      'severe-5-6': { label: 'Arm Removed', penalty: 'May only use 1 item per turn' },
    },
    lastStand: { actionName: 'Forbidden Sorceries' },
    rp: {
      tips: `# Roleplaying Iryna

**Who you are:** Old blood, old money, old grudges. A provincial aristocrat who became something far worse than a vampire — a huntress with taste. The nazis are vulgar little men trampling a world you consider yours, and you will not forgive the rudeness.

**What drives you:**
- Reclaim your dignity and your name
- Punish the uncultured for what they've broken
- Prove that breeding and cruelty are the same art
- Never, ever appear to try too hard

**How to play her:** Imperious, elegant, glacially calm. Treat carnage as a social occasion. Compliment your enemies before you ruin them. You are never impressed and never hurried.

## Signature style
- Mesmerise first, kill second. **Dark Glamour** turns a room before a shot is fired.
- Take the high ground — literally. Your rifle loves an **elevated position**.
- Let the bats do the indelicate work (**Night's Willing Servants**).
- Save **Mantle of the Fell Beast** for when manners have truly failed.

> "A lady always finishes what she starts. Usually with the sabre."`,

      phrases: `# Words & Lines

## In her register
"How tiresome." · "You'll forgive me — actually, you won't." · "Charmed." · "Sit. Stay. Bleed." · "I have hunted better men than you for sport."

## Example lines
- "You came into my night, and you did not even dress for it."
- "Do hold still. This is the only elegant thing you'll do today."
- "I was killing your betters before your grandfather soiled his first uniform."
- "Run, if you like. The bats do enjoy the exercise."

> Spoken softly, over a fallen officer: "There. Wasn't that civilised?"`,

      opportunities: `# Tools of a Refined Predator

- **Dark Glamour** — freeze a crowd, charm a sentry, buy a moment of perfect quiet. Best amid **beautiful surroundings**.
- **Night's Willing Servants** — a swarm of bats to scout, blind, harry or herd. Thrives around **old buildings**.
- **Deadeye Shot** — from an **elevated position**, blunt a Threat's attack before it lands.
- **Magic cavalry sabre** — answer a **charge!** with one of your own.
- **Explosive runes** — set a **concealed** trap and let the rude men walk into it.
- **Cigarettes from the pockets of hanged men** — a grim little ritual; mark them to regain 2 Blood when you need composure.

## When manners fail
- **Mantle of the Fell Beast** — drop the poise, become the monster: BRAWL and TERRIFY surge, everything else falls away. Use it to end an Objective, not to start a fight.

> "Restraint is a courtesy. I extend it rarely."`,

      voice: `# Speaking Like Iryna

**Accent:** Old-world Continental aristocrat — clipped, precise, faintly archaic. Every word chosen, nothing wasted.

**How she talks:**
- **Slow and certain** — she never rushes; the world waits for her.
- **Formal vocabulary** — "shall", "one does not", "how very droll".
- **Velvet contempt** — insults delivered as compliments.
- **Understatement** — the worse it gets, the calmer she sounds.

**Cadence:** Measured, with deliberate pauses. She lets silence do half the threatening.

**Attitude in every line:** Speak as someone who has already won and is merely waiting for the room to realise it.

> "Do try to die gracefully. So few of you manage it."`,
    },
  },

  {
    key: 'nicole',
    name: 'Nicole',
    concept: 'Resistance guerrilla & demolitions expert',
    notes:
      'Packing more heat than a whole platoon. Lost your cell to nazi purges and you are bitter about it. Bitten by your (now dead) vampire girlfriend. Desperate to meet a glorious end in battle.',
    stats: { brawl: 2, con: 2, fix: 1, search: 2, shoot: 4, sneak: 3, terrify: 3 },
    equipment: [
      { name: 'M3 submachine gun', tags: '+flanking [scavenger 1]', uses: 3 },
      { name: 'Cut-down Lee Enfield rifle', tags: '+close quarters [scavenger 2]', uses: 3 },
      { name: 'Smoke grenades', tags: '+cover advance [scavenger 3]', uses: 2 },
      { name: 'Firebombs', tags: '++firetrap [scavenger 4]', uses: 2 },
      { name: 'Panzerfaust', tags: '+++armoured target [scavenger 5]', uses: 1 },
      { name: 'Dynamite', tags: '++++demolitions [scavenger 6]', uses: 1 },
    ],
    abilities: [
      { name: 'Scavenger', effect: "SPECIAL: roll a D6 and compare it to the [scavenger N] numbers on your gear. Restore 1 use of the weapon rolled.", isSpecial: true },
      { name: 'Sapper', effect: "When you use explosives, SPECIAL: reduce an Objective or Threat's Challenge by 1.", isSpecial: true },
      { name: 'Blink', effect: 'Spend 1 Blood: burst into shadows and reform a few feet away. (+infiltration)', bloodCost: 1 },
    ],
    advances: [
      { name: 'Rat Swarm', effect: 'Spend 1 Blood: summon a swarm of rats under your control. (++filth)', bloodCost: 1 },
      { name: 'Feed on Fear', effect: 'When you reduce a Threat rating to 0, gain 3 Blood.' },
      { name: 'Pitch Black', effect: 'Spend 1 Blood: plunge the area around you into shadow; you can see fine. (++ambush)', bloodCost: 1 },
    ],
    injuries: {
      'light-1-2': { label: 'Dazed' },
      'severe-1-2': { label: 'Headshot', penalty: "Can't trigger Specials" },
      'light-3-4': { label: 'Just a Graze' },
      'severe-3-4': { label: 'Bleeding Out', penalty: 'Spend 1 Blood at the start of your turn' },
      'light-5-6': { label: 'Hand Injury' },
      'severe-5-6': { label: 'Lost an Arm', penalty: 'May only use 1 item per turn' },
    },
    lastStand: { actionName: 'Rigged to Blow' },
    rp: {
      tips: `# Roleplaying Nicole

**Who you are:** A Resistance fighter who lost everyone and kept the guns. Your cell is gone, your girl is gone, and the only thing that quiets the grief is the noise of something nazi coming apart. You're not here to survive the war — you're here to make it expensive.

**What drives you:**
- Avenge your cell and your dead lover
- Blow up everything they built
- Take as many with you as you can
- Find a death worth the name

**How to play her:** Furious, fast, blackly funny. You volunteer for the worst job in the room. You grieve by fighting and joke so you don't scream.

## Signature style
- More gun than plan — bring all of it.
- **Sapper** + explosives shred Challenges; soften the hard targets first.
- **Scavenger** keeps you firing — never stop to reload when you can roll for it.
- **Blink** in, plant the charge, **Blink** out. Or don't bother leaving.

> "Save the speeches. Light the fuse."`,

      phrases: `# Words & Lines

## Hers
"Merde." · "On y va." · "For the cell." · "Bigger boom." · "Tch — amateurs." · "Allez, allez!"

## Example lines
- "You purged my people. Let me show you what we left behind."
- "I've got grenades older than your courage."
- "Cover? That's adorable. Watch."
- "This one's for her. They're all for her."

> Lighting a fuse off a borrowed cigarette: "Run if you want. I'm staying for the show."`,

      opportunities: `# An Arsenal With a Grudge

- **M3 submachine gun** — chew through cover; lethal when you're **flanking**.
- **Cut-down Lee Enfield** — brutal in **close quarters**.
- **Smoke grenades** — screen a **cover advance** for the whole squad.
- **Firebombs** — turn a chokepoint into a **firetrap**.
- **Panzerfaust** — for the **armoured target** nothing else can touch.
- **Dynamite** — the answer to any **demolitions** Objective, and most arguments.

## Tricks
- **Sapper** — using explosives drops an Objective or Threat's Challenge by 1. Open the door for everyone.
- **Scavenger** — roll to restore a spent weapon mid-fight; keep the storm going.
- **Blink** — shadows in, shadows out; perfect for **infiltration** and impossible escapes.
- **Rat Swarm / Pitch Black** — when you want the **filth** and the dark on your side.

> "Every lock is a door. Every wall is a suggestion. Every nazi is a countdown."`,

      voice: `# Speaking Like Nicole

**Accent:** French — working-class Resistance, not café society. Quick, clipped, a little rough.

**How she talks:**
- **Short sentences** — orders, not conversations.
- **French interjections** — "merde", "allez", "on y va", a "putain" under her breath.
- **Gallows humour** — the darker the moment, the drier the joke.
- **Grief just under the surface** — it leaks out when she goes quiet.

**Cadence:** Fast and impatient, then suddenly still when she's aiming — or remembering.

**Attitude in every line:** Speak like someone with nothing left to lose and one more bomb to plant.

> "Talk later. We are not finished here."`,
    },
  },

  {
    key: 'cosgrave',
    name: 'Cosgrave',
    concept: 'Hackney necromancer',
    notes:
      'Taught by your aunt. Medically dead, but can still walk around and that. On the run from East London’s undead mafia. Crooked as a three bob note, but charming with it. Lots of weird black magic tricks.',
    stats: { brawl: 2, con: 3, fix: 3, search: 2, shoot: 2, sneak: 3, terrify: 2 },
    equipment: [
      { name: 'Enormous knife', tags: '+never saw you coming', neverRunsOut: true },
      { name: 'Sawn-off shotgun', tags: '++point-blank', uses: 2 },
      { name: 'Bottled ghosts', tags: '++pass through walls', uses: 3 },
      { name: "Mother Millicent's stolen soul jar", tags: '+++any', uses: 1 },
    ],
    abilities: [
      { name: 'Danse Macabre', effect: 'Spend 1 Blood: gain full control of a corpse for around a minute, after which it falls apart. (+"Hans, are you okay?")', bloodCost: 1 },
      { name: 'Back-Pocket Hex', effect: "SPECIAL: reduce a Threat's Attack rating by 1.", isSpecial: true },
      { name: 'Phantasmagoria', effect: 'Spend 1 Blood: conjure nightmare illusions in the area immediately around you. (+incorporates the background in a clever way)', bloodCost: 1 },
    ],
    advances: [
      { name: 'Memory Rot', effect: 'Spend 1 Blood: remove or implant memories from someone you lock eyes with. (+you were never here)', bloodCost: 1 },
      { name: 'Death Burst', effect: "Spend 1 Blood: curse a nazi within arm's reach to explode when they die. (++enclosed spaces)", bloodCost: 1 },
      { name: "Dead Man's Luck", effect: "After you roll your dice pool, before you discard, reduce the GM's successful Attack dice by 1 for each 1 you rolled." },
    ],
    injuries: {
      'light-1-2': { label: 'Lost Some Fingers' },
      'severe-1-2': { label: 'Arm Ripped Off', penalty: '-1 to all stats' },
      'light-3-4': { label: 'Sucking Chest Wound' },
      'severe-3-4': { label: 'Shot in the Face', penalty: '+2 TERRIFY, -2 CON' },
      'light-5-6': { label: 'Grimoire Damaged' },
      'severe-5-6': { label: 'Wards Compromised', penalty: "Can't spend Blood to use abilities" },
    },
    lastStand: { actionName: 'Undead Horde' },
    rp: {
      tips: `# Roleplaying Cosgrave

**Who you are:** A charming, cocky, unflappable East End necromancer. You crack jokes in the face of horror and pretend you've got it all under control — you usually don't.

**What drives you:**
- Survive (you're already dead, but still)
- Get rich, or richer
- Outwit everyone in the room
- Keep Mother Millicent quiet (impossible)

**Your relationship with Millicent:** Equal parts love, fear, and resentment. She's your greatest asset and your most constant problem.

**RP traits:** Cocky · Funny · Streetwise · Secretly insecure · Loyal to the team · Pragmatic · Hides real feelings behind humour.

## Soul Jar commands (the basics)
- **Uncork it.** Release the spirit.
- **Give it a task.** Be brief and specific.
- **Let it do the work.** Ghosts go where you can't.
- **Call it back.** Seal it again when the job's done.
- **Show some respect.** Or at least pretend to — they remember.

## Soul Jar tips
- Ghosts have personalities. Talk to them.
- Some are helpful, some are company, some are complete bastards.
- Keep your jars tight — spilled ghosts are a real inconvenience.
- Label your jars. Trust us.
- The more powerful the ghost, the more care it needs.
- Aunt Millicent disapproves of mistakes.

## Ghost etiquette & care
- Be polite (mostly). Keep your promises. Don't let them rot.
- A frightened ghost is a useless ghost.
- Store jars somewhere cool and dark. Don't drop them, don't crack the seal, and **don't** anger Millicent.

> **Remember:** A good commander uses every resource. A great commander uses the dead. Make them work for the living.`,

      phrases: `# Words & Lines

## Useful words & phrases
"Bloody hell" · "Mate" · "Mental" · "We'll sort it" · "Fair enough" · "Cheers" · "Right then" · "What could possibly go wrong?"

## Example lines
- "Right then. Let's get the bonnet up and have a look."
- "Don't worry, I've got a plan. Several, actually — one of 'em might even work."
- "Could be worse. Give it a minute."
- "'Ere, hold this. And don't let it bite you."

## Banter with Millicent
- **Confrontation —** *Cosgrave:* "Mate, you really thought that'd work?" · *Millicent:* "Coward. They always cower."
- **Tactical —** *Millicent:* "Take the left passage, you fool." · *Cosgrave:* "Left it is. She's usually right. Don't tell her."
- **Humour —** *Millicent:* "I believe the phrase you're looking for is 'catastrophic failure.'"

> *Millicent, almost fondly:* "Just try not to die before I'm finished with you."`,

      opportunities: `# Creative Ways to Use Bottled Ghosts

- **Scout ahead** — send a ghost through walls, round corners, or into guarded areas to report back.
- **Pass through walls** — slip a ghost through solid matter for keys, documents, or sabotage.
- **Create distractions** — noises, flickering lights, cold spots to confuse the enemy.
- **Possess corpses** — pair with *Danse Macabre* to let a ghost ride along for extra control.
- **Interrogate the dead** — pull information from soldiers, victims, or the recently deceased.
- **Deliver messages** — instructions, warnings, or taunts.
- **Trigger traps** — send a ghost in first to spring warded magic safely.
- **Haunt & demoralize** — fear, paranoia and unrest through enemy ranks over time.
- **Power your magic** — burn spirits as fuel for rituals, illusions and necromantic effects.
- **Favours & bargains** — free a ghost temporarily in exchange for a future service.

## Mother Millicent's stolen soul jar
- **Occult consultation** — ask about rituals, curses, hauntings and history.
- **Tactical advice** — she sees what you miss: the room, the spirits, the enemy.
- **Detect supernatural threats** — ghosts, traps, rituals, dark energies.
- **Amplify your magic** — use her as a focus to strengthen spells.
- **Ghost control & command** — she cows weaker spirits and pries out answers.
- **Emergency override** — in a real crisis she can take over and act through you.

## Collecting more ghosts
- **Battlefields** — the dead are plentiful.
- **Haunted places** — ruins, crypts, churches.
- **Bargains** — offer freedom or revenge.
- **Millicent's methods** — best not to ask.

> *Millicent's warning:* "You treat these souls like coins in a pouch. Don't forget they were once people — with memories, loyalties and grievances. So am I."`,

      voice: `# Speaking Like Cosgrave

**Accent:** East London / cockney. Casual, quick, a little raspy — like he's seen it all and isn't impressed.

**How he talks:**
- **Drop your T's** — "bo'le" not "bottle", "wha'?" not "what".
- **Drop your H's** — "'ello", "'ere", "'ouse", "'ave a look".
- **Keep it casual** — clipped, conversational, never formal.
- **Slight rasp, slight smirk** — always sounds like he's half-joking.

**Cadence:** Easy and unhurried, even when everything's on fire. He narrates danger like it's mildly inconvenient.

**Attitude in every line:** Talk like a man completely unbothered by supernatural horror who always has a plan. (He might be lying. He probably is.)

> *Parting thought, M. Cosgrave:* "If you've read all this, you've already done something idiotic. I expect you to keep going."`,
    },
  },

  {
    key: 'chuck',
    name: 'Chuck',
    concept: 'Corpse-eating cowpoke',
    notes:
      'Grew up on the wrong side of the tracks, buried a sibling or two. Loves cowboy movies, honest work, human liver and the wide open plains. Genuinely decent guy, apart from the "eating people" bit. F.A.N.G. pulled you out of jail after you ate a county sheriff and half his deputy. Now you’re fighting for freedom, rather than just to survive.',
    stats: { brawl: 3, con: 1, fix: 4, search: 2, shoot: 3, sneak: 2, terrify: 2 },
    equipment: [
      { name: 'Paired revolvers, Betsy and Maria', tags: '+duel', neverRunsOut: true },
      { name: 'Tool belt', tags: '+Jerry-rigging', neverRunsOut: true },
      { name: 'Cowboy hat', tags: 'mark to ignore an Injury or being Downed; hat is destroyed', uses: 1 },
    ],
    abilities: [
      { name: 'Acid Spit', effect: 'Spend 1 Blood: hawk up a gutful of fierce acid. (++vs metal)', bloodCost: 1 },
      { name: 'Spider Scurry', effect: 'Spend 1 Blood: skitter across ceilings and up walls. (+low ceilings)', bloodCost: 1 },
      { name: 'Corpse Eater', effect: 'After you roll your dice pool, before you discard, gain 1 Blood if you rolled any 1s.' },
    ],
    advances: [
      { name: 'Elbow Grease', effect: 'When you take on an Objective single-handed with FIX, SPECIAL: reduce the Objective’s rating by 4.', isSpecial: true },
      { name: 'Corrosive Fluids', effect: 'When you mark an Injury, reduce the rating of a Threat you’re engaged with by 2.' },
      { name: 'Lashing Tongue', effect: 'Spend 1 Blood: your strong, prehensile tongue extends several yards out of your mouth. (+restrain)', bloodCost: 1 },
    ],
    injuries: {
      'light-1-2': { label: 'Flesh Wound' },
      'severe-1-2': { label: 'Shot Fulla Holes', penalty: 'Spend 1 Blood at the start of your turn' },
      'light-3-4': { label: 'Limping' },
      'severe-3-4': { label: 'Crawling', penalty: '-1 to all stats' },
      'light-5-6': { label: 'Mauled' },
      'severe-5-6': { label: 'Eviscerated', penalty: "Can't use + dice" },
    },
    lastStand: { actionName: 'Go Down Shooting' },
    rp: {
      tips: `# Roleplaying Chuck

**Who you are:** The nicest fella you'll ever meet, who also eats people. A hard-luck cowpoke who buried his kin, loves honest work and cowboy pictures, and happens to need human liver to keep going. F.A.N.G. sprung you from jail; now you point the appetite at nazis and call it square.

**What drives you:**
- Be a good man despite the hunger
- Honest work, done right
- Protect the folks beside you
- Aim the monster at people who've earned it

**How to play him:** Warm, polite, unbothered. Apologise before and after the violence. Treat the apocalypse like a tough day's ranching. The contrast between his manners and his menu is the whole joke.

## Signature style
- **FIX 4** — Chuck fixes things. Take the engineering Objectives single-handed (**Elbow Grease**).
- **Corpse Eater** turns bad rolls into Blood — lean into the mess.
- **Acid Spit** and that **lashing tongue** make him weirder than he lets on.
- The **cowboy hat** is one last save — burn it to shrug off going Down.

> "Nothin' personal, partner. Well — little bit personal."`,

      phrases: `# Words & Lines

## His
"Howdy." · "Much obliged." · "Well, shoot." · "Easy now." · "Ma'am. Sir." · "Reckon that'll do."

## Example lines
- "Didn't catch your name. Won't need it."
- "My mama raised me right. Then she raised me hungry."
- "Hold still — this is the polite version."
- "I surely am sorry about your sheriff. And your deputy. And… most of your county."

> Tipping his hat over a ruined patrol: "Obliged for the meal, gentlemen."`,

      opportunities: `# Honest Work, Unusual Tools

- **Betsy & Maria** (paired revolvers) — call your shot in a **duel** and take it.
- **Tool belt** — **Jerry-rig** a fix for damn near anything; this is where FIX shines.
- **Cowboy hat** — mark it to ignore an Injury or being Downed (you only get the one; the hat doesn't survive).
- **Acid Spit** — melt locks, hinges and armour; nasty **vs metal**.
- **Spider Scurry** — up the walls and across the **low ceilings** nobody's watching.
- **Lashing Tongue** — a several-yard tongue to **restrain**, grab or trip.

## Signature moves
- **Elbow Grease** — roll up your sleeves and finish a FIX Objective single-handed, dropping it by 4.
- **Corpse Eater / Corrosive Fluids** — turn your worst rolls and fresh wounds into Blood and damage. The hungrier it gets, the meaner you fight.

> "Give me a wrench, a wall, and a minute. I'll make us a door."`,

      voice: `# Speaking Like Chuck

**Accent:** American Western drawl — slow, easy, friendly. A range-hand, not a gunslinger ham.

**How he talks:**
- **Folksy and polite** — "howdy", "much obliged", "reckon", "ma'am", "partner".
- **Soft-spoken** even mid-fight; the calm makes the carnage worse.
- **Apologetic** — he genuinely feels bad about the eating. A little.
- **Drops g's** — "nothin'", "fixin'", "huntin'".

**Cadence:** Unhurried, a touch weary, like a man telling a long story on a porch.

**Attitude in every line:** Speak like the kindest man at the worst dinner party — who is also the main course's problem.

> "No call to be rude about it. We're all just tryin' to get through the night."`,
    },
  },

  {
    key: 'astrid',
    name: 'Astrid',
    concept: 'Spirit-bound ex-fighter pilot',
    notes:
      'Bitten by something after a crash in the frozen taiga. The parasite soul of a wild predator is nestled around your heart. Ancient magic flows in your blood and wild spirits bow to you. (But in case that fails, you also have a machine gun.)',
    stats: { brawl: 3, con: 1, fix: 2, search: 3, shoot: 2, sneak: 2, terrify: 4 },
    equipment: [
      { name: 'Machine Gun', tags: '+enemies in cover', uses: 3 },
      { name: 'Greatspear', tags: '+receive a charge', neverRunsOut: true },
      { name: 'Fragmentation Grenades', tags: '++enclosed spaces', uses: 2 },
      { name: 'Spirit Fetters', tags: '+++animals', uses: 2 },
    ],
    abilities: [
      { name: 'Apex Predator', effect: "SPECIAL: reduce a Threat's rating by 3.", isSpecial: true },
      { name: 'Unnatural Endurance', effect: "SPECIAL: reduce the GM's Attack dice by 3.", isSpecial: true },
      { name: 'Bloodhunt', effect: 'Spend 1 Blood: track targets or search for things using your sense of smell. (+target fleeing)', bloodCost: 1 },
    ],
    advances: [
      { name: 'Nightmare Regeneration', effect: 'SPECIAL: clear a marked Injury.', isSpecial: true },
      { name: 'Spirit Storm', effect: 'Spend 1 Blood: hurl items like a poltergeist. (++something sharp AND heavy)', bloodCost: 1 },
      { name: 'Tethered Phantom', effect: 'Spend 1 Blood: reduce an Objective or Threat’s Challenge by 1 until the end of the round.', bloodCost: 1 },
    ],
    injuries: {
      'light-1-2': { label: 'Spirits Cowed' },
      'severe-1-2': { label: 'Spirits Cast Out', penalty: "Can't trigger Specials" },
      'light-3-4': { label: 'Sigils Marred' },
      'severe-3-4': { label: 'Bleeding Shadows', penalty: '+2 SNEAK, -2 TERRIFY' },
      'light-5-6': { label: 'Limping' },
      'severe-5-6': { label: 'Ruined Leg', penalty: '-1 to all stats' },
    },
    lastStand: { actionName: 'Unleash the Spirits' },
    rp: {
      tips: `# Roleplaying Astrid

**Who you are:** A fighter pilot who fell into the frozen taiga and came back wearing a predator's soul. Ancient spirits answer to you now; the beast in your chest answers to nothing. You speak little and hunt well. (And when the magic won't do, there's the machine gun.)

**What drives you:**
- Feed the predator without losing yourself
- Honour the spirits that saved — and claimed — you
- Hunt the worst prey the world has to offer
- Stay the hunter, never the hunted

**How to play her:** Quiet, intense, elemental. You read a room like a forest — wind, scent, weakness. You don't threaten; you simply decide, and then it's done.

## Signature style
- **Apex Predator** and **Unnatural Endurance** are crushing SPECIALs — set them up and break the encounter open.
- **Bloodhunt** by scent: find the fleeing, the hidden, the marked.
- **Nightmare Regeneration** clears Injuries — the beast does not stay wounded.
- Spirits for the subtle work; the machine gun for everything else.

> "The forest sent me. You should not have run."`,

      phrases: `# Words & Lines

## Hers
"I smell fear." · "The spirits are restless." · "Hold." · "Prey." · "It is already done." · "Quiet now."

## Example lines
- "I have hunted wolves, men, and worse things in the dark. You are not worse things."
- "The taiga took my name and gave me teeth. Fair trade."
- "Do not run. It wakes the other one."
- "Spirits, attend. There is work."

> Low, almost gentle, to a cornered enemy: "Be still. This is the kind part."`,

      opportunities: `# The Hunter and Her Spirits

- **Machine Gun** — punish **enemies in cover**; the loud answer.
- **Greatspear** — set to **receive a charge** and let them impale themselves.
- **Fragmentation Grenades** — devastating in **enclosed spaces**.
- **Spirit Fetters** — bind and command, strongest among **animals** and wild things.

## The predator's gifts
- **Apex Predator** — SPECIAL: gut a Threat's rating by 3.
- **Unnatural Endurance** — SPECIAL: shrug off the GM's Attack dice by 3.
- **Bloodhunt** — track by scent; ideal when a **target is fleeing**.
- **Spirit Storm / Tethered Phantom** — hurl the world like a poltergeist and choke an enemy's Challenge.
- **Nightmare Regeneration** — clear a marked Injury; the hunt continues.

> "Spirits open the door. The beast walks through it."`,

      voice: `# Speaking Like Astrid

**Accent:** Nordic / northern — cold, even, deliberate. Few words, each one weighed.

**How she talks:**
- **Sparse and blunt** — sentences trimmed to the bone.
- **Predator imagery** — scent, wind, prey, the hunt, the forest.
- **Two voices** — her own calm, and the beast's growl beneath it.
- **No wasted emotion** — she states; she does not plead or boast.

**Cadence:** Slow, low, certain. Long silences. She speaks the way snow falls.

**Attitude in every line:** Speak like something old and patient that has already decided how this ends.

> "Talk is wind. The hunt is real."`,
    },
  },

  {
    key: 'flint',
    name: 'Flint',
    concept: 'Half-bat nightmare hunter',
    notes:
      'Born in a cave, driven out by nazis. Half-bat, half-human, all nightmare. Monstrous hunter with a taste for blood. May or may not be able to talk (possibly just shy).',
    stats: { brawl: 4, con: 2, fix: 2, search: 2, shoot: 1, sneak: 3, terrify: 3 },
    equipment: [
      { name: 'Steel gouging claws', tags: '+ambush', neverRunsOut: true },
      { name: 'Grappling hook', tags: '++three or more storeys', neverRunsOut: true },
    ],
    abilities: [
      { name: 'Ravenous', effect: "When you're in melee combat, SPECIAL: gain 3 Blood.", isSpecial: true },
      { name: 'Sense Heartbeat', effect: 'Spend 1 Blood: see the heartbeats of living beings through walls and obstacles. (+dense cover)', bloodCost: 1 },
      { name: 'Improvised Projectile', effect: 'Spend 1 Blood: chuck something large and heavy a surprising distance. (+aerodynamic)', bloodCost: 1 },
      { name: 'Wings', effect: 'Spend 1 Blood: you can fly. (+aerial combat)', bloodCost: 1 },
    ],
    advances: [
      { name: 'Hellish Screech', effect: "Spend 2 Blood: reduce a Threat's Challenge by 1.", bloodCost: 2 },
      { name: 'Bone Armour', effect: "After you roll your dice pool, before you discard, reduce the GM's successful Attack dice by 1 for each 1 you rolled." },
      { name: 'Ooze Form', effect: "Spend 1 Blood: squeeze through gaps, glop around, etc. (+it's in the walls!)", bloodCost: 1 },
    ],
    injuries: {
      'light-1-2': { label: 'Teeth Smashed' },
      'severe-1-2': { label: 'Jaw Broken', penalty: "Can't gain Blood from nazis" },
      'light-3-4': { label: 'Spooked' },
      'severe-3-4': { label: 'Broken', penalty: '+2 SEARCH, -2 BRAWL' },
      'light-5-6': { label: 'Hamstrung' },
      'severe-5-6': { label: 'Eviscerated', penalty: "Can't use + dice" },
    },
    lastStand: { actionName: 'Final Form' },
    rp: {
      tips: `# Roleplaying Flint

**Who you are:** Born in a cave, driven into the war. Half-bat, half-human, all nightmare — a monstrous hunter the nazis mistook for a story. You may be able to talk. You may just be shy. Either way, you let the claws and the dark do most of the conversing.

**What drives you:**
- Hunt. Feed. Protect the few you trust.
- Repay the ones who drove you from your home
- Belong somewhere — even a squad of monsters
- Stay free, stay airborne, stay fed

**How to play him:** Physical and primal. Lead with body language, not banter. Loom in the dark, drop from the ceiling, vanish before anyone's sure you were there. Let the table feel him before they see him.

## Signature style
- **BRAWL 4** — you are the close-up nightmare. Open with **ambush**.
- **Ravenous** floods you with Blood in melee — get in close and stay there.
- **Sense Heartbeat** sees prey through walls; **Wings** put you anywhere.
- **Grappling hook** + flight = you own the **high storeys** and the rafters.

> *(He does not answer. The lights go out instead.)*`,

      phrases: `# Words & Lines

Flint barely speaks — so most of his "lines" are sounds, gestures, and the rare broken word. Play them at the table as description as much as dialogue.

## The vocabulary of a monster
- A high, chittering **screech** (echolocating — or just enjoying himself)
- A low **hiss** that means *back away*
- A wet **click-click-click** from the dark before he strikes
- A single rasped word when it truly matters: **"Mine."** · **"No."** · **"Run."**

## Rare full sentences (use sparingly, for impact)
- "…friend?" *(hopeful, to a squadmate)*
- "Smell. Their. Fear." *(broken, delighted)*
- "Cave. Mine. Gone." *(the closest he comes to grief)*

> When words won't come, narrate the wings, the eyes, the silence. That's his voice.`,

      opportunities: `# Claws, Wings, and the Dark

- **Steel gouging claws** — the whole point; devastating on the **ambush**.
- **Grappling hook** — reach and cross **three or more storeys**; own the vertical fight.
- **Wings** — fly; dominate **aerial combat** and drop in from anywhere.
- **Sense Heartbeat** — see living prey through **dense cover** and walls.
- **Improvised Projectile** — hurl something large, heavy and **aerodynamic** across the room.
- **Ooze Form** — pour through gaps when **it's in the walls!**

## Apex moves
- **Ravenous** — SPECIAL: gain 3 Blood whenever you're in melee. Stay in the thick of it.
- **Hellish Screech / Bone Armour** — break a Threat's Challenge and turn your stray 1s into armour.

> Hunt from above. Strike from the dark. Be gone before the screaming stops.`,

      voice: `# Speaking Like Flint

**"Accent":** Mostly none. Flint is barely verbal — his voice is sound and motion, not sentences.

**How he communicates:**
- **Screeches, hisses, clicks** — echolocation, warning, glee.
- **Body language first** — looming, head-tilts, bared teeth, mantled wings.
- **Broken fragments** — one or two rasped words, present tense, no grammar: "Mine." "Run." "Friend?"
- **Long, unsettling silence** — let others fill it, then move.

**Cadence (when he does speak):** Halting, rough, like a voice that doesn't get used much.

**Attitude:** Play the gap between monster and shy creature — terrifying one beat, almost tender the next. Lead with description; save words for when silence isn't enough.

> *(A screech from the rafters. Then nothing. Then closer.)*`,
    },
  },
]

export function getPregen(key) {
  return PREGENS.find((p) => p.key === key) || null
}
