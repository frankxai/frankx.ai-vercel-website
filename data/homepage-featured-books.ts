/**
 * Human-curated homepage book showcase.
 * Do NOT replace with a blind registry.slice(0, N) — that buried flagship series
 * (e.g. The Wordless Laws) behind older catalog order.
 *
 * Order = narrative order on homepage, not registry insertion order.
 */
export type HomepageFeaturedBook = {
  slug: string
  title: string
  subtitle: string
  coverImage: string
  reason: string
}

export const homepageFeaturedBooks: HomepageFeaturedBook[] = [
  {
    slug: 'golden-age-of-intelligence',
    title: 'The Golden Age of Intelligence',
    subtitle: 'Awakening the Two Most Powerful Devices Ever Created',
    coverImage: '/images/books/golden-age-of-intelligence-cover.jpg',
    reason: 'Flagship manifesto — human + machine intelligence',
  },
  {
    slug: 'the-wordless-laws',
    title: 'The Wordless Laws',
    subtitle: 'Twelve Forces That Shape Every Life',
    coverImage: '/images/books/the-wordless-laws-cover.jpg',
    reason: 'Series Book One — concealed wisdom',
  },
  {
    slug: 'the-wordless-laws-book-two',
    title: 'The Wordless Laws, Book Two: The Practice',
    subtitle: 'The Forces Named — and How to Work Them',
    coverImage: '/images/books/the-wordless-laws-book-two-cover.jpg',
    reason: 'Series Book Two — named practice + experiments',
  },
  {
    slug: 'the-book-of-secrets',
    title: 'The Book of Secrets',
    subtitle: 'What Every Maker Learns Too Late',
    coverImage: '/images/books/the-book-of-secrets-cover.png',
    reason: 'Craft companion — how the work is made',
  },
  {
    slug: 'fable',
    title: 'Fable',
    subtitle: 'Stories for the age of machines',
    coverImage: '/images/books/fable-cover.jpg',
    reason: 'Narrative bridge to machines of loving grace',
  },
  {
    slug: 'self-development',
    title: 'The Art of Self-Development',
    subtitle: 'Energy, mind, soul, craft, capital, circle, legacy',
    coverImage: '/images/books/self-development-cover.png',
    reason: 'Holistic human OS pillars',
  },
]
