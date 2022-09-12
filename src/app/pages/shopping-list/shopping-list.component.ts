import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {InventoryItem, InventoryItemType} from '../../model';
import {inventoryItemsByType, ItemsByRecipeName, ItemsByType, recipesWithGroupedItems} from '../../store/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {

  inventoryItems: ItemsByType = {};
  recipesItems: ItemsByType = {};
  shoppingList: ItemsByType = {};

  constructor(store: Store) {
    store.select(inventoryItemsByType)
         .subscribe(value => {
           this.inventoryItems = value;
           this.recalculateShoppingList();
         });
    store.select(recipesWithGroupedItems)
         .subscribe(value => {
           this.recipesItems = this.flattenRecipesItems(value);
           this.recalculateShoppingList();
         });
  }

  private flattenRecipesItems(value: ItemsByRecipeName) {
    return Object.values(value)
                 .reduce((all, current) => {
                   Object.entries(current)
                         .forEach(([type, items]) => {
                           let typeItems = all[<InventoryItemType>type];
                           if (!typeItems) {
                             typeItems = [];
                             all[<InventoryItemType>type] = typeItems;
                           }
                           for (let item of items) {
                             const index = typeItems.findIndex(typeItem => typeItem.name === item.name);
                             if (index >= 0) {
                               typeItems[index] = typeItems[index].mergedWith(item);
                             } else {
                               typeItems.push(item);
                             }
                           }
                         });
                   return all;
                 }, <ItemsByType>{});
  }

  private recalculateShoppingList = () => {
    const itemByTypeAndName =
      Object.entries(this.inventoryItems)
            .reduce((result, [type, items]) => {
              items.forEach(item => {
                if (!result[type]) {
                  result[type] = {};
                }
                result[type][item.name] = item;
              });
              return result;
            }, <Record<string, Record<string, InventoryItem>>>{});
    this.shoppingList =
      Object.entries(this.recipesItems)
            .reduce((result, [type, items]) => {
              for (let item of items) {
                let diffItem = item;
                const inventoryItem = itemByTypeAndName[type]?.[item.name];
                if (inventoryItem) {
                  diffItem = item.diffItem(inventoryItem);
                }
                if (diffItem.amount > 0) {
                  let targetItems = result[<InventoryItemType>type];
                  if (!targetItems) {
                    targetItems = [];
                    result[<InventoryItemType>type] = targetItems;
                  }
                  targetItems.push(diffItem);
                }
              }
              return result;
            }, <ItemsByType>{});
  };

}
