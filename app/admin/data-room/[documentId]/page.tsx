import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, Download, FileArchive, FileText, LockKeyhole } from 'lucide-react'
import { auth } from '@/lib/auth'
import { getDataRoomBlobState } from '@/lib/data-room/blob'
import { formatDataRoomBytes, getDataRoomDocument } from '@/lib/data-room/registry'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Data Room Document · Admin',
  robots: { index: false, follow: false },
}

type PageProps = {
  params: Promise<{ documentId: string }>
}

export default async function DataRoomDocumentPage({ params }: PageProps) {
  const session = await auth()
  if (!session) redirect('/api/auth/signin?callbackUrl=/admin/data-room')

  const { documentId } = await params
  const document = getDataRoomDocument(documentId)
  if (!document) notFound()

  const state = await getDataRoomBlobState(document)
  const canPreview = state.status === 'uploaded' && document.type !== 'pptx'

  return (
    <main className="min-h-screen bg-[#030712] px-4 pb-24 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/data-room"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-amber-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Data room
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-amber-300/80">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Authenticated private document</span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{document.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{document.description}</p>

            <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
              {canPreview ? (
                <iframe
                  title={document.title}
                  src={`/api/admin/data-room/document/${document.id}`}
                  className="h-[72vh] min-h-[640px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-200">
                    {document.type === 'pptx' ? (
                      <FileArchive className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <FileText className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {state.status === 'uploaded' ? 'Download required' : 'Private object not available yet'}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                    {state.status === 'uploaded'
                      ? 'This file type is kept as a download instead of an inline browser preview.'
                      : state.message}
                  </p>
                  <a
                    href={`/api/admin/data-room/document/${document.id}?download=1`}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/15"
                  >
                    Download
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="text-sm font-semibold text-white">Document Control</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Status</dt>
                <dd className="mt-1 text-slate-200">{state.status}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Access</dt>
                <dd className="mt-1 text-slate-200">{document.accessClass}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Type</dt>
                <dd className="mt-1 text-slate-200">{document.type}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Size</dt>
                <dd className="mt-1 text-slate-200">{formatDataRoomBytes(document.sizeBytes)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">SHA-256</dt>
                <dd className="mt-1 break-all font-mono text-xs text-slate-300">{document.sha256}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Blob Path</dt>
                <dd className="mt-1 break-all font-mono text-xs text-slate-300">{document.blobPath}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  )
}
