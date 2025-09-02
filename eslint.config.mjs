import { FlatCompat } from '@eslint/eslintrc';

// import prettierJson from './prettierrc.json' assert { type: 'json' };

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [ 'next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['next','prettier', 'simple-import-sort', 'import'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'prettier/prettier': ['error', /* prettierJson */],
      'linebreak-style': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
    ignorePatterns: ['.next/', 'node_modules/', 'build/', 'dist/', '.turbo/', '*.config.js', '*.config.mjs'],
  }),
];

export default eslintConfig;
