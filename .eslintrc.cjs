module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'twPlugin.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'off', //* tsx文件中仅允许导出组件,关闭
      {allowConstantExport: true},
    ],
    /* temporary rule for development */
    '@typescript-eslint/no-unused-vars': 'off',
    'prefer-const': [
      'off',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
