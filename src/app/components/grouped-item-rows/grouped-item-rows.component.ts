import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InventoryItem} from '../../model/Inventory.types';
import {removeFromInventory} from '../../store/inventory.actions';
import {inventoryItemsByType, ItemsByType} from '../../store/store';

@Component({
  selector: 'app-grouped-item-rows',
  templateUrl: './grouped-item-rows.component.html',
  styleUrls: ['./grouped-item-rows.component.css']
})
export class GroupedItemRows {

  itemsByType$: Observable<ItemsByType>;

  constructor(private store: Store) {
    this.itemsByType$ = store.select(inventoryItemsByType);
    this.itemsByType$.subscribe(e => console.log(e));
  }

  handleRemove(item: InventoryItem) {
    this.store.dispatch(removeFromInventory({item}));
  }

}
