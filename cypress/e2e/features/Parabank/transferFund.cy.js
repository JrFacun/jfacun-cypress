///<reference types="cypress" />

describe('Transfer Funds', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.registerUser();
    });

    it('Verify Transfer Funds Successfully', () => {
  cy.url().should('include', '/register.htm');

  cy.openNewAccount();
  cy.get('#leftPanel > ul > :nth-child(3) > a').click();

  cy.get('#showForm > .title').should('contain', 'Transfer Funds');
  cy.get('#transferForm > p > b').should('contain', 'Amount:');
  cy.get('#transferForm > :nth-child(2)').should('be.visible');


  const transferAmount = Math.floor(Math.random() * 1000) + 1; // 1 - 1000
  cy.get('#amount')
    .should('be.visible')
    .should('not.be.disabled')
    .clear()
    .type(transferAmount.toString());

  let fromAccount, toAccount;

  // First get both from and to account values together
  cy.get('#fromAccountId option').then(($fromOptions) => {
    fromAccount = $fromOptions.eq(0).val();
    cy.get('#fromAccountId').select(fromAccount);

    cy.get('#toAccountId option').then(($toOptions) => {
      toAccount = $toOptions.eq(1).val();
      cy.get('#toAccountId').select(toAccount);

      // Submit transfer
      cy.get(':nth-child(4) > .button').should('be.visible').click();

      //Verify Transfer Result inside this same closure
      cy.get('#showResult > .title').should('contain', 'Transfer Complete!');
      cy.get('#amountResult').should('contain', transferAmount.toString());
      cy.get('#fromAccountIdResult').should('contain', fromAccount);
      cy.get('#toAccountIdResult').should('contain', toAccount);
    });
  });

  cy.get('#showResult > :nth-child(3)').should('contain', 'See Account Activity for more details.');
});

})
