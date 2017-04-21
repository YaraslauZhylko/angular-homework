import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Order, OrdersService } from './../..';
import { User, UsersService } from './../../../users';
import { Book, BooksService } from './../../../books';

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class OrdersListComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  private orders: Array<Order> = [];
  private clients: Array<User> = [];
  private books: Array<Book> = [];

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.sub = this.ordersService.getAll()
      .subscribe(
         orders => {
           orders = orders.filter(order => !order.isCompleted)
           let clientIds = orders.map(order => order.clientId);
           this.usersService.getAll(clientIds)
             .then(users => this.clients = users)
             .then(() => {
               let bookIds = orders.reduce(
                 (ids, order) => ids.concat(order.items.map(item => item.bookId)),
                 []);
               this.booksService.getAll(bookIds)
                 .then(books => this.books = books)
                 .catch(error => alert(error))
                 .then(() => this.orders = orders);
             });
         },
         error => alert(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
