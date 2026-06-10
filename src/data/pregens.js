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
  },
]

export function getPregen(key) {
  return PREGENS.find((p) => p.key === key) || null
}
