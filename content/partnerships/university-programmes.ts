// Indicative host fees. A booking is agreed in a written scope.
export const universityProgrammes = [
  {
    id: 'workshop', name: 'Applied AI architecture lab', format: 'Half-day workshop', fee: '€3,500',
    buyer: 'Department, entrepreneurship centre or industry sponsor', audience: 'Mixed student and practitioner teams',
    session: 'Take a founder’s messy brief from first prototype to a reviewable system. Teams choose the model, define the human approval point and test the workflow on a case they have never seen.',
    output: 'A runnable starter, a failure log and a handover another team can follow.',
    host: 'Supply a facilitator contact, a room or video link, and one rights-cleared brief.',
  },
  {
    id: 'lecture', name: 'Where human judgment belongs in AI', format: 'Guest lecture · 60 min', fee: '€1,250',
    buyer: 'Course director or executive education programme', audience: 'Undergraduates, graduate seminars and faculty',
    session: 'Compare two assistants answering the same question. The room decides what evidence to require, when the system should abstain and who owns the final decision.',
    output: 'An annotated architecture diagram, seminar prompts and a short assessment rubric.',
    host: 'Share the syllabus and one decision your students should be able to defend.',
  },
  {
    id: 'keynote', name: 'What changes when software can act?', format: 'Keynote + discussion · 45–60 min', fee: 'From €2,500',
    buyer: 'Conference producer, executive education lead or event sponsor', audience: 'Founders, researchers and business leaders',
    session: 'Trace a single decision from a chat window into a working organisation. A live or recorded case makes authority, cost and accountability visible to the audience.',
    output: 'A host briefing, a tailored talk and a take-home decision guide.',
    host: 'Share the audience mix, stage format, recording plans and the question the event should answer.',
  },
  {
    id: 'student', name: 'Research to working agent', format: 'Student lab · 90 min', fee: '€0 · selected local host',
    buyer: 'One local student session per month, subject to availability', audience: 'Up to 25 learners with a campus host',
    session: 'Turn a source into a small assistant. Run a baseline, exchange outputs with another team and explain one failure. A saved-response route lets everyone take part without a paid AI account.',
    output: 'A source-linked artifact and an evaluation another student can repeat.',
    host: 'Provide venue, recruitment and a supervisor. Frank contributes facilitation for the selected session.',
  },
  {
    id: 'cohort', name: 'Teach the lab on your campus', format: 'Three-lab cohort licence', fee: 'From €7,500',
    buyer: 'Continuing education director or multi-course programme', audience: 'Campus facilitators and their first cohort',
    session: 'A faculty facilitator rehearses three labs covering system design, implementation and evaluation, then leads a delivery with a shared rubric.',
    output: 'Versioned teaching materials, facilitator onboarding and an independent delivery rehearsal.',
    host: 'Agree cohort size, reuse rights, accessibility needs and the support window.',
  },
  {
    id: 'research', name: 'From paper to reproducible result', format: 'Research translation · two weeks', fee: 'From €6,000',
    buyer: 'Funded principal investigator or research partnership office', audience: 'A research group with one bounded question',
    session: 'Choose one claim and establish a reproducible baseline. Test one integration or variation, document environment and cost, then hand the experiment to a second reader.',
    output: 'A reproduction package, evaluation notes and a decision on further research.',
    host: 'Name a research lead and confirm data access, licence and a reviewer.',
  },
  {
    id: 'executive', name: 'AI adoption decision lab', format: 'Sponsor-funded executive lab', fee: 'From €6,500',
    buyer: 'Employer, industry association or executive education partner', audience: 'A leadership team and the people who do the work',
    session: 'Choose a recurring job. Compare current delivery with an assisted workflow, including incorrect outputs, review time, human sign-off and replacement-cost compute.',
    output: 'An architecture decision, a tested workflow and a written go, revise or stop recommendation.',
    host: 'Bring a process owner, synthetic examples and a sponsor who can act on the result.',
  },
] as const

export type UniversityProgramme = (typeof universityProgrammes)[number]

export const teachingTracks = [
  ['AI architecture', 'Where should an agent stop?', 'Draw the model, tools, permissions and human review points. Use the Starlight protocol to critique a real interface.', '/ai-architecture', 'Architecture field notes'],
  ['Frontier engineering', 'Can another team run your code?', 'Compare Codex, Claude Code or Google Antigravity on a small repository change. Review the diff, run the same checks and record repair time.', '/guides/ai-operating-systems-workshop', 'Engineering curriculum'],
  ['Founder workflows', 'What does one accepted job cost?', 'Use ChatGPT or Gemini to test a service brief. Track human edits, model calls, customer acceptance and the cost of rejected work.', '/agentic-builder-lab', 'Builder Lab'],
  ['Creative practice', 'Whose judgment shaped the work?', 'Use an original composition or storyboard to examine authorship and consent. Keep a decision log and defend the final edit in a listening critique.', '/workshops/ikigai-branding', 'Delivered workshop format'],
] as const

// Reference institutions for proposed briefs. No participation is implied.
export const campusIdeas = [
  ['Netherlands', 'UvA AI4Business', 'Pair a student team with a local business and test one adoption decision against a human baseline.', 'https://ai4business.uva.nl/'],
  ['United States', 'Stanford HAI', 'Reproduce a published result and bring the limitations to a human-centred AI seminar.', 'https://hai.stanford.edu/'],
  ['China', 'Tsinghua AIR', 'Compare two approaches to a mobility research question using a shared, locally runnable evaluation.', 'https://air.tsinghua.edu.cn/en/'],
  ['Mainland Spain', 'Universidad Politécnica de Madrid', 'Take a supervised engineering prototype through an independent handover and deployment review.', 'https://www.upm.es/'],
  ['Canary Islands', 'Universidad de La Laguna', 'Co-design an island water or energy information brief with a local practitioner and public data.', 'https://www.ull.es/'],
  ['Germany', 'Munich Center for Machine Learning', 'Run a reproducibility seminar with a fixed task set and a second team reviewing the evidence.', 'https://mcml.ai/'],
  ['United Kingdom', 'The Alan Turing Institute', 'Examine when a public-service assistant should defer to a person and how a reviewer could tell.', 'https://www.turing.ac.uk/'],
  ['Australia', 'UNSW.ai', 'Pair technical and creative disciplines to test a workflow against a common assessment rubric.', 'https://www.unsw.edu.au/unsw-ai'],
] as const
