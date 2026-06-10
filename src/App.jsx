import { useState } from 'react'
import { useStore } from './store/StoreContext.jsx'
import { RP_TABS, RP_TAB_LABELS } from './store/factory'
import CharacterSwitcher from './components/CharacterSwitcher.jsx'
import ExportImport from './components/ExportImport.jsx'
import SheetTab from './tabs/SheetTab.jsx'
import RPTab from './tabs/RPTab.jsx'

const TABS = [
  { key: 'sheet', label: 'Character Sheet' },
  ...RP_TABS.map((k) => ({ key: k, label: RP_TAB_LABELS[k] })),
]

export default function App() {
  const { activeCharacter } = useStore()
  const [tab, setTab] = useState('sheet')

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          EAT THE REICH
          <small>CHARACTER SHEET</small>
        </div>
        <div className="spacer" />
        <CharacterSwitcher />
        <ExportImport />
      </header>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? 'active' : ''}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {tab === 'sheet' ? (
          <SheetTab />
        ) : (
          <RPTab key={`${activeCharacter.id}-${tab}`} tabKey={tab} />
        )}
      </main>
    </div>
  )
}
