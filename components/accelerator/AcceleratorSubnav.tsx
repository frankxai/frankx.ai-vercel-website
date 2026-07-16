import Link from 'next/link'

export const acceleratorNav = [
  { href: '/accelerator', label: 'Overview' },
  { href: '/accelerator/portfolio-os', label: 'Portfolio OS' },
  { href: '/accelerator/founders', label: 'For founders' },
  { href: '/accelerator/starlight', label: 'Starlight' },
  { href: '/accelerator/arcanea', label: 'Arcanea' },
  { href: '/accelerator/guide', label: 'Guide' },
] as const

export function AcceleratorSubnav({ active }: { active: string }) {
  return (
    <nav
      aria-label="Accelerator sections"
      className="border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3">
        {acceleratorNav.map((item) => {
          const isActive = active === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/45 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
        <Link
          href="/accelerator#apply"
          className="ml-auto whitespace-nowrap rounded-full bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/25"
        >
          Apply
        </Link>
        <Link
          href="/foundry"
          className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-emerald-400/70 transition-colors hover:text-emerald-300"
        >
          Foundry
        </Link>
      </div>
    </nav>
  )
}
