import React, { useState } from 'react'

export default function GstCalculator(): JSX.Element {
  const [amount, setAmount] = useState<number>(0)
  const [cgst, setCgst] = useState<number>(9)
  const [sgst, setSgst] = useState<number>(9)

  const totalTax = (amount * (cgst + sgst)) / 100
  const total = amount + totalTax

  return (
    <div>
      <h2 className="text-xl font-semibold">GST Calculator</h2>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow space-y-4">
        <div>
          <label className="block text-sm">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 p-2 border rounded w-48" />
        </div>
        <div className="flex gap-2">
          <div>
            <label className="block text-sm">CGST %</label>
            <input type="number" value={cgst} onChange={(e) => setCgst(Number(e.target.value))} className="mt-1 p-2 border rounded w-32" />
          </div>
          <div>
            <label className="block text-sm">SGST %</label>
            <input type="number" value={sgst} onChange={(e) => setSgst(Number(e.target.value))} className="mt-1 p-2 border rounded w-32" />
          </div>
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between"><div>Tax</div><div>₹{totalTax.toFixed(2)}</div></div>
          <div className="flex justify-between font-semibold mt-2"><div>Total</div><div>₹{total.toFixed(2)}</div></div>
        </div>
      </div>
    </div>
  )
}
