import { useRef, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { exportToJSON, parseImportedJSON } from '../store/persistence'
import { downloadText, readFileAsText, slugify } from '../lib/files'

export default function ExportImport() {
  const { state, activeCharacter, importCharacter, replaceState } = useStore()
  const fileRef = useRef(null)
  const [msg, setMsg] = useState('')

  const flash = (text) => {
    setMsg(text)
    setTimeout(() => setMsg(''), 3000)
  }

  const stamp = () => new Date().toISOString().slice(0, 10)

  const handleExportAll = () => {
    downloadText(`etr-all-characters-${stamp()}.json`, exportToJSON(state))
    flash('Exported all characters.')
  }

  const handleExportCharacter = () => {
    if (!activeCharacter) return
    downloadText(
      `etr-${slugify(activeCharacter.name)}-${stamp()}.json`,
      JSON.stringify(activeCharacter, null, 2),
    )
    flash(`Saved "${activeCharacter.name}" to a file.`)
  }

  const handleImportClick = () => fileRef.current?.click()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-importing the same file
    if (!file) return
    let parsed
    try {
      parsed = JSON.parse(await readFileAsText(file))
    } catch {
      flash('Import failed: not valid JSON.')
      return
    }

    // Full backup (all characters) -> replace local data.
    if (parsed && Array.isArray(parsed.characters)) {
      if (
        window.confirm(
          `Import a full backup of ${parsed.characters.length} character(s)? This REPLACES your current local data. Export first if you want to keep it.`,
        )
      ) {
        try {
          replaceState(parseImportedJSON(JSON.stringify(parsed)))
          flash('Backup imported.')
        } catch (err) {
          flash(`Import failed: ${err.message}`)
        }
      }
      return
    }

    // Single character file -> add it to the roster (a merge, keeps everything else).
    if (parsed && parsed.stats && typeof parsed.name !== 'undefined') {
      importCharacter(parsed)
      flash(`Added "${parsed.name || 'character'}" to your roster.`)
      return
    }

    flash('Import failed: unrecognised Eat the Reich file.')
  }

  return (
    <div className="export-import">
      <button className="btn small ghost" onClick={handleExportAll} title="Download a backup of every character">
        Export All
      </button>
      {activeCharacter && (
        <button
          className="btn small ghost"
          onClick={handleExportCharacter}
          title="Save just this character to a file"
        >
          Save Character
        </button>
      )}
      <button className="btn small ghost" onClick={handleImportClick} title="Load a backup or a saved character file">
        Import
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      {msg && <span className="export-msg">{msg}</span>}
    </div>
  )
}
