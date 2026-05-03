/**
 * Hub configuration — the four contemplative rails.
 *
 * Manifestos are verbatim from the original Claude-chat handoff §5, adapted
 * for the `/on-X/` URL form. Keyword spines from handoff §2.
 *
 * Portable: keep this free of FrankX-specific imports for RIS extraction.
 */

import type { HubConfig, HubSlug } from '@/lib/rails/types';

export const hubs: Record<HubSlug, HubConfig> = {
  god: {
    slug: 'god',
    question: 'What is God?',
    displayTitle: 'Notes on God',
    spectrum: 'soul',
    manifesto: `Every serious tradition that has lived through centuries has worked this question — Christian mystics, Sufi poets, Kabbalists, Advaita teachers, Buddhists who refuse the word and still point at the same thing. The vocabularies fight. The structures rhyme.

This rail walks the question across traditions, with citations, named teachers, and the disagreements left intact. The goal is not to decide whether God exists, nor to convert anyone toward or away from any tradition. The goal is to read what the deepest minds in each tradition have actually said, hold their answers next to each other, and notice what converges and what does not.

Most writing on God collapses into one of three failures: it speaks for one tradition only, it dissolves all traditions into the same answer, or it treats the whole thing academically with no skin in the game. This rail attempts a fourth posture: convergent reading without collapse, by someone walking the question seriously, with research partners that include both Anthropic's Claude and the recorded centuries of human inquiry.

Entries are dated, versioned, and cross-linked to /on-reality/, /on-consciousness/, and /on-faith/. Sources are catalogued at /canon/.`,
    keywordSpine: [
      'what is god',
      'is god real',
      'what does god mean',
      'personal god vs impersonal god',
      'god across religions',
      'names of god',
      'is god love',
      'kabbalah ein sof',
      'trinity meaning',
      'god in advaita',
      'god in buddhism',
      'notes on god',
    ],
  },
  reality: {
    slug: 'reality',
    question: 'What is real?',
    displayTitle: 'Notes on Reality',
    spectrum: 'bridge',
    manifesto: `The question used to belong to philosophers. Now it belongs equally to physicists, neuroscientists, mystics, and anyone whose perception has been altered enough to wonder whether what they see is what is.

Bohm proposed an implicate order folded under what we observe. Penrose and Hameroff proposed consciousness as a quantum process, not a computational byproduct. Hoffman argues evolution selects for fitness, not truth — that what we perceive is interface, not reality. Advaita has said for two thousand years that the manifest world is appearance and the only Real is what underlies it. Christian mystics have said the same in different vocabulary. Kabbalah has said it again.

This rail reads the physics literature and the contemplative literature as one inquiry. Where they converge it says so. Where they diverge it says that too.

Cross-linked to /on-god/, /on-consciousness/, and /on-faith/. Sources at /canon/.`,
    keywordSpine: [
      'what is reality',
      'nature of reality',
      'is reality an illusion',
      'implicate order bohm',
      'is the universe a hologram',
      'non-dual reality',
      'maya hindu philosophy',
      'reality as consciousness',
      'quantum reality',
      'notes on reality',
    ],
  },
  consciousness: {
    slug: 'consciousness',
    question: 'What is consciousness?',
    displayTitle: 'Notes on Consciousness',
    spectrum: 'tech',
    manifesto: `The hard problem — why there is anything it is like to be — has not been solved by any field. Cognitive science describes the contents of awareness without explaining why awareness exists. Penrose and Hameroff propose a quantum origin in microtubules. Kastrup and others propose consciousness as fundamental rather than emergent. The Advaita tradition has held this for millennia: awareness is what is, and everything else is appearance within it.

This rail reads the neuroscience, the quantum proposals, the philosophy of mind, and the non-dual traditions as a single field of inquiry. It treats Ramana Maharshi and Donald Hoffman as colleagues across centuries. It does not claim science proves mysticism. It maps where the questions converge.

Cross-linked to /on-god/, /on-reality/, and /on-faith/. Sources at /canon/.`,
    keywordSpine: [
      'what is consciousness',
      'quantum consciousness',
      'consciousness and the brain',
      'non-dual awareness',
      'i am that meaning',
      'consciousness explained',
      'penrose hameroff',
      'orch or theory',
      'consciousness as fundamental',
      'notes on consciousness',
    ],
  },
  faith: {
    slug: 'faith',
    question: 'What does it mean to walk the question?',
    displayTitle: 'Notes on Faith',
    spectrum: 'soul',
    manifesto: `Faith is not belief. Belief assents to a proposition; faith is the posture of someone walking forward with incomplete information toward what they cannot yet see. Kierkegaard called it the leap. The Hebrew *emunah* points at faithfulness — staying. The Christian mystics and the Sufis and the bhakti traditions all describe a posture closer to relationship than to claim.

This rail is about the practice — the actual walk. Apophatic and kataphatic prayer. Hesychast breathwork and the Jesus Prayer. Dispenza's coherence protocols read alongside Christian contemplation. Surrender as a technical concept across traditions. Doubt as part of faith, not its opposite.

The rail does not represent any specific church or tradition. It walks across them.

Cross-linked to /on-god/, /on-reality/, and /on-consciousness/. Sources at /canon/.`,
    keywordSpine: [
      'what is faith',
      'faith vs belief',
      'faith without religion',
      'doubt and faith',
      'how to have faith',
      'kierkegaard leap of faith',
      'negative theology',
      'apophatic prayer',
      'jesus prayer hesychasm',
      'notes on faith',
    ],
  },
};

export function getHub(slug: string): HubConfig | undefined {
  return (hubs as Record<string, HubConfig>)[slug];
}

export function getAllHubSlugs(): HubSlug[] {
  return Object.keys(hubs) as HubSlug[];
}
