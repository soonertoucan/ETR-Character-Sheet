// Central app store: localStorage-backed React context.
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { blankCharacter, uid } from './factory'
import { loadState, saveState } from './persistence'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  const saveTimer = useRef(null)

  // Debounced persistence so rapid edits (typing) don't thrash localStorage.
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => saveState(state), 250)
    return () => saveTimer.current && clearTimeout(saveTimer.current)
  }, [state])

  const api = useMemo(() => {
    const activeCharacter = () =>
      state.characters.find((c) => c.id === state.activeCharacterId) || null

    // Apply a partial update (or updater fn) to the active character.
    const updateActive = (patch) =>
      setState((s) => {
        const id = s.activeCharacterId
        if (!id) return s
        return {
          ...s,
          characters: s.characters.map((c) => {
            if (c.id !== id) return c
            const next = typeof patch === 'function' ? patch(c) : { ...c, ...patch }
            next.updatedAt = new Date().toISOString()
            return next
          }),
        }
      })

    const selectCharacter = (id) =>
      setState((s) => ({ ...s, activeCharacterId: id }))

    const addCharacter = (overrides) =>
      setState((s) => {
        const c = blankCharacter(overrides)
        return { ...s, characters: [...s.characters, c], activeCharacterId: c.id }
      })

    // Add an already-prepared character object (e.g. built by the creation wizard
    // via blankCharacter/characterFromTemplate). Ensures it has an id and becomes active.
    const createCharacter = (charObj) =>
      setState((s) => {
        const c = charObj?.id ? charObj : blankCharacter(charObj || {})
        return { ...s, characters: [...s.characters, c], activeCharacterId: c.id }
      })

    const duplicateCharacter = (id) =>
      setState((s) => {
        const src = s.characters.find((c) => c.id === id)
        if (!src) return s
        const clone = structuredClone(src)
        // Drop identity/timestamps so blankCharacter mints fresh ones.
        delete clone.id
        delete clone.createdAt
        delete clone.updatedAt
        const copy = blankCharacter({ ...clone, name: `${src.name} (copy)` })
        return { ...s, characters: [...s.characters, copy], activeCharacterId: copy.id }
      })

    const deleteCharacter = (id) =>
      setState((s) => {
        const characters = s.characters.filter((c) => c.id !== id)
        const activeCharacterId =
          s.activeCharacterId === id ? characters[0]?.id ?? null : s.activeCharacterId
        return { ...s, characters, activeCharacterId }
      })

    // Import a single character object from a file, adding it to the roster (a "merge").
    // Fills any fields missing from older exports, and avoids id collisions.
    const importCharacter = (charObj) =>
      setState((s) => {
        const base = blankCharacter()
        const collision = charObj?.id && s.characters.some((c) => c.id === charObj.id)
        const id = !charObj?.id || collision ? uid() : charObj.id
        const merged = {
          ...base,
          ...charObj,
          id,
          journal: Array.isArray(charObj?.journal) ? charObj.journal : [],
          rp: charObj?.rp || base.rp,
        }
        return { ...s, characters: [...s.characters, merged], activeCharacterId: id }
      })

    const replaceState = (newState) => setState(newState)

    return {
      state,
      activeCharacter: activeCharacter(),
      updateActive,
      selectCharacter,
      addCharacter,
      createCharacter,
      duplicateCharacter,
      deleteCharacter,
      importCharacter,
      replaceState,
    }
  }, [state])

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
