import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, UsersService } from './../users';

@Injectable()
export class AuthService {

  public user: User;

  constructor(private usersService: UsersService) { }

  login(id: string): Observable<User> {
    return Observable.fromPromise(this.usersService.get(id)).do(user => this.user = user);
  }

  logout(): void {
    this.user = undefined;
  }

  isLoggedIn(): Boolean {
    return !!this.user;
  }

  isLoggedInAsAdmin(): Boolean {
    return this.user && this.user.isAdmin;
  }
}
