import { useStore } from '../../store/StoreContext.jsx'
import { INJURY_BANDS, INJURY_ROWS } from '../../store/factory'

const ROW_LABELS = { light: 'Light', severe: 'Severe' }

export default function Injuries() {
  const { activeCharacter, updateActive } = useStore()
  const injuries = activeCharacter.injuries

  const get = (row, band) => injuries.find((i) => i.row === row && i.band === band)

  const patch = (id, p) =>
    updateActive((c) => ({
      ...c,
      injuries: c.injuries.map((i) => (i.id === id ? { ...i, ...p } : i)),
    }))

  const markedCount = injuries.filter((i) => i.marked).length

  return (
    <div className="panel injuries">
      <h2>
        Injuries &amp; Trauma
        <span className={`injury-count ${markedCount >= 6 ? 'dead' : ''}`}>
          {markedCount} / 6 {markedCount >= 6 ? '— DEAD: see Last Stand' : 'marked'}
        </span>
      </h2>
      <p className="hint">
        Roll a D6 when injured: 1–2, 3–4, or 5–6 picks the column. Marking the second box in a
        column triggers its penalty. All six marked = death. Heal one for 3 Blood.
      </p>

      <div className="injury-grid">
        <div className="injury-cell head" />
        {INJURY_BANDS.map((band) => (
          <div className="injury-cell head" key={band}>
            {band}
          </div>
        ))}

        {INJURY_ROWS.map((row) => (
          <RowFragment key={row} row={row} get={get} patch={patch} />
        ))}
      </div>
    </div>
  )
}

function RowFragment({ row, get, patch }) {
  return (
    <>
      <div className="injury-cell rowhead">{ROW_LABELS[row]}</div>
      {INJURY_BANDS.map((band) => {
        const inj = get(row, band)
        return (
          <div className={`injury-cell ${inj.marked ? 'marked' : ''}`} key={band}>
            <label className="injury-check">
              <input
                type="checkbox"
                checked={inj.marked}
                onChange={(e) => patch(inj.id, { marked: e.target.checked })}
              />
              <input
                type="text"
                className="injury-label"
                placeholder="Injury name"
                value={inj.label}
                onChange={(e) => patch(inj.id, { label: e.target.value })}
              />
            </label>
            <input
              type="text"
              className="injury-penalty"
              placeholder="Penalty (2nd box)"
              value={inj.penalty}
              onChange={(e) => patch(inj.id, { penalty: e.target.value })}
            />
          </div>
        )
      })}
    </>
  )
}
