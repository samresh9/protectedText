module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ["custom"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
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
