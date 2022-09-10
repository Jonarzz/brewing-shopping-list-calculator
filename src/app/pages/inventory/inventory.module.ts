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
import {GroupedItemRows} from '../../components/grouped-item-rows/grouped-item-rows.component';
import {ItemFormComponent} from '../../components/item-form/item-form.component';
import {InventoryComponent} from './inventory.component';

@NgModule({
  declarations: [
    InventoryComponent,
    ItemFormComponent,
    GroupedItemRows,
  ],
  exports: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
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
