import React from 'react'

export default function TopNav(): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-semibold">Dashboard</div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-primary text-white rounded-md">New Invoice</button>
      </div>
    </div>
  )
}
