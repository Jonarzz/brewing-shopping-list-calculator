import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';

@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  exports: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class ShoppingListModule { }
