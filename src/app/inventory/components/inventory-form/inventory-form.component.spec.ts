import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {InventoryModule} from '../../inventory.module';

import {InventoryFormComponent} from './inventory-form.component';

describe('InventoryFormComponent', () => {
  let component: InventoryFormComponent;
  let fixture: ComponentFixture<InventoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   imports: [
                     StoreModule.forRoot({}),
                     InventoryModule,
                     NoopAnimationsModule
                   ],
                 })
                 .compileComponents();

    fixture = TestBed.createComponent(InventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
