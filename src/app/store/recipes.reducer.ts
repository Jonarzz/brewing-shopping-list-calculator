import {createReducer, on} from '@ngrx/store';
import {InventoryItem} from '../model';
import {addRecipe, addRecipeItem, removeRecipe, removeRecipeItem} from './recipes.actions';
import {ItemByName, ItemsByRecipeName} from './store';

export const RECIPES_KEY = 'recipes';

export const initialState: Record<string, ItemByName> =
  Object.entries(JSON.parse(localStorage.getItem(RECIPES_KEY) || '{}'))
        .reduce((all, [recipeName, itemByName]) => {
          all[recipeName] = Object.entries(<ItemsByRecipeName>itemByName)
                                  .reduce((grouped, [itemName, item]) => {
                                    const invItem = <InventoryItem>item;
                                    grouped[itemName] = new InventoryItem(invItem.type, invItem.name, invItem.amount, invItem.unit);
                                    return grouped;
                                  }, <ItemByName>{});
          return all;
        }, <Record<string, ItemByName>>{});

export const recipesReducer = createReducer(
  initialState,
  on(addRecipe, (state, {recipeName}) => {
    if (state[recipeName]) {
      return state;
    }
    return {
      ...state,
      [recipeName]: {},
    };
  }),
  on(addRecipeItem, (state, {recipeName, item}) => {
    const recipe = state[recipeName];
    if (!recipe) {
      return state;
    }
    const itemName = item.name;
    const matchingItem = recipe[itemName];
    let itemToAdd = item;
    if (matchingItem) {
      itemToAdd = matchingItem.mergedWith(item);
    }
    const newRecipe = {
      ...recipe,
      [itemName]: itemToAdd,
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
    const itemByName = {...recipe};
    delete itemByName[item.name];
    return {
      ...state,
      [recipeName]: itemByName,
    };
  }),
  on(removeRecipe, (state, {recipeName}) => {
    const copy = {...state};
    delete copy[recipeName];
    return copy;
  }),
);