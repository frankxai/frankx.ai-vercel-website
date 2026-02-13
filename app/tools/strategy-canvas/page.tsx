import { createMetadata } from '@/lib/seo'
import StrategyCanvasClient from './StrategyCanvasClient'

export const metadata = createMetadata({
  title: 'AI Strategy Canvas - Strategic Planning Tool | FrankX.AI',
  description: 'Plan your AI transformation with our comprehensive strategy canvas. Map stakeholders, resources, opportunities, and implementation roadmaps.',
  keywords: ['ai strategy canvas', 'ai planning tool', 'ai transformation framework', 'ai strategy template'],
  path: '/tools/strategy-canvas',
})

export default function StrategyCanvasPage() {
  return <StrategyCanvasClient />
}