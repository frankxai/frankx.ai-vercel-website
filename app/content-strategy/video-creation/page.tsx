import type { Metadata } from 'next'
import VideoCreationClient from './VideoCreationClient'

export const metadata: Metadata = {
  title: 'Video Creation Strategy | FrankX (Private)',
  robots: { index: false, follow: false },
}

export default function VideoCreationPage() {
  return <VideoCreationClient />
}
