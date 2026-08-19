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
  id: 'star-show-us',
  title: 'Star Show Us',
  sunoId: 'e7d082d3-8ecd-4fdb-a8fa-582026554153',
  sunoUrl: 'https://suno.com/song/e7d082d3-8ecd-4fdb-a8fa-582026554153',
  // Cover is repo-hosted on purpose: the previous entry hotlinked cdn2.suno.ai and
  // that URL now 403s, so the homepage shipped a broken cover. Suno rotates CDN
  // variants without notice.
  audioUrl: 'https://cdn1.suno.ai/e7d082d3-8ecd-4fdb-a8fa-582026554153.mp3',
  imageUrl: '/images/music/star-show-us.jpg',
  genre: ['latin progressive house', 'violin', 'jazz'],
  duration: '4:26',
  kicker: 'Latest studio release',
  studioNote:
    'A current studio release—one creative artifact among the architecture, systems, books, and field notes built here.',
  reviewedAt: '2026-08-05',
  reviewStatus: 'approved',
}
