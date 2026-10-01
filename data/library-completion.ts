import type { BookChapterSummary, BookQuote, BookReview, BookVideo } from '../app/books/types';

/**
 * Fills public Library gaps from sources this repo already holds.
 * Quotes are copied only from Frank's own chapter files.
 * Other books do not receive manufactured quotations or chapter titles.
 * A missing video becomes a YouTube search, which Library OS allows when no
 * specific recording has been checked.
 */

const FRANK_QUOTES: Record<string, BookQuote[]> = {
  'the-wordless-laws': [
    {
      text: 'There is a kind of knowledge that hides by being obvious.',
      chapter: 'Chapter 1 — An Invitation',
      context: 'Opening line of the invitation. The book asks the reader to notice a force that stays invisible because it is ordinary.',
    },
    {
      text: 'For eleven years the woman kept a folder.',
      chapter: 'Chapter 2 — The One Who Decides',
      context: 'The chapter starts from an undecided life held as paper, then shows what one total decision changes.',
    },
    {
      text: 'The girl wanted to fly, and the wanting nearly cost her the flight.',
      chapter: 'Chapter 13 — The Open Hand',
      context: 'The horse story. Wanting the gallop and clenching the reins are separated.',
    },
    {
      text: 'You can want something with your entire being and hold it with an open hand at the same time.',
      chapter: 'Chapter 13 — The Open Hand',
      context: 'The chapter’s own statement of the two grips: a fixed destination, and a loose hold on the route.',
    },
    {
      text: 'The boy was twelve, and the piano was locked.',
      chapter: 'Chapter 5 — The Picture Before the Thing',
      context: 'The image is held before the instrument is available.',
    },
    {
      text: 'The old man owned the only well for three days’ walk in any direction, and the village had learned to come to him on his terms.',
      chapter: 'Chapter 11 — The River That Returns',
      context: 'A closed hold on the well is the story’s starting condition.',
    },
  ],
  'the-book-of-secrets': [
    {
      text: 'She had spent eleven years waiting to be given what had been sitting one arm’s length away, in an unlocked drawer, since the first morning.',
      chapter: 'Chapter 1 — The Locked Drawers',
      context: 'The frame for the book: the craft lessons were available and still learned late.',
    },
    {
      text: 'He was not waiting for anything when he sat down.',
      chapter: 'Chapter 8 — The Secret of Showing Up',
      context: 'The composer’s schedule. The sitting comes before the music.',
    },
    {
      text: 'Inspiration is far more often a result of the work than a cause of it.',
      chapter: 'Chapter 8 — The Secret of Showing Up',
      context: 'Stated in the pattern section after the composer and the writer who waited to feel moved.',
    },
    {
      text: 'The chairs were finished, and they were good, and she burned them anyway.',
      chapter: 'Chapter 9 — The Secret of Standards',
      context: 'Standards are shown as refusal, after the chairs would already have passed a buyer.',
    },
    {
      text: 'The book had been finished for two years, and she still called it a draft.',
      chapter: 'Chapter 11 — The Secret of Shipping',
      context: 'Finishing and meeting a reader are treated as different acts.',
    },
    {
      text: 'The night the world decided she was an overnight success, she was thirty-four years old and had been making the thing for eleven years.',
      chapter: 'Chapter 12 — The Secret of the Long Game',
      context: 'The public story of speed is set against the years of making.',
    },
  ],
};

function chapter(number: number, title: string, description: string): BookChapterSummary {
  const keyIdea = description.split(/[.!—]/)[0].trim();
  return { number, title, keyIdea, summary: description };
}

