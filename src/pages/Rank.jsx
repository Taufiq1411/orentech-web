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
              className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs grid grid-cols-1 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px] gap-5 items-start md:items-center justify-between hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-extrabold text-base md:text-lg shrink-0 bg-slate-100 text-slate-700 border border-slate-200">
                  #{item.rank}
                </div>

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.model}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg truncate">
                      {item.model}
                    </h3>
                    {item.status === 'discontinue' && (
                      <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                        Discontinue
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold text-slate-600">
                    <span className="flex items-center gap-1 text-orange-600 font-extrabold">
                      <Award className="w-4 h-4 text-orange-500" />
                      CSPF: {item.cspf}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" />
                      {item.btu}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      {item.watt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full text-xs">
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