import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useStore } from '../store/StoreContext.jsx'
import { RP_TAB_LABELS } from '../store/factory'

export default function RPTab({ tabKey }) {
  const { activeCharacter, updateActive } = useStore()
  const rp = activeCharacter.rp?.[tabKey] || { format: 'markdown', content: '' }
  const [editing, setEditing] = useState(false)

  const setContent = (content) =>
    updateActive((c) => ({
      ...c,
      rp: { ...c.rp, [tabKey]: { ...c.rp[tabKey], content } },
    }))

  return (
    <div className="rp-tab">
      <div className="rp-toolbar">
        <h2 className="rp-title">
          {RP_TAB_LABELS[tabKey]} — <span className="rp-char">{activeCharacter.name}</span>
        </h2>
        <div className="spacer" />
        <button
          className={`btn small ${editing ? 'ghost' : 'blood'}`}
          onClick={() => setEditing(false)}
        >
          Preview
        </button>
        <button
          className={`btn small ${editing ? 'blood' : 'ghost'}`}
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      </div>

      {editing && (
        <p className="hint rp-hint">
          Write Markdown here, or generate rich content with an AI elsewhere and paste it in.
          Supports headings, lists, tables, bold/italic, links, and images
          (<code>![alt](url)</code>).
        </p>
      )}

      <div className="panel rp-panel">
        {editing ? (
          <textarea
            className="rp-editor"
            value={rp.content}
            onChange={(e) => setContent(e.target.value)}
            rows={24}
            spellCheck={false}
          />
        ) : (
          <div className="rp-rendered markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {rp.content || '_Nothing here yet. Click **Edit** to add content._'}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
