import {Store} from '@ngrx/store';


function * ignoringFirstCall(callback: Function, count = 0) {
  while (true) {
    if (count > 0) {
      callback();
    }
    yield ++count;
  }
}

export const subscribeForStoreChanges = (subscriber: Function) => {
  // @ts-ignore
  const {store}: { store: Store } = window;
  let captor: any;
  const storeChangeTracker = ignoringFirstCall(() => subscriber(captor));
  store.subscribe(state => {
    captor = state;
    storeChangeTracker.next();
  });
};

export const expectNoStoreChanges = () => {
  subscribeForStoreChanges(() => {
    throw 'Unexpected store change';
  });
};
