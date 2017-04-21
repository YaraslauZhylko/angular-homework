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
}
