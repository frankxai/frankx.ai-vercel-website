'use client'

import Image from 'next/image'
import Link from 'next/link'
import CountdownTimer from './CountdownTimer'

interface AuctionCardProps {
  auction: {
    id: string
    slug: string
    title: string
    description: string
    item: {
      type: string
      category: string
      images: string[]
    }
    startingBid: number
    buyNowPrice?: number
    currentBid: number
    bidCount: number
    endTime: string
    status: string
    featured?: boolean
    edition?: string
  }
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const isActive = auction.status === 'active'
  const isUpcoming = auction.status === 'upcoming'
  const currentPrice = auction.currentBid > 0 ? auction.currentBid : auction.startingBid

  return (
    <Link
      href={`/auctions/${auction.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={auction.item.images[0]}
          alt={auction.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/30 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {isActive && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-medium backdrop-blur-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
          {isUpcoming && (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-medium backdrop-blur-sm">
              Upcoming
            </span>
          )}
          {auction.featured && (
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-xs font-medium backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Edition badge */}
        {auction.edition && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-mono backdrop-blur-sm">
            {auction.edition}
          </div>
        )}

        {/* Countdown */}
        <div className="absolute bottom-4 left-4">
          <CountdownTimer endTime={auction.endTime} compact />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs text-white/40 uppercase tracking-wider">
              {auction.item.category}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight mt-1">
              {auction.title}
            </h3>
          </div>
        </div>

        <p className="text-white/40 text-sm line-clamp-2 mb-4">
          {auction.description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <div>
            <span className="text-xs text-white/40">
              {auction.bidCount > 0 ? 'Current Bid' : 'Starting Bid'}
            </span>
            <div className="text-xl font-bold text-white">${currentPrice}</div>
          </div>
          {auction.buyNowPrice && (
            <div className="text-right">
              <span className="text-xs text-white/40">Buy Now</span>
              <div className="text-lg font-semibold text-cyan-400">${auction.buyNowPrice}</div>
            </div>
          )}
        </div>

        {/* Bid count */}
        {auction.bidCount > 0 && (
          <div className="text-xs text-white/30 mt-2">
            {auction.bidCount} bid{auction.bidCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </Link>
  )
}
