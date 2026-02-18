import type { Metadata } from 'next'
import PeopleGroupPage from '@/components/research/PeopleGroupPage'
import { getPeopleForGroup, getPeopleGroup, type PeopleGroupKey } from '@/lib/research/people-groups'

const groupKey = 'designers' as PeopleGroupKey
const group = getPeopleGroup(groupKey)
const count = getPeopleForGroup(groupKey).length

export const metadata: Metadata = {
  title: `${group.title} | FrankX Research`,
  description: `Curated designers index from FrankX Research with ${count} profiles, top-quality signals, and direct references.`,
  alternates: {
    canonical: `https://www.frankx.ai/research/designers`,
  },
  openGraph: {
    title: `${group.title} | FrankX Research`,
    description: `${count} curated profiles in the ${group.title.toLowerCase()} archetype.`,
    type: 'article',
    url: `https://www.frankx.ai/research/designers`,
  },
}

export default function Page() {
  return <PeopleGroupPage groupKey={groupKey} />
}
