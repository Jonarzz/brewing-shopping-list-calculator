import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {atLeastOneRecipeItemExists} from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  shoppingListDisabled = true;

  constructor(store: Store) {
    store.select(atLeastOneRecipeItemExists)
         .subscribe(value => this.shoppingListDisabled = !value);
  }

}
