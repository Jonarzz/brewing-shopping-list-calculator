import {createAction, props} from '@ngrx/store';
import {InventoryItem} from '../model';

export enum InventoryActionType {
  ADD = '[Inventory] Add',
  REMOVE = '[Inventory] Remove',
}

export const addToInventory = createAction(InventoryActionType.ADD, props<{ item: InventoryItem }>());
export const removeFromInventory = createAction(InventoryActionType.REMOVE, props<{ item: InventoryItem }>());