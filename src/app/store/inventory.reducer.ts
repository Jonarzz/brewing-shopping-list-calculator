import {createReducer, on} from '@ngrx/store';
import {InventoryItem} from '../model';
import {addToInventory, removeFromInventory} from './inventory.actions';
import {ItemByName} from './store';

export const INVENTORY_KEY = 'inventory';

export const initialState: ItemByName =
  Object.entries(JSON.parse(localStorage.getItem(INVENTORY_KEY) || '{}'))
        .reduce((all, [name, item]) => {
          const invItem = <InventoryItem>item;
          all[name] = new InventoryItem(invItem.type, invItem.name, invItem.amount, invItem.unit);
          return all;
        }, <ItemByName>{});

export const inventoryReducer = createReducer(
  initialState,
  on(addToInventory, (state, {item}) => {
    const current = state[item.name];
    let toSave = item;
    if (current) {
      toSave = current.mergedWith(item);
    }
    return {
      ...state,
      [item.name]: toSave,
    };
  }),
  on(removeFromInventory, (state, {item}) => {
    const copy = {...state};
    delete copy[item.name];
    return copy;
  }),
);