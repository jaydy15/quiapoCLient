// new_order_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:5000/api/localCatalog',
    }).as('getCatalog');
  });
});
