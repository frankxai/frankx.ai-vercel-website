import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>FrankX CMS - Tina Edition</h1>
      <p>Git-based content management for courses and articles</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Start</h2>
        <ul>
          <li>
            <Link href="/admin" style={{ color: 'blue', textDecoration: 'underline' }}>
              Open Admin Panel →
            </Link>
          </li>
          <li>Create your first course or article</li>
          <li>Content is saved as markdown files in your repo</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Why Tina CMS?</h3>
        <ul>
          <li>✅ Git-based (no database needed)</li>
          <li>✅ Inline visual editing</li>
          <li>✅ TypeScript support</li>
          <li>✅ Free & open source</li>
          <li>✅ Works on Vercel Hobby plan</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Collections</h3>
        <ul>
          <li><strong>Courses</strong>: AI Music Academy courses with pricing</li>
          <li><strong>Articles</strong>: Blog posts and tutorials</li>
        </ul>
      </div>
    </div>
  )
}
