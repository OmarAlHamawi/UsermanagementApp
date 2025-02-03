describe("Normal User Behavior Tests", () => {
  it('Should sign up, log in, and perform user actions sequentially', () => {
    // Sign up
    cy.visit('/signup');
    cy.get("#firstName").type("testuser555");
    cy.get("#lastName").type("testuser555");
    cy.get("#birthDate").type("1960-05-03");
    cy.get("#mobile").type("7998375737574");
    cy.get("#email").type("testuser555@email.com"); 
    cy.get("#username").type("testuser555");
    cy.get("#password").type("12345");
    cy.get("select[name='country']").select("United States");
    cy.get("button[type='submit']").click(); 
    cy.get(".popup-content").should("contain", "Signup successful! Please login.");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/login");
    // Log in
    cy.get('#username').type('testuser555');
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

    // Search for a user
    cy.get(".search-input").type("testuser555");
    //cy.get("button").contains("Search").click();
    cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);

    // Update the user
    cy.get("#Editbutton").click();
    cy.url().should("include", "/form");
    cy.get(".mobile").clear().type("837563757374");
    cy.get(".password-container").type("54321")
    cy.get("button[type='submit']").click();
    cy.get(".popup-content").should("contain", "User updated successfully!");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/users");

    // Change page size and navigate pages
    cy.get("#sizeSelector").select("5");
    cy.get(".user-row").should("have.length.lessThan", 6);
    cy.get("button").contains("Next").click();
    cy.get(".user-row").should("have.length.lessThan", 6);

    // Logout
    cy.contains("Log Out").click();
    cy.contains("Yes").click();
    cy.url().should("include", "/login");
  });
});
