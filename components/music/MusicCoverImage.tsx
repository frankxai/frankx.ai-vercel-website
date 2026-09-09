'use client'

import { useState } from 'react'
import Image from 'next/image'

type MusicCoverImageProps = {
  /** Cover URL. Absent for tracks that never had one. */
  src?: string | null
  alt: string
  /** Passed straight to next/image; each grid has its own breakpoints. */
  sizes: string
  /** Tailwind gradient classes used when there is no usable cover. */
  fallbackClassName: string
}

/**
 * Track/playlist cover with a placeholder for the two ways a cover goes
 * missing: it was never set, or it 404s/403s at the origin.
 *
 * The second case is not hypothetical. The catalog hotlinks Suno cover art,
 * and Suno rotates CDN variants and retires URLs without notice — see the
 * note in data/homepage-featured-release.ts, where one cover was moved
 * in-repo after its hotlink started returning 403. Allowing the host in
 * next.config.mjs lets a live cover through; this handles the dead ones, so
 * a rotated URL degrades to the same gradient an absent cover gets instead
 * of a broken-image icon.
 */
export function MusicCoverImage({
  src,
  alt,
  sizes,
  fallbackClassName,
}: MusicCoverImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <div className={`absolute inset-0 ${fallbackClassName}`} />
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  )
}
