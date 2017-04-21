import { Pipe, PipeTransform } from '@angular/core';

import { Order } from './..';

@Pipe({
  name: 'activeOrders'
})
export class ActiveOrdersPipe implements PipeTransform {

  transform(orders: Array<Order>): Array<Order> {
    return orders.filter(order => !order.isCompleted);
  }
}
