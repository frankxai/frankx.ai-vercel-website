import type { BookConfig } from '../types';

export const booksRegistry: BookConfig[] = [
  // ─── 1. Love & Poetry ───────────────────────────────────────────
  {
    slug: 'love-and-poetry',
    title: 'Love & Poetry',
    subtitle: 'Verses That Move the Soul',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A curated collection of the world\'s most beautiful love poetry — Rumi, Rilke, Goethe, Gibran — woven with original verse. Spanning centuries, cultures, and languages.',
    keywords: ['love poetry', 'Rumi', 'Rilke', 'Goethe', 'poetry collection', 'romantic poetry'],
    coverImage: '/images/books/love-and-poetry-cover.png',
    theme: {
      id: 'love-and-poetry',
      name: 'Love & Poetry',
      primary: 'rose',
      accent: 'gold',
      bgDark: '#0a0a0f',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Poetry', 'Love', 'Literature'],
    contentDir: 'content/books/love-and-poetry',
    chapters: [
      {
        slug: 'chapter-01-rumi-speaks',
        title: 'Rumi Speaks',
        number: 1,
        readingTime: '8 min',
        description: 'The mystic poet of love — seven meditations on the heart.',
        published: true,
        type: 'poetry',
        epigraph: {
          text: 'Let yourself be silently drawn by the strange pull of what you really love.',
          author: 'Rumi',
        },
      },
      {
        slug: 'chapter-02-dichter-der-liebe',
        title: 'Dichter der Liebe',
        number: 2,
        readingTime: '10 min',
        description: 'German poets of love — Fried, Goethe, and Rilke in their native tongue.',
        published: true,
        type: 'poetry',
        epigraph: {
          text: 'Es ist was es ist, sagt die Liebe.',
          author: 'Erich Fried',
        },
      },
      {
        slug: 'chapter-03-nha-tho-tinh-yeu',
        title: 'Nha Tho Tinh Yeu',
        number: 3,
        readingTime: '8 min',
        description: 'Vietnamese love poetry — the language of water, lotus, and longing.',
        published: true,
        type: 'poetry',
      },
      {
        slug: 'chapter-04-wisdom-of-the-ages',
        title: 'Wisdom of the Ages',
        number: 4,
        readingTime: '10 min',
        description: 'Gibran, Coelho, Saint-Exupery, Thich Nhat Hanh — love as philosophy.',
        published: true,
        type: 'quotes',
      },
      {
        slug: 'chapter-05-a-poem-for-you',
        title: 'A Poem for You',
        number: 5,
        readingTime: '6 min',
        description: 'Original poetry — verses written from lived experience.',
        published: true,
        type: 'poetry',
      },
    ],
  },

  // ─── 2. Spartan Mindset ─────────────────────────────────────────
  {
    slug: 'spartan-mindset',
    title: 'Spartan Mindset',
    subtitle: 'The Discipline of One More',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A manual for the relentless. Discipline, training, and the philosophy of pushing past limits. Every chapter is a rep you didn\'t think you had.',
    keywords: ['discipline', 'gym training', 'mental toughness', 'spartan', 'mindset', 'fitness philosophy'],
    coverImage: '/images/books/spartan-mindset-cover.png',
    theme: {
      id: 'spartan-mindset',
      name: 'Spartan Mindset',
      primary: 'red',
      accent: 'stone',
      bgDark: '#030712',
      headingFont: 'sans',
      bodyFont: 'sans',
    },
    status: 'in-progress',
    categories: ['Self-Development', 'Fitness', 'Mindset'],
    contentDir: 'content/books/spartan-mindset',
    chapters: [
      {
        slug: 'chapter-01-the-spartan-code',
        title: 'The Spartan Code',
        number: 1,
        readingTime: '12 min',
        description: 'The rules that govern the relentless. Non-negotiable principles for an unbreakable life.',
        published: true,
        type: 'prose',
        epigraph: {
          text: 'Spartans do not ask how many are the enemy but where are they.',
          author: 'Plutarch',
        },
      },
      {
        slug: 'chapter-02-iron-discipline',
        title: 'Iron Discipline',
        number: 2,
        readingTime: '14 min',
        description: 'How to build a body and mind that does not negotiate with weakness.',
        published: true,
        type: 'prose',
      },
      {
        slug: 'chapter-03-one-more-rep',
        title: 'One More Rep',
        number: 3,
        readingTime: '10 min',
        description: 'The philosophy that separates the ordinary from the exceptional.',
        published: true,
        type: 'prose',
        epigraph: {
          text: 'The last three or four reps is what makes the muscle grow.',
          author: 'Arnold Schwarzenegger',
        },
      },
      {
        slug: 'chapter-04-the-forge',
        title: 'The Forge',
        number: 4,
        readingTime: '12 min',
        description: 'Transforming pain into power. The training that builds character.',
        published: true,
        type: 'prose',
      },
      {
        slug: 'chapter-05-mind-over-matter',
        title: 'Mind Over Matter',
        number: 5,
        readingTime: '11 min',
        description: 'When the body says stop, the mind says one more.',
        published: true,
        type: 'prose',
      },
    ],
  },

  // ─── 3. The Golden Age of Creators ──────────────────────────────
  {
    slug: 'golden-age',
    title: 'The Golden Age of Creators',
    subtitle: 'The Democratization of Creative Capability and Distribution',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A transformative exploration of how the creator economy crossed $250 billion, how 45 million people now create professionally, and how the barriers to creative expression have evaporated.',
    keywords: ['creator economy', 'AI and creativity', 'golden age of intelligence', 'creative entrepreneurship'],
    coverImage: '/images/golden-age/hero-golden-age.png',
    theme: {
      id: 'golden-age',
      name: 'The Golden Age of Creators',
      primary: 'amber',
      accent: 'indigo',
      bgDark: '#0F172A',
      headingFont: 'serif',
      bodyFont: 'sans',
    },
    status: 'published',
    categories: ['Creator Economy', 'AI', 'Business'],
    contentDir: 'content/golden-age-book',
    chapters: [
      {
        slug: 'chapter-01-when-creation-calls',
        title: 'When Creation Calls',
        number: 1,
        readingTime: '18 min',
        description: 'The question beneath all questions: What am I here to create?',
        published: true,
        image: '/images/golden-age/chapter-01-when-creation-calls.png',
      },
      {
        slug: 'chapter-02-the-orchestration-age',
        title: 'The Orchestration Age',
        number: 2,
        readingTime: '14 min',
        description: 'From using AI to conducting AI agents like an orchestra.',
        published: true,
        image: '/images/golden-age/chapter-02-the-orchestration-age.png',
      },
      {
        slug: 'chapter-03-the-first-gesture',
        title: 'The First Gesture',
        number: 3,
        readingTime: '15 min',
        description: 'The genesis moment — when intent becomes creation and the first mark is made.',
        published: true,
        image: '/images/golden-age/chapter-03-the-first-gesture.png',
      },
    ],
  },

  // ─── 4. The Art of Self-Development ─────────────────────────────
  {
    slug: 'self-development',
    title: 'The Art of Self-Development',
    subtitle: 'Seven Pillars of a Complete Life',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A systematic approach to building every dimension of your life — energy, mind, soul, craft, capital, circle, and legacy. Not theory. Routines that work.',
    keywords: ['self-development', 'personal growth', 'routines', 'habits', 'life design'],
    coverImage: '/images/books/self-development-cover.png',
    theme: {
      id: 'self-development',
      name: 'The Art of Self-Development',
      primary: 'emerald',
      accent: 'cyan',
      bgDark: '#030f0a',
      headingFont: 'sans',
      bodyFont: 'sans',
    },
    status: 'in-progress',
    categories: ['Self-Development', 'Habits', 'Lifestyle'],
    contentDir: 'content/books/self-development',
    chapters: [
      { slug: 'chapter-01-energy', title: 'Energy', number: 1, readingTime: '12 min', description: 'Master your physical and vital energy through breathwork, nutrition, and movement.', published: true, type: 'prose' },
      { slug: 'chapter-02-mind', title: 'Mind', number: 2, readingTime: '14 min', description: 'Develop mental clarity, cognitive edge, and psychological resilience.', published: true, type: 'prose' },
      { slug: 'chapter-03-soul', title: 'Soul', number: 3, readingTime: '11 min', description: 'Connect with your deeper purpose and spiritual essence.', published: true, type: 'prose' },
      { slug: 'chapter-04-craft', title: 'Craft', number: 4, readingTime: '13 min', description: 'Sharpen your skills, build mastery, and create work that matters.', published: true, type: 'prose' },
      { slug: 'chapter-05-capital', title: 'Capital', number: 5, readingTime: '12 min', description: 'Build financial intelligence and create multiple income streams.', published: true, type: 'prose' },
      { slug: 'chapter-06-circle', title: 'Circle', number: 6, readingTime: '10 min', description: 'Curate your relationships and build a network of excellence.', published: true, type: 'prose' },
      { slug: 'chapter-07-legacy', title: 'Legacy', number: 7, readingTime: '11 min', description: 'Design a life that outlasts you. Build something that endures.', published: true, type: 'prose' },
    ],
  },

  // ─── 5. Imagination ─────────────────────────────────────────────
  {
    slug: 'imagination',
    title: 'Imagination',
    subtitle: 'Unlocking the Power of the Mind',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Your imagination is the most powerful technology you possess. This book teaches you how to wield it — creative visualization, mental models, and the architecture of thought.',
    keywords: ['imagination', 'creative visualization', 'mental models', 'cognitive expansion', 'mind power'],
    coverImage: '/images/books/imagination-cover.png',
    theme: {
      id: 'imagination',
      name: 'Imagination',
      primary: 'violet',
      accent: 'cyan',
      bgDark: '#0a0a12',
      headingFont: 'serif',
      bodyFont: 'sans',
    },
    status: 'in-progress',
    categories: ['Mind', 'Creativity', 'Psychology'],
    contentDir: 'content/books/imagination',
    chapters: [
      { slug: 'chapter-01-the-inner-theater', title: 'The Inner Theater', number: 1, readingTime: '12 min', description: 'The stage inside your mind where all creation begins.', published: true, type: 'prose' },
      { slug: 'chapter-02-creative-visualization', title: 'Creative Visualization', number: 2, readingTime: '14 min', description: 'The science and art of seeing what doesn\'t yet exist.', published: true, type: 'prose' },
      { slug: 'chapter-03-mental-models', title: 'Mental Models', number: 3, readingTime: '15 min', description: 'The frameworks that shape how innovators think.', published: true, type: 'prose' },
      { slug: 'chapter-04-the-architects-eye', title: 'The Architect\'s Eye', number: 4, readingTime: '12 min', description: 'Training yourself to see structure in chaos and possibility in constraint.', published: true, type: 'prose' },
      { slug: 'chapter-05-beyond-the-visible', title: 'Beyond the Visible', number: 5, readingTime: '10 min', description: 'When imagination becomes your operating system.', published: true, type: 'prose' },
    ],
  },

  // ─── 6. Manifestation ───────────────────────────────────────────
  {
    slug: 'manifestation',
    title: 'Manifestation',
    subtitle: 'The Architecture of Reality',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Not wishful thinking. Not magic. The grounded, psychological, and strategic approach to turning thought into reality — updated for the AI age.',
    keywords: ['manifestation', 'law of attraction', 'psychology of intention', 'goal achievement', 'mental architecture'],
    coverImage: '/images/books/manifestation-cover.png',
    theme: {
      id: 'manifestation',
      name: 'Manifestation',
      primary: 'gold',
      accent: 'purple',
      bgDark: '#0f0a05',
      headingFont: 'serif',
      bodyFont: 'sans',
    },
    status: 'in-progress',
    categories: ['Mindset', 'Psychology', 'Self-Development'],
    contentDir: 'content/books/manifestation',
    chapters: [
      { slug: 'chapter-01-the-architecture-of-reality', title: 'The Architecture of Reality', number: 1, readingTime: '14 min', description: 'Reality is not fixed. It is constructed — and you are the architect.', published: true, type: 'prose' },
      { slug: 'chapter-02-thought-as-blueprint', title: 'Thought as Blueprint', number: 2, readingTime: '12 min', description: 'How thought patterns become life patterns.', published: true, type: 'prose' },
      { slug: 'chapter-03-the-frequency-principle', title: 'The Frequency Principle', number: 3, readingTime: '13 min', description: 'Aligning your energy with what you want to attract.', published: true, type: 'prose' },
      { slug: 'chapter-04-aligned-action', title: 'Aligned Action', number: 4, readingTime: '11 min', description: 'Manifestation without action is daydreaming. Action without alignment is hustle.', published: true, type: 'prose' },
      { slug: 'chapter-05-the-evidence-journal', title: 'The Evidence Journal', number: 5, readingTime: '10 min', description: 'Tracking proof that the universe is responding.', published: true, type: 'exercises' },
    ],
  },
];

// ─── Helper Functions ───────────────────────────────────────────

export function getBookBySlug(slug: string): BookConfig | undefined {
  return booksRegistry.find((b) => b.slug === slug);
}

export function getPublishedBooks(): BookConfig[] {
  return booksRegistry.filter((b) => b.status !== 'draft');
}

export function getAllBookSlugs(): string[] {
  return booksRegistry.map((b) => b.slug);
}
