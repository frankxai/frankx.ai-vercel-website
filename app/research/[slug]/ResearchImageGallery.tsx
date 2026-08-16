import type { GalleryFrame } from '@/lib/research/native-galleries'

export default function ResearchImageGallery({ frames }: { frames: GalleryFrame[] }) {
  if (!frames.length) return null
  return (
    <section id="gallery" className="mb-12">
      <h2 className="text-xl font-bold text-white mb-2">Frames that passed QA</h2>
      <p className="text-sm text-white/55 mb-6">
        Only published stills. Missed briefs stay off this page.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {frames.map((f) => (
          <figure key={f.src} className="rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
            <img
              src={f.src}
              alt={f.alt}
              width={1280}
              height={720}
              className="w-full h-auto aspect-video object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-white/60">
              {f.caption}
              <span className="block text-white/35 mt-0.5">{f.engine}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
