import type { BookReview } from '@/app/books/types';

export type ManualItem = {
  number: string;
  name: string;
  signal: string;
  practice: string;
};

export type CriticalReading = {
  principle: string;
  keep: string;
  qualify: string;
};

export type SourceEntry = {
  label: string;
  url: string;
  kind: 'Primary text' | 'Bibliography' | 'Context' | 'Research';
  note: string;
};

export const handbookToHigherConsciousnessReview: BookReview = {
  slug: 'handbook-to-higher-consciousness',
  title: 'Handbook to Higher Consciousness',
  author: 'Ken Keyes Jr.',
  coverImage: '',
  hasCover: false,
  rating: 4,
  reviewDate: '2026-07-29',
  publicationYear: 1975,
  categories: ['Self-Development', 'Inner Work', 'Philosophy', 'Spirituality'],
  readingTime: '22 min',
  tldr:
    'Keyes built a practical system for converting emotion-backed demands into preferences, then using every disturbance as diagnostic feedback. Its durable core is outcome-independent action: want intensely, love without coercion, act decisively, and require no result to certify your wholeness.',
  capture: {
    kind: 'manual',
    capturedAt: '2026-07-27',
    edition: 'Fifth edition',
    publicNote:
      'This field manual was checked against a complete fifth-edition text and independent bibliographic records. It maps the system without reproducing the book, its chapters, or extended quotations.',
    rightsStatus:
      'Transformative analysis only. Framework names are retained for identification; pathway language, explanations, and applications are original paraphrases.',
  },
  keyInsights: [
    'The decisive distinction is not desire versus no desire; it is preference versus demand. A preference can guide action without making peace conditional on the result.',
    'Emotional disturbance is treated as a diagnostic signal: identify the hidden rule that says reality must be different before you can be whole.',
    'Keyes locates most recurring suffering in security, sensation, and power programs learned when dependence was real but retained after adulthood made flexibility possible.',
    'Acceptance means ending the internal argument with the present fact. It does not require approval, passivity, reconciliation, or refusal to change the situation.',
    'Unconditional love is non-transactional regard. It removes coercion from relationship while leaving boundaries, discernment, and consequences intact.',
    'The system redirects energy from controlling the external world toward changing the internal program that makes one outcome emotionally compulsory.',
    'Action improves when the nervous system is not spending attention on threat rehearsal, status defense, resentment, or imagined future failure.',
    'The Seven Centers are a state-detection map, not a hierarchy for judging people. The useful question is which center is generating this interpretation now.',
    'The Love Center shifts from subject-object control toward identification, compassion, and acceptance without collapsing difference.',
    'The Cornucopia Center reframes experience as sufficient material for learning; modern readers should treat this as an attention discipline, not a promise of supernatural supply.',
    'The Conscious-awareness Center is metacognition: thoughts, roles, impulses, and emotional programs become observable events rather than identity.',
    'The Cosmic Consciousness Center names nondual awareness. It is an orientation, not a status badge or another achievement addiction.',
    'The Twelve Pathways function as replacement instructions rehearsed until they interrupt an old reaction before it becomes behavior.',
    'The Five Methods turn ordinary life into meditation-in-action: recall the map, locate the state, trace cause and effect, recenter attention, and focus on heavy patterns.',
    'Progress is measured by recovery latency: first you notice after the reaction, then during it, then at ignition, and eventually the old trigger no longer recruits the same program.',
    'The mature synthesis is fierce preference plus zero inner ultimatum: pursue the vision fully while refusing to make reality prove your worth.',
  ],
  bestFor: [
    'Builders whose ambition becomes anxiety when outcomes carry identity',
    'People repeating control, jealousy, approval, status, or scarcity loops',
    'Meditators who want an operating model for ordinary conflict and decision-making',
    'Readers exploring non-attachment without abandoning decisive action',
    'Anyone willing to translate 1970s spiritual language into modern metacognition',
  ],
  application: {
    title: 'The Outcome-Independent Operator',
    body:
      'Use Keyes as a demand detector. Keep the goal, strategy, standards, and next action; remove the proposition that one external result must occur for you to remain whole, lovable, or safe.',
    practice: {
      title: 'The 90-second demand audit',
      duration: '90 seconds',
      instruction:
        'Name the fact without interpretation. Name the emotion. Complete: “I am demanding that…” Convert that sentence to: “I strongly prefer…, and I remain able to love, think, and act when reality differs.” Then choose the smallest effective action available now.',
    },
    connections: [
      {
        label: 'Manifestation',
        href: '/manifestation',
        reason: 'Desire without grasping: vision becomes direction rather than evidence of lack.',
        kind: 'practice',
      },
      {
        label: 'Soulbook',
        href: '/soulbook',
        reason: 'Separate chosen identity from the conditions used to validate it.',
        kind: 'product',
      },
      {
        label: 'The Wordless Laws',
        href: '/books/the-wordless-laws',
        reason: 'A narrative companion for recognizing invisible laws through lived consequence.',
        kind: 'article',
      },
    ],
  },
  faq: [
    {
      q: 'What is the central idea of Handbook to Higher Consciousness?',
      a: 'Suffering intensifies when a preference becomes an emotion-backed demand. Keyes teaches readers to keep intelligent preferences and effective action while releasing the requirement that reality obey before they can feel whole.',
    },
    {
      q: 'What are the Seven Centers of Consciousness?',
      a: 'Security, Sensation, Power, Love, Cornucopia, Conscious-awareness, and Cosmic Consciousness. They describe increasingly inclusive ways of interpreting experience, from survival and control through unconditional regard, metacognition, and nondual awareness.',
    },
    {
      q: 'What are the Twelve Pathways?',
      a: 'They are twelve replacement orientations grouped around freeing oneself, inhabiting the present, relating openly, and developing conscious awareness. This guide paraphrases each pathway rather than reproducing the original wording.',
    },
    {
      q: 'Does non-attachment mean giving up goals?',
      a: 'No. It means pursuing a preferred result without converting it into a condition for worth, love, safety, or inner stability. High commitment and low psychological compulsion can coexist.',
    },
    {
      q: 'Does acceptance mean tolerating harm?',
      a: 'No. Acceptance acknowledges the present fact accurately. Boundaries, departure, protection, accountability, and systemic change may be the most loving actions available.',
    },
    {
      q: 'Are negative emotions useless?',
      a: 'That claim should be qualified. Emotions carry information and prepare action; chronic escalation and rumination can distort perception. The modern move is to feel and interpret emotion without letting it monopolize behavior.',
    },
    {
      q: 'What is the fastest way to apply the book?',
      a: 'When upset, identify the hidden “must,” convert it into a strong preference, locate the center shaping your interpretation, and take one effective action after arousal falls enough for clear perception.',
    },
    {
      q: 'Is the book scientifically current?',
      a: 'No. Its “biocomputer” model is a useful metaphor, but several neurological and universal claims reflect the 1970s. Read it as a contemplative operating system, not a neuroscience text.',
    },
    {
      q: 'Why is this guide rated four stars?',
      a: 'The core distinction between demands and preferences is exceptionally useful, and the practice architecture is unusually complete. The rating stops at four because some claims about emotion, causation, health, and consciousness need modern qualification.',
    },
  ],
  amazonUrl: 'https://www.amazon.com/dp/0960068880',
  relatedBook: 'the-wordless-laws',
  continueReading: [
    {
      title: 'The Untethered Soul',
      author: 'Michael A. Singer',
      reason: 'A cleaner contemporary bridge into witnessing thoughts without identifying with them.',
      url: 'https://www.amazon.com/dp/1572245379',
    },
    {
      title: 'Loving What Is',
      author: 'Byron Katie',
      reason: 'A question-based method for finding the demand hidden inside emotional resistance.',
      url: 'https://www.amazon.com/dp/1400045371',
    },
    {
      title: 'Man’s Search for Meaning',
      author: 'Viktor E. Frankl',
      reason: 'A necessary corrective: inner freedom matters without denying objective suffering or moral responsibility.',
      url: 'https://www.amazon.com/dp/0807014273',
    },
    {
      title: 'The Wordless Laws',
      author: 'Frank',
      reason: 'The same territory translated into story, consequence, and lived recognition.',
      url: '/books/the-wordless-laws',
    },
  ],
};

