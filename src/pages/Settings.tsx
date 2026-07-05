import React from 'react'
import { loadState, saveState, STORAGE_KEY } from '../lib/storage'

export default function Settings(): JSX.Element {
  const state = loadState()

  function exportJson() {
    const data = localStorage.getItem(STORAGE_KEY) || '{}'
    const blob = new Blob([data], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'truhub-backup.json'
    a.click()
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
        alert('Imported')
        window.location.reload()
      } catch (err) {
        alert('Invalid JSON')
      }
    }
    reader.readAsText(f)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow space-y-4">
        <div>
          <button onClick={exportJson} className="px-3 py-2 bg-primary text-white rounded">Export JSON (Backup)</button>
        </div>
        <div>
          <input type="file" accept="application/json" onChange={importJson} />
        </div>
      </div>
    </div>
  )
}
