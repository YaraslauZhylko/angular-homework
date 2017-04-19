import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { User, UsersService } from './../../users';
import { AuthService } from './../../services';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  private users: Array<User>;
  private loginUserId: string;
  private redirectUrl: string;
  private message: string;

  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.setMessage();
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      this.redirectUrl = params['redirectUrl'];
    });
    this.usersService.getAll()
      .then(users => this.users = users)
      .catch(error => alert(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in as ' + this.authService.user.fullName() : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    this.authService.login(this.loginUserId).subscribe(
      (user: User) => {
        this.setMessage();
        if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
      },
      (error: string) => {
        this.message = error;
        this.router.navigate([this.redirectUrl]);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
