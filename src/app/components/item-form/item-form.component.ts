import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {availableUnitsForType, defaultUnitForType, InventoryItem, InventoryItemType, InventoryItemUnit} from '../../model';
import {itemNames} from '../../store/store';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {

  @Input()
  initialValues?: { type: InventoryItemType, unit: InventoryItemUnit };
  @Output()
  private addItem = new EventEmitter<InventoryItem>();

  AVAILABLE_TYPES = Object.values(InventoryItemType);

  availableUnits = Object.values(InventoryItemUnit);

  knownNames: string[] = [];

  type = new FormControl<InventoryItemType>(<any>null, [Validators.required]);
  name = new FormControl('', [Validators.required]);
  amount = new FormControl<number>(<any>null, [Validators.required]);
  unit = new FormControl<InventoryItemUnit>(<any>null, []);

  @ViewChild('addButton')
  addButton!: MatButton;

  private unitSetManually = false;

  constructor(store: Store) {
    store.select(itemNames)
         .subscribe(value => this.knownNames = Array.from(value).sort());
  }

  ngOnInit(): void {
    if (!this.addItem) {
      throw new Error('"addItem" output is required');
    }
    if (this.initialValues) {
      const {type, unit} = this.initialValues;
      this.type.setValue(type);
      this.unit.setValue(unit);
      this.handleTypeSelection();
    }
  }

  handleTypeSelection() {
    const {type: {value: typeValue}} = this;
    if (!typeValue) {
      return;
    }
    this.availableUnits = availableUnitsForType[typeValue];
    if (!this.unitSetManually || this.availableUnits.length === 1) {
      this.unit.setValue(defaultUnitForType[typeValue]);
      this.resetVaryingFields();
    }
  }

  handleUnitSelection() {
    this.unitSetManually = true;
  }

  handleAdd() {
    const {type, name, amount, unit} = this;
    if (!type.value) {
      this.focusInput('type');
      return;
    }
    if (!name.value?.trim()) {
      this.name.reset();
      this.focusInput('name');
      return;
    }
    if (!amount.value || amount.value <= 0) {
      this.amount.reset();
      this.focusInput('amount');
      return;
    }
    const item = new InventoryItem(type.value, name.value, amount.value, unit.value);
    this.addItem.emit(item);
    this.addButton.ripple.launch({centered: true});
    this.resetVaryingFields();
  }

  private resetVaryingFields() {
    this.name.reset();
    this.focusInput('name');
    setTimeout(() => this.amount.reset(), 10);
  }

  private focusInput(inputName: string) {
    const input = document.getElementById(inputName + '-input');
    if (input) {
      setTimeout(() => input.focus(), 0);
    }
  }
}
