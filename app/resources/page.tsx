'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BookOpen, FileText, Boxes, ExternalLink, LinkIcon, Download } from 'lucide-react'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Resources</h1>
            <p className="text-gray-600 text-lg">Curated, high-value guides and templates to help you thrive in the intelligence era.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="p-6 border rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold">Golden Age Modern Guide</h2>
              </div>
              <p className="text-gray-700 mb-4">A practical, plain-language guide with frameworks and a 90-day plan.</p>
              <Link href="/reading/GoldenAge-Modernized/article/Golden_Age_of_Intelligence_Modern_Guide.html" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
                Read the Guide <ExternalLink className="w-4 h-4" />
              </Link>
            </section>

            <section className="p-6 border rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold">Book Basis & TOC</h2>
              </div>
              <p className="text-gray-700 mb-4">Positioning, structure, and sample chapter for “Dawn of the Golden Age”.</p>
              <div className="flex gap-4">
                <Link href="/reading/GoldenAge-Modernized/book/basis.html" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">Basis <LinkIcon className="w-4 h-4" /></Link>
                <Link href="/reading/GoldenAge-Modernized/book/table_of_contents.html" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">TOC <LinkIcon className="w-4 h-4" /></Link>
                <Link href="/reading/GoldenAge-Modernized/book/samples/chapter_1.html" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">Sample <LinkIcon className="w-4 h-4" /></Link>
              </div>
            </section>

            <section className="p-6 border rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <Boxes className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold">Templates & Playbooks</h2>
              </div>
              <p className="text-gray-700 mb-4">Capture–Orchestrate–Evaluate (COE) checklists, adoption scorecards, and agent blueprints.</p>
              <Link href="/reading/Templates/MASTER_TEMPLATE_INDEX.html" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
                Browse Templates <ExternalLink className="w-4 h-4" />
              </Link>
            </section>

            <section className="p-6 border rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <Download className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold">One-Pager: Intelligence Era</h2>
              </div>
              <p className="text-gray-700 mb-4">A concise executive summary and checklists for quick wins.</p>
              <Link href="/assets/intelligence-era-onepager.html" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
                Open One-Pager <ExternalLink className="w-4 h-4" />
              </Link>
            </section>
          </div>

          <div className="mt-10">
            <Link href="/reading/index.html" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 underline">
              View the complete Reading Index
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

