import {InventoryItem} from '../../model/Inventory.types';
import {InventoryModule} from '../../pages/inventory/inventory.module';
import {ItemsByType} from '../../store/store';
import {GroupedItemRows} from './grouped-item-rows.component';

describe('Grouped item rows', () => {

  const mount = (itemsByType: ItemsByType) => {
    cy.mount('<app-grouped-item-rows [itemsByType]="itemsByType" (removeItem)="removeItem($event)"></app-grouped-item-rows>', {
      declarations: [GroupedItemRows],
      componentProperties: {
        itemsByType,
        removeItem: cy.spy().as('removeItemSpy'),
      },
      imports: [
        InventoryModule,
      ],
    });
  };

  it('renders nothing when there are no items', () => {
    mount({});

    cy.get('.mat-card')
      .should('not.exist');
  });

  it('renders items', () => {
    mount({
      Grains: [
        InventoryItem.grain('Pale Ale', 3),
        InventoryItem.grain('Carafa Special III', .5)
      ],
      Hops: [
        InventoryItem.hop('Citra', 200)
      ],
      Yeast: [
        InventoryItem.yeast('US-05', 2)
      ]
    });

    cy.assertItemsCard('Grains', [
      'Pale Ale', '3 kg',
      'Carafa Special III', '0.5 kg'
    ]);
    cy.assertItemsCard('Hops', [
      'Citra', '200 g',
    ]);
    cy.assertItemsCard('Yeast', [
      'US-05', '2 pkg'
    ]);
  });

  it('emits remove item event', () => {
    mount({
      Grains: [
        InventoryItem.grain('Pale Ale', 5),
      ],
      Hops: [
        InventoryItem.hop('Citra', 200)
      ],
      Yeast: [
        InventoryItem.yeast('US-05', 2)
      ]
    });

    cy.deleteItem('Pale Ale')
      .get('@removeItemSpy')
      .should('have.been.calledOnce')
      .deleteItem('Citra')
      .get('@removeItemSpy')
      .should('have.been.calledTwice')
      .deleteItem('US-05')
      .get('@removeItemSpy')
      .should('have.been.calledThrice');
  });


});