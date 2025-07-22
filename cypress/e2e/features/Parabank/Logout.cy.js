///<reference types="cypress" />

describe('Open New Account', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        // cy.takeScreenshot('Check the URL if it redirects');
        cy.registerUser();

    })
    it('Verify User can Logout', () =>{
        cy.get('#leftPanel > ul > :nth-child(8) > a').should('be.visible').and('contain', 'Log Out').click();
        cy.takeScreenshot('User Logout - Clicked Log Out');
        cy.url().should('include', '/index.htm');
    })
})
