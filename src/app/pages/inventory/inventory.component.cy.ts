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
      .get('[data-cy^="items-card-"')
      .should('not.exist');
  });

  it('item addition and removal', () => {
    for (let [type, name, amount, defaultUnit] of [
      ['Grains', 'Pale Ale', 3, 'kg'],
      ['Hops', 'Citra', 200, 'g'],
      ['Yeast', 'US-05', 3, 'pkg'],
      ['Misc', 'Gypsum', 20, 'g']
    ]) {
      cy.selectType(<string> type)
        .fillNameInput(<string> name)
        .fillAmountInput(<number> amount)
        .clickAddButton();

      const expectedRowElements = [<string>name,`${amount} ${defaultUnit}`];
      cy.get(`[data-cy="items-card-${type}"`)
        .should('exist')
        .get('.mat-card-title')
        .should('have.text', type)
        .get('.inventory-row div')
        .each((element, index) => expect(element).to.have.text(expectedRowElements[index]));

      cy.get(`[data-cy="delete-${name}"]`)
        .click()
        .get('[data-cy^="items-card-"')
        .should('not.exist');
    }
  });

});