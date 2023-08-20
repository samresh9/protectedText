module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "custom",
  ],
  ignorePatterns: ["dist"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  settings: {
    react: { version: "18.2" },
  },
  rules: {
    // "import/no-extraneous-dependencies": ["error", { Dependencies: true }],
  },
};
