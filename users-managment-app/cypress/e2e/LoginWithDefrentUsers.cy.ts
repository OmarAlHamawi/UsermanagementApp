describe('Login with deferant users', () => {
  it('Login', () => {
    cy.visit('/login');
    cy.get('#username').type('omar2');
    cy.get('#password').type('12345');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");

    //add user
    cy.get('.adduser').click();
    cy.url().should("include", "/form");
    cy.get('input[name="firstName"]').type("Test44");
    cy.get('input[name="lastName"]').type("User44");
    cy.get('input[name="username"]').type("testuser44");
    cy.get('input[name="mobile"]').type("799857673767");
    cy.get('input[name="email"]').type("testuser44@email.com");
    //cy.get('input[name="password"]').type("password123");
    cy.get('select[name="role"]').select("User");
    cy.get('input[name="birthDate"]').type("2000-01-01");
    cy.get('select[name="country"]').select("United States");
    cy.get('button[id="create"]').click();
    cy.get(".popup-content",{ timeout: 25000 }); //.should("contain", "User created successfully!");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/users");

    // // Logout and login with new user
    // cy.contains("Log Out").click();
    // cy.contains("Yes").click();
    // cy.url().should("include", "/login");
    // cy.get('#username').type('testuser4');
    // cy.get('#password').type('password123');
    // cy.get('button[type="submit"]').click();
    // cy.url().should("include", "/");
    // cy.contains('View All Users').click();
    // cy.url().should("include", "/users");

    //update user
    //searh for this user
    cy.get(".search-input").type("Test44");
    cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);

    // Update the user
    cy.get("#Editbutton").click();
    cy.url().should("include", "/form");
    cy.get(".mobile").clear().type("748583849393");
    cy.get(".password-container").type("password")
    cy.get("button[type='submit']").click();
    cy.get(".popup-content").should("contain", "User updated successfully!");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/users");

    // Logout and login with updated user
    cy.contains("Log Out").click();
    cy.contains("Yes").click();
    cy.url().should("include", "/login");
    cy.get('#username').type('testuser44');
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");

    //delete user
    cy.get(".search-input").type("Test44");
    //cy.get("button").contains("Search").click();
    cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);

    //delete this user 
    cy.get("#deletebutton").click();
    cy.contains("Yes").click();
    cy.contains("Close").click();

    //logout and login with deleted user
    cy.contains("Log Out").click();
    cy.contains("Yes").click();
    cy.url().should("include", "/login");
    cy.get('#username').type('testuser4');
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();
    cy.contains("Login failed. Please check your credentials.")
    cy.contains("Ok").click();
  })
})
