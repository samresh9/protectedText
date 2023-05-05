module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": 0,
    "no-console": "off",
    "eol-last": ["warn", "always"],
    "prettier/prettier": "error",
    quotes: ["error", { preference: "double" }],
  },
};
