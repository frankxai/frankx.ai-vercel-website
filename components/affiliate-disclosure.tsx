import Link from 'next/link'

type Provider =
  | 'vercel'
  | 'n8n'
  | 'anthropic'
  | 'openai'
  | 'google'
  | 'cursor'
  | 'notion'
  | 'dify'
  | 'oracle'

const PROVIDER_LABEL: Record<Provider, string> = {
  vercel: 'Vercel',
  n8n: 'n8n',
  anthropic: 'Anthropic (Claude)',
  openai: 'OpenAI',
  google: 'Google Cloud',
  cursor: 'Cursor',
  notion: 'Notion',
  dify: 'Dify',
  oracle: 'Oracle',
}

/**
 * Small, accessible affiliate disclosure block.
 * Include on any page that contains affiliate or referral links.
 *
 * Usage:
 *   <AffiliateDisclosure providers={['vercel', 'n8n']} />
 */
export function AffiliateDisclosure({
  providers,
  className,
}: {
  providers: Provider[]
  className?: string
}) {
  const list = providers
    .map((p) => PROVIDER_LABEL[p])
    .filter(Boolean)

  const formattedList =
    list.length <= 1
      ? list[0] ?? ''
      : list.length === 2
        ? `${list[0]} and ${list[1]}`
        : `${list.slice(0, -1).join(', ')}, and ${list.at(-1)}`

  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      className={`rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs text-zinc-400 leading-relaxed ${className ?? ''}`}
    >
      <p>
        <strong className="text-zinc-300 font-medium">Affiliate disclosure.</strong>{' '}
        This page links to {formattedList}. FrankX may earn a commission if you
        sign up through these links. We only recommend tools we use and teach
        in our workshops. Affiliate revenue supports free materials. Full policy
        at{' '}
        <Link href="/partners" className="text-cyan-400 hover:text-cyan-300 underline">
          /partners
        </Link>
        .
      </p>
    </aside>
  )
}

export default AffiliateDisclosure
