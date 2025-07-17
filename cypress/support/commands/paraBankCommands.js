Cypress.Commands.add('takeScreenshot', (label = 'screenshot') => {
  const today = new Date().toISOString().split('T')[0];
  const fileName = `${label}-${today}`;
  cy.screenshot(fileName);
});
