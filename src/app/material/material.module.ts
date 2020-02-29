import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

const materialImports = [MatButtonModule,MatInputModule, MatCardModule, MatIconModule]

@NgModule({
  imports: [materialImports],
  exports: [materialImports]
})
export class MaterialModule { }
