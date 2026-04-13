import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGeschichteThema, getAllGeschichteSlugs } from '@/lib/familie/geschichte-themen'
import { GeschichteThemaPage } from './GeschichteThemaPage'

export async function generateStaticParams() {
  return getAllGeschichteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const thema = getGeschichteThema(slug)
  if (!thema) return {}

  return {
    title: `${thema.titel} — Geschichte | Familie Riemer-Gorte`,
    description: thema.kurzfassung,
    robots: { index: false, follow: false },
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
