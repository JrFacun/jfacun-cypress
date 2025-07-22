//<reference types="cypress" />

import RegistrationPage from "../../../support/pages/ParabankRegistrationPage";

const regPage = new RegistrationPage();

describe('Open New Account', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        // cy.takeScreenshot('Check the URL if it redirects');
        cy.registerUser();

    })
    it('Verify Updating Contact Information Successfully', () => {

        cy.url().should('include', '/register.htm');
        cy.visit('https://parabank.parasoft.com/parabank/updateprofile.htm');

        //CHECK UI AND LABELS
        cy.get('#updateProfileForm > .title').should('be.visible').and('contain', 'Update Profile');
        regPage.getFirstNameLabel().should('be.visible').and('contain', 'First Name');
        regPage.getLastNameLabel().should('be.visible').and('contain', 'Last Name');
        regPage.getAddressLabel().should('be.visible').and('contain', 'Address');
        regPage.getCityLabel().should('be.visible').and('contain', 'City');
        regPage.getStateLabel().should('be.visible').and('contain', 'State');
        regPage.getZipCodeLabel().should('be.visible').and('contain', 'Zip Code');
        regPage.getPhoneLabel().should('be.visible').and('contain', 'Phone #');

        cy.get('@userData').then((user) => {
            cy.get('#customer\\.firstName').should('have.value', user.firstName);
            cy.get('#customer\\.lastName').should('have.value', user.lastName);
            cy.get('#customer\\.address\\.street').should('have.value', user.address);
            cy.get('#customer\\.address\\.city').should('have.value', user.city);
            cy.get('#customer\\.address\\.state').should('have.value', user.state);
            cy.get('#customer\\.address\\.zipCode').should('have.value', user.zipCode);
            cy.get('#customer\\.phoneNumber').should('have.value', user.phoneNumber);
        });

        cy.get('#customer\\.phoneNumber').clear().type('0929415123');
        cy.get('[colspan="2"] > .button').click();

        cy.screenshot('Update Contact Info - Changed Phone Number');

        cy.get('#updateProfileResult > .title').should('be.visible').and('contain', 'Profile Updated');
        cy.get('#updateProfileResult > p').should('be.visible').and('contain', 'Your updated address and phone number have been added to the system.');

        cy.screenshot('Update Contact Info - Success Message');
    })

    it('Verify that input fields does not accept Blank fields', () => {

        cy.get('#leftPanel > ul > :nth-child(6) > a').click();

        cy.url().should('include', '/updateprofile.htm').wait(2000);
        cy.get('#customer\\.firstName').clear();
        cy.get('#customer\\.lastName').clear();
        cy.get('#customer\\.address\\.street').clear();
        cy.get('#customer\\.address\\.city').clear();
        cy.get('#customer\\.address\\.state').clear();
        cy.get('#customer\\.address\\.zipCode').clear();
        cy.get('#customer\\.phoneNumber').clear();

        cy.get('[colspan="2"] > .button').click();

        cy.screenshot('Update Contact Info - Blank Fields');

        cy.get('#firstName-error').should('contain', 'First name is required');
        cy.get('#lastName-error').should('contain', 'Last name is required');
        cy.get('#street-error').should('contain', 'Address is required');
        cy.get('#city-error').should('contain', 'City is required');
        cy.get('#state-error').should('contain', 'State is required');
        cy.get('#zipCode-error').should('contain', 'Zip Code is required');

        cy.screenshot('Update Contact Info - Error Messages');
    })
})
