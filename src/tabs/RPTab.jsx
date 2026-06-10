import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useStore } from '../store/StoreContext.jsx'
import { RP_TAB_LABELS } from '../store/factory'
import { getPregen } from '../data/pregens'

export default function RPTab({ tabKey }) {
  const { activeCharacter, updateActive } = useStore()
  const rp = activeCharacter.rp?.[tabKey] || { format: 'markdown', content: '' }
  const hasContent = !!rp.content && rp.content.trim().length > 0
  // Start in edit mode when the page is empty, so input is immediately obvious.
  const [editing, setEditing] = useState(!hasContent)

  // If this character was built from a pregen that ships RP content, offer to load it.
  const pregen = activeCharacter.metaPregen ? getPregen(activeCharacter.metaPregen) : null
  const templateContent = pregen?.rp?.[tabKey] || null

  const setContent = (content) =>
    updateActive((c) => ({
      ...c,
      rp: { ...c.rp, [tabKey]: { ...c.rp[tabKey], content } },
    }))

  const loadTemplate = () => {
    if (!templateContent) return
    if (
      hasContent &&
      !window.confirm(
        `Replace this ${RP_TAB_LABELS[tabKey]} page with ${pregen.name}'s template content? Your current text on this tab will be overwritten.`,
      )
    ) {
      return
    }
    setContent(templateContent)
    setEditing(false)
  }

  const loadAllTemplate = () => {
    if (!pregen?.rp) return
    if (
      !window.confirm(
        `Replace ALL four RP tabs (Tips, Phrases, Opportunities, Voice) with ${pregen.name}'s template content? Your current text on every RP tab will be overwritten.`,
      )
    ) {
      return
    }
    updateActive((c) => {
      const rpNext = { ...c.rp }
      for (const [k, content] of Object.entries(pregen.rp)) {
        if (rpNext[k]) rpNext[k] = { ...rpNext[k], format: 'markdown', content }
      }
      return { ...c, rp: rpNext }
    })
    setEditing(false)
  }

  return (
    <div className="rp-tab">
      <div className="rp-toolbar">
        <h2 className="rp-title">
          {RP_TAB_LABELS[tabKey]} — <span className="rp-char">{activeCharacter.name}</span>
        </h2>
        <div className="spacer" />
        {templateContent && (
          <button className="btn small ghost" onClick={loadTemplate} title={`Load ${pregen.name}'s prewritten content into this tab only`}>
            ⟳ This tab
          </button>
        )}
        {pregen?.rp && (
          <button className="btn small ghost" onClick={loadAllTemplate} title={`Load ${pregen.name}'s prewritten content into all four RP tabs`}>
            ⟳ Load all {pregen.name}'s RP
          </button>
        )}
        <div className="seg">
          <button className={editing ? '' : 'on'} onClick={() => setEditing(false)}>
            👁 Preview
          </button>
          <button className={editing ? 'on' : ''} onClick={() => setEditing(true)}>
            ✎ Edit
          </button>
        </div>
      </div>

      {editing && (
        <p className="hint rp-hint">
          Type or paste Markdown below — it renders in Preview. You can generate rich content with
          an AI elsewhere and paste it here. Supports headings, lists, tables, bold/italic, links,
          and images (<code>![alt](url)</code>).
        </p>
      )}

      <div className="panel rp-panel">
        {editing ? (
          <textarea
            className="rp-editor"
            value={rp.content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Write ${RP_TAB_LABELS[tabKey]} for ${activeCharacter.name} here…`}
            rows={24}
            spellCheck={false}
            autoFocus
          />
        ) : hasContent ? (
          <div className="rp-rendered markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{rp.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="rp-empty">
            <p>Nothing here yet.</p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <button className="btn blood" onClick={() => setEditing(true)}>
                ✎ Add content
              </button>
              {templateContent && (
                <button className="btn ghost" onClick={loadTemplate}>
                  ⟳ Load this tab
                </button>
              )}
              {pregen?.rp && (
                <button className="btn ghost" onClick={loadAllTemplate}>
                  ⟳ Load all {pregen.name}'s RP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
