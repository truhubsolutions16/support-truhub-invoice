import React, { useRef } from 'react'
import QRCode from 'qrcode.react'

export default function QrGenerator(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function download() {
    const canvas = document.getElementById('qrcanvas') as HTMLCanvasElement | null
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'qr.png'
    a.click()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">QR Payment Generator</h2>
      <div className="mt-4 bg-white p-6 rounded-2xl shadow">
        <div>
          <label className="block text-sm">Data (UPI/URL/Phone)</label>
          <input ref={inputRef} defaultValue={'upi://pay?pa=example@upi&pn=TruHub&am=100'} className="mt-1 p-2 border rounded w-full" />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div id="qrcanvas">
            <QRCode value={inputRef.current?.value || 'upi://pay?pa=example@upi&pn=TruHub'} size={160} />
          </div>
          <div>
            <button onClick={download} className="px-3 py-2 bg-primary text-white rounded">Download PNG</button>
          </div>
        </div>
      </div>
    </div>
  )
}
