import React from 'react'
import { Link } from 'react-router-dom'
import { loadState } from '../lib/storage'
import { Invoice } from '../types'

export default function Dashboard(): JSX.Element {
  const state = loadState()
  const invoices = Object.values(state.invoices || {}) as Invoice[]
  const total = invoices.reduce((s, i) => s + (i.total || 0), 0)
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-2xl shadow"> 
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-semibold">₹{total.toFixed(2)}</div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow"> 
          <div className="text-sm text-gray-500">Invoices</div>
          <div className="text-2xl font-semibold">{invoices.length}</div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow"> 
          <div className="text-sm text-gray-500">Customers</div>
          <div className="text-2xl font-semibold">{Object.keys(state.customers || {}).length}</div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white rounded-2xl shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Invoices</h3>
          <Link to="/invoices/new" className="px-3 py-2 bg-primary text-white rounded">New Invoice</Link>
        </div>
        <div className="mt-4">
          {invoices.length === 0 && <div className="text-gray-500">No invoices yet</div>}
          {invoices.map((inv) => (
            <div key={inv.id} className="py-2 border-b">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{inv.number}</div>
                  <div className="text-sm text-gray-500">{inv.clientName}</div>
                </div>
                <div className="text-right">
                  <div>₹{inv.total.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">{inv.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
