import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module'
import { RouterModule } from '@angular/router';
import { DataInputSideComponent } from './data-input-side/data-input-side.component';
import { GraphSideComponent } from './graph-side/graph-side.component';

@NgModule({
  declarations: [
    AppComponent,
    DataInputSideComponent,
    GraphSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
