export class User {

  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public isAdmin?: boolean
  ) {
    this.id = this.id || null;
    this.isAdmin = this.isAdmin || false;
  }

  fullName(): string  {
    return this.firstName + ' ' + this.lastName;
  }

  static fromJSON(jsonObject: Object): User {
    if (!jsonObject) return undefined;
    let emptyUser = Object.create(User.prototype);
    return Object.assign(emptyUser, jsonObject);
  }
}
