import { useStore } from '../../store/StoreContext.jsx'
import { blankAbility } from '../../store/factory'

export default function Abilities() {
  const { activeCharacter, updateActive } = useStore()
  const abilities = activeCharacter.abilities

  const patch = (id, p) =>
    updateActive((c) => ({
      ...c,
      abilities: c.abilities.map((a) => (a.id === id ? { ...a, ...p } : a)),
    }))

  const add = () =>
    updateActive((c) => ({ ...c, abilities: [...c.abilities, blankAbility()] }))

  const remove = (id) =>
    updateActive((c) => ({ ...c, abilities: c.abilities.filter((a) => a.id !== id) }))

  return (
    <div className="panel abilities">
      <h2>Blood Abilities</h2>
      <p className="hint">
        Using an ability adds +1 die and costs its listed Blood. Mark <strong>SPECIAL</strong> for
        abilities that only trigger when a critical (6) is allocated to them.
      </p>

      <div className="ability-list">
        {abilities.map((a) => (
          <div className="ability-item" key={a.id}>
            <div className="ability-head">
              <input
                type="text"
                className="ability-name"
                placeholder="Ability name"
                value={a.name}
                onChange={(e) => patch(a.id, { name: e.target.value })}
              />
              <label className="inline-num" title="Blood cost">
                🩸
                <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="—"
                  value={a.bloodCost ?? ''}
                  onChange={(e) =>
                    patch(a.id, {
                      bloodCost: e.target.value === '' ? null : Number(e.target.value),
                    })
                  }
                />
              </label>
              <label className="inline-check" title="Activates only on a critical">
                <input
                  type="checkbox"
                  checked={a.isSpecial}
                  onChange={(e) => patch(a.id, { isSpecial: e.target.checked })}
                />
                SPECIAL
              </label>
              <button className="icon-btn" title="Remove" onClick={() => remove(a.id)}>
                🗑
              </button>
            </div>
            <textarea
              rows={2}
              placeholder="Effect"
              value={a.effect}
              onChange={(e) => patch(a.id, { effect: e.target.value })}
            />
          </div>
        ))}
      </div>

      <button className="btn small" onClick={add}>
        + Add Ability
      </button>
    </div>
  )
}
