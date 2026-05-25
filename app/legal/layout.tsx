import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {children}
        <footer className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
            <a href="/legal/imprint" className="hover:text-zinc-300 transition-colors">Imprint</a>
            <a href="/legal/privacy" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="/legal/terms" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="/legal/refund" className="hover:text-zinc-300 transition-colors">Refund Policy</a>
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            Arcanea Labs BV &bull; Amsterdam, Netherlands &bull; KvK: [PENDING] &bull; BTW: [PENDING]
          </p>
        </footer>
      </div>
    </div>
  )
}
