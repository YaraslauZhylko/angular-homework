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
}
