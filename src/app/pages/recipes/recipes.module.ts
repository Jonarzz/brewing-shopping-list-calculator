import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {ComponentsModule} from '../../components/components.module';
import {RecipesComponent} from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
  ],
  exports: [
    RecipesComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
})
export class RecipesModule { }
