import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {InventoryItem} from '../../model';
import {addRecipe, addRecipeItem, removeRecipe, removeRecipeItem} from '../../store/recipes.actions';
import {ItemsByRecipeName, recipesWithGroupedItems} from '../../store/store';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {

  recipes!: ItemsByRecipeName;

  expandedRecipes: Set<string> = new Set();
  lastSavedItem?: InventoryItem;

  recipeName = new FormControl('', [Validators.required]);

  constructor(private store: Store) {
    store.select(recipesWithGroupedItems)
         .subscribe(value => this.recipes = value);
  }

  addRecipeItem(recipeName: string, item: InventoryItem) {
    this.lastSavedItem = item;
    this.store.dispatch(addRecipeItem({recipeName, item}));
  }

  removeRecipeItem(recipeName: string, item: InventoryItem) {
    this.store.dispatch(removeRecipeItem({recipeName, item}))
  }

  addRecipe() {
    const {value} = this.recipeName;
    if (value) {
      this.store.dispatch(addRecipe({recipeName: value}));
      this.recipeName.reset();
      this.expandedRecipes = new Set([value]);
    }
  }

  removeRecipe(recipeName: string) {
    this.store.dispatch(removeRecipe({recipeName}));
    this.expandedRecipes.delete(recipeName);
  }
}
