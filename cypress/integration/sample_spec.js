describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.intercept({
      method: 'GET',
      url: '/api/localCatalog',
    }).as('getCatalog');

    cy.visit('/');
    cy.findByRole('textbox').type('devJoshua');
    cy.findByLabelText(/password/i).type('qwerty');
    cy.findByRole('button', { name: /login/i }).click();
    cy.url().should('include', 'home');
    cy.wait(['@getCatalog']);
    cy.visit('/new-order');
    cy.findByRole('combobox').select('Non Bulk Order');
    cy.findByRole('textbox').type('7564');
    cy.findByRole('button', { name: /create order/i }).click();
    cy.url().should('include', 'order');
  });
});
