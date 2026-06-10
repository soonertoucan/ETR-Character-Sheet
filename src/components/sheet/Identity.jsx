import { useRef } from 'react'
import { useStore } from '../../store/StoreContext.jsx'
import { readImageDownscaled } from '../../lib/files'

export default function Identity() {
  const { activeCharacter, updateActive } = useStore()
  const c = activeCharacter
  const fileRef = useRef(null)

  const handlePortrait = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const dataUrl = await readImageDownscaled(file)
      updateActive({ portrait: dataUrl })
    } catch (err) {
      console.error('Portrait upload failed:', err)
      window.alert('Could not read that image.')
    }
  }

  return (
    <div className="panel identity">
      <h2>Vampire Identity</h2>
      <div className="identity-body">
        <div className="portrait-col">
          <div
            className={`portrait ${c.portrait ? '' : 'empty'}`}
            onClick={() => fileRef.current?.click()}
            title="Click to upload a portrait"
          >
            {c.portrait ? (
              <img src={c.portrait} alt={c.name} />
            ) : (
              <span>Click to add<br />portrait</span>
            )}
          </div>
          <div className="portrait-actions">
            <button className="btn small ghost" onClick={() => fileRef.current?.click()}>
              Upload
            </button>
            {c.portrait && (
              <button
                className="btn small ghost"
                onClick={() => updateActive({ portrait: null })}
              >
                Remove
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePortrait}
          />
        </div>

        <div className="identity-fields">
          <div>
            <label htmlFor="char-name">Name</label>
            <input
              id="char-name"
              type="text"
              value={c.name}
              onChange={(e) => updateActive({ name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="char-concept">Concept</label>
            <input
              id="char-concept"
              type="text"
              placeholder="e.g. Old Money occultist, Disgraced Necromancer"
              value={c.concept}
              onChange={(e) => updateActive({ concept: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="char-notes">
              Notes — where do you come from and why are you with F.A.N.G.?
            </label>
            <textarea
              id="char-notes"
              rows={4}
              value={c.notes}
              onChange={(e) => updateActive({ notes: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
