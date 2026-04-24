import type { BookReview } from '@/app/books/types';

export const bookReviews: BookReview[] = [
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: '/images/library/atomic-habits.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Habits', 'Self-Development', 'Psychology'],
    readingTime: '6 min',
    keyInsights: [
      'The 1% improvement principle: small changes compound into remarkable results over time',
      'Identity-based habits: focus on who you wish to become, not what you want to achieve',
      'The Four Laws of Behavior Change: make it obvious, attractive, easy, and satisfying',
      'Environment design is more powerful than willpower — reshape your surroundings to shape your behavior',
      'Habit stacking: pair a new habit with an existing one to create automatic triggers',
    ],
    bestFor: ['Anyone starting their self-development journey', 'People who struggle with consistency', 'Entrepreneurs building daily systems'],
    amazonUrl: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
    relatedBook: 'self-development',
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    coverImage: '/images/library/deep-work.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Productivity', 'Focus', 'Career'],
    readingTime: '7 min',
    keyInsights: [
      'Deep work is the ability to focus without distraction on cognitively demanding tasks — and it is becoming increasingly rare and valuable',
      'The two core abilities for thriving in the new economy: quickly mastering hard things, and producing at an elite level',
      'Shallow work is non-cognitively demanding, logistical-style work that can be done while distracted — and it dominates most knowledge workers\' days',
      'Schedule every minute of your day. Not to be rigid, but to be intentional about how your finite time is spent',
      'Embrace boredom. Train your brain to resist the urge to switch to something stimulating the moment the current task becomes challenging',
    ],
    bestFor: ['Knowledge workers and creatives', 'Anyone building a craft or skill', 'People fighting distraction and digital noise'],
    amazonUrl: 'https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692',
    relatedBook: 'self-development',
  },
  {
    slug: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: '/images/library/the-alchemist.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Fiction', 'Philosophy', 'Spirituality'],
    readingTime: '5 min',
    keyInsights: [
      'The Personal Legend: everyone has a unique purpose, and the universe conspires to help those who pursue it with courage',
      'The treasure is often found where you began — but only after the journey has transformed you into someone who can see it',
      'Fear of failure is the only thing that makes a dream impossible',
      'The Language of the World: everything is connected, and learning to read the signs is a skill that develops with attention',
      'The principle of favorability: when you want something, the entire universe moves to help you achieve it — but only after you begin',
    ],
    bestFor: ['Dreamers who need courage to start', 'Anyone at a crossroads in life', 'Readers who love philosophical fiction'],
    amazonUrl: 'https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005',
    relatedBook: 'manifestation',
  },
  {
    slug: 'cant-hurt-me',
    title: "Can't Hurt Me",
    author: 'David Goggins',
    coverImage: '/images/library/cant-hurt-me.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Mindset', 'Fitness', 'Autobiography'],
    readingTime: '6 min',
    keyInsights: [
      'The 40% Rule: when your mind tells you to quit, you have only used 40% of your actual capacity',
      'The Accountability Mirror: confront the truth about where you are and who you need to become — no filters, no excuses',
      'Callusing the mind: deliberately expose yourself to discomfort to build mental toughness the same way calluses form on hands',
      'Taking Souls: use the energy of doubters as fuel rather than letting their negativity drain you',
      'The Cookie Jar: store memories of past victories to draw on when current challenges feel impossible',
    ],
    bestFor: ['Athletes and fitness enthusiasts', 'Anyone feeling stuck or complacent', 'People who respond to extreme discipline'],
    amazonUrl: 'https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512287',
    relatedBook: 'spartan-mindset',
  },
  {
    slug: 'think-and-grow-rich',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    coverImage: '/images/library/think-and-grow-rich.jpg',
    rating: 4,
    reviewDate: '2026-02-14',
    categories: ['Wealth', 'Mindset', 'Classic'],
    readingTime: '7 min',
    keyInsights: [
      'Desire is the starting point of all achievement — not a wish, not a hope, but a burning, definite desire backed by a plan',
      'Auto-suggestion: the subconscious mind can be programmed through repeated, emotionally charged affirmation',
      'The Mastermind Principle: two or more minds working in harmony toward a definite objective create a force greater than the sum of their parts',
      'Persistence is the direct result of habit. The person who persists is not different — they have simply trained the response',
      'Every adversity carries the seed of an equivalent or greater benefit — but only for the mind prepared to find it',
    ],
    bestFor: ['Entrepreneurs and business builders', 'Anyone interested in the psychology of wealth', 'Students of manifestation and intention'],
    amazonUrl: 'https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331',
    relatedBook: 'manifestation',
  },
  {
    slug: 'mans-search-for-meaning',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    coverImage: '/images/library/mans-search-for-meaning.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Psychology', 'Philosophy', 'Memoir'],
    readingTime: '6 min',
    keyInsights: [
      'Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and freedom.',
      'Those who have a "why" to live can bear almost any "how" — purpose is the ultimate survival mechanism',
      'Suffering ceases to be suffering the moment it finds a meaning',
      'Logotherapy: the primary human drive is not pleasure or power, but the search for meaning',
      'You cannot control what happens to you, but you can always control your attitude toward what happens',
    ],
    bestFor: ['Anyone facing adversity or difficult transitions', 'Philosophy and psychology readers', 'People seeking deeper purpose'],
    amazonUrl: 'https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/0807014273',
    relatedBook: 'self-development',
  },
  {
    slug: 'the-war-of-art',
    title: 'The War of Art',
    author: 'Steven Pressfield',
    coverImage: '/images/library/the-war-of-art.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Creativity', 'Discipline', 'Writing'],
    readingTime: '5 min',
    keyInsights: [
      'Resistance is the universal force that opposes any creative or ambitious endeavor — and it is internal, not external',
      'The professional shows up every day regardless of mood, inspiration, or circumstance. The amateur waits for conditions to be right.',
      'Resistance is most powerful at the finish line — the closer you get to shipping, the stronger the urge to quit',
      'Turning pro is a decision, not a ceremony. You do not need permission. You need commitment.',
      'The Muse favors the worker. Inspiration visits those who are already in motion, not those who are waiting.',
    ],
    bestFor: ['Creators, writers, and artists', 'Anyone fighting procrastination', 'Entrepreneurs building their first product'],
    amazonUrl: 'https://www.amazon.com/War-Art-Through-Creative-Battles/dp/1936891026',
    relatedBook: 'imagination',
  },
  {
    slug: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverImage: '/images/library/meditations.jpg',
    rating: 5,
    reviewDate: '2026-02-14',
    categories: ['Philosophy', 'Stoicism', 'Classic'],
    readingTime: '7 min',
    keyInsights: [
      'You have power over your mind, not outside events. Realize this, and you will find strength.',
      'The obstacle is the way: what stands in the path becomes the path. Every difficulty is training material.',
      'Waste no more time arguing about what a good person should be. Be one.',
      'Memento mori: the awareness of death is not morbid — it is clarifying. It removes the trivial and reveals the essential.',
      'The soul becomes dyed with the color of its thoughts. Guard your mind as you would guard your home.',
    ],
    bestFor: ['Leaders and decision-makers', 'Anyone interested in Stoic philosophy', 'People seeking calm in chaos'],
    amazonUrl: 'https://www.amazon.com/Meditations-New-Translation-Marcus-Aurelius/dp/0812968255',
    relatedBook: 'spartan-mindset',
  },
  {
    slug: 'profit-first',
    title: 'Profit First',
    author: 'Mike Michalowicz',
    coverImage: '/images/library/profit-first.jpg',
    hasCover: true,
    rating: 5,
    reviewDate: '2026-04-24',
    categories: ['Wealth', 'Productivity', 'Career'],
    readingTime: '6 min',
    publicationYear: 2014,
    tldr: 'Profit First inverts the GAAP formula (Sales − Expenses = Profit) into Sales − Profit = Expenses. By routing every deposit through five dedicated bank accounts before expenses are paid, Michalowicz forces small businesses to become profitable today rather than "eventually."',
    keyInsights: [
      'Invert GAAP: profit is not a leftover — it is a pre-allocated deposit. The formula becomes Sales minus Profit equals Expenses, not the other way around.',
      "Parkinson's Law applies to cash: the money you see is the money you spend. Hide profit from yourself — into a separate account at a separate bank — to stop consuming it.",
      'The five-account system (Income, Profit, Owner\'s Pay, Tax, Operating Expenses) enforces discipline through physical separation at the bank, not through willpower or spreadsheets.',
      'Small plates, not bigger discipline: when the operating account shrinks, expenses contract to match. Structure beats intention every quarter.',
      'Quarterly profit distributions create a reward loop that turns profitability from an accounting abstraction into a felt, recurring experience for the owner — the habit that compounds everything else.',
    ],
    bestFor: [
      'Entrepreneurs who are "profitable on paper" but always broke in practice',
      'Small business owners drowning in expenses despite growing revenue',
      'Freelancers and service providers building their first real financial system',
      'Operators who want cash flow to feel calm instead of chaotic',
    ],
    amazonUrl: 'https://www.amazon.com/Profit-First-Transform-Cash-Eating-Money-Making/dp/073521414X',
    relatedBook: 'manifestation',
    faq: [
      {
        q: 'What is the core idea of Profit First?',
        a: 'Take profit first, before paying expenses. Michalowicz rewrites the traditional accounting equation from Sales − Expenses = Profit to Sales − Profit = Expenses, forcing the business to live within what remains after profit is set aside.',
      },
      {
        q: 'What are the five Profit First bank accounts?',
        a: 'Income (the single deposit account), Profit, Owner\'s Pay, Tax, and Operating Expenses. Revenue flows into Income, then is allocated on the 10th and 25th of each month to the other four accounts by pre-set percentages.',
      },
      {
        q: 'Who is Profit First for?',
        a: 'Primarily small businesses, freelancers, and service operators doing $0–$10M in revenue who want an owner-level cash discipline system that does not require an accountant to maintain. It is less useful for venture-backed companies optimizing for growth over profitability.',
      },
      {
        q: 'What is the main criticism of Profit First?',
        a: 'Accountants note it is behavioral psychology wrapped around basic cash envelopes, not a new accounting principle. That is also its strength: it works because it is behavioral, not because it is clever.',
      },
    ],
  },
  {
    slug: 'fabric-of-reality',
    title: 'The Fabric of Reality',
    author: 'David Deutsch',
    coverImage: '/images/library/fabric-of-reality.jpg',
    hasCover: true,
    rating: 5,
    reviewDate: '2026-04-24',
    categories: ['Philosophy', 'Classic', 'Creativity'],
    readingTime: '8 min',
    publicationYear: 1997,
    tldr: 'Deutsch argues that reality is best understood as the intersection of four strands — quantum physics (many-worlds), the theory of computation, epistemology (Popper), and evolution. Together they form a Theory of Everything in which the multiverse is literal, knowledge is physical, and problems are soluble.',
    keyInsights: [
      'The four-strand explanation: reality is best understood as the intersection of quantum physics, the theory of computation, epistemology, and Darwinian evolution. No single strand is sufficient; none is fundamental above the others.',
      'The multiverse is not speculation — it is the most parsimonious reading of quantum mechanics. Parallel universes exist, and the interference pattern of the double-slit experiment is their signature.',
      'The Turing principle: a universal computer can simulate any physically possible process. This means reality itself is computable, and creativity is a physical phenomenon — not a metaphor.',
      'Knowledge is explanation, not prediction. Good explanations are hard to vary without losing their predictive power; that is the demarcation criterion, not Bayesian confidence or consensus.',
      'Problems are soluble. Pessimism about humanity\'s future mistakes the present for the permanent — any difficulty not forbidden by the laws of physics is, with enough knowledge, addressable.',
    ],
    bestFor: [
      'Deep thinkers bridging physics, philosophy, and AI',
      'Builders who want a first-principles view of reality and possibility',
      'Readers of Popper, Feynman, or Wheeler looking for the synthesis',
      'Anyone serious about epistemology, quantum foundations, or the theory of computation',
    ],
    amazonUrl: 'https://www.amazon.com/Fabric-Reality-Parallel-Universes-Implications/dp/014027541X',
    relatedBook: 'imagination',
    faq: [
      {
        q: 'What are the four strands in The Fabric of Reality?',
        a: 'Quantum physics (specifically Everett\'s many-worlds interpretation), the theory of computation (Turing), epistemology (Popper\'s theory of knowledge), and Darwinian evolution. Deutsch argues each strand is necessary, and together they form a unified worldview.',
      },
      {
        q: 'Does Deutsch really believe in the multiverse?',
        a: 'Yes — literally. He treats parallel universes as the straightforward consequence of quantum mechanics taken at face value, without the philosophical add-ons of "wavefunction collapse" or Copenhagen-style interpretations. For Deutsch, interference is direct evidence of other universes acting on ours.',
      },
      {
        q: 'Is The Fabric of Reality a physics book or a philosophy book?',
        a: 'Both. It is physics in the sense that it takes quantum mechanics seriously as a description of reality, and philosophy in the sense that it argues for a specific epistemology (Popperian critical rationalism) as the right way to build knowledge. The argument is that you cannot have one without the other.',
      },
      {
        q: 'How does this book relate to AI and computation?',
        a: 'Deutsch\'s Turing principle — that a universal computer can simulate any physically possible process — grounds modern claims about general intelligence in physics rather than metaphor. If intelligence is a computational process and computation is physical, then creating AGI is a problem of knowledge, not of magic.',
      },
    ],
  },
];

// ─── Helper Functions ────────────────────────────────────────────

export function getReviewBySlug(slug: string): BookReview | undefined {
  return bookReviews.find((r) => r.slug === slug);
}

export function getReviewsByCategory(category: string): BookReview[] {
  return bookReviews.filter((r) => r.categories.includes(category));
}

export function getAllReviewSlugs(): string[] {
  return bookReviews.map((r) => r.slug);
}

export function getAllReviewCategories(): string[] {
  const cats = new Set<string>();
  bookReviews.forEach((r) => r.categories.forEach((c) => cats.add(c)));
  return Array.from(cats).sort();
}
