import videos from '@/data/editorial-videos.json'

/** Supporting editorial media loads only when the reader presses play. */
export function ArticleVideo({ id }: { id: keyof typeof videos }) {
  const video = videos[id]
  if (!video) throw new Error(`Unknown editorial video: ${id}`)
  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-white/15">
      <video controls playsInline preload="none" poster={video.poster}
        aria-label={video.title} className="aspect-video w-full bg-black object-contain">
        <source src={video.src} type="video/mp4" />
        <a href={video.sourceUrl}>View {video.title} at the source</a>
      </video>
      <figcaption className="px-5 py-4 text-sm leading-relaxed text-white/75">
        {video.caption}{' '}
        <a href={video.sourceUrl} className="text-emerald-300 underline">Source: {video.credit}</a>
      </figcaption>
    </figure>
  )
}
