import ChallengeExperience from './ChallengeExperience'
import ledger from '@/data/challenges/first-100-weekend.json'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The First €100 Weekend — A Public Agentic Revenue Challenge',
  description:
    'One existing digital product. Three independent customers. €100 in verified customer revenue before Sunday night. Follow the live FrankX agentic revenue challenge.',
  path: '/challenge',
  keywords: [
    'first 100 euro challenge',
    'digital product challenge',
    'agentic creator os',
    'creator revenue challenge',
    'build in public'
  ]
})

export default function ChallengePage() {
  return <ChallengeExperience ledger={ledger} />
}
