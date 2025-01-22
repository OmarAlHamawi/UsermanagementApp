describe("Signup Page Tests", () => {
  beforeEach(() => {
    cy.visit("/signup"); // Adjust the route based on your app's URL
  });

  it("Should render the signup form correctly", () => {
    cy.get("form").should("exist");
    cy.get("#firstName").should("exist");
    cy.get("#lastName").should("exist");
    cy.get("#birthDate").should("exist");
    cy.get("#mobile").should("exist");
    cy.get("#email").should("exist");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get("select[name='country']").should("exist");
  });
  it("Should display an error popup if signup fails", () => {
    
    cy.get("#firstName").type("testuser2");
    cy.get("#lastName").type("testuser");
    cy.get("#birthDate").type("1960-05-03");
    cy.get("#mobile").type("1234567891011");
    cy.get("#email").type("testuser@email.com"); 
    cy.get("#username").type("testuser");
    cy.get("#password").type("securepassword");
    cy.get("select[name='country']").select("United States");
    cy.get("button[type='submit']").click(); 
    cy.get(".popup-content").should("contain", "Signup failed. Please check your credentials");
    cy.get(".popup-content button").click();
    cy.url().should("include", "/signup");
  });
});
