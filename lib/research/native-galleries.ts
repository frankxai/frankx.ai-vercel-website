export type GalleryFrame = {
  src: string
  alt: string
  caption: string
  engine: string
}

export const nativeGalleries: Record<string, GalleryFrame[]> = {
  'image-generation-bakeoff': [
    {
      src: '/research/image-curated-2026-08-16/grok-imagine-still-life.jpg',
      alt: 'Matte-black cylinder with a gold ring on slate, Grok Imagine',
      caption: 'Still-life · Grok Imagine',
      engine: 'grok-imagine-image',
    },
    {
      src: '/research/image-curated-2026-08-16/codex-still-life.jpg',
      alt: 'Standing black cylinder with a gold ring, Codex image_gen',
      caption: 'Still-life · Codex',
      engine: 'codex image_gen',
    },
    {
      src: '/research/image-curated-2026-08-16/agy-still-life.jpg',
      alt: 'Lying black cylinder with a gold ring, Antigravity',
      caption: 'Still-life · Antigravity',
      engine: 'agy generate_image',
    },
    {
      src: '/research/image-curated-2026-08-16/rain-street.jpg',
      alt: 'Empty rain-soaked night street with one lantern',
      caption: 'Photoreal · Grok Imagine',
      engine: 'grok-imagine-image',
    },
    {
      src: '/research/image-curated-2026-08-16/gold-hall.jpg',
      alt: 'Empty dark hall with a single gold shaft of light',
      caption: 'Interior · Grok Imagine',
      engine: 'grok-imagine-image',
    },
    {
      src: '/research/image-curated-2026-08-16/anime-inventor.jpg',
      alt: 'Original anime inventor at a workbench with a brass telescope',
      caption: 'Anime study · Grok Imagine',
      engine: 'grok-imagine-image',
    },
    {
      src: '/research/image-curated-2026-08-16/droid-collectible.jpg',
      alt: 'Cute cream 3D droid with a simple two-dot smile',
      caption: 'Collectible droid · Grok Imagine',
      engine: 'grok-imagine-image',
    },
  ],
}
