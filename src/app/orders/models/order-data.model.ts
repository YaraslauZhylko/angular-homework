import { Book } from './../../books';
import { User } from './../../users';
import { Order } from './order.model';

export class OrderData {

  constructor(
    public order?: Order,
    public client?: User,
    public books?: Array<Book>
  ) {
    this.order = this.order || null;
    this.client = this.client || null;
    this.books = this.books || new Array<Book>();
  }
}