export const coreOperatingModel: ManualItem[] = [
  {
    number: '01',
    name: 'Detect the demand',
    signal: 'An external result has become a condition for safety, worth, love, control, or identity.',
    practice: 'Finish the sentence: “I cannot be okay unless…” The completion reveals the active program.',
  },
  {
    number: '02',
    name: 'Separate fact from program',
    signal: 'Interpretation is being experienced as reality itself.',
    practice: 'State the observable fact, then state the rule your mind adds. Keep them cognitively separate.',
  },
  {
    number: '03',
    name: 'Convert addiction to preference',
    signal: 'The goal is useful, but compulsion is degrading perception and behavior.',
    practice: 'Retain the preferred outcome and release the ultimatum that your wholeness depends on it.',
  },
  {
    number: '04',
    name: 'Return to loving effectiveness',
    signal: 'Arousal is high enough that action is becoming retaliatory, defensive, or coercive.',
    practice: 'Lower arousal, widen identification, then choose the action that protects truth, dignity, and agency.',
  },
  {
    number: '05',
    name: 'Use life as feedback',
    signal: 'The same category of disturbance repeats across people and situations.',
    practice: 'Treat recurrence as a test suite for the same underlying program, not proof that the world is against you.',
  },
];

export const sevenCenters: ManualItem[] = [
  {
    number: '1',
    name: 'Security',
    signal: 'Attention contracts around survival, certainty, possession, scarcity, or getting enough.',
    practice: 'Distinguish a real protection problem from an inherited alarm demanding total certainty.',
  },
  {
    number: '2',
    name: 'Sensation',
    signal: 'Pleasure, stimulation, sex, food, novelty, or comfort is being used as the route to lasting happiness.',
    practice: 'Enjoy sensation fully without making continuous stimulation the price of aliveness.',
  },
  {
    number: '3',
    name: 'Power',
    signal: 'Status, prestige, domination, hierarchy, being right, or controlling another becomes central.',
    practice: 'Replace forced compliance with clean influence, explicit standards, and freedom of response.',
  },
  {
    number: '4',
    name: 'Love',
    signal: 'The other is perceived as another center of experience rather than an object in your strategy.',
    practice: 'Hold unconditional regard while retaining boundaries and refusing coercive exchange.',
  },
  {
    number: '5',
    name: 'Cornucopia',
    signal: 'Experience is interpreted as sufficient material for learning, participation, and appreciation.',
    practice: 'Look for available resources and lessons without pretending every condition is benign or deserved.',
  },
  {
    number: '6',
    name: 'Conscious-awareness',
    signal: 'Thoughts, roles, emotions, and impulses can be witnessed without immediate identification.',
    practice: 'Observe the active center and program nonjudgmentally before choosing the next move.',
  },
  {
    number: '7',
    name: 'Cosmic consciousness',
    signal: 'The boundary between observer and observed becomes less psychologically dominant.',
    practice: 'Treat nondual awareness as a lived orientation, never as rank, proof, or spiritual superiority.',
  },
];

