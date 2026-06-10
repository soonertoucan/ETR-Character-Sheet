import { useStore } from '../../store/StoreContext.jsx'
import { blankEquipment } from '../../store/factory'

function UsageBoxes({ item, onChange }) {
  if (item.neverRunsOut) {
    return <span className="uses-infinite">∞ uses</span>
  }
  const total = Math.max(0, Math.min(12, item.uses.total))
  const boxes = Array.from({ length: total }, (_, i) => i)
  return (
    <span className="uses-boxes">
      {boxes.map((i) => {
        const spent = i < item.uses.spent
        return (
          <button
            key={i}
            className={`use-box ${spent ? 'spent' : ''}`}
            title={spent ? 'Spent — click to restore' : 'Unused — click to spend'}
            onClick={() => onChange(spent ? i : i + 1)}
          >
            {spent ? '✕' : ''}
          </button>
        )
      })}
      {total === 0 && <span className="muted">no uses</span>}
    </span>
  )
}

export default function Equipment() {
  const { activeCharacter, updateActive } = useStore()
  const items = activeCharacter.equipment

  const patchItem = (id, patch) =>
    updateActive((c) => ({
      ...c,
      equipment: c.equipment.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }))

  const setSpent = (id, spent) =>
    updateActive((c) => ({
      ...c,
      equipment: c.equipment.map((it) =>
        it.id === id ? { ...it, uses: { ...it.uses, spent } } : it,
      ),
    }))

  const setTotal = (id, total) => {
    const t = Math.max(0, Math.min(12, Math.floor(Number(total) || 0)))
    updateActive((c) => ({
      ...c,
      equipment: c.equipment.map((it) =>
        it.id === id
          ? { ...it, uses: { total: t, spent: Math.min(it.uses.spent, t) } }
          : it,
      ),
    }))
  }

  const addItem = () =>
    updateActive((c) => ({ ...c, equipment: [...c.equipment, blankEquipment()] }))

  const removeItem = (id) =>
    updateActive((c) => ({ ...c, equipment: c.equipment.filter((it) => it.id !== id) }))

  return (
    <div className="panel equipment">
      <h2>Equipment &amp; Armory</h2>
      <p className="hint">
        Using a piece of gear adds +1 die and spends a use. The last use of a multi-use item adds
        an extra bonus die. Tags hold <code>+requirements</code> for bonus dice.
      </p>

      <div className="equip-list">
        {items.map((it) => (
          <div className="equip-item" key={it.id}>
            <div className="equip-main">
              <input
                type="text"
                placeholder="Item name"
                value={it.name}
                onChange={(e) => patchItem(it.id, { name: e.target.value })}
              />
              <input
                type="text"
                className="equip-tags"
                placeholder="Tags / +requirements (e.g. +flanking)"
                value={it.tags}
                onChange={(e) => patchItem(it.id, { tags: e.target.value })}
              />
            </div>
            <div className="equip-uses">
              <UsageBoxes item={it} onChange={(spent) => setSpent(it.id, spent)} />
              <label className="inline-num">
                uses
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={it.uses.total}
                  disabled={it.neverRunsOut}
                  onChange={(e) => setTotal(it.id, e.target.value)}
                />
              </label>
              <label className="inline-check">
                <input
                  type="checkbox"
                  checked={it.neverRunsOut}
                  onChange={(e) => patchItem(it.id, { neverRunsOut: e.target.checked })}
                />
                ∞
              </label>
              <button
                className="icon-btn"
                title="Remove item"
                onClick={() => removeItem(it.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn small" onClick={addItem}>
        + Add Item
      </button>

      <div className="loot">
        <label htmlFor="loot">Loot &amp; Battlefield Spoils</label>
        <textarea
          id="loot"
          rows={3}
          value={activeCharacter.loot}
          onChange={(e) => updateActive({ loot: e.target.value })}
        />
      </div>
    </div>
  )
}
