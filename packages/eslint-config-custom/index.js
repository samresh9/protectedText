module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ["**/dist/*"],
  extends: ["airbnb-base", "plugin:prettier/recommended", "prettier", "turbo"],
  plugins: ["react-refresh", "import"],

  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "max-len": ["error", { ignoreComments: true, ignoreStrings: true }],
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
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
