import React, { useState } from 'react'
import { loadState, saveState } from '../lib/storage'
import { v4 as uuidv4 } from 'uuid'

export default function Products(): JSX.Element {
  const state = loadState()
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number>(0)
  const products = state.products || {}

  function add() {
    const id = uuidv4()
    products[id] = { id, name, price }
    state.products = products
    saveState(state)
    setName('')
    setPrice(0)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Products & Services</h2>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded flex-1" placeholder="Name" />
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="p-2 border rounded w-32" />
          <button onClick={add} className="px-3 py-2 bg-primary text-white rounded">Add</button>
        </div>

        <div className="mt-4">
          {Object.values(products).length === 0 && <div className="text-gray-500">No products</div>}
          {Object.values(products).map((p: any) => (
            <div key={p.id} className="py-2 border-t flex justify-between"><div>{p.name}</div><div>₹{p.price}</div></div>
          ))}
        </div>
      </div>
    </div>
  )
}
