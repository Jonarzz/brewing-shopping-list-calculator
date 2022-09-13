import {provideMockStore} from '@ngrx/store/testing';
import {AppModule} from '../../app.module';
import {InventoryItem} from '../../model';
import {ShoppingListComponent} from './shopping-list.component';

describe('Shopping list', () => {

  before(() => {
    cy.clearLocalStorage();
  });

  const mount = (initialState = {
    inventory: {},
    recipes: {},
  }) => {
    cy.mount(ShoppingListComponent, {
      imports: [
        AppModule,
      ],
      providers: [
        provideMockStore({initialState}),
      ],
    });
  };

  it('initially displays no items', () => {
    mount();

    cy.get('.mat-card')
      .should('not.exist');
  });

  it('displays a diff between items from recipes and inventory', () => {
    const initialState = {
      inventory: {
        'Pale Ale': InventoryItem.grain('Pale Ale', 7),
        'Citra': InventoryItem.hop('Citra', 250),
        'US-05': InventoryItem.yeast('US-05', 2),
      },
      recipes: {
        'First recipe': {
          'Pale Ale': InventoryItem.grain('Pale Ale', 10),
          'Citra': InventoryItem.hop('Citra', 350),
          'US-05': InventoryItem.yeast('US-05', 1),
        },
        'Second recipe': {
          'Pale Ale': InventoryItem.grain('Pale Ale', 3),
          'Carafa Special III': InventoryItem.grain('Carafa Special III', .5),
          'Citra': InventoryItem.hop('Saaz', 50),
          'US-05': InventoryItem.yeast('US-05', 1),
        },
      },
    };

    mount(initialState);

    const expectedGrainElements = [
      'Pale Ale', '6 kg',
      'Carafa Special III', '0.5 kg'
    ];
    const expectedHopsElements = [
      'Citra', '100 g',
      'Saaz', '50 g'
    ];
    cy.assertItemsCard('Grains', expectedGrainElements)
      .assertItemsCard('Hops', expectedHopsElements)
      .assertItemsCardDoesNotExist('Yeast')
      .assertItemsCardDoesNotExist('Misc');
  });

});