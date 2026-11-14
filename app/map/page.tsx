import { createMetadata } from '@/lib/seo'
import { getMapSnapshot } from '@/lib/ecosystem/snapshot'
import LivingMap from './LivingMap'
export const metadata = createMetadata({
  title: 'Ecosystem map | FrankX',
  description: 'Explore FrankX, Starlight and Arcanea. Preview the work, install the skill packs and follow dated public repository activity.',
  path: '/map',
})
// ISR on the existing Vercel deployment. No cron, token or new infrastructure.
export const revalidate = 3600
export default async function MapPage() {
  return <LivingMap snapshot={await getMapSnapshot()} renderedAt={Date.now()} />
}
