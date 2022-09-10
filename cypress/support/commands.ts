function * ignoringFirstCall(callback: Function, count = 0) {
  while (true) {
    if (count > 0) {
      callback();
    }
    yield ++count;
  }
}

export const subscribeForStoreChanges = (subscriber: Function) => {
  let captor: any;
  const storeChangeTracker = ignoringFirstCall(() => subscriber(captor));
  return cy.window()
    .its('store')
    .invoke('subscribe', (state: any) => {
      captor = state;
      storeChangeTracker.next();
    });
};

export const expectNoStoreChanges = () => {
  return subscribeForStoreChanges(() => {
    throw 'Unexpected store change';
  });
};

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