import { createMetadata } from '@/lib/seo'
import OperatorScorecardClient from './OperatorScorecardClient'

export const metadata = createMetadata({
  title: 'Operator Scorecard — Grade Your Agent Stack',
  path: '/operator-scorecard',
  description:
    'Answer 11 questions across delegation, systemization, agent fluency, distribution, offer clarity, and runway. Get your operator level free, the one named ceiling holding you back, and a portable architecture brief you can download and paste into your own agent.',
  keywords: [
    'agent stack scorecard',
    'ai operator assessment',
    'agentic maturity benchmark',
    'ai agent readiness quiz',
    'frankx operator scorecard',
  ],
})

export default function OperatorScorecardPage() {
  return <OperatorScorecardClient />
}
