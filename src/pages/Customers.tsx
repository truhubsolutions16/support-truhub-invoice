import React, { useState } from 'react'
import { loadState, saveState } from '../lib/storage'
import { v4 as uuidv4 } from 'uuid'

export default function Customers(): JSX.Element {
  const state = loadState()
  const [name, setName] = useState('')
  const customers = state.customers || {}

  function add() {
    const id = uuidv4()
    customers[id] = { id, name }
    state.customers = customers
    saveState(state)
    setName('')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Customers</h2>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded flex-1" placeholder="Customer name" />
          <button onClick={add} className="px-3 py-2 bg-primary text-white rounded">Add</button>
        </div>

        <div className="mt-4">
          {Object.values(customers).length === 0 && <div className="text-gray-500">No customers</div>}
          {Object.values(customers).map((c: any) => (
            <div key={c.id} className="py-2 border-t">{c.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
