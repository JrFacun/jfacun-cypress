///<reference types="cypress" />    

describe('Bill Pay Suite', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.registerUser();

    })

    it('Verify Bill Pay Successfully', () => {  
        cy.url().should('include', '/register.htm');
        cy.openNewAccount();
        cy.billPayInput();

    })


})
