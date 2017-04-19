import { OrderItem } from './order-item.model';

export class Order {

  constructor(
    public id: string,
    public items: Array<OrderItem>,
    public clientId: string,
    public address: string,
    public isCompleted?: boolean
  ) {
    this.id = this.id || null;
    this.isCompleted = this.isCompleted || false;
  }

  static fromJSON(jsonObject: Object): Order {
    if (!jsonObject) return undefined;
    let order = Object.create(Order.prototype);
    order = Object.assign(order, jsonObject);
    for (let i = 0; i < order.items.length; i++) {
      order.items[i] = OrderItem.fromJSON(order.items[i]);
    }
    return order;
  }
}
