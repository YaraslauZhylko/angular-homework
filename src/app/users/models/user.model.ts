export class User {

  constructor(
    public id: number,
    public name: string
  ) {
    this.id = this.id || null;
  }
}
