export class Book {

  constructor(
    public id: string,
    public title: string,
    public author: string,
    public ratings?: number[]
  ) {
    this.id = this.id || null;
    this.ratings = this.ratings || [];
  }

  averageRating(): any  {
    if (this.ratings.length === 0) return 'n/a';
    var sum = 0;
    for (let rating of this.ratings) {
      sum += rating;
    }
    return Math.round((sum / this.ratings.length) * 10) / 10;
  }

  static fromJSON(jsonObject: Object): Book {
    if (!jsonObject) return undefined;
    let emptyBook = Object.create(Book.prototype);
    return Object.assign(emptyBook, jsonObject);
  }
}
