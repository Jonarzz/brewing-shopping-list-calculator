import {createReducer, on} from '@ngrx/store';
import {InventoryItem, InventoryItemUnit} from '../model/Inventory.types';
import {addToInventory, removeFromInventory} from './inventory.actions';

export const initialState: Record<string, InventoryItem> = {};

const _recalculateUnits = (amount: number,
                           sourceUnit: InventoryItemUnit,
                           targetUnit: InventoryItemUnit): number => {
  switch (sourceUnit) {
    case InventoryItemUnit.GRAM:
      if (targetUnit === InventoryItemUnit.KILOGRAM) {
        return amount / 1000;
      }
      return amount;
    case InventoryItemUnit.KILOGRAM:
      if (targetUnit === InventoryItemUnit.GRAM) {
        return amount * 1000;
      }
      return amount;
    default:
      throw `Unit ${sourceUnit} cannot be recalculated to ${targetUnit}`;
  }
};

export const inventoryReducer = createReducer(
  initialState,
  on(addToInventory, (state, {item}) => {
    const current = state[item.name];
    let toSave = item;
    if (current) {
      const recalculated = _recalculateUnits(item.amount, item.unit, current.unit);
      // gotta love JS
      const sum = (+current.amount) + (+recalculated);
      toSave = new InventoryItem(current.type, current.name, sum, current.unit);
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