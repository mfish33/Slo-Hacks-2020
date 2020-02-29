import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const materialImports = [MatButtonModule]

@NgModule({
  imports: [materialImports],
  exports: [materialImports]
})
export class MaterialModule { }