const FRANK_CHAPTERS: Record<string, BookChapterSummary[]> = {
  'the-wordless-laws': [
    chapter(1, 'An Invitation', 'Why the most powerful laws of life hide in plain sight — and how to read them.'),
    chapter(2, 'The One Who Decides', 'A single, total decision rearranges everything downstream. The undecided life stays formless.'),
    chapter(3, 'The Tuning of a Life', 'What you hold steadily inside begins to meet you outside. State precedes circumstance.'),
    chapter(4, 'The Words Said in the Dark', 'Repeated inner speech pours the floor you stand on. You become the sentence you say most.'),
    chapter(5, 'The Picture Before the Thing', 'Hold the finished image first, and the hands and the world arrange toward it.'),
    chapter(6, 'The Leap Taken Before the Bridge', 'You must act as if it is already true before the proof exists — or the proof never comes.'),
    chapter(7, 'Thanks Given in Advance', 'Thanks given before the gift opens the channel for the gift. Lack repels; fullness draws.'),
    chapter(8, 'The Spark That Becomes the World', 'Everything ever built was first an invisible thing in one mind. The idea is the asset.'),
    chapter(9, 'The Mind That Will Not Bend', 'The world tests every desire with delay and refusal. The one who will not quit is rare — and rarity is rewarded.'),
    chapter(10, 'The Minds That Become One', 'Two minds in true alignment create a third, more capable than either alone.'),
    chapter(11, 'The River That Returns', 'What you release in the right spirit returns enlarged. The closed hand can neither give nor receive.'),
    chapter(12, 'The Knowing That Sleeps', 'Hand the problem to the deeper mind and stop forcing; the answer surfaces when you let go.'),
    chapter(13, 'The Open Hand', 'Decide fully — then release the grip on how and when. Tension blocks; allowing completes.'),
    chapter(14, 'The Last Page', 'The laws were in the reader the whole time.'),
  ],
  'the-book-of-secrets': [
    chapter(1, 'The Locked Drawers', 'The secrets of making good work are not hidden — only learned too late. This book hands them over at the start.'),
    chapter(2, 'The Secret of the Blank Page', 'You beat the blank page only by starting badly. The resistance is worst right before the work that matters most.'),
    chapter(3, 'The Secret of Volume', 'Quantity produces quality. The masterpiece hides inside the pile you were afraid to make.'),
    chapter(4, 'The Secret of the Gap', 'Your work disappoints you because your taste outruns your skill — and that gap is the proof you will make it, if you outlast it.'),
    chapter(5, 'The Secret of Constraints', 'Limits liberate. The blank canvas is terror; the constraint is a doorway.'),
    chapter(6, 'The Secret of Stealing', 'Nothing is wholly original; you are a remix of your influences. The fear of imitation is what keeps a maker generic.'),
    chapter(7, 'The Secret of the Edit', 'The first draft is you telling yourself the story. The work is found in revision, not creation.'),
    chapter(8, 'The Secret of Showing Up', 'The muse rewards routine, not mood. Work on schedule and inspiration learns where to find you.'),
    chapter(9, 'The Secret of Standards', 'Greatness is a function of what you refuse. Taste is mostly the courage to cut.'),
    chapter(10, 'The Secret of Finishing', 'Finishing is a separate skill from starting, and rarer. Done teaches what perfect never can.'),
    chapter(11, 'The Secret of Shipping', 'The work becomes real only when it meets the world. Perfectionism is fear in a respectable coat.'),
    chapter(12, 'The Secret of the Long Game', 'The overnight success is ten years old. Craft compounds invisibly, then breaks the surface all at once.'),
    chapter(13, 'The Secret of the Making', 'The finished piece was never the point. The reward is the maker you become.'),
    chapter(14, 'The Last Secret', 'There is no secret that makes the work good. Put the book down and go make one thing.'),
  ],
};

const RELATED_BOOK: Record<string, string> = {
  'no-bad-parts': 'self-development',
  'tao-te-ching': 'imagination',
  'life-keith-richards': 'golden-age',
  'how-music-works': 'golden-age',
  'meet-me-in-the-bathroom': 'golden-age',
  'please-kill-me': 'golden-age',
  popism: 'golden-age',
  'miles-the-autobiography': 'golden-age',
  'our-band-could-be-your-life': 'golden-age',
  'cant-stop-wont-stop': 'golden-age',
  'girl-in-a-band': 'golden-age',
  'beastie-boys-book': 'golden-age',
  blitzscaling: 'golden-age',
  bible: 'love-and-poetry',
  tanakh: 'love-and-poetry',
  quran: 'imagination',
  'bhagavad-gita': 'spartan-mindset',
  upanishads: 'imagination',
  dhammapada: 'self-development',
  'heart-sutra': 'imagination',
  'guru-granth-sahib': 'love-and-poetry',
  'yoga-sutras': 'spartan-mindset',
  zhuangzi: 'imagination',
  'vijnana-bhairava-tantra': 'imagination',
  analects: 'spartan-mindset',
  'tattvartha-sutra': 'self-development',
  avesta: 'imagination',
  'kitab-i-aqdas': 'self-development',
  'tantra-illuminated': 'imagination',
  'autobiography-of-a-yogi': 'manifestation',
  'the-untethered-soul': 'self-development',
  'the-surrender-experiment': 'manifestation',
  'living-untethered': 'self-development',
  'wisdom-untethered': 'self-development',
  'the-power-of-now': 'self-development',
  'a-new-earth': 'self-development',
  'be-here-now': 'imagination',
  'the-miracle-of-mindfulness': 'self-development',
  'when-things-fall-apart': 'self-development',
};

