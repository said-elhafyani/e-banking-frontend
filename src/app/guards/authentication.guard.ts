import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAutheticated)
      return true;
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
// this guard is used to protect the routes that require authentication. It checks if the user is authenticated or not. If the user is authenticated, it returns true, otherwise, it redirects the user to the login page.
