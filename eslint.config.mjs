import typescriptEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import github from 'eslint-plugin-github'
import jsonFormat from 'eslint-plugin-json-format'
import unicorn from 'eslint-plugin-unicorn'
import promise from 'eslint-plugin-promise'
import drizzle from 'eslint-plugin-drizzle'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['src/components/ui/*'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/strict',
    'plugin:github/recommended',
    'plugin:unicorn/recommended',
    'plugin:drizzle/recommended',
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      github,
      'json-format': jsonFormat,
      unicorn,
      promise,
      drizzle,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'filenames/match-regex': 'off',
      'unicorn/prefer-global-this': 'off',
      'no-unescaped-entities': 'off',
      'import/no-commonjs': 'off',
      'import/no-namespace': 'off',
      'import/named': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',
      'promise/avoid-new': 'off',
      'react/prop-types': 'off',
      'i18n-text/no-en': 'off',
      'github/no-implicit-buggy-globals': 'off',

      'eslint-comments/no-use': [
        'error',
        {
          allow: ['eslint-disable', 'eslint-disable-next-line'],
        },
      ],

      camelcase: 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    //files: ['src/app/**/*.{ts,tsx}'],
    files: ['src/app/exercices/**/*.{ts,tsx}'], //
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/db/schema/*', '@/db/schema', 'drizzle-orm'],
        },
      ],
    },
  },
  {
    files: ['src/data/**/*.ts', 'src/services/**/*.ts'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/app/*'],
        },
      ],
    },
  },
]
