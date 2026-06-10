import { useRef, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { DiceProvider } from '../components/dice/DiceContext.jsx'
import DicePanel from '../components/dice/DicePanel.jsx'
import Identity from '../components/sheet/Identity.jsx'
import Stats from '../components/sheet/Stats.jsx'
import BloodTrack from '../components/sheet/BloodTrack.jsx'
import Equipment from '../components/sheet/Equipment.jsx'
import Abilities from '../components/sheet/Abilities.jsx'
import Advances from '../components/sheet/Advances.jsx'
import Injuries from '../components/sheet/Injuries.jsx'
import LastStand from '../components/sheet/LastStand.jsx'
import { snapshotPNG, snapshotPDF } from '../lib/snapshot'

export default function SheetTab() {
  const { activeCharacter } = useStore()
  const sheetRef = useRef(null)
  const [busy, setBusy] = useState('')

  const doSnapshot = async (kind) => {
    if (!sheetRef.current) return
    setBusy(kind)
    try {
      if (kind === 'png') await snapshotPNG(sheetRef.current, activeCharacter.name)
      else await snapshotPDF(sheetRef.current, activeCharacter.name)
    } catch (err) {
      console.error('Snapshot failed:', err)
      window.alert('Snapshot failed — see console for details.')
    } finally {
      setBusy('')
    }
  }

  return (
    <DiceProvider>
      <div className="sheet-toolbar">
        <button className="btn small ghost" disabled={busy} onClick={() => doSnapshot('png')}>
          {busy === 'png' ? 'Rendering…' : 'Export PNG'}
        </button>
        <button className="btn small ghost" disabled={busy} onClick={() => doSnapshot('pdf')}>
          {busy === 'pdf' ? 'Rendering…' : 'Export PDF'}
        </button>
      </div>

      <div className="sheet-layout" ref={sheetRef}>
        <div className="sheet-col left">
          <Identity />
          <Stats />
          <BloodTrack />
          <DicePanel />
        </div>
        <div className="sheet-col right">
          <Equipment />
          <Abilities />
          <Advances />
          <Injuries />
          <LastStand />
        </div>
      </div>
    </DiceProvider>
  )
}
