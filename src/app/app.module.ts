import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {InventoryModule} from './inventory/inventory.module';
import {RecipesModule} from './recipes/recipes.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    InventoryModule,
    RecipesModule,
    ShoppingListModule,
    BrowserModule,
    NoopAnimationsModule,
    MatTabsModule,
    StoreModule.forRoot({}, {}),
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
