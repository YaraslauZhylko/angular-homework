import { Injectable }  from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  NavigationExtras,
  CanLoad,
  CanActivate,
  CanActivateChild
} from '@angular/router';

import { AuthService } from './../services';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    protected authService: AuthService,
  ) { }

  canLoad(route: Route): boolean {
    return this.checkLogin(`/${route.path}`);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    let isLoggedIn
    if (this.authService.isLoggedIn()) {
      if (this.checkLoginSpecific())
        return true;
    } else {
      alert("You must login to proceed.")
    }
    let navigationExtras: NavigationExtras = { queryParams: { 'redirectUrl': url } };
    this.router.navigate(['login'], navigationExtras);
    return false;
  }

  protected checkLoginSpecific(): boolean {
    return true;
  }
}
