module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["custom"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  settings: {
    react: { version: "18.2" },
  },
  rules: {},
};
