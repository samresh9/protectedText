module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  //extends: ["custom"],

  env: {
    es6: true,
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
