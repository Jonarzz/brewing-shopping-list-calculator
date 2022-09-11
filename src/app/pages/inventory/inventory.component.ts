import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {InventoryItem} from '../../model';
import {addToInventory, removeFromInventory} from '../../store/inventory.actions';
import {inventoryItemsByType, ItemsByType} from '../../store/store';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {

  itemsByType!: ItemsByType;

  constructor(private store: Store) {
    store.select(inventoryItemsByType)
         .subscribe(itemsByType => this.itemsByType = itemsByType);
  }

  addItem = (item: InventoryItem) => this.store.dispatch(addToInventory({item}));
  removeItem = (item: InventoryItem) => this.store.dispatch(removeFromInventory({item}));
}
