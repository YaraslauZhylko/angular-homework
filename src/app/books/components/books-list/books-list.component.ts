import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book, BooksService, AvailableBooksPipe } from './../..';

@Component({
  templateUrl: './books-list.component.html',
  styleUrls: [
    './../../../shared/css/shared.css',
    './book-entry/book-entry.component.css'
  ],
  providers: [AvailableBooksPipe]
})
export class BooksListComponent implements OnInit, OnDestroy {

  books: Array<Book>;
  private isAdminFeatureArea: Boolean = false;
  private modifiedBook: Object = {};
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private availableBooksPipe: AvailableBooksPipe
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
          this.modifiedBook['id'] = String(params['id']);
          this.modifiedBook['isNew'] = params['isNew'];
      });
    this.route.parent.parent.data
      .forEach((data: { isAdminFeatureArea: Boolean }) => {
        this.isAdminFeatureArea = !!data.isAdminFeatureArea
      });
    this.booksService.getAll()
      .then(books => this.isAdminFeatureArea ? books : this.availableBooksPipe.transform(books))
      .then(books => {
        this.books = books
          .sort((book1, book2) => {
            if (book1.title > book2.title) return 1;
            if (book1.title < book2.title) return -1;
            return 0;
          });
        })
      .catch((error) => alert(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addBook(): void {
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}
