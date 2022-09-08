import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {InventoryModule} from '../../inventory.module';

import {InventoryRowsComponent} from './inventory-rows.component';

describe('InventoryRowsComponent', () => {
  let component: InventoryRowsComponent;
  let fixture: ComponentFixture<InventoryRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   imports: [
                     StoreModule.forRoot({}),
                     InventoryModule,
                     NoopAnimationsModule
                   ],
                 })
                 .compileComponents();

    fixture = TestBed.createComponent(InventoryRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
