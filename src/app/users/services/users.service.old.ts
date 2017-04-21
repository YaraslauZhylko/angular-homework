import { Injectable, Inject } from '@angular/core';

import { UNIQUE_ID_8, StorageService } from './../../shared';
import { User } from './..';

@Injectable()
export class UsersService {

  entityType: string = 'user';

  constructor(
    @Inject(UNIQUE_ID_8) private uniqueId: any,
    private storage: StorageService
  ) {
    this.preSeedIfRequired();
  }

  // Storage-related methods:

  private preSeedIfRequired(): void {

    let alreadyPopulated = this.storage.getAll(this.entityType).length > 0;

    if (!alreadyPopulated) {
      if (this.storage) alert("Initially pre-seeding localStorage with user data...");
      this.save(new User(null, "Зьміцер", "Красоўскі", true));
      this.save(new User(null, "Ян", "Васілевіч"));
    }
  }

  // PUBLIC METHODS:

  getAll(ids?: Array<string>): Promise<Array<User>> {
    return Promise.resolve(
      this.storage.getAll(this.entityType)
        .filter(user => !ids || ids.indexOf(user.id) >= 0)
        .map(user => User.fromJSON(user)));
  }

  get(id: string): Promise<User> {
    let user = this.storage.get(this.entityType, id);
    if (user) return Promise.resolve(User.fromJSON(user))
    else return Promise.reject("User not found.");
  }

  save(user: User): Promise<any> {

    let saveUser = (user) => Promise.resolve(this.storage.set(this.entityType, user.id, user));
    let userNotFound = () => Promise.reject("This user has already been deleted.");

    if (user.id) {
      return this.get(user.id)
        .then(() => saveUser(user))
        .catch(() => userNotFound());
    } else {
      user.id = this.uniqueId();
      return saveUser(user);
    }
  }

  delete(id: string): Promise<any> {
    return Promise.resolve(this.storage.remove(this.entityType, id));
  }
}
