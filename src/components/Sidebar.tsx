import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, FilePlus, Users, Box, Settings } from 'lucide-react'

const nav = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Invoices', to: '/invoices', icon: FileText },
  { name: 'Quotes', to: '/quotes', icon: FilePlus },
  { name: 'Customers', to: '/customers', icon: Users },
  { name: 'Products', to: '/products', icon: Box },
  { name: 'Settings', to: '/settings', icon: Settings }
]

export default function Sidebar(): JSX.Element {
  const location = useLocation()
  return (
    <aside className="w-64 p-6 bg-white/60 backdrop-blur rounded-r-2xl shadow-lg">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">TH</div>
          <div>
            <div className="text-lg font-semibold">TruHub</div>
            <div className="text-sm text-gray-500">Business Toolkit</div>
          </div>
        </div>
      </div>
      <nav className="space-y-2">
        {nav.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))
          return (
            <Link key={item.name} to={item.to} className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-8 text-sm text-gray-500">
        <div>© 2026 TruHub Solutions</div>
      </div>
    </aside>
  )
}
