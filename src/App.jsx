import { useEffect, useState } from 'react'
import { useStore } from './store/StoreContext.jsx'
import { RP_TABS, RP_TAB_LABELS } from './store/factory'
import CharacterSwitcher from './components/CharacterSwitcher.jsx'
import ExportImport from './components/ExportImport.jsx'
import LandingMenu from './components/LandingMenu.jsx'
import CreationWizard from './components/wizard/CreationWizard.jsx'
import SheetTab from './tabs/SheetTab.jsx'
import RPTab from './tabs/RPTab.jsx'

const TABS = [
  { key: 'sheet', label: 'Character Sheet' },
  ...RP_TABS.map((k) => ({ key: k, label: RP_TAB_LABELS[k] })),
]

export default function App() {
  const { activeCharacter, selectCharacter } = useStore()
  const [screen, setScreen] = useState('menu') // 'menu' | 'create' | 'sheet'
  const [tab, setTab] = useState('sheet')

  // If we land on the sheet without an active character (e.g. after deleting the
  // last one), fall back to the menu.
  useEffect(() => {
    if (screen === 'sheet' && !activeCharacter) setScreen('menu')
  }, [screen, activeCharacter])

  const openCharacter = (id) => {
    selectCharacter(id)
    setTab('sheet')
    setScreen('sheet')
  }

  if (screen === 'menu') {
    return (
      <LandingMenu
        onOpen={openCharacter}
        onCreate={() => setScreen('create')}
      />
    )
  }

  if (screen === 'create') {
    return (
      <CreationWizard
        onDone={() => {
          setTab('sheet')
          setScreen('sheet')
        }}
        onCancel={() => setScreen('menu')}
      />
    )
  }

  // screen === 'sheet'
  if (!activeCharacter) return null

  return (
    <div className="app">
      <header className="topbar">
        <button className="btn small ghost" onClick={() => setScreen('menu')} title="Back to character menu">
          ← Characters
        </button>
        <div className="brand">
          EAT THE REICH
          <small>CHARACTER SHEET</small>
        </div>
        <div className="spacer" />
        <CharacterSwitcher onCreate={() => setScreen('create')} />
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
