import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Insight from './pages/Insight'
import InsightDetail from './pages/InsightDetail'
import Review from './pages/Review'
import ReviewDetail from './pages/ReviewDetail'
import Rank from './pages/Rank'
import Calculator from './pages/Calculator'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/insight/:slug" element={<InsightDetail />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:slug" element={<ReviewDetail />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </main>
    </div>
  )
}