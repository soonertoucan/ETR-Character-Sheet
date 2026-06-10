// Factories for new characters and their sub-objects.
// Mirrors docs/DATA_MODEL.md.

export const STAT_KEYS = ['brawl', 'con', 'fix', 'search', 'shoot', 'sneak', 'terrify']

export const STAT_LABELS = {
  brawl: 'Brawl',
  con: 'Con',
  fix: 'Fix',
  search: 'Search',
  shoot: 'Shoot',
  sneak: 'Sneak',
  terrify: 'Terrify',
}

export const STAT_HINTS = {
  brawl: 'Kill nazis up close.',
  con: 'Sway nazis with lies, flattery or charisma.',
  fix: 'Repair or modify devices and structures.',
  search: 'Investigate to uncover information.',
  shoot: 'Kill nazis at a distance.',
  sneak: 'Avoid detection and minimise disruption.',
  terrify: 'Scare nazis into compliance.',
}

export const BLOOD_MAX = 10

export const INJURY_BANDS = ['1-2', '3-4', '5-6']
export const INJURY_ROWS = ['light', 'severe']

export const RP_TABS = ['tips', 'phrases', 'opportunities', 'voice']

export const RP_TAB_LABELS = {
  tips: 'RP Tips',
  phrases: 'Phrases',
  opportunities: 'Opportunities',
  voice: 'Voice',
}

const RP_PLACEHOLDERS = {
  tips: '# RP Tips\n\nWrite or paste roleplay tips for this character here.\n\n_Authoring-time AI: generate rich Markdown elsewhere and paste it in._',
  phrases: '# Phrases\n\n- "Catchphrase one."\n- "Catchphrase two."',
  opportunities: '# Opportunities\n\nMoments and hooks to lean into during play.',
  voice: '# Voice\n\nHow to speak in this character\'s voice — accent, cadence, vocabulary, attitude.',
}

// crypto.randomUUID is available in all modern browsers and Node 19+.
export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  // Fallback (older environments / tests)
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function nowISO() {
  return new Date().toISOString()
}

export function blankEquipment() {
  return {
    id: uid(),
    name: '',
    uses: { total: 1, spent: 0 },
    tags: '',
    neverRunsOut: false,
  }
}

export function blankAbility() {
  return { id: uid(), name: '', effect: '', isSpecial: false, bloodCost: null }
}

export function blankAdvance() {
  return { id: uid(), unlocked: false, name: '', bloodCost: null, effect: '' }
}

function defaultInjuries() {
  const out = []
  for (const row of INJURY_ROWS) {
    for (const band of INJURY_BANDS) {
      out.push({
        id: `${row}-${band}`,
        row,
        band,
        label: '',
        penalty: '',
        marked: false,
      })
    }
  }
  return out
}

function defaultRP() {
  const rp = {}
  for (const key of RP_TABS) {
    rp[key] = { format: 'markdown', content: RP_PLACEHOLDERS[key] }
  }
  return rp
}

export function blankCharacter(overrides = {}) {
  const ts = nowISO()
  return {
    id: uid(),
    name: 'New Vampire',
    concept: '',
    notes: '',
    portrait: null,
    stats: { brawl: 2, con: 2, fix: 2, search: 2, shoot: 2, sneak: 2, terrify: 2 },
    blood: { current: 0, max: BLOOD_MAX },
    equipment: [blankEquipment()],
    loot: '',
    abilities: [blankAbility()],
    advances: [],
    injuries: defaultInjuries(),
    lastStand: { actionName: '', catastrophicEffect: '' },
    rp: defaultRP(),
    createdAt: ts,
    updatedAt: ts,
    ...overrides,
  }
}

export function blankAppState() {
  const first = blankCharacter()
  return {
    version: 1,
    activeCharacterId: first.id,
    characters: [first],
    settings: { theme: 'default' },
  }
}
