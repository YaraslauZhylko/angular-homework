export class OrderItem {

  constructor(
    public bookId: string,
    public count: number
  ) { }

  static fromJSON(jsonObject: Object): OrderItem {
    if (!jsonObject) return undefined;
    let emptyOrderItem = Object.create(OrderItem.prototype);
    return Object.assign(emptyOrderItem, jsonObject);
  }
}
