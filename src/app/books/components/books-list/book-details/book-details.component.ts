import { Component, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';

import { Book, BooksService } from './../../../';

@Component({
  selector: '[app-book-details]',
  templateUrl: './book-details.component.html',
  styleUrls: ['./../books-list.component.css', './book-details.component.css']
})
export class BookDetailsComponent {

  @Input() book: Book;
  @Output() bookEdit: EventEmitter<Book>;  // Emits events signaling that book has to be editted
  @Output() bookModified: EventEmitter<any>;  // Emits events signaling that book has been added or modified
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
    this.bookModified = new EventEmitter<any>();
  }

  rateBook(rate: number): void {
    this.booksService.rate(this.book, rate);  // Add another rating
    this.bookModified.emit();
  }

  editBook(): void {
    let bookCopy = new Book(this.book.id, this.book.title, this.book.author, this.book.ratings);  // Do not modify the original book directly
    this.bookEdit.emit(bookCopy);
  }

  deleteBook(): void {
    this.booksService.delete(this.book);
    this.bookModified.emit();
  }
}
