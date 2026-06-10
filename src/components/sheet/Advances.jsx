import { useStore } from '../../store/StoreContext.jsx'
import { blankAdvance } from '../../store/factory'

export default function Advances() {
  const { activeCharacter, updateActive } = useStore()
  const advances = activeCharacter.advances

  const patch = (id, p) =>
    updateActive((c) => ({
      ...c,
      advances: c.advances.map((a) => (a.id === id ? { ...a, ...p } : a)),
    }))

  const add = () =>
    updateActive((c) => ({ ...c, advances: [...c.advances, blankAdvance()] }))

  const remove = (id) =>
    updateActive((c) => ({ ...c, advances: c.advances.filter((a) => a.id !== id) }))

  return (
    <div className="panel advances">
      <h2>Advances</h2>
      <p className="hint">Unlock with XP. Tick the box once unlocked.</p>

      <div className="advance-list">
        {advances.length === 0 && <p className="muted">No advances yet.</p>}
        {advances.map((a) => (
          <div className={`advance-item ${a.unlocked ? 'unlocked' : 'locked'}`} key={a.id}>
            <div className="advance-head">
              <label className="inline-check" title="Unlocked with XP">
                <input
                  type="checkbox"
                  checked={a.unlocked}
                  onChange={(e) => patch(a.id, { unlocked: e.target.checked })}
                />
              </label>
              <input
                type="text"
                className="advance-name"
                placeholder="Advance name"
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
        + Add Advance
      </button>
    </div>
  )
}
