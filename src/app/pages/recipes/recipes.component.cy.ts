import {AppModule} from '../../app.module';
import {RecipesComponent} from './recipes.component';

describe('Recipes', () => {

  beforeEach(() => {
    cy.mount(RecipesComponent, {
      imports: [
        AppModule,
      ],
    });
  });

  it('initially displays form and no items', () => {
    cy.get('[data-cy="form-card"]')
      .should('exist')
      .get('[data-cy^="recipe-card-"]')
      .should('not.exist');
  });

  // TODO tests

});