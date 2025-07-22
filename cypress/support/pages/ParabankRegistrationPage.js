class RegistrationPage {

//   // === Label Selectors as Class Properties ===
// firstNameLabel = ':nth-child(1) > [align="right"] > b';
// lastNameLabel = ':nth-child(2) > [align="right"] > b';
// addressLabel = ':nth-child(3) > [align="right"] > b';
// cityLabel = ':nth-child(4) > [align="right"] > b';
// stateLabel = ':nth-child(5) > [align="right"] > b';
// zipCodeLabel = ':nth-child(6) > [align="right"] > b';
// phoneLabel = ':nth-child(7) > [align="right"] > b';
// ssnLabel = ':nth-child(8) > [align="right"] > b';
// usernameLabel = ':nth-child(10) > [align="right"] > b';
// passwordLabel = ':nth-child(11) > [align="right"] > b';
// confirmPasswordLabel = ':nth-child(12) > [align="right"] > b';

// // === Input Field Selectors as Class Properties ===
// firstNameInput = 'input[id="customer.firstName"]';
// lastNameInput = 'input[id="customer.lastName"]';
// addressInput = 'input[id="customer.address.street"]';
// cityInput = 'input[id="customer.address.city"]';
// stateInput = 'input[id="customer.address.state"]';
// zipCodeInput = 'input[id="customer.address.zipCode"]';
// phoneInput = 'input[id="customer.phoneNumber"]';
// ssnInput = 'input[id="customer.ssn"]';
// usernameInput = 'input[id="customer.username"]';
// passwordInput = 'input[id="customer.password"]';
// confirmPasswordInput = 'input[id="repeatedPassword"]';

// // === Error Message Selectors as Class Properties ===
// firstNameError = '#customer\\.firstName\\.errors';
// lastNameError = '#customer\\.lastName\\.errors';
// addressError = '#customer\\.address\\.street\\.errors';
// cityError = '#customer\\.address\\.city\\.errors';
// stateError = '#customer\\.address\\.state\\.errors';
// zipCodeError = '#customer\\.address\\.zipCode\\.errors';
// ssnError = '#customer\\.ssn\\.errors';
// usernameError = '#customer\\.username\\.errors';
// passwordError = '#customer\\.password\\.errors';
// confirmPasswordError = '#repeatedPassword\\.errors';

// // === Button Selectors ===
// registerButton = 'input[value="Register"]';

  // === Header Elements ===
  getLogo() { return cy.get('.logo'); }
  getCaption() { return cy.get('.caption'); }
  getAdminLink() { return cy.get('.admin'); }
  getHeaderPanel() { return cy.get('#headerPanel'); }
  getHomeNav() { return cy.get('.home > a'); }
  getAboutUsNav() { return cy.get('.aboutus > a'); }
  getContactNav() { return cy.get('.contact > a'); }


  // === Hamburger / Left Menu ===
  getSolutionsLabel() { return cy.get('.Solutions'); }
  getLeftMenuAboutUs() { return cy.get('.leftmenu > :nth-child(2) > a'); }
  getLeftMenuServices() { return cy.get('.leftmenu > :nth-child(3) > a'); }
  getLeftMenuProducts() { return cy.get('.leftmenu > :nth-child(4) > a'); }
  getLeftMenuLocations() { return cy.get('.leftmenu > :nth-child(5) > a'); }
  getLeftMenuAdminPage() { return cy.get('.leftmenu > :nth-child(6) > a'); }

  // Page elements
  getTitle() { return cy.get('h1.title'); }
  getDescription() { return cy.get('#rightPanel > p'); }

  // Label elements
  getFirstNameLabel() { return cy.get(':nth-child(1) > [align="right"] > b'); }
  getLastNameLabel() { return cy.get(':nth-child(2) > [align="right"] > b'); }
  getAddressLabel() { return cy.get(':nth-child(3) > [align="right"] > b'); }
  getCityLabel() { return cy.get(':nth-child(4) > [align="right"] > b'); }
  getStateLabel() { return cy.get(':nth-child(5) > [align="right"] > b'); }
  getZipCodeLabel() { return cy.get(':nth-child(6) > [align="right"] > b'); }
  getPhoneLabel() { return cy.get(':nth-child(7) > [align="right"] > b'); }
  getSSNLabel() { return cy.get(':nth-child(8) > [align="right"] > b'); }
  getUsernameLabel() { return cy.get(':nth-child(10) > [align="right"] > b'); }
  getPasswordLabel() { return cy.get(':nth-child(11) > [align="right"] > b'); }
  getConfirmPasswordLabel() { return cy.get(':nth-child(12) > [align="right"] > b'); }

  // Input fields using your exact selectors
  getFirstNameInput() { return cy.get('input[id="customer.firstName"]'); }
  getLastNameInput() { return cy.get('input[id="customer.lastName"]'); }
  getAddressInput() { return cy.get('input[id="customer.address.street"]'); }
  getCityInput() { return cy.get('input[id="customer.address.city"]'); }
  getStateInput() { return cy.get('input[id="customer.address.state"]'); }
  getZipCodeInput() { return cy.get('input[id="customer.address.zipCode"]'); }
  getPhoneInput() { return cy.get('input[id="customer.phoneNumber"]'); }
  getSSNInput() { return cy.get('input[id="customer.ssn"]'); }
  getUsernameInput() { return cy.get('input[id="customer.username"]'); }
  getPasswordInput() { return cy.get('input[id="customer.password"]'); }
  getConfirmPasswordInput() { return cy.get('input[id="repeatedPassword"]'); }

  // Error messages
  getFirstNameError() { return cy.get('#customer\\.firstName\\.errors'); }
  getLastNameError() { return cy.get('#customer\\.lastName\\.errors'); }
  getAddressError() { return cy.get('#customer\\.address\\.street\\.errors'); }
  getCityError() { return cy.get('#customer\\.address\\.city\\.errors'); }
  getStateError() { return cy.get('#customer\\.address\\.state\\.errors'); }
  getZipCodeError() { return cy.get('#customer\\.address\\.zipCode\\.errors'); }
  getSSNError() { return cy.get('#customer\\.ssn\\.errors'); }
  getUsernameError() { return cy.get('#customer\\.username\\.errors'); }
  getPasswordError() { return cy.get('#customer\\.password\\.errors'); }
  getConfirmPasswordError() { return cy.get('#repeatedPassword\\.errors'); }

  // Register button
  getRegisterButton() { return cy.get('input[value="Register"]'); }

  // === Utility Method to Validate All Inputs ===
  verifyAllInputsAreVisibleAndEnabled() {
    this.getFirstNameInput().should('be.visible').and('not.be.disabled');
    this.getLastNameInput().should('be.visible').and('not.be.disabled');
    this.getAddressInput().should('be.visible').and('not.be.disabled');
    this.getCityInput().should('be.visible').and('not.be.disabled');
    this.getStateInput().should('be.visible').and('not.be.disabled');
    this.getZipCodeInput().should('be.visible').and('not.be.disabled');
    this.getPhoneInput().should('be.visible').and('not.be.disabled');
    this.getSSNInput().should('be.visible').and('not.be.disabled');
    this.getUsernameInput().should('be.visible').and('not.be.disabled');
    this.getPasswordInput().should('be.visible').and('not.be.disabled');
    this.getConfirmPasswordInput().should('be.visible').and('not.be.disabled');
    this.getRegisterButton().should('be.visible');
  }

  // === Utility Method to Verify Header & Menu ===
  verifyHeaderAndMenus() {
    this.getLogo().should('be.visible');
    this.getCaption().should('contain', 'Experience the difference');
    this.getAdminLink().should('be.visible');
    this.getHeaderPanel().should('be.visible');
    this.getHomeNav().should('be.visible');
    this.getAboutUsNav().should('be.visible');
    this.getContactNav().should('be.visible');

    this.getSolutionsLabel().should('have.text', 'Solutions');
    this.getLeftMenuAboutUs().should('have.text', 'About Us').and('not.be.disabled');
    this.getLeftMenuServices().should('have.text', 'Services').and('not.be.disabled');
    this.getLeftMenuProducts().should('have.text', 'Products').and('not.be.disabled');
    this.getLeftMenuLocations().should('have.text', 'Locations').and('not.be.disabled');
    this.getLeftMenuAdminPage().should('have.text', 'Admin Page').and('not.be.disabled');
  }
}

export default RegistrationPage;
