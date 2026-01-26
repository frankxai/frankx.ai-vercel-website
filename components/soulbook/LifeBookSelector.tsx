'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import { lifeBooks, LifeBook } from '@/lib/soulbook/soulbook-data'

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

function LifeBookCard({
  book,
  index,
  isSelected,
  onSelect,
}: {
  book: LifeBook
  index: number
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
      className="relative"
    >
      <GlassmorphicCard
        variant={isSelected ? 'luxury' : 'premium'}
        gradient={book.color === 'amber' ? 'aurora' : book.color === 'purple' ? 'purple' : 'aurora'}
        border={isSelected ? 'glow' : 'subtle'}
        hover
        className={cn(
          'h-full transition-all duration-500 cursor-pointer',
          isSelected ? 'scale-105' : 'hover:scale-[1.02]'
        )}
        onClick={onSelect}
      >
        {/* Card glow effect */}
        {isSelected && (
          <div
            className={cn(
              'absolute -inset-1 rounded-2xl opacity-50 blur-xl',
              'bg-gradient-to-r',
              book.gradient
            )}
          />
        )}

        <div className="relative p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="text-5xl">{book.icon}</div>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30"
              >
                Most Popular
              </motion.div>
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            'text-2xl font-bold mb-2 font-serif',
            `bg-gradient-to-r ${book.gradient} bg-clip-text text-transparent`
          )}>
            {book.title}
          </h3>

          {/* Tagline */}
          <p className="text-white/80 font-medium mb-4">{book.tagline}</p>

          {/* Duration & Sessions */}
          <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {book.duration}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {book.sessions} sessions
            </span>
          </div>

          {/* Description */}
          <p className="text-white/70 mb-6 flex-grow">{book.shortDescription}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold text-white">${book.price.current}</span>
            <span className="text-white/55 line-through text-sm">${book.price.original}</span>
            <span className="text-amber-400 text-sm font-medium">
              Save ${book.price.original - book.price.current}
            </span>
          </div>

          {/* Features preview */}
          <ul className="space-y-2 mb-6">
            {book.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
            {book.features.length > 4 && (
              <li className="text-sm text-white/55">
                +{book.features.length - 4} more features
              </li>
            )}
          </ul>

          {/* CTA */}
          <PremiumButton
            variant={isSelected ? 'luxury' : 'primary'}
            size="lg"
            className="w-full"
            glow={isSelected}
          >
            View Details
          </PremiumButton>
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}

export default function LifeBookSelector() {
  const [selectedBook, setSelectedBook] = useState(0) // Default to Golden Path as popular

  return (
    <section
      id="life-books"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Choose Your Transformation
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Three distinct journeys through the Soulbook framework.
            Select the path that resonates with where you are right now.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {lifeBooks.map((book, index) => (
            <LifeBookCard
              key={book.id}
              book={book}
              index={index}
              isSelected={selectedBook === index}
              onSelect={() => setSelectedBook(index)}
            />
          ))}
        </div>

        {/* Selected book details */}
        <motion.div
          key={selectedBook}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{lifeBooks[selectedBook].icon}</span>
                <h3 className="text-2xl font-bold font-serif">
                  {lifeBooks[selectedBook].title}
                </h3>
              </div>
              <p className="text-white/70 mb-6">{lifeBooks[selectedBook].description}</p>

              {/* Outcomes */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-white/90">What you'll transform:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {lifeBooks[selectedBook].outcomes.slice(0, 4).map((outcome, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="flex items-center gap-2 text-sm text-white/50">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {lifeBooks[selectedBook].guarantee}
              </div>
            </div>

            <div className="space-y-6">
              {/* For who */}
              <div>
                <h4 className="font-semibold text-white/90 mb-3">Perfect for those who:</h4>
                <ul className="space-y-2">
                  {lifeBooks[selectedBook].forWho.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <PremiumButton
                variant="luxury"
                size="xl"
                glow
                className="w-full"
                href={lifeBooks[selectedBook].slug === 'seven-pillars' ? '/soulbook/7-pillars' : `/soulbook/${lifeBooks[selectedBook].slug}`}
              >
                Start Your {lifeBooks[selectedBook].title} Journey — ${lifeBooks[selectedBook].price.current}
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
