import {Component, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {InventoryItem, InventoryItemType, InventoryItemUnit, unitForType} from '../../Inventory.types';
import {addToInventory} from '../../store/inventory.actions';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
})
export class InventoryFormComponent {

  AVAILABLE_TYPES = Object.values(InventoryItemType);
  AVAILABLE_UNITS = Object.values(InventoryItemUnit);

  type = new FormControl<InventoryItemType>(<any>null, [Validators.required]);
  name = new FormControl('', [Validators.required]);
  amount = new FormControl<number>(<any>null, [Validators.required]);
  unit = new FormControl<InventoryItemUnit>(<any>null, []);

  @ViewChild('addButton')
  addButton!: MatButton;

  userHasSetUnit = false;

  constructor(private store: Store<{ inventory: any }>) {
  }

  handleTypeSelection() {
    const {type} = this;
    if (!this.userHasSetUnit && type.value) {
      this.unit.setValue(unitForType(type.value));
      this.resetVaryingFields();
    }
  }

  handleUnitSelection() {
    this.userHasSetUnit = true;
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
    this.store.dispatch(addToInventory({item}));
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
