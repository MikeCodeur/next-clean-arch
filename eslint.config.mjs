import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {FlatCompat} from '@eslint/eslintrc'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import github from 'eslint-plugin-github'
import jsonFormat from 'eslint-plugin-json-format'
import unicorn from 'eslint-plugin-unicorn'
import promise from 'eslint-plugin-promise'
import prettier from 'eslint-plugin-prettier'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'json-format': jsonFormat,
      react,
      github,
      unicorn,
      promise,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/no-commonjs': 'off',
      'import/no-namespace': 'off',
      'import/named': 'off',
      'unicorn/prevent-abbreviations': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
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
      'prefer-template': 'warn',
    },
  },
]

export default eslintConfig
