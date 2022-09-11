import {createAction, props} from '@ngrx/store';
import {InventoryItem} from '../model';

export enum RecipesActionType {
  ADD = '[Recipes] Add',
  ADD_ITEM = '[Recipes] Add item',
  REMOVE_ITEM = '[Recipes] Remove item',
  REMOVE = '[Recipes] Remove',
}

export const addRecipe = createAction(RecipesActionType.ADD, props<{ recipeName: string }>());
export const addRecipeItem = createAction(RecipesActionType.ADD_ITEM, props<{ recipeName: string, item: InventoryItem }>());
export const removeRecipeItem = createAction(RecipesActionType.REMOVE_ITEM, props<{ recipeName: string, item: InventoryItem }>());
export const removeRecipe = createAction(RecipesActionType.REMOVE, props<{ recipeName: string }>());
