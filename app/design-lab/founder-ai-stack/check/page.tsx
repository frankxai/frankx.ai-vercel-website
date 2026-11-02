import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Founder AI stack reading checks',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

const widths = [375, 768, 1440] as const
const articlePath = '/design-lab/founder-ai-stack'

export default async function ReadingChecks({
  searchParams,
}: {
  searchParams: Promise<{ width?: string }>
}) {
  if (process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV === 'production') {
    notFound()
  }
  const query = await searchParams
  const width = widths.find((value) => String(value) === query.width) ?? 375

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] px-4 pb-16 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-screen-2xl space-y-5">
        <h1 className="text-balance text-2xl font-semibold">Reading checks</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-white/75">
          The frame gives the article a real CSS viewport at the selected width.
          It does not emulate a physical device, touch input, or browser engine.
        </p>
        <nav aria-label="Article viewport width" className="flex flex-wrap gap-3">
          {widths.map((value) => (
            <Link
              key={value}
              href={`?width=${value}`}
              aria-current={value === width ? 'page' : undefined}
              className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-sm text-white hover:border-emerald-300 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              {new Intl.NumberFormat('en-GB').format(value)}px
            </Link>
          ))}
          <Link href={articlePath} className="inline-flex min-h-11 items-center px-3 text-sm text-emerald-300 underline underline-offset-4 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
            Open the article
          </Link>
        </nav>
        <div className="overflow-x-auto rounded-xl border border-white/20">
          <iframe
            key={width}
            title={`Article at ${width}px`}
            src={articlePath}
            width={width}
            height={1000}
            className="block max-w-none border-0"
          />
        </div>
      </div>
    </main>
  )
}
