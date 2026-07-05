import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

export default function Layout(): JSX.Element {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white to-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <TopNav />
        <main className="mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
