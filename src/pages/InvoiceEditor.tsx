import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { loadState, saveState } from '../lib/storage'
import { Invoice, InvoiceItem } from '../types'
import { toWords } from '../utils/numberToWords'
import { exportElementToPdf } from '../utils/pdf'

type FormValues = {
  clientName: string
  date: string
  dueDate?: string
  items: InvoiceItem[]
  notes?: string
}

function calculateTotals(items: InvoiceItem[]) {
  const subTotal = items.reduce((s, it) => s + it.qty * it.price - (it.discount || 0), 0)
  const taxTotal = items.reduce((s, it) => s + ((it.taxPercent || 0) / 100) * it.qty * it.price, 0)
  const total = subTotal + taxTotal
  return { subTotal, taxTotal, total }
}

export default function InvoiceEditor(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const state = loadState()
  const existing = id ? (state.invoices[id] as Invoice | undefined) : undefined

  const { register, control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: existing || { clientName: '', date: new Date().toISOString().slice(0,10), items: [] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const items = watch('items')
  const totals = useMemo(() => calculateTotals(items || []), [items])

  useEffect(() => {
    if (!existing && fields.length === 0) {
      append({ id: uuidv4(), description: 'New item', qty: 1, unit: 'pcs', price: 0, taxPercent: 0 })
    }
  }, [])

  function save(data: FormValues) {
    const invId = existing?.id || uuidv4()
    const number = existing?.number || `INV-${Date.now().toString().slice(-6)}`
    const invoice: Invoice = {
      id: invId,
      number,
      date: data.date,
      dueDate: data.dueDate,
      clientName: data.clientName,
      clientAddress: undefined,
      items: data.items,
      notes: data.notes,
      terms: undefined,
      subTotal: totals.subTotal,
      taxTotal: totals.taxTotal,
      total: totals.total,
      paid: 0
    }
    state.invoices[invId] = invoice
    saveState(state)
    toast.success('Invoice saved')
    navigate('/invoices')
  }

  function handleExportPDF() {
    const el = document.getElementById('invoice-preview')
    if (!el) return
    exportElementToPdf(el, `${watch('clientName') || 'invoice'}.pdf`)
  }

  function handlePrint() {
    const el = document.getElementById('invoice-preview')
    if (!el) return
    const newWin = window.open('', '_blank')
    if (!newWin) return
    newWin.document.write('<html><head><title>Print</title></head><body>')
    newWin.document.write(el.innerHTML)
    newWin.document.write('</body></html>')
    newWin.document.close()
    newWin.focus()
    setTimeout(() => newWin.print(), 500)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit(save)} className="space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Invoice</h3>
              <div className="text-sm text-gray-500">Create professional invoice</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Date</div>
              <input {...register('date')} type="date" className="mt-1 p-2 border rounded-md" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Bill To</label>
            <input {...register('clientName')} placeholder="Client name" className="mt-1 w-full p-2 border rounded-md" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Items</label>
            <div className="space-y-2 mt-2">
              {fields.map((f, idx) => (
                <div key={f.id} className="flex gap-2 items-center">
                  <input {...register(`items.${idx}.description` as const)} className="flex-1 p-2 border rounded-md" />
                  <input type="number" step="1" {...register(`items.${idx}.qty` as const, { valueAsNumber: true })} className="w-20 p-2 border rounded-md" />
                  <input {...register(`items.${idx}.unit` as const)} className="w-20 p-2 border rounded-md" />
                  <input type="number" step="0.01" {...register(`items.${idx}.price` as const, { valueAsNumber: true })} className="w-28 p-2 border rounded-md" />
                  <button type="button" onClick={() => remove(idx)} className="px-2 py-1 bg-red-100 rounded">Del</button>
                </div>
              ))}
              <button type="button" onClick={() => append({ id: uuidv4(), description: 'Item', qty: 1, unit: 'pcs', price: 0, taxPercent: 0 })} className="mt-2 px-3 py-2 bg-gray-100 rounded">Add Item</button>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">Notes</div>
            <textarea {...register('notes')} className="w-2/3 p-2 border rounded-md" />
          </div>

          <div className="mt-4 flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button>
            <button type="button" onClick={handleExportPDF} className="px-4 py-2 bg-gray-100 rounded">Export PDF</button>
            <button type="button" onClick={handlePrint} className="px-4 py-2 bg-gray-100 rounded">Print</button>
          </div>
        </div>
      </form>

      <div>
        <div id="invoice-preview" className="p-6 bg-white rounded-2xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xl font-bold">{watch('clientName') || 'Client Name'}</div>
              <div className="text-sm text-gray-500">{watch('date')}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Invoice</div>
              <div className="text-lg font-semibold">{existing?.number || 'INV-XXXX'}</div>
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2">Unit</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {(items || []).map((it) => (
                  <tr key={it.id} className="border-t">
                    <td className="py-2">{it.description}</td>
                    <td className="py-2">{it.qty}</td>
                    <td className="py-2">{it.unit}</td>
                    <td className="py-2 text-right">₹{(it.price || 0).toFixed(2)}</td>
                    <td className="py-2 text-right">₹{((it.qty || 0) * (it.price || 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-1"><div className="text-sm text-gray-500">Subtotal</div><div>₹{totals.subTotal.toFixed(2)}</div></div>
                <div className="flex justify-between py-1"><div className="text-sm text-gray-500">Tax</div><div>₹{totals.taxTotal.toFixed(2)}</div></div>
                <div className="flex justify-between py-1 font-semibold"><div>Total</div><div>₹{totals.total.toFixed(2)}</div></div>
                <div className="mt-2 text-xs text-gray-500">Amount in words: {toWords(Math.round(totals.total))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
