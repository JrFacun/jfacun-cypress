import { faker } from '@faker-js/faker';
import { userData } from '../utils/parabankUtils';
import RegistrationPage from '../pages/ParabankRegistrationPage';

const users = new userData;
const regPage = new RegistrationPage();
Cypress.Commands.add('registerUser', () => {
  // const randomNumber = faker.string.numeric(2);
  // const usernameBase = faker.internet.username(); // Note: use `userName()` not `username()`
  // const username = `${usernameBase}${randomNumber}`;

  // const users = {
  //   firstName: faker.person.firstName(),
  //   lastName: faker.person.lastName(),
  //   address: faker.location.streetAddress(),
  //   city: faker.location.city(),
  //   state: faker.location.state(),
  //   zipCode: faker.location.zipCode(),
  //   phoneNumber: faker.phone.number('09#########'),
  //   ssn: faker.string.numeric(9),
  //   username: username,
  //   password: 'password', // static password
  //   repeatedPassword: 'password',
  // };

  regPage.getFirstNameInput().should('be.visible').type(users.firstName);
  regPage.getLastNameInput().should('be.visible').type(users.lastName);
  regPage.getAddressInput().should('be.visible').type(users.address);
  regPage.getCityInput().should('be.visible').type(users.city);
  regPage.getStateInput().should('be.visible').type(users.state);
  regPage.getZipCodeInput().should('be.visible').type(users.zipCode);
  regPage.getPhoneInput().should('be.visible').type(users.phoneNumber);
  regPage.getSSNInput().should('be.visible').type(users.ssn);    
  regPage.getUsernameInput().should('be.visible').type(users.username);
  regPage.getPasswordInput().should('be.visible').type(users.password);
  regPage.getConfirmPasswordInput().should('be.visible').type(users.Repeatedpassword);

    cy.wrap(users).as('userData'); // allow access to the generated data later

    cy.get('[colspan="2"] > .button').should('be.visible').and('contain', 'Register').click();
    cy.url().should('include', '/register.htm');
    cy.get('@userData').then((users) => {
    cy.get('h1.title').should('contain', 'Welcome ' + users.username); 
    cy.get('#rightPanel > p').should('contain', 'Your account was created successfully. You are now logged in.');

    cy.takeScreenshot('Successful Registration'); 
    });
});


Cypress.Commands.add('takeScreenshot', (label = 'screenshot') => {
  const today = new Date().toISOString().split('T')[0];
  const fileName = `${label}-${today}-Jr`;
  cy.screenshot(fileName);
});


