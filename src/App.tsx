import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Invoices from './pages/Invoices'
import InvoiceEditor from './pages/InvoiceEditor'
import Quotes from './pages/Quotes'
import PurchaseOrders from './pages/PurchaseOrders'
import Receipts from './pages/Receipts'
import GstCalculator from './pages/GstCalculator'
import QrGenerator from './pages/QrGenerator'
import BusinessCard from './pages/BusinessCard'
import CompanyProfile from './pages/CompanyProfile'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Settings from './pages/Settings'

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/new" element={<InvoiceEditor />} />
        <Route path="invoices/:id" element={<InvoiceEditor />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="purchase-orders" element={<PurchaseOrders />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="gst" element={<GstCalculator />} />
        <Route path="qr" element={<QrGenerator />} />
        <Route path="cards" element={<BusinessCard />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
