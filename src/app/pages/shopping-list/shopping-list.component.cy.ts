import {AppModule} from '../../app.module';
import {InventoryItem} from '../../model';
import {ShoppingListComponent} from './shopping-list.component';

describe('Shopping list', () => {

  before(() => {
    localStorage.clear();
  });

  const mount = () => {
    cy.mount(ShoppingListComponent, {
      imports: [
        AppModule,
      ],
    });
  };

  it('initially displays no items', () => {
    mount();

    cy.get('.mat-card')
      .should('not.exist');
  });

  it('displays a diff between items from recipes and inventory', () => {
    localStorage.setItem('inventory', JSON.stringify({
      'Pale Ale': InventoryItem.grain('Pale Ale', 7),
      'Citra': InventoryItem.hop('Citra', 250),
      'US-05': InventoryItem.yeast('US-05', 2)
    }));
    localStorage.setItem('recipes', JSON.stringify({
      'First recipe': {
        'Pale Ale': InventoryItem.grain('Pale Ale', 10),
        'Citra': InventoryItem.hop('Citra', 350),
        'US-05': InventoryItem.yeast('US-05', 1)
      },
      'Second recipe': {
        'Pale Ale': InventoryItem.grain('Pale Ale', 3),
        'Carafa Special III': InventoryItem.grain('Carafa Special III', .5),
        'Citra': InventoryItem.hop('Saaz', 50),
        'US-05': InventoryItem.yeast('US-05', 1)
      }
    }));

    mount();

    const expectedGrainElements = [
      'Pale Ale', '6 kg',
      'Carafa Special III', '0.5 kg'
    ];
    const expectedHopsElements = [
      'Citra', '100 g',
      'Saaz', '50 g'
    ];
    cy.get('[data-cy="items-card-Grains"] .inventory-row > div')
      .each((element, index) => expect(element).to.have.text(expectedGrainElements[index]))
      .get('[data-cy="items-card-Hops"] .inventory-row > div')
      .each((element, index) => expect(element).to.have.text(expectedHopsElements[index]))
      .get('[data-cy="items-card-Yeast"], [data-cy="items-card-Misc"]')
      .should('not.exist')
  });

});