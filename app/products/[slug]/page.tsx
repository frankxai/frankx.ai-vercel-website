import { products } from '@/lib/products'
import BuyButton from './BuyButton'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">{product.name}</h1>
        <p className="mt-4 text-lg text-slate-400">{product.description}</p>
      </div>

      <div className="mt-12">
        <div className="flex justify-center">
          <BuyButton price={product.price} />
        </div>
      </div>
    </div>
  )
}
