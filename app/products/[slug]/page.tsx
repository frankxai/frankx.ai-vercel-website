import { notFound } from 'next/navigation'

import { getProductBySlug } from '@/lib/products'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center text-slate-100">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <p className="mt-4 text-lg text-white/70">{product.summary ?? product.promise}</p>
      <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/40">
        Detailed experience available at <span className="text-primary-200">/products/{product.slug}</span>
      </p>
    </div>
  )
}