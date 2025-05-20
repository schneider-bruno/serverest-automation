const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: ['cypress/e2e/**/*.cy.{js,ts}', 'cypress/api/**/*.cy.{js,ts}'],
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1000,
    viewportHeight: 660
  },
  env: {
    grepFilterSpecs: true,
    apiBaseUrl: 'https://serverest.dev'
  },
  reporter: 'mochawesome',
});
