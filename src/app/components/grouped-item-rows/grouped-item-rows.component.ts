import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InventoryItem} from '../../model/Inventory.types';
import {removeFromInventory} from '../../store/inventory.actions';
import {initialState} from '../../store/inventory.reducer';
import {INVENTORY_STORE} from '../../store/store';

@Component({
  selector: 'app-grouped-item-rows',
  templateUrl: './grouped-item-rows.component.html',
  styleUrls: ['./grouped-item-rows.component.css']
})
export class GroupedItemRows {

  inventory$: Observable<typeof initialState>;

  constructor(private store: Store<{ [INVENTORY_STORE]: any }>) {
    // TODO selector
    // TODO rest of the tests
    this.inventory$ = store.select(INVENTORY_STORE);
  }

  handleRemove(item: InventoryItem) {
    this.store.dispatch(removeFromInventory({item}));
  }

}
