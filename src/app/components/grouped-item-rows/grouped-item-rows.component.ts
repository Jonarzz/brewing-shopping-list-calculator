import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {InventoryItem} from '../../model/Inventory.types';
import {removeFromInventory} from '../../store/inventory.actions';
import {inventoryItemsByType, ItemsByType} from '../../store/store';

@Component({
  selector: 'app-grouped-item-rows',
  templateUrl: './grouped-item-rows.component.html',
  styleUrls: ['./grouped-item-rows.component.css']
})
export class GroupedItemRows {

  itemsByType!: ItemsByType;

  constructor(private store: Store) {
    store.select(inventoryItemsByType)
         .subscribe(itemsByType => this.itemsByType = itemsByType);
  }

  handleRemove(item: InventoryItem) {
    this.store.dispatch(removeFromInventory({item}));
  }

}
