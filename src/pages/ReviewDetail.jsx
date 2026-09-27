import React from 'react'
import { useParams } from 'react-router-dom'
import reviewDetailData from '../data/reviewDetailData.json'

export default function ReviewDetail() {
  const { slug } = useParams()

  const review = reviewDetailData.find((item) => item.slug === slug) || reviewDetailData[0]

  if (!review) {
    return <div className="max-w-2xl mx-auto px-4 py-8">Artikel tidak ditemukan</div>
  }

  return (
    <article className="max-w-2xl mx-auto px-4 py-6 font-sans text-slate-800 leading-relaxed text-base space-y-6">
      
      <h1 className="text-2xl font-bold text-slate-900 leading-snug">
        {review.title}
      </h1>

      <div className="w-full">
        <img
          src={review.mainImage}
          alt={review.title}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      <p className="whitespace-pre-line text-slate-700">
        {review.intro}
      </p>

      {review.sections.map((section, idx) => (
        <section key={idx} className="space-y-6 pt-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
            {section.title}
          </h2>

          {section.items.map((item, itemIdx) => {

            if (item.type === 'remote_features') {
              return (
                <div key={itemIdx} className="flex flex-col md:flex-row gap-5 items-start py-2">
                  <div className="w-full md:w-5/12 shrink-0">
                    <img
                      src={item.image}
                      alt="Remote AC Xiaomi"
                      className="w-full max-w-[240px] mx-auto md:max-w-none h-auto rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-full md:w-7/12 space-y-3">
                    <p className="text-slate-700 font-medium">{item.intro}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {item.buttons.map((btn, bIdx) => (
                        <div key={bIdx} className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg text-xs md:text-sm">
                          <span className="font-bold text-slate-900">{btn.label} : </span>
                          <span className="text-slate-600">{btn.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            if (item.type === 'app_features') {
              return (
                <div key={itemIdx} className="flex flex-col md:flex-row gap-5 items-start py-2">
                  <div className="w-full md:w-5/12 shrink-0">
                    <img
                      src={item.image}
                      alt="Aplikasi Xiaomi"
                      className="w-full max-w-[240px] mx-auto md:max-w-none h-auto rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-full md:w-7/12 space-y-3">
                    <p className="text-slate-700 font-medium">{item.intro}</p>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            }

            if (item.type === 'side_by_side') {
              return (
                <div key={itemIdx} className="flex flex-col md:flex-row gap-5 items-start py-2">
                  <div className="w-full md:w-5/12 shrink-0">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full max-w-[240px] mx-auto md:max-w-none h-auto rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-full md:w-7/12 whitespace-pre-line text-slate-700 leading-relaxed self-center">
                    {item.text}
                  </div>
                </div>
              )
            }

            return (
              <div key={itemIdx} className="space-y-3">
                <div className="w-full">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
                <p className="whitespace-pre-line text-slate-700">
                  {item.text}
                </p>
              </div>
            )
          })}
        </section>
      ))}

      <section className="space-y-2 pt-4">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          Catatan
        </h2>
        <p className="whitespace-pre-line text-slate-700">
          {review.notes}
        </p>
      </section>

      <section className="space-y-2 pt-4">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          Kesimpulan
        </h2>
        <p className="whitespace-pre-line text-slate-700">
          {review.summary}
        </p>
      </section>

    </article>
  )
}