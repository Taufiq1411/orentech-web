import React, { useState } from 'react'
import {
  Calculator as CalcIcon,
  ArrowUp,
  Maximize2,
  Grid2x2,
  SunDim,
  Building,
  Building2,
  Users
} from 'lucide-react'
import { acData } from '../data/acData'
import RecommendationView from '../components/RecommendationView'

export default function Calculator() {
  const [length, setLength] = useState(3)
  const [width, setWidth] = useState(3)
  const [heightOption, setHeightOption] = useState('normal')
  const [windowOption, setWindowOption] = useState('small')
  const [floorOption, setFloorOption] = useState('lower')
  const [personCount, setPersonCount] = useState(1)

  const [step, setStep] = useState('form')
  const [resultData, setResultData] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()

    const p = parseFloat(length) || 0
    const l = parseFloat(width) || 0
    const area = p * l

    let coeff = 500
    if (heightOption === 'high') coeff += 100
    if (windowOption === 'large') coeff += 100
    if (floorOption === 'upper') coeff += 100

    const totalBTU = (area * coeff) + (parseInt(personCount) * 500)
    const noteText = '*Kebutuhan aktual anda mungkin bisa lebih besar, pertimbangkan beban panas seperti komputer dan yang lainnya'
    let pkCategory = ''

    if (totalBTU <= 5000) {
      pkCategory = '1/2 PK'
    } else if (totalBTU <= 7000) {
      pkCategory = '3/4 PK'
    } else if (totalBTU <= 9000) {
      pkCategory = '1 PK'
    } else if (totalBTU <= 12000) {
      pkCategory = '1.5 PK'
    } else if (totalBTU <= 18000) {
      pkCategory = '2 PK'
    } else if (totalBTU <= 24000) {
      pkCategory = '2.5 PK'
    } else {
      const calculatedPk = Math.ceil(totalBTU / 9000)
      pkCategory = `${calculatedPk} PK`
    }

    setResultData({
      btu: totalBTU,
      pk: pkCategory,
      note: noteText,
      recs: acData[pkCategory] || { affordable: [], efficient: [] }
    })

    setStep('result')
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6 max-w-7xl mx-auto">
      {step === 'form' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-xs text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
              <CalcIcon className="w-4 h-4" />
              Kalkulator PK AC
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
              Hitung Kebutuhan BTU dan PK AC Ruangan Anda
            </h1>
            {/* <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
              Pilih spesifikasi ruangan di bawah ini untuk mendapatkan estimasi kapasitas pendinginan yang akurat.
            </p> */}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-xs">
            <form onSubmit={handleCalculate} className="space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <label className="text-sm font-bold text-slate-800 md:w-1/3 shrink-0 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-orange-600" />
                  Luas Ruangan
                </label>
                <div className="grid grid-cols-2 gap-3 md:w-2/3">
                  <div>
                    <span className="text-xs text-slate-400 mb-1 block">Panjang (m)</span>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 mb-1 block">Lebar (m)</span>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <label className="text-sm font-bold text-slate-800 md:w-1/3 shrink-0 flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-orange-600" />
                  Tinggi Ruangan
                </label>
                <div className="grid grid-cols-2 gap-3 md:w-2/3">
                  <button
                    type="button"
                    onClick={() => setHeightOption('normal')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition ${
                      heightOption === 'normal'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {/* <ArrowUp className="w-4 h-4 text-slate-400" /> */}
                    Normal (≤ 3 Meter)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeightOption('high')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition ${
                      heightOption === 'high'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {/* <ArrowUp className="w-5 h-5 text-orange-600" /> */}
                    Tinggi (&gt; 3 Meter)
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <label className="text-sm font-bold text-slate-800 md:w-1/3 shrink-0 flex items-center gap-2">
                  <Grid2x2 className="w-4 h-4 text-orange-600" />
                  Ukuran Jendela
                </label>
                <div className="grid grid-cols-2 gap-3 md:w-2/3">
                  <button
                    type="button"
                    onClick={() => setWindowOption('small')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition ${
                      windowOption === 'small'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {/* <SunDim className="w-4 h-4 text-amber-500" /> */}
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowOption('large')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition ${
                      windowOption === 'large'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {/* <Sun className="w-4 h-4 text-amber-600" /> */}
                    Besar
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <label className="text-sm font-bold text-slate-800 md:w-1/3 shrink-0 flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-600" />
                  Posisi Ruangan
                </label>
                <div className="grid grid-cols-2 gap-3 md:w-2/3">
                  <button
                    type="button"
                    onClick={() => setFloorOption('lower')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition ${
                      floorOption === 'lower'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {/* <Building className="w-4 h-4 text-slate-500" /> */}
                    Lantai Bawah
                  </button>
                  <button
                    type="button"
                    onClick={() => setFloorOption('upper')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition ${
                      floorOption === 'upper'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {/* <Building2 className="w-4 h-4 text-orange-600" /> */}
                    Lantai Atas
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2">
                <label className="text-sm font-bold text-slate-800 md:w-1/3 shrink-0 flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  Jumlah Penghuni
                </label>
                <div className="md:w-2/3">
                  <select
                    value={personCount}
                    onChange={(e) => setPersonCount(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} Orang
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-sm"
                >
                  Hitung Kebutuhan Kapasitas AC
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {step === 'result' && resultData && (
        <RecommendationView
          resultData={resultData}
          onBack={() => setStep('form')}
        />
      )}
    </div>
  )
}