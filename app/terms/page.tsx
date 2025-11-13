import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Terms of Service - FrankX.AI',
  description: 'Terms of service and conditions for using FrankX.AI',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <article className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-slate-400 mb-12">Last updated: January 13, 2025</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                By accessing and using FrankX.AI ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information, software, content) on FrankX.AI for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software contained on the Website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Free Resources and Content</h2>
              <p className="text-slate-300 leading-relaxed">
                FrankX.AI provides free resources, templates, research, and educational content. By downloading or using these resources:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>You may use them for personal or commercial projects</li>
                <li>You may not resell, redistribute, or claim ownership of the original content</li>
                <li>Attribution to FrankX.AI is appreciated but not required</li>
                <li>Resources are provided "as is" without warranty of any kind</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p className="text-slate-300 leading-relaxed">
                The content, design, graphics, compilation, and other matters related to FrankX.AI are protected under applicable copyrights and other proprietary rights. All blog posts, research content, code examples, and original materials are owned by FrankX.AI unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">User-Generated Content</h2>
              <p className="text-slate-300 leading-relaxed">
                If you submit comments, feedback, or other content to FrankX.AI, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute that content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">External Links</h2>
              <p className="text-slate-300 leading-relaxed">
                FrankX.AI may contain links to external websites (including Perplexity Pages, GitHub repositories, etc.). We are not responsible for the content, accuracy, or practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The materials on FrankX.AI are provided "as is." FrankX.AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>Implied warranties or conditions of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property or other violation of rights</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                We do not warrant that the website will be uninterrupted, error-free, or that defects will be corrected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-slate-300 leading-relaxed">
                In no event shall FrankX.AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FrankX.AI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI-Related Content Disclaimer</h2>
              <p className="text-slate-300 leading-relaxed">
                FrankX.AI provides information, techniques, and resources related to AI systems, generative AI, and agentic workflows. This content is:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li>For educational and experimental purposes</li>
                <li>Based on personal experience and research</li>
                <li>Not professional advice for production systems without proper testing</li>
                <li>Subject to rapid changes as AI technology evolves</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                Users are responsible for testing, validating, and ensuring any techniques or code meet their specific requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Newsletter and Communications</h2>
              <p className="text-slate-300 leading-relaxed">
                By subscribing to our newsletter, you agree to receive periodic emails from FrankX.AI. You may unsubscribe at any time via the link in any email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Modifications to Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                FrankX.AI may revise these Terms of Service at any time without notice. By using this Website, you agree to be bound by the current version of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-slate-300 leading-relaxed">
                Any claim relating to FrankX.AI shall be governed by the laws of your jurisdiction without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  our contact page
                </a>.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
