import React, { useState } from 'react'
import { loadState, saveState } from '../lib/storage'

export default function CompanyProfile(): JSX.Element {
  const state = loadState()
  const [name, setName] = useState<string>((state.company as any)?.name || '')

  function save() {
    state.company = { ...(state.company || {}), name }
    saveState(state)
    alert('Saved')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Company Profile</h2>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow">
        <label className="block text-sm">Company Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border rounded w-full" />
        <div className="mt-4">
          <button onClick={save} className="px-3 py-2 bg-primary text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
