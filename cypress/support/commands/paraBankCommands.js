import { faker } from '@faker-js/faker';

Cypress.Commands.add('registerUser', () => {
  const randomNumber = faker.string.numeric(2);
  const usernameBase = faker.internet.username(); // Note: use `userName()` not `username()`
  const username = `${usernameBase}${randomNumber}`;

  const users = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number('09#########'),
    ssn: faker.string.numeric(9),
    username: username,
    password: 'password', // static password
    repeatedPassword: 'password',
  };

  cy.get('input[id="customer.firstName"]').should('be.visible').type(users.firstName);
  cy.get('input[id="customer.lastName"]').should('be.visible').type(users.lastName);
  cy.get('input[id="customer.address.street"]').should('be.visible').type(users.address);
  cy.get('input[id="customer.address.city"]').should('be.visible').type(users.city);
  cy.get('input[id="customer.address.state"]').should('be.visible').type(users.state);
  cy.get('input[id="customer.address.zipCode"]').should('be.visible').type(users.zipCode);
  cy.get('input[id="customer.phoneNumber"]').should('be.visible').type(users.phoneNumber);
  cy.get('input[id="customer.ssn"]').should('be.visible').type(users.ssn);    
  cy.get('input[id="customer.username"]').should('be.visible').type(users.username);
  cy.get('input[id="customer.password"]').should('be.visible').type(users.password);
  cy.get('input[id="repeatedPassword"]').should('be.visible').type(users.repeatedPassword);

  cy.wrap(users).as('userData'); // allow access to the generated data later

    cy.get('[colspan="2"] > .button').should('be.visible').and('contain', 'Register').click();
    cy.url().should('include', '/register.htm');
    cy.get('@userData').then((users) => {
    cy.get('h1.title').should('contain', 'Welcome ' + users.username); 
    cy.get('#rightPanel > p').should('contain', 'Your account was created successfully. You are now logged in.');

    // cy.takeScreenshot('Successful Registration'); 
    });
});


Cypress.Commands.add('takeScreenshot', (label = 'screenshot') => {
  const today = new Date().toISOString().split('T')[0];
  const fileName = `${label}-${today}-Jr`;
  cy.screenshot(fileName);
});


