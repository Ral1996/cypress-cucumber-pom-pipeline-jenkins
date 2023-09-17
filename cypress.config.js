const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Report-Testing-Results",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  video: false,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on), on("file:preprocessor", cucumber());
      
      // implement node event listeners here, before and after
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      // config environments
      var version = config.env.version || "staging";
      var urls = {
        local: "https://www.saucedemo.com/",
        staging: "https://www.saucedemo.com/",
        prod: "https://www.saucedemo.com/",
      };

      // choosing version from urls object
      config.baseUrl = urls[version];

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature", // , ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"]
    supportFile: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
  },
});
