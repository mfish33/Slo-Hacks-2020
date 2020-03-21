import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module'
import { RouterModule } from '@angular/router';
import { DataInputSideComponent } from './data-input-side/data-input-side.component';
import { GraphSideComponent } from './graph-side/graph-side.component';
import { LivingExpensesComponent } from './living-expenses/living-expenses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasicInfoComponent } from './basic-info/basic-info.component'
import { ExpensePieChartComponent } from './expense-pie-chart/expense-pie-chart.component';
import { InvestmentInfoComponent } from './investment-info/investment-info.component';
import { InvestmentChartComponent } from './investment-chart/investment-chart.component';
import { ExpenseWidgetComponent } from './expense-widget/expense-widget.component';
import { BudgetPieComponent } from './budget-pie/budget-pie.component'
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    DataInputSideComponent,
    GraphSideComponent,
    LivingExpensesComponent,
    HomePageComponent,
    DashboardComponent,
    BasicInfoComponent,
    ExpensePieChartComponent,
    InvestmentInfoComponent,
    InvestmentChartComponent,
    ExpenseWidgetComponent,
    BudgetPieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: "AIzaSyDjrWEhUtdfhx51K2DqlBFfdXhdAyzeDGA",
      authDomain: "polyhacks-2020-56b90.firebaseapp.com",
      databaseURL: "https://polyhacks-2020-56b90.firebaseio.com",
      projectId: "polyhacks-2020-56b90",
      storageBucket: "polyhacks-2020-56b90.appspot.com",
      messagingSenderId: "514927881802",
      appId: "1:514927881802:web:b042aaa7428af1b633c0b3",
      measurementId: "G-2ZK16Q49TT"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
