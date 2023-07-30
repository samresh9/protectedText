module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ["next", "turbo", "airbnb-base", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    babelOptions: {
      presets: [require.resolve("next/babel")],
      // "sourceType": "module",
      // "allowImportExportEverywhere": true
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "linebreak-style": ["error", "unix"],
    "eol-last": ["warn", "always"],
    "no-console": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
  },
};
