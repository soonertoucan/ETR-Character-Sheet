import { useMemo, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { blankNote } from '../store/factory'

// Deterministic colour per tag so groups are visually distinct.
function tagHue(tag) {
  let h = 0
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) % 360
  return h
}
function tagStyle(tag) {
  const h = tagHue(tag)
  return {
    background: `hsl(${h} 45% 26%)`,
    borderColor: `hsl(${h} 55% 45%)`,
    color: `hsl(${h} 70% 85%)`,
  }
}

const now = () => new Date().toISOString()

export default function NotesTab() {
  const { activeCharacter, updateActive } = useStore()
  const journal = activeCharacter.journal || []
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // --- mutations ---
  const addNote = () =>
    updateActive((c) => ({ ...c, journal: [blankNote(), ...(c.journal || [])] }))

  const patchNote = (id, patch) =>
    updateActive((c) => ({
      ...c,
      journal: (c.journal || []).map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: now() } : n,
      ),
    }))

  const deleteNote = (id) =>
    updateActive((c) => ({ ...c, journal: (c.journal || []).filter((n) => n.id !== id) }))

  const addTag = (id, raw) => {
    const tag = raw.trim().toLowerCase()
    if (!tag) return
    updateActive((c) => ({
      ...c,
      journal: (c.journal || []).map((n) =>
        n.id === id && !n.tags.includes(tag)
          ? { ...n, tags: [...n.tags, tag], updatedAt: now() }
          : n,
      ),
    }))
  }

  const removeTag = (id, tag) =>
    updateActive((c) => ({
      ...c,
      journal: (c.journal || []).map((n) =>
        n.id === id ? { ...n, tags: n.tags.filter((t) => t !== tag), updatedAt: now() } : n,
      ),
    }))

  // --- derived ---
  const allTags = useMemo(() => {
    const counts = new Map()
    for (const n of journal) for (const t of n.tags) counts.set(t, (counts.get(t) || 0) + 1)
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [journal])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return journal
      .filter((n) => {
        const tagOk =
          selectedTags.length === 0 || n.tags.some((t) => selectedTags.includes(t))
        const textOk =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.tags.some((t) => t.includes(q))
        return tagOk && textOk
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return (b.updatedAt || '').localeCompare(a.updatedAt || '')
      })
  }, [journal, search, selectedTags])

  const toggleFilter = (tag) =>
    setSelectedTags((s) => (s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]))

  return (
    <div className="notes-tab">
      <div className="notes-toolbar">
        <h2 className="rp-title">
          Notes — <span className="rp-char">{activeCharacter.name}</span>
        </h2>
        <div className="spacer" />
        <input
          type="text"
          className="notes-search"
          placeholder="Search notes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn blood small" onClick={addNote}>
          ＋ New Note
        </button>
      </div>

      {allTags.length > 0 && (
        <div className="tag-filter">
          <span className="tag-filter-label">Filter by tag:</span>
          {allTags.map(([tag, count]) => (
            <button
              key={tag}
              className={`tag-chip filter ${selectedTags.includes(tag) ? 'active' : ''}`}
              style={tagStyle(tag)}
              onClick={() => toggleFilter(tag)}
            >
              {tag} <span className="tag-count">{count}</span>
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button className="btn ghost small" onClick={() => setSelectedTags([])}>
              Clear
            </button>
          )}
        </div>
      )}

      {journal.length === 0 ? (
        <div className="panel rp-empty">
          <p>No notes yet.</p>
          <button className="btn blood" onClick={addNote}>
            ＋ Add your first note
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="panel rp-empty">
          <p>No notes match your filter.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {filtered.map((n) => (
            <NoteCard
              key={n.id}
              note={n}
              onPatch={patchNote}
              onDelete={deleteNote}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function NoteCard({ note, onPatch, onDelete, onAddTag, onRemoveTag }) {
  const [tagInput, setTagInput] = useState('')

  const commitTag = () => {
    if (tagInput.trim()) {
      onAddTag(note.id, tagInput)
      setTagInput('')
    }
  }

  const onTagKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commitTag()
    }
  }

  return (
    <div className={`note-card panel ${note.pinned ? 'pinned' : ''}`}>
      <div className="note-head">
        <input
          type="text"
          className="note-title"
          placeholder="Title"
          value={note.title}
          onChange={(e) => onPatch(note.id, { title: e.target.value })}
        />
        <button
          className={`icon-btn ${note.pinned ? 'on' : ''}`}
          title={note.pinned ? 'Unpin' : 'Pin to top'}
          onClick={() => onPatch(note.id, { pinned: !note.pinned })}
        >
          {note.pinned ? '📌' : '📍'}
        </button>
        <button
          className="icon-btn"
          title="Delete note"
          onClick={() => {
            if (
              !note.title.trim() && !note.body.trim()
                ? true
                : window.confirm('Delete this note?')
            )
              onDelete(note.id)
          }}
        >
          🗑
        </button>
      </div>

      <textarea
        className="note-body"
        placeholder="Write your note…"
        value={note.body}
        onChange={(e) => onPatch(note.id, { body: e.target.value })}
        rows={5}
      />

      <div className="note-tags">
        {note.tags.map((t) => (
          <span key={t} className="tag-chip" style={tagStyle(t)}>
            {t}
            <button
              className="tag-x"
              title="Remove tag"
              onClick={() => onRemoveTag(note.id, t)}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="tag-input"
          placeholder="+ tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={onTagKey}
          onBlur={commitTag}
        />
      </div>
    </div>
  )
}