const CONTINUE_SLUGS: Record<string, Array<{ slug: string; reason: string }>> = {
  'art-and-fear': [
    { slug: 'the-book-of-secrets', reason: 'Frank’s craft book takes the same fear of the work and turns it into standards, volume, and shipping.' },
    { slug: 'steal-like-an-artist', reason: 'Kleon answers the originality fear that Bayles and Orland put on the maker’s side of the trouble.' },
    { slug: 'bird-by-bird', reason: 'Lamott stays with the daily writing fear: short assignments, bad first drafts, and finishing anyway.' },
  ],
  'steal-like-an-artist': [
    { slug: 'the-book-of-secrets', reason: 'The secret of stealing in Frank’s book is the same study: influences named, then worked past.' },
    { slug: 'art-and-fear', reason: 'Bayles and Orland describe the fears that make a maker hide the influences Kleon says to use.' },
    { slug: 'bird-by-bird', reason: 'Lamott is the practice beside Kleon’s permission: show up and write the next short piece.' },
  ],
  'bird-by-bird': [
    { slug: 'the-book-of-secrets', reason: 'Showing up, the edit, and finishing are the craft secrets under Lamott’s writing instructions.' },
    { slug: 'art-and-fear', reason: 'The fears Lamott meets at the desk are the same pair Art & Fear splits between the maker and the work.' },
    { slug: 'steal-like-an-artist', reason: 'Kleon gives the influence practice a writer can use when Lamott’s blank page is the problem.' },
  ],
  'the-power-of-eight': [
    { slug: 'e-squared', reason: 'Grout’s short personal experiments are the solo version of a claim McTaggart tests in a group.' },
    { slug: 'becoming-supernatural', reason: 'Dispenza’s group practices sit next to McTaggart’s small-circle intention experiments.' },
    { slug: 'the-secret', reason: 'Byrne states the attraction claim. McTaggart asks what changes when eight people hold one intention.' },
  ],
  'altered-traits': [
    { slug: 'the-power-of-now', reason: 'Tolle describes a shift in attention. Goleman and Davidson ask which of those shifts survive as a trait.' },
    { slug: 'handbook-to-higher-consciousness', reason: 'Keyes offers a daily operating map. Altered Traits asks what dose of practice actually changes a person.' },
    { slug: 'the-miracle-of-mindfulness', reason: 'Hanh’s instructions are the practice. Goleman and Davidson are the evidence review beside them.' },
  ],
  blitzscaling: [
    { slug: 'profit-first', reason: 'Michalowicz keeps the cash system visible while Hoffman and Yeh argue for speed. Read them as two constraints on the same company.' },
    { slug: 'tools-of-titans', reason: 'Ferriss collects operator tactics. The Blitzscaling field note is two pages on platforms and generalists, not that whole catalog.' },
  ],
};

function searchVideo(review: BookReview): BookVideo {
  const query = encodeURIComponent(`${review.title} ${review.author}`);
  return {
    title: `Search talks on ${review.title}`,
    creator: 'YouTube search',
    url: `https://www.youtube.com/results?search_query=${query}`,
    description: 'Opens a YouTube search for this title and author. Choose a named speaker, and a named edition when the work is a translation, before treating any wording as a source.',
    kind: 'explainer',
  };
}

function guideFaq(review: BookReview): NonNullable<BookReview['faq']> {
  const guide = review.guide;
  if (!guide) return [];
  const path = guide.readingPath.map((step, index) => `${index + 1}. ${step.title}. ${step.note}`).join(' ');
  return [
    {
      q: `Where does a first reading of ${review.title} start?`,
      a: path,
    },
    {
      q: `How should a reader choose an edition of ${review.title}?`,
      a: guide.editionNote,
    },
    {
      q: `What should stay in view while reading ${review.title}?`,
      a: guide.context,
    },
  ];
}

function continueFromSlugs(
  pairs: Array<{ slug: string; reason: string }>,
  bySlug: Map<string, BookReview>,
): NonNullable<BookReview['continueReading']> {
  return pairs.flatMap((pair) => {
    const book = bySlug.get(pair.slug);
    if (!book) return [];
    return [{
      title: book.title,
      author: book.author,
      reason: pair.reason,
      url: `/library/${book.slug}`,
    }];
  });
}

export function applyLibraryCompletion(
  review: BookReview,
  bySlug: Map<string, BookReview>,
): BookReview {
  const next: BookReview = { ...review };

  if (!next.relatedBook && RELATED_BOOK[next.slug]) {
    next.relatedBook = RELATED_BOOK[next.slug];
  }

  if (!next.quotes?.length && FRANK_QUOTES[next.slug]) {
    next.quotes = FRANK_QUOTES[next.slug];
  }

  if (!next.chapters?.length && FRANK_CHAPTERS[next.slug]) {
    next.chapters = FRANK_CHAPTERS[next.slug];
  }

  if (!next.faq?.length && next.guide) {
    next.faq = guideFaq(next);
  }

  if (!next.continueReading?.length && CONTINUE_SLUGS[next.slug]) {
    next.continueReading = continueFromSlugs(CONTINUE_SLUGS[next.slug], bySlug);
  }

  if (!next.continueReading?.length && next.guide?.relatedSlugs?.length) {
    next.continueReading = continueFromSlugs(
      next.guide.relatedSlugs.map((slug) => ({
        slug,
        reason: `${next.title} is paired with this book on the ${next.guide?.tradition} shelf. Read the edition note on each page before comparing wording.`,
      })),
      bySlug,
    );
  }

  if (!next.videos?.length) {
    next.videos = [searchVideo(next)];
  }

  return next;
}

export const libraryCompletionQuoteTexts = Object.values(FRANK_QUOTES).flat().map((quote) => quote.text);
