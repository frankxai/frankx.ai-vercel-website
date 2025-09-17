import Link from 'next/link'
import { Mail, Newspaper, Search, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Frank</span>
            </div>
            <p className="text-gray-400 mb-4">
              Bridging Technology & Soul for Conscious AI
            </p>
            <div className="flex space-x-4">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Read the latest intelligence updates"
              >
                <Newspaper className="w-5 h-5" />
              </Link>
              <Link
                href="/search"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Search the hub"
              >
                <Search className="w-5 h-5" />
              </Link>
              <a
                href="mailto:hello@frankx.ai?subject=Conscious%20AI%20Collaboration"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email FrankX"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Intelligence Hub</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/#updates" className="hover:text-white transition-colors">Latest Updates</Link></li>
              <li><Link href="/#resources" className="hover:text-white transition-colors">Resource Library</Link></li>
              <li><Link href="/#projects" className="hover:text-white transition-colors">Project Roadmap</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition-colors">Agent Protocols</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Semantic Search</Link></li>
              <li><Link href="/rss.xml" className="hover:text-white transition-colors">RSS Feed</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Programs & Guides</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/founder-playbook" className="hover:text-white transition-colors">Founder’s AI Playbook</Link></li>
              <li><Link href="/family-guide" className="hover:text-white transition-colors">AI Basics for Families</Link></li>
              <li><Link href="/music-lab" className="hover:text-white transition-colors">Music Lab</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides Collection</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Intelligence Dispatch</h3>
            <p className="text-gray-400 mb-4">Weekly briefings on conscious AI systems, music rituals, and agent strategy.</p>
            <form className="flex gap-2" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input type="hidden" name="redirect" value="/thank-you" />
              <button 
                type="submit"
                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Frank. All rights reserved. Built with conscious AI collaboration.</p>
        </div>
      </div>
    </footer>
  )
}
