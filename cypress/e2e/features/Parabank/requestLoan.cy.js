///<reference types = "cypress" />

describe('Request Loan Suite', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.registerUser();

    })

    it('Verify Request Loan Approved', () => {
        cy.get('#leftPanel > ul > :nth-child(2) > a').click(); // Click "Accounts Overview"

        // Get all rows from the table, pick a random one, and extract the amount
        cy.get('tbody > :nth-child(1) > :nth-child(3)').then(($cells) => {
            const amounts = [...$cells].map(cell => parseFloat(cell.innerText.replace(/[^0-9.]/g, '')));
            const randomAmount = Cypress._.sample(amounts); // Pick a random value
            const finalAmount = randomAmount + 100;
            const downPayment = finalAmount / 2;

            cy.get('#leftPanel > ul > :nth-child(7) > a').click(); // Click "Request Loan"
            cy.get('#requestLoanForm > .title').should('contain', 'Apply for a Loan');

            // Fill in the form
            cy.get('#amount')
                .should('be.visible')
                .clear()
                .type(finalAmount.toFixed(2)); // Type in the loan amount

            cy.get('#downPayment')
                .should('be.visible')
                .clear()
                .type(downPayment.toFixed(2)); // Type in the down payment

            // Select a random option from the dropdown
            cy.get('#fromAccountId').then(($select) => {
                const options = $select.find('option');
                const randomOption = Cypress._.sample(options.toArray());
                cy.get('#fromAccountId').select(randomOption.value);
            });

            // Submit the loan request
            cy.get('[colspan="2"] > .button').click();

            cy.get('#requestLoanResult > .title').should('contain', 'Loan Request Processed');
            cy.get('.form > tbody > :nth-child(1) > [align="right"] > b').should('contain', 'Loan Provider');
            cy.get('.form > tbody > :nth-child(2) > [align="right"] > b').should('contain', 'Date');
            cy.get('.form > tbody > :nth-child(3) > [align="right"] > b').should('contain', 'Status');
            cy.get('#loanRequestApproved > :nth-child(1)').should('contain', 'Congratulations, your loan has been approved.');
            cy.get(':nth-child(2) > b').should('contain', 'Your new account number:');
            cy.get('#loanProviderName').should('be.visible');
            cy.get('#responseDate').should('be.visible');
            cy.get('#loanStatus').should('contain', 'Approved');
            cy.get('#newAccountId').should('be.visible');
        });
    })
    it('Verify Request Loan Denied', () => {
        cy.get('#leftPanel > ul > :nth-child(2) > a').click(); // Click "Accounts Overview"

        // Get all rows from the table, pick a random one, and extract the amount
        cy.get('tbody > :nth-child(1) > :nth-child(3)').then(($cells) => {
            const amounts = [...$cells].map(cell => parseFloat(cell.innerText.replace(/[^0-9.]/g, '')));
            const randomAmount = Cypress._.sample(amounts); // Pick a random value
            const finalAmount = randomAmount + 5000;
            const downPayment = finalAmount / 2;

            cy.get('#leftPanel > ul > :nth-child(7) > a').click(); // Click "Request Loan"
            cy.get('#requestLoanForm > .title').should('contain', 'Apply for a Loan');

            // Fill in the form
            cy.get('#amount')
                .should('be.visible')
                .clear()
                .type(finalAmount.toFixed(2)); // Type in the loan amount

            cy.get('#downPayment')
                .should('be.visible')
                .clear()
                .type(downPayment.toFixed(2)); // Type in the down payment

            // Select a random option from the dropdown
            cy.get('#fromAccountId').then(($select) => {
                const options = $select.find('option');
                const randomOption = Cypress._.sample(options.toArray());
                cy.get('#fromAccountId').select(randomOption.value);
            });

            // Submit the loan request
            cy.get('[colspan="2"] > .button').click();

            cy.get('#requestLoanResult > .title').should('contain', 'Loan Request Processed');
            cy.get('.form > tbody > :nth-child(1) > [align="right"] > b').should('contain', 'Loan Provider');
            cy.get('.form > tbody > :nth-child(2) > [align="right"] > b').should('contain', 'Date');
            cy.get('.form > tbody > :nth-child(3) > [align="right"] > b').should('contain', 'Status');
            cy.get('#loanRequestDenied > .error').should('contain', 'You do not have sufficient funds for the given down payment.');
            cy.get('#loanProviderName').should('be.visible');
            cy.get('#responseDate').should('be.visible');
            cy.get('#loanStatus').should('contain', 'Denied');
        });

    });

})