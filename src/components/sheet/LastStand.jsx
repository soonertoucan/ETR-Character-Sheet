import { useStore } from '../../store/StoreContext.jsx'
import { useDice } from '../dice/DiceContext.jsx'

export default function LastStand() {
  const { activeCharacter, updateActive } = useStore()
  const { rollAndCopy } = useDice()
  const ls = activeCharacter.lastStand

  return (
    <div className="panel laststand">
      <h2>Last Stand (8D6)</h2>
      <p className="hint">
        When all six Injuries are marked, you die. Narrate a catastrophic finish, roll 8D6, and
        allocate them to current Objectives and Threats however you like.
      </p>
      <div>
        <label htmlFor="ls-name">Action name</label>
        <input
          id="ls-name"
          type="text"
          value={ls.actionName}
          onChange={(e) =>
            updateActive((c) => ({
              ...c,
              lastStand: { ...c.lastStand, actionName: e.target.value },
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="ls-effect">Catastrophic final effect</label>
        <textarea
          id="ls-effect"
          rows={3}
          value={ls.catastrophicEffect}
          onChange={(e) =>
            updateActive((c) => ({
              ...c,
              lastStand: { ...c.lastStand, catastrophicEffect: e.target.value },
            }))
          }
        />
      </div>
      <button
        className="btn blood"
        onClick={() => rollAndCopy(8, `Last Stand: ${ls.actionName || 'Final Sacrifice'} (8d6)`)}
      >
        🎲 Roll Last Stand — 8d6
      </button>
    </div>
  )
}
