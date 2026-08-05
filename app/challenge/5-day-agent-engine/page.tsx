'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const CHALLENGE_DAYS = [
  {
    day: 1,
    title: 'Day 1: Map Your Content Core & Voice Fingerprint',
    description: 'Establish your brand voice rules, anti-slop guidelines, and seed content topics.',
    deliverable: 'Voice Configuration File + Content Core Matrix',
  },
  {
    day: 2,
    title: 'Day 2: Build Your Research Scout Subagent',
    description: 'Deploy an automated research scout to harvest trends, papers, and high-performing hooks.',
    deliverable: 'Research Scout Prompt & CLI Config',
  },
  {
    day: 3,
    title: 'Day 3: Wire Audio & Video Atomization Pipelines',
    description: 'Convert voice memos and screen recordings into blogs, newsletters, and social threads.',
    deliverable: 'Atomization Workflow Script',
  },
  {
    day: 4,
    title: 'Day 4: Implement Quality Gates & Integrity Guard',
    description: 'Set up adversarial review loops to audit every piece of content before publishing.',
    deliverable: '5-Gate Integrity Checker',
  },
  {
    day: 5,
    title: 'Day 5: Launch Continuous Auto-Publishing Loop',
    description: 'Connect your engine to Vercel, GitHub, and email dispatchers for hands-free operations.',
    deliverable: 'Autonomous Content Engine Operational',
  },
]

export default function FiveDayChallengePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [joined, setJoined] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/v1/lead-ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          leadMagnetId: '5-day-agent-engine-challenge',
          icp: 'High-Performance Creator / Founder',
          variantId: 'A',
          source: 'challenge_funnel',
        }),
      })

      if (res.ok) {
        setJoined(true)
      }
    } catch (err) {
      console.error('Challenge signup error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="text-center mb-12">
          <Link
            href="/"
            aria-label="Back to home"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-400 hover:border-amber-500/40 transition-colors mb-6"
          >
            <span>← FrankX Sovereign AI System</span>
          </Link>
          <div className="inline-block mx-auto text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-4">
            Free 5-Day Guided Sprint
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build Your Zero-Headcount <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Autonomous Content Engine
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-xl text-neutral-300 max-w-3xl mx-auto">
            A step-by-step 5-day challenge to build, wire, and deploy an AI agent swarm that turns ideas into multi-channel content without slop.
          </p>
        </div>

        {/* Hero Form / Access Card */}
        <div className="max-w-xl mx-auto mb-16">
          {!joined ? (
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white">Join the Next Cohort</h3>
                <p className="text-xs text-neutral-400 mt-1">Includes Daily Email Guides + Notion Sprint Workspace</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your primary email address..."
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-amber-500/25 text-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining Challenge...' : 'Join 5-Day Challenge Free →'}
                </button>
              </form>

              <div className="mt-4 text-center text-xs text-neutral-500">
                100% Free. Instant access to Day 1 workbook + Notion workspace.
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">You're In! Welcome to the Challenge.</h3>
                <p className="text-sm text-neutral-300 mt-2">
                  Day 1 instructions have been dispatched to <strong>{email}</strong>.
                </p>
              </div>
              <a
                href="https://frankx.notion.site/FrankX-5Day-Challenge-Workspace"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3.5 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-colors"
              >
                Open Challenge Workspace (Notion)
              </a>
            </div>
          )}
        </div>

        {/* Challenge Curriculum Breakdown */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            The 5-Day Sprint Curriculum
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {CHALLENGE_DAYS.map((day) => (
              <div
                key={day.day}
                className="bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                    Day {day.day}
                  </div>
                  <h3 className="text-xl font-bold text-white">{day.title}</h3>
                  <p className="text-sm text-neutral-400 max-w-2xl">{day.description}</p>
                </div>

                <div className="shrink-0 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-mono text-neutral-300">
                  <span className="text-amber-400 font-semibold">Deliverable:</span> {day.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
