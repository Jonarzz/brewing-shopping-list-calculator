import {mount} from 'cypress/angular';

import './commands';
import {expectNoStoreChanges, subscribeForStoreChanges} from './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      subscribeForStoreChanges: typeof subscribeForStoreChanges,
      expectNoStoreChanges: typeof expectNoStoreChanges,
    }
  }
}

Cypress.Commands.add('mount', mount)

Cypress.Commands.add('subscribeForStoreChanges', subscribeForStoreChanges);
Cypress.Commands.add('expectNoStoreChanges', expectNoStoreChanges);
