import Link from 'next/link'
export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
<main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Templates</h1>
          <p className="text-gray-700 mb-8">Prompts, evaluation sheets, agent blueprints, and scorecards.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="p-6 border rounded-xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">Master Template Library</h2>
              <p className="text-gray-600 mb-3">Browse the complete templates library.</p>
              <Link href="/reading/Templates/MASTER_TEMPLATE_INDEX.html" className="text-purple-600 hover:text-purple-700">Open Library →</Link>
            </section>
            <section className="p-6 border rounded-xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">RAG Pipeline Architecture</h2>
              <p className="text-gray-600 mb-3">Reference architecture and checklist for retrieval pipelines.</p>
              <Link href="/reading/Templates/02-AI-Architecture/RAG-Pipeline-Architecture.html" className="text-purple-600 hover:text-purple-700">Open Template →</Link>
            </section>
            <section className="p-6 border rounded-xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">COE Checklist</h2>
              <p className="text-gray-600 mb-3">Capture → Orchestrate → Evaluate; step-by-step checklist.</p>
              <Link href="/templates/coe-checklist.html" className="text-purple-600 hover:text-purple-700">Open Checklist →</Link>
            </section>
            <section className="p-6 border rounded-xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">Evaluation Rubric</h2>
              <p className="text-gray-600 mb-3">Quality criteria, scoring rubric, and sampling plan.</p>
              <Link href="/templates/evaluation-rubric.html" className="text-purple-600 hover:text-purple-700">Open Rubric →</Link>
            </section>
            <section className="p-6 border rounded-xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">Risk Register</h2>
              <p className="text-gray-600 mb-3">Track risks, mitigations, owners, and review cadence.</p>
              <Link href="/templates/risk-register.html" className="text-purple-600 hover:text-purple-700">Open Register →</Link>
            </section>
            <section className="p-6 border rounded-xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">Governance Overview</h2>
              <p className="text-gray-600 mb-3">One‑page workflow governance summary for stakeholders.</p>
              <Link href="/templates/governance-overview.html" className="text-purple-600 hover:text-purple-700">Open Overview →</Link>
            </section>
          </div>
        </div>
      </main>
</div>
  )
}
