module.exports = {
  extends: ['plugin:react-hooks/recommended', 'plugin:@typescript-eslint/base'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^event$',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: 'jsx|emotionJSX',
      },
    ],
    curly: [2, 'multi-line'],
    'jsx-quotes': 1,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    'no-trailing-spaces': 1,
    'no-underscore-dangle': 1,
    '@typescript-eslint/no-unused-expressions': 1,
    'object-curly-spacing': [1, 'always'],
    '@typescript-eslint/quotes': [2, 'single', 'avoid-escape'],
    'react/jsx-boolean-value': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-wrap-multilines': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-unknown-property': 1,
    'react/self-closing-comp': 1,
    'react/sort-prop-types': 1,
    // '@typescript-eslint/semi': 2,
    '@typescript-eslint/no-inferrable-types': 2,
    '@typescript-eslint/consistent-type-imports': 'error',
    strict: 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
