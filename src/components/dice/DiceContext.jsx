import { createContext, useCallback, useContext, useState } from 'react'
import { rollPool, roll20String, copyToClipboard } from '../../lib/dice'

const DiceContext = createContext(null)

export function DiceProvider({ children }) {
  const [last, setLast] = useState(null) // { label, count, dice, successes, criticals }
  const [copied, setCopied] = useState(false)

  const roll = useCallback((count, label = '') => {
    const result = rollPool(count)
    setLast({ label, ...result })
    return result
  }, [])

  const copyRoll = useCallback(async (count) => {
    const ok = await copyToClipboard(roll20String(count))
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
    return ok
  }, [])

  // Roll AND copy the Roll20 string in one click (used by quick buttons).
  const rollAndCopy = useCallback(
    async (count, label = '') => {
      const result = roll(count, label)
      await copyRoll(count)
      return result
    },
    [roll, copyRoll],
  )

  return (
    <DiceContext.Provider value={{ last, copied, roll, copyRoll, rollAndCopy }}>
      {children}
    </DiceContext.Provider>
  )
}

export function useDice() {
  const ctx = useContext(DiceContext)
  if (!ctx) throw new Error('useDice must be used within a DiceProvider')
  return ctx
}
