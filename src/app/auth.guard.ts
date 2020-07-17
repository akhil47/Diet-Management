import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
    path: any
    route: any
    constructor(private auth: AuthService, private router: Router){
  
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.auth.isAutheticated()){
        this.router.navigate(['/login'])
      }
      else{
        return true
      }
      
    }
  }