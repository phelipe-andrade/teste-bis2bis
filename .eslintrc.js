module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'prefer-destructuring': 'off',
    'guard-for-in': 'off',
    'no-unsafe-finally': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
  },
};
