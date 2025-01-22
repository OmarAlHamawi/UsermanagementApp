describe('Login Page Test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should display the login page', () => {
    // Verify the login form is visible
    cy.get('#login-page').should('exist');
    cy.get('h2').should('contain.text', 'Login');
  });

  it('Should display error popup on invalid login', () => {
    // Enter invalid credentials
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('invalidPassword');
    cy.get('#password').invoke('attr', 'type').should('equal', 'password');

    // Click the eye icon to show password
    cy.get('.toggle-password').click();
    cy.get('#password').invoke('attr', 'type').should('equal', 'text');

    // Click again to hide password
    cy.get('.toggle-password').click();
    cy.get('#password').invoke('attr', 'type').should('equal', 'password');
    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify the error popup is displayed
    cy.get('.popup').should('be.visible');
    cy.get('.popup-content').should('contain.text', 'Login failed. Please check your credentials.');

    // Close the popup
    cy.get('.popup button').click();
    cy.get('.popup').should('not.exist');
  });

});
