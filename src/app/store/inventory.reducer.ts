import {createReducer, on} from '@ngrx/store';
import {InventoryItem} from '../model';
import {addToInventory, removeFromInventory} from './inventory.actions';

export const initialState: Record<string, InventoryItem> = {};

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