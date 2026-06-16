import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',

      // Possible Errors
      'no-undef': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'warn',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',

      // Best Practices
      'no-eval': 'error',
      'no-with': 'error',
      'no-redeclare': 'error',
      'no-shadow': 'warn',
      'no-unused-expressions': 'error',
      'no-use-before-define': 'error',
      'curly': ['error', 'all'],
      'eqeqeq': 'error',
      'no-else-return': 'warn',

      // Node.js/Style Guidelines
      'no-process-env': 'warn',
      'no-sync': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'linebreak-style': ['error', 'unix'],
      'max-len': ['warn', { code: 120, comments: 120 }],
      'no-multiple-empty-lines': 'error',
      'camelcase': 'warn',

      // ES6+ Rules
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'warn',
    },
  },
  pluginJs.configs.recommended,
];