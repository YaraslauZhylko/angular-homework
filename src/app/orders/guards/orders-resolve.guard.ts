import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { BooksService } from './../../books';
import { UsersService } from './../../users';
import { OrdersData, OrdersService } from './..';

@Injectable()
export class OrdersResolveGuard implements Resolve<any> {

  constructor(
    private booksService: BooksService,
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  resolve(): Promise<OrdersData> {
    let ordersData = new OrdersData();
    return this.ordersService.getAll()
      .then(orders => ordersData.orders = orders.filter(order => !order.isCompleted))
      .then(() => {
        let clientIds = ordersData.orders.map(order => order.clientId);
        return this.usersService.getAll(clientIds)
          .then(users =>ordersData.clients = users)
          .then(() => {
            let bookIds = ordersData.orders.reduce((ids, order) => ids.concat(order.items.map(item => item.bookId)), []);
            return this.booksService.getAll(bookIds)
              .then(books =>ordersData.books = books);
          });
      })
      .then(() => ordersData)
      .catch(error => alert(error));
  }
}
