import { useState } from 'react'
import { useDice } from './DiceContext.jsx'
import { roll20String } from '../../lib/dice'

const QUICK = [1, 2, 3, 4, 5, 6, 7, 8]

export default function DicePanel() {
  const { last, copied, rollAndCopy, copyRoll } = useDice()
  const [manual, setManual] = useState(3)

  return (
    <div className="panel dice-panel">
      <h3>🎲 Dice Pool</h3>
      <p className="hint">
        Player dice: <strong>4–5 = success</strong>, <strong>6 = critical</strong>. Each roll also
        copies a Roll20 string (<code>/r Nd6</code>) to your clipboard to paste in chat.
      </p>

      <div className="dice-quick">
        {QUICK.map((n) => (
          <button key={n} className="btn small" onClick={() => rollAndCopy(n, `${n}d6`)}>
            {n}d6
          </button>
        ))}
      </div>

      <div className="dice-manual">
        <label htmlFor="manual-pool">Custom pool</label>
        <div className="row" style={{ alignItems: 'center', gap: '0.4rem' }}>
          <input
            id="manual-pool"
            type="number"
            min="0"
            max="50"
            value={manual}
            onChange={(e) => setManual(Number(e.target.value))}
            style={{ width: '5rem' }}
          />
          <span>d6</span>
          <button className="btn blood small" onClick={() => rollAndCopy(manual, `${manual}d6`)}>
            Roll
          </button>
          <button className="btn ghost small" onClick={() => copyRoll(manual)} title="Copy /r Nd6">
            Copy {roll20String(manual)}
          </button>
        </div>
      </div>

      {copied && <div className="dice-copied">Copied to clipboard ✓</div>}

      {last && (
        <div className="dice-result">
          <div className="dice-result-head">
            <span className="dice-label">{last.label || `${last.count}d6`}</span>
            <span className="dice-tally">
              <span className="tally success">{last.successes} success</span>
              <span className="tally critical">{last.criticals} critical</span>
            </span>
          </div>
          <div className="dice-faces">
            {last.dice.map((d, i) => (
              <span key={i} className={`die die-${d.result}`} title={d.result}>
                {d.value}
              </span>
            ))}
            {last.dice.length === 0 && <span className="muted">Empty pool</span>}
          </div>
        </div>
      )}
    </div>
  )
}
