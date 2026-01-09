const nextConfig = require('eslint-config-next')
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')

module.exports = [
  ...nextConfig,
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
]
