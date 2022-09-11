import {AppModule} from '../../app.module';
import {InventoryComponent} from './inventory.component';

describe('Inventory', () => {

  const addItem = (type: string, name: string, amount: number) => {
    cy.selectType(type)
      .fillNameInput(name)
      .fillAmountInput(amount)
      .clickAddButton();
  };

  const deleteItem = (name: string) => cy.get(`[data-cy="delete-${name}"]`)
                                         .click();

  const assertItemsCard = (type: string, expectedRowElements: string[]) => {
    const cardSelector = `[data-cy="items-card-${type}"]`;
    cy.get(cardSelector)
      .should('exist')
      .children('.mat-card-title')
      .should('have.text', type);
    cy.get(cardSelector + ' .inventory-row div')
      .each((element, index) => expect(element).to.have.text(expectedRowElements[index]));
  };

  beforeEach(() => {
    cy.mount(InventoryComponent, {
      imports: [
        AppModule,
      ],
    });
  });

  it('initially displays form and no items', () => {
    cy.get('[data-cy="form-card"]')
      .should('exist')
      .get('[data-cy^="items-card-"')
      .should('not.exist');
  });

  it('adds and removes single item', () => {
    for (let [type, name, amount, defaultUnit] of [
      ['Grains', 'Pale Ale', 3, 'kg'],
      ['Hops', 'Citra', 200, 'g'],
      ['Yeast', 'US-05', 3, 'pkg'],
      ['Misc', 'Gypsum', 20, 'g']
    ]) {
      addItem(<string>type, <string>name, <number>amount);

      const expectedRowElements = [<string>name,`${amount} ${defaultUnit}`];
      assertItemsCard(<string>type, expectedRowElements);

      deleteItem(<string>name);
      cy.get('[data-cy^="items-card-"')
        .should('not.exist');
    }
  });

  it('adds multiple items and removes them', () => {
    addItem('Grains', 'Pale Ale', 3);
    addItem('Grains', 'Carafa Special III', .5);
    addItem('Hops', 'Citra', 200);
    addItem('Yeast', 'US-05', 2);
    addItem('Hops', 'Cascade', 100);
    addItem('Grains', 'Pale Ale', 1);
    addItem('Hops', 'Citra', 50);
    addItem('Grains', 'Pale Ale', .7);

    assertItemsCard('Grains', [
      'Pale Ale', '4.7 kg',
      'Carafa Special III', '0.5 kg'
    ]);
    deleteItem('Pale Ale');
    deleteItem('Carafa Special III');
    cy.get('[data-cy="items-card-Grains"')
      .should('not.exist');

    assertItemsCard('Hops', [
      'Citra', '250 g',
      'Cascade', '100 g'
    ]);
    deleteItem('Citra');
    deleteItem('Cascade');
    cy.get('[data-cy="items-card-Hops"')
      .should('not.exist');

    assertItemsCard('Yeast', [
      'US-05', '2 pkg',
    ]);
    deleteItem('US-05');
    cy.get('[data-cy="items-card-Yeast"')
      .should('not.exist');
  });

});