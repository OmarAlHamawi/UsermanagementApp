describe('invaled Add and delete user', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#username').type('ahmad');
    cy.get('#password').type('12345');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");
  });
  it('should faild to delete', () => {
    cy.get(".search-input").type("ahmad");
    cy.get("button").contains("Search").click();
    cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);
  
    cy.get("#deletebutton").click();
    cy.contains("Yes").click();
    cy.contains("Failed to delete user.").should("be.visible");
    cy.contains("Close").click();
  });
  it('should faild to add ',()=>{
    cy.get('.adduser').click();
    cy.url().should("include", "/form");
    cy.get('input[name="firstName"]').type("Test3");
    cy.get('input[name="lastName"]').type("User3");
    cy.get('input[name="username"]').type("testuser3");
    cy.get('input[name="mobile"]').type("1256789");
    cy.get('input[name="email"]').type("testuser3@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="role"]').type("User");
    cy.get('input[name="birthDate"]').type("1990-01-01");
    cy.get('select[name="country"]').select("United States");
    cy.get("#create").click();
    cy.get(".popup-content").should("contain", "Failed to save user. Please try again.");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/users");
  });
});