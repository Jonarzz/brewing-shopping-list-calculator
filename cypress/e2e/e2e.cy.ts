describe('Full page tests', () => {

  // TODO https://github.com/meinaart/cypress-plugin-snapshots

  before(() => {
    cy.clearLocalStorage();
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('calculates shopping list based on items from inventory and recipes', () => {
    cy.visit('/');

    cy.addItem('Grains', 'Pale Ale', 7)
      .addItem('Hops', 'Citra', 150)
      .addItem('Yeast', 'US-05', 2)
      .get('.mat-tab-label')
      .contains('Recipes')
      .click()
      .get('[data-cy="recipe-name-field"]')
      .type('My first recipe')
      .get('[data-cy="add-recipe-button"]')
      .click()
      .addItem('Grains', 'Pale Ale', 10)
      .addItem('Grains', 'Carafa Special I', .5)
      .addItem('Hops', 'Citra', 200)
      .addItem('Hops', 'Cascade', 100)
      .addItem('Yeast', 'US-05', 1)
      .get('.mat-tab-label')
      .contains('Shopping list')
      .click()
      .assertItemsCard('Grains', [
        'Pale Ale', '3 kg',
        'Carafa Special I', '0.5 kg'
      ])
      .assertItemsCard('Hops', [
        'Citra', '50 g',
        'Cascade', '100 g'
      ])
      .assertItemsCardDoesNotExist('Yeast')
      .assertItemsCardDoesNotExist('Misc');
  });

  it('displays empty shopping list when inventory contains everything that\'s required', () => {
    cy.visit('/');

    cy.addItem('Grains', 'Pale Ale', 3)
      .addItem('Grains', 'Carafa Special I', 1)
      .addItem('Hops', 'Citra', 100)
      .addItem('Hops', 'Cascade', 100)
      .get('.mat-tab-label')
      .contains('Shopping list')
      .click()
      .assertItemsCardDoesNotExist('Grains')
      .assertItemsCardDoesNotExist('Hops')
      .assertItemsCardDoesNotExist('Yeast')
      .assertItemsCardDoesNotExist('Misc');
  });

});
