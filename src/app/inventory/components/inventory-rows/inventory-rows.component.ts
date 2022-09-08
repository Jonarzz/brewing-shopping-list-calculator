import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InventoryItem} from '../../Inventory.types';
import {removeFromInventory} from '../../store/inventory.actions';
import {initialState} from '../../store/inventory.reducer';

@Component({
  selector: 'app-inventory-rows',
  templateUrl: './inventory-rows.component.html',
  styleUrls: ['./inventory-rows.component.css']
})
export class InventoryRowsComponent {

  inventory$: Observable<typeof initialState>;

  constructor(private store: Store<{ inventory: any }>) {
    this.inventory$ = store.select('inventory');
  }

  handleRemove(item: InventoryItem) {
    this.store.dispatch(removeFromInventory({item}));
  }

}
