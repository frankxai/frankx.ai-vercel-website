export const samplePath = '/partnerships/universities/source-check'
export const claim = '75% of attendees want us to run the lab again.'
export const evidence = [
  { id: 'REG', file: 'registrations.csv', value: 24, label: 'registered', note: 'Distinct names on the registration list.' },
  { id: 'ATT', file: 'check-in.csv', value: 18, label: 'attended', note: 'Registered participants who checked in.' },
  { id: 'EXIT', file: 'exit-slips.csv', value: 12, label: 'returned a slip', note: '9 answered yes and 3 answered no to “Run it again?” One slip per participant.' },
] as const

export const decisions = [
  { id: 'publish', label: 'Publish as written' },
  { id: 'revise', label: 'Revise the claim' },
  { id: 'request', label: 'Request the source' },
] as const
export type Decision = (typeof decisions)[number]['id']

type Round = {
  title: string; instruction: string; sources: ReadonlyArray<(typeof evidence)[number]['id']>
  expected: Decision; citations: ReadonlyArray<(typeof evidence)[number]['id']>; finding: string; reason: string
}
export const rounds: readonly [Round, Round] = [
  { title: 'All three records are available.', instruction: 'Compare the population named in the memo with the population that answered the question.',
    sources: ['REG', 'ATT', 'EXIT'], expected: 'revise', citations: ['EXIT'], finding: '9 of 12 respondents asked for another lab.',
    reason: 'Six attendees left no slip. Their preferences are unknown. A second 75% appears in the register: 18 of 24 registrants attended. That answers a different question.' },
  { title: 'The exit slips are unavailable.', instruction: 'The memo is unchanged. Judge it again using only the records available in this run.',
    sources: ['REG', 'ATT'], expected: 'request', citations: ['REG', 'ATT'], finding: '18 of 24 registrants attended. Demand for another lab is unknown.',
    reason: 'Registration and check-in can establish attendance. To publish a claim about demand, recover the exit slips or collect new responses and identify them as new evidence.' },
]

export function teachingKit() {
  return [
    '# Would you sign this AI-written memo?', 'A six-minute teaching case by Frank Riemer · FrankX',
    'You may copy and adapt this case for your class. All records are fictional. No accounts or software required.',
    '## Give the class this memo', '“' + claim + '”', '## Source packet',
    ...evidence.map(record => '- ' + record.id + ' · ' + record.file + ' · ' + record.value + ' ' + record.label + '. ' + record.note),
    '## Run the room', '0–2 min · Show the memo and all three records. Ask each person to publish, revise or request the source. Ask for the numerator and denominator.',
    '2–4 min · Remove EXIT. Read the identical memo aloud. Ask what can still be signed from the two remaining records.',
    '4–6 min · In pairs, write one defensible sentence for each run. Exchange answers and ask a partner to reproduce both judgments.',
    '## Facilitator key', ...rounds.map((round, index) => 'Run ' + (index + 1) + ' · ' + round.expected.toUpperCase() + '. ' + round.finding + ' ' + round.reason),
    '## Mark the reasoning (one point each)', '- Names the population and denominator for 9/12.', '- Distinguishes six missing responses from six negative responses.', '- Withholds the demand claim when EXIT is removed.', '- Preserves the independently supported attendance finding using REG and ATT.',
    '## Transfer to an AI system', 'Keep the prompt and memo fixed. Change only the available source IDs. Log the claim, source IDs, reviewer action and accepted wording. A model that repeats its first answer after EXIT disappears fails the second case.',
    'Classroom link: https://www.frankx.ai' + samplePath, 'University programmes: https://www.frankx.ai/partnerships/universities',
  ].join('\n\n') + '\n'
}
