import { useStore } from '../store/StoreContext.jsx'

export default function CharacterSwitcher({ onCreate }) {
  const {
    state,
    activeCharacter,
    selectCharacter,
    addCharacter,
    duplicateCharacter,
    deleteCharacter,
  } = useStore()

  if (!activeCharacter) return null

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete "${activeCharacter.name}"? This cannot be undone (export first to keep a backup).`,
      )
    ) {
      deleteCharacter(activeCharacter.id)
    }
  }

  return (
    <div className="char-switcher">
      <select
        value={activeCharacter.id}
        onChange={(e) => selectCharacter(e.target.value)}
        aria-label="Select character"
      >
        {state.characters.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name || 'Unnamed'}
          </option>
        ))}
      </select>
      <button
        className="btn small"
        onClick={() => (onCreate ? onCreate() : addCharacter())}
        title="New character"
      >
        + New
      </button>
      <button
        className="btn small ghost"
        onClick={() => duplicateCharacter(activeCharacter.id)}
        title="Duplicate this character"
      >
        Duplicate
      </button>
      <button className="btn small danger" onClick={handleDelete} title="Delete this character">
        Delete
      </button>
    </div>
  )
}
