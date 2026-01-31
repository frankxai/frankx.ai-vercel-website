import Link from 'next/link'

/**
 * Preview Layout
 *
 * Adds a floating navigation bar to switch between variants quickly
 */

const variants = [
  { id: 'v1', name: 'Elite', color: 'bg-emerald-500' },
  { id: 'v2', name: 'Premium', color: 'bg-cyan-500' },
  { id: 'v3', name: 'Editorial', color: 'bg-violet-500' },
  { id: 'v4', name: 'Terminal', color: 'bg-green-500' },
  { id: 'v5', name: 'Vibrant', color: 'bg-pink-500' },
  { id: 'v6', name: 'Cinematic', color: 'bg-purple-600' },
  { id: 'v7', name: 'Minimal', color: 'bg-gray-500' },
  { id: 'v8', name: 'Brutalist', color: 'bg-rose-500' },
  { id: 'v9', name: 'Gradient', color: 'bg-indigo-500' },
  { id: 'v10', name: 'Feed', color: 'bg-blue-500' },
]

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

      {/* Floating variant switcher */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl">
        <div className="flex items-center gap-1">
          <span className="text-xs text-white/40 px-3 hidden sm:block">Preview:</span>
          {variants.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className="group relative px-3 py-2 rounded-full text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${v.color} mr-1.5`} />
              <span className="hidden sm:inline">{v.name}</span>
              <span className="sm:hidden">{v.id.toUpperCase()}</span>
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10 mx-1" />
          <Link
            href="/"
            className="px-3 py-2 rounded-full text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all"
          >
            Live
          </Link>
        </div>
      </nav>
    </>
  )
}
