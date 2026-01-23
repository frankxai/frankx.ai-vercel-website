const nextConfig = require('eslint-config-next')
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')

module.exports = [
  ...nextConfig,
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      // Disable React Compiler ESLint rules that conflict with animation libraries
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/immutability': 'off',
    },
  },
]
