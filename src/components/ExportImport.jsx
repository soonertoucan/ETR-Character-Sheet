import { useRef, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { exportToJSON, parseImportedJSON } from '../store/persistence'
import { downloadText, readFileAsText, slugify } from '../lib/files'

export default function ExportImport() {
  const { state, replaceState } = useStore()
  const fileRef = useRef(null)
  const [msg, setMsg] = useState('')

  const flash = (text) => {
    setMsg(text)
    setTimeout(() => setMsg(''), 2600)
  }

  const handleExport = () => {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadText(`etr-characters-${stamp}.json`, exportToJSON(state))
    flash('Exported all characters.')
  }

  const handleImportClick = () => fileRef.current?.click()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-importing the same file
    if (!file) return
    try {
      const text = await readFileAsText(file)
      const imported = parseImportedJSON(text)
      if (
        window.confirm(
          `Import ${imported.characters.length} character(s)? This REPLACES your current local data. Export first if you want a backup.`,
        )
      ) {
        replaceState(imported)
        flash('Import complete.')
      }
    } catch (err) {
      flash(`Import failed: ${err.message}`)
    }
  }

  return (
    <div className="export-import">
      <button className="btn small ghost" onClick={handleExport}>
        Export
      </button>
      <button className="btn small ghost" onClick={handleImportClick}>
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
