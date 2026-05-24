import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import QRCode from 'qrcode'

import { createMetadata } from '@/lib/seo'

const TARGET_URL = 'https://frankx.ai/connect'

export const dynamic = 'force-static'

export const metadata: Metadata = createMetadata({
  title: 'QR Code — frankx.ai/connect',
  description:
    'Download a high-resolution QR code linking to frankx.ai/connect. Use it on slides, business cards, lanyards, or share at events.',
  path: '/connect/qr',
  noindex: true,
})

async function renderBrandedQrSvg(): Promise<string> {
  return QRCode.toString(TARGET_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 720,
    color: {
      dark: '#10b981',
      light: '#0a0a0b',
    },
  })
}

export default async function ConnectQrPage() {
  const svg = await renderBrandedQrSvg()

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-4 py-12 text-white sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[140px]" />
        <div className="absolute -bottom-32 -left-24 h-[440px] w-[440px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <Link
          href="/connect"
          className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden />
          Back to /connect
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
          frankx.ai · QR asset
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Scan to connect with{' '}
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
            Frank
          </span>
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
          High-resolution QR code linking to{' '}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/80">frankx.ai/connect</code>
          . Use on slides, business cards, lanyards, or display from your phone.
        </p>

        <div className="mt-8 w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-md sm:p-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] p-2 ring-1 ring-emerald-400/20">
            <div
              className="qr-svg-wrapper aspect-square w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href="/api/qr?fmt=png&size=2048"
              download="frankx-connect-qr-2048.png"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_-10px_rgba(16,185,129,0.55)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" aria-hidden />
              PNG · 2048px
            </a>
            <a
              href="/api/qr?fmt=svg"
              download="frankx-connect-qr.svg"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
            >
              <Download className="h-4 w-4" aria-hidden />
              SVG · vector
            </a>
          </div>
          <a
            href="/api/qr?fmt=png&size=2048&bg=transparent"
            download="frankx-connect-qr-transparent.png"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-white/70 backdrop-blur transition-all hover:border-white/20 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Transparent PNG (for dark slides)
          </a>
        </div>

        <div className="mt-8 grid w-full max-w-md gap-2 text-left text-xs text-white/55 sm:text-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Suggested uses
          </p>
          <ul className="space-y-1.5 leading-relaxed">
            <li>• Closing slide of a talk or pitch deck</li>
            <li>• Back of a business card</li>
            <li>• Lanyard insert at conferences</li>
            <li>• Lock-screen wallpaper for fast in-person sharing</li>
          </ul>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html:
            '.qr-svg-wrapper svg{width:100%!important;height:100%!important;display:block}',
        }}
      />
    </main>
  )
}
