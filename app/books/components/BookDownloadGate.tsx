import BookDownloadLink from './BookDownloadLink'

interface BookDownloadGateProps {
  bookSlug: string
  bookTitle: string
  themeColor?: string
  className?: string
}

// Only these book routes have verified, registered public PDFs.
const downloadableBookSlugs = new Set([
  'love-and-poetry',
  'spartan-mindset',
  'self-development',
  'imagination',
  'manifestation',
  'golden-age',
])

export function hasBookPdf(bookSlug: string): boolean {
  return downloadableBookSlugs.has(bookSlug)
}

export default function BookDownloadGate({
  bookSlug,
  bookTitle,
  themeColor = 'emerald',
  className = '',
}: BookDownloadGateProps) {
  if (!hasBookPdf(bookSlug)) return null

  const colorMap: Record<string, { border: string; bg: string; text: string; button: string; glow: string }> = {
    rose:    { border: 'border-rose-500/20', bg: 'from-rose-500/5', text: 'text-rose-400', button: 'from-rose-700 to-rose-800', glow: 'bg-rose-500/10' },
    red:     { border: 'border-red-500/20', bg: 'from-red-500/5', text: 'text-red-400', button: 'from-red-700 to-red-800', glow: 'bg-red-500/10' },
    emerald: { border: 'border-emerald-500/20', bg: 'from-emerald-500/5', text: 'text-emerald-400', button: 'from-emerald-700 to-emerald-800', glow: 'bg-emerald-500/10' },
    violet:  { border: 'border-violet-500/20', bg: 'from-violet-500/5', text: 'text-violet-400', button: 'from-violet-700 to-violet-800', glow: 'bg-violet-500/10' },
    amber:   { border: 'border-amber-500/20', bg: 'from-amber-500/5', text: 'text-amber-400', button: 'from-amber-700 to-amber-800', glow: 'bg-amber-500/10' },
    gold:    { border: 'border-yellow-500/20', bg: 'from-yellow-500/5', text: 'text-yellow-400', button: 'from-yellow-700 to-yellow-800', glow: 'bg-yellow-500/10' },
  }

  const colors = colorMap[themeColor] || colorMap.emerald

  return (
    <div className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} via-transparent to-transparent p-6 sm:p-8 ${className}`}>
      <div className={`w-10 h-10 rounded-xl ${colors.glow} flex items-center justify-center mb-4`}>
        <svg className={`w-5 h-5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-white mb-1">
        Download {bookTitle} as PDF
      </h3>
      <p className="text-sm text-white/60 mb-5">
        Get the full book as a PDF. Free, with no email required.
      </p>

      <BookDownloadLink bookSlug={bookSlug} bookTitle={bookTitle} buttonColor={colors.button} />

      <p className="mt-5 text-xs text-white/50">
        Signal Loop sends notes on AI architecture and creative systems most weeks.{' '}
        <a href="/newsletter" className="underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          Explore the newsletter
        </a>
        . Signing up is separate from downloading.{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          Privacy policy
        </a>
        .
      </p>
    </div>
  )
}
