import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InventoryItem} from '../../model';
import {ItemsByType} from '../../store/store';

@Component({
  selector: 'app-grouped-item-rows',
  templateUrl: './grouped-item-rows.component.html',
  styleUrls: ['./grouped-item-rows.component.css']
})
export class GroupedItemRows implements OnInit {

  @Input()
  itemsByType!: ItemsByType;
  @Input()
  showDeleteButton = true;
  @Output()
  removeItem = new EventEmitter<InventoryItem>();

  ngOnInit(): void {
    if (!this.itemsByType) {
      throw new Error('"itemsByType" input is required');
    }
  }

}
