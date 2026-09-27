import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Insight', path: '/insight' },
    { name: 'Review', path: '/review' },
    { name: 'Rank', path: '/rank' },
    { name: 'Calculator', path: '/calculator' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/review?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-sans tracking-tight shrink-0">
              <span className="font-bold text-orange-600">Oren</span>
              <span className="font-semibold text-slate-800">Tech</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-full text-sm transition font-medium ${
                      isActive
                        ? 'text-orange-600 bg-orange-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Search Bar Oval */}
          <div className="hidden md:flex items-center flex-1 max-w-xs ml-auto">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search reviews, gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-1.5 text-sm bg-slate-100 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-orange-600 transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
          <form onSubmit={handleSearch} className="relative w-full mb-2">
            <input
              type="text"
              placeholder="Search reviews, gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 text-sm bg-slate-100 border border-slate-200 rounded-full text-slate-800"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}