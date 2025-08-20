import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAnalysis } from '../Features/analysisSlice'
import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import {useTheme} from '../Context/ThemeContext'
export default function AnalysisView() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { current: doc, status, error } = useSelector(s => s.analysis)
  const { theme } = useTheme()


  const isDark = theme === 'dark'

  useEffect(() => { 
    if(id) dispatch(getAnalysis(id)) 
  }, [id, dispatch])

  if (status === 'loading') {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-8 pt-20">
          <div className="flex items-center justify-center">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-8 pt-20">
          <div className="flex items-center justify-center">
            <p className={`text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>Error loading analysis: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-8 pt-20">
          <div className="flex items-center justify-center">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No analysis found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <main className="max-w-6xl mx-auto px-8">
        <section className="pt-20 pb-12">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8 ${
              isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-black border border-black/10'
            }`}>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Analysis complete
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
              Document Analysis
              <br />
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.filename || 'Text'}</span>
            </h1>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-8">
          <div className={`p-8 rounded-2xl border mb-8 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Document Summary</h2>
            </div>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {doc.result?.summary}
            </p>
          </div>
        </section>

        {/* Key Clauses Section */}
        <section className="py-8">
          <div className={`p-8 rounded-2xl border mb-8 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                <CheckCircle size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Key Clauses</h2>
            </div>
            <div className="space-y-4">
              {doc.result?.key_clauses?.map((clause, i) => (
                <div key={i} className={`p-4 rounded-lg border ${isDark ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/15'} transition-colors`}>
                  <h4 className="font-semibold text-lg mb-2 tracking-tight">{clause.title}</h4>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>{clause.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Risks Section */}
        <section className="py-8">
          <div className={`p-8 rounded-2xl border mb-8 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-red-500/10' : 'bg-red-500/10'}`}>
                <AlertTriangle size={24} strokeWidth={1.5} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Risk Assessment</h2>
            </div>
            <div className="space-y-3">
              {doc.result?.risks?.map((risk, i) => (
                <div key={i} className={`p-4 rounded-lg border border-red-200/20 bg-red-500/5 ${isDark ? 'border-red-400/20' : 'border-red-300/30'}`}>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{risk}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simplified Terms Section */}
        <section className="py-8 pb-20">
          <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                <Shield size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Simplified Terms</h2>
            </div>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {doc.result?.simplified_terms}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}