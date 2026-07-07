import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowUpRight, Database, Download, FileArchive, FileText, LockKeyhole, ShieldCheck } from 'lucide-react'
import { auth } from '@/lib/auth'
import { getDataRoomBlobStates } from '@/lib/data-room/blob'
import { dataRoomDocuments, formatDataRoomBytes, getDataRoomStats } from '@/lib/data-room/registry'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Data Room · Admin',
  description: 'Private internal strategy document room.',
  robots: { index: false, follow: false },
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'uploaded'
      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
      : status === 'token-missing'
        ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
        : status === 'configured-missing'
          ? 'border-sky-400/30 bg-sky-400/10 text-sky-200'
          : 'border-rose-400/30 bg-rose-400/10 text-rose-200'

  const label =
    status === 'uploaded'
      ? 'Uploaded'
      : status === 'token-missing'
        ? 'Token missing'
        : status === 'configured-missing'
          ? 'Upload pending'
          : 'Check needed'

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${styles}`}>{label}</span>
}

function DocumentIcon({ type }: { type: string }) {
  if (type === 'pptx') return <FileArchive className="h-4 w-4" aria-hidden="true" />
  return <FileText className="h-4 w-4" aria-hidden="true" />
}

export default async function DataRoomPage() {
  const session = await auth()
  if (!session) redirect('/api/auth/signin?callbackUrl=/admin/data-room')

  const stats = getDataRoomStats()
  const blobStates = await getDataRoomBlobStates()
  const uploadedCount = Object.values(blobStates).filter((state) => state.status === 'uploaded').length
  const tokenConfigured = !Object.values(blobStates).some((state) => state.status === 'token-missing')

  return (
    <main className="min-h-screen bg-[#030712] px-4 pb-24 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-300/80">
          <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Private · strategy data room</span>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Starlight Data Room</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Owner-only document control for the internal business plan, board deck, whitepaper, community strategy,
              and routing matrix. Nothing here is public website content; private Blob storage is the delivery layer.
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-300/40 hover:bg-white/[0.06]"
          >
            Admin index
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <section className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Registered docs', value: stats.documentCount, detail: `${formatDataRoomBytes(stats.totalBytes)} total`, icon: Database },
            { label: 'Private class', value: stats.privateCount, detail: `${stats.publicSafeCount} public-safe`, icon: ShieldCheck },
            { label: 'Uploaded objects', value: uploadedCount, detail: tokenConfigured ? 'Private Blob checked' : 'Token not set here', icon: LockKeyhole },
            { label: 'PDF / deck / source', value: `${stats.pdfCount}/${stats.deckCount}/${stats.sourceCount}`, detail: 'viewer and download mix', icon: FileText },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                  <Icon className="h-4 w-4 text-amber-300/80" aria-hidden="true" />
                </div>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{item.value}</p>
                <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
              </div>
            )
          })}
        </section>

        <section className="mt-8 rounded-xl border border-amber-300/15 bg-amber-300/[0.035] p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold text-amber-100">Private by default</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-amber-100/70">
                The source registry keeps every document marked as internal-private and publicSafe=false. Upload uses
                Vercel Blob with access=private, and document access streams through an authenticated admin route.
              </p>
              <p className="mt-3 font-mono text-xs text-amber-100/60">
                npm run data-room:dry-run · DATA_ROOM_ENABLE_PRIVATE_BLOB_UPLOAD=true npm run data-room:upload
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Documents</h2>
          </div>

          <div className="divide-y divide-white/10">
            {dataRoomDocuments.map((document) => {
              const state = blobStates[document.id]
              return (
                <article key={document.id} className="grid gap-4 px-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-amber-200">
                        <DocumentIcon type={document.type} />
                      </span>
                      <StatusBadge status={state?.status ?? 'error'} />
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {document.type}
                      </span>
                    </div>
                    <h3 className="truncate text-base font-semibold text-white">{document.title}</h3>
                    <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">{document.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-slate-500">
                      <span>{document.id}</span>
                      <span>{formatDataRoomBytes(document.sizeBytes)}</span>
                      <span>{document.sha256.slice(0, 12)}...</span>
                    </div>
                    {state?.status !== 'uploaded' && state?.message ? (
                      <p className="mt-2 text-xs text-slate-500">{state.message}</p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <Link
                      href={`/admin/data-room/${document.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-300/40 hover:bg-white/[0.06]"
                    >
                      Open
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    <a
                      href={`/api/admin/data-room/document/${document.id}?download=1`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-300/40 hover:bg-white/[0.06]"
                    >
                      Download
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
