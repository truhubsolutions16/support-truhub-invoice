import React from 'react'
import { loadState } from '../lib/storage'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard(): JSX.Element {
  const state = loadState()
  const invoices = Object.values(state.invoices || {})
  const total = invoices.reduce((s: any, i: any) => s + (i.total || 0), 0)
  const chartData = invoices.slice(-7).map((inv: any, idx: number) => ({ name: `Inv ${idx+1}`, value: inv.total || 0 }))
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
          <h3 className="text-lg font-semibold">Revenue (recent)</h3>
        </div>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
