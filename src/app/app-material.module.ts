import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const modules = [MatSliderModule, MatButtonModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatInputModule, MatFormFieldModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule { }
