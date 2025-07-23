///<reference types="cypress" />

import AccountOverview from "../../../support/pages/ParabankAccountOverview";

const acctOverview = new AccountOverview();
describe('Account Overview', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.registerUser();

    })

    it('Verify Account Overview Page', () => {
        cy.url().should('include', '/register.htm');

        cy.openNewAccount();
        cy.get('#leftPanel > ul > :nth-child(2) > a').click();

        cy.get('#showOverview > .title').should('contain', 'Accounts Overview');
        cy.get('thead > tr > :nth-child(1)').should('contain', 'Account');
        cy.get('thead > tr > :nth-child(2)').should('contain', 'Balance*');
        cy.get('thead > tr > :nth-child(3)').should('contain', 'Available Amount');
        cy.get('[align="right"] > b').should('contain', 'Total');

        //Account number
        cy.get('tbody > tr').each(($row, index) => {
            cy.wrap($row).find('td:nth-child(1)').should('be.visible');
            cy.wrap($row).find('td:nth-child(2)').should('be.visible');
            cy.wrap($row).find('td:nth-child(3)').should('be.visible');
        });

        //Total
        cy.get(':nth-child(2) > b').should('be.visible');
        cy.get('tfoot > tr > td').should('contain', '*Balance includes deposits that may be subject to holds');
    })

    it.only('Verify if Account details is visible', () => {
        cy.url().should('include', '/register.htm');

        cy.openNewAccount();
        cy.get('#leftPanel > ul > :nth-child(2) > a').click();

       cy.get('#showOverview > .title').should('contain', 'Accounts Overview');
         cy.get('tbody > tr').each(($row, index) => {
            cy.wrap($row).find('td:nth-child(1)').should('be.visible');
            cy.wrap($row).find('td:nth-child(2)').should('be.visible');
            cy.wrap($row).find('td:nth-child(3)').should('be.visible');
        });

        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();
        // Safe screenshot
        cy.takeScreenshot('Account Overview - Account Details');

        acctOverview.verifyAccountOverviewPage();
        acctOverview.verifyAccountFormFieldsAndDropdowns();
        acctOverview.TransactionTableRows();
        acctOverview.verifyTransactionDetails();

    })
})