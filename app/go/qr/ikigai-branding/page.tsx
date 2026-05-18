import type { Metadata } from 'next'
import Image from 'next/image'

/**
 * QR code presentation surface for the Ikigai & Branding workshop.
 *
 * Use case: Frank pulls this up on a tablet or projector at NL Digital /
 * Madrid / future workshops. Attendees scan with their phone camera and
 * land directly on /workshops/ikigai-branding.
 *
 * Page is noindex — it's a presentation surface, not a public landing.
 * The QR encodes https://www.frankx.ai/workshops/ikigai-branding.
 *
 * SVG QR was generated via qrserver.com API with Error Correction Level
 * H (30% recovery) so scan reliability is high even at distance / on
 * imperfect screens.
 */

export const metadata: Metadata = {
  title: 'Scan to open the Ikigai & Branding Workshop · FrankX',
  description:
    'QR code presentation surface for the Ikigai & Branding workshop. Scan to open frankx.ai/workshops/ikigai-branding.',
  alternates: { canonical: '/go/qr/ikigai-branding' },
  robots: { index: false, follow: false },
}

export default function IkigaiQrPage() {
  const workshopUrl = 'frankx.ai/workshops/ikigai-branding'

  return (
    <main className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-2xl text-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-violet-300 mb-3">
          Ikigai &amp; Branding Workshop
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
          Scan to open
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
          Point your phone&apos;s camera at the code. Tap the link that appears.
          The full workshop opens in your browser.
        </p>

        <div className="relative inline-block mx-auto">
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_80px_-20px_rgba(255,255,255,0.18)]">
            <Image
              src="/images/qr/workshops-ikigai-branding.svg"
              alt="QR code linking to https://www.frankx.ai/workshops/ikigai-branding"
              width={600}
              height={600}
              className="w-[min(72vw,520px)] h-[min(72vw,520px)] block"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="mt-10 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">Or visit</p>
          <p className="text-base sm:text-lg font-medium text-white tracking-tight break-all">
            {workshopUrl}
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
          <span>One Coach. Seven modules. Walk out with your sentence.</span>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <span>~90 min</span>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <span>Free</span>
        </div>
      </div>
    </main>
  )
}
