import type { BookApplication, BookReview } from '@/app/books/types';

export const libraryApplications: Record<string, BookApplication> = {
  'living-untethered': {
    title: 'Release speed as an internal skill',
    body:
      'Use Living Untethered as a daily operating move: notice the contraction, stop narrating it, and reopen attention before the reaction hardens into identity. This keeps founder execution fast without handing the nervous system to every trigger.',
    practice: {
      title: 'Three-release reset',
      duration: '9 minutes',
      instruction:
        'Set a 3-minute timer three times today. When a contraction appears, locate it in the body, soften the breath, and repeat: “I can let this pass without obeying it.” Then return to the next high-leverage action.',
    },
    connections: [
      {
        label: 'OS',
        href: '/os',
        reason: 'Translate inner regulation into a repeatable operator protocol.',
        kind: 'practice',
      },
      {
        label: 'Soulbook',
        href: '/soulbook',
        reason: 'Pair release work with identity-level authorship.',
        kind: 'product',
      },
    ],
  },
  'the-untethered-soul': {
    title: 'Stop negotiating with every inner voice',
    body:
      'Apply Singer’s witness frame to execution cycles: thoughts are events, not commands. You keep strategy and standards while refusing compulsive inner commentary as your operating authority.',
    practice: {
      title: 'Witness checkpoint',
      duration: '7 minutes',
      instruction:
        'Before a meaningful block, write the loudest inner sentence. Prefix it with “A voice says…” and continue the block anyway. End by logging whether reality matched the voice prediction.',
    },
    connections: [
      {
        label: 'AI architecture',
        href: '/ai-architecture',
        reason: 'Design external systems with the same separation between signal and noise.',
        kind: 'article',
      },
      {
        label: 'Library approach',
        href: '/library/approach',
        reason: 'Ground personal interpretation in explicit reading method.',
        kind: 'practice',
      },
    ],
  },
  'the-surrender-experiment': {
    title: 'Trade control loops for service loops',
    body:
      'Use surrender as an execution protocol: serve what reality places in front of you when it aligns with values, then meet it fully without preference collapse. This increases throughput and decreases self-created drag.',
    practice: {
      title: 'One-day surrender run',
      duration: '24 hours',
      instruction:
        'For one day, choose one resisted but aligned responsibility and do it first. Replace “Why this?” with “How do I serve this well?” Capture what changed in speed, quality, and emotional load.',
    },
    connections: [
      {
        label: 'Agentic AI Center',
        href: '/agentic-ai-center',
        reason: 'Service-oriented execution maps cleanly to agent delegation patterns.',
        kind: 'product',
      },
      {
        label: 'Agents',
        href: '/agents',
        reason: 'Operationalize surrendered intent through delegated specialist loops.',
        kind: 'practice',
      },
    ],
  },
  'wisdom-untethered': {
    title: 'Codify release into team language',
    body:
      'Treat Wisdom Untethered as a synthesis layer: convert awareness principles into shared phrases teams can invoke mid-conflict. The gain is reduced emotional escalation during hard decisions.',
    practice: {
      title: 'Trigger-to-language drill',
      duration: '12 minutes',
      instruction:
        'Pick one repeated trigger, define the old reaction, and write a replacement line the team can use in real time. Rehearse it out loud twice before your next collaboration block.',
    },
    connections: [
      {
        label: 'Studio',
        href: '/studio',
        reason: 'Use language discipline while building and shipping publicly.',
        kind: 'product',
      },
      {
        label: 'OS',
        href: '/os',
        reason: 'Turn personal insights into reusable operating primitives.',
        kind: 'practice',
      },
    ],
  },
  'the-power-of-now': {
    title: 'Reclaim present-time execution bandwidth',
    body:
      'Apply Tolle operationally: most friction is time-projection. Pull attention into the current task boundary, then act from what is true now instead of rehearsed futures.',
    practice: {
      title: 'Now-only sprint',
      duration: '25 minutes',
      instruction:
        'During a single focus block, ban future-tense self-talk in your notes. If it appears, replace it with one present verb and execute that verb immediately.',
    },
    connections: [
      {
        label: 'Deep Work review',
        href: '/library/deep-work',
        reason: 'Pair present awareness with distraction-resistant focus mechanics.',
        kind: 'article',
      },
      {
        label: 'Manifestation',
        href: '/manifestation',
        reason: 'Build desire without psychological futurism.',
        kind: 'practice',
      },
    ],
  },
  'a-new-earth': {
    title: 'Detect ego patterns before they design your day',
    body:
      'Use A New Earth as a diagnostic system: identify roles and grievances trying to run execution, then return to clear function. This preserves clarity under social pressure and praise cycles.',
    practice: {
      title: 'Ego signal audit',
      duration: '10 minutes',
      instruction:
        'At day end, list three moments where image-management replaced service. For each, write the cleaner action you will take next time and schedule one immediate corrective step.',
    },
    connections: [
      {
        label: 'AI Ops Architecture',
        href: '/ai-ops/architecture',
        reason: 'Governance structures reduce ego-driven process drift.',
        kind: 'practice',
      },
      {
        label: 'The Wordless Laws',
        href: '/books/the-wordless-laws',
        reason: 'See identity consequences through narrative embodiment.',
        kind: 'article',
      },
    ],
  },
  'when-things-fall-apart': {
    title: 'Stay workable in uncertainty windows',
    body:
      'Use Chödrön’s instruction as resilience architecture: soften instead of armoring when plans fracture. This keeps intelligence online during volatility instead of defaulting to defensive control.',
    practice: {
      title: 'Lean-in interval',
      duration: '11 minutes',
      instruction:
        'When disruption lands, sit for 11 minutes without fixing it. Label sensation, story, and impulse separately, then choose one compassionate and concrete next action.',
    },
    connections: [
      {
        label: 'Soulbook',
        href: '/soulbook',
        reason: 'Integrate emotional exposure with identity maturation.',
        kind: 'product',
      },
      {
        label: 'Library approach',
        href: '/library/approach',
        reason: 'Keep interpretation accountable when applying contemplative texts.',
        kind: 'practice',
      },
    ],
  },
  'the-miracle-of-mindfulness': {
    title: 'Train continuity of attention in ordinary work',
    body:
      'Apply Nhat Hanh beyond formal meditation: the practice is continuity, not intensity. Ordinary transitions become awareness reps that stabilize decision quality across the day.',
    practice: {
      title: 'Mindful transitions protocol',
      duration: '8 minutes',
      instruction:
        'Use four transitions today (doorway, inbox, call start, meal). Pause for one breath cycle, name the next intention, and proceed without opening a second task stream.',
    },
    connections: [
      {
        label: 'Deep Work review',
        href: '/library/deep-work',
        reason: 'Attention continuity compounds into cognitively demanding output.',
        kind: 'article',
      },
      {
        label: 'Studio',
        href: '/studio',
        reason: 'Apply transition discipline during creative production loops.',
        kind: 'product',
      },
    ],
  },
  'be-here-now': {
    title: 'Convert spiritual insight into daily ritual',
    body:
      'Use Be Here Now as a reminder that insight without integration decays. Build simple embodied rituals that keep consciousness work connected to execution and relationships.',
    practice: {
      title: 'Morning-grounding sequence',
      duration: '15 minutes',
      instruction:
        'Before screens: breathe for 3 minutes, write one service intention, move the body for 7 minutes, then begin your first priority without media input.',
    },
    connections: [
      {
        label: 'OS',
        href: '/os',
        reason: 'Install ritual as part of the operating system, not as inspiration.',
        kind: 'practice',
      },
      {
        label: 'Soulbook',
        href: '/soulbook',
        reason: 'Bridge experiential states with identity practice.',
        kind: 'product',
      },
    ],
  },
  'autobiography-of-a-yogi': {
    title: 'Treat devotion as long-range training energy',
    body:
      'Read Yogananda as discipline architecture: devotion is not escapism when it fuels stable practice, ethical conduct, and service. The application is sustained alignment over novelty-seeking.',
    practice: {
      title: 'Lineage-informed discipline block',
      duration: '20 minutes',
      instruction:
        'Pick one inherited practice (breath, prayer, contemplation). Run it for 20 minutes before strategic work and log whether focus and conduct improved downstream.',
    },
    connections: [
      {
        label: 'Bhagavad Gita guide',
        href: '/library/bhagavad-gita',
        reason: 'Pair memoir devotion with primary-text duty and yoga ethics.',
        kind: 'article',
      },
      {
        label: 'Agentic AI Center',
        href: '/agentic-ai-center',
        reason: 'Translate long-horizon discipline into modern builder systems.',
        kind: 'product',
      },
    ],
  },
  'bhagavad-gita': {
    title: 'Practice action without inner bargaining',
    body:
      'Apply the Gita as a duty protocol: choose right action, release claim on outcome, and sustain devotion through uncertainty. This sharpens courage while reducing performance anxiety.',
    practice: {
      title: 'Nishkama action cycle',
      duration: '18 minutes',
      instruction:
        'Name one difficult duty, define the dharmic action, and execute one concrete step while repeating: “I govern effort, not result.” Close by journaling what attachment was released.',
    },
    connections: [
      {
        label: 'AI architecture',
        href: '/ai-architecture',
        reason: 'Engineer systems around controllable inputs and explicit obligations.',
        kind: 'practice',
      },
      {
        label: 'The Wordless Laws',
        href: '/books/the-wordless-laws',
        reason: 'See outcome-detached action enacted in narrative form.',
        kind: 'article',
      },
    ],
  },
  'yoga-sutras': {
    title: 'Install a mind-training protocol, not a mood chase',
    body:
      'Use Patanjali operationally: yoga is the stabilization of mind fluctuations. Build small but strict observance loops that reduce reactivity and improve cognitive steadiness.',
    practice: {
      title: 'Eight-limb micro-cycle',
      duration: '16 minutes',
      instruction:
        'Choose one yama/niyama for the day, sit for 8 minutes of breath-led attention, and finish with 3 minutes of reflection on where citta-vritti pulled attention off course.',
    },
    connections: [
      {
        label: 'Library approach',
        href: '/library/approach',
        reason: 'Keep classical interpretation disciplined and source-aware.',
        kind: 'practice',
      },
      {
        label: 'OS',
        href: '/os',
        reason: 'Translate contemplative training into daily operating constraints.',
        kind: 'product',
      },
    ],
  },
  dhammapada: {
    title: 'Use thought-quality as your leading indicator',
    body:
      'Apply the Dhammapada as behavioral causality: mind precedes speech and action. Train thought hygiene first, then evaluate outcomes as downstream evidence.',
    practice: {
      title: 'Right-speech checkpoint',
      duration: '6 minutes',
      instruction:
        'Before one important conversation, pause for six minutes. Identify intention, remove one harmful phrase, and speak only what is true, useful, and timely.',
    },
    connections: [
      {
        label: 'Meditations review',
        href: '/library/meditations',
        reason: 'Compare Buddhist and Stoic approaches to mental governance.',
        kind: 'article',
      },
      {
        label: 'Soulbook',
        href: '/soulbook',
        reason: 'Map ethical attention to identity practice.',
        kind: 'product',
      },
    ],
  },
  meditations: {
    title: 'Convert pressure into character reps',
    body:
      'Use Marcus as an operator’s notebook: separate what is controllable, meet duty, and strip complaint. The gain is composure under load with no drop in standards.',
    practice: {
      title: 'Stoic pre-brief',
      duration: '10 minutes',
      instruction:
        'Before a hard block, write three columns: controllable, uncontrollable, duty. Ignore column two for one work cycle and evaluate output quality afterward.',
    },
    connections: [
      {
        label: 'AI Ops Architecture',
        href: '/ai-ops/architecture',
        reason: 'Control-boundary thinking improves architecture and incident response.',
        kind: 'practice',
      },
      {
        label: 'Agents',
        href: '/agents',
        reason: 'Assign tasks by locus of control and capability fit.',
        kind: 'product',
      },
    ],
  },
  'atomic-habits': {
    title: 'Engineer behavior through systems, not motivation',
    body:
      'Apply Clear’s model as product design for self: identity, environment, and repetition beat willpower. Build friction gradients so preferred behavior is the path of least resistance.',
    practice: {
      title: 'Habit stack deployment',
      duration: '14 days',
      instruction:
        'Select one keystone behavior, tie it to an existing trigger, and reduce start friction to under two minutes. Track completion daily for 14 days and adjust environment before effort.',
    },
    connections: [
      {
        label: 'Deep Work review',
        href: '/library/deep-work',
        reason: 'Use habit mechanics to make focus automatic.',
        kind: 'article',
      },
      {
        label: 'OS',
        href: '/os',
        reason: 'Encode repeated behavior as operating standards.',
        kind: 'practice',
      },
    ],
  },
  'deep-work': {
    title: 'Protect cognitive depth as a strategic asset',
    body:
      'Treat deep work as portfolio economics: uninterrupted concentration creates outsized value in knowledge environments. Schedule depth first; route shallow work around it.',
    practice: {
      title: 'Depth block protocol',
      duration: '90 minutes',
      instruction:
        'Run one 90-minute distraction-free block daily for five days. Define one measurable output before starting and score block quality (0–3) after completion.',
    },
    connections: [
      {
        label: 'AI architecture',
        href: '/ai-architecture',
        reason: 'High-quality architecture decisions require uninterrupted reasoning time.',
        kind: 'practice',
      },
      {
        label: 'Studio',
        href: '/studio',
        reason: 'Protect maker time in public creative workflows.',
        kind: 'product',
      },
    ],
  },
  'the-4-hour-workweek': {
    title: 'Design freedom with constraints, not fantasy',
    body:
      'Apply Ferriss with modern rigor: eliminate low-value work, automate repeatable flows, and reclaim time for meaningful output. Lifestyle design becomes credible when measured by shipped value and recovered attention.',
    practice: {
      title: 'DEAL sprint',
      duration: '7 days',
      instruction:
        'For one week, log every task, remove the bottom 20% by value, automate one recurring process, and reclaim two protected hours for high-leverage creation.',
    },
    connections: [
      {
        label: 'Agentic AI Center',
        href: '/agentic-ai-center',
        reason: 'Use agents for ethical automation of repeatable work.',
        kind: 'product',
      },
      {
        label: 'AI Ops Architecture',
        href: '/ai-ops/architecture',
        reason: 'Automation needs governed architecture, not ad hoc scripts.',
        kind: 'practice',
      },
    ],
  },
  'art-and-fear': {
    title: 'Ship volume to earn quality',
    body:
      'Use Bayles and Orland as creator realism: fear is baseline, not disqualification. Commit to output cadence where quantity becomes the workshop that produces excellence.',
    practice: {
      title: 'Quantity contract',
      duration: '30 days',
      instruction:
        'Set a daily shipping unit for 30 days (one page, one sketch, one prototype). Track completions only; review quality trends at day 30 without self-judgment during the run.',
    },
    connections: [
      {
        label: 'Studio',
        href: '/studio',
        reason: 'Translate fear theory into a real shipping cadence.',
        kind: 'product',
      },
      {
        label: 'The Wordless Laws',
        href: '/books/the-wordless-laws',
        reason: 'Observe creative law through narrative practice.',
        kind: 'article',
      },
    ],
  },
  'tao-te-ching': {
    title: 'Lead with non-forcing precision',
    body:
      'Apply the Tao Te Ching as strategic restraint: stop over-intervening where systems self-correct. You still act decisively, but from alignment instead of egoic force.',
    practice: {
      title: 'Wu-wei decision check',
      duration: '13 minutes',
      instruction:
        'Before one major decision, list the forced move and the aligned move. Choose the smallest intervention that preserves direction and reduces downstream friction.',
    },
    connections: [
      {
        label: 'Zhuangzi guide',
        href: '/library/zhuangzi',
        reason: 'Expand concise principles through Daoist narrative paradox.',
        kind: 'article',
      },
      {
        label: 'OS',
        href: '/os',
        reason: 'Encode strategic restraint into operating decisions.',
        kind: 'practice',
      },
    ],
  },
  'fabric-of-reality': {
    title: 'Upgrade explanations, upgrade outcomes',
    body:
      'Use Deutsch’s frame operationally: bad explanations create bad strategy. Seek better explanatory depth across physics, epistemology, and computation before scaling a claim.',
    practice: {
      title: 'Explanation stress test',
      duration: '40 minutes',
      instruction:
        'Choose one operating belief and write the causal chain behind it. Identify one weak explanatory link, research a stronger model, and update the decision architecture accordingly.',
    },
    connections: [
      {
        label: 'AI architecture',
        href: '/ai-architecture',
        reason: 'Architecture quality follows explanatory rigor.',
        kind: 'practice',
      },
      {
        label: 'Agentic AI Center',
        href: '/agentic-ai-center',
        reason: 'Agent systems require explicit models, not slogans.',
        kind: 'product',
      },
    ],
  },
  'tribe-of-mentors': {
    title: 'Build a practical advisory operating stack',
    body:
      'Apply Ferriss as pattern extraction: convert diverse mentor answers into decision heuristics you actually run weekly. Wisdom compounds only when installed in execution rhythm.',
    practice: {
      title: 'Mentor synthesis ritual',
      duration: '30 minutes weekly',
      instruction:
        'Each week, extract one principle from three mentors, convert each into one executable rule, and run one rule for seven days before keeping or discarding it.',
    },
    connections: [
      {
        label: 'Library approach',
        href: '/library/approach',
        reason: 'Move from consumption to structured synthesis.',
        kind: 'practice',
      },
      {
        label: 'OS',
        href: '/os',
        reason: 'Codify extracted principles into the founder operating system.',
        kind: 'product',
      },
    ],
  },
  'e-squared': {
    title: 'Treat manifestation as testable attention training',
    body:
      'Use Grout’s experiments as disciplined hypothesis loops: define the signal, set the window, and log outcomes. The value is less magical certainty and more direct evidence about attention and expectancy.',
    practice: {
      title: '48-hour evidence experiment',
      duration: '48 hours',
      instruction:
        'Define one precise sign, timeframe, and logging rule. Suspend debate, run the test, and record every result before interpretation. End with one grounded learning, not a grand conclusion.',
    },
    connections: [
      {
        label: 'Manifestation',
        href: '/manifestation',
        reason: 'Anchor experiments in a broader operating framework.',
        kind: 'practice',
      },
      {
        label: 'The Secret review',
        href: '/library/the-secret',
        reason: 'Compare experiment-first and doctrine-first manifestation styles.',
        kind: 'article',
      },
    ],
  },
  'the-secret': {
    title: 'Separate aspiration from magical thinking',
    body:
      'Use The Secret as a discernment exercise: keep intentional focus and gratitude, discard certainty claims unsupported by evidence. The practical win is coherent desire aligned with disciplined action.',
    practice: {
      title: 'Intention-plus-action card',
      duration: '12 minutes',
      instruction:
        'Write one intention, three concrete actions, and one gratitude statement. Execute the first action within 12 minutes so focus immediately converts into behavior.',
    },
    connections: [
      {
        label: 'Manifestation',
        href: '/manifestation',
        reason: 'Ground intention work in reality-tested practice.',
        kind: 'practice',
      },
      {
        label: 'The Wordless Laws',
        href: '/books/the-wordless-laws',
        reason: 'Explore similar themes through narrative and consequence.',
        kind: 'article',
      },
    ],
  },
  zhuangzi: {
    title: 'Use perspective shifts to loosen rigid identity',
    body:
      'Apply Zhuangzi as cognitive flexibility training: certainty often narrows possibility. Practice holding multiple frames before choosing action.',
    practice: {
      title: 'Two-viewpoint drill',
      duration: '14 minutes',
      instruction:
        'Take one conflict and write two radically different interpretations that could both be partially true. Choose one action that remains wise under either frame.',
    },
    connections: [
      {
        label: 'Tao Te Ching guide',
        href: '/library/tao-te-ching',
        reason: 'Pair aphoristic principle with story-based Daoist reasoning.',
        kind: 'article',
      },
      {
        label: 'Agents',
        href: '/agents',
        reason: 'Flexible framing improves multi-agent orchestration decisions.',
        kind: 'practice',
      },
    ],
  },
  analects: {
    title: 'Operationalize virtue through role clarity',
    body:
      'Use Confucius as social architecture: character is formed through repeated conduct in real relationships. Excellence is role fidelity expressed with humanity and restraint.',
    practice: {
      title: 'Role-duty rehearsal',
      duration: '15 minutes',
      instruction:
        'Pick one role you hold (founder, parent, partner, teammate). Define one duty that role requires today, one excess to avoid, and execute the duty before noon.',
    },
    connections: [
      {
        label: 'Meditations review',
        href: '/library/meditations',
        reason: 'Compare inner Stoic discipline with relational Confucian ethics.',
        kind: 'article',
      },
      {
        label: 'OS',
        href: '/os',
        reason: 'Convert role ethics into explicit operating standards.',
        kind: 'practice',
      },
    ],
  },
};

export function attachLibraryApplications(reviews: BookReview[]): BookReview[] {
  return reviews.map((review) => {
    if (review.application) return review;
    const application = libraryApplications[review.slug];
    return application ? { ...review, application } : review;
  });
}

export function listApplicationSlugs(): string[] {
  return Object.keys(libraryApplications).sort();
}
