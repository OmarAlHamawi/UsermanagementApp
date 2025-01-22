describe('Login with deferant users', () => {
  it('Login', () => {
    cy.visit('/login');
    cy.get('#username').type('admin2');
    cy.get('#password').type('12345');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");

    //add user
    cy.get('.adduser').click();
    cy.url().should("include", "/form");
    cy.get('input[name="firstName"]').type("Test4");
    cy.get('input[name="lastName"]').type("User4");
    cy.get('input[name="username"]').type("testuser4");
    cy.get('input[name="mobile"]').type("1256789");
    cy.get('input[name="email"]').type("testuser4@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="role"]').type("admin");
    cy.get('input[name="birthDate"]').type("1990-01-01");
    cy.get('select[name="country"]').select("United States");
    cy.get("#create").click();
    cy.get(".popup-content").should("contain", "User created successfully!");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/users");

    // Logout and login with new user
    cy.contains("Log Out").click();
    cy.contains("Yes").click();
    cy.url().should("include", "/login");
    cy.get('#username').type('testuser4');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");

    //update user
    //searh for this user
    cy.get(".search-input").type("Test4");
    cy.get("button").contains("Search").click();
    cy.get(".viewAllUsers-table").should("have.length.greaterThan", 0);

    // Update the user
    cy.get("#Editbutton").click();
    cy.url().should("include", "/form");
    cy.get(".mobile").clear().type("86544");
    cy.get(".password-container").type("password")
    cy.get("button[type='submit']").click();
    cy.get(".popup-content").should("contain", "User updated successfully!");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/users");

    // Logout and login with updated user
    cy.contains("Log Out").click();
    cy.contains("Yes").click();
    cy.url().should("include", "/login");
    cy.get('#username').type('testuser4');
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
    cy.contains('View All Users').click();
    cy.url().should("include", "/users");

    //delete user
    cy.get(".search-input").type("Test4");
    cy.get("button").contains("Search").click();
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