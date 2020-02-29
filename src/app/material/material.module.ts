import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'

const materialImports = [MatButtonModule,MatInputModule]

@NgModule({
  imports: [materialImports],
  exports: [materialImports]
})
export class MaterialModule { }
