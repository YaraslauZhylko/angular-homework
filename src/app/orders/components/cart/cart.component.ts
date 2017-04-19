import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { OrderItem, CartService } from './../..';
import { Book, BooksService } from './../../../books';


@Component({
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {

  private submittedOrderId: Observable<string>;

  private sub: Subscription;
  private cartItems: Array<OrderItem> = [];
  private books: Array<Book> = [];
  private totalValidItems = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.submittedOrderId = this.route.params.map(params => params['id'] || '');
    this.sub = this.cartService.items
      .subscribe(items => {
        let bookIds = items.map(item => item.bookId);
        this.booksService.getAll(bookIds)
          .then(books => this.books = books)
          .catch(error => alert(error))
          .then(() => this.cartItems = items)
          .then(() => {
            this.totalValidItems = this.cartItems.reduce((totalValid, item) => {
              return this.books.find(book => book.id === item.bookId)
                ? totalValid += item.count
                : totalValid;
            }, 0);
          });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  increaseBookCount(id: string) {
    this.cartService.increaseBookCount(id)
      .then(success => {
        if (!success)
          alert("Not enough copies of the book available.")
      })
      .catch(error => alert(error));
  }
  decreaseBookCount(id: string) {
    this.cartService.decreaseBookCount(id)
      .catch(error => alert(error));
  }
  removeBook(id: string) {
    this.cartService.removeBook(id);
  }

  checkout() {
    this.router.navigate(['checkout'], {relativeTo: this.route});
  }

  update() {
    this.cartService.clean();
  }

  empty() {
    this.cartService.empty();
  }
}
