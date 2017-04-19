import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

import { Book } from './../../../books';
import { OrderItem } from './../..';


@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class OrderItemsListComponent implements OnChanges {

  @Input() orderItems: Array<OrderItem> = [];
  @Input() books: Array<Book> = [];
  @Input() isCart: boolean = false;

  @Output() increaseCount: EventEmitter<string>;
  @Output() decreaseCount: EventEmitter<string>;
  @Output() remove: EventEmitter<string>;

  private totalPrice: number = 0;
  private missingItems: boolean = false;


  constructor() {
    this.increaseCount = new EventEmitter<string>();
    this.decreaseCount = new EventEmitter<string>();
    this.remove = new EventEmitter<string>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderItems'] || changes['books'] ) {
      this.totalPrice = 0;
      this.missingItems = false;
      this.orderItems.map(item => {
        let book = this.books.find(book => book.id === item.bookId);
        if (book) this.totalPrice += book.price * item.count;
        else this.missingItems = true;
      });
    }
  }
}