export const twelvePathways: ManualItem[] = [
  {
    number: '01',
    name: 'Release control addictions',
    signal: 'Security, sensation, or power demands are forcing the moment.',
    practice: 'Notice where control destroys serenity and blocks love.',
  },
  {
    number: '02',
    name: 'See the constructed world',
    signal: 'Your program’s interpretation feels identical to objective reality.',
    practice: 'Recognize that demands select and distort what reaches awareness.',
  },
  {
    number: '03',
    name: 'Welcome diagnostic friction',
    signal: 'Pain exposes a recurring automatic reaction.',
    practice: 'Use the disturbance to identify the program ready for revision.',
  },
  {
    number: '04',
    name: 'Return to the present',
    signal: 'Past conditions or imagined futures dominate the current field.',
    practice: 'Inventory what is actually available now before rehearsing absence.',
  },
  {
    number: '05',
    name: 'Own the response',
    signal: 'Your emotional state is being assigned entirely to another person or event.',
    practice: 'Take responsibility for the internal program without denying external causation or harm.',
  },
  {
    number: '06',
    name: 'Accept the whole self',
    signal: 'Shame turns a current pattern into a verdict on identity.',
    practice: 'Include thought, feeling, action, and addiction in awareness without self-attack.',
  },
  {
    number: '07',
    name: 'Communicate without hiding',
    signal: 'Image management and withheld truth manufacture separateness.',
    practice: 'Disclose what is relevant with precision, consent, timing, and responsibility.',
  },
  {
    number: '08',
    name: 'Practice unentangled compassion',
    signal: 'Another person’s pain recruits rescue, panic, or emotional fusion.',
    practice: 'Feel with them while preserving the clarity required for useful support.',
  },
  {
    number: '09',
    name: 'Act from centeredness',
    signal: 'Urgency is collapsing options and turning action into discharge.',
    practice: 'When possible, let arousal fall before committing consequential behavior.',
  },
  {
    number: '10',
    name: 'Quiet compulsive scanning',
    signal: 'The rational mind is searching continuously for threat, leverage, or certainty.',
    practice: 'Relax narrow analysis long enough for broader perception and intuition to enter.',
  },
  {
    number: '11',
    name: 'Track the active center',
    signal: 'A state is shaping perception invisibly.',
    practice: 'Name the center and notice whether awareness, love, energy, and range expand or contract.',
  },
  {
    number: '12',
    name: 'See awakening beings',
    signal: 'Identity hardens around another person’s current behavior or your own past.',
    practice: 'Hold development as possible without denying evidence, consequences, or boundaries.',
  },
];

