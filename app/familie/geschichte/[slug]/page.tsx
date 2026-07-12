import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGeschichteThema } from '@/lib/familie/geschichte-themen'
import { GeschichteThemaPage } from './GeschichteThemaPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const thema = getGeschichteThema(slug)
  if (!thema) return {}

  return {
    title: `${thema.titel} — Privates Familienarchiv`,
    description: 'Geschützter Quellen- und Forschungsbereich des Familienarchivs.',
    robots: { index: false, follow: false, nocache: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const thema = getGeschichteThema(slug)
  if (!thema) notFound()

  return <GeschichteThemaPage thema={thema} />
}
