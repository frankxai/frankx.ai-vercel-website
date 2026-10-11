'use client'

import { useState } from 'react'

export default function OfficialVideo({ title, embedUrl }: { title: string; embedUrl: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`w-full overflow-hidden rounded-lg bg-black ${loaded ? 'aspect-video' : 'min-h-[15rem]'}`}>
      {loaded ? (
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="flex min-h-[15rem] flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-sm text-white/70">Official publisher walkthrough</p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="min-h-11 rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:border-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Load video: {title}
          </button>
          <p className="max-w-sm text-xs leading-5 text-white/60">Loads the YouTube player after you choose to watch. No autoplay.</p>
        </div>
      )}
    </div>
  )
}
