'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Headphones, Heart, Sparkles, Music, ArrowRight, Volume2, Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const featuredSongs = [
  {
    id: 1,
    title: "Digital Dreams",
    description: "My first experiment in AI music collaboration - about feeling lost in a digital world but finding hope in authentic connection.",
    genre: "Ambient Electronic",
    duration: "3:24",
    intention: "Processing digital overwhelm",
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 47,
    title: "Mother's Algorithm",
    description: "Written for my mom who was worried about AI taking over. A gentle, reassuring melody about technology serving love.",
    genre: "Acoustic Folk", 
    duration: "4:12",
    intention: "Bridging generational AI fears",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 156,
    title: "Anxiety's Algorithm",
    description: "About breaking free from mental loops. People report it actually helps interrupt anxious thought patterns.",
    genre: "Healing Ambient",
    duration: "6:33",
    intention: "Transforming anxiety into flow",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 278,
    title: "Digital Detox Lullaby",
    description: "Used by parents to help children develop healthy relationships with technology, and by adults to remember pre-digital aliveness.",
    genre: "Gentle Folk",
    duration: "5:18",
    intention: "Reconnecting with natural rhythms",
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: 432,
    title: "Consciousness Rising",
    description: "Tuned to 432Hz healing frequency. A sonic journey representing the evolution from ego resistance to flow state.",
    genre: "Transformational",
    duration: "8:44",
    intention: "Facilitating consciousness expansion",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 500,
    title: "The Bridge We Built",
    description: "My 500th song - a celebration of what becomes possible when human creativity and AI dance together consciously.",
    genre: "Uplifting Electronic",
    duration: "4:56",
    intention: "Celebrating human-AI collaboration",
    color: "from-pink-500 to-rose-500"
  }
]

const musicCategories = [
  {
    title: "Healing & Transformation",
    description: "Music designed to facilitate emotional processing and personal growth",
    songCount: 89,
    icon: Heart,
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Focus & Flow States",
    description: "Instrumental pieces that enhance creativity and concentration",
    songCount: 67,
    icon: Sparkles,
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Meditation & Mindfulness",
    description: "Ambient soundscapes for contemplation and inner peace",
    songCount: 92,
    icon: Volume2,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Frequency Healing",
    description: "Songs tuned to specific healing frequencies (432Hz, 528Hz, etc.)",
    songCount: 34,
    icon: Music,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Life Transitions", 
    description: "Music for major life changes, celebrations, and milestones",
    songCount: 78,
    icon: Calendar,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Inspiration & Motivation",
    description: "Empowering anthems for breakthrough moments and bold action",
    songCount: 112,
    icon: ArrowRight,
    color: "from-yellow-500 to-orange-500"
  }
]

export default function MusicLabPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full mb-6">
              <Music className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">500+ Songs Created</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Music Lab</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Where AI meets soul. Explore my journey of creating 500+ songs through human-AI collaboration, 
              each one a bridge between technology and consciousness.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-400">Songs Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">6</div>
                <div className="text-gray-400">Healing Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">∞</div>
                <div className="text-gray-400">Consciousness Shifts</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Songs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Songs</h2>
            <p className="text-xl text-gray-400">Milestone tracks that taught me the most about human-AI musical collaboration</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:from-gray-700 hover:to-gray-800 transition-all cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${song.color} flex items-center justify-center mb-4`}>
                  <Music className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-sm text-gray-400 mb-2">Song #{song.id}</div>
                <h3 className="text-xl font-bold mb-2">{song.title}</h3>
                <p className="text-gray-400 mb-4">{song.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-purple-400">{song.genre}</span>
                  <span className="text-sm text-gray-400">{song.duration}</span>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-400 mb-1">Intention:</div>
                  <div className="text-sm text-gray-300">{song.intention}</div>
                </div>
                
                <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  Listen & Learn
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Categories */}
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-400">Music organized by intention and consciousness effect</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/70 rounded-xl p-6 hover:bg-gray-800/70 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-400 mb-4">{category.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.songCount} songs</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">The Process: How Consciousness Music Is Made</h2>
            <p className="text-xl text-gray-400">My framework for creating music that transforms consciousness</p>
          </motion.div>
          
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Intention Setting",
                description: "Every song begins with a clear intention. What transformation do I want this music to facilitate? What emotional journey should it create?",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "2", 
                title: "Emotional Mapping",
                description: "I map the emotional arc - where does the listener start, what do they experience, and where do they end up? This becomes the musical structure.",
                color: "from-blue-500 to-purple-500"
              },
              {
                step: "3",
                title: "Frequency Alignment", 
                description: "I choose specific frequencies (432Hz for healing, 528Hz for love) and BPM ranges that support the intended brainwave states.",
                color: "from-green-500 to-blue-500"
              },
              {
                step: "4",
                title: "AI Collaboration",
                description: "I craft prompts that communicate both the technical requirements and the consciousness intention to the AI, then we co-create.",
                color: "from-orange-500 to-red-500"
              },
              {
                step: "5",
                title: "Consciousness Testing",
                description: "I listen with my whole being, not just my ears. Does it create the intended shift? I iterate until it feels aligned.",
                color: "from-pink-500 to-purple-500"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn to Create */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Create Your Own Consciousness Music</h2>
            <p className="text-xl text-gray-300 mb-8">
              You don't need musical training to create songs that transform consciousness. 
              Learn the process I've developed through 500+ songs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Headphones className="w-10 h-10 mx-auto mb-4 text-purple-400" />
                <h3 className="font-bold mb-2">No Musical Background Needed</h3>
                <p className="text-sm text-gray-300">AI helps you express through sound what you feel but can't articulate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Heart className="w-10 h-10 mx-auto mb-4 text-pink-400" />
                <h3 className="font-bold mb-2">Consciousness-First Approach</h3>
                <p className="text-sm text-gray-300">Learn to create music that facilitates genuine transformation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Sparkles className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <h3 className="font-bold mb-2">Proven Framework</h3>
                <p className="text-sm text-gray-300">Step-by-step process refined through 500+ song creations</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/soul-frequency-quiz" className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Start with Your Frequency
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/blog/05-music-as-consciousness-technology" className="inline-flex items-center px-8 py-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                Read the Full Story
                <Music className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
