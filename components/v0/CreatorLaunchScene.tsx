'use client'

import { useState } from 'react'
import { ArrowRight, Check, Circle } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

type ProductView = 'storefront' | 'studio' | 'delivery'

const productViews: Array<{ id: ProductView; label: string }> = [
  { id: 'storefront', label: 'Storefront' },
  { id: 'studio', label: 'Release studio' },
  { id: 'delivery', label: 'Delivery' },
]

const readinessChecks = [
  ['Offer is specific', 'Ready', true],
  ['Delivery tested', 'Ready', true],
  ['Proof attached', 'Ready', true],
  ['Release window', 'Next', false],
] as const

const deliverySteps = [
  ['Confirm the decision', 'Repeat the product, edition, and delivery expectation.', 'Immediate'],
  ['Deliver the owned artifact', 'Send the download or access path without exposing credentials.', 'Automated'],
  ['Make failure recoverable', 'Give the buyer a support path and preserve the transaction state.', 'Observed'],
  ['Earn the second use', 'Ask one useful question after the customer has used the release.', 'Day seven'],
] as const

export function CreatorLaunchScene({ compact }: { compact: boolean }) {
  const [activeView, setActiveView] = useState<ProductView>('storefront')

  function selectView(view: ProductView) {
    setActiveView(view)
    trackEvent('v0_owned_product_scene_changed', { scene: view })
  }

  return (
    <div
      data-owned-product-live="true"
      className="h-full overflow-auto bg-[#eeeae1] text-[#11120f]"
    >
      <header
        className={`sticky top-0 z-20 flex border-b border-black/10 bg-[#eeeae1]/95 backdrop-blur ${compact ? 'flex-col items-start gap-3 px-4 py-3' : 'h-16 items-center justify-between px-7'}`}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#11120f] text-xs font-bold text-[#eeeae1]">
            0
          </span>
          <div>
            <p className="text-xs font-semibold">Creator Launch OS</p>
            <p className="mt-0.5 font-mono text-[8px] tracking-[0.08em] text-black/48">
              Edition Zero
            </p>
          </div>
        </div>
        <div
          className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-black/10 p-1"
          role="tablist"
          aria-label="Creator Launch OS views"
        >
          {productViews.map((view) => {
            const selected = activeView === view.id
            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectView(view.id)}
                className={`min-h-8 shrink-0 rounded-full px-3 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black motion-reduce:transition-none ${selected ? 'bg-[#11120f] text-[#eeeae1]' : 'text-black/52 hover:text-black'}`}
              >
                {view.label}
              </button>
            )
          })}
        </div>
      </header>

      {activeView === 'storefront' ? (
        <section
          role="tabpanel"
          className={`${compact ? 'block px-5 py-8' : 'grid min-h-[calc(100%-4rem)] grid-cols-[1.05fr_0.95fr] items-center gap-12 px-[clamp(2rem,7vw,7rem)] py-12'}`}
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.11em] text-black/48">
              A free creator-business starter
            </p>
            <h2
              className={`${compact ? 'mt-5 text-5xl' : 'mt-6 text-[clamp(3rem,5.6vw,5.75rem)]'} max-w-3xl font-display font-semibold leading-[0.9] tracking-[-0.065em]`}
            >
              Make the work easy to trust—and easier to{' '}
              <span className="font-serif font-normal italic">buy.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-6 text-black/58">
              A focused storefront with the operating view behind it. Replace the sample release,
              connect your checkout, and publish on your own domain.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => selectView('studio')}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#11120f] px-4 text-[11px] font-semibold text-[#eeeae1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Inspect the release
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => selectView('delivery')}
                className="text-[11px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                See delivery
              </button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-4 font-mono text-[8px] text-black/46">
              <span>Next.js 16</span>
              <span>Zero-secret demo</span>
              <span>MIT licensed</span>
              <span>Vercel-ready</span>
            </div>
          </div>

          <div className={`${compact ? 'mt-9' : ''} relative overflow-hidden rounded-[1.7rem] bg-[#11120f] p-6 text-[#f4f1e9] shadow-[0_30px_70px_rgba(95,88,69,0.24)]`}>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative">
              <div className="flex items-center justify-between font-mono text-[8px] text-white/46">
                <span>Release 01</span>
                <span className="rounded-full border border-white/15 px-2 py-1">Demo data</span>
              </div>
              <h3 className="mt-8 max-w-md font-serif text-3xl font-normal leading-tight sm:text-5xl">
                The Systems Field Guide
              </h3>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#c8ff4d]">92%</p>
              <div className="mt-6 border-t border-white/10">
                {readinessChecks.map(([label, status, ready]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-2 border-b border-white/10 py-3 text-[11px]"
                  >
                    {ready ? (
                      <Check className="h-3.5 w-3.5 text-[#c8ff4d]" aria-hidden="true" />
                    ) : (
                      <Circle className="h-3 w-3 text-[#c8ff4d]" aria-hidden="true" />
                    )}
                    <span className="font-medium">{label}</span>
                    <span className="font-mono text-[8px] text-white/42">{status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] bg-[#c8ff4d]" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeView === 'studio' ? (
        <section
          role="tabpanel"
          className={`${compact ? 'block' : 'grid min-h-[calc(100%-4rem)] grid-cols-[15.5rem_1fr]'} bg-[#11120f] text-[#f5f3ec]`}
        >
          <aside className={`${compact ? 'border-b px-4 py-5' : 'border-r p-6'} border-white/10`}>
            <p className="font-mono text-[9px] tracking-[0.1em] text-white/38">Release studio</p>
            <h2 className="mt-6 font-display text-2xl font-semibold leading-none tracking-[-0.04em]">
              Turn the offer into an operating loop.
            </h2>
            <div className={`${compact ? 'mt-5 flex overflow-x-auto' : 'mt-8'}`}>
              {['Systems Field Guide', 'Creator Sprint', 'Prompt Field Notes'].map((release, index) => (
                <button
                  key={release}
                  type="button"
                  className={`${compact ? 'min-w-36' : 'w-full'} rounded-xl px-3 py-3 text-left text-[11px] ${index === 0 ? 'bg-white/[0.07] text-white' : 'text-white/42'}`}
                >
                  <span className="mb-1 block font-mono text-[8px] text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {release}
                </button>
              ))}
            </div>
          </aside>
          <div className={`${compact ? 'p-5' : 'p-8'}`}>
            <div className={`${compact ? 'block' : 'flex items-end justify-between gap-8'} border-b border-white/10 pb-6`}>
              <div>
                <p className="font-mono text-[8px] text-white/34">Current release</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  Systems Field Guide
                </h3>
              </div>
              <p className={`${compact ? 'mt-4' : ''} max-w-md text-[11px] leading-5 text-white/45`}>
                The public storefront is one view. This workspace makes proof, delivery, and the
                next release decision visible.
              </p>
            </div>
            <div className={`${compact ? 'grid-cols-1' : 'grid-cols-3'} mt-5 grid gap-3`}>
              {[
                ['18', 'Waitlist subscribers'],
                ['7', 'Delivery checks passed'],
                ['3', 'Field notes attached'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-[9px] text-white/38">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              {[
                ['Offer and decision path', 'Copy review', 'Ready'],
                ['Checkout handoff', 'Fallback tested', 'Ready'],
                ['Delivery package', 'Clean account', 'Ready'],
                ['Post-release learning', 'Three events', 'Watching'],
              ].map(([label, note, status]) => (
                <div
                  key={label}
                  className={`grid ${compact ? 'grid-cols-[1fr_auto]' : 'grid-cols-[1fr_8rem_5rem]'} gap-4 border-b border-white/10 px-4 py-3 text-[10px] last:border-0`}
                >
                  <span className="font-medium">{label}</span>
                  {!compact ? <span className="text-white/38">{note}</span> : null}
                  <span className={status === 'Ready' ? 'text-[#c8ff4d]' : 'text-white/45'}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {activeView === 'delivery' ? (
        <section
          role="tabpanel"
          className={`${compact ? 'block px-5 py-8' : 'grid min-h-[calc(100%-4rem)] grid-cols-[0.8fr_1.2fr] items-center gap-14 px-[clamp(2rem,7vw,7rem)] py-12'}`}
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.1em] text-black/48">
              Delivery is part of the product
            </p>
            <h2 className={`${compact ? 'text-5xl' : 'text-[clamp(3rem,5vw,4.75rem)]'} mt-5 font-display font-semibold leading-[0.94] tracking-[-0.055em]`}>
              The promise survives the checkout.
            </h2>
            <p className="mt-6 text-sm leading-6 text-black/55">
              Each release defines what the buyer receives, where it lives, what happens when
              delivery fails, and which signal improves the next edition.
            </p>
          </div>
          <div className={`${compact ? 'mt-9' : ''} border-t border-black/10`}>
            {deliverySteps.map(([title, description, timing], index) => (
              <div
                key={title}
                className="grid grid-cols-[1.75rem_1fr_auto] gap-3 border-b border-black/10 py-4"
              >
                <span className="font-mono text-[8px]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-xs font-semibold">{title}</p>
                  <p className="mt-1 max-w-md text-[10px] leading-4 text-black/48">{description}</p>
                </div>
                <span className="h-fit rounded-full border border-black/10 px-2 py-1 font-mono text-[8px]">
                  {timing}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
