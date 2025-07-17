///<reference types="cypress" />

describe('Open New Account', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        // cy.takeScreenshot('Check the URL if it redirects'); 

    })
    it('Verify Open New Account Successfully', () => {
        cy.registerUser();

        cy.url().should('include', '/register.htm');
        cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');
        //Assert UI Labels and Fields
        cy.get('h1.title').should('contain', 'Open New Account');
        cy.get('form > :nth-child(1) > b').should('contain', 'What type of Account would you like to open?');
        cy.get(':nth-child(5) > b').should('contain', 'A minimum of $90.00 must be deposited into this account at time of opening. Please choose an existing account to transfer funds into the new account.');


        cy.get('#type').should('be.visible').select('SAVINGS');
        cy.get('#fromAccountId')
            .should('be.visible')
            .find('option')
            .then(($options) => {
                // Skip the first option if it's a placeholder, otherwise select the first one
                const accountValue = $options.eq(0).val();
                cy.get('#fromAccountId').select(accountValue);
            });
        cy.get('form > div > .button').should('be.visible').click();

        //Verify Account Opened
        cy.get('#openAccountResult > .title').should('contain', 'Account Opened!');
        cy.get('#openAccountResult > :nth-child(2)').should('contain', 'Congratulations, your account is now open.');
        cy.get(':nth-child(3) > b').should('contain', 'Your new account number:');
        cy.get('#newAccountId').should('be.visible').click();

        //Account Details LABELS and BUTTONS 
        cy.get('#accountDetails > .title').should('contain', 'Account Details');
        cy.get('#accountDetails > table > tbody > :nth-child(1) > [align="right"]').should('contain', 'Account Number');
        cy.get('#accountDetails > table > tbody > :nth-child(2) > [align="right"]').should('contain', 'Account Type');
        cy.get('#accountDetails > table > tbody > :nth-child(3) > [align="right"]').should('contain', 'Balance');
        cy.get('#accountDetails > table > tbody > :nth-child(4) > [align="right"]').should('contain', 'Available');
        cy.get('#accountActivity > .title').should('contain', 'Account Activity');
        cy.get(':nth-child(1) > [align="right"] > b').should('contain', 'Activity Period');
        cy.get(':nth-child(2) > [align="right"] > b').should('contain', 'Type');
        cy.get(':nth-child(3) > :nth-child(2) > .button').should('be.visible');
        cy.get('thead > tr > :nth-child(1)').should('contain', 'Date');
        cy.get('thead > tr > :nth-child(2)').should('contain', 'Transaction');
        cy.get('thead > tr > :nth-child(3)').should('contain', 'Debit (-)');
        cy.get('thead > tr > :nth-child(4)').should('contain', 'Credit (+)');

        cy.get('#accountId').should('be.visible');
        cy.get('#accountType').should('be.visible');
        cy.get('#balance').should('be.visible');
        cy.get('#availableBalance').should('be.visible');
        const expectedMonths = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        cy.get('#month')
            .should('be.visible')
            .find('option')
            .then($options => {
                const actualMonths = [...$options].map(opt => opt.text.trim());
                expect(actualMonths).to.include.members(expectedMonths);
                expect(actualMonths).to.have.length.at.least(12); // ensure at least all months are included
            });

        cy.get('#transactionType')
            .should('be.visible')
            .find('option')
            .then($options => {
                const actualOptions = [...$options].map(opt => opt.text.trim().toUpperCase());
                expect(actualOptions).to.include.members(['ALL','CREDIT', 'DEBIT']);
                expect(actualOptions).to.have.length(3); // ensure only 2 options are present
            });

        cy.get('#transactionTable > tbody > tr > :nth-child(1)').should('be.visible'); 
        cy.get('tbody > tr > :nth-child(3)').should('be.visible');
        cy.get('tbody > tr > :nth-child(4)').should('be.visible');
        cy.get('tr > :nth-child(2) > a').should('be.visible').click();


            //TRANSACTION DETAILS
        cy.get('.title').should('contain','Transaction Details');
        cy.get(':nth-child(1) > [align="right"] > b').should('contain','Transaction ID');
        cy.get(':nth-child(2) > [align="right"] > b').should('contain','Date');
        cy.get(':nth-child(3) > [align="right"] > b').should('contain','Description');
        cy.get(':nth-child(4) > [align="right"] > b').should('contain','Type');
        cy.get(':nth-child(5) > [align="right"] > b').should('contain','Amount');

        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible');
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('be.visible');
        cy.get('tbody > :nth-child(3) > :nth-child(2)').should('be.visible');
        cy.get('tbody > :nth-child(4) > :nth-child(2)').should('be.visible');
        cy.get('tbody > :nth-child(5) > :nth-child(2)').should('be.visible');

    })
})