import {AppModule} from '../../app.module';
import {RecipesComponent} from './recipes.component';

describe('Recipes', () => {

  before(() => {
    cy.clearLocalStorage();
  });

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

  it('creates and deletes recipes', () => {
    const recipeNames = ['D first', 'C second', 'B third', 'A fourth'];
    const sortedRecipeNames = [...recipeNames].sort();

    for (let name of recipeNames) {
      cy.get('[data-cy="recipe-name-field"]')
        .type(name)
        .get('[data-cy="add-recipe-button"]')
        .click();
    }

    cy.get('[data-cy^="recipe-card-"] mat-panel-title > span')
      .each((title, index) => expect(title).to.have.text(sortedRecipeNames[index]))
      .get('[data-cy^="recipe-card-"]:not(:first-of-type)')
      .each(card => expect(card).to.have.attr('ng-reflect-expanded', 'false'))
      .get('[data-cy^="recipe-card-"]:first-of-type')
      .each(card => expect(card).to.have.attr('ng-reflect-expanded', 'true'));

    for (let name of recipeNames) {
      cy.get(`[data-cy="delete-${name}"]`)
        .click()
        .get(`[data-cy^="recipe-card-${name}"]`)
        .should('not.exist');
    }
  });

  it('creates a recipe with items', () => {
    cy.get('[data-cy="recipe-name-field"]')
      .type('Pilsner Urquell')
      .get('[data-cy="add-recipe-button"]')
      .click()
      .addItem('Grains', 'Pilsner', 5)
      .addItem('Grains', 'Rice hulls', .2)
      .addItem('Hops', 'Saaz', 200)
      .addItem('Yeast', 'WLP800', 2);

    cy.assertItemsCard('Grains', [
      'Pilsner', '5 kg',
      'Rice hulls', '0.2 kg'
    ]).assertItemsCard('Hops', [
      'Saaz', '200 g'
    ]).assertItemsCard('Yeast', [
      'WLP800', '2 pkg'
    ]);
  });

});