// localStorage load/save + JSON export/import.
import { blankAppState } from './factory'

export const STORAGE_KEY = 'etr.appstate.v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return blankAppState()
    const parsed = JSON.parse(raw)
    return migrate(parsed)
  } catch (err) {
    console.error('Failed to load saved state, starting fresh:', err)
    return blankAppState()
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch (err) {
    // Most likely QuotaExceededError (large base64 portraits).
    console.error('Failed to save state:', err)
    return false
  }
}

// Hook for future schema changes. v1 is current.
function migrate(state) {
  if (!state || typeof state !== 'object') return blankAppState()
  if (!Array.isArray(state.characters) || state.characters.length === 0) {
    return blankAppState()
  }
  if (!state.activeCharacterId) {
    state.activeCharacterId = state.characters[0].id
  }
  if (!state.settings) state.settings = { theme: 'default' }
  if (!state.version) state.version = 1
  return state
}

// --- Export / Import ---

export function exportToJSON(state) {
  return JSON.stringify(state, null, 2)
}

// Returns a validated app-state or throws.
export function parseImportedJSON(text) {
  const parsed = JSON.parse(text)
  // Accept either a full app-state ({characters:[...]}) or a single character.
  if (parsed && Array.isArray(parsed.characters)) {
    return migrate(parsed)
  }
  if (parsed && parsed.stats && parsed.name !== undefined) {
    // Single character — wrap it.
    return migrate({ version: 1, activeCharacterId: parsed.id, characters: [parsed] })
  }
  throw new Error('Unrecognised file: expected an Eat the Reich export.')
}
