import { Book } from './../../books';
import { User } from './../../users';
import { Order } from './order.model';

export class OrdersData {

  constructor(
    public orders?: Array<Order>,
    public clients?: Array<User>,
    public books?: Array<Book>
  ) {
    this.orders = this.orders || new Array<Order>();
    this.clients = this.clients || new Array<User>();
    this.books = this.books || new Array<Book>();
  }
}
