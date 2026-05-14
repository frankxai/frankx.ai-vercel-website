'use client'

import {
  Mic,
  Brain,
  Wand2,
  Send,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react'

interface StackTool {
  name: string
  why: string
  href: string
  badge?: 'free' | 'paid' | 'mcp' | 'core'
}

interface StackCategory {
  title: string
  icon: typeof Mic
  color: 'violet' | 'amber' | 'emerald' | 'sky' | 'rose'
  intent: string
  tools: StackTool[]
}

const CATEGORIES: StackCategory[] = [
  {
    title: 'Capture',
    icon: Mic,
    color: 'violet',
    intent: 'Catch raw inputs before they evaporate. Voice → text. Browser → notes. Phone → inbox.',
    tools: [
      {
        name: 'Loom',
        why: 'Chrome extension. Record screen + face + auto-transcript. Free tier is enough.',
        href: 'https://www.loom.com',
        badge: 'free',
      },
      {
        name: 'Voice Memos',
        why: 'Native on phone. Whisper transcribes anything. Walk and think.',
        href: 'https://support.apple.com/voice-memos',
        badge: 'free',
      },
      {
        name: 'Notion Web Clipper',
        why: 'Send articles to a single inbox. Tag later, batch-process Sunday.',
        href: 'https://www.notion.so/web-clipper',
        badge: 'free',
      },
      {
        name: 'Granola',
        why: 'AI meeting notes that do not record. Outputs structured action items.',
        href: 'https://www.granola.ai',
        badge: 'paid',
      },
    ],
  },
  {
    title: 'Think',
    icon: Brain,
    color: 'sky',
    intent: 'The wedge between half-formed idea and clear thesis. Pair with AI, not behind it.',
    tools: [
      {
        name: 'Claude Cowork',
        why: 'Two windows side by side. You type. Claude reasons. Faster than any solo draft.',
        href: 'https://claude.ai',
        badge: 'core',
      },
      {
        name: 'ChatGPT Projects',
        why: 'Persistent context across chats. Drop your brand voice once, reuse forever.',
        href: 'https://chat.openai.com',
        badge: 'paid',
      },
      {
        name: 'NotebookLM',
        why: 'Drop 10 sources. Get audio overviews. Best for research synthesis.',
        href: 'https://notebooklm.google.com',
        badge: 'free',
      },
      {
        name: 'Cursor',
        why: 'If you build: AI-native IDE. Composer mode replaces 70% of solo coding.',
        href: 'https://www.cursor.com',
        badge: 'paid',
      },
    ],
  },
  {
    title: 'Make',
    icon: Wand2,
    color: 'amber',
    intent: 'Turn idea into artifact. Image, audio, video, code. Preserve voice — never delegate the soul.',
    tools: [
      {
        name: 'Suno AI',
        why: 'Music generation that respects taste. 12 genre styles in one prompt.',
        href: 'https://suno.com',
        badge: 'paid',
      },
      {
        name: 'Nano Banana 2',
        why: 'Gemini 3.1 Flash Image. Photo-realistic generation with text-rendering that actually works.',
        href: 'https://aistudio.google.com',
        badge: 'core',
      },
      {
        name: 'Higgsfield',
        why: 'Soul Character training for face-consistent video. Product photoshoots, UGC, ads.',
        href: 'https://higgsfield.ai',
        badge: 'mcp',
      },
      {
        name: 'HyperFrames',
        why: 'Code-first video composition. Deterministic, version-controlled, no Adobe.',
        href: 'https://hyperframes.dev',
        badge: 'free',
      },
    ],
  },
  {
    title: 'Ship',
    icon: Send,
    color: 'emerald',
    intent: 'Move the artifact into the world on schedule. Distribution is the second draft.',
    tools: [
      {
        name: 'Buffer',
        why: 'Multi-platform scheduling. Free for 3 channels. Best for LinkedIn + Threads + X.',
        href: 'https://buffer.com',
        badge: 'free',
      },
      {
        name: 'Typefully',
        why: 'Thread composer + analytics. Pairs cleanly with the LinkedIn Top Voice playbook.',
        href: 'https://typefully.com',
        badge: 'paid',
      },
      {
        name: 'Beehiiv',
        why: 'Newsletter with native referral loops + paid tier when ready. Better than Substack for monetization.',
        href: 'https://www.beehiiv.com',
        badge: 'free',
      },
      {
        name: 'Lemon Squeezy',
        why: 'EU-friendly merchant of record. Sell digital products without VAT pain.',
        href: 'https://www.lemonsqueezy.com',
        badge: 'paid',
      },
    ],
  },
  {
    title: 'Measure',
    icon: BarChart3,
    color: 'rose',
    intent: 'What gets measured improves. What does not, drifts. Pick three metrics, not thirty.',
    tools: [
      {
        name: 'Plausible',
        why: 'Cookie-free, GDPR-clean web analytics. One number per page, no dashboards-of-dashboards.',
        href: 'https://plausible.io',
        badge: 'paid',
      },
      {
        name: 'Shield Analytics',
        why: 'LinkedIn-native. Tracks impressions, engagement velocity, top hooks.',
        href: 'https://shieldapp.ai',
        badge: 'paid',
      },
      {
        name: 'Vercel Analytics',
        why: 'If you host on Vercel: Web Vitals + audience built in. Free tier covers small sites.',
        href: 'https://vercel.com/analytics',
        badge: 'free',
      },
      {
        name: 'A simple notebook',
        why: 'Once a month, write what worked. The pattern is the metric. Beats every dashboard.',
        href: '#',
        badge: 'free',
      },
    ],
  },
]

const COLOR_MAP = {
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    text: 'text-violet-300',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-300',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-300',
  },
  sky: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    text: 'text-sky-300',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    text: 'text-rose-300',
  },
} as const

const BADGE_MAP = {
  free: { label: 'Free', class: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' },
  paid: { label: 'Paid', class: 'text-zinc-400 bg-white/[0.04] border-white/[0.08]' },
  mcp: { label: 'MCP', class: 'text-violet-300 bg-violet-500/10 border-violet-500/20' },
  core: { label: 'Core', class: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
} as const

export function GenCreatorStack() {
  return (
    <div id="gencreator-stack" className="space-y-6">
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
        <p className="text-sm text-zinc-400 leading-relaxed">
          Five jobs every creator runs: <span className="text-white">Capture · Think · Make · Ship · Measure</span>.
          The stack below is opinionated, not exhaustive. Pick one tool per job, master it, then expand.
          The goal is leverage, not toolbelt envy.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => {
          const colors = COLOR_MAP[cat.color]
          const Icon = cat.icon
          return (
            <div
              key={cat.title}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg} border ${colors.border}`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white">{cat.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{cat.intent}</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {cat.tools.map((tool) => {
                  const badge = tool.badge ? BADGE_MAP[tool.badge] : null
                  return (
                    <li key={tool.name}>
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.08] p-3 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white group-hover:text-violet-200 transition-colors">
                            {tool.name}
                          </span>
                          {badge && (
                            <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${badge.class}`}>
                              {badge.label}
                            </span>
                          )}
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-300 transition-colors ml-auto" />
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed">{tool.why}</p>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 sm:p-6">
        <p className="text-sm text-emerald-200 leading-relaxed">
          <span className="font-semibold">The discipline:</span> add a tool only when an existing tool fails you twice.
          Most creators have 30+ subscriptions and 3 they actually use. Be the second kind.
        </p>
      </div>
    </div>
  )
}
