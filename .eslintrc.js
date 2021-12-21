module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "off",
    "import/prefer-default-export": "off",
  },
  settings: {
    "import/resolver": {
      jsconfig: {
        config: "jsconfig.json",
        extensions: [".js", ".json", ".css", ".scss"],
      },
    },
  },
};
