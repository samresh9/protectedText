module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["eslint-config-custom"],

  // env: {
  //   es2021: true,
  //   node: true,
  // },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
