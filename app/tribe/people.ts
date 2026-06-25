export type TribePerson = {
  slug: string
  name: string
  role: string
  privacy: string
  shortGift: string
  dedication: string
  unlocked: string[]
  offered: string[]
  vow: string
}

export const tribePeople: TribePerson[] = [
  {
    slug: 'tien',
    name: 'Tien',
    role: 'Love, home, tenderness, devotion',
    privacy: 'Intimate page. Share only with care.',
    shortGift:
      'You remind me that ambition means nothing when it is not held by care, presence, warmth, and devotion.',
    dedication:
      'You are one of the clearest proofs in my life that love can be gentle and strong at the same time. You give me home, patience, care, and the kind of daily devotion that does not need to announce itself to be real. Because of you, I am learning that the highest version of my work cannot be built from hunger. It has to be built from overflow.',
    unlocked: [
      'A deeper standard for presence instead of constant pursuit.',
      'A cleaner relationship between ambition, loyalty, tenderness, and truth.',
      'The reminder that the most advanced life still has to be lived kindly at home.',
    ],
    offered: [
      'A more grounded version of myself, not only a more successful one.',
      'A future where business, beauty, home, health, and love can reinforce each other.',
      'Systems that create freedom without sacrificing warmth.',
    ],
    vow:
      'I will not use ambition as an escape from love. I will build a life where the people closest to me feel more peace, beauty, and possibility because I existed.',
  },
  {
    slug: 'mother',
    name: 'My Mother',
    role: 'Life, care, emotional strength',
    privacy: 'Family page. Keep dignified and protected.',
    shortGift:
      'You shaped the part of me that still believes love can be practical, protective, and endlessly generous.',
    dedication:
      'You gave me more than life. You gave me the emotional proof that care is a force. The food, concern, protection, reminders, and sacrifice became part of my operating system long before I had words for it. Many of my ideas about helping people, building useful systems, and creating a better tomorrow carry your imprint.',
    unlocked: [
      'The instinct to protect and provide, not only to achieve.',
      'The capacity to feel deeply while still moving forward.',
      'A respect for family sacrifice as a foundation, not a side note.',
    ],
    offered: [
      'A son who turns your care into contribution.',
      'A family legacy that becomes stronger, more beautiful, and more sovereign.',
      'Work that carries warmth instead of cold ambition.',
    ],
    vow:
      'I will make the life you helped create worth the love, labor, and sacrifice that shaped it.',
  },
  {
    slug: 'brother',
    name: 'My Brother',
    role: 'Grounding, humor, Croatia, reality checks',
    privacy: 'Family page. Share only when it feels right.',
    shortGift:
      'You remind me that big visions need real rooms, real work, real laughter, and people who see through the performance.',
    dedication:
      'You have a way of cutting through the fantasy layer and bringing me back to concrete reality. That is a gift. The brother bond is not always polished, but it is real: humor, friction, memory, challenge, loyalty, and the strange comfort of being known before the brand, before the ambition, before the grand architecture.',
    unlocked: [
      'A stronger respect for practical execution over beautiful abstraction.',
      'The reminder that lifestyle dreams need real places, real people, and real logistics.',
      'A more honest balance between vision and grounded brotherhood.',
    ],
    offered: [
      'Creative hubs and future spaces that include family, not only business.',
      'A path where success can create more time, freedom, and shared experience.',
      'A version of ambition that still has room for laughter and truth.',
    ],
    vow:
      'I will build in a way that makes the vision real enough to be visited, used, lived in, and shared.',
  },
  {
    slug: 'family-line',
    name: 'Family Line',
    role: 'Roots, ancestry, sacrifice, endurance',
    privacy: 'Ancestral page. Keep sacred and restrained.',
    shortGift:
      'You gave me the first architecture: resilience, loyalty, memory, and the quiet force to keep becoming.',
    dedication:
      'My family line carries exile, labor, migration, endurance, and the will to survive. That history is not a decoration. It is a pressure field. It asks me to do something cleaner with the life I have been given: build freedom, beauty, intelligence, and dignity from inherited resilience.',
    unlocked: [
      'The seriousness to treat freedom as a responsibility.',
      'A deeper respect for roots, language, memory, and place.',
      'The instinct to build systems that outlive temporary moods.',
    ],
    offered: [
      'A public body of work that turns survival into sovereignty.',
      'A future family architecture with more beauty, optionality, and peace.',
      'A life that honors the past without remaining imprisoned by it.',
    ],
    vow:
      'I will not waste the freedom that earlier generations suffered to make possible.',
  },
  {
    slug: 'close-friends',
    name: 'Close Friends',
    role: 'Mirrors, movement, shared moments',
    privacy: 'Private circle. Add names only with consent.',
    shortGift:
      'You gave contrast, energy, honest reflection, and the proof that a life is not built alone.',
    dedication:
      'Friendship is one of the great reality checks. Friends show where the persona ends and the human begins. Some friendships gave adventure. Some gave challenge. Some gave disappointment that became clarity. Some gave joy without needing a thesis. All of it shaped the work.',
    unlocked: [
      'The courage to be seen outside polished professional identity.',
      'A better sense for social energy, status, belonging, and generosity.',
      'The knowledge that community has to be built, not passively waited for.',
    ],
    offered: [
      'More intentional gatherings, better conversations, and cleaner invitations.',
      'Creative systems that make collaboration easier and more alive.',
      'A higher standard of friendship: less auditing, more presence.',
    ],
    vow:
      'I will become the kind of friend whose presence gives people more clarity, courage, beauty, and momentum.',
  },
  {
    slug: 'oracle-ai-coe',
    name: 'Former Enterprise AI Architecture Chapter',
    role: 'Professional chapter, AI architecture, enterprise pressure',
    privacy: 'Former professional chapter. Keep public-safe, non-confidential, and independent from Oracle endorsement.',
    shortGift:
      'You sharpened the architect in me: enterprise pressure, cloud systems, AI strategy, and the discipline to translate intelligence into value.',
    dedication:
      'The enterprise AI chapter became a crucible. It forced intelligence to leave the abstract layer and meet architecture, politics, constraints, compute, cost, security, trust, and business value. It taught me that real intelligence has to survive the room.',
    unlocked: [
      'A stronger enterprise architecture backbone.',
      'The ability to translate AI possibility into business language and implementation reality.',
      'A network of brilliant people, hard lessons, and standards I will carry forward.',
    ],
    offered: [
      'Reusable AI architecture frameworks for builders and enterprises.',
      'A public knowledge base that turns field lessons into non-confidential education.',
      'Systems that help others move from AI fascination to operational capability.',
    ],
    vow:
      'I will carry the best of this chapter forward without leaking what should stay protected.',
  },
  {
    slug: 'ai-builders',
    name: 'AI Builders and Collaborators',
    role: 'Momentum, craft, prototypes, systems',
    privacy: 'Collaborator page. Add specific names only when appropriate.',
    shortGift:
      'You turned ideas into sharper questions, prototypes, pages, tools, songs, systems, and the next version of the work.',
    dedication:
      'Every serious builder changes the field around them. The collaborators, coders, designers, founders, researchers, and AI toolmakers around this journey made the work less theoretical. They made it executable. They proved that ideas become real when the right people touch them.',
    unlocked: [
      'A bias toward shipping instead of endless ideation.',
      'A practical respect for GitHub, Vercel, agents, design systems, and deployment reality.',
      'The understanding that intelligence compounds fastest in networks.',
    ],
    offered: [
      'Open systems, templates, agent architectures, and creator infrastructure.',
      'Clearer documentation so others can build faster from what I learn.',
      'A future collaboration layer where human and AI builders can coordinate cleanly.',
    ],
    vow:
      'I will make the systems more useful, more elegant, and more forkable because serious builders deserve leverage.',
  },
  {
    slug: 'creator-mentors',
    name: 'Creator Mentors',
    role: 'Standards, taste, courage, visibility',
    privacy: 'Appreciation page. Use public figures and creators respectfully.',
    shortGift:
      'You raised the ceiling of what I considered possible and made excellence feel like a responsibility.',
    dedication:
      'Some creators never met me and still changed me. Writers, strategists, musicians, founders, spiritual teachers, technologists, filmmakers, designers, and high-agency builders gave me patterns to study. They showed that a human can become a signal strong enough to reorganize other people’s futures.',
    unlocked: [
      'Higher taste in storytelling, brand, systems, music, and personal standards.',
      'The permission to merge business, technology, spirituality, health, and art without asking for consensus.',
      'A clearer sense that creation is not content. It is civilization-scale signaling.',
    ],
    offered: [
      'Curated appreciation essays and public notes on what their work unlocked.',
      'Derivative-free original systems inspired by their standards, not copied from their surface.',
      'A creator library that turns admiration into study, synthesis, and contribution.',
    ],
    vow:
      'I will not merely consume brilliance. I will metabolize it into original work that helps others rise.',
  },
  {
    slug: 'spiritual-teachers',
    name: 'Spiritual and Philosophical Teachers',
    role: 'Faith, consciousness, identity, inner law',
    privacy: 'Sacred page. Keep grounded, not performative.',
    shortGift:
      'You helped me see that reality is not only built through tools, but through attention, belief, gratitude, discipline, and love.',
    dedication:
      'The teachings that shaped me most point back to the same hard truth: inner state becomes perception, perception becomes decision, decision becomes action, and action becomes world. Faith without embodiment becomes fantasy. Strategy without soul becomes machinery. The work has to unify both.',
    unlocked: [
      'A deeper respect for gratitude as state calibration, not politeness.',
      'A more serious relationship with prayer, imagination, identity, and attention.',
      'The understanding that manifestation must become behavior, systems, and service.',
    ],
    offered: [
      'Manifestation Intelligence Systems that convert inner practice into embodied execution.',
      'Rituals, songs, prompts, and pages that help people return to clarity.',
      'A living bridge between consciousness work and practical architecture.',
    ],
    vow:
      'I will keep the sacred practical and the practical sacred.',
  },
  {
    slug: 'future-tribe',
    name: 'Future Tribe',
    role: 'Readers, students, founders, seekers, creators',
    privacy: 'Public-facing page. This is the bridge outward.',
    shortGift:
      'You are the reason the work cannot stay private. The systems, writings, songs, and tools are meant to become useful beyond me.',
    dedication:
      'Some people are not in my life yet, but the work is already being built for them. The future tribe includes creators, founders, students, builders, seekers, and operators who feel that intelligence should become freedom, beauty, contribution, and self-command.',
    unlocked: [
      'A reason to publish instead of hoard insight privately.',
      'A standard that every system must eventually help someone beyond me.',
      'The pressure to turn personal transformation into usable architecture.',
    ],
    offered: [
      'FrankX as a creator intelligence hub.',
      'Arcanea as a transformation universe and imagination engine.',
      'Starlight Intelligence Systems as a substrate for human and AI coordination.',
    ],
    vow:
      'I will build tools, worlds, and teachings that make other people more capable, sovereign, alive, and awake.',
  },
]

export const tributeArtifacts = [
  {
    title: 'Poetry',
    body: 'Words became bridges: between gratitude and ambition, between shadow and light, between the life I had and the life I am building.',
  },
  {
    title: 'Insights',
    body: 'Each relationship became signal: where I was grasping, where I was growing, where I needed more truth, structure, courage, and love.',
  },
  {
    title: 'Articles',
    body: 'The conversations, pressure, and lived experiences became public thinking: essays, frameworks, notes, and maps for other builders.',
  },
  {
    title: 'Sites',
    body: 'FrankX, Starlight, Arcanea, and the wider creator stack are not solo monuments. They are crystallized from many encounters, mirrors, and gifts.',
  },
  {
    title: 'Systems',
    body: 'The real tribute is operational: cleaner pages, stronger rituals, better knowledge architecture, more useful tools, and work that compounds.',
  },
]

export function getTribePerson(slug: string) {
  return tribePeople.find((person) => person.slug === slug)
}
