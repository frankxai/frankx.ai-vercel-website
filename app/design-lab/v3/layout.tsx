import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Lab v3 — Product Templates | FrankX.AI',
  description: 'Six world-class design systems replicated with zero external dependencies. Vercel, Linear, Stripe, Canva, Gemini, and SaaS Dashboard templates.',
  robots: { index: false, follow: false },
}

export default function DesignLabV3Layout({ children }: { children: React.ReactNode }) {
  return children
}
