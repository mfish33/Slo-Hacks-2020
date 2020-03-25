import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardRedirectGuard implements CanActivate {
  constructor(private auth:AuthServiceService, private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(map(user => {
      if(user?.uid) {
        return true
      }
      this.router.navigateByUrl('/')
      return false
    })) 
  }
}