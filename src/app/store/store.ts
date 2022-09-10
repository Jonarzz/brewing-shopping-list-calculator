import {createFeatureSelector, createSelector} from '@ngrx/store';
import {InventoryItem, InventoryItemType} from '../model/Inventory.types';
import {initialState as inventoryInitialState, inventoryReducer} from './inventory.reducer';

const INVENTORY_KEY = 'inventory';

export const STORE = {
  [INVENTORY_KEY]: inventoryReducer
}

type InventoryState = typeof inventoryInitialState;
const inventoryFeature = createFeatureSelector<InventoryState>(INVENTORY_KEY);

export type ItemsByType = Record<InventoryItemType, InventoryItem[]>;
export const inventoryItemsByType = createSelector(inventoryFeature, (inventory: InventoryState) => {
  return Object.values(inventory)
               .reduce((mapped, item) => {
                 let groupedItems = mapped[item.type];
                 if (!groupedItems) {
                   groupedItems = [];
                   mapped[item.type] = groupedItems;
                 }
                 groupedItems.push(item);
                 return mapped;
               }, <ItemsByType>{});
});