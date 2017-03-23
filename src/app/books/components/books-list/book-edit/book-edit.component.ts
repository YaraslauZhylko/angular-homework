import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Book, BooksService } from './../../../';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./../books-list.component.css', './book-edit.component.css'],
})
export class BookEditComponent implements OnChanges {

  /*@Input()*/book: Book;  // Do not use @Input. Will be set directly from parent component as part of @ViewChild demo
  @Output() bookModified: EventEmitter<any>;  // Emits events signaling that book has been added or modified
  @Output() stopEdit: EventEmitter<any>;  // Emits events signaling that book add/edit process should be stopped/canceled

  saveError: string;

  constructor(private booksService: BooksService) {
    this.bookModified = new EventEmitter<any>();
    this.stopEdit = new EventEmitter<any>();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Clear saveError if a new book arrived for adding/editing
    if (changes['book']) this.saveError = undefined;
  }

  saveBook() {
    this.book.title = this.book.title.trim();
    this.book.author = this.book.author.trim();
    if (!this.book.title || !this.book.author) {
      this.saveError = "Please fill in book title and book author."
    } else {
      this.saveError = this.booksService.save(this.book);
    }
    if (!this.saveError) {
      this.stopEdit.emit();
      this.bookModified.emit();
    }
  }

  clearRating() {
    this.book.ratings = [];  // Reset (clear) book ratings as part of edi process
  }

  cancel() {
    // Clear saveError on cancelling add/edit
    this.saveError = undefined;
    this.stopEdit.emit();
  }
}
