export type LibraryCollection = {
  slug: string;
  title: string;
  description: string;
  introduction: string;
  categories: string[];
  featured: string[];
};

export const libraryCollections: LibraryCollection[] = [
  {
    slug: 'sacred-texts', title: 'Sacred texts & traditions',
    description: 'Read the primary texts with their traditions and translations in view.',
    introduction: 'A starting shelf across several major religious traditions. These works differ in genre, authority, history, and the communities that read them. Each guide names those differences and offers a specific place to begin. This is a curated selection, not an exhaustive canon or a ranking of religions.',
    categories: ['Sacred Texts'], featured: ['bible', 'bhagavad-gita', 'quran'],
  },
  {
    slug: 'inner-life', title: 'Awareness & inner life',
    description: 'Yogananda, Michael Singer, and contemporary contemplative voices.',
    introduction: 'Start with a question you can notice in daily life: what happens when you stop believing every thought? This shelf pairs spiritual memoir, contemporary teaching, and psychological perspectives. Read personal testimony as testimony, and compare the practices without assuming their worldviews are identical.',
    categories: ['Inner Work', 'Meditation', 'Spiritual Memoir', 'Contemporary Spirituality', 'IFS'], featured: ['autobiography-of-a-yogi', 'the-untethered-soul', 'living-untethered'],
  },
  {
    slug: 'philosophy', title: 'Philosophy & the examined life',
    description: 'Taoism, Stoicism, and books that change the questions you ask.',
    introduction: 'These books ask how to act, what to value, and how much certainty a person needs. The Tao Te Ching and Zhuangzi form one conversation; Marcus Aurelius and Viktor Frankl enter from very different histories. Compare their arguments before borrowing their conclusions.',
    categories: ['Philosophy', 'Stoicism', 'Taoism'], featured: ['tao-te-ching', 'meditations', 'zhuangzi'],
  },
  {
    slug: 'creative-life', title: 'Art, music & creative life',
    description: 'The craft, friendships, and scenes behind work that lasts.',
    introduction: 'A working shelf for making things: writing through resistance, developing taste, and finding the people around whom a scene takes shape. Pair a practical craft book with a musician’s memoir to see the advice tested against an actual life.',
    categories: ['Creativity', 'Music', 'Writing', 'Art', 'Craft'], featured: ['the-creative-act', 'the-war-of-art', 'just-kids'],
  },
  {
    slug: 'business', title: 'Build a lasting business',
    description: 'Focus, customers, money, and the decisions that shape a company.',
    introduction: 'Read for the decision in front of you. Customer research, financial discipline, deep work, and scaling address different constraints. Start with the book closest to the problem, then test one idea against the evidence in your own business.',
    categories: ['Business Strategy', 'Career', 'Wealth', 'Productivity', 'Scaling'], featured: ['deep-work', 'profit-first', 'superfans'],
  },
  {
    slug: 'meaning', title: 'Meaning, habits & growth',
    description: 'Purpose and the small practices that give a life its shape.',
    introduction: 'Meaning can be a philosophical question or a daily structure. This shelf moves between both: Frankl’s account, the different histories of ikigai, and the practical mechanics of habit. Keep memoir, research, and motivational claims distinct as you read.',
    categories: ['Meaning', 'Ikigai', 'Habits', 'Self-Development'], featured: ['mans-search-for-meaning', 'atomic-habits', 'ikigai-japanese-secret'],
  },
];

export function belongsToCollection(book: { categories: string[]; slug: string }, collection: LibraryCollection) {
  return collection.featured.includes(book.slug) || book.categories.some(category => collection.categories.includes(category));
}
