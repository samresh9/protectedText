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
  settings: {
    react: {
      version: "18.2.0",
    },
    rules: {
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
    parserOptions: {
      ecmaVersion: "latest",
    },
  },
};