export const fiveMethods: ManualItem[] = [
  {
    number: '01',
    name: 'Rehearse the Pathways',
    signal: 'The replacement response is not available quickly enough under pressure.',
    practice: 'Review the map until it becomes retrievable during real conflict, not only in reflection.',
  },
  {
    number: '02',
    name: 'Locate the current Center',
    signal: 'You know what you think but not the state from which you are thinking.',
    practice: 'Name the center generating the interpretation, then test a more inclusive frame.',
  },
  {
    number: '03',
    name: 'Trace demand to suffering',
    signal: 'The outer event appears to be the complete cause of the inner reaction.',
    practice: 'Map event → demand → emotion → behavior → consequence, then revise the demand.',
  },
  {
    number: '04',
    name: 'Use the centering catalyst',
    signal: 'Attention repeatedly splits the field into “me” against “them.”',
    practice: 'Use Keyes’s ALL WAYS US LIVING LOVE cue to restore identification and compassionate range.',
  },
  {
    number: '05',
    name: 'Focus on heavy patterns',
    signal: 'A deeply conditioned demand survives ordinary reflection.',
    practice: 'Concentrate repeated, emotionally credible replacement instructions on one pattern at a time.',
  },
  {
    number: '+',
    name: 'Instant consciousness doubler',
    signal: 'Another person’s behavior is easy to condemn from outside their psychological space.',
    practice: 'Temporarily experience their speech or action as though it arose through you; use the result for understanding, not exoneration.',
  },
];

export const fiveLearningStages: ManualItem[] = [
  {
    number: '1',
    name: 'Unconscious enactment',
    signal: 'The old program runs as reality; the map is unknown.',
    practice: 'Build vocabulary for demand, center, trigger, and preference.',
  },
  {
    number: '2',
    name: 'Retrospective awareness',
    signal: 'You know the map but recognize the program after being captured by it.',
    practice: 'Review episodes without shame and identify the earliest detectable cue.',
  },
  {
    number: '3',
    name: 'Recovery during activation',
    signal: 'You can identify the violated principle while upset and shorten the episode.',
    practice: 'Measure recovery latency rather than demanding immediate perfection.',
  },
  {
    number: '4',
    name: 'Interception at ignition',
    signal: 'The replacement frame appears as the reaction begins.',
    practice: 'Let the cue interrupt escalation before it becomes speech or action.',
  },
  {
    number: '5',
    name: 'Reprogrammed response',
    signal: 'The former trigger no longer recruits the same emotional sequence.',
    practice: 'Maintain flexibility; do not turn mastery into a new identity demand.',
  },
];

