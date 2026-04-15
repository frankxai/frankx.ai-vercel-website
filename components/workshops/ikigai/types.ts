export interface IkigaiState {
  love: string
  good: string
  pays: string
  needs: string
  statement: string
}

export const emptyIkigai: IkigaiState = {
  love: '',
  good: '',
  pays: '',
  needs: '',
  statement: '',
}

export const IKIGAI_STORAGE_KEY = 'frankx.ikigai-branding.v1'

export interface IkigaiStep {
  key: keyof Omit<IkigaiState, 'statement'>
  label: string
  question: string
  hint: string
  examples: string[]
  coachSeed: string
}

export const ikigaiSteps: IkigaiStep[] = [
  {
    key: 'love',
    label: 'What I love',
    question: 'What activities make time disappear for you?',
    hint: 'Evidence beats guessing. Name specific moments from the last 12 months.',
    examples: [
      'Explaining a complex idea to someone until they get it',
      'Rearranging messy information into a clean system',
      'Making something visual that surprises the person watching',
    ],
    coachSeed:
      'Help me find what I genuinely love. Ask me about the last 12 months — what activities did I lose track of time in? Push me past generic answers.',
  },
  {
    key: 'good',
    label: "What I'm good at",
    question: 'What do other people keep thanking you for or recommending you for?',
    hint: 'External evidence only. Not "I think I am good at." Other people\'s words.',
    examples: [
      '"You explain finance without being condescending"',
      '"You can look at a messy spreadsheet and see the story"',
      '"Your demos always land"',
    ],
    coachSeed:
      'Help me identify what I am genuinely good at. I want external evidence — what have other people thanked me for or recommended me for? Ask specific, probing questions.',
  },
  {
    key: 'needs',
    label: 'What the world needs',
    question: 'Whose problem do you care about enough to work on for ten years?',
    hint: 'The narrower the "who," the stronger the answer. Avoid "everyone."',
    examples: [
      'Early-career analysts drowning in spreadsheets they did not design',
      'Solo creators burning out trying to be everywhere at once',
      'Parents who want their kids to understand AI without fear',
    ],
    coachSeed:
      'Help me identify whose problem I care about most. I want to narrow from "people" to a specific audience I would work with for a decade. Ask me hard questions about who I actually want to help.',
  },
  {
    key: 'pays',
    label: 'What pays',
    question: 'What are people already paying money to solve in this space?',
    hint: 'Look at real invoices, courses, tools, agencies. Follow the money, not the hype.',
    examples: [
      'Courses and coaching on AI adoption for knowledge workers',
      'Agencies building internal tools for mid-sized companies',
      'Templates and SaaS for solo creators running 1-person businesses',
    ],
    coachSeed:
      'Help me find where money is actually flowing in the space I care about. Ask me to list real courses, agencies, SaaS tools, and consulting work people are paying for right now.',
  },
]
