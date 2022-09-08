import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent
  ],
  exports: [
    RecipesComponent
  ],
  imports: [
    CommonModule
  ],
})
export class RecipesModule { }
