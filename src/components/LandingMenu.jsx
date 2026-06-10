import { useStore } from '../store/StoreContext.jsx'
import ExportImport from './ExportImport.jsx'

export default function LandingMenu({ onOpen, onCreate }) {
  const { state } = useStore()
  const characters = state.characters

  return (
    <div className="landing">
      <div className="landing-inner">
        <header className="landing-head">
          <h1 className="landing-title">EAT THE REICH</h1>
          <p className="landing-sub">Undead. Armed. Hungry. Choose your monster.</p>
        </header>

        <div className="landing-actions">
          <button className="btn blood landing-create" onClick={onCreate}>
            ✚ Create New Vampire
          </button>
          <ExportImport />
        </div>

        {characters.length === 0 ? (
          <div className="panel landing-empty">
            <p>No characters yet.</p>
            <p className="hint">
              Click <strong>Create New Vampire</strong> to build one — start from an official
              commando or roll your own. Already have a backup? Use <strong>Import</strong>.
            </p>
          </div>
        ) : (
          <div className="char-cards">
            {characters.map((c) => (
              <button key={c.id} className="char-card" onClick={() => onOpen(c.id)}>
                <div className={`char-card-portrait ${c.portrait ? '' : 'empty'}`}>
                  {c.portrait ? <img src={c.portrait} alt={c.name} /> : <span>no portrait</span>}
                </div>
                <div className="char-card-body">
                  <span className="char-card-name">{c.name || 'Unnamed'}</span>
                  {c.concept && <span className="char-card-concept">{c.concept}</span>}
                  <span className="char-card-blood">🩸 {c.blood?.current ?? 0} Blood</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
