//<reference types="cypress" />

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
        cy.get(':nth-child(1) > [align="right"] > b').should('be.visible').and('contain', 'First Name');
        cy.get(':nth-child(2) > [align="right"] > b').should('be.visible').and('contain', 'Last Name');
        cy.get(':nth-child(3) > [align="right"] > b').should('be.visible').and('contain', 'Address');
        cy.get(':nth-child(4) > [align="right"] > b').should('be.visible').and('contain', 'City');
        cy.get(':nth-child(5) > [align="right"] > b').should('be.visible').and('contain', 'State');
        cy.get(':nth-child(6) > [align="right"] > b').should('be.visible').and('contain', 'Zip Code');
        cy.get(':nth-child(7) > [align="right"] > b').should('be.visible').and('contain', 'Phone #');

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

        cy.get('#updateProfileResult > .title').should('be.visible').and('contain', 'Profile Updated');
        cy.get('#updateProfileResult > p').should('be.visible').and('contain', 'Your updated address and phone number have been added to the system.');
    })

    it('Verify User can Logout', () =>{
        
    })
})
