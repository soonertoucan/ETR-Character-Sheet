import { useStore } from '../../store/StoreContext.jsx'
import { BLOOD_MAX } from '../../store/factory'

export default function BloodTrack() {
  const { activeCharacter, updateActive } = useStore()
  const blood = activeCharacter.blood

  const setBlood = (value) => {
    const n = Math.max(0, Math.min(blood.max, Math.floor(value)))
    updateActive((c) => ({ ...c, blood: { ...c.blood, current: n } }))
  }

  const cells = Array.from({ length: BLOOD_MAX + 1 }, (_, i) => i) // 0..10

  return (
    <div className="panel blood">
      <h2>
        Blood Track
        <span className="blood-count">{blood.current} / {blood.max}</span>
      </h2>
      <p className="hint">
        Start at 0. Gain by feeding on nazis; spend on abilities (usually 1) and to heal Injuries
        (3). Max {blood.max}.
      </p>
      <div className="blood-cells">
        {cells.map((i) => (
          <button
            key={i}
            className={`blood-drop ${i <= blood.current && i > 0 ? 'filled' : ''} ${
              i === 0 ? 'zero' : ''
            }`}
            onClick={() => setBlood(i === blood.current ? i - 1 : i)}
            title={`Set Blood to ${i}`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="blood-actions">
        <button className="btn small" onClick={() => setBlood(blood.current - 1)}>
          − Spend 1
        </button>
        <button className="btn small blood" onClick={() => setBlood(blood.current + 1)}>
          + Feed 1
        </button>
        <button className="btn small ghost" onClick={() => setBlood(0)}>
          Reset to 0
        </button>
      </div>
    </div>
  )
}
