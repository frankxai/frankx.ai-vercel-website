import Image from 'next/image'

interface DiagramProps {
  src: string
  alt: string
  caption?: string
}

export default function Diagram({ src, alt, caption }: DiagramProps) {
  return (
    <figure className="my-10">
      <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-[#0b1220] to-[#070d18] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        <div className="rounded-xl border border-white/10 bg-[#050a14] p-3">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            unoptimized
            loading="lazy"
            className="mx-auto h-auto w-full max-w-full"
          />
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-white/45">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
