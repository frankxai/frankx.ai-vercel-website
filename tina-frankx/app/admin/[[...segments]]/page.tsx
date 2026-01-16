export default function AdminPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Tina CMS Admin</h1>
      <p>Admin interface coming soon. For now, edit content directly in:</p>
      <code style={{ background: '#f0f0f0', padding: '1rem', display: 'block', marginTop: '1rem' }}>
        /content/courses/*.mdx
      </code>

      <div style={{ marginTop: '2rem' }}>
        <h2>To enable visual editing:</h2>
        <ol>
          <li>Sign up at <a href="https://tina.io" target="_blank" style={{ color: 'blue' }}>tina.io</a></li>
          <li>Get your Client ID and Token</li>
          <li>Add to .env.local:
            <pre style={{ background: '#f0f0f0', padding: '1rem', marginTop: '0.5rem' }}>
{`NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token`}
            </pre>
          </li>
          <li>Run: <code>npm run dev</code></li>
        </ol>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>← Back to Home</a>
      </div>
    </div>
  );
}
