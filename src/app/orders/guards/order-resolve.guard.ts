import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';

import { BooksService } from './../../books';
import { UsersService } from './../../users';
import { OrderData, OrdersService } from './..';

@Injectable()
export class OrderResolveGuard implements Resolve<any> {

  constructor(
    private router: Router,
    private usersService: UsersService,
    private booksService: BooksService,
    private ordersService: OrdersService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<OrderData> {
    let id = route.params['id'];
    let orderData = new OrderData();
    return this.ordersService.get(id)
      .then(order => orderData.order = order)
      .then(() => {
        return this.usersService.get(orderData.order.clientId)
          .then(user =>orderData.client = user)
          .catch(error => {"Just swallow user error and continue!"})
          .then(() => {
            let bookIds = orderData.order.items.map(item => item.bookId);
            return this.booksService.getAll(bookIds)
              .then(books =>orderData.books = books)
              .catch(error => {"Just swallow book error and continue!"});
          });
      })
      .then(() => orderData)
      .catch(error => {
        alert(error);
        this.router.navigate(['admin', 'orders'])
      });
  }
}
