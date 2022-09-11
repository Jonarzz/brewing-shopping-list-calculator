import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {InventoryItem} from '../../model/Inventory.types';
import {addToInventory, removeFromInventory} from '../../store/inventory.actions';
import {inventoryItemsByType, ItemsByType} from '../../store/store';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {

  itemsByType!: ItemsByType;

  addItem: (item: InventoryItem) => void;
  removeItem: (item: InventoryItem) => void;

  constructor(store: Store) {
    store.select(inventoryItemsByType)
         .subscribe(itemsByType => this.itemsByType = itemsByType);
    this.addItem = item => store.dispatch(addToInventory({item}));
    this.removeItem = item => store.dispatch(removeFromInventory({item}));
  }
}
