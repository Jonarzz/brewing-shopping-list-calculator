import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ComponentsModule} from '../../components/components.module';
import {InventoryComponent} from './inventory.component';

@NgModule({
  declarations: [
    InventoryComponent,
  ],
  exports: [
    InventoryComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
  ],
})
export class InventoryModule { }
