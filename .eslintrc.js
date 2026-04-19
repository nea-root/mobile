module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      ignoreRestSiblings: true,
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/*.test.[jt]s?(x)',
        '**/*.spec.[jt]s?(x)',
        'jest.setup.js',
        '__mocks__/**/*.[jt]s?(x)',
      ],
      env: { jest: true },
    },
  ],
};
