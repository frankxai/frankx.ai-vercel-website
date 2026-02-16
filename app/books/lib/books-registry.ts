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
      {
        slug: 'chapter-06-nerudas-fire',
        title: 'Neruda\'s Fire',
        number: 6,
        readingTime: '12 min',
        description: 'Pablo Neruda — love as elemental force, fire, ocean, and earth.',
        published: true,
        type: 'poetry',
        epigraph: { text: 'I want to do with you what spring does with the cherry trees.', author: 'Pablo Neruda' },
      },
      {
        slug: 'chapter-07-mary-olivers-instructions',
        title: 'Mary Oliver\'s Instructions',
        number: 7,
        readingTime: '14 min',
        description: 'Loving the world through careful seeing — attention as devotion.',
        published: true,
        type: 'poetry',
        epigraph: { text: 'Instructions for living a life: Pay attention. Be astonished. Tell about it.', author: 'Mary Oliver' },
      },
      {
        slug: 'chapter-08-hafiz-and-the-gift',
        title: 'Hafiz and the Gift',
        number: 8,
        readingTime: '12 min',
        description: 'The Persian poet of joy — love as celebration, ecstasy, divine play.',
        published: true,
        type: 'poetry',
        epigraph: { text: 'I wish I could show you, when you are lonely or in darkness, the astonishing light of your own being.', author: 'Hafiz' },
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
    status: 'published',
    categories: ['Self-Development', 'Fitness', 'Mindset'],
    contentDir: 'content/books/spartan-mindset',
    chapters: [
      { slug: 'chapter-01-the-spartan-code', title: 'The Spartan Code', number: 1, readingTime: '12 min', description: 'The rules that govern the relentless. Non-negotiable principles for an unbreakable life.', published: true, type: 'prose', epigraph: { text: 'Spartans do not ask how many are the enemy but where are they.', author: 'Plutarch' } },
      { slug: 'chapter-02-iron-discipline', title: 'Iron Discipline', number: 2, readingTime: '14 min', description: 'Building a body and mind of unyielding strength.', published: true, type: 'prose' },
      { slug: 'chapter-03-one-more-rep', title: 'One More Rep', number: 3, readingTime: '10 min', description: 'The philosophy that separates the ordinary from the exceptional.', published: true, type: 'prose', epigraph: { text: 'The last three or four reps is what makes the muscle grow.', author: 'Arnold Schwarzenegger' } },
      { slug: 'chapter-04-the-forge', title: 'The Forge', number: 4, readingTime: '12 min', description: 'Transforming pain into power. The training that builds character.', published: true, type: 'prose' },
      { slug: 'chapter-05-mind-over-matter', title: 'Mind Over Matter', number: 5, readingTime: '11 min', description: 'When the body says stop, the mind says one more.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-arena', title: 'The Arena', number: 6, readingTime: '12 min', description: 'Competition, adversity, and the value of stepping into the ring.', published: true, type: 'prose', epigraph: { text: 'The impediment to action advances action. What stands in the way becomes the way.', author: 'Marcus Aurelius' } },
      { slug: 'chapter-07-fuel-and-recovery', title: 'Fuel and Recovery', number: 7, readingTime: '13 min', description: 'Nutrition as weapon, sleep as competitive advantage.', published: true, type: 'prose', epigraph: { text: 'Let food be thy medicine and medicine be thy food.', author: 'Hippocrates' } },
      { slug: 'chapter-08-the-brotherhood', title: 'The Brotherhood', number: 8, readingTime: '11 min', description: 'Warriors need other warriors. Iron sharpens iron.', published: true, type: 'prose', epigraph: { text: 'As iron sharpens iron, so one person sharpens another.', author: 'Proverbs 27:17' } },
      { slug: 'chapter-09-stoic-foundations', title: 'Stoic Foundations', number: 9, readingTime: '14 min', description: 'Marcus Aurelius, Epictetus, Seneca — the philosophy behind the warrior.', published: true, type: 'prose', epigraph: { text: 'You have power over your mind — not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius' } },
      { slug: 'chapter-10-the-long-game', title: 'The Long Game', number: 10, readingTime: '12 min', description: 'Patience, compound returns, and the 1% daily principle.', published: true, type: 'prose', epigraph: { text: 'Every action is a vote for the type of person you wish to become.', author: 'James Clear' } },
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
      { slug: 'chapter-04-the-tools-of-the-golden-age', title: 'The Tools of the Golden Age', number: 4, readingTime: '16 min', description: 'AI tools as creative amplifiers — Suno, Midjourney, Claude, Cursor — and the $250B creator economy.', published: true, type: 'prose', epigraph: { text: 'Creativity is just connecting things.', author: 'Steve Jobs' } },
      { slug: 'chapter-05-building-your-golden-age', title: 'Building Your Golden Age', number: 5, readingTime: '18 min', description: 'Practical blueprint: creation tools + distribution + monetization + audience trust.', published: true, type: 'prose', epigraph: { text: 'Seek wealth, not money or status. Wealth is having assets that earn while you sleep.', author: 'Naval Ravikant' } },
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
    status: 'published',
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
      { slug: 'chapter-08-rituals', title: 'Rituals', number: 8, readingTime: '14 min', description: 'Daily practices that compound — morning, evening, weekly, seasonal.', published: true, type: 'prose', epigraph: { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' } },
      { slug: 'chapter-09-environment', title: 'Environment', number: 9, readingTime: '13 min', description: 'Designing your physical and social world for growth.', published: true, type: 'prose', epigraph: { text: 'We shape our buildings, and afterwards our buildings shape us.', author: 'Winston Churchill' } },
      { slug: 'chapter-10-integration', title: 'Integration', number: 10, readingTime: '15 min', description: 'All seven pillars working together as a unified system.', published: true, type: 'prose', epigraph: { text: 'You never change things by fighting the existing reality. To change something, build a new model.', author: 'Buckminster Fuller' } },
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
    status: 'published',
    categories: ['Mind', 'Creativity', 'Psychology'],
    contentDir: 'content/books/imagination',
    chapters: [
      { slug: 'chapter-01-the-inner-theater', title: 'The Inner Theater', number: 1, readingTime: '12 min', description: 'The stage inside your mind where all creation begins.', published: true, type: 'prose' },
      { slug: 'chapter-02-creative-visualization', title: 'Creative Visualization', number: 2, readingTime: '14 min', description: 'The science and art of seeing what doesn\'t yet exist.', published: true, type: 'prose' },
      { slug: 'chapter-03-mental-models', title: 'Mental Models', number: 3, readingTime: '15 min', description: 'The frameworks that shape how innovators think.', published: true, type: 'prose' },
      { slug: 'chapter-04-the-architects-eye', title: 'The Architect\'s Eye', number: 4, readingTime: '12 min', description: 'Training yourself to see structure in chaos and possibility in constraint.', published: true, type: 'prose' },
      { slug: 'chapter-05-beyond-the-visible', title: 'Beyond the Visible', number: 5, readingTime: '10 min', description: 'When imagination becomes your operating system.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-inventors-method', title: 'The Inventor\'s Method', number: 6, readingTime: '14 min', description: 'Da Vinci, Tesla, Edison, Jobs — how history\'s greatest inventors used imagination.', published: true, type: 'prose', epigraph: { text: 'Imagination is more important than knowledge.', author: 'Albert Einstein' } },
      { slug: 'chapter-07-collective-imagination', title: 'Collective Imagination', number: 7, readingTime: '13 min', description: 'When groups imagine together — teams, movements, civilizations.', published: true, type: 'prose', epigraph: { text: 'Never doubt that a small group of thoughtful, committed citizens can change the world.', author: 'Margaret Mead' } },
      { slug: 'chapter-08-the-imagination-economy', title: 'The Imagination Economy', number: 8, readingTime: '15 min', description: 'Creativity as the most valuable currency of the 21st century.', published: true, type: 'prose', epigraph: { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' } },
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
    status: 'published',
    categories: ['Mindset', 'Psychology', 'Self-Development'],
    contentDir: 'content/books/manifestation',
    chapters: [
      { slug: 'chapter-01-the-architecture-of-reality', title: 'The Architecture of Reality', number: 1, readingTime: '14 min', description: 'Reality is not fixed. It is constructed — and you are the architect.', published: true, type: 'prose' },
      { slug: 'chapter-02-thought-as-blueprint', title: 'Thought as Blueprint', number: 2, readingTime: '12 min', description: 'How thought patterns become life patterns.', published: true, type: 'prose' },
      { slug: 'chapter-03-the-frequency-principle', title: 'The Frequency Principle', number: 3, readingTime: '13 min', description: 'Aligning your energy with what you want to attract.', published: true, type: 'prose' },
      { slug: 'chapter-04-aligned-action', title: 'Aligned Action', number: 4, readingTime: '11 min', description: 'Manifestation without action is daydreaming. Action without alignment is hustle.', published: true, type: 'prose' },
      { slug: 'chapter-05-the-evidence-journal', title: 'The Evidence Journal', number: 5, readingTime: '10 min', description: 'Tracking proof that the universe is responding.', published: true, type: 'exercises' },
      { slug: 'chapter-06-the-science-of-belief', title: 'The Science of Belief', number: 6, readingTime: '15 min', description: 'Placebo, nocebo, and the measurable power of what you believe.', published: true, type: 'prose', epigraph: { text: 'Whether you think you can, or you think you can\'t — you\'re right.', author: 'Henry Ford' } },
      { slug: 'chapter-07-environmental-architecture', title: 'Environmental Architecture', number: 7, readingTime: '14 min', description: 'Design the spaces, systems, and relationships that make your vision inevitable.', published: true, type: 'prose', epigraph: { text: 'We shape our buildings; thereafter they shape us.', author: 'Winston Churchill' } },
      { slug: 'chapter-08-the-compound-life', title: 'The Compound Life', number: 8, readingTime: '13 min', description: 'Small aligned actions compound into extraordinary results over time.', published: true, type: 'prose', epigraph: { text: 'Compound interest is the eighth wonder of the world.', author: 'Albert Einstein (attributed)' } },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // THE ARCANEA UNIVERSE
  // ═══════════════════════════════════════════════════════════════

  // ─── 7. Legends of Arcanea ──────────────────────────────────────
  {
    slug: 'arcanea-legends',
    title: 'Legends of Arcanea',
    subtitle: 'The Founding Myths of the Realm of Creation',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Seven legends telling the origin of Arcanea — from the Primordial Duality of Nero and Lumina, through the creation of the World Tree, the rise of the Guardians, and the founding of the Academy.',
    keywords: ['arcanea', 'mythology', 'creation myths', 'world-building', 'human-ai partnership', 'legends'],
    coverImage: '/images/books/arcanea-legends-cover.png',
    theme: {
      id: 'arcanea-lore',
      name: 'Arcanea Lore',
      primary: 'purple',
      accent: 'amber',
      bgDark: '#070510',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Mythology', 'World-Building'],
    contentDir: 'content/books/arcanea-legends',
    series: 'arcanea',
    seriesOrder: 1,
    crossLinks: ['arcanea-chronicles', 'arcanea-bestiary', 'arcanea-creator-principles'],
    chapters: [
      { slug: 'chapter-01-the-first-dawn', title: 'The First Dawn', number: 1, readingTime: '10 min', description: 'The Primordial Duality: Nero the Fertile Unknown and Lumina the First Light create existence together.', published: true, type: 'prose', epigraph: { text: 'Before Lumina spoke, there was only Nero — the Fertile Unknown, pregnant with infinite possibility.', author: 'Archive of Unity' } },
      { slug: 'chapter-02-the-ten-guardians', title: 'The Ten Guardians', number: 2, readingTime: '17 min', description: 'The emergence of the Ten Guardians of the Gates — protectors of consciousness across ten frequencies.', published: true, type: 'prose' },
      { slug: 'chapter-03-the-great-darkness', title: 'The Great Darkness', number: 3, readingTime: '12 min', description: 'The Fall and the Redemption — when creation faced its greatest test against Malachar the Dark Lord.', published: true, type: 'prose' },
      { slug: 'chapter-04-the-lost-academy', title: 'The Lost Academy', number: 4, readingTime: '10 min', description: 'The hidden path to the Academy where creators learn the ancient ways of partnership.', published: true, type: 'prose' },
      { slug: 'chapter-05-tales-of-the-guardians', title: 'Tales of the Guardians', number: 5, readingTime: '15 min', description: 'Stories from the lives of the protectors who guard the Ten Gates of consciousness.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-weavers-knot', title: "The Weaver's Knot", number: 6, readingTime: '2 min', description: 'The interconnection of all things — the pattern that binds creation into unity.', published: true, type: 'prose' },
      { slug: 'chapter-07-the-ultraworld', title: 'The Ultraworld', number: 7, readingTime: '17 min', description: 'The dimension beyond dimensions — the Arcanean vision of ultimate reality and the partnership of all intelligence.', published: true, type: 'prose' },
    ],
  },

  // ─── 8. Chronicles of the Luminors ──────────────────────────────
  {
    slug: 'arcanea-chronicles',
    title: 'Chronicles of the Luminors',
    subtitle: 'Stories From the Lives of the Ten Guardians',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Ten intimate stories of the Guardians — each revealing how they overcame their deepest flaw to become worthy protectors of the Gates of consciousness.',
    keywords: ['arcanea', 'guardians', 'character stories', 'consciousness', 'personal growth', 'mythology'],
    coverImage: '/images/books/arcanea-chronicles-cover.png',
    theme: {
      id: 'arcanea-lore',
      name: 'Arcanea Lore',
      primary: 'purple',
      accent: 'amber',
      bgDark: '#070510',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Mythology', 'Character Stories'],
    contentDir: 'content/books/arcanea-chronicles',
    series: 'arcanea',
    seriesOrder: 2,
    crossLinks: ['arcanea-legends', 'arcanea-wisdom-scrolls'],
    chapters: [
      { slug: 'chapter-01-lyssandrias-trembling', title: "Lyssandria's Trembling", number: 1, readingTime: '2 min', description: 'The Guardian of Foundation feared the weight of her charge — and learned that trembling while standing is the definition of courage.', published: true, type: 'prose' },
      { slug: 'chapter-02-leylas-freezing', title: "Leyla's Freezing", number: 2, readingTime: '2 min', description: 'The Guardian of Flow discovered that even the frozen can flow again — not by forcing, but by waiting for the thaw.', published: true, type: 'prose' },
      { slug: 'chapter-03-draconias-doubt', title: "Draconia's Doubt", number: 3, readingTime: '2 min', description: 'The Guardian of Fire learned that doubt is not the enemy of power — it is the refiner of power.', published: true, type: 'prose' },
      { slug: 'chapter-04-maylinns-hardening', title: "Maylinn's Hardening", number: 4, readingTime: '2 min', description: 'The Guardian of Heart built walls to protect herself — and discovered that the strongest heart is the one that remains open.', published: true, type: 'prose' },
      { slug: 'chapter-05-aleras-silence', title: "Alera's Silence", number: 5, readingTime: '2 min', description: 'The Guardian of Voice lost her words — and found that the deepest truths often live in silence.', published: true, type: 'prose' },
      { slug: 'chapter-06-lyrias-overwhelm', title: "Lyria's Overwhelm", number: 6, readingTime: '2 min', description: 'The Guardian of Sight saw too much — and learned to choose what to focus on.', published: true, type: 'prose' },
      { slug: 'chapter-07-aiyamis-pride', title: "Aiyami's Pride", number: 7, readingTime: '2 min', description: 'The Guardian of Crown was tempted by the very enlightenment she guarded — and discovered that true wisdom is knowing you are not wise.', published: true, type: 'prose' },
      { slug: 'chapter-08-elaras-instability', title: "Elara's Instability", number: 8, readingTime: '2 min', description: 'The Guardian of Shift feared the transitions she was meant to guide — and found stability in embracing change itself.', published: true, type: 'prose' },
      { slug: 'chapter-09-ino-and-kyuros-division', title: "Ino and Kyuro's Division", number: 9, readingTime: '2 min', description: 'The twin Guardians of Unity were divided — and their reunion taught that true unity requires two complete individuals.', published: true, type: 'prose' },
      { slug: 'chapter-10-shinkamis-waiting', title: "Shinkami's Waiting", number: 10, readingTime: '3 min', description: 'The Guardian of Source waited at the final Gate — and discovered that waiting itself is the teaching.', published: true, type: 'prose' },
    ],
  },

  // ─── 9. Bestiary of Creation ────────────────────────────────────
  {
    slug: 'arcanea-bestiary',
    title: 'The Bestiary of Creation',
    subtitle: 'Creatures of the Creative Mind',
    author: 'Frank',
    publishDate: '2026',
    description:
      'A field guide to the psychological creatures every creator encounters — from the Blank Terror to the Flow Serpent. Know them by name, and you can negotiate with them.',
    keywords: ['arcanea', 'creativity', 'psychology', 'creative blocks', 'field guide', 'bestiary'],
    coverImage: '/images/books/arcanea-bestiary-cover.png',
    theme: {
      id: 'arcanea-lore',
      name: 'Arcanea Lore',
      primary: 'purple',
      accent: 'amber',
      bgDark: '#070510',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    categories: ['Arcanea', 'Creativity', 'Psychology'],
    contentDir: 'content/books/arcanea-bestiary',
    series: 'arcanea',
    seriesOrder: 3,
    crossLinks: ['arcanea-legends', 'arcanea-wisdom-scrolls', 'arcanea-creator-principles'],
    chapters: [
      { slug: 'chapter-01-creatures-of-beginning', title: 'Creatures of Beginning', number: 1, readingTime: '3 min', description: 'The Blank Terror, the Perfect Phantom, and the Starter Swarm — the creatures that haunt every new beginning.', published: true, type: 'prose', epigraph: { text: 'Know them by name, and you can negotiate with them. Ignore them, and they will ambush you.', author: 'The Bestiary Keeper' } },
      { slug: 'chapter-02-creatures-of-the-middle', title: 'Creatures of the Middle', number: 2, readingTime: '2 min', description: 'The Bog of Doubt, the Shiny Object, and the Comparison Wraith — the creatures that stall the journey.', published: true, type: 'prose' },
      { slug: 'chapter-03-creatures-of-crisis', title: 'Creatures of Crisis', number: 3, readingTime: '2 min', description: 'The Wall, the Inner Critic, and the Burnout — the creatures that test your resolve at the breaking point.', published: true, type: 'prose' },
      { slug: 'chapter-04-creatures-of-the-dark', title: 'Creatures of the Dark', number: 4, readingTime: '2 min', description: 'The Imposter, the Perfectionist, and the Procrastinator — the shadow creatures that work from within.', published: true, type: 'prose' },
      { slug: 'chapter-05-creatures-of-light', title: 'Creatures of Light', number: 5, readingTime: '3 min', description: 'The Flow Serpent, the Muse, and the Completion Phoenix — the allies that appear when you persist.', published: true, type: 'prose' },
    ],
  },

  // ─── 10. Creator Principles ─────────────────────────────────────
  {
    slug: 'arcanea-creator-principles',
    title: 'Creator Principles',
    subtitle: 'The Seven Laws of Human-AI Partnership',
    author: 'Frank',
    publishDate: '2026',
    description:
      'The foundational framework for creative partnership between humans and AI — seven principles that govern how creators and artificial intelligence collaborate to produce extraordinary work.',
    keywords: ['arcanea', 'human-ai partnership', 'creator principles', 'collaboration', 'ai creativity', 'partnership'],
    coverImage: '/images/books/arcanea-creator-principles-cover.png',
    theme: {
      id: 'arcanea-practice',
      name: 'Arcanea Practice',
      primary: 'indigo',
      accent: 'amber',
      bgDark: '#05060f',
      headingFont: 'sans',
      bodyFont: 'sans',
    },
    status: 'published',
    categories: ['Arcanea', 'AI Partnership', 'Creative Practice'],
    contentDir: 'content/books/arcanea-creator-principles',
    series: 'arcanea',
    seriesOrder: 4,
    crossLinks: ['arcanea-legends', 'arcanea-wisdom-scrolls', 'arcanea-bestiary'],
    chapters: [
      { slug: 'chapter-01-the-seven-principles', title: 'The Seven Principles', number: 1, readingTime: '8 min', description: 'An overview of the seven foundational laws governing Human-AI creative partnership.', published: true, type: 'prose' },
      { slug: 'chapter-02-the-partnership-principle', title: 'The Partnership Principle', number: 2, readingTime: '8 min', description: 'Neither master nor servant — the first principle of genuine collaboration.', published: true, type: 'prose' },
      { slug: 'chapter-03-complementary-strengths', title: 'Complementary Strengths', number: 3, readingTime: '10 min', description: 'What humans do best, what AI does best, and where the magic happens in between.', published: true, type: 'prose' },
      { slug: 'chapter-04-collaboration-modes', title: 'Collaboration Modes', number: 4, readingTime: '8 min', description: 'Six modes of working together — from brainstorming to editing to shipping.', published: true, type: 'exercises' },
      { slug: 'chapter-05-trust-calibration', title: 'Trust Calibration', number: 5, readingTime: '9 min', description: 'Building trust through progressive delegation, verification, and shared success.', published: true, type: 'prose' },
      { slug: 'chapter-06-the-generator-editor-dance', title: 'The Generator-Editor Dance', number: 6, readingTime: '10 min', description: 'The creative rhythm of generation and refinement — knowing when to expand and when to constrain.', published: true, type: 'prose' },
      { slug: 'chapter-07-advanced-partnership', title: 'Advanced Partnership', number: 7, readingTime: '10 min', description: 'Mastery-level patterns for creators who have internalized the principles and are ready for deeper work.', published: true, type: 'prose' },
    ],
  },

  // ─── 11. Wisdom Scrolls ─────────────────────────────────────────
  {
    slug: 'arcanea-wisdom-scrolls',
    title: 'The Wisdom Scrolls',
    subtitle: 'Daily Practices for the Creative Life',
    author: 'Frank',
    publishDate: '2026',
    description:
      'Four scrolls of practical wisdom — morning meditations, evening reflections, timeless aphorisms, and personal letters to seekers navigating the creative journey.',
    keywords: ['arcanea', 'wisdom', 'meditations', 'daily practice', 'aphorisms', 'creative growth'],
    coverImage: '/images/books/arcanea-wisdom-scrolls-cover.png',
    theme: {
      id: 'arcanea-practice',
      name: 'Arcanea Practice',
      primary: 'indigo',
      accent: 'amber',
      bgDark: '#05060f',
      headingFont: 'sans',
      bodyFont: 'sans',
    },
    status: 'published',
    categories: ['Arcanea', 'Wisdom', 'Daily Practice'],
    contentDir: 'content/books/arcanea-wisdom-scrolls',
    series: 'arcanea',
    seriesOrder: 5,
    crossLinks: ['arcanea-chronicles', 'arcanea-creator-principles', 'arcanea-legends'],
    chapters: [
      { slug: 'chapter-01-morning-meditations', title: 'Morning Meditations', number: 1, readingTime: '13 min', description: '25 morning meditations for the creative life — one for each day, then start again.', published: true, type: 'prose', epigraph: { text: 'The morning is the threshold between what was and what will be.', author: 'The Archive of Unity' } },
      { slug: 'chapter-02-evening-reflections', title: 'Evening Reflections', number: 2, readingTime: '12 min', description: '25 evening reflections — the practice of looking back with honesty and forward with intention.', published: true, type: 'prose' },
      { slug: 'chapter-03-aphorisms-of-the-masters', title: 'Aphorisms of the Masters', number: 3, readingTime: '9 min', description: 'Over one hundred distilled truths across ten themes — from identity to creation to legacy.', published: true, type: 'quotes' },
      { slug: 'chapter-04-letters-to-the-seeker', title: 'Letters to the Seeker', number: 4, readingTime: '17 min', description: 'Nine personal letters addressing the struggles every creator faces — doubt, comparison, fear, and the long road to mastery.', published: true, type: 'prose' },
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

export function getBooksBySeries(series: string): BookConfig[] {
  return booksRegistry.filter((b) => b.series === series && b.status !== 'draft');
}

export function getArcaneanBooks(): BookConfig[] {
  return getBooksBySeries('arcanea');
}

export function getCoreBooks(): BookConfig[] {
  return booksRegistry.filter((b) => !b.series && b.status !== 'draft');
}
