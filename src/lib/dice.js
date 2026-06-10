// Dice logic for Eat the Reich.
// Player dice: 1-3 discard, 4-5 = success, 6 = critical.
// (GM/Threat dice use 4+ as success and have no special 6s; the player sheet
//  only rolls player dice, so we classify against the player ruleset.)

export function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}

export function classify(value) {
  if (value === 6) return 'critical'
  if (value >= 4) return 'success'
  return 'miss'
}

// Roll a pool of `count` d6. Returns { dice:[{value,result}], successes, criticals }.
export function rollPool(count) {
  const n = Math.max(0, Math.min(50, Math.floor(count) || 0))
  const dice = []
  let successes = 0
  let criticals = 0
  for (let i = 0; i < n; i++) {
    const value = rollDie()
    const result = classify(value)
    if (result === 'critical') criticals++
    else if (result === 'success') successes++
    dice.push({ value, result })
  }
  return { dice, successes, criticals, count: n }
}

// Roll20 chat string for a pool of N d6.
export function roll20String(count) {
  return `/r ${Math.max(0, Math.floor(count) || 0)}d6`
}

export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
