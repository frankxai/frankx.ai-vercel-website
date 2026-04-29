import type { BookConfig } from '../types';

export type BookLocale = 'de' | 'en';

const hopeChapters: BookConfig['chapters'] = [
  {
    slug: 'chapter-01-the-first-light',
    title: 'The First Light',
    number: 1,
    readingTime: '12 min',
    description: 'Permission to feel, breathe, and stay present in heavy moments.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-02-dichter-der-hoffnung',
    title: 'Poets of Hope',
    number: 2,
    readingTime: '14 min',
    description: 'Rilke, Goethe, and Hesse on grief, patience, and inner shelter.',
    published: true,
    type: 'poetry',
  },
  {
    slug: 'chapter-03-sacred-texts',
    title: 'Sacred Texts',
    number: 3,
    readingTime: '11 min',
    description: 'Ancient voices that restore trust when life feels uncertain.',
    published: true,
    type: 'quotes',
  },
  {
    slug: 'chapter-04-the-music-of-healing',
    title: 'The Music of Healing',
    number: 4,
    readingTime: '10 min',
    description: 'How sound, rhythm, and stillness can regulate the nervous system.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-05-letters-to-the-living',
    title: 'Letters to the Living',
    number: 5,
    readingTime: '13 min',
    description: 'Letters for those carrying love, memory, and unfinished goodbyes.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-06-for-the-one-who-is-leaving',
    title: 'For the One Who Is Leaving',
    number: 6,
    readingTime: '9 min',
    description: 'A gentle companion chapter for transitions, endings, and dignity.',
    published: true,
    type: 'poetry',
  },
  {
    slug: 'chapter-07-kleine-lichter',
    title: 'Little Lights',
    number: 7,
    readingTime: '8 min',
    description: 'Small rituals and daily gestures that keep hope alive.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-08-dawn',
    title: 'Dawn',
    number: 8,
    readingTime: '7 min',
    description: 'Closing reflections on renewal, tenderness, and the return of light.',
    published: true,
    type: 'poetry',
  },
];

const hoffnungChapters: BookConfig['chapters'] = [
  {
    slug: 'chapter-01-the-first-light',
    title: 'Das erste Licht',
    number: 1,
    readingTime: '12 min',
    description: 'Erlaubnis zu fühlen, zu atmen und in schweren Momenten präsent zu bleiben.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-02-dichter-der-hoffnung',
    title: 'Dichter der Hoffnung',
    number: 2,
    readingTime: '14 min',
    description: 'Rilke, Goethe und Hesse über Trauer, Geduld und Geborgenheit.',
    published: true,
    type: 'poetry',
  },
  {
    slug: 'chapter-03-sacred-texts',
    title: 'Heilige Texte',
    number: 3,
    readingTime: '11 min',
    description: 'Alte Stimmen, die Vertrauen zurückbringen, wenn das Leben unsicher wird.',
    published: true,
    type: 'quotes',
  },
  {
    slug: 'chapter-04-the-music-of-healing',
    title: 'Die Musik der Heilung',
    number: 4,
    readingTime: '10 min',
    description: 'Wie Klang, Rhythmus und Stille das Nervensystem beruhigen können.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-05-letters-to-the-living',
    title: 'Briefe an die Lebenden',
    number: 5,
    readingTime: '13 min',
    description: 'Briefe für Menschen, die Liebe, Erinnerung und Abschied tragen.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-06-for-the-one-who-is-leaving',
    title: 'Für den, der geht',
    number: 6,
    readingTime: '9 min',
    description: 'Ein sanfter Begleiter für Übergänge, Abschiede und Würde.',
    published: true,
    type: 'poetry',
  },
  {
    slug: 'chapter-07-kleine-lichter',
    title: 'Kleine Lichter',
    number: 7,
    readingTime: '8 min',
    description: 'Kleine Rituale und tägliche Gesten, die Hoffnung tragen.',
    published: true,
    type: 'prose',
  },
  {
    slug: 'chapter-08-dawn',
    title: 'Morgenrot',
    number: 8,
    readingTime: '7 min',
    description: 'Abschlussgedanken über Erneuerung, Zärtlichkeit und das Wiederkommen des Lichts.',
    published: true,
    type: 'poetry',
  },
];