export const criticalReading: CriticalReading[] = [
  {
    principle: 'Acceptance',
    keep: 'Accurate contact with the present reduces secondary struggle and improves choice.',
    qualify: 'Acceptance is not approval. Harm may require boundaries, exit, protection, justice, or structural change.',
  },
  {
    principle: 'Emotional responsibility',
    keep: 'Owning regulation and interpretation restores agency.',
    qualify: 'Responsibility for response is not total responsibility for cause. Abuse, deprivation, illness, and power asymmetry remain real.',
  },
  {
    principle: 'Negative emotion',
    keep: 'Rumination and high arousal often narrow perception and degrade consequential action.',
    qualify: 'Fear, anger, grief, and disgust can carry information. Integration is stronger than suppression or moralizing emotion.',
  },
  {
    principle: 'Unconditional love',
    keep: 'Non-transactional regard removes coercion from relationship.',
    qualify: 'Love does not require access, trust, reconciliation, agreement, or freedom from consequences.',
  },
  {
    principle: 'The biocomputer',
    keep: 'Programming is a useful metaphor for learned predictions and automatic response loops.',
    qualify: 'The book’s neurological explanations and quantitative claims are dated and should not be treated as current neuroscience.',
  },
  {
    principle: 'Cornucopia',
    keep: 'Attention to sufficiency, opportunity, and learning can widen action.',
    qualify: 'It is an interpretive discipline, not evidence that reality guarantees supply or that misfortune was personally created.',
  },
  {
    principle: 'Calming before action',
    keep: 'Lowering arousal before consequential behavior is supported by contemporary anger-regulation evidence.',
    qualify: 'Calm is not silence. Once regulated, direct confrontation or decisive protection may be the correct move.',
  },
];

export const handbookSources: SourceEntry[] = [
  {
    label: 'Handbook to Higher Consciousness — complete fifth-edition text',
    url: 'https://lifesplayer.s3.us-east-2.amazonaws.com/misc/KenKeyes-HandbookToHigherConsciousness.pdf',
    kind: 'Primary text',
    note: 'Primary source for the Seven Centers, Twelve Pathways, Five Methods, learning stages, and appendices.',
  },
  {
    label: 'Google Books bibliographic record',
    url: 'https://books.google.com/books/about/Handbook_to_Higher_Consciousness.html?id=7xwtAAAAMAAJ',
    kind: 'Bibliography',
    note: 'Confirms Ken Keyes Jr., Living Love Center, 1975 publication, and ISBN 0960068880.',
  },
  {
    label: 'Ken Keyes Jr. interview on implementing unconditional love',
    url: 'https://livingpurposeinstitute.com/ken-y-keyes-jr-interview-implementing-unconditional-love/',
    kind: 'Context',
    note: 'Authorial context for the Living Love method and its intended application.',
  },
  {
    label: 'The psychological health benefits of accepting negative emotions and thoughts',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28703602/',
    kind: 'Research',
    note: 'Evidence relevant to acceptance without judgment and psychological health.',
  },
  {
    label: 'Monitor and Acceptance Theory in mindfulness research',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7057281/',
    kind: 'Research',
    note: 'Modern account of how attention monitoring and acceptance interact.',
  },
  {
    label: 'Emotion-regulation strategy research',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24897894/',
    kind: 'Research',
    note: 'Context for qualifying broad claims about the utility of emotions and regulation strategies.',
  },
  {
    label: 'Meta-analysis of anger-management activities and arousal',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38518585/',
    kind: 'Research',
    note: 'Supports arousal-reducing practices over cathartic venting as a general anger intervention.',
  },
];
