import { Component, OnChanges, SimpleChanges, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { Book } from './../../../../books';
import { OrderItem } from './../../..';

@Component({
  selector: '[app-order-item-entry]',
  templateUrl: './order-item-entry.component.html',
  styleUrls: ['./../../../../shared/css/shared.css']
})
export class OrderItemEntryComponent implements OnChanges{

  @HostBinding('class.critical') criticalDecoration: boolean = false;

  @Input() orderItem: OrderItem;
  @Input() books: Array<Book>;
  @Input() isCart: boolean = false;

  @Output() increaseCount: EventEmitter<string>;
  @Output() decreaseCount: EventEmitter<string>;
  @Output() remove: EventEmitter<string>;

  private book: Book;
  private totalPrice: number = 0;

  constructor() {
    this.increaseCount = new EventEmitter<string>();
    this.decreaseCount = new EventEmitter<string>();
    this.remove = new EventEmitter<string>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderItems'] || changes['books'] ) {
      this.book = this.books.find(book => book.id === this.orderItem.bookId);
      this.criticalDecoration = !this.book;
    }
  }
}
