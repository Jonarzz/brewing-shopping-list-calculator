import {Pipe, PipeTransform} from '@angular/core';
import {InventoryItem, InventoryItemType} from '../../model/Inventory.types';

type Input = Record<string, InventoryItem> | null;
type Output = Partial<Record<InventoryItemType, InventoryItem[]>>;

@Pipe({
  name: 'storedItemsByType',
})
export class StoredItemsByTypePipe implements PipeTransform {

  transform(items: Input): Output {
    if (!items) {
      return {};
    }
    return Object.values(items)
                 .reduce((mapped, item) => {
                   let groupedItems = mapped[item.type];
                   if (!groupedItems) {
                     groupedItems = [];
                     mapped[item.type] = groupedItems;
                   }
                   groupedItems.push(item);
                   return mapped;
                 }, <Output>{});
  }
}