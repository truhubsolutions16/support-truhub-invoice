import React from 'react'
import { Link } from 'react-router-dom'
import { loadState } from '../lib/storage'
import { Invoice } from '../types'

export default function Invoices(): JSX.Element {
  const state = loadState()
  const invoices = Object.values(state.invoices || {}) as Invoice[]
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <Link to="/invoices/new" className="px-3 py-2 bg-primary text-white rounded">Create Invoice</Link>
      </div>

      <div className="mt-4 bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Client</th>
              <th className="text-right p-3">Total</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="p-3">{inv.number}</td>
                <td className="p-3">{inv.clientName}</td>
                <td className="p-3 text-right">₹{inv.total.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <Link to={`/invoices/${inv.id}`} className="px-2 py-1 bg-gray-100 rounded">Open</Link>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">No invoices. Create one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
