import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'How to Use These Workshops | For Educators | FrankX',
  description:
    'Professional AI workshop templates for university classrooms, corporate training rooms, and bootcamps. Structured agendas, instructor notes, resource packs.',
  path: '/workshops/for-educators',
  image: '/hero-homepage.png',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
