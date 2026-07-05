import React from 'react'
import { loadState, saveState } from '../lib/storage'

export default function Quotes(): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quotes</h2>
        <button className="px-3 py-2 bg-primary text-white rounded">New Quote</button>
      </div>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow">Quotes module coming soon (scaffolded).</div>
    </div>
  )
}
