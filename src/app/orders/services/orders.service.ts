import { Injectable, Inject } from '@angular/core';

import { UNIQUE_ID_16, StorageService } from './../../shared';
import { Order, OrderItem } from './..';

@Injectable()
export class OrdersService {

  entityType: string = 'order';

  constructor(
    @Inject(UNIQUE_ID_16) private uniqueId: any,
    private storage: StorageService
  ) { }

  // PUBLIC METHODS:

  getAll() {
    return Promise.resolve(this.storage.getAll(this.entityType).map(order => Order.fromJSON(order)));
  }

  get(id: string) {
    let order = this.storage.get(this.entityType, id);
    if (order) return Promise.resolve(Order.fromJSON(order))
    else return Promise.reject("Order not found.");
  }

  save(order: Order) {

    let saveOrder = (order) => Promise.resolve(this.storage.set(this.entityType, order.id, order));
    let orderNotFound = () => Promise.reject("This order has already been deleted.");

    if (order.id) {
      return this.get(order.id)
        .then(() => saveOrder(order))
        .catch(() => orderNotFound());
    } else {
      order.id = this.uniqueId();
      return saveOrder(order);
    }
  }

  delete(id: string) {
    return Promise.resolve(this.storage.remove(this.entityType, id));
  }
}
