import {mount} from 'cypress/angular';

import './commands';
import {
  addItem, assertItemsCard, assertItemsCardDoesNotExist, assertNoItemsCardExists, clickAddButton, deleteItem, fillAmountInput, fillNameInput, selectType,
  selectUnit,
} from './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      selectType: typeof selectType,
      selectUnit: typeof selectUnit,
      fillNameInput: typeof fillNameInput,
      fillAmountInput: typeof fillAmountInput,
      clickAddButton: typeof clickAddButton,
      addItem: typeof addItem,
      deleteItem: typeof deleteItem,
      assertItemsCard: typeof assertItemsCard,
      assertItemsCardDoesNotExist: typeof assertItemsCardDoesNotExist,
      assertNoItemsCardExists: typeof assertNoItemsCardExists,
    }
  }
}

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('selectType', selectType);
Cypress.Commands.add('selectUnit', selectUnit);
Cypress.Commands.add('fillNameInput', fillNameInput);
Cypress.Commands.add('fillAmountInput', fillAmountInput);
Cypress.Commands.add('clickAddButton', clickAddButton);

Cypress.Commands.add('addItem', addItem);
Cypress.Commands.add('deleteItem', deleteItem);
Cypress.Commands.add('assertItemsCard', assertItemsCard);
Cypress.Commands.add('assertItemsCardDoesNotExist', assertItemsCardDoesNotExist);
Cypress.Commands.add('assertNoItemsCardExists', assertNoItemsCardExists);
