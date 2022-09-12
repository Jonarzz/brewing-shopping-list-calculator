import {ActionReducer, createFeatureSelector, createSelector} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';
import {InventoryItem, InventoryItemType} from '../model';
import {initialState as inventoryInitialState, INVENTORY_KEY, inventoryReducer} from './inventory.reducer';
import {initialState as recipesInitialState, RECIPES_KEY, recipesReducer} from './recipes.reducer';

export const REDUCERS = {
  [INVENTORY_KEY]: inventoryReducer,
  [RECIPES_KEY]: recipesReducer,
};

const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> =>
  localStorageSync({keys: Object.keys(REDUCERS)})(reducer);
export const STORE_CONFIG = {
  metaReducers: [localStorageSyncReducer]
};

export type ItemByName = Record<string, InventoryItem>;

type InventoryState = typeof inventoryInitialState;
type RecipesState = typeof recipesInitialState;

const inventoryFeature = createFeatureSelector<InventoryState>(INVENTORY_KEY);
const recipesFeature = createFeatureSelector<RecipesState>(RECIPES_KEY);

export type ItemsByType = Partial<Record<InventoryItemType, InventoryItem[]>>
export type ItemsByRecipeName = Record<string, ItemsByType>;

const groupItemsByType =
  (itemByName: ItemByName) => Object.values(itemByName)
                                    .reduce((mapped, item) => {
                                      let groupedItems = mapped[item.type];
                                      if (!groupedItems) {
                                        groupedItems = [];
                                        mapped[item.type] = groupedItems;
                                      }
                                      groupedItems.push(item);
                                      return mapped;
                                    }, <ItemsByType>{});

export const inventoryItemsByType =
  createSelector(inventoryFeature, (inventory: InventoryState) => groupItemsByType(inventory));

export const recipesWithGroupedItems =
  createSelector(recipesFeature, (recipes: RecipesState) => {
    return Object.entries(recipes)
                 .reduce((mapped, [recipeName, recipe]) => {
                   mapped[recipeName] = groupItemsByType(recipe);
                   return mapped;
                 }, <ItemsByRecipeName>{});
  });

export const atLeastOneRecipeItemExists =
  createSelector(recipesFeature, (recipes: RecipesState) => {
    return Object.values(recipes)
                 .filter(recipe => Object.keys(recipe).length > 0)
                 .length > 0;

  });