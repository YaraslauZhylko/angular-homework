import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, BooksService } from './../..';
import { CartService } from './../../../orders';


@Component({
  templateUrl: './book-details.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  private userRating: Number = undefined;

  private cartService: CartService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    @Inject(forwardRef(() => CartService)) cartService: CartService
  ) {
    this.cartService = cartService;
  }

  ngOnInit() {
    this.book = new Book(null, "", "", 0, 0);
    this.route.data.forEach((data: { book: Book }) => {
      if (data.book) this.book = data.book;
    });
  }

  rateBook(rate: number): void {
    let ratingActionChain: Promise<any> =
      this.userRating
        ? this.booksService.unrate(this.book.id, rate)
        : this.booksService.rate(this.book.id, rate)
    ratingActionChain = ratingActionChain
      .then(book => this.book = book)
      .catch(error => alert(error));
    ratingActionChain = ratingActionChain
      .then(() => this.userRating = this.userRating ? undefined : rate);
  }

  addToCart() {
    this.cartService.addBook(this.book.id)
      .then(success => {
        if (!success)
          alert("Not enough copies of the book to add to the cart.")
      })
      .catch(error => alert(error));
  }

  back() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
