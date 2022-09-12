import {createFeatureSelector, createSelector} from '@ngrx/store';
import {InventoryItem, InventoryItemType} from '../model';
import {initialState as inventoryInitialState, inventoryReducer} from './inventory.reducer';
import {initialState as recipesInitialState, recipesReducer} from './recipes.reducer';

const INVENTORY_KEY = 'inventory';
const RECIPES_KEY = 'recipes';

export const STORE = {
  [INVENTORY_KEY]: inventoryReducer,
  [RECIPES_KEY]: recipesReducer,
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
                   mapped[recipeName] = groupItemsByType(recipe.itemByName);
                   return mapped;
                 }, <ItemsByRecipeName>{});
  });