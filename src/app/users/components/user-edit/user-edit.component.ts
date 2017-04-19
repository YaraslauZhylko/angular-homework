import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UsersService } from './../..';
import { DialogueService }  from './../../../services';


@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  oldUser: User;

  saveError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private dialogueService: DialogueService
  ) { }

  ngOnInit() {
    this.user = new User(null, "", "");
    this.route.data.forEach((data: { user: User }) => {
      if (data.user) {
        this.user = data.user;
        this.oldUser = Object.assign({}, data.user);
      }
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.oldUser) return true;
    if (this.oldUser.firstName === this.user.firstName &&
        this.oldUser.lastName === this.user.lastName &&
        this.oldUser.isAdmin === this.user.isAdmin) return true;
    return this.dialogueService.confirm('Discard changes?');
  }

  saveUser() {
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    if (!this.user.firstName || !this.user.lastName) {
      this.saveError = "Please fill in user's first and last names."
    } else {
      this.usersService.save(this.user)
        .then(() => {
          let userExtras = {id: this.user.id, isNew: !(this.oldUser)};
          this.oldUser = this.user;
          return userExtras
        })
        .then(extras => this.goBack(extras))
        .catch(error => alert(error));
    }
  }

  deleteUser() {
    this.dialogueService.confirm('Delete user?')
      .then(doDelete => {
        if (doDelete) {
          this.usersService.delete(this.user.id)
            .then(() => this.oldUser = this.user = undefined)
            .then(() => this.goBack())
            .catch(error => alert(error));
        }
      });
  }

  cancel() {
    this.goBack();
  }

  private goBack = (extras?: Object)  => this.router.navigate(['./', extras || {}], {relativeTo: this.route.parent});
}
