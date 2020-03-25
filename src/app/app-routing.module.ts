import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomePageComponent } from './home-page/home-page.component'
import { DashboardRedirectGuard } from './dashboard-redirect.guard'
import { LoginRedirectGuard } from './login-redirect.guard'


const routes: Routes = [
  {path:'',component: HomePageComponent, canActivate: [LoginRedirectGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[DashboardRedirectGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