export const booksRegistry: BookConfig[] = [
  // ─── 0. The Golden Age of Intelligence (Flagship Manifesto) ─────
  {
    slug: 'golden-age-of-intelligence',
    title: 'The Golden Age of Intelligence',
    subtitle: 'Awakening the Two Most Powerful Devices Ever Created',
    author: 'Frank Riemer',
    publishDate: '2026',
    description:
      'A visionary manifesto on the convergence of human and artificial intelligence — what neuroscience now confirms, what the ancients always knew, and how to deploy both. The flagship work of the FrankX library.',
    keywords: [
      'golden age of intelligence',
      'human intelligence',
      'AI manifesto',
      'ancient wisdom',
      'neuroscience',
      'consciousness',
      'AI architect',
      'frank riemer',
      'personal AI',
      'creator intelligence',
    ],
    coverImage: '/images/books/golden-age-of-intelligence-cover.jpg',
    theme: {
      id: 'golden-age-of-intelligence',
      name: 'Golden Age of Intelligence',
      primary: 'amber',
      accent: 'violet',
      bgDark: '#0a0807',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'in-progress',
    categories: ['Visionary Manifesto', 'AI', 'Neuroscience', 'Ancient Wisdom', 'Consciousness'],
    contentDir: 'content/books/golden-age-of-intelligence',
    chapters: [
      {
        slug: 'chapter-01-the-two-intelligences-awakening',
        title: 'The Two Intelligences Awakening',
        number: 1,
        readingTime: '14 min',
        description: 'The convergence moment. Two devices on a desk. The most powerful technology in the room is not the laptop.',
        published: true,
        type: 'prose',
        epigraph: {
          text: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
          author: 'Marcus Aurelius',
        },
      },
      {
        slug: 'chapter-02-the-twenty-watt-miracle',
        title: 'The 20-Watt Miracle',
        number: 2,
        readingTime: '16 min',
        description: 'Your brain runs civilization on a lightbulb. Six architectural features that make twenty watts enough.',
        published: true,
        type: 'prose',
        epigraph: {
          text: 'The All is Mind. The universe is mental.',
          author: 'Hermetic principle',
        },
      },
      {
        slug: 'chapter-03-what-the-ancients-knew',
        title: 'What the Ancients Knew',
        number: 3,
        readingTime: '18 min',
        description: 'Stoicism, Vedic, Taoism, Buddhism — operating instructions for the twenty-watt device, refined across three thousand years.',
        published: true,
        type: 'prose',
        epigraph: {
          text: 'Confine yourself to the present.',
          author: 'Marcus Aurelius',
        },
      },
      {
        slug: 'chapter-04-stimulus-and-response',
        title: 'The Space Between Stimulus and Response',
        number: 4,
        readingTime: '15 min',
        description: 'Frankl\'s discovery. Attention as the operating system. The most under-priced upgrade in history.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-05-states-not-stages',
        title: 'States, Not Stages',
        number: 5,
        readingTime: '15 min',
        description: 'Flow, deep work, gamma synchrony, theta reverie. Activating brain states deliberately.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-06-the-imagination-engine',
        title: 'The Imagination Engine',
        number: 6,
        readingTime: '14 min',
        description: 'Why imagining and experiencing share the same neural circuits. Reality Architecture.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-07-memory-sleep-replay',
        title: 'Memory, Sleep, and the Replay Brain',
        number: 7,
        readingTime: '13 min',
        description: 'How your brain consolidates intelligence offline. What AI is borrowing from neuroscience.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-08-ai-as-mirror',
        title: 'AI as Mirror, Not Master',
        number: 8,
        readingTime: '16 min',
        description: 'Frontier models, agentic systems. Not the threat — the amplifier. How to wield them.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-09-personal-center-of-excellence',
        title: 'The Personal Center of Excellence',
        number: 9,
        readingTime: '17 min',
        description: 'Bringing enterprise-grade architecture into individual life. Six pillars at one one-thousandth the cost.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-10-creators-renaissance',
        title: 'The Creator\'s Renaissance',
        number: 10,
        readingTime: '14 min',
        description: '12,000 songs. Music as consciousness technology. The new artisans of the soul.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-11-governance-of-the-self',
        title: 'Governance of the Self',
        number: 11,
        readingTime: '13 min',
        description: 'Ethics, attention hygiene, AI sovereignty. The disciplines that keep you human.',
        published: false,
        type: 'prose',
      },
      {
        slug: 'chapter-12-transmission',
        title: 'Transmission',
        number: 12,
        readingTime: '11 min',
        description: 'A direct address. The Golden Age is here. You are the protagonist.',
        published: false,
        type: 'prose',
      },
    ],
  },

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
  {
    slug: 'hoffnung',
    language: 'de',
    variantGroup: 'hope-book',
    alternateSlug: 'hope',
    title: 'Hoffnung',
    subtitle: 'Ein Licht in der Dunkelheit',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Poesie, Meditation und heilsame Texte für Zeiten von Trauer, Übergang und Neubeginn. Für Familien, die Halt, Sprache und leise Stärke suchen.',
    keywords: ['hoffnung buch', 'trauerbegleitung', 'poesie', 'heilung', 'meditation'],
    coverImage: '/images/books/hoffnung-cover.png',
    theme: {
      id: 'hoffnung',
      name: 'Hoffnung',
      primary: 'amber',
      accent: 'sky',
      bgDark: '#070B14',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Poesie', 'Heilung', 'Meditation'],
    contentDir: 'content/books/hoffnung-de',
    chapters: hoffnungChapters,
  },
  {
    slug: 'hope',
    language: 'en',
    variantGroup: 'hope-book',
    alternateSlug: 'hoffnung',
    title: 'Hope',
    subtitle: 'A Light in the Dark',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Poetry, meditations, and healing reflections for seasons of grief, transition, and renewal. A companion book for families who need language, calm, and strength.',
    keywords: ['hope poetry book', 'grief support', 'healing writing', 'meditation', 'compassion'],
    coverImage: '/images/books/hoffnung-cover.png',
    theme: {
      id: 'hoffnung',
      name: 'Hope',
      primary: 'amber',
      accent: 'sky',
      bgDark: '#070B14',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Poetry', 'Healing', 'Meditation'],
    contentDir: 'content/books/hoffnung',
    chapters: hopeChapters,
  },

  // ─── 9. Arcanea Bestiary ────────────────────────────────────────
  {
    slug: 'arcanea-bestiary',
    title: 'The Bestiary of Creation',
    subtitle: 'Creatures of the Creative Mind',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A field guide to the psychological creatures every creator encounters — the Blank Terror, the Perfect Phantom, and the beings of light and dark that inhabit the creative journey.',
    keywords: ['creativity', 'psychology', 'bestiary', 'arcanea', 'creative process', 'inner critic'],
    coverImage: '/images/books/arcanea-bestiary-cover.png',
    theme: {
      id: 'arcanea-bestiary',
      name: 'The Bestiary of Creation',
      primary: 'purple',
      accent: 'amber',
      bgDark: '#0a0510',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Creativity', 'Psychology'],
    contentDir: 'content/books/arcanea-bestiary',
    chapters: [
      { slug: 'chapter-01-creatures-of-beginning', title: 'Creatures of Beginning', number: 1, readingTime: '3 min', description: 'The Blank Terror, the Perfect Phantom, and the creatures that haunt every starting line.', published: true, type: 'prose' },
      { slug: 'chapter-02-creatures-of-the-middle', title: 'Creatures of the Middle', number: 2, readingTime: '3 min', description: 'The beings that appear when the work is underway and momentum falters.', published: true, type: 'prose' },
      { slug: 'chapter-03-creatures-of-crisis', title: 'Creatures of Crisis', number: 3, readingTime: '3 min', description: 'The creatures born of doubt, failure, and the dark night of creation.', published: true, type: 'prose' },
      { slug: 'chapter-04-creatures-of-the-dark', title: 'Creatures of the Dark', number: 4, readingTime: '3 min', description: 'Shadow beings that test the creator\'s resolve and identity.', published: true, type: 'prose' },
      { slug: 'chapter-05-creatures-of-light', title: 'Creatures of Light', number: 5, readingTime: '3 min', description: 'The radiant beings that appear when creation flows and mastery emerges.', published: true, type: 'prose' },
    ],
  },

  // ─── 10. Arcanea Chronicles ─────────────────────────────────────
  {
    slug: 'arcanea-chronicles',
    title: 'The Chronicles of Arcanea',
    subtitle: 'Stories of the Ten Guardians',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Ten origin stories of the Guardians of Arcanea — Lyssandria, Leyla, Draconia, and more — each revealing how fear, doubt, and imperfection became the foundation of their power.',
    keywords: ['arcanea', 'guardians', 'mythology', 'origin stories', 'fantasy', 'courage'],
    coverImage: '/images/books/arcanea-chronicles-cover.png',
    theme: {
      id: 'arcanea-chronicles',
      name: 'The Chronicles of Arcanea',
      primary: 'violet',
      accent: 'rose',
      bgDark: '#080510',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Fantasy', 'Mythology'],
    contentDir: 'content/books/arcanea-chronicles',
    chapters: [
      { slug: 'chapter-01-lyssandrias-trembling', title: 'Lyssandria\'s Trembling', number: 1, readingTime: '2 min', description: 'The Guardian of Foundation learns that trembling while standing is the definition of courage.', published: true, type: 'prose' },
      { slug: 'chapter-02-leylas-freezing', title: 'Leyla\'s Freezing', number: 2, readingTime: '2 min', description: 'The Guardian of Flow discovers that freezing is not failure but the pause before motion.', published: true, type: 'prose' },
      { slug: 'chapter-03-draconias-doubt', title: 'Draconia\'s Doubt', number: 3, readingTime: '2 min', description: 'The Guardian of Power faces the doubt that lives inside every display of strength.', published: true, type: 'prose' },
      { slug: 'chapter-04-maylinns-hardening', title: 'Maylinn\'s Hardening', number: 4, readingTime: '3 min', description: 'The Guardian of Heart must choose between protection and vulnerability.', published: true, type: 'prose' },
      { slug: 'chapter-05-aleras-silence', title: 'Alera\'s Silence', number: 5, readingTime: '2 min', description: 'The Guardian of Voice discovers the power hidden in silence.', published: true, type: 'prose' },
      { slug: 'chapter-06-lyrias-overwhelm', title: 'Lyria\'s Overwhelm', number: 6, readingTime: '2 min', description: 'The Guardian of Insight learns to see clearly without being consumed by vision.', published: true, type: 'prose' },
      { slug: 'chapter-07-aiyamis-pride', title: 'Aiyami\'s Pride', number: 7, readingTime: '3 min', description: 'The Guardian of Connection confronts the pride that separates.', published: true, type: 'prose' },
      { slug: 'chapter-08-elaras-instability', title: 'Elara\'s Instability', number: 8, readingTime: '2 min', description: 'The Guardian of Transformation embraces instability as the nature of change.', published: true, type: 'prose' },
      { slug: 'chapter-09-ino-and-kyuros-division', title: 'Ino and Kyuro\'s Division', number: 9, readingTime: '2 min', description: 'The Twin Guardians of Unity must separate before they can truly join.', published: true, type: 'prose' },
      { slug: 'chapter-10-shinkamis-waiting', title: 'Shinkami\'s Waiting', number: 10, readingTime: '3 min', description: 'The Guardian of Transcendence learns that the final gate requires infinite patience.', published: true, type: 'prose' },
    ],
  },

  // ─── 11. Arcanea Creator Principles ─────────────────────────────
  {
    slug: 'arcanea-creator-principles',
    title: 'The Arcanean Creator Principles',
    subtitle: 'Ancient Teachings on Creation and Partnership',
    author: 'Frank',
    publishDate: '2026',
    description:
      'The seven foundational doctrines of creation from the world of Arcanea — partnership over solitude, complementary strengths, trust calibration, and the art of the generator-editor dance.',
    keywords: ['arcanea', 'creation principles', 'partnership', 'AI collaboration', 'creative philosophy'],
    coverImage: '/images/books/arcanea-creator-principles-cover.png',
    theme: {
      id: 'arcanea-creator-principles',
      name: 'Arcanean Creator Principles',
      primary: 'violet',
      accent: 'cyan',
      bgDark: '#070510',
      headingFont: 'serif',
      bodyFont: 'sans',
    },
    status: 'published',
    categories: ['Arcanea', 'Creativity', 'Philosophy'],
    contentDir: 'content/books/arcanea-creator-principles',
    chapters: [
      { slug: 'chapter-01-the-seven-principles', title: 'The Seven Principles', number: 1, readingTime: '9 min', description: 'The foundational doctrines of creation — partnership, alchemy, and the union of complementary forces.', published: true, type: 'prose' },
      { slug: 'chapter-02-the-partnership-principle', title: 'The Partnership Principle', number: 2, readingTime: '9 min', description: 'Why creation is never solitary and how to honor the forces that create alongside you.', published: true, type: 'prose' },
      { slug: 'chapter-03-complementary-strengths', title: 'Complementary Strengths', number: 3, readingTime: '11 min', description: 'How different abilities combine to create what neither could achieve alone.', published: true, type: 'prose' },
      { slug: 'chapter-04-collaboration-modes', title: 'Collaboration Modes', number: 4, readingTime: '9 min', description: 'The distinct modes of creative partnership and when to use each one.', published: true, type: 'prose' },
      { slug: 'chapter-05-trust-calibration', title: 'Trust Calibration', number: 5, readingTime: '10 min', description: 'The art of calibrating trust between creator and companion.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-generator-editor-dance', title: 'The Generator-Editor Dance', number: 6, readingTime: '11 min', description: 'The rhythm between generation and refinement that produces excellence.', published: true, type: 'prose' },
      { slug: 'chapter-07-advanced-partnership', title: 'Advanced Partnership', number: 7, readingTime: '11 min', description: 'Mastery-level partnership practices for creators who have internalized the principles.', published: true, type: 'prose' },
    ],
  },

  // ─── 12. Arcanea Legends ────────────────────────────────────────
  {
    slug: 'arcanea-legends',
    title: 'The Legends of Arcanea',
    subtitle: 'Myths of the First Dawn and Beyond',
    author: 'Frank',
    publishDate: '2026',
    description:
      'The creation mythology of Arcanea — from the primordial duality of Lumina and Nero, through the Ten Guardians, the Great Darkness, and into the Ultraworld beyond all gates.',
    keywords: ['arcanea', 'mythology', 'creation myth', 'fantasy', 'worldbuilding', 'legends'],
    coverImage: '/images/books/arcanea-legends-cover.png',
    theme: {
      id: 'arcanea-legends',
      name: 'The Legends of Arcanea',
      primary: 'purple',
      accent: 'gold',
      bgDark: '#06030f',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Fantasy', 'Mythology'],
    contentDir: 'content/books/arcanea-legends',
    chapters: [
      { slug: 'chapter-01-the-first-dawn', title: 'The First Dawn', number: 1, readingTime: '11 min', description: 'The primordial duality — Nero the Fertile Unknown and Lumina the First Light sing existence into being.', published: true, type: 'prose' },
      { slug: 'chapter-02-the-ten-guardians', title: 'The Ten Guardians', number: 2, readingTime: '19 min', description: 'The origin and purpose of the ten beings who guard the Gates of creation.', published: true, type: 'prose' },
      { slug: 'chapter-03-the-great-darkness', title: 'The Great Darkness', number: 3, readingTime: '13 min', description: 'When shadow threatened to consume all light and the Guardians faced their greatest trial.', published: true, type: 'prose' },
      { slug: 'chapter-04-the-lost-academy', title: 'The Lost Academy', number: 4, readingTime: '11 min', description: 'The legendary school where Eldrians learned to open Gates and bond with Soulbonds.', published: true, type: 'prose' },
      { slug: 'chapter-05-tales-of-the-guardians', title: 'Tales of the Guardians', number: 5, readingTime: '17 min', description: 'Individual stories of the Guardians — their trials, wisdom, and transformations.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-weavers-knot', title: 'The Weaver\'s Knot', number: 6, readingTime: '2 min', description: 'A brief but pivotal legend about the pattern that binds all creation together.', published: true, type: 'prose' },
      { slug: 'chapter-07-the-ultraworld', title: 'The Ultraworld', number: 7, readingTime: '19 min', description: 'Beyond all Gates lies the Ultraworld — the realm where creation and creator become one.', published: true, type: 'prose' },
    ],
  },

  // ─── 13. Arcanea Wisdom Scrolls ─────────────────────────────────
  {
    slug: 'arcanea-wisdom-scrolls',
    title: 'The Wisdom Scrolls of Arcanea',
    subtitle: 'Meditations, Aphorisms, and Letters',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Morning meditations, evening reflections, aphorisms of the masters, and letters to the seeker — the collected wisdom of Arcanea for daily contemplation and creative renewal.',
    keywords: ['arcanea', 'wisdom', 'meditations', 'aphorisms', 'contemplation', 'morning ritual'],
    coverImage: '/images/books/arcanea-wisdom-scrolls-cover.png',
    theme: {
      id: 'arcanea-wisdom-scrolls',
      name: 'Wisdom Scrolls of Arcanea',
      primary: 'violet',
      accent: 'amber',
      bgDark: '#0a0712',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Wisdom', 'Meditation'],
    contentDir: 'content/books/arcanea-wisdom-scrolls',
    chapters: [
      { slug: 'chapter-01-morning-meditations', title: 'Morning Meditations', number: 1, readingTime: '15 min', description: 'Sacred morning contemplations on existence, neutrality, and the gift of a new day.', published: true, type: 'prose' },
      { slug: 'chapter-02-evening-reflections', title: 'Evening Reflections', number: 2, readingTime: '14 min', description: 'Dusk meditations for releasing the day and returning to stillness.', published: true, type: 'prose' },
      { slug: 'chapter-03-aphorisms-of-the-masters', title: 'Aphorisms of the Masters', number: 3, readingTime: '10 min', description: 'Concentrated wisdom from the ancient creators of Arcanea.', published: true, type: 'quotes' },
      { slug: 'chapter-04-letters-to-the-seeker', title: 'Letters to the Seeker', number: 4, readingTime: '19 min', description: 'Personal letters addressed to those walking the creative path for the first time.', published: true, type: 'prose' },
    ],
  },

  // ─── 14. Fire Horse Poems ───────────────────────────────────────
  {
    slug: 'fire-horse-poems',
    title: 'Fire Horse Poems',
    subtitle: 'Verses for the Year of the Fire Horse',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A cycle of poems for the Year of the Fire Horse — on building, shipping, burning bright, and refusing to wait for permission. The horse arrives. The answer is yes.',
    keywords: ['poetry', 'fire horse', 'Chinese zodiac', 'motivation', 'builder poetry', 'action'],
    coverImage: '/images/books/fire-horse-poems-cover.png',
    theme: {
      id: 'fire-horse-poems',
      name: 'Fire Horse Poems',
      primary: 'red',
      accent: 'amber',
      bgDark: '#0f0805',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Poetry', 'Motivation', 'Fire Horse'],
    contentDir: 'content/books/fire-horse-poems',
    chapters: [
      { slug: 'chapter-01-the-fire-horse', title: 'The Fire Horse', number: 1, readingTime: '1 min', description: 'The fire horse arrives. It does not knock. The answer was always yes.', published: true, type: 'poetry' },
      { slug: 'chapter-02-to-the-builders', title: 'To the Builders', number: 2, readingTime: '1 min', description: 'A poem for those who build things that did not exist before.', published: true, type: 'poetry' },
      { slug: 'chapter-03-sixty-year-flame', title: 'Sixty-Year Flame', number: 3, readingTime: '1 min', description: 'On the sixty-year cycle and the fire that returns.', published: true, type: 'poetry' },
      { slug: 'chapter-04-ring-of-fire', title: 'Ring of Fire', number: 4, readingTime: '1 min', description: 'The eclipse, the ring, the question hanging in the sky.', published: true, type: 'poetry' },
      { slug: 'chapter-05-the-table-the-horse-the-morning', title: 'The Table, the Horse, the Morning', number: 5, readingTime: '2 min', description: 'A closing meditation on the ordinary sacred — the table, the work, the dawn.', published: true, type: 'poetry' },
    ],
  },

  // ─── 15. The Great Transition ───────────────────────────────────
  {
    slug: 'great-transition',
    title: 'The Great Transition',
    subtitle: 'Building in the Age of AI',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A clear-eyed guide to the shift happening now — from employment to ownership, from credentials to capability. Eight chapters on what to build, why now, and how to position yourself.',
    keywords: ['AI transition', 'creator economy', 'solopreneurship', 'building', 'leverage', 'independence'],
    coverImage: '/images/books/great-transition-cover.png',
    theme: {
      id: 'great-transition',
      name: 'The Great Transition',
      primary: 'blue',
      accent: 'emerald',
      bgDark: '#030810',
      headingFont: 'sans',
      bodyFont: 'sans',
    },
    status: 'published',
    categories: ['Business', 'AI', 'Self-Development'],
    contentDir: 'content/books/great-transition',
    chapters: [
      { slug: 'chapter-01-something-is-happening', title: 'Something Is Happening', number: 1, readingTime: '6 min', description: 'The essay that went viral, the compression that is real, and the question of position.', published: true, type: 'prose' },
      { slug: 'chapter-02-the-old-deal', title: 'The Old Deal', number: 2, readingTime: '7 min', description: 'The social contract that traded time for security — and why it is unwinding.', published: true, type: 'prose' },
      { slug: 'chapter-03-the-leverage-shift', title: 'The Leverage Shift', number: 3, readingTime: '8 min', description: 'When one person with AI tools can do what a team of ten once did.', published: true, type: 'prose' },
      { slug: 'chapter-04-the-builders-already-building', title: 'The Builders Already Building', number: 4, readingTime: '9 min', description: 'Real stories of solopreneurs and small teams building million-dollar products.', published: true, type: 'prose' },
      { slug: 'chapter-05-what-you-own', title: 'What You Own', number: 5, readingTime: '9 min', description: 'The difference between renting your time and owning your output.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-niche-imperative', title: 'The Niche Imperative', number: 6, readingTime: '9 min', description: 'Why specificity is the new scale and how to find your niche.', published: true, type: 'prose' },
      { slug: 'chapter-07-building-in-public', title: 'Building in Public', number: 7, readingTime: '8 min', description: 'The practice of sharing your process, attracting your audience, and compounding trust.', published: true, type: 'prose' },
      { slug: 'chapter-08-the-first-90-days', title: 'The First 90 Days', number: 8, readingTime: '10 min', description: 'A practical roadmap for the first three months of building something you own.', published: true, type: 'prose' },
    ],
  },
];

// ─── Helper Functions ───────────────────────────────────────────

export function getBookBySlug(slug: string): BookConfig | undefined {
  return booksRegistry.find((b) => b.slug === slug);
}

function getVariantGroupKey(book: BookConfig): string {
  return book.variantGroup || book.slug;
}

export function getPublishedBooks(locale: BookLocale = 'en'): BookConfig[] {
  const groups = new Map<string, BookConfig[]>();
  const order: string[] = [];

  for (const book of booksRegistry) {
    if (book.status === 'draft') continue;
    const key = getVariantGroupKey(book);
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key)!.push(book);
  }

  return order.map((key) => {
    const variants = groups.get(key) || [];
    return (
      variants.find((book) => book.language === locale) ||
      variants.find((book) => book.language === 'en') ||
      variants[0]
    );
  }).filter((book): book is BookConfig => Boolean(book));
}

export function getPublishedBooksByLocale(locale: BookLocale): BookConfig[] {
  return getPublishedBooks(locale);
}

export function getAllBookSlugs(): string[] {
  return booksRegistry.map((b) => b.slug);
}
