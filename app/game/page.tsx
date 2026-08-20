import { createMetadata } from '@/lib/seo'
import GameClient from './GameClient'

export const metadata = createMetadata({
  title: 'Quest OS | FrankX',
  description:
    'Turn important work into quests, boss fights, raids, streaks, and skill progression. A game layer for deliberate execution.',
  path: '/game',
})

export default function GamePage() {
  return <GameClient />
}
