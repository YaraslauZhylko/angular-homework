import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, BooksService } from './../..';
import { DialogueService }  from './../../../services';


@Component({
  templateUrl: './book-edit.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class BookEditComponent implements OnInit {

  book: Book;
  oldBook: Book;

  saveError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private dialogueService: DialogueService
  ) { }

  ngOnInit() {
    this.book = new Book(null, "", "", 0, 0);
    this.route.data.forEach((data: { book: Book }) => {
      if (data.book) {
        this.book = data.book;
        this.oldBook = Object.assign({}, data.book);
      }
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.oldBook) return true;
    if (this.oldBook.title === this.book.title &&
        this.oldBook.author === this.book.author &&
        this.oldBook.ratings === this.book.ratings &&
        this.oldBook.count === this.book.count &&
        this.oldBook.price === this.book.price) return true;
    return this.dialogueService.confirm('Discard changes?');
  }

  saveBook() {
    this.book.title = this.book.title.trim();
    this.book.author = this.book.author.trim();
    if (!this.book.title || !this.book.author) {
      this.saveError = "Please fill in book title and book author."
    } else {
      this.booksService.save(this.book)
        .then(() => {
          let bookExtras = {id: this.book.id, isNew: !(this.oldBook)};
          this.oldBook = this.book;
          return bookExtras;
        })
        .then(extras => this.goBack(extras))
        .catch(error => alert(error));
    }
  }

  deleteBook() {
    this.dialogueService.confirm('Delete book?')
      .then(doDelete => {
        if (doDelete) {
          this.booksService.delete(this.book.id)
            .then(() => this.oldBook = this.book = undefined)
            .then(() => this.goBack())
            .catch(error => alert(error));
        }
      });
  }

  clearRating() {
    this.book.ratings = [];  // Reset (clear) book ratings as part of edit process
  }

  cancel() {
    this.goBack();
  }

  private goBack = (extras?: Object)  => this.router.navigate(['./', extras || {}], {relativeTo: this.route.parent});
}
