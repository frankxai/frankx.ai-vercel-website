import type { ReactNode } from 'react';

export const metadata = {
  title: 'Multi-Agent Starter',
  description: 'Orchestrator → workers on Vercel AI SDK 6',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          background: '#0b0b0f',
          color: '#e7e7ea',
        }}
      >
        {children}
      </body>
    </html>
  );
}
