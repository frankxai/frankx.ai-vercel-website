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
    chapter(1, 'An Invitation', 'The chapter explores why the book treats the most powerful laws of life as hiding in plain sight — and how a reader might learn to notice them.'),
    chapter(2, 'The One Who Decides', 'The book holds that a single, total decision rearranges everything downstream, while an undecided life stays formless.'),
    chapter(3, 'The Tuning of a Life', 'The chapter explores the teaching that what you hold steadily inside begins to meet you outside — that, in this book’s frame, state precedes circumstance.'),
    chapter(4, 'The Words Said in the Dark', 'The book holds that repeated inner speech pours the floor you stand on, and that you become the sentence you say most.'),
    chapter(5, 'The Picture Before the Thing', 'The chapter explores holding the finished image first, so the hands and the world arrange toward it — presented as the book’s method, not a lab result.'),
    chapter(6, 'The Leap Taken Before the Bridge', 'The book holds that you must act as if it is already true before the proof exists — or, in this teaching, the proof never comes.'),
    chapter(7, 'Thanks Given in Advance', 'The chapter explores thanks given before the gift as opening the channel for the gift; the book contrasts lack that repels with fullness that draws.'),
    chapter(8, 'The Spark That Becomes the World', 'The book holds that everything ever built was first an invisible thing in one mind, and treats the idea itself as the asset.'),
    chapter(9, 'The Mind That Will Not Bend', 'The chapter explores how the world, in this story, tests every desire with delay and refusal — and how the one who will not quit is rare, with rarity rewarded.'),
