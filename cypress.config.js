const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // viewportHeight: 1080,
  // viewportWidth: 1920,
  watchForFileChanges:false,
  experimentalStudio: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
