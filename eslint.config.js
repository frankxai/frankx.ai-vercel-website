const nextConfig = require('eslint-config-next')
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')

module.exports = [
  ...nextConfig,
  ...nextCoreWebVitals,
  {
    ignores: [
      'app/design-lab/**',
      'components/v0-variants/**',
      '.worktrees/**',
      'agentic-creator-os/**',
      'frankx-oracle-genai-content/**',
    ],
  },
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]
