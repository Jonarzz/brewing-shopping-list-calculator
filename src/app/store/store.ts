import {inventoryReducer} from './inventory.reducer';

export const INVENTORY_STORE = 'inventory';

export const STORE = {
  [INVENTORY_STORE]: inventoryReducer
}