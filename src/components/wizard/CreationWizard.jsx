import { useMemo, useRef, useState } from 'react'
import { useStore } from '../../store/StoreContext.jsx'
import {
  STAT_KEYS,
  STAT_LABELS,
  STAT_HINTS,
  blankCharacter,
  characterFromTemplate,
} from '../../store/factory'
import { PREGENS, STAT_BUDGET, STAT_MIN, STAT_MAX, getPregen } from '../../data/pregens'
import { readImageDownscaled } from '../../lib/files'

const STEPS = ['Path', 'Identity', 'Stats', 'Portrait', 'Review']

const CUSTOM_START = { brawl: 2, con: 2, fix: 2, search: 2, shoot: 2, sneak: 2, terrify: 2 }

export default function CreationWizard({ onDone, onCancel }) {
  const { createCharacter } = useStore()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState({
    path: null, // 'pregen' | 'custom'
    pregenKey: null,
    name: '',
    concept: '',
    notes: '',
    stats: { ...CUSTOM_START },
    portrait: null,
  })

  const statTotal = useMemo(
    () => STAT_KEYS.reduce((sum, k) => sum + (draft.stats[k] || 0), 0),
    [draft.stats],
  )
  const remaining = STAT_BUDGET - statTotal
  const isCustom = draft.path === 'custom'
  // Custom builds must spend exactly the budget; pregens are already canonical.
  const statsValid = isCustom ? remaining === 0 : true

  const patch = (p) => setDraft((d) => ({ ...d, ...p }))

  const choosePregen = (key) => {
    const p = getPregen(key)
    patch({
      path: 'pregen',
      pregenKey: key,
      name: p.name,
      concept: p.concept,
      notes: p.notes,
      stats: { ...p.stats },
    })
    setStep(1)
  }

  const chooseCustom = () => {
    patch({ path: 'custom', pregenKey: null, name: '', concept: '', notes: '', stats: { ...CUSTOM_START } })
    setStep(1)
  }

  const setStat = (key, value) => {
    const n = Math.max(STAT_MIN, Math.min(STAT_MAX, Math.floor(value)))
    setDraft((d) => ({ ...d, stats: { ...d.stats, [key]: n } }))
  }

  const finish = () => {
    const overrides = {
      name: draft.name?.trim() || 'New Vampire',
      concept: draft.concept,
      notes: draft.notes,
      stats: draft.stats,
      portrait: draft.portrait,
    }
    const character =
      draft.path === 'pregen'
        ? characterFromTemplate(getPregen(draft.pregenKey), overrides)
        : blankCharacter(overrides)
    createCharacter(character)
    onDone()
  }

  const canNext = () => {
    if (step === 1) return draft.name.trim().length > 0
    if (step === 2) return statsValid
    return true
  }

  return (
    <div className="wizard">
      <div className="wizard-inner">
        <header className="wizard-head">
          <h1 className="wizard-title">Create a Vampire</h1>
          <ol className="wizard-steps">
            {STEPS.map((s, i) => (
              <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''}>
                <span className="num">{i + 1}</span> {s}
              </li>
            ))}
          </ol>
        </header>

        <div className="panel wizard-body">
          {step === 0 && <PathStep onPregen={choosePregen} onCustom={chooseCustom} />}
          {step === 1 && <IdentityStep draft={draft} patch={patch} />}
          {step === 2 && (
            <StatsStep
              draft={draft}
              setStat={setStat}
              remaining={remaining}
              isCustom={isCustom}
            />
          )}
          {step === 3 && <PortraitStep draft={draft} patch={patch} />}
          {step === 4 && <ReviewStep draft={draft} statTotal={statTotal} />}
        </div>

        <footer className="wizard-foot">
          <button className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
          <div className="spacer" />
          {step > 0 && (
            <button className="btn ghost" onClick={() => setStep((s) => s - 1)}>
              ← Back
            </button>
          )}
          {step > 0 && step < STEPS.length - 1 && (
            <button
              className="btn"
              disabled={!canNext()}
              onClick={() => canNext() && setStep((s) => s + 1)}
            >
              Next →
            </button>
          )}
          {step === STEPS.length - 1 && (
            <button className="btn blood" onClick={finish}>
              ⚔ Create Character
            </button>
          )}
        </footer>
      </div>
    </div>
  )
}

function statSummary(stats) {
  return STAT_KEYS.map((k) => `${STAT_LABELS[k]} ${stats[k]}`).join(' · ')
}

