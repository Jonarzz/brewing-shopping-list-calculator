import 'cypress-localstorage-commands';

export const cyIds = {
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

const makeSelection = (cySelectId: string, cyOptionId: string) => cy.get(`[data-cy="${cySelectId}"]`)
                                                                    .click()
                                                                    .get(`[data-cy="${cyOptionId}"]`)
                                                                    .click();
export const selectType = (type: string) => makeSelection(cyIds.fields.type, `type-option-${type}`);
export const selectUnit = (unit: string) => makeSelection(cyIds.fields.unit, `unit-option-${unit}`);
const fillInput = (cyInputId: string, value: string) => cy.get(`[data-cy="${cyInputId}"]`)
                                                          .type(value);
export const fillNameInput = (value: string) => fillInput(cyIds.fields.name, value);
export const fillAmountInput = (value: number) => fillInput(cyIds.fields.amount, String(value));
export const clickAddButton = () => cy.get(`[data-cy="${cyIds.buttons.add}"]`)
                                      .click();

export const addItem = (type: string, name: string, amount: number) => {
  selectType(type);
  fillNameInput(name);
  fillAmountInput(amount);
  clickAddButton();
  return cy;
};

export const deleteItem = (name: string) => cy.get(`[data-cy="delete-${name}"]`)
                                              .click();

const cardSelectorFor = (type: string) => `[data-cy="items-card-${type}"]`;

export const assertItemsCard = (type: string, expectedRowElements: string[]) => {
  const cardSelector = cardSelectorFor(type);
  cy.get(cardSelector)
    .should('exist')
    .children('.mat-card-title')
    .should('have.text', type);
  return cy.get(cardSelector + ' .inventory-row div')
           .each((element, index) => expect(element).to.have.text(expectedRowElements[index]));
};

export const assertItemsCardDoesNotExist = (type: string) => cy.get(cardSelectorFor(type))
                                                               .should('not.exist');
export const assertNoItemsCardExists = () => cy.get('[data-cy^="items-card-"')
                                               .should('not.exist');