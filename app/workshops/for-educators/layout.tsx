import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'How to Use These Workshops | For Educators | FrankX',
  description:
    'Professional AI workshop templates for university classrooms, corporate training rooms, and bootcamps. Structured agendas, instructor notes, resource packs.',
  path: '/workshops/for-educators',
  image: '/images/workshops/workshop-os-hero.jpg',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
