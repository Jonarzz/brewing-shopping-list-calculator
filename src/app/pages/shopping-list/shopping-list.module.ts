import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ComponentsModule} from '../../components/components.module';
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
    ComponentsModule,
  ],
})
export class ShoppingListModule { }
