///<reference types="cypress" />

describe('Login Test Suite Parabank', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    })
    it('Verify the User will successfully login', () => {

        cy.url().should('include', '/register.htm');

        //Verify UI Text
        cy.get('h2').should('have.text', 'Customer Login');
        cy.get('form > :nth-child(1) > b').should('have.text', 'Username');
        cy.get('form > :nth-child(1) > b').should('have.text', 'Password');

        //Verify Input Fields
        cy.get('form > :nth-child(2) > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(4) > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(5) > .button').should('be.visible').and('not.be.disabled');

        cy.get('[name="username"]').type('Admin')
        cy.get('[name="password"]').type('password')
        cy.get('[type = "submit"]').click()
    })
})