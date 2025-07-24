import { faker } from '@faker-js/faker';
import { userData } from '../utils/parabankUtils';
import RegistrationPage from '../pages/ParabankRegistrationPage';
import { billData } from '../utils/paraBank_Billpay_Faker';


const regPage = new RegistrationPage();
const billPayInput = new billData;

Cypress.Commands.add('takeScreenshot', (label = 'screenshot') => {
  const now = new Date();

  // Format date as YYYY-MM-DD
  const date = now.toISOString().split('T')[0];

  // Format time as HH-MM-SS (replace ":" with "-" for file name safety)
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');

  const fileName = `${label}-${date}_${time}-Jr`;

  cy.screenshot(fileName, { capture: 'viewport' }); // 'viewport' avoids the RangeError
});


Cypress.Commands.add('registerUser', () => {
  const users = new userData();
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

    
    });
});

Cypress.Commands.add('billPayInput', () => {
   cy.get('#leftPanel > ul > :nth-child(4) > a').click();
        cy.get('#billpayForm > .title').should('contain', 'Bill Payment Service');
        cy.get('#billpayForm > p').should('contain', 'Enter payee information');

        cy.get(':nth-child(1) > [align="right"] > b').should('contain', 'Payee Name');
        cy.get(':nth-child(2) > [align="right"] > b').should('contain', 'Address');
        cy.get(':nth-child(3) > [align="right"] > b').should('contain', 'City');
        cy.get(':nth-child(4) > [align="right"] > b').should('contain', 'State');
        cy.get(':nth-child(5) > [align="right"] > b').should('contain', 'Zip Code');
        cy.get(':nth-child(6) > [align="right"] > b').should('contain', 'Phone #:');
        cy.get(':nth-child(8) > [align="right"] > b').should('contain', 'Account #');
        cy.get(':nth-child(9) > [align="right"] > b').should('contain', 'Verify Account #');
        cy.get(':nth-child(11) > [align="right"] > b').should('contain', 'Amount: $');

        cy.get(':nth-child(13) > [align="right"] > b').should('contain', 'From account #:');

        cy.takeScreenshot('Bill Pay - Initial Load');
  // Set test data
  const payeeName = billPayInput.payeeName;
  const address = billPayInput.address;
  const city = billPayInput.city;
  const state = billPayInput.state;
  const zipCode = billPayInput.zipCode;
  const phoneNumber = billPayInput.phoneNumber;
  const accountNumber = billPayInput.accountNumber;
  const verifyAccountNumber = billPayInput.verifyAccountNumber;

  // Generate random amount
  const amount = Math.floor(Math.random() * 1000) + 1;

  // Fill inputs
  cy.get(':nth-child(1) > [width="20%"] > .input').type(payeeName);
  cy.get(':nth-child(2) > [width="20%"] > .input').type(address);
  cy.get(':nth-child(3) > [width="20%"] > .input').type(city);
  cy.get(':nth-child(4) > [width="20%"] > .input').type(state);
  cy.get(':nth-child(5) > [width="20%"] > .input').type(zipCode);
  cy.get(':nth-child(6) > [width="20%"] > .input').type(phoneNumber);
  cy.get(':nth-child(8) > :nth-child(2) > .input').type(accountNumber);
  cy.get(':nth-child(9) > [width="20%"] > .input').type(verifyAccountNumber);
  cy.get(':nth-child(11) > [width="20%"] > .input')
    .should('be.visible')
    .should('not.be.disabled')
    .clear()
    .type(amount.toString());

  // Handle fromAccount and form submission
  cy.get(':nth-child(13) > :nth-child(2) > .input').then(($fromAccount) => {
    const account = $fromAccount.val();
    cy.get(':nth-child(13) > :nth-child(2) > .input').select(account);
    cy.takeScreenshot('Bill Pay - Filled Inputs');
    cy.get(':nth-child(14) > :nth-child(2) > .button').should('be.visible').click();

    // ✅ Assertions after submission
    cy.get('#billpayResult > .title').should('contain', 'Bill Payment Complete');
    cy.takeScreenshot('Bill Pay - Submission Result');
    // Check result values match inputs
    cy.get('#payeeName').should('contain', payeeName);
    cy.get('#amount').should('contain', amount.toString());
    cy.get('#fromAccountId').should('contain', account);
  });
  cy.get('#billpayResult > :nth-child(3)').should('contain', 'See Account Activity for more details.');
});

Cypress.Commands.add('openNewAccount', () => {
    cy.url().should('include', '/register.htm');
    cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');

    // Assert UI Labels and Fields
    cy.get('h1.title').should('contain', 'Open New Account');
    cy.get('form > :nth-child(1) > b').should('contain', 'What type of Account would you like to open?');
    cy.get(':nth-child(5) > b').should('be.visible');

    const accountTypes = ['SAVINGS', 'CHECKING'];
    const randomType = accountTypes[Math.floor(Math.random() * accountTypes.length)];

    cy.get('#type').should('be.visible').select(randomType);
    cy.get('#fromAccountId')
        .should('be.visible')
        .find('option')
        .then(($options) => {
            const accountValue = $options.eq(0).val();
            cy.get('#fromAccountId').select(accountValue);
        });

    // Safe screenshot
    cy.takeScreenshot('Open New Account - Select Account Type and From Account');

    cy.get('form > div > .button').should('be.visible').click();

    cy.takeScreenshot('Open New Account - Success Message');

    // Verify Account Opened
    cy.get('#openAccountResult > .title').should('contain', 'Account Opened!');
    cy.get('#openAccountResult > :nth-child(2)').should('contain', 'Congratulations, your account is now open.');
    cy.get(':nth-child(3) > b').should('contain', 'Your new account number:');
});




