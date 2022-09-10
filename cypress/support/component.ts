import {mount} from 'cypress/angular';

import './commands';
import {clickAddButton, expectNoStoreChanges, fillAmountInput, fillNameInput, selectType, selectUnit, subscribeForStoreChanges} from './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      subscribeForStoreChanges: typeof subscribeForStoreChanges,
      expectNoStoreChanges: typeof expectNoStoreChanges,
      selectType: typeof selectType,
      selectUnit: typeof selectUnit,
      fillNameInput: typeof fillNameInput,
      fillAmountInput: typeof fillAmountInput,
      clickAddButton: typeof clickAddButton,
    }
  }
}

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('subscribeForStoreChanges', subscribeForStoreChanges);
Cypress.Commands.add('expectNoStoreChanges', expectNoStoreChanges);

Cypress.Commands.add('selectType', selectType);
Cypress.Commands.add('selectUnit', selectUnit);
Cypress.Commands.add('fillNameInput', fillNameInput);
Cypress.Commands.add('fillAmountInput', fillAmountInput);
Cypress.Commands.add('clickAddButton', clickAddButton);
