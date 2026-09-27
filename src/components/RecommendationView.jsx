import React from 'react'
import { ArrowLeft, CheckCircle2, DollarSign, Zap, Star } from 'lucide-react'

export default function RecommendationView({ resultData, onBack }) {
  const renderCardList = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="p-6 text-center text-slate-400 text-xs font-medium">
          Data rekomendasi untuk kategori ini akan segera hadir.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
          >
            <div className="aspect-video w-full bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 p-2">
            <img
                src={item.image}
                alt={item.type}
                className="object-contain h-full w-full max-h-36"
                onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://placehold.co/300x200?text=AC+Unit'
                }}
            />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
                  {item.name}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: item.star || 0 }).map((_, s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                {item.type}
              </h4>

               <div className="text-xs space-y-1.5 text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-slate-400 shrink-0">Kapasitas:</span>
                  <span className="font-semibold text-slate-700 text-right">{item.capacity}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-slate-400 shrink-0">Daya Listrik:</span>
                  <span className="font-semibold text-slate-700 text-right">{item.power}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-400 shrink-0">CSPF Rating:</span>
                  <span className="font-bold text-emerald-600">{item.cspf}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Halaman Perhitungan
        </button>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-orange-600" />
            Hasil Perhitungan Kapasitas
          </div>

          <p className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed">
            Kamar anda membutuhkan <span className="text-orange-600 font-extrabold">{resultData.btu.toLocaleString('id-ID')} BTU</span> atau <span className="text-orange-600 font-extrabold">AC {resultData.pk}</span>.
          </p>

          <p className="text-[10px] text-slate-500 pt-1 leading-normal italic">
            {resultData.note}
          </p>
        </div>
      </div>

      {(!resultData.recs?.affordable || resultData.recs.affordable.length === 0) && (!resultData.recs?.efficient || resultData.recs.efficient.length === 0) ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-sm leading-relaxed">
          <strong>Catatan:</strong> Untuk kapasitas besar, disarankan untuk menggunakan <strong>beberapa unit AC</strong> agar pendinginan ruangan lebih merata.
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 px-1">
            Beberapa pilihan AC {resultData.pk}:
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <div className="p-2 bg-emerald-500 text-white rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Top Budget Price</h3>
                  <p className="text-xs text-slate-500">Ruangan dingin dengan harga AC terjangkau</p>
                </div>
              </div>
              {renderCardList(resultData.recs?.affordable)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3.5">
                <div className="p-2 bg-blue-500 text-white rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Top Efficiency</h3>
                  <p className="text-xs text-slate-500">Ruangan dingin dengan penggunaan listrik lebih hemat</p>
                </div>
              </div>
              {renderCardList(resultData.recs?.efficient)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}