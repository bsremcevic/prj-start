import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.isAuthenticated();

    //ako je ulogovan onda vraca true i sve moze da se otvori
    //ako nije ulogovan, vraca false, i ne moze da otvori new recipe i edit recipe
    //i pre toga je redirektovan
    if(this.authService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/recipes']);
      return false;
    }
  }
}