function PathStep({ onPregen, onCustom }) {
  return (
    <div className="path-step">
      <h2>Start from…</h2>
      <p className="hint">
        Pick one of the six F.A.N.G. commandos to start fully kitted out, or build a custom vampire
        from scratch.
      </p>
      <div className="pregen-grid">
        {PREGENS.map((p) => (
          <button key={p.key} className="pregen-card" onClick={() => onPregen(p.key)}>
            <span className="pregen-name">{p.name}</span>
            <span className="pregen-concept">{p.concept}</span>
            <span className="pregen-stats">{statSummary(p.stats)}</span>
          </button>
        ))}
        <button className="pregen-card custom" onClick={onCustom}>
          <span className="pregen-name">✚ Custom Vampire</span>
          <span className="pregen-concept">Build your own from scratch</span>
          <span className="pregen-stats">Distribute {STAT_BUDGET} points, 1–4 each</span>
        </button>
      </div>
    </div>
  )
}

function IdentityStep({ draft, patch }) {
  return (
    <div className="identity-step">
      <h2>Identity</h2>
      <div>
        <label htmlFor="w-name">Name</label>
        <input
          id="w-name"
          type="text"
          autoFocus
          value={draft.name}
          onChange={(e) => patch({ name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="w-concept">Concept</label>
        <input
          id="w-concept"
          type="text"
          placeholder="e.g. Old Money occultist, Disgraced Necromancer"
          value={draft.concept}
          onChange={(e) => patch({ concept: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="w-notes">
          Background — where do you come from and why are you with F.A.N.G.?
        </label>
        <textarea
          id="w-notes"
          rows={5}
          value={draft.notes}
          onChange={(e) => patch({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}

function StatsStep({ draft, setStat, remaining, isCustom }) {
  return (
    <div className="stats-step">
      <h2>Stats</h2>
      <p className="hint">
        Rating = number of d6 you roll. Each stat is 1–4.
        {isCustom ? ' Spend exactly the budget to continue.' : ' Tweak the canonical spread if you like.'}
      </p>
      <div className={`budget ${remaining === 0 ? 'ok' : remaining < 0 ? 'over' : ''}`}>
        Points remaining: <strong>{remaining}</strong> / {STAT_BUDGET}
      </div>
      <div className="stat-grid">
        {STAT_KEYS.map((key) => (
          <div className="stat-row" key={key}>
            <span className="stat-name" title={STAT_HINTS[key]}>
              {STAT_LABELS[key]}
            </span>
            <div className="stat-controls">
              <button className="step" onClick={() => setStat(key, draft.stats[key] - 1)}>
                −
              </button>
              <span className="stat-value">{draft.stats[key]}</span>
              <button
                className="step"
                onClick={() => setStat(key, draft.stats[key] + 1)}
                disabled={isCustom && remaining <= 0}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PortraitStep({ draft, patch }) {
  const fileRef = useRef(null)
  const handle = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      patch({ portrait: await readImageDownscaled(file) })
    } catch {
      window.alert('Could not read that image.')
    }
  }
  return (
    <div className="portrait-step">
      <h2>Portrait</h2>
      <p className="hint">Upload an image for your vampire (optional — you can add one later).</p>
      <div className="portrait-step-body">
        <div
          className={`portrait big ${draft.portrait ? '' : 'empty'}`}
          onClick={() => fileRef.current?.click()}
        >
          {draft.portrait ? (
            <img src={draft.portrait} alt="portrait" />
          ) : (
            <span>Click to upload</span>
          )}
        </div>
        <div className="row">
          <button className="btn" onClick={() => fileRef.current?.click()}>
            Upload Image
          </button>
          {draft.portrait && (
            <button className="btn ghost" onClick={() => patch({ portrait: null })}>
              Remove
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handle}
        />
      </div>
    </div>
  )
}

function ReviewStep({ draft, statTotal }) {
  const p = draft.pregenKey ? getPregen(draft.pregenKey) : null
  return (
    <div className="review-step">
      <h2>Review</h2>
      <div className="review-body">
        <div className={`portrait ${draft.portrait ? '' : 'empty'}`}>
          {draft.portrait ? <img src={draft.portrait} alt="portrait" /> : <span>no portrait</span>}
        </div>
        <div className="review-fields">
          <p>
            <strong>{draft.name || 'New Vampire'}</strong>
            {draft.concept && <> — {draft.concept}</>}
          </p>
          {draft.notes && <p className="muted">{draft.notes}</p>}
          <p className="review-stats">{statSummary(draft.stats)} (total {statTotal})</p>
          {p ? (
            <p className="hint">
              Starting as <strong>{p.name}</strong>: comes pre-loaded with their equipment,
              abilities, advances, injuries and Last Stand — all editable on the sheet.
            </p>
          ) : (
            <p className="hint">
              Custom vampire. Equipment, abilities, injuries and Last Stand start blank — fill them
              in on the sheet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
