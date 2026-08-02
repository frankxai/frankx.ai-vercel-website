export type HomepageFeaturedRelease = {
  id: string
  title: string
  sunoId: string
  sunoUrl: string
  audioUrl: string
  imageUrl: string
  genre: string[]
  duration: string
  kicker: string
  studioNote: string
  reviewedAt: string
  reviewStatus: 'approved'
}

/**
 * Human-reviewed homepage release.
 *
 * Raw Suno catalog entries must never replace this object automatically. A weekly
 * scout may propose a candidate, but title, link, rights state, artwork, and copy
 * need an explicit review before this file changes.
 */
export const homepageFeaturedRelease: HomepageFeaturedRelease = {
  id: 'vibe-os-track',
  title: 'Vibe OS',
  sunoId: '9cbad174-9276-427f-9aed-1ba00c7db3db',
  sunoUrl: 'https://suno.com/song/9cbad174-9276-427f-9aed-1ba00c7db3db',
  audioUrl:
    'https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/music/9cbad174-9276-427f-9aed-1ba00c7db3db/9cbad174-9276-427f-9aed-1ba00c7db3db.mp3',
  imageUrl:
    'https://cdn2.suno.ai/video_gen_837e02b6-9eac-446a-9752-d2feb4b42ebc_video_upload_837e02b6-9eac-446a-9752-d2feb4b42ebc_cover_snapshot_0s_1767613535_image.jpeg',
  genre: ['female hip hop', 'bass-heavy', 'lyrical'],
  duration: '4:00',
  kicker: 'Studio opening track',
  studioNote:
    'A current studio release—one creative artifact among the architecture, systems, books, and field notes built here.',
  reviewedAt: '2026-07-11',
  reviewStatus: 'approved',
}
