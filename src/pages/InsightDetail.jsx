import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import articleDetailData from '../data/articleDetailData.json'

export default function InsightDetail() {
  const { slug } = useParams()

  const article = articleDetailData.find((item) => item.slug === slug)

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800">Artikel Tidak Ditemukan</h2>
        <p className="text-slate-500 text-sm mt-2">Artikel yang Anda cari tidak ada atau telah dipindahkan.</p>
        <Link to="/insight" className="inline-flex items-center gap-2 mt-4 text-orange-600 font-semibold text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Insight
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <Link 
        to="/insight" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 text-xs md:text-sm font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Insight
      </Link>

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="bg-orange-100 text-orange-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
          {article.title}
        </h1>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-xs">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-5 text-slate-700 text-sm md:text-base leading-relaxed">
        {article.content.map((block, idx) => {
          if (block.type === 'paragraph') {
            return <p key={idx}>{block.text}</p>
          }

          if (block.type === 'heading') {
            return (
              <h2 key={idx} className="text-lg md:text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                {block.text}
              </h2>
            )
          }

          if (block.type === 'table') {
            return (
              <div key={idx} className="overflow-x-auto my-4 border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold">
                    <tr>
                      {block.headers.map((header, hIdx) => (
                        <th key={hIdx} className="p-3">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }

          if (block.type === 'list') {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-2 my-2">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            )
          }

          return null
        })}
      </div>
    </article>
  )
}