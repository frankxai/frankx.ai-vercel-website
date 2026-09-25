/** Original editorial interpretation. Passage pointers refer to the source/edition linked in each guide. */
export type SacredOverview = {
  argument: string;
  movements: Array<{ title: string; body: string }>;
  readingQuestion: string;
};

export const sacredEditorial: Record<string, SacredOverview> = {
  bible: {
    argument: 'A library of books rather than a single continuous argument. Across its different canons, the Bible asks how a people lives with covenant, exile, injustice, hope, and the possibility of renewal. The Gospels then place the life and death of Jesus at the centre of Christian interpretation.',
    movements: [
      { title: 'Covenant and collective memory', body: 'Genesis and Exodus move from family narratives to liberation and law. The telling shapes a people’s identity; it is more than an abstract list of beliefs.' },
      { title: 'Poetry and protest', body: 'Psalms contain praise and lament. Job refuses an easy equation between suffering and wrongdoing; Ecclesiastes presses on the limits of what a human can secure or know.' },
      { title: 'Jesus and the early communities', body: 'Mark tells a fast, demanding story of discipleship. Read its scenes together before extracting sayings. The letters answer particular communities and disputes rather than supplying a single undifferentiated rulebook.' },
    ],
    readingQuestion: 'Which genre is speaking here, and whose interpretation of this passage am I reading?',
  },
  tanakh: {
    argument: 'Torah, Prophets, and Writings form the Jewish scriptural collection. Its books return to covenant, law, land, exile, worship, and the difficulty of living justly. Their order and continuing interpretation matter: a Christian arrangement of overlapping books does not stand in for Jewish reading.',
    movements: [
      { title: 'Torah', body: 'Genesis through Deuteronomy combines narrative and instruction. Exodus links freedom to communal obligations, while Leviticus, Numbers, and Deuteronomy develop different dimensions of that life.' },
      { title: 'Prophets', body: 'Read prophetic speech in its social setting. Critique of exploitation and misplaced security sits alongside judgment and restoration.' },
      { title: 'Writings', body: 'Psalms, Job, and Ecclesiastes do not speak in one mood. Prayer, argument, grief, and uncertainty all belong within this collection.' },
    ],
    readingQuestion: 'What changes when a passage is read with Jewish commentary and in its place within the Tanakh?',
  },
  quran: {
    argument: 'The Quran is received by Muslims as revelation in Arabic and encountered through recitation as well as reading. Its surahs address worship, accountability, mercy, social obligations, and the stories of earlier prophets. An English rendering helps a newcomer begin, but it remains a named translator’s interpretation.',
    movements: [
      { title: 'An opening address', body: 'Al-Fatiha is a prayer as well as an entry point. Read slowly before trying to reduce the whole collection to a topical index.' },
      { title: 'Narrative and moral address', body: 'Surah Yusuf sustains a narrative, while other surahs move rapidly between reminder, argument, and ethical demand. The change in form is part of the experience.' },
      { title: 'Recitation and commentary', body: 'Listen alongside the Arabic text and a named translation. Tafsir can explain setting and interpretation; keep it distinct from the verses themselves.' },
    ],
    readingQuestion: 'What does a translation make legible, and what does recitation convey that the page cannot?',
  },
  'bhagavad-gita': {
    argument: 'On the threshold of battle, Arjuna cannot reconcile his obligation with the human cost of acting. Krishna’s response develops several paths—disciplined action, knowledge, and devotion—within the Mahabharata’s dramatic setting. The book is a dialogue under pressure, not a generic instruction to pursue ambition.',
    movements: [
      { title: 'Crisis before teaching', body: 'Chapter 1 gives Arjuna’s refusal moral weight. His questions about kinship, violence, and duty are the conditions under which the later teaching becomes intelligible.' },
      { title: 'Action and attachment', body: 'Chapters 2 and 3 distinguish acting from clinging to outcomes. Read the distinction within the text’s account of dharma, not as a promise of productivity.' },
      { title: 'Vision and devotion', body: 'Later chapters move through forms of knowing and devotion; the cosmic vision in chapter 11 radically changes the scale of the conversation.' },
    ],
    readingQuestion: 'Which problem does Krishna answer at this point, and how does a chosen translator handle dharma?',
  },
  upanishads: {
    argument: 'The Upanishads are many texts rather than one book by one author. Teachers, students, and sometimes rulers investigate self, mortality, ultimate reality, and what knowledge can change. Concepts such as atman and brahman recur, but their use and emphasis shift between texts and later schools of interpretation.',
    movements: [
      { title: 'A question about death', body: 'The Katha Upanishad frames its inquiry as a conversation between Naciketas and Death. Follow the narrative question before pulling out isolated metaphysical claims.' },
      { title: 'Dialogues of identity', body: 'The Chandogya and Brihadaranyaka Upanishads use teaching scenes, repetition, and difficult formulations to ask what the self is and how it relates to reality.' },
      { title: 'A plurality of readings', body: 'Compare a passage across named translations and commentaries. A later Vedanta interpretation is valuable, but it is an interpretation with a lineage.' },
    ],
    readingQuestion: 'Who asks the question in this dialogue, and what answer does this particular text actually give?',
  },
  dhammapada: {
    argument: 'The Dhammapada gathers short verses attributed to the Buddha within the Pali canon. Its chapters return to conduct, attention, anger, suffering, and the discipline of a path. A verse can be striking in isolation; its neighbours and translation choices are essential to reading it responsibly.',
    movements: [
      { title: 'Paired openings', body: 'The opening chapter sets contrasting patterns of mind and action beside one another. Read the pairs together instead of posting half a contrast as a standalone maxim.' },
      { title: 'Training attention', body: 'Chapters on the mind and heedfulness treat attention as something practiced in conduct, not merely a private feeling of calm.' },
      { title: 'The path in context', body: 'Later verses address the practitioner and the liberated person. Read them alongside Buddhist accounts of suffering and the path rather than importing a modern self-help definition of success.' },
    ],
    readingQuestion: 'What ethical action is this verse attached to in its chapter?',
  },
  'heart-sutra': {
    argument: 'This compact Mahayana scripture turns on the relation between form and emptiness. It does not announce that things are worthless or unreal. In the Perfection of Wisdom setting, emptiness unsettles the idea that phenomena possess an isolated, fixed essence.',
    movements: [
      { title: 'A teaching scene', body: 'Avalokiteshvara speaks to Shariputra. The dialogue and its ritual setting matter before any one memorable phrase is lifted out.' },
      { title: 'The repeated negations', body: 'The text moves through senses, aggregates, and teachings in a deliberately disruptive sequence. Read this as a challenge to reification, not a denial that pain or care exists.' },
      { title: 'Translation and practice', body: 'Compare a named translation with its commentary and, where possible, recitation. A few English words cannot settle a long philosophical debate.' },
    ],
    readingQuestion: 'Which assumption about a separate, permanent thing is the passage examining?',
  },
  'guru-granth-sahib': {
    argument: 'The Guru Granth Sahib is the Sikh scripture revered as the living Guru. Its devotional compositions are organized through musical modes and belong to a communal practice of singing and listening. Approaching it as a set of detachable spiritual slogans loses both its musical form and its place in Sikh life.',
    movements: [
      { title: 'Begin with Japji Sahib', body: 'The opening composition attributed to Guru Nanak sets questions of truth, human conduct, and the divine in motion. Read the whole sequence with a named translation.' },
      { title: 'Attend to raag', body: 'The organization by musical mode is a reading cue. Listening in a Sikh context can reveal a quality that a plain text extract cannot provide.' },
      { title: 'Many devotional voices', body: 'The collection includes compositions from Sikh Gurus and other poets. Identify the attributed voice and location rather than flattening them into a single anonymous author.' },
    ],
    readingQuestion: 'How does the verse change when it is heard in its musical and communal setting?',
  },
  'yoga-sutras': {
    argument: 'The Yoga Sutras are a terse classical text on mind, practice, and liberation, traditionally attributed to Patanjali. Their brevity makes commentary unusually consequential. A modern focus on posture alone leaves much of the text—ethics, concentration, discernment, and release—outside the frame.',
    movements: [
      { title: 'Define the project', body: 'The opening sutras name yoga and the movements of mind. Read the surrounding commentary before deciding what a short Sanskrit term means in English.' },
      { title: 'Practice and obstacles', body: 'The first two books develop sustained practice, hindrances, and the eight limbs. Ethics and attention are part of the structure, not optional accessories.' },
      { title: 'Powers and liberation', body: 'The later books address extraordinary capacities and the goal of freedom. Their claims belong to the historical text; they should not be presented as demonstrated health outcomes.' },
    ],
    readingQuestion: 'Where does this sutra sit in the larger argument, and whose commentary am I using?',
  },
  zhuangzi: {
    argument: 'Zhuangzi uses anecdotes, satire, impossible conversations, and changing vantage points to disturb confidence in rigid judgments. The collection has a layered textual history. Its stories resist being boiled down to one “be yourself” slogan, even when they make freedom feel unexpectedly near.',
    movements: [
      { title: 'Scale and perspective', body: 'The opening chapter shifts between the huge and the small. Notice whose measure of usefulness or freedom is being treated as final.' },
      { title: 'Making distinctions', body: 'The chapter commonly called “Discussion on Making All Things Equal” asks what happens when a viewpoint mistakes itself for the whole.' },
      { title: 'Skill stories', body: 'Cook Ding and other artisans model attunement through practice. Read the whole scene before turning it into a method or management lesson.' },
    ],
    readingQuestion: 'Which certainty does this particular story make harder to maintain?',
  },
  'vijnana-bhairava-tantra': {
    argument: 'A Shaiva Tantric dialogue between Bhairava and Bhairavi presents a large sequence of contemplative approaches. The practices belong to a specific religious and textual context. Recasting the work as a timeless collection of “hacks” loses the dialogue, the deity language, and differences between methods.',
    movements: [
      { title: 'The opening question', body: 'Begin with Bhairavi’s question about the nature of ultimate reality. It explains why techniques appear in the answer at all.' },
      { title: 'Many entrances', body: 'The methods work through breath, senses, affect, and awareness. The text offers variations rather than one universal routine; wording differs by translation.' },
      { title: 'Context before application', body: 'Use a scholar or practitioner’s named commentary to understand the setting. Keep claims of personal experience distinct from historical description.' },
    ],
    readingQuestion: 'What is this practice trying to disclose within its tradition?',
  },
  analects: {
    argument: 'The Analects gathers sayings and conversations associated with Confucius, compiled across generations. It explores learning, ritual, character, family relations, and political responsibility through brief exchanges rather than a systematic treatise. A line that sounds simple often turns on a contested word or a specific social scene.',
    movements: [
      { title: 'Learning as formation', body: 'The opening books pair study with practice, friendship, and reflection. Ask how a person becomes trustworthy through repeated conduct.' },
      { title: 'Ritual and humaneness', body: 'Ren and li are difficult to flatten into single English equivalents. Track how their relation changes across conversations.' },
      { title: 'Government by example', body: 'Later exchanges link leadership to character. Read advice about rulers beside its historical setting before repackaging it as a management tip.' },
    ],
    readingQuestion: 'Who is being addressed, and how does the chosen translator render the key term?',
  },
  'tattvartha-sutra': {
    argument: 'The Tattvartha Sutra systematizes major Jain accounts of reality, the soul, karma, and liberation. Its concise propositions invite commentary. It is a strong entry to Jain philosophy when read with the tradition’s careful distinctions and commitment to nonviolence in view.',
    movements: [
      { title: 'The opening framework', body: 'The early chapters set out the categories and conditions for liberation. Follow the sequence instead of treating a definition as self-explanatory.' },
      { title: 'Living beings and karma', body: 'The discussion of souls, matter, and karmic processes forms a specific metaphysical system. Do not silently substitute another tradition’s idea of self.' },
      { title: 'Conduct and release', body: 'Later material connects knowledge and restraint to practice. Read ethical implications with Jain commentary, especially where an English paraphrase sounds familiar.' },
    ],
    readingQuestion: 'Which distinction does the sutra need in order for its account of nonviolence to hold?',
  },
  avesta: {
    argument: '“The Avesta” names a corpus rather than a single modern book. The Gathas and other liturgical material have different forms and histories. Reading selected texts with clear identification of the section and translation gives a more honest entrance than treating every passage as a single author’s prose.',
    movements: [
      { title: 'Start with the Gathas', body: 'The hymns traditionally associated with Zarathustra are difficult poetry. Their linguistic distance calls for notes and caution about neat English summaries.' },
      { title: 'Move through the Yasna', body: 'The ritual setting matters to the form of the words. Identify the section being read and what role it plays in worship.' },
      { title: 'Compare witnesses', body: 'Translation and manuscript history can shape what is available to a modern reader. Use the linked text and research resource as different kinds of evidence.' },
    ],
    readingQuestion: 'Which text and translation am I actually looking at within this larger corpus?',
  },
  'kitab-i-aqdas': {
    argument: 'Bahá’u’lláh’s Kitáb-i-Aqdas is a central book of laws in the Bahá’í Faith. Its instructions are read with official explanatory notes, supplementary texts, and a living community’s interpretation. A casual list of isolated rules misses the book’s devotional and institutional setting.',
    movements: [
      { title: 'Read the introduction', body: 'The authorized edition explains how the text, its notes, and later questions relate. That frame prevents a single translated sentence from carrying more than it should.' },
      { title: 'Law and spiritual purpose', body: 'Follow how obligations are situated in a religious account of worship and social life, rather than treating the work as a secular legal code.' },
      { title: 'Use the apparatus', body: 'The Questions and Answers and notes explain conditions and terminology. Keep their voices distinct from the main text when citing them.' },
    ],
    readingQuestion: 'What does the authorized edition clarify about the scope of this instruction?',
  },
};
