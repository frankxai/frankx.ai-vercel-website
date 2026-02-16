'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SoulbookIcon from './SoulbookIcon'

/**
 * PillarReflection — structured "Your Turn" exercises shown after
 * Self-Development chapters. Data-driven: each pillar has 3 reflection
 * questions and 1 weekly action item. Users can check off completed items
 * and progress is saved to localStorage.
 */

interface PillarExercise {
  pillar: string
  icon: string
  color: string
  questions: string[]
  action: string
  nextPillar?: { title: string; chapter: string }
}

const exercises: Record<string, PillarExercise> = {
  'chapter-01-energy': {
    pillar: 'Energy',
    icon: 'vitality',
    color: 'emerald',
    questions: [
      'What are your top 3 energy drains this week? Can you eliminate or reduce one?',
      'How would you rate your sleep quality (1-10)? What one change could improve it?',
      'When was the last time you felt truly energized? What were you doing?',
    ],
    action: 'This week: Track your energy level (1-10) every 2 hours for 3 consecutive days. Identify the pattern.',
    nextPillar: { title: 'Mind', chapter: 'chapter-02-mind' },
  },
  'chapter-02-mind': {
    pillar: 'Mind',
    icon: 'awareness',
    color: 'cyan',
    questions: [
      'What is the dominant thought pattern you default to under stress?',
      'How much of your information intake is intentional vs reactive?',
      'Name one mental model that changed how you see the world.',
    ],
    action: 'This week: Do 2 hours of single-task deep work daily. No phone, no tabs, no interruptions.',
    nextPillar: { title: 'Soul', chapter: 'chapter-03-soul' },
  },
  'chapter-03-soul': {
    pillar: 'Soul',
    icon: 'soul',
    color: 'violet',
    questions: [
      'Can you name your top 5 non-negotiable values without hesitation?',
      'Does your calendar this week reflect what you say matters most?',
      'When was the last time you sat in complete silence for 20 minutes?',
    ],
    action: 'This week: Spend 20 minutes in solitude every morning — no phone, no music, no input. Just think.',
    nextPillar: { title: 'Craft', chapter: 'chapter-04-craft' },
  },
  'chapter-04-craft': {
    pillar: 'Craft',
    icon: 'craft',
    color: 'amber',
    questions: [
      'What is the one skill that would 10x your impact if you mastered it?',
      'How many hours of deliberate practice (not routine work) did you do this week?',
      'What have you shipped recently? What stopped you from shipping more?',
    ],
    action: 'This week: Identify your highest-leverage skill and do 1 hour of deliberate practice on it daily.',
    nextPillar: { title: 'Capital', chapter: 'chapter-05-capital' },
  },
  'chapter-05-capital': {
    pillar: 'Capital',
    icon: 'capital',
    color: 'yellow',
    questions: [
      'How many income streams do you currently have? What could you add?',
      'What percentage of your income are you investing in compounding assets?',
      'What financial decision from 5 years ago do you wish you could change?',
    ],
    action: 'This week: Calculate your exact savings rate. If it\'s below 20%, identify one expense to cut.',
    nextPillar: { title: 'Circle', chapter: 'chapter-06-circle' },
  },
  'chapter-06-circle': {
    pillar: 'Circle',
    icon: 'relationships',
    color: 'rose',
    questions: [
      'Who are the 5 people you spend the most time with? Do they elevate you?',
      'When was the last time you created genuine value for someone without expecting return?',
      'Is there someone in your life draining your energy that you need to distance from?',
    ],
    action: 'This week: Reach out to one person you admire but haven\'t talked to. Offer value first.',
    nextPillar: { title: 'Legacy', chapter: 'chapter-07-legacy' },
  },
  'chapter-07-legacy': {
    pillar: 'Legacy',
    icon: 'journey',
    color: 'purple',
    questions: [
      'If you wrote a letter to yourself 10 years from now, what would it say?',
      'What are you building that will outlast you?',
      'What would people say about you at your memorial — and is that what you want?',
    ],
    action: 'This week: Write down your "10-year vision" in one page. What does your ideal life look like in 2036?',
  },
}

const colorMap: Record<string, { bg: string; border: string; text: string; check: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', check: 'accent-emerald-500' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', check: 'accent-cyan-500' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', check: 'accent-violet-500' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', check: 'accent-amber-500' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', check: 'accent-yellow-500' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', check: 'accent-rose-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', check: 'accent-purple-500' },
}

export default function PillarReflection({ chapterSlug }: { chapterSlug: string }) {
  const exercise = exercises[chapterSlug]
  if (!exercise) return null

  const c = colorMap[exercise.color] || colorMap.amber
  const storageKey = `reflection-${chapterSlug}`

  const [checked, setChecked] = useState<boolean[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setChecked(JSON.parse(saved))
    } else {
      setChecked(new Array(exercise.questions.length + 1).fill(false))
    }
  }, [storageKey, exercise.questions.length])

  const toggle = (index: number) => {
    const next = [...checked]
    next[index] = !next[index]
    setChecked(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  const completedCount = checked.filter(Boolean).length
  const totalCount = exercise.questions.length + 1

  return (
    <div className={`my-12 rounded-xl border ${c.border} ${c.bg} p-6 md:p-8`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
          <SoulbookIcon id={exercise.icon} size="sm" className={c.text} />
        </div>
        <div>
          <h3 className="font-semibold text-white/80 text-sm">
            Your Turn — {exercise.pillar}
          </h3>
          <p className="text-xs text-white/30">
            {completedCount}/{totalCount} completed
          </p>
        </div>
      </div>

      {/* Reflection questions */}
      <div className="space-y-3 mb-5">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Reflect</p>
        {exercise.questions.map((q, i) => (
          <label
            key={i}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={checked[i] || false}
              onChange={() => toggle(i)}
              className={`mt-1 w-4 h-4 rounded border-white/20 bg-white/5 ${c.check} cursor-pointer`}
            />
            <span className={`text-sm leading-relaxed transition-colors ${
              checked[i] ? 'text-white/30 line-through' : 'text-white/60 group-hover:text-white/80'
            }`}>
              {q}
            </span>
          </label>
        ))}
      </div>

      {/* Weekly action */}
      <div className="rounded-lg bg-black/20 border border-white/[0.04] p-4">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Weekly Action</p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={checked[exercise.questions.length] || false}
            onChange={() => toggle(exercise.questions.length)}
            className={`mt-1 w-4 h-4 rounded border-white/20 bg-white/5 ${c.check} cursor-pointer`}
          />
          <span className={`text-sm font-medium leading-relaxed transition-colors ${
            checked[exercise.questions.length] ? 'text-white/30 line-through' : 'text-white/70 group-hover:text-white/90'
          }`}>
            {exercise.action}
          </span>
        </label>
      </div>

      {/* Next pillar CTA */}
      {exercise.nextPillar && (
        <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between">
          <span className="text-xs text-white/25">Next pillar</span>
          <Link
            href={`/books/self-development/${exercise.nextPillar.chapter}`}
            className={`text-xs font-medium ${c.text} hover:underline underline-offset-2 transition-colors`}
          >
            {exercise.nextPillar.title} &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
