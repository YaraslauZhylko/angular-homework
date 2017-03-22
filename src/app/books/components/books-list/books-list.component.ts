import { Component, ViewChild, OnInit } from '@angular/core';

import { Book } from './../../models';
import { BooksService } from './../../services';
import { BookEditComponent } from './'

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: Array<Book>;

  @ViewChild('bookEdit') bookEdit: BookEditComponent;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.books = this.booksService.getAll();
  }

  addBook(): void {
    this.setBookToBeModified(new Book(null, "", ""));  // Create new book
  }

  onBookEdit(book: Book): void {
    this.setBookToBeModified(book);  // Modify book object passed via event
  }

  onStopEdit(): void {
    this.setBookToBeModified(undefined);  // Just "undefine" the book to hide 'app-book-edit' element
  }

  setBookToBeModified(book: Book): void {
    // Directly set 'book' property of the child 'app-book-edit' component via @ViewChild
    // instead of passing some local variable via @Input property
    this.bookEdit.book = book;
  }
}