import type { Metadata } from 'next'
import Link from 'next/link'
import { privateRobotsConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Private Letters | FrankX',
  robots: privateRobotsConfig,
}

export default function LettersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* Decorative element */}
        <div className="mb-12 flex justify-center">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-white/90 mb-6 tracking-tight">
          Private Letters
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          Words written for the people who matter most.
          <br />
          These pages exist only for those who hold the links.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/letters/future-frank"
            className="group flex items-center gap-3 text-slate-300 hover:text-violet-400 transition-colors duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors" />
            <span>Letter to Future Frank</span>
          </Link>

          <Link
            href="/letters/tien"
            className="group flex items-center gap-3 text-slate-300 hover:text-rose-400 transition-colors duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500/50 group-hover:bg-rose-400 transition-colors" />
            <span>Letter to Tien</span>
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex justify-center">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-slate-500/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
