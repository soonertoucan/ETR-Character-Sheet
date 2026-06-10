import { useStore } from '../../store/StoreContext.jsx'
import { useDice } from '../dice/DiceContext.jsx'
import { STAT_KEYS, STAT_LABELS, STAT_HINTS } from '../../store/factory'

export default function Stats() {
  const { activeCharacter, updateActive } = useStore()
  const { rollAndCopy } = useDice()
  const stats = activeCharacter.stats

  const setStat = (key, value) => {
    const n = Math.max(0, Math.min(10, Math.floor(Number(value) || 0)))
    updateActive((c) => ({ ...c, stats: { ...c.stats, [key]: n } }))
  }

  return (
    <div className="panel stats">
      <h2>Stats</h2>
      <p className="hint">Rating = number of d6 you roll. Click 🎲 to roll that pool.</p>
      <div className="stat-grid">
        {STAT_KEYS.map((key) => (
          <div className="stat-row" key={key}>
            <span className="stat-name" title={STAT_HINTS[key]}>
              {STAT_LABELS[key]}
            </span>
            <div className="stat-controls">
              <button
                className="step"
                onClick={() => setStat(key, stats[key] - 1)}
                aria-label={`Decrease ${STAT_LABELS[key]}`}
              >
                −
              </button>
              <input
                type="number"
                min="0"
                max="10"
                value={stats[key]}
                onChange={(e) => setStat(key, e.target.value)}
              />
              <button
                className="step"
                onClick={() => setStat(key, stats[key] + 1)}
                aria-label={`Increase ${STAT_LABELS[key]}`}
              >
                +
              </button>
            </div>
            <button
              className="btn small blood roll-stat"
              onClick={() => rollAndCopy(stats[key], `${STAT_LABELS[key]} (${stats[key]}d6)`)}
              title={`Roll ${stats[key]}d6 and copy /r ${stats[key]}d6`}
            >
              🎲 {stats[key]}d6
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
