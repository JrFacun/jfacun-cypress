///<reference types="cypress" />
// import { slowCypressDown }  from 'cypress-slow-down';

// slowCypressDown(500, 100);

describe('Successful Login Test Suite', () => {
  it('Verify Successful Login', () => {
   
    //Verify URL 
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Verify Company Logo
    cy.get('.orangehrm-login-branding > img').should('be.visible');
    cy.get('.orangehrm-login-logo > img').should('be.visible');

    //Verify elements on the login page
    cy.get('.oxd-text--h5').and('contain','Login');
    cy.get('.oxd-sheet > :nth-child(1)').should('contain', 'Username : Admin');
    cy.get('.oxd-sheet > :nth-child(2)').should('contain', 'Password : admin123');
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-icon').should('be.visible');
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label').should('contain', 'Username');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible');
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-icon').should('be.visible');
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label').should('contain', 'Password');
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible');
    cy.get('.oxd-button').should('be.visible');
    cy.get('.orangehrm-login-forgot > .oxd-text').should('contain', 'Forgot Your Password?');
    cy.get('.orangehrm-copyright-wrapper > :nth-child(1)').should('contain','OrangeHRM OS 5.7');
    cy.get('.orangehrm-login-footer-sm').should('be.visible');


    //Perform login
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('[type = "submit"]').click()
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    cy.wait(3000); 
  })
  
})

