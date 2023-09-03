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
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on),
        on("file:preprocessor", cucumber());
    },
    specPattern: ["cypress/e2e/*.feature", "cypress/e2e/*.cy.{js,jsx,ts,tsx}"],
  },
});
