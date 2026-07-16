import Link from 'next/link'
import { ArrowRight, Lock, FileText, Wrench, Sparkles, BookOpen } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'Vault Preview | Inner Circle | FrankX',
  description:
    'A teaser of what lives inside the Inner Circle vault — agent templates, prompt packs, the Oracle-style use-case intake form, and full lab recordings. Members only after June 1, 2026.',
  path: '/inner-circle/vault-preview',
  noindex: true,
})

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
    { '@type': 'ListItem', position: 2, name: 'Inner Circle', item: 'https://frankx.ai/inner-circle' },
    { '@type': 'ListItem', position: 3, name: 'Vault Preview', item: 'https://frankx.ai/inner-circle/vault-preview' },
  ],
}

interface VaultItem {
  id: string
  title: string
  type: 'template' | 'prompt-pack' | 'masterclass' | 'lab-recording' | 'framework'
  icon: typeof FileText
  preview: string
  willInclude: string[]
  dropDate?: string
  size?: string
}

const VAULT_PREVIEW_ITEMS: VaultItem[] = [
  {
    id: 'oracle-coe-intake-form',
    title: 'The Oracle-Style Use-Case Intake Form (Solo Edition)',
    type: 'framework',
    icon: FileText,
    preview:
      'The exact 1-page brief I wrote at Oracle before any AI engagement started — sanitized of client specifics, adapted for solo operators. Fill it out for any agent you\'re about to build and you\'ll catch the governance and ethics gaps before you start coding.',
    willInclude: [
      'The 9 questions every CoE intake answers',
      'My personal fill-in template (3 examples)',
      'How to use it as a refusal filter for new AI initiatives',
      'Solo-mode adaptation notes',
    ],
    dropDate: 'June 1 (launch day)',
  },
  {
    id: 'agent-template-collection',
    title: 'Agent Template Collection',
    type: 'template',
    icon: Sparkles,
    preview:
      'The actual agent definitions that ship across FrankX, ACOS, and my Oracle work — 24+ specialized agents with system prompts, tools, composition patterns, and the rationale for each design choice.',
    willInclude: [
      '@integrity-guard (pre-publish gate, 5 sub-gates)',
      '@amplification-liaison (post-workshop repost automation)',
      '@hub-audit specialists (8 gates, archetype-aware)',
      '@prompt-conductor (13-agent Prompt Hub composer)',
      'Plus 20 more — same MIT license as ACOS public repo',
    ],
    dropDate: 'June 1 (launch day, batch 1) · ongoing',
  },
  {
    id: 'prompt-pack-creator-cm',
    title: 'Creator Mode Prompt Pack — 47 prompts',
    type: 'prompt-pack',
    icon: Wrench,
    preview:
      'The prompts I actually run on workdays. Not the polished "best of" Twitter list — the working set. Each prompt comes with: the use case, the model that runs it best, the typical output length, and the failure mode you\'ll hit if you copy it without context.',
    willInclude: [
      'Research dispatch (Monday morning scan)',
      'Hook generation (5 angles per topic)',
      'AI-slop detection (the 12-pattern checklist)',
      'Newsletter draft → polish pipeline',
      '47 total, organized by workflow',
    ],
    dropDate: 'June 8 (Week 1)',
  },
  {
    id: 'first-masterclass-agent-orchestration',
    title: 'Masterclass #1 — Agent Orchestration with Frank',
    type: 'masterclass',
    icon: BookOpen,
    preview:
      'June 22, 19:00 CET. 60 minutes live, indexed in the vault within 24h. The structure: 25 min Pillar 1 walkthrough (Strategy), 15 min ROI math case study, 10 min "what I refuse to automate," 10 min Q&A. Agenda built from member replies.',
    willInclude: [
      'Live attendance (Zoom)',
      'Recording + transcript indexed by topic',
      'Slide deck + speaker notes',
      'Code repo with all examples shown',
      'Follow-up Q&A in founders Slack',
    ],
    dropDate: 'June 22',
  },
  {
    id: 'lab-recording-first-build',
    title: 'Live Build Lab #1 — Recording + Artifacts',
    type: 'lab-recording',
    icon: Lock,
    preview:
      'The first live build lab ships within 7 days of launch. Format: 90 minutes, real-time problem to artifact, all decisions documented. The recording goes into the vault with timestamps, code diffs, and the post-lab implementation checklist.',
    willInclude: [
      '90-min recording with chapter markers',
      'Code artifacts (everything we built)',
      'Decision log (why we chose X over Y)',
      'Post-lab implementation checklist',
      'Next-lab prep brief',
    ],
    dropDate: 'June 8',
  },
]

const TYPE_LABEL: Record<VaultItem['type'], string> = {
  template: 'Template',
  'prompt-pack': 'Prompt Pack',
  masterclass: 'Masterclass',
  'lab-recording': 'Lab Recording',
  framework: 'Framework',
}

const TYPE_COLOR: Record<VaultItem['type'], string> = {
  template: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  'prompt-pack': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  masterclass: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  'lab-recording': 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  framework: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
}

export default function VaultPreviewPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
          <Link
            href="/inner-circle"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Inner Circle
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.05] px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-400 mb-6">
            <Lock className="w-3 h-3" />
            Members-only preview
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            What's in the vault.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            Five items you'll have access to within the first 30 days of joining. The vault is updated continuously after that — every shipped agent, every lab recording, every masterclass, every research brief drops here.
          </p>
        </div>
      </section>

      {/* Items */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
          {VAULT_PREVIEW_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-medium rounded border ${TYPE_COLOR[item.type]}`}
                      >
                        {TYPE_LABEL[item.type]}
                      </span>
                      {item.dropDate && (
                        <span className="text-xs text-white/40">Drops {item.dropDate}</span>
                      )}
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white leading-tight">
                      {item.title}
                    </h2>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-5">{item.preview}</p>

                <div className="rounded-lg border border-white/[0.04] bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2.5">
                    What's included
                  </p>
                  <ul className="space-y-1.5 text-sm text-white/65">
                    {item.willInclude.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500/60 mt-0.5">·</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Five items above. Vault gets a new drop every week after launch.
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Inner Circle opens Monday June 1, 2026 at 09:00 CET. Circle is $119/month or $999/year. Founding cohort capped at 100 — first to join June 1–7 get the founders Slack + exclusive July 20 masterclass + founders rate locked for life.
          </p>
          <Link
            href="/inner-circle"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-8 h-14 font-semibold text-white shadow-lg shadow-[#AB47C7]/30 transition-all hover:-translate-y-0.5"
          >
            Join the Waitlist — June 1 2026
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-white/40 mt-4">Cancel anytime · One-click unsubscribe · No spam</p>
        </div>
      </section>
    </main>
  )
}
