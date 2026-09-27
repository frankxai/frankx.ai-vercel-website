'use client'

import type { MouseEvent } from 'react'
import { getSessionId } from '@/lib/client-analytics'

interface BookDownloadLinkProps {
  bookSlug: string
  bookTitle: string
  buttonColor: string
}

export default function BookDownloadLink({ bookSlug, bookTitle, buttonColor }: BookDownloadLinkProps) {
  const addSessionForAnalytics = (event: MouseEvent<HTMLAnchorElement>) => {
    try {
      const url = new URL(event.currentTarget.href)
      url.searchParams.set('sid', getSessionId())
      event.currentTarget.href = url.toString()
    } catch {
      // The plain link still works when browser storage is unavailable.
    }
  }

  return (
    <a
      href={`/api/download?product=${encodeURIComponent(bookSlug)}`}
      onClick={addSessionForAnalytics}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${buttonColor} text-white font-medium hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity text-sm`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download {bookTitle} PDF
    </a>
  )
}
