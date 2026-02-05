'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Verified, Music, Code, BookOpen, Sparkles } from 'lucide-react'

/**
 * V10: Feed Homepage
 *
 * Twitter/X style social feed aesthetic showing latest activity,
 * updates, and content in a familiar timeline format
 */

const feedItems = [
  {
    id: 1,
    type: 'pinned',
    content: "AI Architect building enterprise systems by day, creating music & products by night. 500+ songs. Zero bullshit. Let the work speak.",
    timestamp: 'Pinned',
    likes: 2847,
    replies: 156,
    reposts: 423,
  },
  {
    id: 2,
    type: 'music',
    content: "Just dropped a new ambient track exploring 432Hz healing frequencies. Created entirely with Suno AI using my Vibe OS system.",
    link: '/music-lab',
    linkText: 'Listen on Music Lab',
    timestamp: '2h',
    likes: 892,
    replies: 67,
    reposts: 234,
  },
  {
    id: 3,
    type: 'blog',
    content: "New deep-dive: Claude Code vs Cursor vs Windsurf — which AI coding tool actually ships? Spoiler: it's not the one with the most features.",
    link: '/blog',
    linkText: 'Read the full analysis',
    timestamp: '5h',
    likes: 1456,
    replies: 203,
    reposts: 567,
  },
  {
    id: 4,
    type: 'product',
    content: "Vibe OS pre-orders opening soon. 50+ genre-specific prompts, emotion mapping, production checklists. The system behind 500 songs.",
    link: '/products/vibe-os',
    linkText: 'Join the waitlist',
    timestamp: '1d',
    likes: 634,
    replies: 89,
    reposts: 178,
  },
  {
    id: 5,
    type: 'thought',
    content: "Hot take: Most AI tutorials teach you to use the tool. Almost none teach you to think with it. The gap between tool user and tool thinker is where the real leverage is.",
    timestamp: '2d',
    likes: 3241,
    replies: 312,
    reposts: 892,
  },
]

const typeIcons: Record<string, React.ElementType> = {
  music: Music,
  blog: BookOpen,
  product: Sparkles,
  thought: MessageCircle,
  pinned: Verified,
}

export default function HomePageFeed() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Home</h1>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="hidden sm:inline">frankx.ai</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
              FX
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Frank X</h2>
                <Verified className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-white/50">@frankxai</p>
              <p className="mt-3 text-white/80">
                AI Architect @ Oracle · Creator · 500+ AI Songs · Building in public
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <Link href="/about" className="text-white/50 hover:text-white">
                  <span className="font-bold text-white">Amsterdam</span> · Netherlands
                </Link>
                <Link href="/newsletter" className="text-blue-400 hover:underline">
                  frankx.ai
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-3 text-sm">
                <span><strong className="text-white">128</strong> <span className="text-white/50">Following</span></span>
                <span><strong className="text-white">12.4K</strong> <span className="text-white/50">Followers</span></span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {[
              { label: 'AI Architect', href: '/ai-architect', icon: Code },
              { label: 'Music Lab', href: '/music-lab', icon: Music },
              { label: 'Products', href: '/products', icon: Sparkles },
              { label: 'Blog', href: '/blog', icon: BookOpen },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <link.icon className="w-4 h-4" />
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div>
          {feedItems.map((item, index) => {
            const Icon: React.ElementType = typeIcons[item.type] || MessageCircle

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10 p-4 hover:bg-white/[0.02] transition-colors"
              >
                {item.type === 'pinned' && (
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-2 ml-12">
                    <Sparkles className="w-3 h-3" />
                    Pinned
                  </div>
                )}

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    FX
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Frank X</span>
                      <Verified className="w-4 h-4 text-blue-400" />
                      <span className="text-white/50">@frankxai</span>
                      <span className="text-white/50">·</span>
                      <span className="text-white/50">{item.timestamp}</span>
                      <button className="ml-auto text-white/50 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-white/90 leading-relaxed">
                      {item.content}
                    </p>

                    {item.link && (
                      <Link
                        href={item.link}
                        className="mt-3 block rounded-xl border border-white/10 overflow-hidden hover:bg-white/5 transition-colors"
                      >
                        <div className="p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-400">{item.linkText}</p>
                            <p className="text-xs text-white/50">frankx.ai</p>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Engagement */}
                    <div className="flex items-center justify-between mt-4 max-w-md text-white/50">
                      <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                        <MessageCircle className="w-4 h-4 group-hover:bg-blue-400/10 rounded-full" />
                        <span className="text-sm">{item.replies}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-sm">{item.reposts}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-pink-400 transition-colors group">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{item.likes.toLocaleString()}</span>
                      </button>
                      <button className="hover:text-blue-400 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Load more */}
        <div className="p-8 text-center">
          <Link
            href="/blog"
            className="text-blue-400 hover:underline"
          >
            See all posts →
          </Link>
        </div>
      </div>
    </main>
  )
}
