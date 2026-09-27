import React from 'react'
import { Link } from 'react-router-dom'
import articleData from '../data/articleThumbnailData.json'

export default function Insight() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articleData.map((item) => (
          <Link 
            key={item.id}
            to={item.link}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-orange-500/50 transition duration-300 flex flex-col justify-between group cursor-pointer block"
          >
            <div className="space-y-3">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-xs text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="px-5 pt-1 space-y-2">
                <h2 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-3 flex items-center justify-between text-xs font-medium text-slate-400 border-t border-slate-100 mt-4">
              <span>{item.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}