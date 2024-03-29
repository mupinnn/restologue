const { setHeadlessWhen } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "e2e/**/*.spec.js",
  output: "e2e/output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:8080",
      show: true,
      windowSize: "1200x900",
      waitForNavigation: "load",
      restart: false,
    },
  },
  include: {
    I: "./steps_file.js",
  },
  bootstrap: null,
  mocha: {},
  name: "restologue",
  plugins: {
    pauseOnFail: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
