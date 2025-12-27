import Link from 'next/link'

export default function FounderPlaybook() {
  return (
    <div className="min-h-screen bg-white">
<main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Founder's AI Playbook</h1>
          <p className="text-gray-700 mb-6">A practical path to ship AI value without the hype.</p>
          <ul className="list-disc ml-6 space-y-3 text-gray-800">
            <li>Map Advantage: <strong>Skills × Data × Distribution</strong> for your business</li>
            <li>Run a 90‑day COE plan on one revenue‑linked workflow</li>
            <li>Add evaluation and governance before scaling</li>
          </ul>
          <div className="mt-8 space-x-4">
            <Link href="/guides/modern-guide" className="text-purple-600 hover:text-purple-700 underline">Read Modern Guide</Link>
            <Link href="/templates" className="text-purple-600 hover:text-purple-700 underline">Open Templates</Link>
          </div>
        </div>
      </main>
</div>
  )
}

