import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User, UsersService } from './../..';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: Array<User>;
  private modifiedUser: Object = {};
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
          this.modifiedUser['id'] = String(params['id']);
          this.modifiedUser['isNew'] = params['isNew'];
      });
    this.usersService.getAll()
      .then(users => {
        this.users = users
          .sort((user1, user2) => {
            if (user1.fullName() > user2.fullName()) return 1;
            if (user1.fullName() < user2.fullName()) return -1;
            return 0;
          });
        })
      .catch((error) => alert(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addUser(): void {
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}
