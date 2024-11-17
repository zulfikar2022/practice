import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'no-unused-var': 'error',
      'no-unused-expressions': 'error',
      'prefer-constant': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
    globals: {
      process: 'readonly',
    },
  },
  eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
