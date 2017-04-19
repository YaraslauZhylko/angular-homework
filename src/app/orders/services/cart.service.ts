import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { BooksService } from './../../books';
import { OrderItem } from './..';

@Injectable()
export class CartService {

  private cartItems: Array<OrderItem>;

  public items: ReplaySubject<Array<OrderItem>> = new ReplaySubject(1);
  public itemsCount: ReplaySubject<number> = new ReplaySubject(1);

  constructor(
    private booksService: BooksService
  ) {
    this.items.subscribe(items => {
      this.itemsCount.next(
        items.reduce((totalCount, item) => totalCount += item.count, 0))
    });
    this.empty();
  }

  private pushCardItems = () => this.items.next(this.cartItems);
  private findBook = id => this.booksService.get(id);
  private findItem = id => this.cartItems.find(item => item.bookId === id);

  getItems(): Array<OrderItem> {
    return this.cartItems;
  }

  increaseBookCount(id: string): Promise<boolean> {
    return this.findBook(id)
      .then(book => {
        let item = this.findItem(id);
        if (item) {
          if (item.count < book.count) {
             item.count += 1;
             return true;
           }
        } else {
          if (book.count > 0) {
            this.cartItems.push(new OrderItem(id, 1));
            return true;
          }
        }
      })
      .then(result => {
        this.pushCardItems();
        return !!result;
      });
  }

  decreaseBookCount(id: string): Promise<boolean> {
    return this.findBook(id)
      .then(book => {
        let item = this.findItem(id);
        if (item) {
          if (item.count > 0) {
             item.count -= 1;
             return true;
           }
       }
      })
      .then(result => {
        this.pushCardItems();
        return !!result;
      });
  }

  addBook = this.increaseBookCount;

  removeBook(id: string): void {
    this.cartItems = this.cartItems.filter(item => item.bookId !== id);
    this.pushCardItems();
  }

  clean(): void {
    this.cartItems = this.cartItems.filter(item => item.count > 0);
    this.pushCardItems();
  }

  empty(): void {
    this.cartItems = new Array<OrderItem>();
    this.pushCardItems();
  }
}
