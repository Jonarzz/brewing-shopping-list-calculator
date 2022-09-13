import './commands';
import {addItem, assertItemsCard, assertItemsCardDoesNotExist, deleteItem} from './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      addItem: typeof addItem,
      deleteItem: typeof deleteItem,
      assertItemsCard: typeof assertItemsCard,
      assertItemsCardDoesNotExist: typeof assertItemsCardDoesNotExist,
    }
  }
}

Cypress.Commands.add('addItem', addItem);
Cypress.Commands.add('deleteItem', deleteItem);
Cypress.Commands.add('assertItemsCard', assertItemsCard);
Cypress.Commands.add('assertItemsCardDoesNotExist', assertItemsCardDoesNotExist);
