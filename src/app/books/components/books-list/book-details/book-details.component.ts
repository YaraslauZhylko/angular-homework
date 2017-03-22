import { Component, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';

import { Book } from './../../../models';
import { BooksService } from './../../../services';

@Component({
  selector: '[app-book-details]',
  templateUrl: './book-details.component.html',
  styleUrls: ['./../books-list.component.css', './book-details.component.css']
})
export class BookDetailsComponent {

  @Input() book: Book;
  @Output() bookEdit: EventEmitter<Book>;
  @HostBinding('style.cursor') cursor = 'pointer';
  @HostBinding('style.background-color') backgroundColor: string;

  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    this.backgroundColor = 'lightgrey';
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    this.backgroundColor = undefined;
  }

  constructor(private booksService: BooksService) {
    this.bookEdit = new EventEmitter<Book>();
  }

  rateBook(rate:number): void {
    this.booksService.rate(this.book, rate);  // Add another rating
  }

  editBook(): void {
    let bookCopy = new Book(this.book.id, this.book.title, this.book.author, this.book.ratings);  // Do not modify the original book directly
    this.bookEdit.emit(bookCopy);
  }

  deleteBook(): void {
    this.booksService.delete(this.book);
  }
}
