import { notFound } from 'next/navigation'
import { getCollection, getCollectionIds } from '@/lib/vault'
import type { Metadata } from 'next'
import { VaultCollectionClient } from './VaultCollectionClient'

export function generateStaticParams() {
  return getCollectionIds(true).map(id => ({ collection: id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>
}): Promise<Metadata> {
  const { collection: id } = await params
  const collection = getCollection(id)
  if (!collection) return {}

  return {
    title: `${collection.name} — ArcaneaVault | FrankX`,
    description: collection.description,
    openGraph: {
      title: `${collection.name} — ArcaneaVault`,
      description: `${collection.count} visual assets in the ${collection.name} collection.`,
      images: [collection.coverImage],
    },
  }
}

export default async function VaultCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>
}) {
  const { collection: id } = await params
  const collection = getCollection(id)

  if (!collection) notFound()

  return (
    <VaultCollectionClient collection={collection} />
  )
}
