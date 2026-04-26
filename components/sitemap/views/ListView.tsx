import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon, ExternalLink, Hash } from 'lucide-react'
import type { SitemapGraph } from '@/lib/sitemap/types'

export default function ListView({
  graph,
  categories,
}: {
  graph: { nodes: SitemapGraph['nodes']; links: SitemapGraph['links'] }
  categories: SitemapGraph['categories']
}) {
  // Group filtered nodes by category, then split routes vs images
  const grouped = new Map<
    string,
    { routes: typeof graph.nodes; images: typeof graph.nodes }
  >()

  for (const cat of categories) {
    grouped.set(cat.key, { routes: [], images: [] })
  }

  for (const node of graph.nodes) {
    if (!grouped.has(node.category)) {
      grouped.set(node.category, { routes: [], images: [] })
    }
    const bucket = grouped.get(node.category)!
    if (node.kind === 'route') bucket.routes.push(node)
    else if (node.kind === 'image') bucket.images.push(node)
  }

  const visibleCategories = categories.filter((c) => {
    const g = grouped.get(c.key)
    return g && (g.routes.length > 0 || g.images.length > 0)
  })

  if (visibleCategories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-white/40 text-sm">
        No matches. Clear filters or adjust search.
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {visibleCategories.map((cat) => {
        const g = grouped.get(cat.key)!
        return (
          <section key={cat.key}>
            <header className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
                aria-hidden
              />
              <h2 className="text-lg font-semibold text-white">{cat.label}</h2>
              <span className="text-xs text-white/30">
                {g.routes.length} route{g.routes.length === 1 ? '' : 's'} · {g.images.length}{' '}
                image{g.images.length === 1 ? '' : 's'}
              </span>
            </header>

            {g.routes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {g.routes.map((node) => (
                  <Link
                    key={node.id}
                    href={node.route || '/'}
                    className="group flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
                  >
                    <span
                      className="mt-1 inline-block w-1.5 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color, opacity: 0.7 }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <code className="text-sm font-mono text-white/90 group-hover:text-white truncate">
                          {node.label}
                        </code>
                        <ExternalLink className="w-3 h-3 text-white/30 shrink-0" />
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        {node.imageCount ?? 0} image
                        {(node.imageCount ?? 0) === 1 ? '' : 's'} · {node.status ?? 'ok'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {g.images.length > 0 && (
              <details className="group">
                <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 mb-3">
                  <ImageIcon className="w-3 h-3" />
                  <span>Show {g.images.length} image{g.images.length === 1 ? '' : 's'}</span>
                  <span className="text-white/30 group-open:hidden">▶</span>
                  <span className="text-white/30 hidden group-open:inline">▼</span>
                </summary>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {g.images.slice(0, 60).map((node) => (
                    <a
                      key={node.id}
                      href={node.imagePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square rounded-md overflow-hidden border border-white/5 hover:border-white/20 bg-white/[0.02] transition-all"
                    >
                      {node.imagePath && (
                        <Image
                          src={node.imagePath}
                          alt={node.label}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-cover"
                          unoptimized
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                        <code className="text-[9px] text-white/90 truncate font-mono">
                          {node.label}
                        </code>
                      </div>
                      {(node.usageCount ?? 0) > 1 && (
                        <span className="absolute top-1 right-1 inline-flex items-center gap-0.5 text-[9px] px-1 py-0.5 rounded-full bg-black/60 backdrop-blur text-white/80 border border-white/10">
                          <Hash className="w-2 h-2" />
                          {node.usageCount}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
                {g.images.length > 60 && (
                  <p className="mt-2 text-[11px] text-white/30">
                    Showing 60 of {g.images.length}. Use search to narrow.
                  </p>
                )}
              </details>
            )}
          </section>
        )
      })}
    </div>
  )
}
