import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {RecipesComponent} from './components/recipes.component';

@NgModule({
  declarations: [
    RecipesComponent
  ],
  exports: [
    RecipesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('recipes', {}, {}),
  ],
})
export class RecipesModule { }
