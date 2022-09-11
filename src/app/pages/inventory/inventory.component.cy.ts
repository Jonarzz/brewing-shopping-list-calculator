import {AppModule} from '../../app.module';
import {InventoryComponent} from './inventory.component';

describe('Inventory', () => {

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
      .assertNoItemsCardExists();
  });

  it('adds and removes single item', () => {
    for (let [type, name, amount, defaultUnit] of [
      ['Grains', 'Pale Ale', 3, 'kg'],
      ['Hops', 'Citra', 200, 'g'],
      ['Yeast', 'US-05', 3, 'pkg'],
      ['Misc', 'Gypsum', 20, 'g']
    ]) {
      cy.addItem(<string>type, <string>name, <number>amount);

      const expectedRowElements = [<string>name,`${amount} ${defaultUnit}`];
      cy.assertItemsCard(<string>type, expectedRowElements);

      cy.deleteItem(<string>name)
        .assertNoItemsCardExists();
    }
  });

  it('adds multiple items and removes them', () => {
    cy.addItem('Grains', 'Pale Ale', 3)
      .addItem('Grains', 'Carafa Special III', .5)
      .addItem('Hops', 'Citra', 200)
      .addItem('Yeast', 'US-05', 2)
      .addItem('Hops', 'Cascade', 100)
      .addItem('Grains', 'Pale Ale', 1)
      .addItem('Hops', 'Citra', 50)
      .addItem('Grains', 'Pale Ale', .7);

    cy.assertItemsCard('Grains', [
        'Pale Ale', '4.7 kg',
        'Carafa Special III', '0.5 kg',
      ])
      .deleteItem('Pale Ale')
      .deleteItem('Carafa Special III')
      .assertItemsCardDoesNotExist('Grains');

    cy.assertItemsCard('Hops', [
        'Citra', '250 g',
        'Cascade', '100 g',
      ])
      .deleteItem('Citra')
      .deleteItem('Cascade')
      .assertItemsCardDoesNotExist('Hops');

    cy.assertItemsCard('Yeast', [
        'US-05', '2 pkg',
      ])
      .deleteItem('US-05')
      .assertItemsCardDoesNotExist('Yeast');
  });

});