import {AppComponent} from './app.component';
import {AppModule} from './app.module';

describe('Application tabs', () => {

  beforeEach(() => {
    cy.mount(AppComponent, {
      imports: [
        AppModule,
      ],
    });
  });

  it('initially displays tabs (shopping list disabled)', () => {
    const expectedTabs = [{
      text: 'Inventory',
      disabled: 'false'
    }, {
      text: 'Recipes',
      disabled: 'false'
    }, {
      text: 'Shopping list',
      disabled: 'true'
    }];

    cy.get('.mat-tab-label')
      .each((label, index) => {
        const expectedTab = expectedTabs[index];
        expect(label).to.have.text(expectedTab.text);
        expect(label).to.have.attr('ng-reflect-disabled', expectedTab.disabled);
      });
  });

  it('shows not allowed cursor and a tooltip for the disabled tab', () => {
    cy.get('.mat-tab-label:last-of-type label')
      .should(element => expect(element).to.have.css('cursor', 'not-allowed'))
      .trigger('mouseenter')
      .get('.mat-tooltip')
      .should('have.text', 'Add at least one recipe with an item');
  });

  it('enables shopping list tab after adding at least one recipe with an item', () => {
    cy.contains('Recipes')
      .click()
      .get('[data-cy="recipe-name-field"]')
      .type('Pliny the Elder')
      .get('[data-cy="add-recipe-button"]')
      .click()
      .get('.mat-tab-label:last-of-type')
      .should('have.attr', 'ng-reflect-disabled', 'true')
      .addItem('Grains', 'Pale Ale', 5)
      .get('.mat-tab-label:last-of-type')
      .should('have.attr', 'ng-reflect-disabled', 'false');
  });

});