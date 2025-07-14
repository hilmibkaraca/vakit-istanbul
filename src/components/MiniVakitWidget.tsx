'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MiniVakitWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Örnek vakitler - gerçek API'den gelecek
  const vakitler = {
    sabah: '06:15',
    gunes: '07:45',
    ogle: '12:45',
    ikindi: '15:15',
    aksam: '17:30',
    yatsi: '19:00'
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-islamic-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🕌</span>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600">Namaz Vakitleri</p>
            <p className="font-semibold">İstanbul</p>
          </div>
        </div>
        <svg className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-2">
          {Object.entries(vakitler).map(([vakit, saat]) => (
            <div key={vakit} className="flex justify-between items-center py-1">
              <span className="capitalize text-gray-700">{vakit}</span>
              <span className="font-mono font-semibold">{saat}</span>
            </div>
          ))}
          <Link 
            href="/" 
            className="block mt-3 text-center bg-islamic-600 text-white py-2 rounded-md hover:bg-islamic-700 transition-colors"
          >
            Tüm Vakitler →
          </Link>
        </div>
      )}
    </div>
  )
}