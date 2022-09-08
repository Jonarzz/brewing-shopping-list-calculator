import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {ShoppingListComponent} from './components/shopping-list.component';

@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  exports: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('shopping-list', {}, {}),
  ],
})
export class ShoppingListModule { }
