import Link from 'next/link'

export default function IntelligenceAtlas() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">FrankX Intelligence Atlas Vol. I: Architecting the Agentic Era</h1>
        <p className="mt-4 text-lg text-neutral-400">A 10,000-word flagship report on the 2025 intelligence landscape, from frontier labs to open-source ecosystems, adoption metrics, and builder-ready frameworks.</p>
      </div>

      <div className="mt-12">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-white">Prologue: the intelligence atlas mission</h2>
          <p className="mt-4 text-neutral-300">
            The FrankX Intelligence Atlas exists because the world crossed an irreversible threshold in 2024. Enterprise and independent teams alike moved from AI experiments to real deployments, while creative platforms like Suno and Runway turned speculative demos into everyday studio rituals.
          </p>
          <p className="mt-4 text-neutral-300">
            As a collective, FrankX straddles multiple domains: creative AI music systems, family education, enterprise architecture, and the social rituals that keep innovation human. Each field now demands a clear view of how frontier models, open-source acceleration, and agentic automation converge.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Executive Summary</h2>
        <div className="mt-6 prose prose-invert max-w-none">
          <p>The FrankX Intelligence Atlas Vol. I is a 10,000-word flagship report on the 2025 intelligence landscape, from frontier labs to open-source ecosystems, adoption metrics, and builder-ready frameworks.</p>
          <ul>
            <li>Agent adoption is mainstream.</li>
            <li>Frontier labs accelerate agentic scaffolding.</li>
            <li>Open-source momentum compounds.</li>
            <li>FrankX systems provide implementation gravity.</li>
            <li>Governance and safety stay front-and-center.</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-heading-2 font-semibold text-white">Call to Action</h2>
        <div className="mt-6 prose prose-invert max-w-none">
          <p>Ready to install the OS? Start with:</p>
          <ul>
            <li><Link href="/products/creative-ai-toolkit" className="text-primary-200 hover:text-primary-100 underline-offset-4 hover:underline">Creative AI Toolkit</Link> - prompts, workflows, and quick wins.</li>
            <li><Link href="/products/agentic-creator-os" className="text-primary-200 hover:text-primary-100 underline-offset-4 hover:underline">Agentic Creator OS Blueprint</Link> - the full system we use internally to ship Golden Age of Intelligence and more.</li>
          </ul>
          <p>Bundle them and you'll have your Agentic Creator OS running in weeks, not quarters.</p>
        </div>
      </div>
    </div>
  )
}






