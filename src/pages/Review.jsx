import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tv, ExternalLink, ArrowRight } from 'lucide-react'

const reviewCatalog = [
  {
    id: 'MJSt_cITy1I',
    title: 'AC Sharp Inverter 1 PK X10BEY',
    brand: 'Sharp',
    capacity: '1 PK',
    cspf: '4.8',
    thumbnail: 'https://img.youtube.com/vi/MJSt_cITy1I/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/MJSt_cITy1I?si=GinABUqk5C9LNxDG',
  },
  {
    id: '8_2y8Le3N4U',
    title: 'AC Aqua Inverter 1 PK KCRV10WXW',
    brand: 'Aqua',
    capacity: '1 PK',
    cspf: '5.2',
    thumbnail: 'https://img.youtube.com/vi/8_2y8Le3N4U/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/8_2y8Le3N4U?si=X6ELn6yaXCyahOjI',
  },
  {
    id: 'nYCVCZe7rlY',
    title: 'AC Hisense Inverter 1/2 PK AI06KCG',
    brand: 'Hisense',
    capacity: '0.5 PK',
    cspf: '5.8',
    thumbnail: 'https://img.youtube.com/vi/nYCVCZe7rlY/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/nYCVCZe7rlY?si=1QjJGMZwEI1nDSCD',
  },
  {
    id: '5a1jq-Jqvlk',
    slug: 'review-xiaomi-inverter-1-pk-asc-09wo-n1c5-id',
    title: 'AC Xiaomi Inverter 1 PK ASC-09WO',
    brand: 'Xiaomi',
    capacity: '1 PK',
    cspf: '5.74',
    thumbnail: 'https://img.youtube.com/vi/5a1jq-Jqvlk/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/5a1jq-Jqvlk?si=XzZCV_dhB_gptdmI',
  },
  {
    id: 'hrmdgnGe5tc',
    title: 'AC Panasonic Inverter 1 PK S10PKP',
    brand: 'Panasonic',
    capacity: '1 PK',
    cspf: 'N/A',
    thumbnail: 'https://img.youtube.com/vi/hrmdgnGe5tc/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/hrmdgnGe5tc?si=lXNdn3u1qf8OND3o',
  },
]

export default function Review() {
  const [selectedBrand, setSelectedBrand] = useState('All')
  const brands = ['All', 'Sharp', 'Aqua', 'Hisense', 'Xiaomi', 'Panasonic']

  const filteredReviews = selectedBrand === 'All' 
    ? reviewCatalog 
    : reviewCatalog.filter((item) => item.brand === selectedBrand)

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header & Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Tv className="w-4 h-4" />
            Katalog Review
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Daftar Ulasan Produk
          </h1>
        </div>

        {/* Filter Brand Button */}
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedBrand === brand
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Card Ulasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReviews.map((item) => {
          const hasDetail = Boolean(item.slug)

          return (
            <div 
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-orange-500/50 transition duration-300 flex flex-col gap-3 group"
            >
              {/* Thumbnail Card -> Prioritas Mengarah ke Halaman Review Detail */}
              {hasDetail ? (
                <Link
                  to={`/review/${item.slug}`}
                  className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 block group/img"
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-60"
                  />
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="relative z-10 w-full h-full object-contain group-hover/img:scale-102 transition duration-300"
                  />
                </Link>
              ) : (
                <a
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 block group/img"
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-60"
                  />
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="relative z-10 w-full h-full object-contain group-hover/img:scale-102 transition duration-300"
                  />
                </a>
              )}

              {/* Info Produk */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded">
                    {item.brand}
                  </span>
                  <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                    {item.capacity}
                  </span>
                  {item.cspf !== 'N/A' && (
                    <span className="bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded">
                      CSPF: {item.cspf}
                    </span>
                  )}
                </div>

                {hasDetail ? (
                  <Link to={`/review/${item.slug}`}>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-orange-600 transition">
                      {item.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-orange-600 transition">
                    {item.title}
                  </h3>
                )}
              </div>

              {/* Tombol Navigasi Utam vs Opsional Video */}
              <div className="mt-auto pt-2 space-y-2 border-t border-slate-100">
                {hasDetail ? (
                  <>
                    <Link
                      to={`/review/${item.slug}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-2 px-3 rounded-xl transition"
                    >
                      <span>Baca Ulasan Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={item.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1 text-[11px] font-medium text-slate-500 hover:text-orange-600 transition py-1"
                    >
                      <span>Tonton Video YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                ) : (
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-orange-600 transition py-1"
                  >
                    <span>Tonton Ulasan Lengkap</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}