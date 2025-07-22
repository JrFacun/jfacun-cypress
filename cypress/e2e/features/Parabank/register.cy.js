///<reference types="cypress" />

// import {userData } from "../../../support/utils/parabankUtils";
// import '../../../support/commands/paraBankCommands';
// import { slowCypressDown } from 'cypress-slow-down';
import RegistrationPage from "../../../support/pages/ParabankRegistrationPage";
// slowCypressDown(500, 100);

const regPage = new RegistrationPage();

describe('Register Test Suite', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.takeScreenshot('Check the URL if it redirects');

    })
    it('Verify Registration Page Elements', () => {
        // Verify URL
        cy.url().should('include', '/register.htm');
        regPage.verifyHeaderAndMenus();

        regPage.getTitle().should('contain', 'Signing up is easy!');
        regPage.getDescription().should(
            'have.text',
            'If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.'
        );

        regPage.getFirstNameLabel().should('have.text', 'First Name:');
        regPage.getLastNameLabel().should('have.text', 'Last Name:');
        regPage.getAddressLabel().should('have.text', 'Address:');
        regPage.getCityLabel().should('have.text', 'City:');
        regPage.getStateLabel().should('have.text', 'State:');
        regPage.getZipCodeLabel().should('have.text', 'Zip Code:');
        regPage.getPhoneLabel().should('have.text', 'Phone #:');
        regPage.getSSNLabel().should('have.text', 'SSN:');
        regPage.getUsernameLabel().should('have.text', 'Username:');
        regPage.getPasswordLabel().should('have.text', 'Password:');
        regPage.getConfirmPasswordLabel().should('have.text', 'Confirm:');

        regPage.verifyAllInputsAreVisibleAndEnabled();

        cy.takeScreenshot('Register Form');

          // // Verify Company Logo
        // cy.get('.logo').should('be.visible');
        // cy.get('.caption').should('contain', 'Experience the difference');
        // cy.get('.admin').should('be.visible');
        // cy.get('#headerPanel').should('be.visible');
        // cy.get('.home > a').should('be.visible');
        // cy.get('.aboutus > a').should('be.visible');
        // cy.get('.contact > a').should('be.visible');

        // //Verify Hamburger Menu
        // cy.get('.Solutions').should('have.text', 'Solutions');
        // cy.get('.leftmenu > :nth-child(2) > a').should('have.text', 'About Us').and('not.be.disabled');
        // cy.get('.leftmenu > :nth-child(3) > a').should('have.text', 'Services').and('not.be.disabled');
        // cy.get('.leftmenu > :nth-child(4) > a').should('have.text', 'Products').and('not.be.disabled');
        // cy.get('.leftmenu > :nth-child(5) > a').should('have.text', 'Locations').and('not.be.disabled');
        // cy.get('.leftmenu > :nth-child(6) > a').should('have.text', 'Admin Page').and('not.be.disabled');

        // // Verify elements on the registration page
        // cy.get('h1.title').should('contain', 'Signing up is easy!');
        // cy.get('#rightPanel > p').should('have.text','If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.');
        // cy.get(':nth-child(1) > [align="right"] > b').should('have.text', 'First Name:');
        // cy.get(':nth-child(2) > [align="right"] > b').should('have.text', 'Last Name:');
        // cy.get(':nth-child(3) > [align="right"] > b').should('have.text', 'Address:');
        // cy.get(':nth-child(4) > [align="right"] > b').should('have.text', 'City:');
        // cy.get(':nth-child(5) > [align="right"] > b').should('have.text', 'State:');
        // cy.get(':nth-child(6) > [align="right"] > b').should('have.text', 'Zip Code:');
        // cy.get(':nth-child(7) > [align="right"] > b').should('have.text', 'Phone #:');
        // cy.get(':nth-child(8) > [align="right"] > b').should('have.text', 'SSN:');
        // cy.get(':nth-child(10) > [align="right"] > b').should('have.text', 'Username:');
        // cy.get(':nth-child(11) > [align="right"] > b').should('have.text', 'Password:');
        // cy.get(':nth-child(12) > [align="right"] > b').should('have.text', 'Confirm:');

        // //Verify input fields
        // cy.get('input[id="customer.firstName"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.lastName"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.address.street"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.address.city"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.address.state"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.address.zipCode"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.phoneNumber"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.ssn"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.username"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="customer.password"]').should('be.visible').and('not.be.disabled');
        // cy.get('input[id="repeatedPassword"]').should('be.visible').and('not.be.disabled');

        // cy.get('input[value="Register"]').should('be.visible');
        
    })
  
    it('Verify Successful Registration', () => {
        cy.registerUser();
        cy.takeScreenshot('Before Submitting Details');
        cy.takeScreenshot('Successful Registration'); 
    })

    it('Verify Password Confirmation Mismatch', () => {
        // Fill in the registration form with mismatched passwords
        regPage.getFirstNameInput().type('John');
        regPage.getLastNameInput().type('Doe');
        regPage.getAddressInput().type('123 Main St');
        regPage.getCityInput().type('Anytown');
        regPage.getStateInput().type('CA');
        regPage.getZipCodeInput().type('12345');
        regPage.getPhoneInput().type('555-1234');
        regPage.getSSNInput().type('123456789');
        regPage.getUsernameInput().type('johndoe');
        regPage.getPasswordInput().type('password123');
        regPage.getConfirmPasswordInput().type('differentpassword');



        // Click the Register button
        regPage.getRegisterButton().click();

        // Assert that the error message is displayed
        regPage.getConfirmPasswordError().should('contain', 'Passwords did not match.');

        cy.takeScreenshot('Password Mismatch Error');

        // Verify still on registration page
        cy.url().should('include', '/register.htm');
    })


    it('Verify for Required Blank Fields', () => {
        // Click the Register button without filling any fields
        regPage.getRegisterButton().click();

        // Assert that each field shows the correct error message
        regPage.getFirstNameError().should('contain', 'First name is required.');
        regPage.getLastNameError().should('contain', 'Last name is required.');
        regPage.getAddressError().should('contain', 'Address is required.');
        regPage.getCityError().should('contain', 'City is required.');
        regPage.getStateError().should('contain', 'State is required.');
        regPage.getZipCodeError().should('contain', 'Zip Code is required.');
        regPage.getSSNError().should('contain', 'Social Security Number is required.');
        regPage.getUsernameError().should('contain', 'Username is required.');
        regPage.getPasswordError().should('contain', 'Password is required.');
        regPage.getConfirmPasswordError().should('contain', 'Password confirmation is required.');

        cy.takeScreenshot('Error required fields');

        // Verify still on registration page
        cy.url().should('include', '/register.htm');

         // // Assert that each field shows the correct error message
        // cy.get('#customer\\.firstName\\.errors').should('contain', 'First name is required.');
        // cy.get('#customer\\.lastName\\.errors').should('contain', 'Last name is required.');
        // cy.get('#customer\\.address\\.street\\.errors').should('contain', 'Address is required.');
        // cy.get('#customer\\.address\\.city\\.errors').should('contain', 'City is required.');
        // cy.get('#customer\\.address\\.state\\.errors').should('contain', 'State is required.');
        // cy.get('#customer\\.address\\.zipCode\\.errors').should('contain', 'Zip Code is required.');
        // cy.get('#customer\\.ssn\\.errors').should('contain', 'Social Security Number is required.');
        // cy.get('#customer\\.username\\.errors').should('contain', 'Username is required.');
        // cy.get('#customer\\.password\\.errors').should('contain', 'Password is required.');
        // cy.get('#repeatedPassword\\.errors').should('contain', 'Password confirmation is required.');

        
    });

      //Verify Registration with valid data using fixture
    // it('Verify Successful Registration', () => {
    //     // Load customer data from fixture
    //     cy.fixture('user').then((user) => {
    //        const users = user[0]
    //         // Fill in the registration form
    //         cy.get('input[id="customer.firstName"]').type(users.firstName);
    //         cy.get('input[id="customer.lastName"]').type(users.lastName);
    //         cy.get('input[id="customer.address.street"]').type(users.address);
    //         cy.get('input[id="customer.address.city"]').type(users.city);
    //         cy.get('input[id="customer.address.state"]').type(users.state);
    //         cy.get('input[id="customer.address.zipCode"]').type(users.zipCode);
    //         cy.get('input[id="customer.phoneNumber"]').type(users.phoneNumber);
    //         cy.get('input[id="customer.ssn"]').type(users.ssn);
    //         cy.get('input[id="customer.username"]').type(users.username);
    //         cy.get('input[id="customer.password"]').type(users.password);
    //         cy.get('input[id="repeatedPassword"]').type(users.confirmPassword);

    //         // Submit the registration form
    //         cy.get('[colspan="2"] > .button').should('be.visible').and('contain', 'Register').click();
    //         cy.url().should('include', '/register.htm');
    //         // Verify successful registration
    //         // cy.get('.title').should('contain', 'Welcome ' + users.username);
    //     });
    // })
})
