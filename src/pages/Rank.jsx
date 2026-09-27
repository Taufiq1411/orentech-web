import React, { useState } from 'react'
import { Award, Zap, Gauge } from 'lucide-react'
import rankData from '../data/rankData.json'

export default function Rank() {
  const [activeCategory, setActiveCategory] = useState('one_pk')

  const categories = [
    { key: 'half_pk', label: '1/2 PK' },
    { key: 'three_quarter_pk', label: '3/4 PK' },
    { key: 'one_pk', label: '1 PK' },
    { key: 'one_half_pk', label: '1.5 PK' },
    { key: 'two_pk', label: '2 PK' },
  ]

  const currentData = rankData[activeCategory]

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Peringkat AC Paling Hemat Listrik
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Daftar urutan AC berdasarkan nilai CSPF (Cooling Seasonal Performance Factor) tertinggi berdasarkan hasil pengujian ESDM.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition ${
                activeCategory === cat.key
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base md:text-lg font-bold text-slate-800">
          {currentData.title}
        </h2>

        <div className="space-y-4">
          {currentData.items.map((item) => (
            <div
              key={item.rank}
              className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs grid grid-cols-1 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px] gap-4 md:gap-5 items-start md:items-center justify-between hover:border-slate-300 transition"
            >
              {/* Main Info Block */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 min-w-0 w-full">
                
                {/* Mobile Top Row (Rank + Model Name + Status) */}
                <div className="flex md:hidden items-center gap-3 w-full">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-sm shrink-0 bg-slate-100 text-slate-700 border border-slate-200">
                    #{item.rank}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {item.model}
                    </h3>
                    {item.status === 'discontinue' && (
                      <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                        Discontinue
                      </span>
                    )}
                  </div>
                </div>

                {/* Desktop Rank Badge */}
                <div className="hidden md:flex w-12 h-12 rounded-xl items-center justify-center font-extrabold text-lg shrink-0 bg-slate-100 text-slate-700 border border-slate-200">
                  #{item.rank}
                </div>

                {/* Content Row for Mobile (Image + Specs) / Full Row for Desktop */}
                <div className="flex items-start md:items-center gap-3 md:gap-4 w-full min-w-0">
                  {/* Image */}
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1.5 md:p-2">
                    <img
                      src={item.image}
                      alt={item.model}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details Block */}
                  <div className="space-y-2 min-w-0 flex-1">
                    {/* Desktop Title Header */}
                    <div className="hidden md:flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-lg truncate">
                        {item.model}
                      </h3>
                      {item.status === 'discontinue' && (
                        <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                          Discontinue
                        </span>
                      )}
                    </div>

                    {/* Specs Row */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-semibold text-slate-600">
                      <span className="flex items-center gap-1 text-orange-600 font-extrabold">
                        <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500 shrink-0" />
                        CSPF: {item.cspf}
                      </span>
                      <span className="hidden md:inline-block text-slate-300">|</span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Gauge className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {item.btu}
                      </span>
                      <span className="hidden md:inline-block text-slate-300">|</span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        {item.watt}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Highlights Section */}
              <div className="w-full text-xs pt-2 md:pt-0 border-t border-slate-100 md:border-t-0">
                <ul className="space-y-1.5 text-slate-600">
                  {item.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="truncate">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}