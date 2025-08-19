import React, { useState } from 'react';
import { FileText, Shield, Zap, ArrowRight, Users, Clock, Award } from 'lucide-react';

export default function Home() {
  const [token, setToken] = useState(false);
  const [theme, setTheme] = useState('dark');

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8">
        <section className="pt-20 pb-12">
          <div className="max-w-4xl">

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8 ${
              isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-black/5 text-black border border-black/10'
            }`}>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Now available for enterprise teams
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Legal documents,
              <br />
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>decoded instantly</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl leading-[1.6] mb-10 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform complex contracts into clear insights. Extract key terms, identify risks, and understand implications—all in seconds.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 mb-12">
              {!token ? (
                <>
                  <button 
                    onClick={() => setToken(true)}
                    className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isDark ? 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10' : 'bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/10'
                    }`}
                  >
                    Start analyzing
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                  <button className={`px-6 py-3 text-sm font-semibold rounded-lg border transition-all duration-200 ${
                    isDark ? 'border-white/20 hover:border-white/30 hover:bg-white/5' : 'border-black/20 hover:border-black/30 hover:bg-black/5'
                  }`}>
                    View demo
                  </button>
                </>
              ) : (
                <button className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isDark ? 'bg-white text-black hover:bg-gray-100 shadow-lg shadow-white/10' : 'bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/10'
                }`}>
                  Open dashboard
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* Social Proof */}
            <div className={`flex items-center gap-8 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Trusted by 50,000+ professionals</span>
              </div>
              <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></div>
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span>SOC 2 Type II certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Instant analysis",
                description: "Upload any legal document and get comprehensive analysis in under 30 seconds. No waiting, no delays."
              },
              {
                icon: Shield,
                title: "Risk identification",
                description: "Automatically flag potential risks, unusual clauses, and terms that require immediate attention."
              },
              {
                icon: FileText,
                title: "Clear summaries",
                description: "Convert legal jargon into plain English summaries that anyone can understand and act upon."
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className={`p-8 rounded-2xl border transition-all duration-300 ${isDark ? 'border-white/10 hover:border-white/20 hover:bg-white/5' : 'border-black/10 hover:border-black/15 hover:bg-black/5'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${isDark ? 'bg-white/10 group-hover:bg-white/15' : 'bg-black/5 group-hover:bg-black/10'}`}>
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight">{feature.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How it works</h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Three steps to better legal document understanding</p>
            </div>
            
            <div className="space-y-12">
              {[
                {
                  number: "01",
                  title: "Upload document",
                  description: "Drag and drop your contract, agreement, or any legal document. We support all major formats including PDF, Word, and plain text."
                },
                {
                  number: "02",
                  title: "AI processes",
                  description: "Our advanced language model analyzes your document, identifying key clauses, terms, and potential areas of concern."
                },
                {
                  number: "03",
                  title: "Review insights",
                  description: "Get a comprehensive breakdown with summaries, risk assessments, and actionable recommendations you can trust."
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {step.number}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold mb-2 tracking-tight">{step.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
