import { Metadata } from 'next'
import HomePageV1 from './HomePageV1'

export const metadata: Metadata = {
  title: 'FrankX.AI V1 | Premium Experience',
  description: 'The next generation of FrankX.AI - featuring interactive 3D, premium animations, and soul-aligned AI transformation.',
}

export default function V1Page() {
  return <HomePageV1 />
}
