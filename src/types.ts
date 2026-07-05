export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export interface CompanyProfile {
  id: string
  name: string
  address?: string
  gst?: string
  pan?: string
  phone?: string
  email?: string
  website?: string
}

export interface InvoiceItem {
  id: string
  description: string
  qty: number
  unit: string
  price: number
  taxPercent?: number
  discount?: number
}

export interface Invoice {
  id: string
  number: string
  date: string
  dueDate?: string
  clientName?: string
  clientAddress?: string
  items: InvoiceItem[]
  notes?: string
  terms?: string
  subTotal: number
  taxTotal: number
  total: number
  paid?: number
}
