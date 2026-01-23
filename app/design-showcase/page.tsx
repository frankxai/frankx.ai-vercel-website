import { Metadata } from 'next'
import DesignShowcase from './DesignShowcase'

export const metadata: Metadata = {
  title: 'Design System Showcase',
  description: 'FrankX.AI premium design system - glassmorphism, 3D assets, Spline, border effects',
}

export default function DesignShowcasePage() {
  return <DesignShowcase />
}
