describe('Full page tests', () => {

  // TODO https://github.com/meinaart/cypress-plugin-snapshots

  it('displays tabs correctly', () => {
    cy.visit('/');

    cy.get('.mat-tab-label')
      .should('have.length', 3);
  });

});
