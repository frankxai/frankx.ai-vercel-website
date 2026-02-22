'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Copy, Download, ArrowRight, Sparkles } from 'lucide-react'

const categoryOptions = [
  'creative',
  'technical',
  'systems',
  'research',
  'strategy',
  'operations',
]

const today = new Date().toISOString().slice(0, 10)

const initialState = {
  name: 'Creator Launch Architect',
  description: 'Design repeatable launch systems for creators with clear deliverables and next steps.',
  category: 'systems',
  mission: 'Turn creative ideas into shipped launches with structured plans, asset lists, and timelines.',
  triggers: 'launch plan\nrelease calendar\nshipping checklist',
  inputs: 'Offer or product concept\nAudience + distribution channels\nTimeline constraints',
  outputs: 'Launch plan\nAsset checklist\nExecution timeline',
  steps: 'Clarify launch objective and success metrics\nMap core assets and dependencies\nBuild a week-by-week schedule\nDefine handoffs + review checkpoints',
  guardrails: 'Always end with concrete next actions\nAvoid vague marketing language\nPrioritize clarity over hype',
  bestFor: 'Creators, brand builders, and launch teams who want repeatable shipping cadence.'
}

const toList = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

export default function SkillBuilderPage() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('')

  const slug = useMemo(() => toSlug(form.name) || 'custom-skill', [form.name])

  const template = useMemo(() => {
    const triggers = toList(form.triggers)
    const inputs = toList(form.inputs)
    const outputs = toList(form.outputs)
    const steps = toList(form.steps)
    const guardrails = toList(form.guardrails)

    const sectionList = (items: string[]) => items.map((item) => `- ${item}`).join('\n')

    return `---\nname: ${slug}\ndescription: ${form.description}\ncategory: ${form.category}\nversion: 1.0.0\nlast_updated: ${today}\n---\n\n# ${form.name}\n\n## Mission\n${form.mission}\n\n## Best For\n${form.bestFor}\n\n## Trigger Phrases\n${sectionList(triggers)}\n\n## Inputs\n${sectionList(inputs)}\n\n## Outputs\n${sectionList(outputs)}\n\n## Execution Steps\n${sectionList(steps)}\n\n## Guardrails\n${sectionList(guardrails)}\n`
  }, [form, slug])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template)
      setStatus('Copied to clipboard.')
    } catch (err) {
      setStatus('Copy failed. Please copy manually.')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([template], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'SKILL.md'
    a.click()
    URL.revokeObjectURL(url)
    setStatus('Download ready.')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                <Sparkles className="h-4 w-4" />
                Skill Builder
              </div>
              <h1 className="mt-4 text-4xl font-bold">Craft a skill file in minutes</h1>
              <p className="mt-3 text-white/60">
                Fill the fields, copy the generated SKILL.md, and drop it into your agent repo. Designed for Claude, Codex, Gemini, and custom agents.
              </p>
            </div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80"
            >
              Back to Skills
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Skill Name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            Description
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Mission
            <textarea
              value={form.mission}
              onChange={(e) => setForm({ ...form, mission: e.target.value })}
              className="min-h-[96px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Best For
            <input
              value={form.bestFor}
              onChange={(e) => setForm({ ...form, bestFor: e.target.value })}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Trigger Phrases (one per line)
            <textarea
              value={form.triggers}
              onChange={(e) => setForm({ ...form, triggers: e.target.value })}
              className="min-h-[80px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Inputs (one per line)
            <textarea
              value={form.inputs}
              onChange={(e) => setForm({ ...form, inputs: e.target.value })}
              className="min-h-[80px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Outputs (one per line)
            <textarea
              value={form.outputs}
              onChange={(e) => setForm({ ...form, outputs: e.target.value })}
              className="min-h-[80px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Execution Steps (one per line)
            <textarea
              value={form.steps}
              onChange={(e) => setForm({ ...form, steps: e.target.value })}
              className="min-h-[100px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Guardrails (one per line)
            <textarea
              value={form.guardrails}
              onChange={(e) => setForm({ ...form, guardrails: e.target.value })}
              className="min-h-[80px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </label>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 h-fit sticky top-24">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Generated SKILL.md</p>
            <span className="text-xs text-white/50">{slug}</span>
          </div>
          <pre className="mt-4 max-h-[420px] overflow-auto rounded-2xl border border-white/10 bg-[#050a12] p-4 text-xs text-white/70 whitespace-pre-wrap">
{template}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white"
              type="button"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80"
              type="button"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
          {status && <p className="mt-3 text-xs text-emerald-200/80">{status}</p>}
        </div>
      </section>
    </main>
  )
}
