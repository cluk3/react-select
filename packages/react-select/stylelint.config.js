import path from 'node:path';

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-selector-bem-pattern',
    'stylelint-value-no-unknown-custom-properties',
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      componentName: '[A-Z]+',
      componentSelectors: {
        initial: '^\\.{componentName}(?:-[a-z]+)?$',
        combined: '^\\.combined-{componentName}-[a-z]+$',
      },
      utilitySelectors: '^\\.util-[a-z]+$',
    },
    'selector-class-pattern': null,
    'csstools/value-no-unknown-custom-properties': [
      true,

      {
        importFrom: [
          path.join(
            path.dirname(import.meta.url.replace('file:', '')),
            'src/styles.css'
          ),
        ],
      },
    ],
  },
};
