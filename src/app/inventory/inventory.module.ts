import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {StoreModule} from '@ngrx/store';
import {InventoryFormComponent} from './components/inventory-form/inventory-form.component';
import {InventoryRowsComponent} from './components/inventory-rows/inventory-rows.component';
import {InventoryComponent} from './components/inventory.component';
import {StoredItemsByTypePipe} from './inventory.pipes';
import {inventoryReducer} from './store/inventory.reducer';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryFormComponent,
    InventoryRowsComponent,
    StoredItemsByTypePipe
  ],
  exports: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inventory', inventoryReducer, {}),
    MatCardModule,
    FlexModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
})
export class InventoryModule { }
