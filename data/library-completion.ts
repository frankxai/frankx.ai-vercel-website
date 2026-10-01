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

const FRANK_CHAPTERS: Record<string, BookChapterSummary[]> = {
  'the-wordless-laws': [
    { number: 1, title: 'An Invitation', keyIdea: 'The strongest laws of a life hide by being obvious.', summary: 'The invitation asks the reader to look at forces already present in ordinary stories. It withholds tidy labels so the recognition happens in the reading.' },
    { number: 2, title: 'The One Who Decides', keyIdea: 'One total decision rearranges what can happen next.', summary: 'An undecided life stays a folder of beginnings. The chapter treats a single, unhedged decision as the act that gives the rest of the book somewhere to land.' },
    { number: 3, title: 'The Tuning of a Life', keyIdea: 'What you hold steadily inside begins to meet you outside.', summary: 'Two people leave the same closed plant on the same day. The chapter follows how an inner state, held long enough, changes the life that meets them.' },
    { number: 4, title: 'The Words Said in the Dark', keyIdea: 'Repeated inner speech becomes the floor you stand on.', summary: 'A sentence said privately for years is treated as construction, not mood. The chapter asks which sentence is being rehearsed when nobody is listening.' },
    { number: 5, title: 'The Picture Before the Thing', keyIdea: 'Hold the finished image before the means exist.', summary: 'A locked piano does not stop the boy from building the music in mind. The chapter keeps the image ahead of the instrument, the money, and the permission.' },
    { number: 6, title: 'The Leap Taken Before the Bridge', keyIdea: 'Act as if the outcome is real before the proof arrives.', summary: 'The proof the reader is waiting for is treated as something that follows the act. Waiting for the bridge first is how the crossing stays imaginary.' },
    { number: 7, title: 'Thanks Given in Advance', keyIdea: 'Thanks offered before the result changes the stance you take.', summary: 'A table is set before the food is certain. The chapter separates gratitude as a posture from gratitude as a receipt.' },
    { number: 8, title: 'The Spark That Becomes the World', keyIdea: 'What gets built was first an invisible thing in one mind.', summary: 'The idea is handled as the asset, before the paper and the machine exist. The chapter stays with that first invisible form.' },
    { number: 9, title: 'The Mind That Will Not Bend', keyIdea: 'Delay and refusal are the test, and staying is rare.', summary: 'A recipe is offered after many refusals. The chapter treats persistence as the scarce act, and rarity as the thing that eventually gets answered.' },
    { number: 10, title: 'The Minds That Become One', keyIdea: 'Two minds in true alignment can do what neither does alone.', summary: 'The pairing looks wrong at the start. The chapter follows the third capacity that appears when the division of work is real.' },
    { number: 11, title: 'The River That Returns', keyIdea: 'A closed hand can neither give nor receive.', summary: 'The only well is held on the owner’s terms, and the holding makes it smaller. What is released in the right spirit is the chapter’s return path.' },
    { number: 12, title: 'The Knowing That Sleeps', keyIdea: 'Hand the problem to the deeper mind and stop forcing the answer.', summary: 'A tired chemist stops trusting forced attention. The chapter treats the surfaced answer as something that arrives after the clutch lets go.' },
    { number: 13, title: 'The Open Hand', keyIdea: 'Decide fully, then release the grip on how and when.', summary: 'A child wants a gallop and locks the reins. The chapter separates a total decision from the clenched route that blocks it.' },
    { number: 14, title: 'The Last Page', keyIdea: 'The laws were in the reader the whole time.', summary: 'The close refuses a margin label that would settle the book too neatly. Recognition, not a new slogan, is the ending.' },
  ],
  'the-book-of-secrets': [
    { number: 1, title: 'The Locked Drawers', keyIdea: 'The lessons of good work are available early and usually learned late.', summary: 'The opening treats the secrets as unlocked and still unused. The rest of the book hands them over at the start, where they can still change the work.' },
    { number: 2, title: 'The Secret of the Blank Page', keyIdea: 'You beat the blank page by starting badly.', summary: 'Resistance is strongest just before the work that would matter. The chapter stays with the first bad start as the way through.' },
    { number: 3, title: 'The Secret of Volume', keyIdea: 'Quantity is how quality gets found.', summary: 'The masterpiece is inside the pile, not planned in advance of the pile. The ceramics class makes the point by weighing the work.' },
    { number: 4, title: 'The Secret of the Gap', keyIdea: 'Taste outruns skill, and that gap is evidence you can still grow.', summary: 'The work disappoints because the standard is ahead of the hand. Outlasting the gap is the chapter’s condition for getting better.' },
    { number: 5, title: 'The Secret of Constraints', keyIdea: 'A limit gives the work a door.', summary: 'An open wall with no brief stays empty. The chapter treats a constraint as the thing that lets making begin.' },
    { number: 6, title: 'The Secret of Stealing', keyIdea: 'A maker is a remix, and fear of imitation keeps the work generic.', summary: 'Copying a strong picture is treated as study. The chapter asks the maker to see their influences clearly enough to go past them.' },
    { number: 7, title: 'The Secret of the Edit', keyIdea: 'The first draft tells you the story. The work appears in revision.', summary: 'Scenes that felt vivid can still be people explaining the plot. The chapter puts the real making in what gets cut and rebuilt.' },
    { number: 8, title: 'The Secret of Showing Up', keyIdea: 'A schedule gives the work an address. Mood does not.', summary: 'The composer sits at the same hour whether or not the music has arrived. Inspiration is described as something that learns where to find a person who is already working.' },
    { number: 9, title: 'The Secret of Standards', keyIdea: 'Taste is mostly the courage to refuse work that would pass.', summary: 'Finished chairs that a buyer would accept are still burned. The chapter treats standards as what you will not ship.' },
    { number: 10, title: 'The Secret of Finishing', keyIdea: 'Finishing is a separate skill from starting.', summary: 'A folder of almost-done work is the evidence. Done teaches what an endless draft cannot.' },
    { number: 11, title: 'The Secret of Shipping', keyIdea: 'The work becomes real when it meets someone else.', summary: 'A finished book kept as a draft is still private. The chapter treats the meeting with a reader as its own act.' },
    { number: 12, title: 'The Secret of the Long Game', keyIdea: 'The public overnight is often a decade of making.', summary: 'The story told about a sudden arrival leaves out the years. Craft compounds out of sight, then shows up all at once.' },
    { number: 13, title: 'The Secret of the Making', keyIdea: 'The lasting result is the maker the work produces.', summary: 'Publication morning is not treated as the point. The chapter returns the reward to the person who kept making.' },
    { number: 14, title: 'The Last Secret', keyIdea: 'No secret replaces making one thing.', summary: 'The close sends the reader out of the book. The instruction is to make something, with the lessons already in hand.' },
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
