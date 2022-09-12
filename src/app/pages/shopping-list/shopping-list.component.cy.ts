import {AppModule} from '../../app.module';
import {ShoppingListComponent} from './shopping-list.component';

describe('Shopping list', () => {

  beforeEach(() => {
    cy.mount(ShoppingListComponent, {
      imports: [
        AppModule,
      ],
    });
  });

  it('initially displays no items', () => {
    cy.get('.mat-card')
      .should('not.exist');
  });

  // TODO rest of the tests

});