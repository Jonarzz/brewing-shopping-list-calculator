import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {InventoryModule} from '../../pages/inventory/inventory.module';
import {GroupedItemRows} from './grouped-item-rows.component';

describe('GroupedItemRows', () => {
  let component: GroupedItemRows;
  let fixture: ComponentFixture<GroupedItemRows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   imports: [
                     StoreModule.forRoot({}),
                     InventoryModule,
                     NoopAnimationsModule
                   ],
                 })
                 .compileComponents();

    fixture = TestBed.createComponent(GroupedItemRows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
