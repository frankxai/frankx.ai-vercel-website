import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>FrankX CMS - Keystatic Edition</h1>
      <p>Git-based content management by Thinkmill</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Start</h2>
        <ul>
          <li>
            <Link href="/keystatic" style={{ color: 'blue', textDecoration: 'underline' }}>
              Open Keystatic Admin →
            </Link>
          </li>
          <li>Create your first course or article</li>
          <li>Content saved as markdown in your repo</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Why Keystatic?</h3>
        <ul>
          <li>✅ Git-based (like Tina)</li>
          <li>✅ Built by Thinkmill team</li>
          <li>✅ React 19 compatible</li>
          <li>✅ TypeScript-first</li>
          <li>✅ Free & open source</li>
          <li>✅ Local-first editing</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Collections</h3>
        <ul>
          <li><strong>Courses</strong>: AI Music Academy courses</li>
          <li><strong>Articles</strong>: Blog posts and tutorials</li>
        </ul>
      </div>
    </div>
  )
}
