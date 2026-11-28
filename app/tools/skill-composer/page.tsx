import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import { SkillComposerClient } from './SkillComposerClient'

export const metadata = createMetadata({
  title: 'AI Skill & Agent Stack Composer — Build Portable Guardrails',
  description:
    'Compose tailored AGENTS.md, CLAUDE.md, .mcp.json, skills-manifest.json, and shell installer scripts for Claude Code, Codex, Cursor, Antigravity, or OpenCode.',
  path: '/tools/skill-composer',
})

export default function SkillComposerPage() {
  return (
    <main className="min-h-screen bg-void pt-24 pb-20 text-white">
      <JsonLd
        type="WebPage"
        data={{
          name: 'FrankX AI Skill & Agent Stack Composer',
          description:
            'Interactive configurator outputting portable AGENTS.md, CLAUDE.md, .mcp.json, and installation scripts for coding agent teams.',
          url: 'https://www.frankx.ai/tools/skill-composer',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Skill & Stack Composer', href: '/tools/skill-composer' },
          ]}
        />

        <header className="mb-12 max-w-3xl">
          <p className="font-mono text-xs text-emerald-300">Instrument 06 · Cross-Harness Contracts</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            AI Skill &amp; Agent Stack Composer
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Select your role, coding harness, and verification guardrails to generate an honest,
            version-controlled configuration bundle with exact selected module counts.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-400">
            <Link href="/tools/webdesign" className="text-emerald-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
              Open Self-Service Webdesign Architect →
            </Link>
            <Link href="/tools" className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
              All studio instruments
            </Link>
          </div>
        </header>

        <SkillComposerClient />
      </div>
    </main>
  )
}
