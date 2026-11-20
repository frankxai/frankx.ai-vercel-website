'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'
import { YouTubeEmbed } from '@/components/embeds/UniversalEmbed'
import { trackEvent } from '@/lib/analytics'
import { films, watchUrl, type AlchemyFilm } from './films'

export default function ScreeningRoom() {
  const [current, setCurrent] = useState<AlchemyFilm | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (current && dialog.current && !dialog.current.open) dialog.current.showModal()
  }, [current])

  function play(film: AlchemyFilm) {
    setCurrent(film)
    trackEvent('alchemy_film_open', { video_id: film.id, format: film.format })
  }

  return (
    <>
      {(['Short', 'Film'] as const).map((format) => {
        const short = format === 'Short'
        return (
          <section id={short ? 'shorts' : 'films'} key={format} className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-14 pt-10 sm:px-10">
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/15 pb-4">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">{short ? 'Four transformations' : 'Inside the work'}</h2>
              <p className="text-sm text-slate-300">{short ? 'YouTube Shorts · 4 min 6 sec altogether' : 'Museum film, research talk and archive lecture'}</p>
            </div>
            <div className={short ? 'grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4' : 'grid gap-x-7 gap-y-10 md:grid-cols-3'}>
              {films.filter(film => film.format === format).map(film => (
                <article key={film.id}>
                  <button type="button" onClick={() => play(film)} aria-label={`Play ${film.title} by ${film.credit}`}
                    className={`group relative block w-full overflow-hidden rounded-xl bg-slate-950 text-white ring-1 ring-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${short ? 'aspect-[5/4] sm:aspect-[4/5]' : 'aspect-video'}`}>
                    <Image src={`https://img.youtube.com/vi/${film.id}/hqdefault.jpg`} fill alt="" sizes={short ? '(min-width:1024px) 280px,(min-width:640px) 48vw,92vw' : '(min-width:768px) 360px,92vw'} className="object-cover" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-12">
                      <span className="grid size-10 place-items-center rounded-full border border-white/70 bg-black/65 group-hover:bg-black"><Play className="size-4 fill-current" aria-hidden="true" /></span>
                      <span className="rounded bg-black/75 px-2 py-1 font-mono text-sm">{film.runtime}</span>
                    </span>
                  </button>
                  <p className="mt-4 text-sm font-medium text-cyan-200">{film.subject}</p>
                  <h3 className="mt-1 text-xl font-semibold leading-tight text-white"><a href={watchUrl(film)} className="hover:underline">{film.title}</a></h3>
                  <p className="mt-1 text-sm text-slate-400">{film.credit}</p>
                  <p className="mb-3 mt-3 text-base leading-relaxed text-slate-300">{film.cue}</p>
                  <a href={film.source.url} className="text-sm text-cyan-200 underline decoration-cyan-300/40 underline-offset-4">{film.source.title}</a>
                </article>
              ))}
            </div>
          </section>
        )
      })}
      <dialog ref={dialog} onClose={() => setCurrent(null)} aria-labelledby="alchemy-player-title"
        className="fixed inset-0 m-auto max-h-[92dvh] w-[min(94vw,860px)] overflow-y-auto rounded-2xl border border-white/20 bg-[#101419] p-4 text-white backdrop:bg-black/85">
        {current && (
          <>
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 id="alchemy-player-title" className="text-lg font-semibold">{current.title}</h2>
              <button type="button" onClick={() => dialog.current?.close()} aria-label="Close video" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30"><X aria-hidden="true" size={19} /></button>
            </div>
            <YouTubeEmbed key={current.id} id={current.id} title={current.title} autoplay showControls={false} aspectRatio={current.format === 'Short' ? '9:16' : '16:9'} className={current.format === 'Short' ? 'mx-auto w-full max-w-[min(38dvh,380px)]' : ''} />
            <p className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300"><span>{current.credit} · {current.runtime}</span><a className="text-cyan-200 underline" href={watchUrl(current)}>Watch on YouTube</a></p>
          </>
        )}
      </dialog>
    </>
  )
}
