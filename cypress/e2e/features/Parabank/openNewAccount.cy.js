///<reference types="cypress" />

import AccountOverview from "../../../support/pages/ParabankAccountOverview";


const acctOverview = new AccountOverview();

describe('Open New Account', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        // cy.takeScreenshot('Check the URL if it redirects'); 
        cy.registerUser();

    })
    it('Verify Open New Account Successfully', () => {
        cy.openNewAccount();
        cy.get('#newAccountId').should('be.visible').click();

        //Account Details LABELS and BUTTONS 
        cy.takeScreenshot('Open New Account - Account Details');
        cy.wait(1000); // wait for the page to load
        acctOverview.verifyAccountDetails();

        // cy.get('#accountDetails > .title').should('contain', 'Account Details');
        // cy.get('#accountDetails > table > tbody > :nth-child(1) > [align="right"]').should('contain', 'Account Number');
        // cy.get('#accountDetails > table > tbody > :nth-child(2) > [align="right"]').should('contain', 'Account Type');
        // cy.get('#accountDetails > table > tbody > :nth-child(3) > [align="right"]').should('contain', 'Balance');
        // cy.get('#accountDetails > table > tbody > :nth-child(4) > [align="right"]').should('contain', 'Available');
        // cy.get('#accountActivity > .title').should('contain', 'Account Activity');
        // cy.get(':nth-child(1) > [align="right"] > b').should('contain', 'Activity Period');
        // cy.get(':nth-child(2) > [align="right"] > b').should('contain', 'Type');
        // cy.get(':nth-child(3) > :nth-child(2) > .button').should('be.visible');
        // cy.get('thead > tr > :nth-child(1)').should('contain', 'Date');
        // cy.get('thead > tr > :nth-child(2)').should('contain', 'Transaction');
        // cy.get('thead > tr > :nth-child(3)').should('contain', 'Debit (-)');
        // cy.get('thead > tr > :nth-child(4)').should('contain', 'Credit (+)');'

        acctOverview.verifyAccountFormFieldsAndDropdowns();
        acctOverview.validateTransactionTableRows();

        //TRANSACTION DETAILS
        cy.takeScreenshot('Open New Account - Transaction Details');
        acctOverview.verifyTransactionDetails();
        // cy.get('.title').should('contain', 'Transaction Details');
        // cy.get(':nth-child(1) > [align="right"] > b').should('contain', 'Transaction ID');
        // cy.get(':nth-child(2) > [align="right"] > b').should('contain', 'Date');
        // cy.get(':nth-child(3) > [align="right"] > b').should('contain', 'Description');
        // cy.get(':nth-child(4) > [align="right"] > b').should('contain', 'Type');
        // cy.get(':nth-child(5) > [align="right"] > b').should('contain', 'Amount');

        // cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible');
        // cy.get('tbody > :nth-child(2) > :nth-child(2)').should('be.visible');
        // cy.get('tbody > :nth-child(3) > :nth-child(2)').should('be.visible');
        // cy.get('tbody > :nth-child(4) > :nth-child(2)').should('be.visible');
        // cy.get('tbody > :nth-child(5) > :nth-child(2)').should('be.visible');

    })
})