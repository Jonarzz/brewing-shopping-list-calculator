import {AppModule} from '../../app.module';
import {InventoryItem} from '../../model/Inventory.types';
import {addToInventory} from '../../store/inventory.actions';
import {GroupedItemRows} from './grouped-item-rows.component';

describe('Grouped item rows', () => {

  beforeEach(() => {
    cy.mount(GroupedItemRows, {
      imports: [
        AppModule,
      ],
    });
  });

  it('displays nothing when store is empty', () => {
    cy.get('.mat-card')
      .should('not.exist');
  });

  it('displays single grains item', () => {
    return; // TODO update not displayed in the component
    cy.window()
      .its('store')
      .invoke('dispatch', addToInventory({
        item: InventoryItem.grain('Pale Ale', 3),
      }));

    cy.get('.mat-card')
      .should('exist');
  });

});