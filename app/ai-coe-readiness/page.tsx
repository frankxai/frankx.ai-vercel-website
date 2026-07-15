import { createMetadata } from '@/lib/seo'
import AiCoeReadinessClient from './AiCoeReadinessClient'

export const metadata = createMetadata({
  title: 'AI CoE Readiness Assessment — Enterprise AI Center of Excellence Benchmark',
  path: '/ai-coe-readiness',
  description:
    'Answer 12 questions across exec sponsorship, data & architecture, use-case maturity, talent & op model, governance & risk, and ROI discipline. Get your AI CoE maturity level free, plus the one named risk exposure holding your program back.',
  keywords: [
    'ai center of excellence readiness assessment',
    'ai coe maturity model',
    'enterprise ai readiness scorecard',
    'ai governance assessment',
    'ai coe assessment frankx',
  ],
})

export default function AiCoeReadinessPage() {
  return <AiCoeReadinessClient />
}
