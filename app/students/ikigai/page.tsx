'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Download } from 'lucide-react'

export default function IkigaiWorkshopPage() {
  const [ikigai, setIkigai] = useState({
    love: '',
    good: '',
    pays: '',
    needs: '',
    statement: ''
  })

  const handleExport = () => {
    const data = JSON.stringify(ikigai, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ikigai-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/students"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Student Hub</span>
          </Link>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        {/* Intro */}
        <section className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold">
            Ikigai Workshop
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
            Find your purpose at the intersection of what you love, what you're good at, what the world needs, and what pays.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-sm text-slate-400">
            <Save className="w-4 h-4" />
            Your data stays in your browser
          </div>
        </section>

        {/* The 3Cs Framework */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">The 3Cs</h2>
            <p className="text-xl text-slate-400">Human skills that compound with AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-slate-800 rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold">Collaboration</h3>
              <ul className="space-y-3 text-slate-400 leading-relaxed">
                <li>• PACE: Plan → Act → Check → Evolve</li>
                <li>• PAIR with AI: Plan, Ask, Iterate, Review</li>
                <li>• Iteration speed & decision clarity</li>
              </ul>
            </div>

            <div className="border border-slate-800 rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold">Communication</h3>
              <ul className="space-y-3 text-slate-400 leading-relaxed">
                <li>• BLUF, SCQA frameworks</li>
                <li>• Design docs & demo scripts</li>
                <li>• Clear, reproducible outputs</li>
              </ul>
            </div>

            <div className="border border-slate-800 rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold">Creation</h3>
              <ul className="space-y-3 text-slate-400 leading-relaxed">
                <li>• Goldilocks scope</li>
                <li>• Build → measure → learn</li>
                <li>• Ship small, show don't tell</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ikigai Finder */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Find Your Ikigai</h2>
            <p className="text-xl text-slate-400">Be specific. Use evidence over opinions.</p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <label className="block text-2xl font-semibold">
                What I love
              </label>
              <textarea
                value={ikigai.love}
                onChange={(e) => setIkigai({...ikigai, love: e.target.value})}
                placeholder="What activities energize you? Problems you enjoy solving?"
                className="w-full h-32 px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-lg placeholder:text-slate-600 focus:border-slate-700 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-semibold">
                What I'm good at
              </label>
              <textarea
                value={ikigai.good}
                onChange={(e) => setIkigai({...ikigai, good: e.target.value})}
                placeholder="Skills and habits others recognize in you"
                className="w-full h-32 px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-lg placeholder:text-slate-600 focus:border-slate-700 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-semibold">
                What pays
              </label>
              <textarea
                value={ikigai.pays}
                onChange={(e) => setIkigai({...ikigai, pays: e.target.value})}
                placeholder="Markets, roles, and problems businesses pay to solve"
                className="w-full h-32 px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-lg placeholder:text-slate-600 focus:border-slate-700 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-semibold">
                What the world needs
              </label>
              <textarea
                value={ikigai.needs}
                onChange={(e) => setIkigai({...ikigai, needs: e.target.value})}
                placeholder="Who benefits? What positive impact?"
                className="w-full h-32 px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-lg placeholder:text-slate-600 focus:border-slate-700 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-2xl font-semibold">
                Ikigai Statement (2-3 lines)
              </label>
              <textarea
                value={ikigai.statement}
                onChange={(e) => setIkigai({...ikigai, statement: e.target.value})}
                placeholder="I help [who] achieve [outcome] by [how], using [skills] in [domain]."
                className="w-full h-40 px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-lg placeholder:text-slate-600 focus:border-slate-700 focus:outline-none resize-none"
              />
            </div>
          </div>
        </section>

        {/* AI Prompts */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">AI Prompts</h2>
            <p className="text-xl text-slate-400">Copy these to explore your ikigai with AI</p>
          </div>

          <div className="space-y-6">
            <div className="border border-slate-800 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-semibold">Career Coach Prompt</h3>
              <p className="text-slate-400 leading-relaxed font-mono text-sm bg-slate-900 p-4 rounded-lg">
                Act as a career coach. Ask me questions to map my ikigai (what I love, what I'm good at, what pays, what the world needs). Then summarize my top 3 intersections and suggest 5 role directions tailored to my profile.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("Act as a career coach. Ask me questions to map my ikigai (what I love, what I'm good at, what pays, what the world needs). Then summarize my top 3 intersections and suggest 5 role directions tailored to my profile.")
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
              >
                Copy
              </button>
            </div>

            <div className="border border-slate-800 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-semibold">Detailed Analysis Prompt</h3>
              <p className="text-slate-400 leading-relaxed font-mono text-sm bg-slate-900 p-4 rounded-lg">
                I will provide answers to: 1) What I love, 2) What I'm good at, 3) What pays, 4) What the world needs. Output: a) A 2–3 line ikigai statement. b) 3 role options with skill stacks. c) 10 skills to build, priority ordered. d) 5 starter projects with scope and evaluation ideas.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("I will provide answers to: 1) What I love, 2) What I'm good at, 3) What pays, 4) What the world needs. Output: a) A 2–3 line ikigai statement. b) 3 role options with skill stacks. c) 10 skills to build, priority ordered. d) 5 starter projects with scope and evaluation ideas.")
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="border border-slate-800 rounded-3xl p-12 text-center space-y-8 bg-gradient-to-br from-slate-900/50 to-slate-950/50">
          <h2 className="text-4xl font-bold">Next Steps</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Now that you've found your ikigai, build your 30/60/90 plan and create portfolio projects that showcase your unique intersection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-xl text-lg font-semibold transition-colors"
            >
              Read More Guides
            </Link>
            <Link
              href="/students"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-lg font-semibold transition-colors"
            >
              Back to Student Hub
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
