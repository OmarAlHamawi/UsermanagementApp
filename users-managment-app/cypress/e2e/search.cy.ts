describe('search', () => {
  it('search', () => {
    cy.visit('/login');
    
    // Log in
    cy.get('#username').type('ahmad');
    cy.get('#password').type('12345');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");

    // Verify welcome message
    cy.contains("Welcome to the User Management System").should("be.visible");

    // Navigate to View All Users
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");

    // Test searching for an existing user ID
    cy.get('.search-input').type('38'); // Replace '1' with a valid user ID in your database
    cy.get('.search-button').click();
    cy.get('tbody').should('contain', '38'); 

    // Test searching for a non-existing user ID
    cy.get('.search-input').clear().type('99999'); 
    cy.get('.search-button').click();
    cy.get('tbody').should('not.contain', '99999'); 

    // Test searching for an existing first name
    cy.get('.search-input').clear().type('John'); 
    cy.get('.search-button').click();
    cy.get('tbody').should('contain', 'John'); 
    // Test searching for a non-existing first name
    cy.get('.search-input').clear().type('NonExistingName');
    cy.get('.search-button').click();
    cy.get('tbody').should('not.contain', 'NonExistingName'); 

    // Test searching for an existing last name
    cy.get('.search-input').clear().type('Doe'); 
    cy.get('.search-button').click();
    cy.get('tbody').should('contain', 'Doe'); 

    
    cy.get('.search-input').clear().type('NonExistingLastName');
    cy.get('.search-button').click();
    cy.get('tbody').should('not.contain', 'NonExistingLastName'); 

    // Logout
    cy.contains("Log Out").click();
    cy.contains("Yes").click();
    cy.url().should("include", "/login");
  });
});
