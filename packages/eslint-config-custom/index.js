module.exports = {
  env: {
    es6: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
