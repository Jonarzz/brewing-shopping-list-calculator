import {assertThat} from '../../../../cypress/support/static-commands';
import {AppModule} from '../../app.module';
import {ItemFormComponent} from './item-form.component';

const cyIds = {
  fields: {
    type: 'type-field',
    name: 'name-field',
    amount: 'amount-field',
    unit: 'unit-field',
  },
  buttons: {
    add: 'add-button',
  },
};

describe('Item form', () => {

  // for each on the test case level does not work with Cypress component testing as of now
  // hence for each loops are used in the test cases

  beforeEach(() => {
    cy.mount(ItemFormComponent, {
      imports: [
        AppModule
      ],
    });
  });

  it('renders form elements with appropriate text', () => {
    for (let [cyId, expectedText] of [
      [cyIds.fields.type, 'Type'],
      [cyIds.fields.name, 'Name'],
      [cyIds.fields.amount, 'Amount'],
      [cyIds.fields.unit, 'Unit'],
      [cyIds.buttons.add, 'Add'],
    ]) {
      cy.get(`[data-cy="${cyId}"]`)
        .should('have.text', expectedText);
    }
  });

  describe('invalid input fallbacks', () => {

    it('focuses type field when add button clicked with empty inputs', () => {
      cy.expectNoStoreChanges();

      cy.get(`[data-cy="${cyIds.buttons.add}"]`)
        .click();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.type}"]`)
        .should('exist');
    });

    it('focuses name field when add button clicked after type filled in', () => {
      cy.get(`[data-cy="${cyIds.fields.type}"]`)
        .click();
      cy.get('[data-cy="type-option-Grains"]')
        .click();

      cy.expectNoStoreChanges();
      cy.get(`[data-cy="${cyIds.buttons.add}"]`)
        .click();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.name}"]`)
        .should('exist');
    });

    it('focuses and resets name field when add button clicked with blank name input', () => {
      cy.get(`[data-cy="${cyIds.fields.type}"]`)
        .click();
      cy.get('[data-cy="type-option-Grains"]')
        .click();
      cy.get(`[data-cy="${cyIds.fields.name}"]`)
        .type('   ');

      cy.expectNoStoreChanges();
      cy.get(`[data-cy="${cyIds.buttons.add}"]`)
        .click();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.name}"]`)
        .should('exist')
        .and('have.value', '');
    });

    it('focuses amount field when add button clicked after type and name filled in', () => {
      cy.get(`[data-cy="${cyIds.fields.type}"]`)
        .click();
      cy.get('[data-cy="type-option-Grains"]')
        .click();
      cy.get(`[data-cy="${cyIds.fields.name}"]`)
        .type('Pale Ale');

      cy.expectNoStoreChanges();
      cy.get(`[data-cy="${cyIds.buttons.add}"]`)
        .click();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.amount}"]`)
        .should('exist');
    });

    it('focuses and resets amount field when add button clicked after type, name and negative amount filled in', () => {
      cy.get(`[data-cy="${cyIds.fields.type}"]`)
        .click();
      cy.get('[data-cy="type-option-Grains"]')
        .click();
      cy.get(`[data-cy="${cyIds.fields.name}"]`)
        .type('Pale Ale');
      cy.get(`[data-cy="${cyIds.fields.amount}"]`)
        .type('-1');

      cy.expectNoStoreChanges();
      cy.get(`[data-cy="${cyIds.buttons.add}"]`)
        .click();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.amount}"]`)
        .should('exist')
        .and('have.value', '');
    });

  });

  describe('units and type relation', () => {

    it('changes default unit on type selection', () => {
      for (let [type, expectedUnit] of [
        ['Grains', 'kg'],
        ['Hops', 'g'],
        ['Yeast', 'pkg'],
        ['Misc', 'g'],
      ]) {
        cy.get(`[data-cy="${cyIds.fields.type}"]`)
          .click();
        cy.get(`[data-cy="type-option-${type}"]`)
          .click();

        cy.get(`[data-cy="${cyIds.fields.unit}"] .mat-select-value-text`)
          .should('have.text', expectedUnit);
      }
    });

    it('changes available units (more than 1) on type selection', () => {
      for (let [type, availableUnits] of [
        ['Grains', ['kg', 'g']],
        ['Hops', ['g', 'kg']],
        ['Misc', ['g', 'items']],
      ]) {
        cy.get(`[data-cy="${cyIds.fields.type}"]`)
          .click();
        cy.get(`[data-cy="type-option-${type}"]`)
          .click();

        cy.get(`[data-cy="${cyIds.fields.unit}"]`)
          .click();

        cy.get((<string[]> availableUnits).map(unit => `[data-cy="unit-option-${unit}"]`)
                                          .join(','))
          .as(`Expected units: ${availableUnits}`)
          .should('have.length', availableUnits.length)
          .first()
          .click(); // to hide the select options
      }
    });

    it('changes and disables unit selection on yeast type selection', () => {
      cy.get(`[data-cy="${cyIds.fields.type}"]`)
        .click();
      cy.get('[data-cy="type-option-Yeast"]')
        .click();

      cy.get(`[data-cy="${cyIds.fields.unit}"]`)
        .should('have.class', 'mat-form-field-disabled')
        .find('.mat-select-value')
        .should('have.text', 'pkg');
    });

  });

  describe('item adding', () => {

    interface Inputs {
      type: string,
      name: string,
      amount: number,
      unit?: string
    }

    interface Item {
      type: string,
      name: string,
      amount: number,
      unit: string
    }

    const addAndAssert = (inputs: Inputs, expectedItem: Item) => {
      const {type, name, amount, unit} = inputs;
      cy.get(`[data-cy="${cyIds.fields.type}"]`)
        .click();
      cy.get(`[data-cy="type-option-${type}"]`)
        .click();
      cy.get(`[data-cy="${cyIds.fields.name}"]`)
        .type(name);
      cy.get(`[data-cy="${cyIds.fields.amount}"]`)
        .type(String(amount));
      if (unit) {
        cy.get(`[data-cy="${cyIds.fields.unit}"]`)
          .click();
        cy.get(`[data-cy="unit-option-${unit}"]`)
          .click();
      }

      cy.subscribeForStoreChanges((state: any) => {
        assertThat(state.inventory[name])
          .isEqualTo(expectedItem);
      });
      cy.get(`[data-cy="${cyIds.buttons.add}"]`)
        .click();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.name}"]`)
        .should('exist')
        .should('have.value', '');
    };

    it('adds single grains item with default unit', () => {
      const type = 'Grains';
      const name = 'Pale Ale';
      const amount = 1;

      addAndAssert(
        {type, name, amount},
        {type, name, amount, unit: 'kg'},
      );
    });

    it('adds single grains item with non-default unit', () => {
      const type = 'Grains';
      const name = 'Carafa Special III';
      const amount = .5;
      const unit = 'g';

      addAndAssert(
        {type, name, amount, unit},
        {type, name, amount, unit},
      );
    });

    it('adds single hops item with default unit', () => {
      const type = 'Hops';
      const name = 'Citra';
      const amount = 100;

      addAndAssert(
        {type, name, amount},
        {type, name, amount, unit: 'g'},
      );
    });

    it('adds single hops item with non-default unit', () => {
      const type = 'Hops';
      const name = 'Cascade';
      const amount = .5;
      const unit = 'kg';

      addAndAssert(
        {type, name, amount, unit},
        {type, name, amount, unit},
      );
    });

    it('adds single misc item with default unit', () => {
      const type = 'Misc';
      const name = 'Gypsum';
      const amount = 20;

      addAndAssert(
        {type, name, amount},
        {type, name, amount, unit: 'g'},
      );
    });

    it('adds single misc item with non-default unit', () => {
      const type = 'Misc';
      const name = 'Vanilla';
      const amount = 3;
      const unit = 'items';

      addAndAssert(
        {type, name, amount, unit},
        {type, name, amount, unit},
      );
    });

    it('adds single yeast item', () => {
      const type = 'Yeast';
      const name = 'US-05';
      const amount = 2;

      addAndAssert(
        {type, name, amount},
        {type, name, amount, unit: 'pkg'},
      );
    });

  });

});
