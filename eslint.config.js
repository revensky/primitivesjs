import { defineConfig } from 'eslint/config';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard';

import js from '@eslint/js';

export default defineConfig([
  ...neostandard({
    ignores: [...resolveIgnoresFromGitignore(), 'eslint.config.mjs'],
    semi: true,
    noStyle: true,
    noJsx: true,
    ts: true,
  }),
  {
    files: ['**/*.js', '**/*.ts'],
    plugins: { js, prettier },
    languageOptions: { globals: globals.node },
    extends: ['js/recommended'],
    rules: {
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'no-redeclare': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.spec.ts'],
    ...jest.configs['flat/recommended'],
    plugins: { jest },
    languageOptions: {
      globals: { ...globals.jest, ...jest.environments.globals.globals },
    },
  },
]);
