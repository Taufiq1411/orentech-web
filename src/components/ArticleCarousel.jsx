import React from 'react'
import { Link } from 'react-router-dom'
import articleData from '../data/articleThumbnailData.json'

export default function ArticleCarousel() {
  return (
    <div className="w-full">
      <h2 className="text-sm md:text-base font-bold text-slate-800 mb-2 px-1">
        Artikel & Insight Terbaru
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {articleData.map((article) => (
          <Link
            key={article.id}
            to={article.link}
            className="flex-none w-[260px] md:w-[320px] h-[160px] md:h-[190px] relative rounded-xl overflow-hidden group snap-start border border-slate-200 block shadow-xs"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3 md:p-4">
              <h3 className="text-white font-semibold text-xs md:text-sm leading-snug line-clamp-2">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}