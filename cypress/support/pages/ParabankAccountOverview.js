class AccountOverview {


    //Open New Account 

    AccountNumberLabel = '#accountDetails > table > tbody > :nth-child(1) > [align="right"]';
    AccountTypeLabel = '#accountDetails > table > tbody > :nth-child(2) > [align="right"]';
    BalanceLabel = '#accountDetails > table > tbody > :nth-child(3) > [align="right"]';
    AvailableAmountLabel = '#accountDetails > table > tbody > :nth-child(4)';
    AccountActivityLabel = '#accountActivity > .title';
    ActivityPeriodLabel = ':nth-child(1) > [align="right"] > b';
    TypeLabel = ':nth-child(2) > [align="right"] > b';
    AccountDetailsButton = ':nth-child(3) > :nth-child(2) > .button';
    DateLabel = 'thead > tr > :nth-child(1)';
    TransactionLabel = 'thead > tr > :nth-child(2)';
    DebitLabel = 'thead > tr > :nth-child(3)';
    CreditLabel = 'thead > tr > :nth-child(4)';

    accountIdInput = '#accountId';
    accountTypeInput = '#accountType';
    balanceInput = '#balance';
    availableBalanceInput = '#availableBalance';
    monthSelect = '#month';
    transactionTypeSelect = '#transactionType';


    transactionDetailsLink = 'tr > :nth-child(2) > a';
    transactionDetailsTitle = '.title';
    transactionIdLabel = ':nth-child(1) > [align="right"] > b';
    transactionDateLabel = ':nth-child(2) > [align="right"] > b';
    transactionDescriptionLabel = ':nth-child(3) > [align="right"] > b';
    transactionTypeLabel = ':nth-child(4) > [align="right"] > b';
    transactionAmountLabel = ':nth-child(5) > [align="right"] > b';

    transactionDetailsRows = 'tbody > :nth-child(1) > :nth-child(2), tbody > :nth-child(2) > :nth-child(2), tbody > :nth-child(3) > :nth-child(2), tbody > :nth-child(4) > :nth-child(2), tbody > :nth-child(5) > :nth-child(2)';

    getAccountNumberLabel() {
        return cy.get(this.AccountNumberLabel);
    }
    getAccountTypeLabel() {
        return cy.get(this.AccountTypeLabel);
    }
    getBalanceLabel() {
        return cy.get(this.BalanceLabel);
    }
    getAvailableAmountLabel() {
        return cy.get(this.AvailableAmountLabel);
    }
    getAccountActivityLabel() {
        return cy.get(this.AccountActivityLabel);
    }

    getActivityPeriodLabel() {
        return cy.get(this.ActivityPeriodLabel);
    }
    getTypeLabel() {
        return cy.get(this.TypeLabel);
    }
    getAccountDetailsButton() {
        return cy.get(this.AccountDetailsButton);
    }
    getDateLabel() {
        return cy.get(this.DateLabel);
    }
    getTransactionLabel() {
        return cy.get(this.TransactionLabel);
    }
    getDebitLabel() {
        return cy.get(this.DebitLabel);
    }
    getCreditLabel() {
        return cy.get(this.CreditLabel);
    }
    getAccountIdInput() {
        return cy.get(this.accountIdInput);
    }
    getAccountTypeInput() {
        return cy.get(this.accountTypeInput);
    }
    getBalanceInput() {
        return cy.get(this.balanceInput);
    }
    getAvailableBalanceInput() {
        return cy.get(this.availableBalanceInput);
    }
    getMonthSelect() {
        return cy.get(this.monthSelect);
    }
    getTransactionTypeSelect() {
        return cy.get(this.transactionTypeSelect);
    }
    getTransactionTableRows() {
        return cy.get(this.transactionTableRows);
    }
    getTransactionDetailsLink() {
        return cy.get(this.transactionDetailsLink);
    }
    getTransactionDetailsTitle() {
        return cy.get(this.transactionDetailsTitle);
    }
    getTransactionIdLabel() {
        return cy.get(this.transactionIdLabel);
    }
    getTransactionDateLabel() {
        return cy.get(this.transactionDateLabel);
    }
    getTransactionDescriptionLabel() {
        return cy.get(this.transactionDescriptionLabel);
    }
    getTransactionTypeLabel() {
        return cy.get(this.transactionTypeLabel);
    }
    getTransactionAmountLabel() {
        return cy.get(this.transactionAmountLabel);
    }
    getTransactionDetailsRows() {
        return cy.get(this.transactionDetailsRows);
    }
    verifyAccountDetails() {
        this.getAccountNumberLabel().should('be.visible');
        this.getAccountTypeLabel().should('be.visible');
        this.getBalanceLabel().should('be.visible');
        this.getAvailableAmountLabel().should('be.visible');
        this.getAccountActivityLabel().should('contain', 'Account Activity');
        this.getActivityPeriodLabel().should('contain', 'Activity Period');
        this.getTypeLabel().should('contain', 'Type');
        this.getDateLabel().should('contain', 'Date');
        this.getTransactionLabel().should('contain', 'Transaction');
        this.getDebitLabel().should('contain', 'Debit (-)');
        this.getCreditLabel().should('contain', 'Credit (+)');
    }
    verifyTransactionDetails() {
        this.getTransactionDetailsTitle().should('contain', 'Transaction Details');
        this.getTransactionIdLabel().should('contain', 'Transaction ID');
        this.getTransactionDateLabel().should('contain', 'Date');
        this.getTransactionDescriptionLabel().should('contain', 'Description');
        this.getTransactionTypeLabel().should('contain', 'Type');
        this.getTransactionAmountLabel().should('contain', 'Amount');

        this.getTransactionDetailsRows().each(($row) => {
            cy.wrap($row).should('be.visible');
        });
    }
    verifyAccountActivity() {
        this.getAccountDetailsButton().should('be.visible');
        this.getAccountIdInput().should('be.visible');
        this.getAccountTypeInput().should('be.visible');
        this.getBalanceInput().should('be.visible');
        this.getAvailableBalanceInput().should('be.visible');
        this.getMonthSelect().should('be.visible');
        this.getTransactionTypeSelect().should('be.visible');
        this.getTransactionTableRows().each(($row) => {
            cy.wrap($row).should('be.visible');
        });
    }
    verifyTransactionDetailsLink() {
        this.getTransactionDetailsLink().should('be.visible').click();
        this.verifyTransactionDetails();
    }
    verifyAccountOverviewPage() {
        this.getAccountNumberLabel().should('be.visible');
        this.getAccountTypeLabel().should('be.visible');
        this.getBalanceLabel().should('be.visible');
        this.getAvailableAmountLabel().should('be.visible');
        this.getAccountActivityLabel().should('contain', 'Account Activity');
        this.getActivityPeriodLabel().should('contain', 'Activity Period');
        this.getTypeLabel().should('contain', 'Type');
        this.getDateLabel().should('contain', 'Date');
        this.getTransactionLabel().should('contain', 'Transaction');
        this.getDebitLabel().should('contain', 'Debit (-)');
        this.getCreditLabel().should('contain', 'Credit (+)');
    }
    verifyAccountDetailsPage() {
        this.getAccountDetailsButton().should('be.visible');
        this.getAccountIdInput().should('be.visible');
        this.getAccountTypeInput().should('be.visible');
        this.getBalanceInput().should('be.visible');
        this.getAvailableBalanceInput().should('be.visible');
        this.getMonthSelect().should('be.visible');
        this.getTransactionTypeSelect().should('be.visible');
        this.getTransactionTableRows().each(($row) => {
            cy.wrap($row).should('be.visible');
        });
    }
    verifyTransactionDetailsPage() {
        this.getTransactionDetailsLink().should('be.visible').click();
        this.verifyTransactionDetails();
    }
    verifyAllElementsOnPage() {
        this.verifyAccountDetails();
        this.verifyTransactionDetails();
        this.verifyAccountActivity();
        this.verifyTransactionDetailsLink();
        this.verifyAccountOverviewPage();
        this.verifyAccountDetailsPage();
        this.verifyTransactionDetailsPage();
    }


    // Reusable method to validate transaction table rows
   validateTransactionTableRows() {
    cy.get('#transactionTable > tbody > tr').each(($row) => {
      cy.wrap($row).find('td:nth-child(1)').should('be.visible'); // Column 1
      // Column 2
      cy.wrap($row).find('td:nth-child(3)').should('be.visible'); // Column 3
      cy.wrap($row).find('td:nth-child(4)').should('be.visible');
      cy.wrap($row).find('td:nth-child(2)').should('be.visible').click();  // Column 4
    });
  }
  getTransactionTableRows() {
    return cy.get('tbody > tr');
  }

  getTransactionDetailsLink() {
    return cy.get('tr > :nth-child(2) > a');
  }

  verifyAccountFormFieldsAndDropdowns() {
  // Input fields visibility
  this.getAccountIdInput().should('be.visible');
  this.getAccountTypeInput().should('be.visible');
  this.getBalanceInput().should('be.visible');
  this.getAvailableBalanceInput().should('be.visible');

  // Month dropdown options
  const expectedMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  this.getMonthSelect()
    .should('be.visible')
    .find('option')
    .then($options => {
      const actualMonths = [...$options].map(opt => opt.text.trim());
      expect(actualMonths).to.include.members(expectedMonths);
      expect(actualMonths).to.have.length.at.least(12);
    });

  // Transaction type options
  this.getTransactionTypeSelect()
    .should('be.visible')
    .find('option')
    .then($options => {
      const actualOptions = [...$options].map(opt => opt.text.trim().toUpperCase());
      expect(actualOptions).to.include.members(['ALL', 'CREDIT', 'DEBIT']);
      expect(actualOptions).to.have.length(3);
    });
}

}

export default AccountOverview;