'use client'

import {
  Search,
  Play,
  Cpu,
  Bot,
  Sparkles,
  TrendingUp,
  Laugh,
  Activity,
  Wrench,
  Rocket,
  GraduationCap,
  Filter,
} from 'lucide-react'
import type { CategorySummary } from '@/lib/video-types'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'AI Foundations': Cpu,
  'AI Engineering': Wrench,
  'AI Agents': Bot,
  'Strategy & Business': TrendingUp,
  'Creator Economy': Rocket,
  'Creative AI & Music': Sparkles,
  'Mindset & Growth': Activity,
  'AI Culture': Laugh,
}

const personaTabs = [
  { id: 'all', label: 'All', icon: Play },
  { id: 'developer', label: 'Developer', icon: Cpu },
  { id: 'architect', label: 'Architect', icon: Bot },
  { id: 'creator', label: 'Creator', icon: Sparkles },
  { id: 'student', label: 'Student', icon: GraduationCap },
]

const levelTabs = [
  { id: 'all', label: 'All Levels' },
  { id: 'intro', label: 'Intro' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

interface CatalogFiltersProps {
  categories: CategorySummary[]
  selectedCategory: string | null
  selectedPersona: string
  selectedLevel: string
  searchQuery: string
  onCategoryChange: (cat: string | null) => void
  onPersonaChange: (persona: string) => void
  onLevelChange: (level: string) => void
  onSearchChange: (query: string) => void
}

export function CatalogFilters({
  categories,
  selectedCategory,
  selectedPersona,
  selectedLevel,
  searchQuery,
  onCategoryChange,
  onPersonaChange,
  onLevelChange,
  onSearchChange,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {personaTabs.map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onPersonaChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap text-sm ${
                selectedPersona === tab.id
                  ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                  : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
        <div className="w-px bg-white/10 mx-1 self-stretch" />
        {levelTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onLevelChange(tab.id)}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap text-sm ${
              selectedLevel === tab.id
                ? 'bg-cyan-500 text-black border-cyan-500 font-bold'
                : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="Search by title, author, or technology..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors backdrop-blur-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-5 py-3.5 rounded-2xl border transition-all whitespace-nowrap text-sm ${
              !selectedCategory
                ? 'bg-white text-black border-white font-bold'
                : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Filter
            return (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all whitespace-nowrap text-sm ${
                  selectedCategory === cat.name
                    ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
                <span className="text-[10px] opacity-60">({cat.count})</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
