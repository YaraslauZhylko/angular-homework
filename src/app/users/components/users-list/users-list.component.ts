import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User, UsersService, FullNamePipe } from './../..';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./../../../shared/css/shared.css'],
  providers: [FullNamePipe]
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: Array<User>;
  private modifiedUser: Object = {};
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private fullNamePipe: FullNamePipe
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
            let userName1 = this.fullNamePipe.transform(user1);
            let userName2 = this.fullNamePipe.transform(user2);
            if (userName1 > userName2) return 1;
            if (userName1 < userName2) return -1;
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
