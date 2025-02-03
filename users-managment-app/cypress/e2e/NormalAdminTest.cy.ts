describe("Normal Admin Behavior Tests", () => {
  it('Should log in and perform user actions sequentially', () => {
  // Log in
  cy.visit('/login');
  cy.get('#username').type('omar2');
  cy.get('#password').type('12345');
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/");
  // Perform actions on the home page
  cy.contains("Welcome to the User Management System").should("be.visible");

  // Navigate to View All Users
  cy.contains('View All Users').click();
  cy.url().should("include", "/users");

  // Apply filters
  cy.get('.userCountryDropdown').select("United States");
  cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);
  cy.get('.userRoleDropdown').select("User");
  cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);

  // Clear filters
  cy.get('.userRoleDropdown').select("All Roles");
  cy.get('.userCountryDropdown').select("All Countries");
  cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);
// Change page size and navigate pages
cy.get("#sizeSelector").select("5");
cy.get(".user-row").should("have.length.lessThan", 6);
cy.get("button").contains("Next").click();
cy.get(".user-row").should("have.length.lessThan", 6);
  //add user
  cy.get('.adduser').click();
  cy.url().should("include", "/form");
  cy.get('input[name="firstName"]').type("Test2");
  cy.get('input[name="lastName"]').type("User2");
  cy.get('input[name="username"]').type("testuser2");
  cy.get('input[name="mobile"]').type("7999874656374");
  cy.get('input[name="email"]').type("testuser2@example.com");
  //cy.get('input[name="password"]').type("password123");
  cy.get('select[name="role"]').select("User");
  cy.get('input[name="birthDate"]').type("1990-01-01");
  cy.get('select[name="country"]').select("United States");
  cy.get("#create").click();
  cy.get(".popup-content",{ timeout: 25000 });//.should("contain", "User created successfully!");
  cy.get(".popup-content button").click();
  cy.url().should("include", "/users");

  //searh for this user
  cy.get(".search-input").type("Test2");
  //cy.get("button").contains("Search").click();
  cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);
  // Update the user
  cy.get("#Editbutton").click();
  cy.url().should("include", "/form");
  cy.get(".mobile").clear().type("86544");
  cy.get(".password-container").type("54321")
  cy.get("button[type='submit']").click();
  cy.get(".popup-content").should("contain", "User updated successfully!");
  cy.get(".popup-content button").click();
  cy.url().should("include", "/users");
  //searh for this user
  cy.get(".search-input").type("Test2");
  //cy.get("button").contains("Search").click();
  cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);
  //delete this user 
  cy.get("#deletebutton").click();
  cy.contains("Yes").click();
  cy.contains("Close").click();
  
  // Logout
  cy.contains("Log Out").click();
  cy.contains("Yes").click();
  cy.url().should("include", "/login");
  }); 
});
