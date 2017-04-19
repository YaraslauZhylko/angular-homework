import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';

import { User, UsersService } from './..';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<User> {
    let id = route.params['id'];
    return this.usersService.get(id)
      .catch(error => {
        alert(error);
        this.router.navigate(['admin', 'users']);
      });
  }
}
