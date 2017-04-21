export class Book {

  constructor(
    public id: string,
    public title: string,
    public author: string,
    public price: number,
    public count: number,
    public ratings?: number[]
  ) {
    this.id = this.id || null;
    this.ratings = this.ratings || [];
  }
}
