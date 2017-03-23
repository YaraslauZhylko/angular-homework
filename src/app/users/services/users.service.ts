import { Injectable } from '@angular/core';

import {User} from './../';

@Injectable()
export class UsersService {

  private users: Array<User> = [
    new User(1, "Зьміцер Красоўскі"),
    new User(2, "Ян Васілевіч")
  ];

  get(id:number): User {
    for (let user of this.users) {
      if (user.id === id) return user;
    }
  }

  getAll(): Array<User> {
    return this.users;
  }

  delete(user:User):void {
    let userIndex = this.users.indexOf(user);
    if (userIndex >= 0) this.users.splice(userIndex, 1);
  }
}
