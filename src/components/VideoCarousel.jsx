import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const getYouTubeId = (url) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ''
}

export default function VideoCarousel({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!videos || videos.length === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [videos])

  if (!videos || videos.length === 0) return null

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % videos.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white border border-slate-200 p-4 shadow-xs group">
      
      {/* Container Slider */}
      <div className="w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videos.map((item, index) => {
            const videoId = getYouTubeId(item.youtubeUrl)
            
            return (
              <div key={index} className="w-full shrink-0">
                <div className="flex flex-col gap-3">
                  
                  {/* Judul Diperbesar & Tanpa Durasi */}
                  <div className="px-1">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg lg:text-xl line-clamp-1 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Card Container dengan Blurred Aspect-Ratio Fill */}
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video max-h-[380px] w-full rounded-xl overflow-hidden bg-slate-100 group/card border border-slate-100 block mx-auto"
                  >
                    {/* Background Blur Tembus Pandang */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-70"
                    />

                    {/* Thumbnail Utama Utuh */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={item.title}
                      className="relative z-10 w-full h-full object-contain group-hover/card:scale-102 transition duration-300 drop-shadow-md"
                    />
                    
                    {/* Button Play Minimalis */}
                    <div className="absolute inset-0 z-20 bg-black/5 group-hover/card:bg-black/15 transition flex items-center justify-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md group-hover/card:scale-110 transition">
                        <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </a>

                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tombol Navigasi Kiri / Kanan */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 hover:bg-orange-600 hover:text-white text-slate-700 shadow-md transition z-30"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 hover:bg-orange-600 hover:text-white text-slate-700 shadow-md transition z-30"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Indikator Slider (Dots Minimalis) */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {videos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-5 bg-orange-600' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>

    </div>
  )
}