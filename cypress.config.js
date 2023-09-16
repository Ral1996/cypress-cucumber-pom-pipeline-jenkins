const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  // implement node event listeners here
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Report-Testing",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  video: false,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {
      var version = config.env.version || "staging";
      var urls = {
        local: "https://www.saucedemo.com/",
        staging: "https://www.saucedemo.com/",
        prod: "https://www.saucedemo.com/",
      };

      // choosing version from urls object
      config.baseUrl = urls[version];

      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on),
        on("file:preprocessor", cucumber());

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature", // , ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"]
    supportFile: false,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 10000,
  },
});
