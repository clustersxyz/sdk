import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';

export default [
  { ignores: ['examples/**', 'lib/**'] },
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { fetch: 'readonly', Response: 'readonly', Request: 'readonly', Headers: 'readonly' },
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs['eslint-recommended'].rules,
      'comma-dangle': [1, 'always-multiline'],
      'no-console': 'warn',
      semi: 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
