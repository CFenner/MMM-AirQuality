import eslintPluginJs from '@eslint/js'
import eslintPluginStylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

const config = [
  {
    files: ['**/*.js', '**/*.mjs'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Log: 'readonly',
        Module: 'readonly',
      },
    },
    plugins: {
      ...eslintPluginStylistic.configs['recommended-flat'].plugins,
    },
    rules: {
      ...eslintPluginJs.configs.all.rules,
      ...eslintPluginStylistic.configs['recommended-flat'].rules,
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      'capitalized-comments': 'off',
      'consistent-this': 'off',
      'curly': 'off',
      'default-case': 'off',
      'no-console': 'off',
      'no-inline-comments': 'off',
      'no-magic-numbers': 'off',
      'no-undefined': 'off',
      'one-var': ['error', 'never'],
      'sort-keys': 'off',
    },
  }
]

export default config
