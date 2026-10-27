import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// Reuse the existing learning portals and the version-independent xAI provider
// anchor. Grok is a research destination until a learning portal is published.
const paths = [
  { name: 'ChatGPT', kind: 'Learning path', href: '/learn/chatgpt-mastery' },
  { name: 'Claude', kind: 'Learning path', href: '/learn/claude-mastery' },
  { name: 'Gemini', kind: 'Learning path', href: '/learn/gemini-mastery' },
  { name: 'Grok', kind: 'Research', href: '/llm-hub#xai' },
] as const

export function AiLearningLinks() {
  return (
    <nav aria-label="AI learning and research" className="border-t border-white/5">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-6 sm:px-6 md:grid-cols-4">
        {paths.map((path) => (
          <li key={path.name}>
            <Link
              href={path.href}
              prefetch={false}
              className="group flex min-h-20 items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <span>
                <span className="block text-base font-semibold text-white">{path.name}</span>
                <span className="mt-1 block text-sm text-white/70">{path.kind}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-white/60 group-hover:text-emerald-300" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
