import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store, StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {InventoryModule} from './pages/inventory/inventory.module';
import {RecipesModule} from './pages/recipes/recipes.module';
import {ShoppingListModule} from './pages/shopping-list/shopping-list.module';
import {REDUCERS, STORE_CONFIG} from './store/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    InventoryModule,
    RecipesModule,
    ShoppingListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    StoreModule.forRoot(REDUCERS, STORE_CONFIG),
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(store: Store) {
    // @ts-ignore
    if (window.Cypress) {
      // @ts-ignore
      window.store = store;
    }
  }
}
