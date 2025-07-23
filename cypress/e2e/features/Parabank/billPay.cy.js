///<reference types="cypress" />    

describe('Bill Pay Suite', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.registerUser();
        cy.url().should('include', '/register.htm');
        cy.openNewAccount();
    })
    it('Verify Bill Pay Successfully', () => {  
        cy.billPayInput();
    })
    it('Should verify that it will not allow to pay with empty fields', () => {
        cy.get('#leftPanel > ul > :nth-child(4) > a').click(); // Click "Bill Pay"
        cy.get('#billpayForm > .title').should('contain', 'Bill Payment Service');
        cy.get(':nth-child(14) > :nth-child(2) > .button').should('be.visible').click();

        // ✅ Assertions after submission
        cy.get('#validationModel-name').should('contain', 'Payee name is required.');
        cy.get('#validationModel-address').should('contain', 'Address is required.');
        cy.get('#validationModel-city').should('contain', 'City is required.');
        cy.get('#validationModel-state').should('contain', 'State is required.');
        cy.get('#validationModel-zipCode').should('contain', 'Zip Code is required.');
        cy.get('#validationModel-phoneNumber').should('contain', 'Phone number is required.');
        cy.get('#validationModel-account-empty').should('contain', 'Account number is required.');
        cy.get('#validationModel-verifyAccount-empty').should('contain', 'Account number is required.');
        cy.get('#validationModel-amount-empty').should('contain', 'The amount cannot be empty.');
    })

    it('Should verify the account number mismatch', () => {
        cy.get('#leftPanel > ul > :nth-child(4) > a').click(); // Click "Bill Pay"
        cy.get('#billpayForm > .title').should('contain', 'Bill Payment Service');

        // Fill in the form with mismatched account numbers
        cy.get(':nth-child(1) > [width="20%"] > .input').type('Test Payee');
        cy.get(':nth-child(2) > [width="20%"] > .input').type('123 Main St');
        cy.get(':nth-child(3) > [width="20%"] > .input').type('Anytown');
        cy.get(':nth-child(4) > [width="20%"] > .input').type('CA');
        cy.get(':nth-child(5) > [width="20%"] > .input').type('90210');
        cy.get(':nth-child(6) > [width="20%"] > .input').type('555-1234');
        cy.get(':nth-child(8) > :nth-child(2) > .input').type('1234567890'); // Account number
        cy.get(':nth-child(9) > [width="20%"] > .input').type('0987654321'); // Mismatched account number
        cy.get(':nth-child(11) > [width="20%"] > .input')
            .should('be.visible')
            .should('not.be.disabled')
            .clear()
            .type('100'); // Amount

        // Handle fromAccount and form submission
        cy.get(':nth-child(13) > :nth-child(2) > .input').then(($fromAccount) => {
            const account = $fromAccount.val();
            cy.get(':nth-child(13) > :nth-child(2) > .input').select(account);
            cy.get(':nth-child(14) > :nth-child(2) > .button').should('be.visible').click();

            // ✅ Assertions after submission
            cy.get('#validationModel-verifyAccount-mismatch').should('contain', 'The account numbers do not match.');
        });
    })

    it('Verify Bill Payment amount does not accept invalid format', () => {
        cy.get('#leftPanel > ul > :nth-child(4) > a').click(); // Click "Bill Pay"
        cy.get('#billpayForm > .title').should('contain', 'Bill Payment Service');

        // Fill in the form with mismatched account numbers
        cy.get(':nth-child(1) > [width="20%"] > .input').type('Test Payee');
        cy.get(':nth-child(2) > [width="20%"] > .input').type('123 Main St');
        cy.get(':nth-child(3) > [width="20%"] > .input').type('Anytown');
        cy.get(':nth-child(4) > [width="20%"] > .input').type('CA');
        cy.get(':nth-child(5) > [width="20%"] > .input').type('90210');
        cy.get(':nth-child(6) > [width="20%"] > .input').type('555-1234');
        cy.get(':nth-child(8) > :nth-child(2) > .input').type('12345'); // Account number
        cy.get(':nth-child(9) > [width="20%"] > .input').type('12345'); // Mismatched account number
        cy.get(':nth-child(11) > [width="20%"] > .input')
            .should('be.visible')
            .should('not.be.disabled')
            .clear()
            .type('invalid-format'); // Amount

        // Handle fromAccount and form submission
        cy.get(':nth-child(13) > :nth-child(2) > .input').then(($fromAccount) => {
            const account = $fromAccount.val();
            cy.get(':nth-child(13) > :nth-child(2) > .input').select(account);
            cy.get(':nth-child(14) > :nth-child(2) > .button').should('be.visible').click();

            // ✅ Assertions after submission
           cy.get('#validationModel-amount-invalid').should('contain', 'Please enter a valid amount.');
        });
    })
})
