import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

const config = [
  // Global ignores - must be first and use proper glob patterns
  {
    ignores: [
      '**/tina-frankx/**',
      '**/.worktrees/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/agentic-creator-os/**',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default config;
