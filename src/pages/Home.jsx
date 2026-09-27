import React from 'react'
import VideoCarousel from '../components/VideoCarousel'
import ArticleCarousel from '../components/ArticleCarousel'
import videoData from '../data/videoData.json'

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6 py-4">
      
      {/* 1. Carousel Video Review */}
      <section>
        <h2 className="text-sm md:text-base font-bold text-slate-800 mb-2 px-1">
          Video Review Produk
        </h2>
        <VideoCarousel videos={videoData.reviewVideos} />
      </section>

      {/* 2. Carousel Artikel */}
      <section>
        <ArticleCarousel />
      </section>

      {/* 3. Carousel Video Unboxing */}
      <section>
        <h2 className="text-sm md:text-base font-bold text-slate-800 mb-2 px-1">
          Video Unboxing
        </h2>
        <VideoCarousel videos={videoData.unboxingVideos} />
      </section>

    </div>
  )
}