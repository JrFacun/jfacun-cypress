///<reference types="cypress" />

import AccountOverview from "../../../support/pages/ParabankAccountOverview";

const overview = new AccountOverview();
describe('Find Transaction Suite', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.registerUser();
        cy.openNewAccount();
    })

    it('Verify Find Transaction by ID Successfully', () => {
        cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

        overview.TransactionTableRows();

        cy.get('tbody > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
            const extractedID = text.trim();

            cy.get('#leftPanel > ul > :nth-child(5) > a').click(); // Navigate to Find Transactions

            cy.get(':nth-child(3) > b').should('contain', 'Find by Transaction ID');

            cy.get('#transactionId')
                .should('be.visible')
                .clear()
                .type(extractedID);

            // Optional: submit the search form if there's a search button
            cy.get('#findById').should('not.be.disabled').click();
            cy.takescreenshot('Find Transaction - By ID');
        });
    })
    it('Verify Find Transaction by Date Successfully in correct format', () => {
        // cy.url().should('include', '/register.htm');

        cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

        overview.TransactionTableRows();

        cy.get('tbody > :nth-child(2) > :nth-child(2)').invoke('text').then((text) => {
            const extractedText = text.trim(); // example: "07-15-2025" or similar

            cy.get('#leftPanel > ul > :nth-child(5) > a').click(); // Navigate to Find Transactions

            cy.get(':nth-child(7) > b').should('contain', 'Find by Date');

            cy.get('#transactionDate')
                .should('be.visible')
                .clear()
                .type(extractedText);

            // Optional: submit the search form if there's a search button
            cy.get('#findByDate').should('not.be.disabled').click();
            cy.takescreenshot('Find Transaction - By Date');

            // Optional: verify results
            cy.get('table').should('contain', extractedText);

            cy.get('#resultContainer > .title').should('contain', 'Transaction Results');
            overview.FindTransactionTableRows();
        });
    });

    it('Verify Find Transaction by Date Range Successfully in correct format', () => {
        cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

        overview.TransactionTableRows();

        cy.get('tbody > :nth-child(2) > :nth-child(2)').invoke('text').then((text) => {
            const extractedText = text.trim(); // example: "07-15-2025"

            cy.get('#leftPanel > ul > :nth-child(5) > a').click(); // Navigate to Find Transactions
            cy.get(':nth-child(11) > p > b').should('contain', 'Find by Date Range');

            // Generate a random date that is not today
            const today = new Date();
            const randomPastDate = new Date(today);
            const randomOffset = Math.floor(Math.random() * 10) + 1; // 1-10 days ago
            randomPastDate.setDate(today.getDate() - randomOffset);

            // Format to MM-DD-YYYY (same as `extractedText` format)
            const formattedRandomDate = `${String(randomPastDate.getMonth() + 1).padStart(2, '0')}-${String(randomPastDate.getDate()).padStart(2, '0')}-${randomPastDate.getFullYear()}`;

            // Fill in the date range
            cy.get('#fromDate')
                .should('be.visible')
                .clear()
                .type(formattedRandomDate);

            cy.get('#toDate')
                .should('be.visible')
                .clear()
                .type(extractedText);

            // Click Find button
            cy.get('#findByDateRange').should('not.be.disabled').click();
            cy.takescreenshot('Find Transaction - By Date Range');

            // Assert result
            cy.get('table').should('contain', extractedText);
            cy.get('#resultContainer > .title').should('contain', 'Transaction Results');
            overview.FindTransactionTableRows();
        });
    });



    it('Verify Find Transaction by Amount Successfully in correct format', () => {
        // cy.url().should('include', '/register.htm');

        cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

        overview.TransactionTableRows();

        cy.get('tbody > :nth-child(5) > :nth-child(2)').invoke('text').then((text) => {
            const extractedAmount = text.replace(/[^\d.]/g, '').trim();

            cy.get('#leftPanel > ul > :nth-child(5) > a').click();

            cy.get(':nth-child(15) > b').should('contain', 'Find by Amount');

            cy.get('#amount')
                .should('be.visible')
                .clear()
                .type(extractedAmount);

            // Optional: submit the search form if there's a search button
            cy.get('#findByAmount').should('not.be.disabled').click();
            cy.takescreenshot('Find Transaction - By Amount');

            // Optional: verify results
            cy.get('table').should('contain', extractedAmount);

            cy.get('#resultContainer > .title').should('contain', 'Transaction Results');
            overview.FindTransactionTableRows();
        });
    });

    it.only('Verify Find Transaction by Amount does not accept invalid format', () => {
        // cy.url().should('include', '/register.htm');

        cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
        cy.get('#leftPanel > ul > :nth-child(5) > a').click();
        cy.get('#amount').type('invalid-amount');

        // Optional: submit the search form if there's a search button
        cy.get('#findByAmount').should('not.be.disabled').click();
        cy.takeScreenshot('Find Transaction - Invalid Amount Format');
        cy.get('#amountError').should('be.visible').and('contain', 'Invalid amount');


    });




})