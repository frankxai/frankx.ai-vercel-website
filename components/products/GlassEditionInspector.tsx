'use client'

import { useState, type ReactNode } from 'react'
import type { GlassDisplayManifest } from '@/lib/products/glass-display-manifest'

const manifestPath = '/api/products/aurora-ui-kit/essential/manifest'

export default function GlassEditionInspector({ listingPrice, children }: { listingPrice?: string; children: ReactNode }) {
  const [manifest, setManifest] = useState<GlassDisplayManifest | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'unavailable'>('idle')
  async function inspect() {
    setStatus('loading')
    try {
      const response = await fetch(manifestPath, { credentials: 'omit', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(8000) })
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error()
      const { responseShape } = await import('@/lib/products/glass-display-manifest')
      const edition = responseShape.parse(await response.json())
      if (edition.assets.filter(asset => asset.kind === 'archive').length !== 1) throw new Error()
      setManifest(edition)
    } catch {
      setStatus('unavailable')
    }
  }

  const archive = manifest?.assets.find(asset => asset.kind === 'archive')
  return (
    <section id="glass-essential" aria-labelledby="glass-edition-title" className="mt-16 scroll-mt-24 border-t border-white/15 pt-10">
      <p className="text-sm font-medium text-cyan-300">Proposed Aurora edition · preview only</p>
      <h2 id="glass-edition-title" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {manifest?.product.title ?? 'Glass Core Essential'}
      </h2>
      {manifest && archive ? (
        <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="max-w-prose text-base leading-7 text-slate-300">Change the workspace name, switch themes and prepare a workspace. The controls run locally inside the preview.</p>
            <dl className="mt-5 divide-y divide-white/10 text-sm">
              <div className="py-3"><dt className="font-medium text-white">Edition contents</dt><dd className="mt-1 text-slate-300">19 typed React components, 24 utility icons and three themes.</dd></div>
              <div className="py-3"><dt className="font-medium text-white">Compatibility</dt><dd className="mt-1 text-slate-300">React {manifest.compatibility.declared.react} · {manifest.compatibility.declared.moduleFormat} · TypeScript declarations, CSS variables and a Tailwind 4 adapter.</dd></div>
              <div className="py-3"><dt className="font-medium text-white">Price and rights</dt><dd className="mt-1 text-slate-300">
                {listingPrice && <>The {listingPrice} catalog price applies to the original Aurora kit. </>}
                The proposed Glass price is {new Intl.NumberFormat('en', { style: 'currency', currency: manifest.commerce.priceHypothesis.currency, minimumFractionDigits: 0 }).format(manifest.commerce.priceHypothesis.amountMinor / 100)}.
                {' '}Source status is {manifest.license.source}. Commercial rights and terms await approval. Purchase is closed.
              </dd></div>
            </dl>
            <details className="mt-2 rounded-lg border border-white/10 px-4 text-sm text-slate-300">
              <summary className="cursor-pointer py-3 font-medium text-white">Inspect the release fingerprint</summary>
              <div className="space-y-2 pb-4">
                <p>{manifest.release.version} · {archive.bytes.toLocaleString('en-US')} bytes{archive.entries ? ` · ${archive.entries} verified entries` : ''}.</p>
                <p>Source revision <code className="break-all">{manifest.release.sourceRevision}</code></p>
                <p>Archive SHA-256 <code className="break-all">{archive.sha256}</code></p>
                <a className="inline-block py-2 text-cyan-300 underline" href={manifestPath}>Read the product manifest</a>
              </div>
            </details>
          </div>
          {children}
        </div>
      ) : (
        <div className="mt-4">
          <p role="status" className="mb-4 text-slate-300">{status === 'unavailable' ? 'The edition manifest is unavailable. Its preview is closed.' : 'Inspect the release, proposed terms and workspace controls.'}</p>
          <button type="button" onClick={inspect} disabled={status === 'loading'} className="min-h-11 rounded-lg border border-cyan-400/40 px-5 py-2 font-medium text-cyan-200 hover:bg-cyan-400/10">
            {status === 'loading' ? 'Loading edition…' : status === 'unavailable' ? 'Try again' : 'Inspect edition'}
          </button>
          <noscript><p className="mt-4 text-slate-300">Enable JavaScript to inspect the interactive edition.</p></noscript>
        </div>
      )}
    </section>
  )
}
