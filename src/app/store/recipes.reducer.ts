import {createReducer, on} from '@ngrx/store';
import {addRecipe, addRecipeItem, removeRecipe, removeRecipeItem} from './recipes.actions';
import {ItemByName} from './store';

export interface RecipeState {
  itemByName: ItemByName
}

export const initialState: Record<string, RecipeState> = {};

export const recipesReducer = createReducer(
  initialState,
  on(addRecipe, (state, {recipeName}) => {
    if (state[recipeName]) {
      return state;
    }
    return {
      ...state,
      [recipeName]: {
        itemByName: {}
      }
    };
  }),
  on(addRecipeItem, (state, {recipeName, item}) => {
    const recipe = state[recipeName];
    if (!recipe) {
      return state;
    }
    const itemName = item.name;
    const matchingItem = recipe.itemByName[itemName];
    let itemToAdd = item;
    if (matchingItem) {
      itemToAdd = matchingItem.mergedWith(item);
    }
    const newRecipe = {
      itemByName: {
        ...recipe.itemByName,
        [itemName]: itemToAdd
      },
    };
    return {
      ...state,
      [recipeName]: newRecipe,
    };
  }),
  on(removeRecipeItem, (state, {recipeName, item}) => {
    const recipe = state[recipeName];
    if (!recipe) {
      return state;
    }
    const itemByName = {...recipe.itemByName};
    delete itemByName[item.name]
    const newRecipe = {
      itemByName
    };
    return {
      ...state,
      [recipeName]: newRecipe,
    };
  }),
  on(removeRecipe, (state, {recipeName}) => {
    const copy = {...state};
    delete copy[recipeName];
    return copy;
  }),
);