import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {cyIds} from '../../../../cypress/support/commands';
import {InventoryModule} from '../../pages/inventory/inventory.module';
import {ItemFormComponent} from './item-form.component';

// for each on the test case level does not work with Cypress component testing as of now
// hence for each loops are used in the test cases
describe('Item form', () => {

  beforeEach(() => {
    cy.mount('<app-item-form (addItem)="addItem($event)"></app-item-form>', {
      declarations: [ItemFormComponent],
      componentProperties: {
        addItem: cy.spy().as('addItemSpy')
      },
      imports: [
        InventoryModule,
        NoopAnimationsModule
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
      cy.clickAddButton();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.type}"]`)
        .should('exist')
        .get('@addItemSpy')
        .should('not.have.been.called');
    });

    it('focuses name field when add button clicked after type filled in', () => {
      cy.selectType('Grains');

      cy.clickAddButton();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.name}"]`)
        .should('exist')
        .get('@addItemSpy')
        .should('not.have.been.called');
    });

    it('focuses and resets name field when add button clicked with blank name input', () => {
      cy.selectType('Grains')
        .fillNameInput('   ');

      cy.clickAddButton();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.name}"]`)
        .should('exist')
        .and('have.value', '')
        .get('@addItemSpy')
        .should('not.have.been.called');
    });

    it('focuses amount field when add button clicked after type and name filled in', () => {
      cy.selectType('Grains')
        .fillNameInput('Pale Ale');

      cy.clickAddButton();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.amount}"]`)
        .should('exist')
        .get('@addItemSpy')
        .should('not.have.been.called');
    });

    it('focuses and resets amount field when add button clicked after type, name and negative amount filled in', () => {
      cy.selectType('Grains')
        .fillNameInput('Pale Ale')
        .fillAmountInput(-1);

      cy.clickAddButton();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.amount}"]`)
        .should('exist')
        .and('have.value', '')
        .get('@addItemSpy')
        .should('not.have.been.called');
    });

  });

  describe('units and types', () => {

    it('changes default unit on type selection', () => {
      for (let [type, expectedUnit] of [
        ['Grains', 'kg'],
        ['Hops', 'g'],
        ['Yeast', 'pkg'],
        ['Misc', 'g'],
      ]) {
        cy.selectType(type);

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
        cy.selectType(<string> type);

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

    it('changes and disables unit selection on type with single unit selection', () => {
      for (let [type, unit] of [
        ['Yeast', 'pkg'],
      ]) {
        cy.selectType(type);

        cy.get(`[data-cy="${cyIds.fields.unit}"]`)
          .should('have.class', 'mat-form-field-disabled')
          .find('.mat-select-value')
          .should('have.text', unit);
      }
    });

    it('does not change unit to default after manual unit selection and changing type', () => {
      for (let [verifiedType, nonDefaultUnit, otherType] of [
        ['Grains', 'g', 'Hops'],
        ['Hops', 'kg', 'Grains'],
        ['Misc', 'items', 'Hops']
      ]) {
        cy.selectType(verifiedType)
          .selectUnit(nonDefaultUnit)
          .selectType(otherType)
          .selectType(verifiedType);

        cy.get(`[data-cy="${cyIds.fields.unit}"] .mat-select-value`)
          .should('have.text', nonDefaultUnit);
      }
    });

    it('changes unit to default (single) even after manual unit selection', () => {
      for (let [verifiedType, verifiedTypeUnit, otherType, otherTypeNonDefaultUnit] of [
        ['Yeast', 'pkg', 'Grains', 'g'],
      ]) {
        cy.selectType(otherType)
          .selectUnit(otherTypeNonDefaultUnit);

        cy.selectType(verifiedType);

        cy.get(`[data-cy="${cyIds.fields.unit}"] .mat-select-value`)
          .should('have.text', verifiedTypeUnit);
      }
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
      cy.selectType(type)
        .fillNameInput(name)
        .fillAmountInput(amount);
      if (unit) {
        cy.selectUnit(unit);
      }

      cy.clickAddButton();

      cy.focused()
        .as('Focused element')
        .parents(`[data-cy="${cyIds.fields.name}"]`)
        .should('exist')
        .should('have.value', '')
        .get('@addItemSpy')
        .should('have.been.calledWithMatch', expectedItem);
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

    it('adds single yeast item with default unit', () => {
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
